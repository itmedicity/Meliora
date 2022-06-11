import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

class App extends Component {
  render() {
    return (
      <BrowserRouter basename='/Test' >
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
            <Route path="/Home" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
