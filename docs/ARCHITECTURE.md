# Architecture Documentation

## Overview

corgo.dev is a modern, static portfolio website built with Astro and Tailwind CSS. The site features a retro gaming aesthetic and is designed to showcase games, projects, and blog posts for a DevOps professional who creates games.

## Technology Stack

### Core Technologies
- **Astro 5.15.9** - Modern static site generator with islands architecture
- **TypeScript** - Type-safe development with strict mode enabled
- **Node.js 20** - Runtime environment

### Styling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **@astrojs/tailwind 6.0.2** - Astro integration for Tailwind
- **Press Start 2P** - Google Font for retro/pixel aesthetic

### Development Tools
- **Commitizen** - Conventional commits configuration
- **VS Code** - Recommended IDE with Astro extension
- **GitHub Actions** - CI/CD pipeline for deployment

## Project Structure

```
/
├── .astro/                    # Generated Astro types and cache
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages deployment workflow
├── .vscode/                   # VS Code configuration
│   ├── extensions.json        # Recommended extensions
│   └── launch.json           # Debug configuration
├── dist/                      # Build output (generated)
├── public/                    # Static assets (copied as-is)
│   ├── CNAME                 # Custom domain: corgo.dev
│   └── logo.svg              # Site logo
├── src/
│   ├── components/           # Reusable Astro components
│   │   ├── BlogPreview.astro
│   │   ├── Footer.astro
│   │   ├── GamesPreview.astro
│   │   ├── Hero.astro
│   │   ├── Navigation.astro
│   │   └── ProjectsPreview.astro
│   ├── content/              # Content collections (Markdown)
│   │   ├── blog/            # Blog posts
│   │   ├── games/           # Game portfolio items
│   │   ├── projects/        # Technical projects
│   │   └── config.ts        # Content collection schemas
│   ├── layouts/
│   │   └── BaseLayout.astro  # Base HTML layout
│   ├── pages/                # File-based routing
│   │   ├── contact.astro     # /contact page
│   │   └── index.astro       # Homepage (/)
│   ├── styles/
│   │   └── global.css        # Global styles and Tailwind imports
│   └── config.ts             # Site-wide configuration
├── astro.config.mjs          # Astro configuration
├── package.json              # Project dependencies and scripts
├── tailwind.config.mjs       # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── .cz.toml                  # Commitizen configuration
└── CHANGELOG.md              # Project changelog
```

## Component Architecture

### Component Hierarchy

```
BaseLayout (Layout)
├── Navigation (Component)
├── Pages (Slot Content)
│   ├── index.astro
│   │   ├── Hero
│   │   ├── GamesPreview (currently hidden)
│   │   ├── ProjectsPreview (currently hidden)
│   │   └── BlogPreview (currently hidden)
│   └── contact.astro
└── Footer (Component)
```

### Component Details

**BaseLayout.astro** (`src/layouts/BaseLayout.astro`)
- Provides HTML structure, meta tags, and global styles
- Accepts `title` and `description` props for SEO
- Uses flexbox for sticky footer layout
- Imports global styles and site configuration

**Navigation.astro** (`src/components/Navigation.astro`)
- Top navigation bar with logo and menu items
- Logo with SVG (black filter applied)
- Dynamic navigation from `siteConfig`
- Pixel-bordered design aesthetic
- Currently displays: Home and Contact links

**Hero.astro** (`src/components/Hero.astro`)
- Landing section with gradient background
- Badge, title, and description from `siteConfig`
- Social media links (GitHub, Twitter, Email)
- Retro gaming aesthetic with pixel font

**Footer.astro** (`src/components/Footer.astro`)
- Dark footer with site name
- Navigation links (currently commented out)
- Minimal pixel-style design

**Content Preview Components:**
- **BlogPreview.astro** - Displays blog posts with date and read time
- **GamesPreview.astro** - Shows game portfolio with status badges
- **ProjectsPreview.astro** - Technical project showcase with tech tags

All preview components:
- Fetch data from content collections
- Filter drafts in production
- Sort by date (newest first)
- Support responsive grid layouts

## Content Management System

### Content Collections

Astro's built-in content collections with Zod schema validation:

**Blog Collection** (`src/content/blog/`)
```typescript
{
  title: string
  date: Date
  description: string
  readTime?: string
  draft: boolean (default: false)
}
```

**Games Collection** (`src/content/games/`)
```typescript
{
  title: string
  description: string
  status: 'Released' | 'In Development' | 'Prototype'
  image?: string
  date: Date
  draft: boolean (default: false)
}
```

**Projects Collection** (`src/content/projects/`)
```typescript
{
  title: string
  description: string
  tech: string[]
  date: Date
  draft: boolean (default: false)
}
```

### Content Workflow

1. Create `.md` file in appropriate collection folder
2. Add YAML frontmatter with required fields
3. Write content in Markdown
4. Set `draft: false` when ready to publish
5. Content automatically appears in production builds

### Draft System

- `draft: true` in frontmatter hides content in production
- Development environment shows all content
- Filter applied via `import.meta.env.PROD` checks
- All current content marked as draft (work in progress)

## Routing System

### File-Based Routing

Astro uses file-based routing where each file in `/src/pages/` becomes a route:

```
/src/pages/index.astro       → /
/src/pages/contact.astro     → /contact
```

### Current Routes

- `/` - Homepage with Hero section
- `/contact` - Contact page with social links

### Navigation Configuration

Configured in `src/config.ts`:

```typescript
navigation: [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' }
]
```

Games, Projects, and Blog navigation items are commented out until content is published.

### Future Route Potential

