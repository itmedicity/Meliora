import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const TaskTransaction = [
    {
        men_slno: 42,
        component: CNavItem,
        name: 'Home',
        to: '/Home/TaskHome',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

]

export default TaskTransaction;