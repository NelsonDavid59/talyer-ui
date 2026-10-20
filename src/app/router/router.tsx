import { createBrowserRouter, Navigate } from 'react-router'
import { AppHomePage, CallbackPage } from '@/features/auth'
import { LandingPage } from '@/features/landing'
import { AppProviders } from '../providers/AppProviders'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <AppProviders />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/callback', element: <CallbackPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: '/app', element: <AppHomePage /> }],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
