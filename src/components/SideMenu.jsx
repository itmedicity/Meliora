import React, { memo } from 'react'
import { Box } from '@mui/system'
import { HiHome } from 'react-icons/hi2'
import { HiTicket } from 'react-icons/hi2'
import { RiDashboardHorizontalFill } from 'react-icons/ri'
import { MdDevicesOther } from 'react-icons/md'
import { TbDeviceImacCog } from 'react-icons/tb'
import { FcGenealogy } from 'react-icons/fc'
import { FcComboChart } from 'react-icons/fc'
import { FcEngineering } from 'react-icons/fc'
import { FcMultipleDevices } from 'react-icons/fc'
import { FcInspection } from 'react-icons/fc'
import { FcBullish } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

const SideMenu = () => {
  const navigation = useNavigate()

  const dashBoardRoute = [
    {
      path: '/Home',
      name: 'Home',
      icon: <HiHome size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <RiDashboardHorizontalFill size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/devices',
      name: 'Devices',
      icon: <MdDevicesOther size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/imacs',
      name: 'Imacs',
      icon: <TbDeviceImacCog size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/tickets',
      name: 'Tickets',
      icon: <HiTicket size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/genealogy',
      name: 'Genealogy',
      icon: <FcGenealogy size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/charts',
      name: 'Charts',
      icon: <FcComboChart size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/engineering',
      name: 'Engineering',
      icon: <FcEngineering size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/multiple',
      name: 'Multiple',
      icon: <FcMultipleDevices size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/inspection',
      name: 'Inspection',
      icon: <FcInspection size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/bullish',
      name: 'Bullish',
      icon: <FcBullish size={35} color="var(--royal-purple-300)" />
    }
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        alignItems: 'center'
      }}
    >
      {dashBoardRoute.map((item, index) => {
        return (
          <Tooltip
            title={item.name}
            key={index}
            arrow
            placement="right"
            sx={{ backgroundColor: 'var(--royal-purple-300)' }}
          >
            <Box
              onClick={() => {
                navigation(item.path)
              }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              {item.icon}
            </Box>
          </Tooltip>
        )
      })}
    </Box>
  )
}

export default memo(SideMenu)
