#!/usr/bin/env python3
"""
Automaatte AI Services Backend
Complete free AI services implementation
"""

import os
import asyncio
import logging
from datetime import datetime
from typing import Dict, Any, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
import uvicorn

# AI Service Imports
from services.ai_researchers import AIResearcherService
from services.ai_planners import AIPlannerService
from services.workflow_engine import WorkflowEngine
from services.model_router import ModelRouter
from utils.auth import verify_token
from utils.rate_limiter import RateLimiter
from utils.cache import ResponseCache
from utils.monitoring import ServiceMonitor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global services
ai_researcher = None
ai_planner = None
workflow_engine = None
model_router = None
rate_limiter = None
response_cache = None
monitor = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize services on startup"""
    global ai_researcher, ai_planner, workflow_engine, model_router, rate_limiter, response_cache, monitor
    
    logger.info("🚀 Starting Automaatte AI Services...")
    
    try:
        # Initialize core services
        model_router = ModelRouter()
        await model_router.initialize()
        
        ai_researcher = AIResearcherService(model_router)
        ai_planner = AIPlannerService(model_router)
        workflow_engine = WorkflowEngine()
        
        # Initialize utilities
        rate_limiter = RateLimiter()
        response_cache = ResponseCache()
        monitor = ServiceMonitor()
        
        logger.info("✅ All services initialized successfully")
        yield
        
    except Exception as e:
        logger.error(f"❌ Failed to initialize services: {e}")
        raise
    finally:
        logger.info("🛑 Shutting down services...")

# Create FastAPI app
app = FastAPI(
    title="Automaatte AI Services",
    description="Complete free AI services for research and planning",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class ServiceRequest(BaseModel):
    service_type: str = Field(..., description="Type of AI service to use")
    input_data: str = Field(..., description="Input data for processing")
    user_id: Optional[str] = Field(None, description="User ID for tracking")
    user_tier: str = Field("free", description="User tier (free/core/special)")
    options: Dict[str, Any] = Field(default_factory=dict, description="Additional options")

class ServiceResponse(BaseModel):
    success: bool
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    processing_time: float
    service_type: str
    timestamp: str
    cached: bool = False

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Check all services
        services_status = {
            "ai_researcher": ai_researcher is not None,
            "ai_planner": ai_planner is not None,
            "workflow_engine": workflow_engine is not None,
            "model_router": model_router is not None and await model_router.health_check(),
        }
        
        all_healthy = all(services_status.values())
        
        return {
            "status": "healthy" if all_healthy else "degraded",
            "services": services_status,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")

# Main AI processing endpoint
@app.post("/api/ai/process", response_model=ServiceResponse)
async def process_ai_request(
    request: ServiceRequest,
    background_tasks: BackgroundTasks,
    user_token: str = Depends(verify_token)
):
    """Main AI processing endpoint"""
    start_time = datetime.now()
    
    try:
        # Rate limiting
        if not await rate_limiter.check_rate_limit(request.user_id or "anonymous"):
            raise HTTPException(status_code=429, detail="Rate limit exceeded")
        
        # Check cache first
        cache_key = f"{request.service_type}:{hash(request.input_data)}"
        cached_response = await response_cache.get(cache_key)
        
        if cached_response:
            logger.info(f"Cache hit for {request.service_type}")
            return ServiceResponse(
                success=True,
                data=cached_response,
                processing_time=0.1,
                service_type=request.service_type,
                timestamp=datetime.now().isoformat(),
                cached=True
            )
        
        # Route to appropriate service
        if request.service_type.endswith("-research") or request.service_type.endswith("-researching"):
            result = await ai_researcher.process_request(request)
        elif request.service_type.endswith("-planning") or request.service_type.endswith("-plan"):
            result = await ai_planner.process_request(request)
        else:
            # Use workflow engine for complex requests
            result = await workflow_engine.process_request(request)
        
        processing_time = (datetime.now() - start_time).total_seconds()
        
        # Cache successful responses
        if result.get("success"):
            background_tasks.add_task(
                response_cache.set,
                cache_key,
                result,
                ttl=3600  # 1 hour cache
            )
        
        # Log usage
        background_tasks.add_task(
            monitor.log_usage,
            request.user_id,
            request.service_type,
            processing_time,
            result.get("success", False)
        )
        
        return ServiceResponse(
            success=result.get("success", False),
            data=result.get("data"),
            error=result.get("error"),
            processing_time=processing_time,
            service_type=request.service_type,
            timestamp=datetime.now().isoformat()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        processing_time = (datetime.now() - start_time).total_seconds()
        
        return ServiceResponse(
            success=False,
            error=str(e),
            processing_time=processing_time,
            service_type=request.service_type,
            timestamp=datetime.now().isoformat()
        )

# AI Researchers endpoints
@app.post("/api/researchers/{service_type}")
async def research_service(
    service_type: str,
    request: ServiceRequest,
    user_token: str = Depends(verify_token)
):
    """Dedicated AI researchers endpoint"""
    request.service_type = f"{service_type}-research"
    return await process_ai_request(request, BackgroundTasks(), user_token)

# AI Planners endpoints  
@app.post("/api/planners/{service_type}")
async def planning_service(
    service_type: str,
    request: ServiceRequest,
    user_token: str = Depends(verify_token)
):
    """Dedicated AI planners endpoint"""
    request.service_type = f"{service_type}-planning"
    return await process_ai_request(request, BackgroundTasks(), user_token)

# Service status endpoint
@app.get("/api/status")
async def service_status():
    """Get detailed service status"""
    try:
        return {
            "services": {
                "ai_researchers": await ai_researcher.get_status() if ai_researcher else "offline",
                "ai_planners": await ai_planner.get_status() if ai_planner else "offline",
                "workflow_engine": await workflow_engine.get_status() if workflow_engine else "offline",
                "model_router": await model_router.get_status() if model_router else "offline",
            },
            "models": await model_router.get_available_models() if model_router else [],
            "uptime": monitor.get_uptime() if monitor else 0,
            "total_requests": monitor.get_total_requests() if monitor else 0
        }
    except Exception as e:
        logger.error(f"Status check failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to get status")

# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc)}
    )

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    logger.info(f"🚀 Starting server on {host}:{port}")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=os.getenv("DEBUG", "false").lower() == "true",
        log_level="info"
    )
