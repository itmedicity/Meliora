import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const FeedbackTransactions = [

    {
        men_slno: 224,
        component: CNavItem,
        name: 'Feedback',
        to: '/Home/feedback',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },


]

export default FeedbackTransactions;