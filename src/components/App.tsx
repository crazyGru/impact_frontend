import { useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import Signup from 'pages/Auth/Signup'
import Signin from 'pages/Auth/Signin'
import AuthLayout from 'pages/Auth/Layout'
import MainLayout from 'pages/Main/Layout'
import Assistants from 'pages/Main/Assistants'
import Campaigns from 'pages/Main/Campaigns'
import CampaignDetail from 'pages/Main/Campaigns/Detail'
import Setting from 'pages/Main/Setting'
import AuthProvider from 'providers/AuthProvider'

import { HttpService } from 'utils/axios'
import { setupToken } from 'utils/token'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser'
import msalConfig from 'utils/msalConfig'

const msalInstance = new PublicClientApplication(msalConfig)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }

    setupToken(token)
    HttpService.get('/authorize')
      .then((response) => {
        const { status } = response
        if (status === 200) {
          setIsLogin(true)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <svg
          className="m-0 size-7 animate-spin text-violet-700"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            fill="none"
            r="10"
            strokeWidth="2"
            stroke="black"
            strokeDasharray="20 36"
            strokeLinecap="round"
            strokeDashoffset="0"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <MsalProvider instance={msalInstance}>
        <AuthProvider isLogin={isLogin} setIsLogin={setIsLogin}>
          <SnackbarProvider maxSnack={5}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Navigate to="auth" />} />
                {!isLogin ? (
                  <Route path="auth" element={<AuthLayout />}>
                    <Route index element={<Navigate to="login" />} />
                    <Route path="login" element={<Signin />} />
                    <Route path="register" element={<Signup />} />
                  </Route>
                ) : (
                  <Route path="main" element={<MainLayout />}>
                    <Route path="assistants" element={<Assistants />} />
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="campaigns/:id" element={<CampaignDetail />} />
                    <Route path="settings" element={<Setting />} />
                  </Route>
                )}
                <Route
                  path="*"
                  element={<Navigate to={!isLogin ? 'auth' : 'main'} />}
                />
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        </AuthProvider>
      </MsalProvider>
    </div>
  )
}
