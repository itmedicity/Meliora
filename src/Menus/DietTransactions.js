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
    men_slno: 42,
    name: 'Diet Process',
    to: '/Home/DietProcess',
    icon: <CiStop1 />
  },
  {
    men_slno: 343,
    name: 'Canteen Order Detail',
    to: '/Home/canteenorder',
    icon: <CiStop1 />
  },
  // {
  //   men_slno: 57,
  //   name: 'Diet Order List',
  //   to: '/Home/DietOrderList',
  //   icon: <CiStop1 />
  // },
  // {
  //   men_slno: 59,
  //   name: 'Diet Extra Order',
  //   to: '/Home/DietExtraOrder',
  //   icon: <CiStop1 />
  // },
  // {
  //   men_slno: 60,
  //   name: 'Diet Delivery',
  //   to: '/Home/DietDelivery',
  //   icon: <CiStop1 />
  // },

  // {
  //   men_slno: 343,
  //   name: 'Diet Order List',
  //   to: '/Home/dietorder',
  //   icon: <CiStop1 />
  // },

  {
    men_slno: 343,
    name: 'Direct Orders',
    to: '/Home/directorder',
    icon: <CiStop1 />
  },
  {
    men_slno: 341,
    name: 'KOT Item List',
    to: '/Home/kotitemlist',
    icon: <CiStop1 />
  },
  {
    men_slno: 342,
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


