import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Home'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', name: 'Home', component: Dashboard },
]

export default routes
