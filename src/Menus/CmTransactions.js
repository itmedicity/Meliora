import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const CmTransactions = [
    {
        men_slno: 5,
        component: CNavItem,
        name: 'Complaint Registration',
        to: '/Home/ComplaintRegister',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 66,
        component: CNavItem,
        name: ' Direct Complaint',
        to: '/Home/DirectComplaint',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 7,
        component: CNavItem,
        name: 'Complaint List All ',
        to: '/Home/ComplaintList',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 6,
        component: CNavItem,
        name: 'Complaint List ',
        to: '/Home/AssignComplaint',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 61,
        component: CNavItem,
        name: 'Rectify Complaint ',
        to: '/Home/RectifyComplaint',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
]

export default CmTransactions;