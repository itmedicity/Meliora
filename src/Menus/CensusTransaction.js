import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const DailyCensusTransactions = [
  {
    men_slno: 187,
    name: 'Daily Census Entry',
    to: '/Home/DailyCensus',
    icon: <CiStop1 />,
  },
  {
    men_slno: 188,
    name: 'Daily Census Report',
    to: '/Home/DailyCensusReport',
    icon: <CiStop1 />,
  },
]

export default DailyCensusTransactions
