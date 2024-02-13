import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const QualityTransactions = [
    {
        men_slno: 181,
        component: CNavItem,
        name: 'Quality Indicator Data',
        to: '/Home/QIDetails',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 182,
        component: CNavItem,
        name: 'QI Daily Report',
        to: '/Home/QIDailyReport',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 186,
        component: CNavItem,
        name: 'QI Monthly Report',
        to: '/Home/QIMonthlyReport',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default QualityTransactions;