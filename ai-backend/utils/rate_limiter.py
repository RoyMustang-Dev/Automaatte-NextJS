"""
Rate limiting utilities
"""

import time
import logging
from typing import Dict, Optional
from collections import defaultdict, deque

logger = logging.getLogger(__name__)

class RateLimiter:
    """Simple in-memory rate limiter"""
    
    def __init__(self):
        self.requests = defaultdict(deque)
        self.limits = {
            "requests_per_minute": 60,
            "requests_per_hour": 1000
        }
    
    async def check_rate_limit(self, user_id: str) -> bool:
        """Check if user is within rate limits"""
        current_time = time.time()
        user_requests = self.requests[user_id]
        
        # Clean old requests (older than 1 hour)
        while user_requests and current_time - user_requests[0] > 3600:
            user_requests.popleft()
        
        # Check hourly limit
        if len(user_requests) >= self.limits["requests_per_hour"]:
            logger.warning(f"Hourly rate limit exceeded for user {user_id}")
            return False
        
        # Check minute limit
        recent_requests = sum(1 for req_time in user_requests if current_time - req_time < 60)
        if recent_requests >= self.limits["requests_per_minute"]:
            logger.warning(f"Minute rate limit exceeded for user {user_id}")
            return False
        
        # Add current request
        user_requests.append(current_time)
        return True
    
    def get_user_stats(self, user_id: str) -> Dict:
        """Get rate limit stats for user"""
        current_time = time.time()
        user_requests = self.requests[user_id]
        
        recent_requests = sum(1 for req_time in user_requests if current_time - req_time < 60)
        hourly_requests = len(user_requests)
        
        return {
            "requests_last_minute": recent_requests,
            "requests_last_hour": hourly_requests,
            "minute_limit": self.limits["requests_per_minute"],
            "hour_limit": self.limits["requests_per_hour"]
        }
