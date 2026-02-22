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

## Development with API

The landing page, signup, and login require the API server for full functionality (demo agent URL, auth).

```bash
# Option 1: Run both API server and Vite dev server
npm run dev:full

# Option 2: Run in separate terminals
npm run server   # API on http://localhost:3001
npm run dev     # Vite on http://localhost:5173 (proxies /api to server)
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | API base URL (frontend) | `/api` (uses Vite proxy in dev) |
| `API_PORT` | API server port | `3001` |
| `VITE_APP_URL` | App URL for demo agent links | `http://localhost:5173` |

### API Endpoints (Stubs)

- `GET /api/demo-agent` — Returns demo agent public URL
- `POST /api/auth/signup` — Create account (email, password, name?)
- `POST /api/auth/login` — Authenticate
- `POST /api/auth/sso/start` — SSO redirect URL (body: `{ provider: "google" \| "github" }`)

Replace with production backend (Supabase, custom API) for deployment.

## Project Structure

```
src/
├── api/            # API client (auth, demo-agent)
├── components/     # Reusable UI components
│   ├── auth/       # Password input, strength indicator
│   ├── docs/       # Documentation layout
│   ├── layout/     # Header, footer, sidebar, dashboard layout
│   └── ui/         # Button, Card, Input, etc.
├── contexts/       # Auth context
├── lib/            # API utilities, analytics stub, utils
├── pages/          # Route pages (landing, docs, signup, login, etc.)
├── docs-content/   # Markdown source for documentation
├── public/assets/illustrations/  # Illustration kit
└── server/         # API stub server
```

## Design System

- **Colors**: Deep charcoal (#1A1A1F), neon green (#4FFF8F), electric purple (#A259FF)
- **Typography**: Inter font, 48-72px heroes
- **Layout**: Collapsible sidebar, bento grids, card-based UI

## License

Private - All rights reserved.
