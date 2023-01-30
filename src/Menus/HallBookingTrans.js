import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const HallBookingTrans = [
    {
        men_slno: 100,
        component: CNavItem,
        name: 'Hall Booking Registration',
        to: '/Home/HallBooking',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default HallBookingTrans;