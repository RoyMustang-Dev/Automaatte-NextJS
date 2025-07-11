"""
Service monitoring utilities
"""

import time
import logging
from typing import Dict, Any, List
from datetime import datetime
from collections import defaultdict

logger = logging.getLogger(__name__)

class ServiceMonitor:
    """Monitor service usage and performance"""
    
    def __init__(self):
        self.start_time = time.time()
        self.request_count = 0
        self.error_count = 0
        self.response_times = []
        self.user_usage = defaultdict(int)
        self.service_usage = defaultdict(int)
        self.error_log = []
    
    async def log_usage(self, user_id: str, service_type: str, response_time: float, success: bool) -> None:
        """Log service usage"""
        self.request_count += 1
        self.response_times.append(response_time)
        self.user_usage[user_id] += 1
        self.service_usage[service_type] += 1
        
        if not success:
            self.error_count += 1
            self.error_log.append({
                "timestamp": datetime.now().isoformat(),
                "user_id": user_id,
                "service_type": service_type,
                "response_time": response_time
            })
        
        # Keep only last 1000 response times
        if len(self.response_times) > 1000:
            self.response_times = self.response_times[-1000:]
        
        # Keep only last 100 errors
        if len(self.error_log) > 100:
            self.error_log = self.error_log[-100:]
    
    def get_uptime(self) -> float:
        """Get service uptime in seconds"""
        return time.time() - self.start_time
    
    def get_total_requests(self) -> int:
        """Get total request count"""
        return self.request_count
    
    def get_error_rate(self) -> float:
        """Get error rate percentage"""
        if self.request_count == 0:
            return 0.0
        return (self.error_count / self.request_count) * 100
    
    def get_average_response_time(self) -> float:
        """Get average response time"""
        if not self.response_times:
            return 0.0
        return sum(self.response_times) / len(self.response_times)
    
    def get_stats(self) -> Dict[str, Any]:
        """Get comprehensive statistics"""
        return {
            "uptime_seconds": self.get_uptime(),
            "total_requests": self.request_count,
            "error_count": self.error_count,
            "error_rate_percent": self.get_error_rate(),
            "average_response_time": self.get_average_response_time(),
            "top_users": dict(sorted(self.user_usage.items(), key=lambda x: x[1], reverse=True)[:10]),
            "service_usage": dict(self.service_usage),
            "recent_errors": self.error_log[-10:] if self.error_log else []
        }
