# Automaatte - AI Automation Agency Platform

**Transforming Tomorrow, Today**

A comprehensive AI-powered automation platform that provides intelligent research and planning services across multiple industries. Built with React, TypeScript, Framer Motion, and Shadcn UI.

## 🚀 Features

### Core AI Services

#### AI Researchers
- **Vacation Research**: Comprehensive travel planning insights
- **Education Research**: Career pathway guidance and recommendations
- **Insurance Research**: Detailed analysis of insurance options
- **Investment Research**: Market analysis and investment strategies
- **Video Shoot Research**: Content strategy and production planning

#### AI Planners
- **Vacation Planning**: Personalized itineraries and travel plans
- **Education Planning**: Academic and career roadmaps
- **Insurance Planning**: Coverage optimization strategies
- **Investment Planning**: Portfolio management and allocation
- **Video Production Planning**: Complete production workflows

#### Specialized Services
- **Custom Chatbots**: Intelligent conversational AI
- **Social Media Automation**: Content creation for multiple platforms
- **IT Automation**: Excel formulas, database queries, Power BI functions
- **Recommendation Systems**: Personalized suggestions across various domains

#### Complimentary Services (Free)
- **Text Summarization**: Instant document analysis
- **Video Summarization**: Key insights extraction
- **Document Q&A**: Interactive document querying
- **Real-time Translation**: Multi-language support

### Key Features
- **Service Interconnectivity**: Research outputs can feed into planning services
- **Interactive Workflows**: Step-by-step guided processes
- **Real-time Processing**: Live updates and progress tracking
- **Comprehensive Dashboard**: Manage all services and workflows
- **Responsive Design**: Optimized for all devices
- **Advanced Animations**: Smooth Framer Motion interactions

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion
- **UI Components**: Shadcn UI + Radix UI
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React + Tabler Icons
- **Build Tool**: Vite
- **Authentication**: Supabase (configured)
- **Payments**: Stripe (configured)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Automaatte-NextJS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Pink (#EC4899) gradients
- **Secondary**: Blue (#06B6D4) to Cyan gradients
- **Accent**: Green, Orange, and custom gradients
- **Background**: Dark slate with purple undertones
- **Text**: White with gray variations

### Animations
- **Framer Motion**: Page transitions, component animations
- **Custom CSS**: Floating elements, gradient shifts, pulse effects
- **Interactive**: Hover states, click feedback, loading states

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── forms/              # Service-specific forms
│   ├── ServiceCard.tsx     # Individual service cards
│   ├── ServiceModal.tsx    # Service selection modal
│   ├── ServiceManager.tsx  # Main service orchestrator
│   ├── ServiceWorkflow.tsx # Interconnected workflows
│   ├── ServiceDashboard.tsx# User dashboard
│   ├── HeroSection.tsx     # Landing page hero
│   ├── ServicesSection.tsx # Services showcase
│   ├── AuthModal.tsx       # Authentication
│   └── PaymentModal.tsx    # Payment processing
├── data/
│   └── services.ts         # Service definitions
├── lib/
│   ├── utils.ts           # Utility functions
│   └── supabase.ts        # Database client
└── App.tsx                # Main application
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color variables
- Animation keyframes
- Extended spacing and sizing
- Custom component variants

## 🎯 Usage

### Basic Workflow
1. **Select a Service**: Choose from AI Researchers or Planners
2. **Choose Mode**: Independent or interconnected workflow
3. **Fill Form**: Provide detailed requirements
4. **Process**: Watch AI analyze and generate results
5. **Review**: Access comprehensive reports and insights

### Service Interconnectivity
- Start with a Research service
- Get comprehensive analysis
- Option to feed results into Planning service
- Additional user input for customization
- Complete end-to-end solution

### Dashboard Features
- **Overview**: Quick stats and recent activity
- **Workflows**: Manage active and completed processes
- **Results**: Access all generated reports
- **Analytics**: Usage patterns and performance metrics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
The project is configured for easy deployment to modern hosting platforms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: hello@automaatte.com
- Documentation: [Coming Soon]
- Community: [Coming Soon]

---

**Automaatte Pvt. Ltd.** - Transforming Tomorrow, Today