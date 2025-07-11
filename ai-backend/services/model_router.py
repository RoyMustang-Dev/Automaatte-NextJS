"""
Model Router
Intelligent routing between different AI models based on task complexity and user tier
"""

import os
import logging
import asyncio
from typing import Dict, Any, List, Optional
from datetime import datetime
import aiohttp
import json

logger = logging.getLogger(__name__)

class ModelRouter:
    """Routes requests to appropriate AI models"""
    
    def __init__(self):
        self.hf_token = os.getenv("HF_TOKEN")
        self.ollama_host = os.getenv("OLLAMA_HOST", "localhost:11434")
        self.models_status = {}
        self.request_count = 0
        
        # Model configurations
        self.hf_models = {
            "light": {
                "text-generation": "microsoft/DialoGPT-small",
                "summarization": "facebook/bart-large-cnn",
                "sentiment": "cardiffnlp/twitter-roberta-base-sentiment-latest",
                "question-answering": "deepset/roberta-base-squad2"
            },
            "medium": {
                "text-generation": "microsoft/DialoGPT-medium", 
                "summarization": "facebook/bart-large",
                "analysis": "microsoft/DialoGPT-large",
                "planning": "microsoft/DialoGPT-medium"
            },
            "heavy": {
                "text-generation": "microsoft/DialoGPT-large",
                "code-generation": "Salesforce/codegen-350M-mono",
                "analysis": "facebook/bart-large",
                "planning": "microsoft/DialoGPT-large"
            }
        }
        
        self.ollama_models = {
            "llama2": {"size": "7b", "use_case": "general"},
            "mistral": {"size": "7b", "use_case": "reasoning"},
            "codellama": {"size": "7b", "use_case": "code"},
            "phi": {"size": "3b", "use_case": "lightweight"}
        }
    
    async def initialize(self):
        """Initialize model router"""
        logger.info("Initializing Model Router...")
        
        # Check Hugging Face availability
        await self.check_hf_availability()
        
        # Check Ollama availability
        await self.check_ollama_availability()
        
        logger.info("Model Router initialized successfully")
    
    async def check_hf_availability(self):
        """Check Hugging Face model availability"""
        try:
            if not self.hf_token:
                logger.warning("No Hugging Face token provided")
                self.models_status["huggingface"] = "unavailable"
                return
            
            # Test with a simple model
            async with aiohttp.ClientSession() as session:
                headers = {"Authorization": f"Bearer {self.hf_token}"}
                url = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-small"
                
                async with session.post(
                    url,
                    headers=headers,
                    json={"inputs": "Hello"},
                    timeout=aiohttp.ClientTimeout(total=10)
                ) as response:
                    if response.status == 200:
                        self.models_status["huggingface"] = "available"
                        logger.info("✅ Hugging Face models available")
                    else:
                        self.models_status["huggingface"] = "limited"
                        logger.warning(f"⚠️ Hugging Face limited access: {response.status}")
                        
        except Exception as e:
            logger.error(f"❌ Hugging Face unavailable: {e}")
            self.models_status["huggingface"] = "unavailable"
    
    async def check_ollama_availability(self):
        """Check Ollama model availability"""
        try:
            async with aiohttp.ClientSession() as session:
                url = f"http://{self.ollama_host}/api/tags"
                
                async with session.get(
                    url,
                    timeout=aiohttp.ClientTimeout(total=5)
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        available_models = [model["name"] for model in data.get("models", [])]
                        self.models_status["ollama"] = {
                            "status": "available",
                            "models": available_models
                        }
                        logger.info(f"✅ Ollama available with models: {available_models}")
                    else:
                        self.models_status["ollama"] = {"status": "unavailable"}
                        logger.warning("⚠️ Ollama server not responding")
                        
        except Exception as e:
            logger.error(f"❌ Ollama unavailable: {e}")
            self.models_status["ollama"] = {"status": "unavailable"}
    
    async def route_request(self, task_type: str, complexity: str, user_tier: str, prompt: str) -> Dict[str, Any]:
        """Route request to appropriate model"""
        self.request_count += 1
        
        # Determine best model based on criteria
        model_choice = self.select_model(task_type, complexity, user_tier)
        
        logger.info(f"Routing {task_type} request to {model_choice['provider']}:{model_choice['model']}")
        
        try:
            if model_choice["provider"] == "huggingface":
                return await self.call_huggingface(model_choice["model"], prompt, task_type)
            elif model_choice["provider"] == "ollama":
                return await self.call_ollama(model_choice["model"], prompt)
            else:
                return await self.fallback_response(prompt, task_type)
                
        except Exception as e:
            logger.error(f"Model call failed: {e}")
            return await self.fallback_response(prompt, task_type)
    
    def select_model(self, task_type: str, complexity: str, user_tier: str) -> Dict[str, str]:
        """Select best model for the task"""
        
        # Priority logic
        if user_tier == "free" and complexity == "light":
            # Use Hugging Face for quick responses
            if self.models_status.get("huggingface") == "available":
                model = self.hf_models["light"].get(task_type, self.hf_models["light"]["text-generation"])
                return {"provider": "huggingface", "model": model}
        
        elif complexity in ["medium", "heavy"] or user_tier in ["core", "special"]:
            # Use Ollama for better quality
            if self.models_status.get("ollama", {}).get("status") == "available":
                # Select best Ollama model for task
                if task_type in ["code-generation", "planning"]:
                    return {"provider": "ollama", "model": "codellama"}
                elif task_type in ["analysis", "reasoning"]:
                    return {"provider": "ollama", "model": "mistral"}
                else:
                    return {"provider": "ollama", "model": "llama2"}
        
        # Fallback to available models
        if self.models_status.get("huggingface") == "available":
            model = self.hf_models["medium"].get(task_type, self.hf_models["medium"]["text-generation"])
            return {"provider": "huggingface", "model": model}
        elif self.models_status.get("ollama", {}).get("status") == "available":
            return {"provider": "ollama", "model": "llama2"}
        else:
            return {"provider": "fallback", "model": "none"}
    
    async def call_huggingface(self, model: str, prompt: str, task_type: str) -> Dict[str, Any]:
        """Call Hugging Face model"""
        try:
            async with aiohttp.ClientSession() as session:
                headers = {"Authorization": f"Bearer {self.hf_token}"}
                url = f"https://api-inference.huggingface.co/models/{model}"
                
                # Prepare payload based on task type
                if task_type == "text-generation":
                    payload = {
                        "inputs": prompt,
                        "parameters": {
                            "max_new_tokens": 500,
                            "temperature": 0.7,
                            "do_sample": True
                        }
                    }
                else:
                    payload = {"inputs": prompt}
                
                async with session.post(
                    url,
                    headers=headers,
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as response:
                    
                    if response.status == 200:
                        result = await response.json()
                        
                        # Extract text based on model response format
                        if isinstance(result, list) and len(result) > 0:
                            if "generated_text" in result[0]:
                                text = result[0]["generated_text"]
                                # Remove input prompt from response
                                if text.startswith(prompt):
                                    text = text[len(prompt):].strip()
                                return {"success": True, "text": text, "provider": "huggingface"}
                            elif "summary_text" in result[0]:
                                return {"success": True, "text": result[0]["summary_text"], "provider": "huggingface"}
                            else:
                                return {"success": True, "text": str(result[0]), "provider": "huggingface"}
                        else:
                            return {"success": True, "text": str(result), "provider": "huggingface"}
                    else:
                        error_text = await response.text()
                        logger.error(f"HF API error {response.status}: {error_text}")
                        return {"success": False, "error": f"API error: {response.status}"}
                        
        except asyncio.TimeoutError:
            logger.error("Hugging Face request timeout")
            return {"success": False, "error": "Request timeout"}
        except Exception as e:
            logger.error(f"Hugging Face call failed: {e}")
            return {"success": False, "error": str(e)}
    
    async def call_ollama(self, model: str, prompt: str) -> Dict[str, Any]:
        """Call Ollama model"""
        try:
            async with aiohttp.ClientSession() as session:
                url = f"http://{self.ollama_host}/api/generate"
                payload = {
                    "model": model,
                    "prompt": prompt,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "top_p": 0.9
                    }
                }
                
                async with session.post(
                    url,
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=60)
                ) as response:
                    
                    if response.status == 200:
                        result = await response.json()
                        return {
                            "success": True,
                            "text": result.get("response", ""),
                            "provider": "ollama"
                        }
                    else:
                        error_text = await response.text()
                        logger.error(f"Ollama error {response.status}: {error_text}")
                        return {"success": False, "error": f"Ollama error: {response.status}"}
                        
        except asyncio.TimeoutError:
            logger.error("Ollama request timeout")
            return {"success": False, "error": "Request timeout"}
        except Exception as e:
            logger.error(f"Ollama call failed: {e}")
            return {"success": False, "error": str(e)}
    
    async def fallback_response(self, prompt: str, task_type: str) -> Dict[str, Any]:
        """Generate fallback response when models are unavailable"""
        logger.warning("Using fallback response - no models available")
        
        fallback_responses = {
            "text-generation": f"I understand you're asking about: {prompt[:100]}... I'm currently experiencing high demand. Please try again in a few moments for a detailed AI-generated response.",
            "analysis": f"Analysis request received for: {prompt[:100]}... Our AI analysis service is temporarily busy. Please retry shortly for comprehensive insights.",
            "planning": f"Planning request for: {prompt[:100]}... Our AI planning service is currently processing high volume. Please try again soon for a detailed plan.",
            "research": f"Research query: {prompt[:100]}... Our research AI is temporarily unavailable. Please retry in a moment for comprehensive research results."
        }
        
        return {
            "success": True,
            "text": fallback_responses.get(task_type, fallback_responses["text-generation"]),
            "provider": "fallback",
            "note": "This is a fallback response. AI models are temporarily unavailable."
        }
    
    async def health_check(self) -> bool:
        """Check if any models are available"""
        await self.check_hf_availability()
        await self.check_ollama_availability()
        
        return (
            self.models_status.get("huggingface") == "available" or
            self.models_status.get("ollama", {}).get("status") == "available"
        )
    
    async def get_status(self) -> Dict[str, Any]:
        """Get detailed status"""
        return {
            "models_status": self.models_status,
            "request_count": self.request_count,
            "available_providers": [
                provider for provider, status in self.models_status.items()
                if (status == "available" or (isinstance(status, dict) and status.get("status") == "available"))
            ]
        }
    
    async def get_available_models(self) -> List[str]:
        """Get list of available models"""
        models = []
        
        if self.models_status.get("huggingface") == "available":
            for category in self.hf_models.values():
                models.extend(category.values())
        
        if self.models_status.get("ollama", {}).get("status") == "available":
            models.extend(self.models_status["ollama"].get("models", []))
        
        return list(set(models))
