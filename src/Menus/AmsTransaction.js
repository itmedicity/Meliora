import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AmsTransaction = [

    
    {
        men_slno: 276,
        component: CNavItem,
        name: 'Ams Patient Details',
        to: '/Home/AmsPatientDetails',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
        
    },

]

export default AmsTransaction;