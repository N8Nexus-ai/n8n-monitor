# n8n Monitor - Observer Dashboard

A modern, real-time observability dashboard for monitoring and managing your n8n workflows. Built with a beautiful, responsive UI that provides comprehensive insights into your workflow executions, performance metrics, and system status.

## ✨ Features

- 📊 **Real-time Dashboard** - Monitor key metrics and execution trends at a glance
- 📈 **Interactive Charts** - Visualize execution data with beautiful area charts
- 🔍 **Workflow Management** - Search, filter, and manage all your workflows
- 📝 **Execution History** - Track all workflow executions with detailed status information
- 🎨 **Modern UI** - Beautiful design with smooth animations and transitions
- 🌙 **Dark Theme** - Optimized dark theme for comfortable viewing
- ⚡ **Fast & Responsive** - Built with modern React and optimized for performance

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **Routing**: React Router
- **State Management**: TanStack Query
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm, yarn, or bun

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd n8n-monitor

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Start development server
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
n8n-monitor/
├── src/
│   ├── components/
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── layout/         # Layout components (Sidebar, etc.)
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and mock data
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Design Features

### Modern UI Elements
- **Gradient Cards** - Beautiful gradient backgrounds for metric cards
- **Smooth Animations** - Fade-in, slide-up, and scale animations
- **Glass Morphism** - Backdrop blur effects for modern aesthetics
- **Interactive Hover States** - Enhanced user experience with hover effects
- **Responsive Grid Layouts** - Adaptive layouts for all screen sizes

### Visual Enhancements
- Custom scrollbars
- Animated status indicators
- Gradient badges and icons
- Smooth transitions and micro-interactions
- Professional color scheme with proper contrast

## 📊 Dashboard Pages

### Dashboard
- Real-time metrics overview
- Execution trends chart (24h)
- Active workflows list
- Recent executions feed

### Workflows
- Grid view of all workflows
- Search and filter functionality
- Status indicators
- Workflow tags and metadata

### Executions
- Detailed execution history
- Status-based filtering
- Duration and timing information
- Workflow association

### Audit & Settings
- System audit logs
- Configuration management

## 🔌 API Integration

This project is designed to integrate with the n8n API. Currently using mock data for development. To connect to a real n8n instance:

1. Configure your n8n API endpoint
2. Add API key authentication
3. Update the API client in `src/lib/api/`

## 🎯 Key Improvements

### Design Enhancements
- ✅ Modern gradient-based design system
- ✅ Improved typography and spacing
- ✅ Enhanced card components with backdrop blur
- ✅ Smooth animations and transitions
- ✅ Better visual hierarchy
- ✅ Responsive and accessible UI

### User Experience
- ✅ Intuitive navigation
- ✅ Clear status indicators
- ✅ Real-time updates
- ✅ Fast search and filtering
- ✅ Consistent design language

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to be deployed to any static hosting service.

### Recommended Hosting

- **Vercel** - Zero-config deployment
- **Netlify** - Static site hosting
- **Cloudflare Pages** - Fast global CDN
- **AWS S3 + CloudFront** - Enterprise hosting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)

---

Made with ❤️ for n8n workflow monitoring
