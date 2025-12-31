import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const DietTransactions = [
  {
    men_slno: 42,
    name: 'Diet Process',
    to: '/Home/DietProcess',
    icon: <CiStop1 />
  },
  {
    men_slno: 57,
    name: 'Diet Order List',
    to: '/Home/DietOrderList',
    icon: <CiStop1 />
  },
    {
    men_slno: 58,
    name: 'Diet Plan List',
    to: '/Home/InpatientList',
    icon: <CiStop1 />
  },
  {
    men_slno: 59,
    name: 'Diet Extra Order',
    to: '/Home/DietExtraOrder',
    icon: <CiStop1 />
  },
  {
    men_slno: 60,
    name: 'Diet Delivery',
    to: '/Home/DietDelivery',
    icon: <CiStop1 />
  }
]

export default DietTransactions
