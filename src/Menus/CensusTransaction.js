import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const DailyCensusTransactions = [

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

]

export default DailyCensusTransactions;