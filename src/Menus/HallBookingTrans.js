import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const HallBookingTrans = [
  {
    men_slno: 103,
    name: 'Hall Booking Registration ',
    to: '/Home/HallbookingReg',
    icon: <CiStop1 />,
  },
  {
    men_slno: 101,
    name: 'Hall Booking view',
    to: '/Home/HallBooking',
    icon: <CiStop1 />,
  },
  {
    men_slno: 104,
    name: 'Department Approval',
    to: '/Home/HallbookingApproval',
    icon: <CiStop1 />,
  },
  {
    men_slno: 105,
    name: 'CAO Approval',
    to: '/Home/HallCeoApproval',
    icon: <CiStop1 />,
  },
]

export default HallBookingTrans
