import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const DietTransactions = [
    {
        men_slno: 42,
        component: CNavItem,
        name: 'Diet Process',
        to: '/Home/DietProcess',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 57,
        component: CNavItem,
        name: 'Diet Order List',
        to: '/Home/DietOrderList',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 59,
        component: CNavItem,
        name: 'Diet Extra Order',
        to: '/Home/DietExtraOrder',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 60,
        component: CNavItem,
        name: 'Diet Delivery',
        to: '/Home/DietDelivery',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
]

export default DietTransactions;