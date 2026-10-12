import { CssBaseline } from '@mui/material'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import BackDrop from './views/Components/BackDrop'
import Protected from './views/Protected/Protected'
// import { QueryClientProvider, QueryClient } from 'react-query'

import NotFound from './NotFound/NotFound'

import '@fontsource/roboto' // Defaults to weight 400
import '@fontsource/roboto/100.css' // Thin
import '@fontsource/roboto/200.css' // Thin
import '@fontsource/roboto/300.css' // Thin
import '@fontsource/roboto/400.css' // Regular
import '@fontsource/roboto/500.css' // Medium
import '@fontsource/roboto/600.css' // Bold
import '@fontsource/roboto/700.css' // Bold
import '@fontsource/roboto/800.css' // Bold
import '@fontsource/roboto/900.css' // Bold
import { ToastContainer } from 'react-toastify'
import ErrorPage from './NotFound/ErrorPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MobileChat from './views/IncidentManagement/IncidentDIscussion/MobileView/MobileChat'

// React Query v4 wants queryKey to be an Array and warns for every query that uses a plain string
// (queryKey: 'getdefaultCompany' is used in ~60 places). This client turns a string key into
// ['key'] before React Query sees it, so the warning is gone and the cache behaves the same
// (the key was only ever used as an identifier). invalidateQueries('x') is unchanged.
class AppQueryClient extends QueryClient {
  defaultQueryOptions(options) {
    if (typeof options?.queryKey === 'string' && !options._defaulted) {
      return super.defaultQueryOptions({ ...options, queryKey: [options.queryKey] })
    }
    return super.defaultQueryOptions(options)
  }
}

const queryClient = new AppQueryClient()

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

function App() {
  return (
    <BrowserRouter basename="/" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Suspense fallback={<BackDrop />}>
          <Routes>
            <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
            <Route element={<Protected />}>
              <Route path="/Home/*" element={<DefaultLayout />} errorElement={<ErrorPage />} />
            </Route>
            <Route >
              <Route path="/mobile/chat" element={<MobileChat />} errorElement={<ErrorPage />} />
            </Route>
            <Route path="*" element={<NotFound />} errorElement={<ErrorPage />} />
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default App

