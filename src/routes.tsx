import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PlaceholderPage } from '@/pages/placeholder'

const LandingPage = lazy(() => import('@/pages/landing').then((m) => ({ default: m.LandingPage })))
const LoginPage = lazy(() => import('@/pages/login').then((m) => ({ default: m.LoginPage })))
const SignupPage = lazy(() => import('@/pages/signup').then((m) => ({ default: m.SignupPage })))
const DashboardPage = lazy(() => import('@/pages/dashboard').then((m) => ({ default: m.DashboardPage })))
const CreateAgentPage = lazy(() => import('@/pages/create-agent').then((m) => ({ default: m.CreateAgentPage })))
const PublicChatPage = lazy(() => import('@/pages/public-chat').then((m) => ({ default: m.PublicChatPage })))
const PricingPage = lazy(() => import('@/pages/pricing').then((m) => ({ default: m.PricingPage })))
const DocsIndexPage = lazy(() => import('@/pages/docs/index').then((m) => ({ default: m.DocsIndexPage })))
const GettingStartedPage = lazy(() => import('@/pages/docs/getting-started').then((m) => ({ default: m.GettingStartedPage })))
const ApiDocsPage = lazy(() => import('@/pages/docs/api').then((m) => ({ default: m.ApiDocsPage })))
const WebhooksDocsPage = lazy(() => import('@/pages/docs/webhooks').then((m) => ({ default: m.WebhooksDocsPage })))
const FaqsPage = lazy(() => import('@/pages/docs/faqs').then((m) => ({ default: m.FaqsPage })))
const ContactPage = lazy(() => import('@/pages/docs/contact').then((m) => ({ default: m.ContactPage })))
const NotFoundPage = lazy(() => import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LazyPage>
        <LandingPage />
      </LazyPage>
    ),
  },
  {
    path: '/login',
    element: (
      <LazyPage>
        <LoginPage />
      </LazyPage>
    ),
  },
  {
    path: '/signup',
    element: (
      <LazyPage>
        <SignupPage />
      </LazyPage>
    ),
  },
  {
    path: '/pricing',
    element: (
      <LazyPage>
        <PricingPage />
      </LazyPage>
    ),
  },
  {
    path: '/docs',
    element: (
      <LazyPage>
        <DocsIndexPage />
      </LazyPage>
    ),
  },
  {
    path: '/docs/getting-started',
    element: (
      <LazyPage>
        <GettingStartedPage />
      </LazyPage>
    ),
  },
  {
    path: '/docs/api',
    element: (
      <LazyPage>
        <ApiDocsPage />
      </LazyPage>
    ),
  },
  {
    path: '/docs/webhooks',
    element: (
      <LazyPage>
        <WebhooksDocsPage />
      </LazyPage>
    ),
  },
  {
    path: '/docs/faqs',
    element: (
      <LazyPage>
        <FaqsPage />
      </LazyPage>
    ),
  },
  {
    path: '/docs/contact',
    element: (
      <LazyPage>
        <ContactPage />
      </LazyPage>
    ),
  },
  {
    path: '/chat/:slug',
    element: (
      <LazyPage>
        <PublicChatPage />
      </LazyPage>
    ),
  },
  {
    path: '/demo',
    element: <Navigate to="/chat/demo" replace />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <LazyPage><DashboardPage /></LazyPage> },
      { path: 'agents', element: <LazyPage><DashboardPage /></LazyPage> },
      { path: 'agents/new', element: <LazyPage><CreateAgentPage /></LazyPage> },
      { path: 'agents/:id/edit', element: <LazyPage><CreateAgentPage /></LazyPage> },
      {
        path: 'sessions',
        element: (
          <PlaceholderPage
            title="Sessions"
            description="View and manage conversation sessions"
          />
        ),
      },
      {
        path: 'integrations',
        element: (
          <PlaceholderPage
            title="Integrations"
            description="Configure webhooks and CRM connectors"
          />
        ),
      },
      {
        path: 'settings',
        element: (
          <PlaceholderPage
            title="Settings"
            description="Workspace and account settings"
          />
        ),
      },
      {
        path: 'billing',
        element: (
          <PlaceholderPage
            title="Billing"
            description="Manage your subscription and billing"
          />
        ),
      },
    ],
  },
  {
    path: '/help',
    element: <Navigate to="/docs" replace />,
  },
  {
    path: '/forgot-password',
    element: (
      <PlaceholderPage
        title="Reset Password"
        description="Request a password reset link"
      />
    ),
  },
  {
    path: '/privacy',
    element: (
      <PlaceholderPage
        title="Privacy Policy"
        description="How we handle your data"
      />
    ),
  },
  {
    path: '/terms',
    element: (
      <PlaceholderPage
        title="Terms of Service"
        description="Terms and conditions"
      />
    ),
  },
  {
    path: '*',
    element: (
      <LazyPage>
        <NotFoundPage />
      </LazyPage>
    ),
  },
])
