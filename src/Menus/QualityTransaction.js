import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const QualityTransactions = [

    {
        men_slno: 187,
        component: CNavItem,
        name: 'Daily Census Entry',
        to: '/Home/DailyCensus',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 188,
        component: CNavItem,
        name: 'Daily Census Report',
        to: '/Home/DailyCensusReport',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    // {
    //     men_slno: 182,
    //     component: CNavItem,
    //     name: 'Dept Wise Patient Marking',
    //     to: '/Home/QIPatientMarking',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },
    // {
    //     men_slno: 186,
    //     component: CNavItem,
    //     name: 'QI Monthly Report',
    //     to: '/Home/QIMonthlyReport',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },

]

export default QualityTransactions;