import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const RmTransactions = [
    {
        men_slno: 45,
        component: CNavItem,
        name: 'Room Creation',
        to: '/Home/RoomCreation',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 46,
        component: CNavItem,
        name: 'Sub Room Creation',
        to: '/Home/SubRoomCreation',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default RmTransactions;