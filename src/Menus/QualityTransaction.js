import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const QualityTransactions = [
    {
        men_slno: 94,
        component: CNavItem,
        name: 'CRF Registration',
        to: '/Home/CrfNewRequestRegister',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },


]

export default QualityTransactions;