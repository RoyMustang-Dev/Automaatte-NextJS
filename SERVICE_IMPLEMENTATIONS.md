# 🛠️ Detailed Service Implementations

## 🔬 AI Researchers Implementation

### **1. Vacation Researching**
```python
# CrewAI Agent Setup
vacation_researcher = Agent(
    role='Vacation Research Specialist',
    goal='Gather comprehensive travel information',
    backstory='Expert in travel planning and destination research',
    tools=[
        WebSearchTool(),
        WeatherTool(),
        CurrencyTool(),
        ReviewAnalysisTool()
    ],
    llm=OllamaLLM(model="llama2")
)

# n8n Workflow
1. Receive request → Parse destination/dates/budget
2. Trigger CrewAI research task
3. Gather data from multiple sources
4. Analyze and compile report
5. Return structured response
```

### **2. Education Researching**
```python
# Specialized agent for education
education_researcher = Agent(
    role='Education Research Analyst',
    goal='Find optimal educational pathways',
    tools=[
        CourseSearchTool(),
        UniversityRankingTool(),
        CareerProspectTool(),
        CostAnalysisTool()
    ],
    llm=HuggingFaceLLM(model="microsoft/DialoGPT-large")
)
```

### **3. Investment Researching**
```python
# Financial research agent
investment_researcher = Agent(
    role='Investment Research Analyst',
    goal='Analyze investment opportunities',
    tools=[
        MarketDataTool(),
        NewsAnalysisTool(),
        RiskAssessmentTool(),
        TechnicalAnalysisTool()
    ],
    llm=OllamaLLM(model="mistral")
)
```

## 📋 AI Planners Implementation

### **1. Vacation Planning**
```python
# Planning agent that uses research data
vacation_planner = Agent(
    role='Vacation Planning Specialist',
    goal='Create detailed travel itineraries',
    tools=[
        ItineraryBuilderTool(),
        BookingTool(),
        BudgetPlannerTool(),
        ActivitySchedulerTool()
    ],
    llm=OllamaLLM(model="codellama")
)

# Multi-agent workflow
crew = Crew(
    agents=[vacation_researcher, vacation_planner],
    tasks=[research_task, planning_task],
    process=Process.sequential
)
```

### **2. Education Planning**
```python
# Education pathway planner
education_planner = Agent(
    role='Education Path Planner',
    goal='Create step-by-step education plans',
    tools=[
        TimelineTool(),
        ApplicationTool(),
        SkillMapTool(),
        GoalSettingTool()
    ]
)
```

## 🔧 n8n Workflow Templates

### **Service Request Handler**
```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "ai-service",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Service Router",
      "type": "n8n-nodes-base.switch",
      "parameters": {
        "rules": {
          "rules": [
            {
              "operation": "equal",
              "value1": "{{ $json.service_type }}",
              "value2": "vacation-research"
            }
          ]
        }
      }
    },
    {
      "name": "AI Processing",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "http://localhost:8000/process",
        "method": "POST"
      }
    }
  ]
}
```

### **Response Formatter**
```json
{
  "name": "Format Response",
  "type": "n8n-nodes-base.function",
  "parameters": {
    "functionCode": `
      const result = items[0].json;
      return [{
        json: {
          success: true,
          data: result.output,
          timestamp: new Date().toISOString(),
          service: result.service_type
        }
      }];
    `
  }
}
```

## 🤖 Hugging Face Integration

### **Model Selection Strategy**
```python
# Light tasks - Fast response
LIGHT_MODELS = {
    'text-generation': 'microsoft/DialoGPT-small',
    'summarization': 'facebook/bart-large-cnn',
    'sentiment': 'cardiffnlp/twitter-roberta-base-sentiment'
}

# Heavy tasks - Better quality
HEAVY_MODELS = {
    'text-generation': 'microsoft/DialoGPT-large',
    'code-generation': 'Salesforce/codegen-350M-mono',
    'analysis': 'facebook/bart-large'
}

# Model router
def select_model(task_complexity, user_tier):
    if user_tier == 'free' or task_complexity == 'light':
        return LIGHT_MODELS
    else:
        return HEAVY_MODELS
```

### **API Integration**
```python
from transformers import pipeline
import requests

class HuggingFaceService:
    def __init__(self):
        self.api_url = "https://api-inference.huggingface.co/models/"
        self.headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    
    def generate_text(self, prompt, model="microsoft/DialoGPT-medium"):
        response = requests.post(
            f"{self.api_url}{model}",
            headers=self.headers,
            json={"inputs": prompt}
        )
        return response.json()
    
    def analyze_sentiment(self, text):
        classifier = pipeline("sentiment-analysis")
        return classifier(text)
```

## 🦙 Ollama Local Setup

### **Model Management**
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull models
ollama pull llama2
ollama pull codellama
ollama pull mistral
ollama pull phi

# Start server
ollama serve
```

### **Python Integration**
```python
import ollama

class OllamaService:
    def __init__(self):
        self.client = ollama.Client()
    
    def generate(self, prompt, model="llama2"):
        response = self.client.generate(
            model=model,
            prompt=prompt,
            stream=False
        )
        return response['response']
    
    def chat(self, messages, model="llama2"):
        response = self.client.chat(
            model=model,
            messages=messages
        )
        return response['message']['content']
```

## 🌐 Deployment Strategy

### **Railway Deployment**
```dockerfile
# Dockerfile for n8n + AI services
FROM n8nio/n8n:latest

# Install Python and dependencies
RUN apk add --no-cache python3 py3-pip
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy AI service code
COPY ai_services/ /ai_services/

# Start both n8n and AI service
CMD ["sh", "-c", "python /ai_services/main.py & n8n start"]
```

### **Environment Variables**
```env
# Hugging Face
HF_TOKEN=your_hf_token

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key

# n8n
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password

# Ollama
OLLAMA_HOST=localhost:11434
```
