import { CssBaseline } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import BackDrop from './views/Components/BackDrop'
import Protected from './views/Protected/Protected'
import {
  QueryClientProvider,
  QueryClient
} from 'react-query'

require('dotenv').config()

const queryClient = new QueryClient()

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

function App() {
  return (
    <BrowserRouter basename='/'  >
      <QueryClientProvider client={queryClient} >
        <CssBaseline />
        <React.Suspense fallback={<BackDrop />}>
          <Switch>
            <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
            <Route path="/Home">
              <Protected cmp={DefaultLayout} />
              {/* <Protected /> */}
            </Route>
            <Route path="/NotCorect"></Route>
          </Switch>
        </React.Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default App
