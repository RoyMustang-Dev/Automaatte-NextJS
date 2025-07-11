#!/bin/bash

# Automaatte AI Services Setup Script
# One-command setup for the complete AI services architecture

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}================================${NC}"
}

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

# Welcome message
clear
print_header "🚀 AUTOMAATTE AI SERVICES SETUP"
echo ""
echo "This script will set up the complete AI services architecture."
echo "You'll get 24 working AI services (12 researchers + 12 planners) for FREE!"
echo ""
echo "What you'll get:"
echo "  ✅ Real AI-powered research services"
echo "  ✅ Intelligent planning services"
echo "  ✅ Multi-model AI routing (Hugging Face + Ollama)"
echo "  ✅ Production-ready deployment"
echo "  ✅ $0/month hosting costs"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    print_warning ".env.local already exists"
    echo "Do you want to:"
    echo "1) Keep existing .env.local and continue"
    echo "2) Reset .env.local from template"
    echo "3) Exit and configure manually"
    read -p "Choose (1/2/3): " choice
    
    case $choice in
        2)
            print_status "Resetting .env.local from template..."
            cp .env.example .env.local
            ;;
        3)
            echo "Please configure .env.local manually and run: npm run deploy:all"
            exit 0
            ;;
        *)
            print_status "Keeping existing .env.local"
            ;;
    esac
else
    print_status "Creating .env.local from template..."
    cp .env.example .env.local
fi

# Guide user through API key setup
print_header "📋 API KEYS SETUP"
echo ""
echo "You need to get FREE API keys from these services:"
echo ""
echo "1. 🤗 Hugging Face (REQUIRED)"
echo "   • Go to: https://huggingface.co/settings/tokens"
echo "   • Create a new token with 'Read' permissions"
echo "   • Copy the token"
echo ""
echo "2. 🌤️ OpenWeatherMap (REQUIRED)"
echo "   • Go to: https://openweathermap.org/api"
echo "   • Sign up for free account"
echo "   • Get your API key from dashboard"
echo ""
echo "3. 📰 NewsAPI (REQUIRED)"
echo "   • Go to: https://newsapi.org/register"
echo "   • Sign up for free account"
echo "   • Get your API key"
echo ""
echo "4. 📈 Alpha Vantage (REQUIRED)"
echo "   • Go to: https://www.alphavantage.co/support/#api-key"
echo "   • Get your free API key"
echo ""
echo "5. ☁️ Cloudflare Tunnel (OPTIONAL)"
echo "   • Go to: https://dash.cloudflare.com/zero-trust/tunnels"
echo "   • Create tunnel for custom domain"
echo ""

read -p "Have you obtained all the required API keys? (y/n): " keys_ready

if [ "$keys_ready" != "y" ] && [ "$keys_ready" != "Y" ]; then
    print_warning "Please get the API keys first, then run this script again."
    echo ""
    echo "Quick links:"
    echo "  • Hugging Face: https://huggingface.co/settings/tokens"
    echo "  • Weather API: https://openweathermap.org/api"
    echo "  • News API: https://newsapi.org/register"
    echo "  • Financial API: https://www.alphavantage.co/support/#api-key"
    echo ""
    echo "After getting the keys, edit .env.local and run: npm run deploy:all"
    exit 0
fi

# Install dependencies
print_header "📦 INSTALLING DEPENDENCIES"
print_status "Installing Node.js dependencies..."
npm install

print_status "Installing additional AI dependencies..."
npm install concurrently

# Check for required tools
print_header "🔧 CHECKING REQUIRED TOOLS"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js installed: $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_success "npm installed: $NPM_VERSION"
else
    print_error "npm not found. Please install npm"
    exit 1
fi

# Install Railway CLI
if ! command -v railway &> /dev/null; then
    print_status "Installing Railway CLI..."
    npm install -g @railway/cli
    print_success "Railway CLI installed!"
else
    print_success "Railway CLI already installed"
fi

# Install Vercel CLI
if ! command -v vercel &> /dev/null; then
    print_status "Installing Vercel CLI..."
    npm install -g vercel
    print_success "Vercel CLI installed!"
else
    print_success "Vercel CLI already installed"
fi

# Final instructions
print_header "🎯 NEXT STEPS"
echo ""
print_status "Setup complete! Now you need to:"
echo ""
echo "1. 📝 Edit .env.local file:"
echo "   • Add your Hugging Face token"
echo "   • Add your Weather API key"
echo "   • Add your News API key"
echo "   • Add your Alpha Vantage key"
echo ""
echo "2. 🚀 Deploy everything:"
echo "   npm run deploy:all"
echo ""
echo "3. ✅ Test your services:"
echo "   • Visit your deployed frontend"
echo "   • Try any AI service"
echo "   • Enjoy real AI responses!"
echo ""

print_success "🎉 Setup complete!"
echo ""
print_warning "Remember: Edit .env.local with your API keys, then run: npm run deploy:all"
echo ""
echo "Need help? Check the SETUP_GUIDE.md file for detailed instructions."