The content collection structure supports future dynamic routes:
- `/blog/[slug]` - Individual blog posts
- `/games/[slug]` - Game detail pages
- `/projects/[slug]` - Project detail pages

## Styling System

### Tailwind CSS Configuration

Custom theme extending Tailwind defaults (`tailwind.config.mjs`):

```javascript
theme: {
  extend: {
    fontFamily: {
      pixel: ['"Press Start 2P"', 'cursive']
    },
    colors: {
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        900: '#0f172a'
      }
    }
  }
}
```

### Design System

**Color Palette:**
- Primary: Slate (various shades)
- Accent: Green (#22c55e for highlights)
- Dark mode: Slate-900 backgrounds

**Typography:**
- Body: System default fonts
- Headers/Special: Press Start 2P (pixel font)
- `.pixel-font` utility class for retro aesthetic

**Visual Style:**
- Retro gaming/pixel aesthetic
- 4px solid borders
- Custom `.pixel-border` class for box-shadow borders
- Gradient backgrounds
- Responsive with mobile-first approach

**Layout Patterns:**
- Container-based (max-width with padding)
- Flexbox for layout
- Grid for content cards (`grid md:grid-cols-3`)
- Consistent spacing scale

## Configuration Files

### src/config.ts
**Purpose:** Site-wide configuration
- Site metadata (name, title, description)
- Hero section content
- Social media links
- Navigation menu structure
- Single source of truth for site content

### src/content/config.ts
**Purpose:** Content collection schemas
- Zod validation for frontmatter
- Type definitions for collections
- Exports collections object

### astro.config.mjs
**Purpose:** Astro framework configuration
- Defines integrations (Tailwind)
- Core Astro settings

### tailwind.config.mjs
**Purpose:** Tailwind CSS configuration
- Custom theme configuration
- Content paths for scanning
- Extended color palette and fonts

### tsconfig.json
**Purpose:** TypeScript configuration
- Extends Astro's strict config
- Enables strict type checking
- Includes all files except dist/

### .cz.toml
**Purpose:** Commitizen configuration
- Conventional commits format
- Semantic versioning setup
- Automatic changelog generation

## Build and Deployment

### Build Process

**Development:**
```bash
npm run dev
```
- Starts Astro dev server at localhost:4321
- Hot module reloading enabled
- Shows draft content

**Production Build:**
```bash
npm run build
```
- Compiles TypeScript
- Processes Tailwind CSS (removes unused styles)
- Generates static HTML files in `dist/`
- Optimizes and bundles assets to `dist/_astro/`
- Filters out draft content (`draft: true`)
- Creates hashed CSS/JS files for cache busting

**Preview:**
```bash
npm run preview
```
- Serves production build locally
- Test before deployment

### Deployment Pipeline

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`)

**Triggers:**
- Push to master branch
- Manual workflow dispatch

**Pipeline Steps:**

1. **Build Job:**
   - Checkout code
   - Setup Node 20
   - Install dependencies (`npm ci`)
   - Build with Astro (`npm run build`)
   - Upload artifact

2. **Deploy Job:**
   - Deploy to GitHub Pages
   - Requires build job completion

**Deployment Configuration:**
- Target: GitHub Pages
- Domain: corgo.dev (via CNAME)
- Permissions: read contents, write pages, id-token
- Concurrency: Single pages group

### Environment Differences

**Development:**
- `import.meta.env.PROD` is `false`
- Draft content visible
- Hot module reloading
- Non-optimized assets

**Production:**
- `import.meta.env.PROD` is `true`
- Draft content filtered out
- Optimized and minified assets
- Static files served via CDN

## Data Flow

```
src/config.ts → Components (site metadata, navigation)
                ↓
content/config.ts → Content Collections → Preview Components
                    ↓
                Markdown Files → Filtered by draft status
                                ↓
                        Rendered in Pages
```

## Development Workflow

1. **Setup:**
   ```bash
   npm install
   npm run dev
   ```

2. **Content Creation:**
   - Add Markdown files to `src/content/{blog,games,projects}/`
   - Include required frontmatter fields
   - Preview changes in dev server

3. **Component Development:**
   - Create/edit components in `src/components/`
   - Use Tailwind utility classes for styling
   - Import into pages or layouts

4. **Version Control:**
   - Use Commitizen for commits: `git cz`
   - Follow conventional commit format
   - Automatic changelog generation

5. **Deployment:**
   - Push to master branch
   - GitHub Actions automatically builds and deploys
   - Changes live at corgo.dev

## Current State

The site is currently in development with:
- Basic page structure implemented
- Component library established
- Content collections configured
- Most content marked as drafts
- Preview components hidden on homepage
- Deployment pipeline operational

## Performance Characteristics

- **Static Site Generation (SSG)** - All pages pre-rendered at build time
- **No server-side runtime** - Pure HTML/CSS/JS
- **Minimal JavaScript** - Astro's islands architecture
- **CDN-hosted** - GitHub Pages with edge caching
- **Optimized assets** - Minified CSS/JS with cache busting
- **Fast page loads** - Static files served directly

## Type Safety

- **TypeScript strict mode** enabled throughout
- **Zod schemas** for content validation
- **Generated types** in `.astro/` for content collections
- **Component props** typed with TypeScript interfaces
- **Build-time type checking** catches errors before deployment

## Future Expansion

The architecture supports adding:
- Individual blog post pages (`/blog/[slug]`)
- Game detail pages (`/games/[slug]`)
- Project detail pages (`/projects/[slug]`)
- RSS feed for blog
- Search functionality
- Dark mode toggle
- More sophisticated filtering and sorting
