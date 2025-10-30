import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const CmTransactions = [
  {
    men_slno: 148,
    name: 'Dashboard',
    to: '/Home/TicketDashboards',
    icon: <CiStop1 />
  },

  {
    men_slno: 5,
    name: 'Ticket Registration',
    to: '/Home/ComplaintRegister',
    icon: <CiStop1 />
  },
  {
    men_slno: 66,
    name: ' Direct Ticket',
    to: '/Home/DirectComplaint',
    icon: <CiStop1 />
  },
  {
    men_slno: 6,
    name: 'Ticket List ',
    to: '/Home/AssignComplaint',
    icon: <CiStop1 />
  },
  {
    men_slno: 226,
    name: 'Service Request',
    to: '/Home/AssetServiceList',
    icon: <CiStop1 />
  }

  // {
  //     men_slno: 235,
  //     component: CNavItem,
  //     name: 'xx',
  //     to: '/Home/CmComponenteptTicketAnalysisPercentage',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },

  ////////////////////////////////exsisting

  // {
  //     men_slno: 113,
  //     component: CNavItem,
  //     name: 'Registred Complaint List',
  //     to: '/Home/RegistredCompList',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
  // {
  //     men_slno: 5,
  //     component: CNavItem,
  //     name: 'Complaint Registration',
  //     to: '/Home/ComplaintRegister',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
  // {
  //     men_slno: 66,
  //     component: CNavItem,
  //     name: ' Direct Complaint',
  //     to: '/Home/DirectComplaint',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
  // {
  //     men_slno: 6,
  //     component: CNavItem,
  //     name: 'Complaint List ',
  //     to: '/Home/AssignComplaint',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
  // {
  //     men_slno: 110,
  //     component: CNavItem,
  //     name: 'Complaint List Supervisor',
  //     to: '/Home/Complaint/Supervisor',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
  // {
  //     men_slno: 61,
  //     component: CNavItem,
  //     name: 'Rectify Complaint ',
  //     to: '/Home/RectifyComplaint',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },

  // {
  //     men_slno: 106,
  //     component: CNavItem,
  //     name: 'HIC ',
  //     to: '/Home/Hic/Complaint',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
  // {
  //     men_slno: 84,
  //     component: CNavItem,
  //     name: 'Complaint List All ',
  //     to: '/Home/ComplaintList',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
]

export default CmTransactions
