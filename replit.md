# SafeBrowse - AI-Powered Parental Control Browser

## Overview

SafeBrowse is an AI-powered parental control browser designed to protect children from harmful online content while maintaining a seamless browsing experience. The application features real-time content monitoring with advanced machine learning algorithms that analyze web content across multiple dimensions including text, images, videos, and website context. The system provides comprehensive protection against pornography, gambling, violence, inappropriate language, and other harmful categories with high accuracy rates.

The application is built as a landing page to showcase the product's capabilities and gather user interest through a waitlist system. It emphasizes trust, safety, and cutting-edge AI technology while maintaining an approachable design that appeals to parents seeking robust online protection for their children.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React with TypeScript, utilizing Vite as the build tool for fast development and optimized production builds. The component library is based on shadcn/ui with Radix UI primitives, providing accessible and customizable UI components. Tailwind CSS handles styling with a custom design system that emphasizes trust and safety through a carefully chosen color palette of deep blues, protective greens, and neutral tones.

The frontend architecture follows a component-based approach with:
- **Component Structure**: Modular components for Header, Hero, Features, Technology, Safety sections, and Footer
- **State Management**: React Query for server state management and local React state for UI interactions
- **Routing**: Single-page application structure focused on the landing page experience
- **Authentication Flow**: Integration with Replit's authentication system for user management

### Backend Architecture
The server-side application uses Express.js with TypeScript, providing a RESTful API architecture. The backend implements:
- **Authentication System**: OpenID Connect integration with Replit's authentication service using Passport.js strategies
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple for persistent user sessions
- **API Design**: RESTful endpoints for user authentication, waitlist management, and system metrics
- **Error Handling**: Centralized error handling middleware with appropriate HTTP status codes and JSON responses

### Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations:
- **Database Provider**: Neon serverless PostgreSQL for scalable cloud-based data storage
- **Schema Design**: Well-structured tables for users, sessions, and waitlist entries with proper relationships
- **Migration Strategy**: Drizzle Kit for database schema migrations and version control
- **Connection Management**: Connection pooling with @neondatabase/serverless for efficient database connections

### Authentication and Authorization
The authentication system leverages Replit's OpenID Connect provider:
- **Authentication Flow**: OAuth 2.0 / OpenID Connect with automatic user profile synchronization
- **Session Management**: Secure server-side sessions with configurable TTL and HTTP-only cookies
- **User Data**: Automatic user profile creation and updates including email, names, and profile images
- **Security**: Secure session configuration with HTTPS requirements and proper cookie settings

### External Dependencies
- **Neon Database**: Serverless PostgreSQL database hosting with WebSocket connections for real-time capabilities
- **Replit Authentication**: Integrated OpenID Connect provider for user authentication and authorization
- **UI Component Libraries**: Radix UI primitives for accessible, unstyled UI components
- **Styling Framework**: Tailwind CSS for utility-first styling with custom design tokens
- **Query Management**: TanStack React Query for efficient server state management and caching
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form processing