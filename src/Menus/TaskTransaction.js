import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const TaskTransaction = [

    {
        men_slno: 169,
        component: CNavItem,
        name: 'Dashboard',
        to: '/Home/TaskManagementDashboard',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 170,
        component: CNavItem,
        name: 'Directors Desk',
        to: '/Home/TaskManagementCreateTask',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 185,
        component: CNavItem,
        name: 'Create New',
        to: '/Home/TaskManagementTaskLists',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 176,
        component: CNavItem,
        name: 'My Tasks',
        to: '/Home/TaskManagementEmployeeTask',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 171,
        component: CNavItem,
        name: 'Task In Queue',
        to: '/Home/AcceptTask',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 172,
        component: CNavItem,
        name: 'Performance Sheet',
        to: '/Home/TaskPerformanceSheet',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 173,
        component: CNavItem,
        name: 'Performance Slides',
        to: '/Home/TaskPerformanceSlide',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },


    // {
    //     men_slno: 174,
    //     component: CNavItem,
    //     name: 'Projects',
    //     to: '/Home/TaskManagementDeptProjects',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },









]

export default TaskTransaction;