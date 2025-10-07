# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Big Motive marketing website built with Astro. The site serves as a portfolio and lead generation platform that:
- Markets Big Motive's services and capabilities
- Showcases examples of work and case studies
- Provides a contact form for potential clients to reach out

The project uses a minimal Astro setup with TypeScript support and follows Astro's strict TypeScript configuration.

## Architecture

- **Framework**: Astro v5.14.1 with content collections
- **Language**: TypeScript with strict configuration extending `astro/tsconfigs/strict`
- **Content Management**: Astro Content Collections for structured content
- **Structure**: Standard Astro project structure with file-based routing
  - `src/pages/` - Contains page components, each file becomes a route
  - `src/content/` - Content collections (case-studies, team, services)
  - `public/` - Static assets served directly
  - `src/components/` - Reusable components (standard location, not currently populated)

## Content Collections

The site uses three main content collections defined in `src/content/config.ts`:

### Case Studies (`src/content/case-studies/`)
- Showcases client work and project outcomes
- Schema includes: title, description, client, services, team, featured flag, publishedAt, heroImage, tags, outcome, duration
- Referenced in services and can feature team members who worked on the project
- Featured case studies appear on homepage

### Services (`src/content/services/`)
- Defines what Big Motive offers
- Schema includes: title, description, shortDescription, icon, featured flag, order, relatedCaseStudies, relatedServices
- Used to categorize case studies and display service offerings
- Featured services appear on homepage

### Team (`src/content/team/`)
- Team member profiles and expertise
- Schema includes: name, role, bio, image, contact info, expertise, featured flag
- Referenced in case studies to show who worked on projects
- Featured team members appear on homepage and about page

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Access Astro CLI commands |
| `npm run astro -- --help` | Get help with Astro CLI |

## Key Configuration Files

- `astro.config.mjs` - Basic Astro configuration (currently using defaults)
- `tsconfig.json` - TypeScript configuration extending Astro's strict preset
- `package.json` - Project dependencies and scripts

## Development Notes

- Pages are automatically routed based on file structure in `src/pages/`
- TypeScript is configured with strict mode enabled
- Static assets should be placed in the `public/` directory
- Content collections provide type-safe content management with automatic TypeScript types
- Use the `featured` flag in content to control what appears on the homepage
- Case studies can reference services and team members by their collection IDs

## Site Structure (Based on IA)

The site follows this information architecture:

- **Home** (`/`) - Hero, featured work, services overview, CTA
- **Work** (`/work`) - Case studies listing with individual case study pages (`/work/[slug]`)
- **About Us** (`/about`) - Company info, services, team
- **Contact** (`/contact`) - Contact form with success page (`/contact/success`)
- **Legal Pages** (`/legal/`) - Privacy statement, equality & diversity policy, carbon reduction

## Site Features

- **Featured Content**: Homepage showcases featured case studies, services, and team members
- **Content Collections**: Structured content management for case studies, services, and team
- **Cross-References**: Case studies reference services and team members who worked on them
- **Contact Form**: Lead generation with comprehensive project inquiry fields
- **SEO Ready**: Proper meta tags, semantic HTML structure