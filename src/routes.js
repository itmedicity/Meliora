import React from 'react'

const Home = React.lazy(() => import('./views/dashboard/Home'))
const Settings = React.lazy(() => import('../src/Menus/Settings'))
const Administrtion = React.lazy(() => import('../src/views/Administration/Test'))
const DepartmentMast = React.lazy(() => import('./views/Master/Department/DepartmentMast'))
const DepartmentSectionMast = React.lazy(() => import('./views/Master/DepartmentSectionMast/DeptSectionMast'))
const ComplaintDepartment = React.lazy(() => import('./views/Master/ComplaintDepartment/ComplaintDeptMast'))
const ComplaintRegister = React.lazy(() => import('./views/ComManagement/ComplaintRegister/ComplaintRegistrMast'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: Home },
  { path: '/Home/Settings', exact: true, name: 'Settings', component: Settings },
  { path: '/Home/Administration', exact: true, name: 'Administator', component: Administrtion },
  { path: '/Home/Department', exact: true, name: 'Department Mast', component: DepartmentMast },
  { path: '/Home/DepartmentSection', exact: true, name: 'Department Mast', component: DepartmentSectionMast },
  { path: '/Home/ComplaintDepartment', exact: true, name: 'Complaint Department', component: ComplaintDepartment },
  { path: '/Home/ComplaintRegister', exact: true, name: 'Complaint Register', component: ComplaintRegister }

]

export default routes
