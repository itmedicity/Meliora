import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const IncidentTransactions = [

    {
        men_slno: 207,
        component: CNavItem,
        name: 'Incident List View',
        to: '/Home/IncidentList',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },


]

export default IncidentTransactions;