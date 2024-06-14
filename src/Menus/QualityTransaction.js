import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const QualityTransactions = [

    {
        men_slno: 182,
        component: CNavItem,
        name: 'QI Dept Wise Patient Marking',
        to: '/Home/QIPatientMarking',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 212,
        component: CNavItem,
        name: 'Day Wise QI Report',
        to: '/Home/DayWiseReport',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 186,
        component: CNavItem,
        name: 'QI Monthly Report',
        to: '/Home/QIMonthlyReport',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 210,
        component: CNavItem,
        name: 'Initial Assessment Time Report',
        to: '/Home/TimeReport',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 213,
        component: CNavItem,
        name: 'QI Incharge Approval',
        to: '/Home/QiIncharge',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },


]

export default QualityTransactions;