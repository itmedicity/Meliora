import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer } from '@coreui/react'

// routes config
import routes from '../routes'
import BackDrop from 'src/views/Components/BackDrop'

const AppContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={<BackDrop />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/Home" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
