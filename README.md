# Conversational Agent Form Builder

A SaaS platform that lets teams design conversational, link-shareable "agents" that collect structured data via natural dialogue powered by LLMs.

## Features

- **Agent Builder**: Field-first schema with validation, persona, and context
- **Public Links**: Unique URLs for each agent opening a full-page chat UI
- **Conversational Capture**: LLM-driven dialogue that collects required fields naturally
- **Dashboard**: Workspace-level views of agents, sessions, and analytics
- **Integrations**: Webhooks and CRM connectors for lead delivery

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build**: Vite with SWC
- **Styling**: Tailwind CSS v3 with CSS custom properties
- **UI**: Radix UI primitives, custom components
- **State**: TanStack React Query
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **Notifications**: Sonner

## Getting Started

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── layout/     # Sidebar, dashboard layout
│   └── ui/         # Button, Card, Input, etc.
├── contexts/       # Auth context
├── lib/            # API utilities, utils
├── pages/          # Route pages
└── routes.tsx      # Router configuration
```

## Design System

- **Colors**: Deep charcoal (#1A1A1F), neon green (#4FFF8F), electric purple (#A259FF)
- **Typography**: Inter font, 48-72px heroes
- **Layout**: Collapsible sidebar, bento grids, card-based UI

## License

Private - All rights reserved.
