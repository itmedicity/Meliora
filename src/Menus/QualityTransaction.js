import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const QualityTransactions = [
  {
    men_slno: 182,
    name: 'QI Marking',
    to: '/Home/QIPatientMarking',
    icon: <CiStop1 />,
  },
  {
    men_slno: 212,
    name: 'Day Wise QI Report',
    to: '/Home/DayWiseReport',
    icon: <CiStop1 />,
  },
  {
    men_slno: 186,
    name: 'QI Monthly Report',
    to: '/Home/QIMonthlyReport',
    icon: <CiStop1 />,
  },

  {
    men_slno: 210,
    name: 'Assessment Report',
    to: '/Home/TimeReport',
    icon: <CiStop1 />,
  },
  {
    men_slno: 213,
    name: 'Level I Approval',
    to: '/Home/QiIncharge',
    icon: <CiStop1 />,
  },
  {
    men_slno: 217,
    name: 'Level II Approval',
    to: '/Home/QiHOD',
    icon: <CiStop1 />,
  },

  {
    men_slno: 223,
    name: 'Waiting Time For Service Diagnostics',
    to: '/Home/WaitingReport',
    icon: <CiStop1 />,
  },
]

export default QualityTransactions
