/**
 * AI Service Client
 * Handles communication with the AI backend
 */

import { supabase } from './supabase';

const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:8000';

interface AIServiceRequest {
  service_type: string;
  input_data: string;
  user_tier?: string;
  options?: Record<string, any>;
}

interface AIServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
  processing_time: number;
  service_type: string;
  timestamp: string;
  cached?: boolean;
}

class AIServiceClient {
  private baseURL: string;

  constructor() {
    this.baseURL = AI_SERVICE_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || null;
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  private async makeRequest(endpoint: string, data: AIServiceRequest): Promise<AIServiceResponse> {
    try {
      const token = await this.getAuthToken();
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI Service request failed:', error);
      
      // Return fallback response
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        processing_time: 0,
        service_type: data.service_type,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Main AI processing endpoint
  async processAIRequest(serviceType: string, inputData: string, userTier: string = 'free', options: Record<string, any> = {}): Promise<AIServiceResponse> {
    return this.makeRequest('/api/ai/process', {
      service_type: serviceType,
      input_data: inputData,
      user_tier: userTier,
      options,
    });
  }

  // AI Researchers endpoints
  async vacationResearch(inputData: string, userTier: string = 'free'): Promise<AIServiceResponse> {
    return this.makeRequest('/api/researchers/vacation', {
      service_type: 'vacation-research',
      input_data: inputData,
      user_tier: userTier,
    });
  }

  async educationResearch(inputData: string, userTier: string = 'free'): Promise<AIServiceResponse> {
    return this.makeRequest('/api/researchers/education', {
      service_type: 'education-research',
      input_data: inputData,
      user_tier: userTier,
    });
  }

  async insuranceResearch(inputData: string, userTier: string = 'free'): Promise<AIServiceResponse> {
    return this.makeRequest('/api/researchers/insurance', {
      service_type: 'insurance-research',
      input_data: inputData,
      user_tier: userTier,
    });
  }

  async investmentResearch(inputData: string, userTier: string = 'free'): Promise<AIServiceResponse> {
    return this.makeRequest('/api/researchers/investment', {
      service_type: 'investment-research',
      input_data: inputData,
      user_tier: userTier,
    });
  }

  async videoShootResearch(inputData: string, userTier: string = 'free'): Promise<AIServiceResponse> {
    return this.makeRequest('/api/researchers/video-shoot', {
      service_type: 'video-shoot-research',
      input_data: inputData,
      user_tier: userTier,
    });
  }

  async generalResearch(inputData: string, userTier: string = 'free'): Promise<AIServiceResponse> {
    return this.makeRequest('/api/researchers/general', {
      service_type: 'general-research',
      input_data: inputData,
      user_tier: userTier,
    });
  }

  // AI Planners endpoints
  async vacationPlanning(inputData: string, userTier: string = 'free', researchData?: any): Promise<AIServiceResponse> {
    return this.makeRequest('/api/planners/vacation', {
      service_type: 'vacation-planning',
      input_data: inputData,
      user_tier: userTier,
      options: { research_data: researchData },
    });
  }

  async educationPlanning(inputData: string, userTier: string = 'free', researchData?: any): Promise<AIServiceResponse> {
    return this.makeRequest('/api/planners/education', {
      service_type: 'education-planning',
      input_data: inputData,
      user_tier: userTier,
      options: { research_data: researchData },
    });
  }

  async insurancePlanning(inputData: string, userTier: string = 'free', researchData?: any): Promise<AIServiceResponse> {
    return this.makeRequest('/api/planners/insurance', {
      service_type: 'insurance-planning',
      input_data: inputData,
      user_tier: userTier,
      options: { research_data: researchData },
    });
  }

  async investmentPlanning(inputData: string, userTier: string = 'free', researchData?: any): Promise<AIServiceResponse> {
    return this.makeRequest('/api/planners/money-investment', {
      service_type: 'money-investment-planning',
      input_data: inputData,
      user_tier: userTier,
      options: { research_data: researchData },
    });
  }

  async videoShootPlanning(inputData: string, userTier: string = 'free', researchData?: any): Promise<AIServiceResponse> {
    return this.makeRequest('/api/planners/video-shoot', {
      service_type: 'video-shoot-planning',
      input_data: inputData,
      user_tier: userTier,
      options: { research_data: researchData },
    });
  }

  async generalPlanning(inputData: string, userTier: string = 'free', researchData?: any): Promise<AIServiceResponse> {
    return this.makeRequest('/api/planners/general', {
      service_type: 'general-planning',
      input_data: inputData,
      user_tier: userTier,
      options: { research_data: researchData },
    });
  }

  // Service status and health checks
  async getServiceStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/api/status`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`Status check failed: ${response.status}`);
    } catch (error) {
      console.error('Service status check failed:', error);
      return { error: 'Service unavailable' };
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // Utility method to determine user tier from user data
  getUserTier(user: any): string {
    if (!user) return 'free';
    
    const userType = user.user_type || user.type;
    
    switch (userType) {
      case 'admin':
      case 'special':
        return 'special';
      case 'paid':
      case 'core':
        return 'core';
      default:
        return 'free';
    }
  }

  // Combined research + planning workflow
  async researchAndPlan(serviceType: string, inputData: string, userTier: string = 'free'): Promise<{
    research: AIServiceResponse;
    plan: AIServiceResponse;
  }> {
    // First, do research
    const researchMethod = this.getResearchMethod(serviceType);
    const research = await researchMethod.call(this, inputData, userTier);

    // Then, create plan using research data
    const planningMethod = this.getPlanningMethod(serviceType);
    const plan = await planningMethod.call(this, inputData, userTier, research.data);

    return { research, plan };
  }

  private getResearchMethod(serviceType: string) {
    const methodMap: Record<string, Function> = {
      'vacation': this.vacationResearch,
      'education': this.educationResearch,
      'insurance': this.insuranceResearch,
      'investment': this.investmentResearch,
      'video-shoot': this.videoShootResearch,
      'general': this.generalResearch,
    };

    return methodMap[serviceType] || this.generalResearch;
  }

  private getPlanningMethod(serviceType: string) {
    const methodMap: Record<string, Function> = {
      'vacation': this.vacationPlanning,
      'education': this.educationPlanning,
      'insurance': this.insurancePlanning,
      'investment': this.investmentPlanning,
      'video-shoot': this.videoShootPlanning,
      'general': this.generalPlanning,
    };

    return methodMap[serviceType] || this.generalPlanning;
  }
}

// Export singleton instance
export const aiService = new AIServiceClient();

// Export types
export type { AIServiceRequest, AIServiceResponse };
