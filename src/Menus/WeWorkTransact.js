import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const WeWorkTransact = [
    {
        men_slno: 62,
        component: CNavItem,
        name: 'In-Patient List',
        to: '/Home/WeWork/InpatientList',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default WeWorkTransact;