import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const NurseStation = [
    {
        men_slno: 41,
        component: CNavItem,
        name: 'In-Patient List',
        to: '/Home/InpatientList',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 41,
        component: CNavItem,
        name: 'Diet Approval',
        to: '/Home/DietApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 58,
        component: CNavItem,
        name: 'Diet Plan List',
        to: '/Home/DietPlanList',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default NurseStation;