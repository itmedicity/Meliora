import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const ITTransactions = [
    {
        men_slno: 146,
        component: CNavItem,
        name: 'DashBoard',
        to: '/Home/DashboardBackup',
        // to: '/Home/newDash',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 147,
        component: CNavItem,
        name: 'Password Management',
        to: '/Home/PasswordManagement',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 148,
        component: CNavItem,
        name: 'Communication Device',
        to: '/Home/CommunicationDevice',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 149,
        component: CNavItem,
        name: 'IP Address Details',
        to: '/Home/NetworkIP',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 150,
        component: CNavItem,
        name: 'Backup Checks & Monitoring',
        to: '/Home/BackupChecks',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 175,
        component: CNavItem,
        name: 'SiM Details',
        to: '/Home/ItSimdetails',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 158,
        component: CNavItem,
        name: 'Wifi Management',
        to: '/Home/WifiManageMent',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
]

export default ITTransactions;