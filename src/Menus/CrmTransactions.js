import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const CrmTransactions = [
    {
        men_slno: 94,
        component: CNavItem,
        name: 'Request Registration',
        to: '/Home/RequestRegister',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 95,
        component: CNavItem,
        name: 'Department Approval',
        to: '/Home/Req.DepartmentApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default CrmTransactions;