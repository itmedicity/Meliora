import React from 'react'
import { CiStop1 } from 'react-icons/ci'

const RmTransactions = [
  {
    men_slno: 126,
    name: 'Dashboard',
    to: '/Home/RoomDashBoard',
    icon: <CiStop1 />,
  },
  {
    men_slno: 120,
    name: 'Floor Creation',
    to: '/Home/FloorCreation',
    icon: <CiStop1 />,
  },
  {
    men_slno: 123,
    name: 'Room Creation',
    to: '/Home/RoomCreationSideNav',
    icon: <CiStop1 />,
  },
  {
    men_slno: 46,
    name: 'Sub Room Creation',
    to: '/Home/SubRoomCreation',
    icon: <CiStop1 />,
  },
  // {
  //     men_slno: 45,
  //     component: CNavItem,
  //     name: 'Room ',
  //     to: '/Home/RoomCreation',
  //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
  // },
]

export default RmTransactions
