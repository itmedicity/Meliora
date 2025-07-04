import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const TaskTransaction = [
  {
    men_slno: 169,
    name: 'Dashboard',
    to: '/Home/TaskManagementDashboard',
    icon: <CiStop1 />
  },
  {
    men_slno: 170,
    name: 'Directors Desk',
    to: '/Home/TaskManagementCreateTask',
    icon: <CiStop1 />
  },
  {
    men_slno: 185,
    name: 'Create New',
    to: '/Home/TaskManagementTaskLists',
    icon: <CiStop1 />
  },
  {
    men_slno: 176,
    name: 'My Tasks',
    to: '/Home/TaskManagementEmployeeTask',
    icon: <CiStop1 />
  },

  {
    men_slno: 171,
    name: 'Task In Queue',
    to: '/Home/AcceptTask',
    icon: <CiStop1 />
  },

  {
    men_slno: 172,
    name: 'Performance Sheet',
    to: '/Home/TaskPerformanceSheet',
    icon: <CiStop1 />
  },

  {
    men_slno: 173,
    name: 'Performance Slides',
    to: '/Home/TaskPerformanceSlide',
    icon: <CiStop1 />
  }

  // {
  //     men_slno: 174,
  //     component: CNavItem,
  //     name: 'Projects',
  //     to: '/Home/TaskManagementDeptProjects',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
]

export default TaskTransaction
