"""
AI Planners Service
Implements all 6 planning services using free AI models
"""

import asyncio
import logging
from typing import Dict, Any, List
from datetime import datetime, timedelta
import json

try:
    from .base_service import BaseAIService
    from .data_sources import DataSourceManager
    from .ai_models import AIModelManager
except ImportError:
    # Fallback imports for development
    import sys
    import os
    sys.path.append(os.path.dirname(__file__))
    from base_service import BaseAIService
    from data_sources import DataSourceManager
    from ai_models import AIModelManager

logger = logging.getLogger(__name__)

class AIPlannerService(BaseAIService):
    """AI Planners service implementation"""
    
    def __init__(self, model_router):
        super().__init__(model_router)
        self.data_sources = DataSourceManager()
        self.ai_models = AIModelManager(model_router)
        
        # Planning service mapping
        self.planning_services = {
            "vacation-planning": self.vacation_planning,
            "vacation-plan": self.vacation_planning,
            "education-planning": self.education_planning,
            "education-plan": self.education_planning,
            "insurance-planning": self.insurance_planning,
            "insurance-plan": self.insurance_planning,
            "money-investment-planning": self.investment_planning,
            "investment-planning": self.investment_planning,
            "investment-plan": self.investment_planning,
            "video-shoot-planning": self.video_shoot_planning,
            "video-shoot-plan": self.video_shoot_planning,
            "general-planning": self.general_planning,
            "general-plan": self.general_planning,
        }
    
    async def process_request(self, request) -> Dict[str, Any]:
        """Process planning request"""
        try:
            service_type = request.service_type
            input_data = request.input_data
            user_tier = request.user_tier
            
            logger.info(f"Processing {service_type} request for {user_tier} user")
            
            if service_type not in self.planning_services:
                return {
                    "success": False,
                    "error": f"Unknown planning service: {service_type}"
                }
            
            # Execute planning
            planning_func = self.planning_services[service_type]
            result = await planning_func(input_data, user_tier, request.options)
            
            return {
                "success": True,
                "data": result,
                "service_type": service_type
            }
            
        except Exception as e:
            logger.error(f"Planning request failed: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def vacation_planning(self, input_data: str, user_tier: str, options: Dict) -> Dict[str, Any]:
        """Create detailed vacation plans and itineraries"""
        try:
            # Parse planning requirements
            parsed_input = await self.ai_models.parse_vacation_planning_input(input_data)
            destination = parsed_input.get("destination", "")
            budget = parsed_input.get("budget", "")
            duration = parsed_input.get("duration", "")
            travelers = parsed_input.get("travelers", 1)
            interests = parsed_input.get("interests", [])
            
            # Get research data if available
            research_data = options.get("research_data", {})
            
            # Create detailed itinerary
            itinerary = await self.create_vacation_itinerary(
                destination, duration, interests, budget, travelers
            )
            
            # Generate budget plan
            budget_plan = await self.create_budget_plan(budget, duration, travelers, destination)
            
            # Create booking timeline
            booking_timeline = await self.create_booking_timeline(destination, duration)
            
            # Generate packing list
            packing_list = await self.create_packing_list(destination, duration, interests)
            
            # Create emergency plan
            emergency_plan = await self.create_emergency_plan(destination)
            
            planning_prompt = f"""
            Create a comprehensive vacation plan for:
            
            Destination: {destination}
            Duration: {duration}
            Budget: {budget}
            Travelers: {travelers}
            Interests: {interests}
            
            Itinerary: {json.dumps(itinerary, indent=2)}
            Budget Plan: {json.dumps(budget_plan, indent=2)}
            Booking Timeline: {json.dumps(booking_timeline, indent=2)}
            
            Provide a detailed vacation plan including:
            1. Day-by-day itinerary with activities and timing
            2. Complete budget breakdown with cost estimates
            3. Booking timeline and reservation strategy
            4. Transportation and accommodation plans
            5. Emergency contacts and backup plans
            
            Format as a comprehensive vacation plan.
            """
            
            plan_analysis = await self.ai_models.generate_plan(planning_prompt, user_tier)
            
            return {
                "vacation_plan": plan_analysis,
                "detailed_itinerary": itinerary,
                "budget_breakdown": budget_plan,
                "booking_timeline": booking_timeline,
                "packing_list": packing_list,
                "emergency_plan": emergency_plan,
                "travel_documents": await self.create_travel_documents_checklist(destination),
                "local_contacts": await self.get_local_emergency_contacts(destination),
                "plan_timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Vacation planning failed: {e}")
            raise
    
    async def education_planning(self, input_data: str, user_tier: str, options: Dict) -> Dict[str, Any]:
        """Create detailed education and career pathway plans"""
        try:
            parsed_input = await self.ai_models.parse_education_planning_input(input_data)
            field = parsed_input.get("field", "")
            current_level = parsed_input.get("current_level", "")
            target_level = parsed_input.get("target_level", "")
            timeline = parsed_input.get("timeline", "")
            budget = parsed_input.get("budget", "")
            
            # Create education pathway
            education_pathway = await self.create_education_pathway(
                field, current_level, target_level, timeline
            )
            
            # Generate application timeline
            application_timeline = await self.create_application_timeline(target_level, timeline)
            
            # Create skill development plan
            skill_plan = await self.create_skill_development_plan(field, current_level, target_level)
            
            # Generate financial plan
            financial_plan = await self.create_education_financial_plan(budget, timeline, target_level)
            
            # Create career preparation plan
            career_prep = await self.create_career_preparation_plan(field, target_level)
            
            planning_prompt = f"""
            Create a comprehensive education plan for:
            
            Field: {field}
            Current Level: {current_level}
            Target Level: {target_level}
            Timeline: {timeline}
            Budget: {budget}
            
            Education Pathway: {json.dumps(education_pathway, indent=2)}
            Application Timeline: {json.dumps(application_timeline, indent=2)}
            Skill Development: {json.dumps(skill_plan, indent=2)}
            Financial Plan: {json.dumps(financial_plan, indent=2)}
            
            Provide a detailed education plan including:
            1. Step-by-step education pathway with milestones
            2. Application strategy and timeline
            3. Skill development and learning plan
            4. Financial planning and funding options
            5. Career preparation and networking strategy
            
            Format as a comprehensive education plan.
            """
            
            plan_analysis = await self.ai_models.generate_plan(planning_prompt, user_tier)
            
            return {
                "education_plan": plan_analysis,
                "pathway_details": education_pathway,
                "application_timeline": application_timeline,
                "skill_development": skill_plan,
                "financial_plan": financial_plan,
                "career_preparation": career_prep,
                "milestone_tracking": await self.create_milestone_tracking(education_pathway),
                "resource_list": await self.create_education_resources(field, target_level),
                "plan_timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Education planning failed: {e}")
            raise
    
    async def insurance_planning(self, input_data: str, user_tier: str, options: Dict) -> Dict[str, Any]:
        """Create comprehensive insurance coverage plans"""
        try:
            parsed_input = await self.ai_models.parse_insurance_planning_input(input_data)
            coverage_needs = parsed_input.get("coverage_needs", [])
            budget = parsed_input.get("budget", "")
            family_size = parsed_input.get("family_size", 1)
            risk_factors = parsed_input.get("risk_factors", [])
            
            # Create coverage strategy
            coverage_strategy = await self.create_coverage_strategy(
                coverage_needs, family_size, risk_factors, budget
            )
            
            # Generate premium optimization plan
            premium_plan = await self.create_premium_optimization_plan(coverage_needs, budget)
            
            # Create claim strategy
            claim_strategy = await self.create_claim_strategy(coverage_needs)
            
            # Generate review schedule
            review_schedule = await self.create_insurance_review_schedule()
            
            planning_prompt = f"""
            Create a comprehensive insurance plan for:
            
            Coverage Needs: {coverage_needs}
            Budget: {budget}
            Family Size: {family_size}
            Risk Factors: {risk_factors}
            
            Coverage Strategy: {json.dumps(coverage_strategy, indent=2)}
            Premium Plan: {json.dumps(premium_plan, indent=2)}
            Claim Strategy: {json.dumps(claim_strategy, indent=2)}
            
            Provide a detailed insurance plan including:
            1. Comprehensive coverage strategy and policy selection
            2. Premium optimization and cost management
            3. Claim procedures and documentation requirements
            4. Risk management and prevention strategies
            5. Regular review and adjustment schedule
            
            Format as a comprehensive insurance plan.
            """
            
            plan_analysis = await self.ai_models.generate_plan(planning_prompt, user_tier)
            
            return {
                "insurance_plan": plan_analysis,
                "coverage_strategy": coverage_strategy,
                "premium_optimization": premium_plan,
                "claim_procedures": claim_strategy,
                "review_schedule": review_schedule,
                "risk_management": await self.create_risk_management_plan(risk_factors),
                "emergency_procedures": await self.create_insurance_emergency_procedures(),
                "plan_timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Insurance planning failed: {e}")
            raise
    
    async def investment_planning(self, input_data: str, user_tier: str, options: Dict) -> Dict[str, Any]:
        """Create detailed investment and financial plans"""
        try:
            parsed_input = await self.ai_models.parse_investment_planning_input(input_data)
            investment_goals = parsed_input.get("goals", [])
            risk_tolerance = parsed_input.get("risk_tolerance", "")
            timeline = parsed_input.get("timeline", "")
            amount = parsed_input.get("amount", "")
            current_portfolio = parsed_input.get("current_portfolio", {})
            
            # Create investment strategy
            investment_strategy = await self.create_investment_strategy(
                investment_goals, risk_tolerance, timeline, amount
            )
            
            # Generate portfolio allocation
            portfolio_allocation = await self.create_portfolio_allocation(
                amount, risk_tolerance, timeline, current_portfolio
            )
            
            # Create rebalancing schedule
            rebalancing_schedule = await self.create_rebalancing_schedule(portfolio_allocation)
            
            # Generate monitoring plan
            monitoring_plan = await self.create_investment_monitoring_plan(investment_goals)
            
            planning_prompt = f"""
            Create a comprehensive investment plan for:
            
            Investment Goals: {investment_goals}
            Risk Tolerance: {risk_tolerance}
            Timeline: {timeline}
            Investment Amount: {amount}
            Current Portfolio: {current_portfolio}
            
            Investment Strategy: {json.dumps(investment_strategy, indent=2)}
            Portfolio Allocation: {json.dumps(portfolio_allocation, indent=2)}
            Rebalancing Schedule: {json.dumps(rebalancing_schedule, indent=2)}
            
            Provide a detailed investment plan including:
            1. Strategic asset allocation and diversification
            2. Investment timeline and milestone targets
            3. Risk management and rebalancing strategy
            4. Performance monitoring and review process
            5. Tax optimization and withdrawal planning
            
            Format as a comprehensive investment plan.
            """
            
            plan_analysis = await self.ai_models.generate_plan(planning_prompt, user_tier)
            
            return {
                "investment_plan": plan_analysis,
                "strategy_details": investment_strategy,
                "portfolio_allocation": portfolio_allocation,
                "rebalancing_schedule": rebalancing_schedule,
                "monitoring_plan": monitoring_plan,
                "risk_management": await self.create_investment_risk_management(risk_tolerance),
                "tax_strategy": await self.create_tax_optimization_strategy(investment_goals),
                "plan_timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Investment planning failed: {e}")
            raise
    
    async def video_shoot_planning(self, input_data: str, user_tier: str, options: Dict) -> Dict[str, Any]:
        """Create detailed video production plans"""
        try:
            parsed_input = await self.ai_models.parse_video_planning_input(input_data)
            video_type = parsed_input.get("type", "")
            platform = parsed_input.get("platform", "")
            budget = parsed_input.get("budget", "")
            timeline = parsed_input.get("timeline", "")
            team_size = parsed_input.get("team_size", 1)
            
            # Create production schedule
            production_schedule = await self.create_production_schedule(
                video_type, timeline, team_size
            )
            
            # Generate resource allocation
            resource_allocation = await self.create_resource_allocation(
                budget, video_type, team_size
            )
            
            # Create shot list and storyboard plan
            shot_plan = await self.create_shot_plan(video_type, platform)
            
            # Generate post-production plan
            post_production_plan = await self.create_post_production_plan(video_type, timeline)
            
            planning_prompt = f"""
            Create a comprehensive video production plan for:
            
            Video Type: {video_type}
            Platform: {platform}
            Budget: {budget}
            Timeline: {timeline}
            Team Size: {team_size}
            
            Production Schedule: {json.dumps(production_schedule, indent=2)}
            Resource Allocation: {json.dumps(resource_allocation, indent=2)}
            Shot Plan: {json.dumps(shot_plan, indent=2)}
            Post-Production: {json.dumps(post_production_plan, indent=2)}
            
            Provide a detailed video production plan including:
            1. Complete production timeline and milestones
            2. Resource allocation and budget breakdown
            3. Shot list and storyboard planning
            4. Post-production workflow and delivery
            5. Quality control and review process
            
            Format as a comprehensive video production plan.
            """
            
            plan_analysis = await self.ai_models.generate_plan(planning_prompt, user_tier)
            
            return {
                "production_plan": plan_analysis,
                "schedule_details": production_schedule,
                "resource_allocation": resource_allocation,
                "shot_planning": shot_plan,
                "post_production": post_production_plan,
                "equipment_list": await self.create_equipment_list(video_type, budget),
                "crew_assignments": await self.create_crew_assignments(team_size, video_type),
                "plan_timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Video shoot planning failed: {e}")
            raise
    
    async def general_planning(self, input_data: str, user_tier: str, options: Dict) -> Dict[str, Any]:
        """Create general purpose plans for any topic"""
        try:
            # Analyze planning requirements
            planning_analysis = await self.ai_models.analyze_planning_requirements(input_data)
            
            # Create strategic framework
            strategic_framework = await self.create_strategic_framework(planning_analysis)
            
            # Generate implementation timeline
            implementation_timeline = await self.create_implementation_timeline(planning_analysis)
            
            # Create resource requirements
            resource_requirements = await self.create_resource_requirements(planning_analysis)
            
            # Generate success metrics
            success_metrics = await self.create_success_metrics(planning_analysis)
            
            planning_prompt = f"""
            Create a comprehensive plan for: {input_data}
            
            Planning Analysis: {json.dumps(planning_analysis, indent=2)}
            Strategic Framework: {json.dumps(strategic_framework, indent=2)}
            Implementation Timeline: {json.dumps(implementation_timeline, indent=2)}
            Resource Requirements: {json.dumps(resource_requirements, indent=2)}
            
            Provide a detailed plan including:
            1. Strategic framework and goal definition
            2. Implementation timeline with milestones
            3. Resource allocation and requirements
            4. Risk assessment and mitigation strategies
            5. Success metrics and monitoring plan
            
            Format as a comprehensive strategic plan.
            """
            
            plan_analysis = await self.ai_models.generate_plan(planning_prompt, user_tier)
            
            return {
                "strategic_plan": plan_analysis,
                "framework_details": strategic_framework,
                "implementation_timeline": implementation_timeline,
                "resource_requirements": resource_requirements,
                "success_metrics": success_metrics,
                "risk_assessment": await self.create_risk_assessment(planning_analysis),
                "monitoring_plan": await self.create_monitoring_plan(success_metrics),
                "plan_timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"General planning failed: {e}")
            raise
    
    # Helper methods for planning components
    async def create_vacation_itinerary(self, destination, duration, interests, budget, travelers):
        """Create detailed vacation itinerary"""
        # Implementation for itinerary creation
        days = int(duration.split()[0]) if duration else 7
        return {
            f"day_{i+1}": {
                "morning": f"Activity {i+1}A",
                "afternoon": f"Activity {i+1}B", 
                "evening": f"Activity {i+1}C"
            } for i in range(days)
        }
    
    async def create_budget_plan(self, budget, duration, travelers, destination):
        """Create detailed budget breakdown"""
        return {
            "accommodation": {"amount": "40%", "details": "Hotels/Airbnb"},
            "food": {"amount": "30%", "details": "Restaurants/Groceries"},
            "activities": {"amount": "20%", "details": "Tours/Attractions"},
            "transport": {"amount": "10%", "details": "Local transport"}
        }
    
    async def create_booking_timeline(self, destination, duration):
        """Create booking timeline"""
        return {
            "3_months_before": ["Book flights", "Reserve accommodation"],
            "1_month_before": ["Book activities", "Arrange transport"],
            "1_week_before": ["Check-in online", "Confirm bookings"]
        }
    
    async def create_packing_list(self, destination, duration, interests):
        """Create packing list"""
        return {
            "essentials": ["Passport", "Tickets", "Phone charger"],
            "clothing": ["Weather appropriate clothes", "Comfortable shoes"],
            "activities": ["Camera", "Guidebook", "Activity-specific gear"]
        }
    
    async def create_emergency_plan(self, destination):
        """Create emergency plan"""
        return {
            "emergency_contacts": ["Local emergency: 911", "Embassy contact"],
            "important_documents": ["Passport copy", "Insurance details"],
            "backup_plans": ["Alternative accommodation", "Emergency funds"]
        }
    
    # Additional helper methods would be implemented here...
    
    async def get_status(self):
        """Get service status"""
        return {
            "status": "online",
            "services_available": len(self.planning_services),
            "models_loaded": await self.ai_models.get_loaded_models(),
            "data_sources": await self.data_sources.get_status()
        }
