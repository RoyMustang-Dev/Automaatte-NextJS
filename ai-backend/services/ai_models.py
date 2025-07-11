"""
AI Models Manager
Handles AI model interactions and prompt processing
"""

import logging
import json
import re
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

class AIModelManager:
    """Manages AI model interactions"""
    
    def __init__(self, model_router):
        self.model_router = model_router
    
    async def parse_vacation_input(self, input_data: str) -> Dict[str, Any]:
        """Parse vacation research input"""
        # Simple parsing logic - in production, use NLP
        parsed = {
            "destination": "",
            "budget": "",
            "duration": ""
        }
        
        # Extract destination (first location-like word)
        words = input_data.split()
        for word in words:
            if word[0].isupper() and len(word) > 2:
                parsed["destination"] = word
                break
        
        # Extract budget (look for $ or numbers)
        budget_match = re.search(r'\$?(\d+(?:,\d+)?)', input_data)
        if budget_match:
            parsed["budget"] = budget_match.group(1)
        
        # Extract duration (look for days/weeks)
        duration_match = re.search(r'(\d+)\s*(day|week|month)s?', input_data, re.IGNORECASE)
        if duration_match:
            parsed["duration"] = f"{duration_match.group(1)} {duration_match.group(2)}s"
        
        return parsed
    
    async def parse_education_input(self, input_data: str) -> Dict[str, Any]:
        """Parse education research input"""
        return {
            "field": self.extract_field(input_data),
            "level": self.extract_level(input_data),
            "location": self.extract_location(input_data)
        }
    
    async def parse_insurance_input(self, input_data: str) -> Dict[str, Any]:
        """Parse insurance research input"""
        return {
            "type": self.extract_insurance_type(input_data),
            "coverage": self.extract_coverage_needs(input_data),
            "location": self.extract_location(input_data)
        }
    
    async def parse_investment_input(self, input_data: str) -> Dict[str, Any]:
        """Parse investment research input"""
        return {
            "type": self.extract_investment_type(input_data),
            "risk": self.extract_risk_tolerance(input_data),
            "amount": self.extract_amount(input_data)
        }
    
    async def parse_video_input(self, input_data: str) -> Dict[str, Any]:
        """Parse video research input"""
        return {
            "type": self.extract_video_type(input_data),
            "platform": self.extract_platform(input_data),
            "budget": self.extract_amount(input_data)
        }
    
    async def analyze_research_topic(self, input_data: str) -> Dict[str, Any]:
        """Analyze general research topic"""
        return {
            "topic": input_data[:100],
            "keywords": input_data.split()[:10],
            "research_type": "general"
        }
    
    async def generate_analysis(self, prompt: str, user_tier: str) -> str:
        """Generate AI analysis"""
        try:
            result = await self.model_router.route_request(
                task_type="analysis",
                complexity="medium" if user_tier in ["core", "special"] else "light",
                user_tier=user_tier,
                prompt=prompt
            )
            
            if result.get("success"):
                return result.get("text", "Analysis completed successfully.")
            else:
                return f"Analysis unavailable: {result.get('error', 'Unknown error')}"
                
        except Exception as e:
            logger.error(f"Analysis generation failed: {e}")
            return "Analysis temporarily unavailable. Please try again."
    
    async def generate_recommendations(self, data: Dict[str, Any], context: str) -> List[str]:
        """Generate recommendations based on data"""
        # Simple rule-based recommendations
        recommendations = [
            f"Based on the {context} data, consider the following options",
            "Review all available alternatives before making decisions",
            "Consult with experts for personalized advice"
        ]
        return recommendations
    
    async def parse_vacation_planning_input(self, input_data: str) -> Dict[str, Any]:
        """Parse vacation planning input"""
        parsed = await self.parse_vacation_input(input_data)
        
        # Additional planning-specific parsing
        parsed["travelers"] = self.extract_travelers(input_data)
        parsed["interests"] = self.extract_interests(input_data)
        
        return parsed
    
    async def parse_education_planning_input(self, input_data: str) -> Dict[str, Any]:
        """Parse education planning input"""
        return {
            "field": self.extract_field(input_data),
            "current_level": self.extract_current_level(input_data),
            "target_level": self.extract_target_level(input_data),
            "timeline": self.extract_timeline(input_data),
            "budget": self.extract_amount(input_data)
        }
    
    async def parse_insurance_planning_input(self, input_data: str) -> Dict[str, Any]:
        """Parse insurance planning input"""
        return {
            "coverage_needs": self.extract_coverage_list(input_data),
            "budget": self.extract_amount(input_data),
            "family_size": self.extract_family_size(input_data),
            "risk_factors": self.extract_risk_factors(input_data)
        }
    
    async def parse_investment_planning_input(self, input_data: str) -> Dict[str, Any]:
        """Parse investment planning input"""
        return {
            "goals": self.extract_investment_goals(input_data),
            "risk_tolerance": self.extract_risk_tolerance(input_data),
            "timeline": self.extract_timeline(input_data),
            "amount": self.extract_amount(input_data),
            "current_portfolio": {}
        }
    
    async def parse_video_planning_input(self, input_data: str) -> Dict[str, Any]:
        """Parse video planning input"""
        return {
            "type": self.extract_video_type(input_data),
            "platform": self.extract_platform(input_data),
            "budget": self.extract_amount(input_data),
            "timeline": self.extract_timeline(input_data),
            "team_size": self.extract_team_size(input_data)
        }
    
    async def analyze_planning_requirements(self, input_data: str) -> Dict[str, Any]:
        """Analyze general planning requirements"""
        return {
            "objective": input_data[:200],
            "scope": "medium",
            "complexity": "standard",
            "timeline": "3-6 months",
            "resources_needed": ["planning", "execution", "monitoring"]
        }
    
    async def generate_plan(self, prompt: str, user_tier: str) -> str:
        """Generate AI plan"""
        try:
            result = await self.model_router.route_request(
                task_type="planning",
                complexity="heavy" if user_tier in ["core", "special"] else "medium",
                user_tier=user_tier,
                prompt=prompt
            )
            
            if result.get("success"):
                return result.get("text", "Plan generated successfully.")
            else:
                return f"Plan generation unavailable: {result.get('error', 'Unknown error')}"
                
        except Exception as e:
            logger.error(f"Plan generation failed: {e}")
            return "Plan generation temporarily unavailable. Please try again."
    
    async def get_loaded_models(self) -> List[str]:
        """Get list of loaded models"""
        if self.model_router:
            return await self.model_router.get_available_models()
        return []
    
    # Helper methods for parsing
    def extract_field(self, text: str) -> str:
        """Extract field of study/work"""
        fields = ["computer science", "engineering", "business", "medicine", "law", "education"]
        text_lower = text.lower()
        for field in fields:
            if field in text_lower:
                return field
        return "general"
    
    def extract_level(self, text: str) -> str:
        """Extract education level"""
        levels = ["bachelor", "master", "phd", "certificate", "diploma"]
        text_lower = text.lower()
        for level in levels:
            if level in text_lower:
                return level
        return "bachelor"
    
    def extract_location(self, text: str) -> str:
        """Extract location"""
        # Simple location extraction
        words = text.split()
        for word in words:
            if word[0].isupper() and len(word) > 2:
                return word
        return "USA"
    
    def extract_insurance_type(self, text: str) -> str:
        """Extract insurance type"""
        types = ["health", "auto", "life", "home", "travel"]
        text_lower = text.lower()
        for ins_type in types:
            if ins_type in text_lower:
                return ins_type
        return "health"
    
    def extract_coverage_needs(self, text: str) -> str:
        """Extract coverage needs"""
        if "comprehensive" in text.lower():
            return "comprehensive"
        elif "basic" in text.lower():
            return "basic"
        return "standard"
    
    def extract_investment_type(self, text: str) -> str:
        """Extract investment type"""
        types = ["stocks", "bonds", "crypto", "real estate", "mutual funds"]
        text_lower = text.lower()
        for inv_type in types:
            if inv_type in text_lower:
                return inv_type
        return "stocks"
    
    def extract_risk_tolerance(self, text: str) -> str:
        """Extract risk tolerance"""
        if "conservative" in text.lower() or "low risk" in text.lower():
            return "low"
        elif "aggressive" in text.lower() or "high risk" in text.lower():
            return "high"
        return "medium"
    
    def extract_amount(self, text: str) -> str:
        """Extract monetary amount"""
        amount_match = re.search(r'\$?(\d+(?:,\d+)?(?:\.\d+)?)', text)
        if amount_match:
            return amount_match.group(1)
        return "10000"
    
    def extract_video_type(self, text: str) -> str:
        """Extract video type"""
        types = ["youtube", "commercial", "documentary", "tutorial", "vlog"]
        text_lower = text.lower()
        for vid_type in types:
            if vid_type in text_lower:
                return vid_type
        return "youtube"
    
    def extract_platform(self, text: str) -> str:
        """Extract platform"""
        platforms = ["youtube", "instagram", "tiktok", "facebook", "linkedin"]
        text_lower = text.lower()
        for platform in platforms:
            if platform in text_lower:
                return platform
        return "youtube"
    
    def extract_travelers(self, text: str) -> int:
        """Extract number of travelers"""
        travelers_match = re.search(r'(\d+)\s*(?:people|person|traveler)', text, re.IGNORECASE)
        if travelers_match:
            return int(travelers_match.group(1))
        return 1
    
    def extract_interests(self, text: str) -> List[str]:
        """Extract interests"""
        interests = ["culture", "food", "adventure", "relaxation", "history", "nature"]
        text_lower = text.lower()
        found_interests = [interest for interest in interests if interest in text_lower]
        return found_interests if found_interests else ["general"]
    
    def extract_current_level(self, text: str) -> str:
        """Extract current education level"""
        if "high school" in text.lower():
            return "high_school"
        elif "bachelor" in text.lower():
            return "bachelor"
        elif "master" in text.lower():
            return "master"
        return "high_school"
    
    def extract_target_level(self, text: str) -> str:
        """Extract target education level"""
        if "master" in text.lower() or "mba" in text.lower():
            return "master"
        elif "phd" in text.lower() or "doctorate" in text.lower():
            return "phd"
        return "bachelor"
    
    def extract_timeline(self, text: str) -> str:
        """Extract timeline"""
        timeline_match = re.search(r'(\d+)\s*(year|month|week)s?', text, re.IGNORECASE)
        if timeline_match:
            return f"{timeline_match.group(1)} {timeline_match.group(2)}s"
        return "2 years"
    
    def extract_coverage_list(self, text: str) -> List[str]:
        """Extract list of coverage needs"""
        coverage_types = ["medical", "dental", "vision", "prescription", "emergency"]
        text_lower = text.lower()
        found_coverage = [coverage for coverage in coverage_types if coverage in text_lower]
        return found_coverage if found_coverage else ["medical"]
    
    def extract_family_size(self, text: str) -> int:
        """Extract family size"""
        family_match = re.search(r'family of (\d+)|(\d+) family members', text, re.IGNORECASE)
        if family_match:
            return int(family_match.group(1) or family_match.group(2))
        return 1
    
    def extract_risk_factors(self, text: str) -> List[str]:
        """Extract risk factors"""
        factors = ["smoking", "diabetes", "heart disease", "high blood pressure"]
        text_lower = text.lower()
        found_factors = [factor for factor in factors if factor in text_lower]
        return found_factors
    
    def extract_investment_goals(self, text: str) -> List[str]:
        """Extract investment goals"""
        goals = ["retirement", "house", "education", "wealth building", "income"]
        text_lower = text.lower()
        found_goals = [goal for goal in goals if goal in text_lower]
        return found_goals if found_goals else ["wealth building"]
    
    def extract_team_size(self, text: str) -> int:
        """Extract team size"""
        team_match = re.search(r'team of (\d+)|(\d+) people', text, re.IGNORECASE)
        if team_match:
            return int(team_match.group(1) or team_match.group(2))
        return 1
