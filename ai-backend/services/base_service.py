"""
Base AI Service Class
Common functionality for all AI services
"""

import logging
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

class BaseAIService(ABC):
    """Base class for all AI services"""
    
    def __init__(self, model_router):
        self.model_router = model_router
        self.service_name = self.__class__.__name__
        self.start_time = datetime.now()
        logger.info(f"Initializing {self.service_name}")
    
    @abstractmethod
    async def process_request(self, request) -> Dict[str, Any]:
        """Process a service request"""
        pass
    
    @abstractmethod
    async def get_status(self) -> Dict[str, Any]:
        """Get service status"""
        pass
    
    def get_uptime(self) -> float:
        """Get service uptime in seconds"""
        return (datetime.now() - self.start_time).total_seconds()
    
    async def health_check(self) -> bool:
        """Check if service is healthy"""
        try:
            status = await self.get_status()
            return status.get("status") == "online"
        except Exception as e:
            logger.error(f"Health check failed for {self.service_name}: {e}")
            return False
