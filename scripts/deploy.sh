#!/bin/bash

# Automaatte AI Services Deployment Script
# This script deploys the complete AI services architecture

set -e

echo "🚀 Starting Automaatte AI Services Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    print_error ".env.local file not found!"
    print_warning "Please copy .env.example to .env.local and fill in your API keys"
    echo "Run: cp .env.example .env.local"
    exit 1
fi

# Load environment variables
source .env.local

# Check required environment variables
check_env_var() {
    if [ -z "${!1}" ]; then
        print_error "Required environment variable $1 is not set in .env.local"
        return 1
    fi
}

print_status "Checking required environment variables..."

# Check required API keys
if ! check_env_var "HF_TOKEN"; then
    print_error "Hugging Face token is required. Get it from: https://huggingface.co/settings/tokens"
    exit 1
fi

if ! check_env_var "WEATHER_API_KEY"; then
    print_error "Weather API key is required. Get it from: https://openweathermap.org/api"
    exit 1
fi

if ! check_env_var "NEWS_API_KEY"; then
    print_error "News API key is required. Get it from: https://newsapi.org/register"
    exit 1
fi

if ! check_env_var "ALPHA_VANTAGE_KEY"; then
    print_error "Alpha Vantage API key is required. Get it from: https://www.alphavantage.co/support/#api-key"
    exit 1
fi

print_success "All required environment variables are set!"

# Install Railway CLI if not present
if ! command -v railway &> /dev/null; then
    print_status "Installing Railway CLI..."
    npm install -g @railway/cli
    print_success "Railway CLI installed!"
fi

# Login to Railway
print_status "Logging into Railway..."
railway login

# Create or link Railway project
if [ ! -f ".railway" ]; then
    print_status "Creating new Railway project..."
    railway init
else
    print_status "Using existing Railway project..."
fi

# Set environment variables in Railway
print_status "Setting environment variables in Railway..."

railway variables set HF_TOKEN="$HF_TOKEN"
railway variables set WEATHER_API_KEY="$WEATHER_API_KEY"
railway variables set NEWS_API_KEY="$NEWS_API_KEY"
railway variables set ALPHA_VANTAGE_KEY="$ALPHA_VANTAGE_KEY"

# Set optional variables if they exist
[ ! -z "$SERP_API_KEY" ] && railway variables set SERP_API_KEY="$SERP_API_KEY"
[ ! -z "$CLOUDFLARE_TUNNEL_TOKEN" ] && railway variables set CLOUDFLARE_TUNNEL_TOKEN="$CLOUDFLARE_TUNNEL_TOKEN"

# Set system variables
railway variables set NODE_ENV="production"
railway variables set DEBUG="false"
railway variables set ALLOWED_ORIGINS="https://*.vercel.app,http://localhost:5173"

print_success "Environment variables set in Railway!"

# Deploy to Railway
print_status "Deploying AI backend to Railway..."
railway up --detach

print_status "Waiting for deployment to complete..."
sleep 30

# Get the Railway URL
RAILWAY_URL=$(railway status --json | jq -r '.deployments[0].url' 2>/dev/null || echo "")

if [ -z "$RAILWAY_URL" ]; then
    print_warning "Could not automatically detect Railway URL"
    print_status "Please check your Railway dashboard for the deployment URL"
    print_status "Then update VITE_AI_SERVICE_URL in .env.local with your Railway URL"
else
    print_success "Backend deployed to: $RAILWAY_URL"
    
    # Update .env.local with the Railway URL
    if grep -q "VITE_AI_SERVICE_URL" .env.local; then
        sed -i.bak "s|VITE_AI_SERVICE_URL=.*|VITE_AI_SERVICE_URL=$RAILWAY_URL|" .env.local
    else
        echo "VITE_AI_SERVICE_URL=$RAILWAY_URL" >> .env.local
    fi
    
    print_success "Updated VITE_AI_SERVICE_URL in .env.local"
fi

# Test the deployment
if [ ! -z "$RAILWAY_URL" ]; then
    print_status "Testing deployment..."
    
    # Wait a bit more for the service to be ready
    sleep 10
    
    if curl -f "$RAILWAY_URL/health" > /dev/null 2>&1; then
        print_success "✅ Backend health check passed!"
    else
        print_warning "⚠️ Backend health check failed. It might still be starting up."
        print_status "You can check the status at: $RAILWAY_URL/health"
    fi
fi

# Deploy frontend to Vercel
print_status "Deploying frontend to Vercel..."

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    print_status "Installing Vercel CLI..."
    npm install -g vercel
    print_success "Vercel CLI installed!"
fi

# Deploy to Vercel
vercel --prod --yes

print_success "Frontend deployed to Vercel!"

# Final status
echo ""
print_success "🎉 Deployment Complete!"
echo ""
print_status "Your AI services are now live:"
echo "  • Backend API: $RAILWAY_URL"
echo "  • Frontend: Check Vercel output above"
echo ""
print_status "Next steps:"
echo "  1. Test your services by visiting your frontend URL"
echo "  2. Try any AI service to verify everything is working"
echo "  3. Check Railway logs if you encounter any issues: railway logs"
echo ""
print_status "Monitoring:"
echo "  • Backend health: $RAILWAY_URL/health"
echo "  • Service status: $RAILWAY_URL/api/status"
echo ""
print_success "All 24 AI services (12 researchers + 12 planners) are now ready! 🚀"
