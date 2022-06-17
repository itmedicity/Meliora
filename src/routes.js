import React from 'react'

const Home = React.lazy(() => import('./views/dashboard/Home'))
const Settings = React.lazy(() => import('../src/Menus/Settings'))
const Administrtion = React.lazy(() => import('../src/views/Administration/Test'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: Home },
  { path: '/Home/Settings', exact: true, name: 'Settings', component: Settings },
  { path: '/Home/Administration', exact: true, name: 'Administator', component: Administrtion }
]

export default routes
