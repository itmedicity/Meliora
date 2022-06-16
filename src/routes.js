import React from 'react'

const home = React.lazy(() => import('./views/dashboard/Home'))
const Settings = React.lazy(() => import('../src/Menus/Settings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: home },
  { path: '/Home/Settings', exact: true, name: 'Settings', component: Settings }


]

export default routes
