# 🚀 Complete AI Services Setup Guide

## 📋 Required Accounts (All Free)

### 1. **Hugging Face** (AI Models)
- Go to: https://huggingface.co/join
- Create account
- Go to Settings → Access Tokens
- Create new token with "Read" permissions
- Copy token → Add to .env.local as `HF_TOKEN`

### 2. **Railway** (Backend Hosting)
- Go to: https://railway.app/
- Sign up with GitHub
- No additional setup needed
- Railway CLI will handle deployment

### 3. **Render** (Alternative Backend Hosting)
- Go to: https://render.com/
- Sign up with GitHub
- No additional setup needed
- Used as backup option

### 4. **Cloudflare** (Tunneling & CDN)
- Go to: https://dash.cloudflare.com/sign-up
- Create account
- Go to Zero Trust → Tunnels
- Create tunnel → Copy tunnel token
- Add to .env.local as `CLOUDFLARE_TUNNEL_TOKEN`

### 5. **OpenWeatherMap** (Weather Data)
- Go to: https://openweathermap.org/api
- Sign up for free account
- Get API key from dashboard
- Add to .env.local as `WEATHER_API_KEY`

### 6. **NewsAPI** (News Data)
- Go to: https://newsapi.org/register
- Sign up for free account
- Get API key
- Add to .env.local as `NEWS_API_KEY`

### 7. **Alpha Vantage** (Financial Data)
- Go to: https://www.alphavantage.co/support/#api-key
- Get free API key
- Add to .env.local as `ALPHA_VANTAGE_KEY`

## 🔧 One-Time Setup Commands

### 1. Install Required Tools
```bash
# Install Railway CLI
npm install -g @railway/cli

# Install Cloudflare CLI
npm install -g @cloudflare/cli

# Install Docker (for local development)
# Windows/Mac: Download from docker.com
# Linux: curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
```

### 2. Clone and Setup Project
```bash
# Already in your project directory
npm install

# Install additional dependencies
npm install @huggingface/inference crewai-js langchain ollama-js

# Copy environment template
cp .env.example .env.local
```

### 3. Update .env.local File
```bash
# Edit .env.local with your API keys
nano .env.local
# OR
code .env.local
```

### 4. Deploy Everything
```bash
# Run the complete deployment script
npm run deploy:all
```

## 🎯 What Gets Deployed

### **Backend Services**
- ✅ FastAPI AI service on Railway
- ✅ n8n workflow engine on Railway
- ✅ Ollama server (local or cloud)
- ✅ Cloudflare tunnel for secure access

### **AI Capabilities**
- ✅ 12 AI Researcher services
- ✅ 12 AI Planner services  
- ✅ Multi-agent workflows
- ✅ Intelligent model routing
- ✅ Response caching

### **Frontend Updates**
- ✅ Updated service integration
- ✅ Real AI processing
- ✅ Progress indicators
- ✅ Error handling

## 🔄 Development Workflow

### **Local Development**
```bash
# Start local development
npm run dev:local

# This starts:
# - React frontend (localhost:5173)
# - AI service (localhost:8000)
# - n8n (localhost:5678)
# - Ollama (localhost:11434)
```

### **Production Deployment**
```bash
# Deploy to production
npm run deploy:prod

# This deploys:
# - Frontend to Vercel
# - Backend to Railway
# - Workflows to n8n cloud
# - Sets up Cloudflare tunnel
```

## 🔍 Verification Steps

### **1. Check Backend**
```bash
curl https://your-app.railway.app/health
# Should return: {"status": "healthy", "services": ["ai", "n8n", "ollama"]}
```

### **2. Test AI Service**
```bash
curl -X POST https://your-app.railway.app/api/ai/process \
  -H "Content-Type: application/json" \
  -d '{"service_type": "vacation-research", "input": "Paris vacation for 7 days"}'
```

### **3. Check Frontend**
- Go to your Vercel URL
- Try any AI service
- Should see real AI responses

## 🚨 Troubleshooting

### **Common Issues**
1. **Railway deployment fails** → Check .env.local has all required keys
2. **AI service timeout** → Increase timeout in railway.json
3. **Ollama not responding** → Check if model is downloaded
4. **Frontend can't connect** → Verify VITE_AI_SERVICE_URL in .env.local

### **Support Commands**
```bash
# Check deployment status
npm run status

# View logs
npm run logs

# Restart services
npm run restart

# Reset everything
npm run reset
```

## 📊 Cost Breakdown

- **Hosting**: $0 (Railway/Render free tier)
- **AI Processing**: $0 (Hugging Face free + local Ollama)
- **Database**: $0 (Supabase free tier)
- **CDN/Tunneling**: $0 (Cloudflare free)
- **APIs**: $0 (All free tier APIs)
- **Total Monthly Cost**: $0

## 🎉 Success Criteria

After setup, you should have:
- ✅ 24 working AI services (12 researchers + 12 planners)
- ✅ Real AI responses (not mock data)
- ✅ Fast response times (<30 seconds)
- ✅ Automatic fallbacks if one service fails
- ✅ Usage analytics and monitoring
- ✅ Scalable architecture for growth

Ready to transform your mock services into real AI-powered solutions! 🚀
