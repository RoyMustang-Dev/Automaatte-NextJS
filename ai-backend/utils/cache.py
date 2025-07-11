"""
Response caching utilities
"""

import time
import json
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class ResponseCache:
    """Simple in-memory response cache"""
    
    def __init__(self):
        self.cache = {}
        self.default_ttl = 3600  # 1 hour
    
    async def get(self, key: str) -> Optional[Dict[str, Any]]:
        """Get cached response"""
        if key in self.cache:
            entry = self.cache[key]
            if time.time() < entry["expires_at"]:
                logger.info(f"Cache hit for key: {key[:50]}...")
                return entry["data"]
            else:
                # Expired, remove from cache
                del self.cache[key]
                logger.info(f"Cache expired for key: {key[:50]}...")
        
        return None
    
    async def set(self, key: str, data: Dict[str, Any], ttl: Optional[int] = None) -> None:
        """Set cached response"""
        ttl = ttl or self.default_ttl
        expires_at = time.time() + ttl
        
        self.cache[key] = {
            "data": data,
            "expires_at": expires_at,
            "created_at": time.time()
        }
        
        logger.info(f"Cached response for key: {key[:50]}... (TTL: {ttl}s)")
        
        # Clean up expired entries periodically
        await self.cleanup_expired()
    
    async def cleanup_expired(self) -> None:
        """Remove expired cache entries"""
        current_time = time.time()
        expired_keys = [
            key for key, entry in self.cache.items()
            if current_time >= entry["expires_at"]
        ]
        
        for key in expired_keys:
            del self.cache[key]
        
        if expired_keys:
            logger.info(f"Cleaned up {len(expired_keys)} expired cache entries")
    
    def get_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        current_time = time.time()
        active_entries = sum(1 for entry in self.cache.values() if current_time < entry["expires_at"])
        
        return {
            "total_entries": len(self.cache),
            "active_entries": active_entries,
            "expired_entries": len(self.cache) - active_entries
        }
