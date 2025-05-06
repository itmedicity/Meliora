import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const NotificationTransaction = [

    
    {
        men_slno: 34,
        component: CNavItem,
        name: 'Notification',
        to: '/Home/NotificationMainMeNu',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
        
    },

]

export default NotificationTransaction;