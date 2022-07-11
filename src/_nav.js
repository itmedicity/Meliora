import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
  cilSpeedometer
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import Transactions from './Menus/CmTransactions'
import Utilities from './Menus/CmUtilities'

const _nav = [
  {
    slno: 1,
    component: CNavItem,
    name: 'Home',
    to: '/Home',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  //Complaint Management System Menu Start from Here
  {
    component: CNavTitle,
    name: 'Complaint Management',
  },
  {
    slno: 2,
    component: CNavGroup,
    name: 'Transaction',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: Transactions
  },
  {
    slno: 3,
    component: CNavGroup,
    name: 'Utilities',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: Utilities
  },


  //Request Management System Menu Start from Here
  {
    component: CNavTitle,
    name: 'Central Request management',
  },
]

export default _nav
