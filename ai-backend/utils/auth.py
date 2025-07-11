"""
Authentication utilities
"""

import os
import jwt
import logging
from typing import Optional
from fastapi import HTTPException, Header
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

async def verify_token(authorization: Optional[str] = Header(None)) -> str:
    """Verify JWT token from Supabase"""
    
    # For development, allow requests without auth
    if os.getenv("DEBUG", "false").lower() == "true":
        return "dev-user"
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    try:
        # Extract token from "Bearer <token>"
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authorization format")
        
        token = authorization.split(" ")[1]
        
        # For now, just validate it's not empty
        # In production, you'd verify with Supabase JWT secret
        if not token:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        return token
        
    except Exception as e:
        logger.error(f"Token verification failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")

def create_api_key() -> str:
    """Create API key for service-to-service communication"""
    return os.getenv("API_SECRET_KEY", "dev-api-key")

async def verify_api_key(api_key: str) -> bool:
    """Verify API key"""
    expected_key = os.getenv("API_SECRET_KEY", "dev-api-key")
    return api_key == expected_key
