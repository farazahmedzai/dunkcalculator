# Dunk Calculator Pro - Replit Project Guide

## Overview

This is a comprehensive Basketball Dunk Calculator web application built with React, TypeScript, and Express.js. The platform provides physics-based calculations for determining vertical jump requirements to dunk a basketball, along with multiple specialized calculators and training resources.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui design system
- **Styling**: Tailwind CSS with custom basketball theme
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas for type-safe validation
- **Development**: Hot module replacement via Vite middleware
- **Production**: Static file serving with Express

## Key Components

### Core Calculators
1. **Main Dunk Calculator** (`/`) - Primary tool for calculating vertical jump requirements
2. **Vertical Jump Calculator** (`/calculators/vertical-jump-calculator`) - Measures current vertical leap
3. **Standing Reach Calculator** (`/calculators/standing-reach-calculator`) - Calculates reach based on body proportions
4. **Approach vs Standing Jump Calculator** (`/calculators/approach-vs-standing-jump-calculator`) - Compares jumping styles
5. **Jump Fatigue Calculator** (`/calculators/jump-fatigue-calculator`) - Analyzes performance degradation
6. **Max Potential Jump Calculator** (`/calculators/max-potential-jump-calculator`) - Estimates maximum achievable vertical
7. **Ideal Body Weight Calculator** (`/calculators/ideal-body-weight-jump-calculator`) - Optimizes weight for jumping

### Content Pages
- **Training Hub** (`/vertical-jump-training`) - Comprehensive training programs
- **Athletic Performance** (`/athletic-performance`) - Science-based performance analysis
- **Educational Pages** - How-to guides and requirement analysis

### Shared Components
- **DunkCard** - Reusable dunk type display component
- **PageHeader** - Consistent navigation across pages
- **FAQSection** - Centralized FAQ system
- **SEOPageLayout** - SEO optimization wrapper

## Data Flow

### Calculation Flow
1. User inputs physical measurements via React Hook Form
2. Zod schemas validate input data
3. Physics calculations executed in `lib/calculator.ts`
4. Results displayed with interactive visualizations
5. Recommendations generated based on assessment

### Physics Calculations
- **Required Vertical**: `(Rim Height + Clearance) - Standing Reach`
- **Hang Time**: `2 × √(2h/g)` where h = jump height, g = gravity
- **Power Output**: `(Body Weight × Jump Height) / Time`
- **Jump Modifiers**: Approach bonus, hand size, experience level

### SEO Integration
- Schema.org structured data for all calculators
- Dynamic sitemap generation
- OpenGraph and Twitter Card meta tags
- Breadcrumb navigation with BreadcrumbList schema

## External Dependencies

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **Recharts**: Chart visualization

### Development Tools
- **TypeScript**: Type safety and developer experience
- **ESLint**: Code linting and formatting
- **Drizzle Kit**: Database schema management
- **Vite**: Fast build tool and dev server

### Database & ORM
- **PostgreSQL**: Primary database (configured via Drizzle)
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL provider

## Deployment Strategy

### Development
- **Replit**: Primary development environment
- **Hot Reload**: Vite HMR for instant updates
- **Environment Variables**: Database connection via `DATABASE_URL`

### Production Build
- **Static Generation**: Vite builds optimized client bundle
- **Server Bundle**: ESBuild compiles Express server
- **Asset Optimization**: Automatic minification and compression

### SEO & Performance
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Search engine crawler instructions
- **Meta Tags**: Complete OpenGraph and Twitter Card support
- **Structured Data**: Schema.org markup for rich results

## Changelog

- July 07, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.