import { CssBaseline } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import BackDrop from './views/Components/BackDrop'
import Protected from './views/Protected/Protected'

require('dotenv').config()

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

function App() {
  return (
    <BrowserRouter basename='/Test'  >
      <CssBaseline />
      <React.Suspense fallback={<BackDrop />}>
        <Switch>
          <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
          <Route path="/Home">
            <Protected cmp={DefaultLayout} />
            {/* <Protected /> */}
          </Route>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}
export default App
