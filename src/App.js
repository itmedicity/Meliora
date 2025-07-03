import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import BackDrop from './views/Components/BackDrop'
import Protected from './views/Protected/Protected'
import { QueryClientProvider, QueryClient } from 'react-query'
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

const queryClient = new QueryClient()

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
            <Route path="/" element={<Login />} />
            <Route path="/Home/*" element={<DefaultLayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        {/* <React.Suspense fallback={<BackDrop />}>
          <Switch>
            <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
            <Route path="/Home">
              <Protected cmp={DefaultLayout} />
            </Route>
            <Route path="/NotCorect"></Route>
          </Switch>
        </React.Suspense> */}
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default App
