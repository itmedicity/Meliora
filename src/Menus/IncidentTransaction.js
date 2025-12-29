import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const IncidentTransactions = [
  {
    men_slno: 283,
    name: 'Incident Dashboard',
    to: '/Home/IncidentDashboard',
    icon: <CiStop1 />
  },
  {
    men_slno: 207,
    name: 'Incident List View',
    to: '/Home/IncidentList',
    icon: <CiStop1 />
  },
  {
    men_slno: 282,
    name: 'Incident Registration',
    to: '/Home/IncidentReg',
    icon: <CiStop1 />
  },
  // {
  //   men_slno: 284,
  //   name: 'Incharge Approvals',
  //   to: '/Home/InchargeApproval',
  //   icon: <CiStop1 />
  // },
  // {
  //   men_slno: 302,
  //   name: 'Hod Approval',
  //   to: '/Home/HodApprovals',
  //   icon: <CiStop1 />
  // },
  // {
  //   men_slno: 305,
  //   name: 'QAD',
  //   to: '/Home/qualitydep',
  //   icon: <CiStop1 />
  // },
  {
    men_slno: 284,
    name: 'Incident Approvals',
    to: '/Home/IncidentApproval',
    icon: <CiStop1 />
  },
  {
    men_slno: 302,
    name: 'Incident Data Collection',
    to: '/Home/Departmentdatacollection',
    icon: <CiStop1 />
  },
  {
    men_slno: 305,
    name: 'Incident Action',
    to: '/Home/Incidentaction',
    icon: <CiStop1 />
  }
]

export default IncidentTransactions

