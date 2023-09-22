import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AmTransactions = [
    {
        men_slno: 144,
        component: CNavItem,
        name: 'Item Name Creation',
        to: '/Home/ItemNameCreation',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 145,
        component: CNavItem,
        name: 'Item Creation',
        to: '/Home/ItemCreation',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default AmTransactions;