import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const RmTransactions = [
    {
        men_slno: 126,
        component: CNavItem,
        name: 'Dashboard',
        to: '/Home/RoomDashBoard',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 120,
        component: CNavItem,
        name: 'Floor Creation',
        to: '/Home/FloorCreation',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 123,
        component: CNavItem,
        name: 'Room Creation',
        to: '/Home/RoomCreationSideNav',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 45,
        component: CNavItem,
        name: 'Room ',
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