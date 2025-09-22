# Maintenance Master Website

## About

Professional website for Maintenance Master - Ventura County's premier construction and maintenance company. Building dreams since 1994 with expert craftsmanship, reliable service, and unmatched attention to detail.

## Features

- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **AI-Powered Chatbot**: Interactive customer service and lead qualification system
- **Service Portfolio**: Comprehensive showcase of residential, commercial, and emergency services
- **Lead Generation**: Optimized contact forms and instant quote calculators
- **SEO Optimized**: Local search optimization for Ventura County market

## Services Highlighted

- Residential Construction & Remodeling
- Commercial Construction Projects
- 24/7 Emergency Services (Water Damage, Fire Restoration)
- HOA & Property Maintenance
- Kitchen & Bathroom Renovations

## Development Setup

### Prerequisites

- Node.js (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_REPOSITORY_URL>

# Navigate to project directory
cd maintenance-master-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Technology Stack

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router for single-page application navigation

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config
```

## Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Hosting Options

- **Vercel**: Recommended for optimal performance and ease of deployment
- **Netlify**: Alternative hosting with continuous deployment
- **Traditional Web Hosts**: Upload `dist/` folder contents

### Environment Variables

Create a `.env` file for environment-specific configurations:

```bash
VITE_API_URL=your_api_endpoint
VITE_CONTACT_EMAIL=info@maintenancemaster.com
VITE_PHONE_NUMBER=8055550123
```

## SEO & Performance

- **Lighthouse Score**: Optimized for 90+ scores across all metrics
- **Local SEO**: Configured for Ventura County search visibility
- **Meta Tags**: Comprehensive social media and search engine optimization
- **Image Optimization**: Responsive images with proper alt text
- **Core Web Vitals**: Optimized loading, interactivity, and visual stability

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Maintenance Master**
- Website: https://maintenancemaster.com
- Email: info@maintenancemaster.com
- Phone: (805) 555-0123
- Service Area: Ventura County, CA

---

*Building visions, shaping the future since 1994.*