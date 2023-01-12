import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const TimeEscalations = [
    {
        men_slno: 85,
        component: CNavItem,
        name: 'Level 1',
        to: '/Home/EscalationLevel1',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 86,
        component: CNavItem,
        name: 'Level 2',
        to: '/Home/EscalationLevel2',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 87,
        component: CNavItem,
        name: 'Level 3',
        to: '/Home/EscalationLevel3',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 88,
        component: CNavItem,
        name: 'Level 4',
        to: '/Home/EscalationLevel4',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 85,
        component: CNavItem,
        name: 'Top Level ED',
        to: '/Home/TopLevelED',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default TimeEscalations;