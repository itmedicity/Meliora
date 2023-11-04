import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const HallBookingTrans = [

    {
        men_slno: 103,
        component: CNavItem,
        name: 'Hall Booking Registration ',
        to: '/Home/HallbookingReg',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 101,
        component: CNavItem,
        name: 'Hall Booking view',
        to: '/Home/HallBooking',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 104,
        component: CNavItem,
        name: 'Department Approval',
        to: '/Home/HallbookingApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 105,
        component: CNavItem,
        name: 'CAO Approval',
        to: '/Home/HallCeoApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
]

export default HallBookingTrans;