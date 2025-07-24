import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AmsTransaction = [
    
    {
        men_slno: 280,
        component: CNavItem,
        name: 'Dashboard',
        to: '/Home/amsDashboardMain',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
        
    },
    {
        men_slno: 278,
        component: CNavItem,
        name: 'Ams Patient Details',
        to: '/Home/AmsPatientDetails',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
        
    },
        {
        men_slno: 279,
        component: CNavItem,
        name: 'Patient Details Report',
        to: '/Home/amsPatientDetailsReport',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
        
    },



]

export default AmsTransaction;