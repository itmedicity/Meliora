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
    men_slno: 376,
    name: 'User Petty Cash',
    to: '/Home/pettycash',
    icon: <CiStop1 />
  },
  {
    men_slno: 358,
    name: 'Daily User Bill Closing',
    to: '/Home/collection',
    icon: <CiStop1 />
  },
  {
    men_slno: 357,
    name: 'Patient Final Settlement',
    to: '/Home/dietpos',
    icon: <CiStop1 />
  },

  //correct slno live - 374
  //test slno live - 360
  {
    men_slno: 374,
    name: 'Daily Canteen Closing',
    to: '/Home/canteenclose',
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


