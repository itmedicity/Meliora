import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const DietTransactions = [
  {
    men_slno: 58,
    name: 'Patient List',
    to: '/Home/InpatientList',
    icon: <CiStop1 />
  },
  {
    men_slno: 57,
    name: 'Patient Assign',
    to: '/Home/dietpatients',
    icon: <CiStop1 />
  },
  {
    men_slno: 42,
    name: 'Diet Process',
    to: '/Home/DietProcess',
    icon: <CiStop1 />
  },
  {
    men_slno: 59,
    name: 'Direct Orders',
    to: '/Home/directorder',
    icon: <CiStop1 />
  },
  {
    men_slno: 43,
    name: 'Canteen Order Detail',
    to: '/Home/canteenorder',
    icon: <CiStop1 />
  },
  {
    men_slno: 56,
    name: 'KOT Item List',
    to: '/Home/kotitemlist',
    icon: <CiStop1 />
  },
  {
    men_slno: 38,
    name: 'KOT Preperation / Delivery',
    to: '/Home/kotprepdev',
    icon: <CiStop1 />
  },
  {
    men_slno: 339,
    name: 'Diet Type Grouping',
    to: '/Home/diettypegroup',
    icon: <CiStop1 />
  },

]

export default DietTransactions


