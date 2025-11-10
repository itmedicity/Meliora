import React, { memo, useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { HiHome } from 'react-icons/hi2'
import { HiTicket } from 'react-icons/hi2'
import { RiDashboardHorizontalFill } from 'react-icons/ri'
import { MdDevicesOther, MdPattern } from 'react-icons/md'
import { TbDeviceImacCog } from 'react-icons/tb'
import { FcEngineering } from 'react-icons/fc'
import { FcInspection } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import { getMenuSlno } from 'src/views/Constant/Constant'
import { FaMoneyBills } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { GrDocumentPdf } from "react-icons/gr";
import { MdAppRegistration } from "react-icons/md";
import { FaBedPulse } from "react-icons/fa6";

const SideMenu = () => {
  const navigation = useNavigate()
  const [filteredDashboardRoutes, setFilteredDashboardRoutes] = useState([]);


  const dashBoardRoute = [
    {
      path: '/Home',
      name: 'Home',
      icon: <HiHome size={35} color="var(--royal-purple-300)" />
    },
    {
      men_slno: 199,
      path: '/Home/CrfNewDashBoard',
      name: 'Crf DashBoard',
      icon: <RiDashboardHorizontalFill size={35} color="var(--royal-purple-300)" />
    },
    {
      men_slno: 126,
      path: '/Home/RoomDashBoard',
      name: 'Room DashBoard',
      icon: <MdDevicesOther size={35} color="var(--royal-purple-300)" />
    },
    {
      men_slno: 178,
      path: '/Home/AssetDashboardM',
      name: 'Asset Dashboard',
      icon: <TbDeviceImacCog size={35} color="var(--royal-purple-300)" />
    },
    {
      men_slno: 169,
      path: '/Home/TaskManagementDashboard',
      name: 'Task Management Dashboard',
      icon: <HiTicket size={35} color="var(--royal-purple-300)" />
    },
    {
      men_slno: 146,
      path: '/Home/BillAdds',
      name: 'Bills & Pays ',
      icon: <FaMoneyBills size={35} color="var(--royal-purple-300)" />
    },
    {
      men_slno: 280,
      path: '/Home/amsDashboardMain',
      name: 'AMS',
      icon: <GiMedicines size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/Home/IncidentDashboard',
      name: 'Incedent Form',
      icon: <MdAppRegistration size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/Home/Settings',
      name: 'Settings',
      icon: <FcEngineering size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/Home/Reports',
      name: 'Reports',
      icon: <FcInspection size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/Home/Manual',
      name: 'Documents',
      icon: <GrDocumentPdf size={35} color="var(--royal-purple-300)" />
    },
    {
      path: '/Home/IcuDashboard',
      name: 'Icu Beds',
      icon: <FaBedPulse size={35} color="var(--royal-purple-300)" />
    },
    {
      men_slno: 321,
      path: '/Home/AllDeviceCredentialList',
      name: 'Device Credentials',
      icon: <MdPattern size={35} color="var(--royal-purple-300)" />
    },
  ]


  useEffect(() => {
    getMenuSlno().then(val => {
      const resultLength = Object.keys(val[0])?.length ?? 0;
      if (resultLength > 0) {
        const menuRitSlno = val[0];
        const menuSlnoAry = menuRitSlno.map(menu => menu.menu_slno);
        // Filter dashboard routes based on rights
        const filteredRoutes = dashBoardRoute.filter(route => {
          if (!route.men_slno) return true;
          return menuSlnoAry.includes(route.men_slno);
        });
        setFilteredDashboardRoutes(filteredRoutes);
      }
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        alignItems: 'center'
      }}
    >
      {filteredDashboardRoutes.map((item, index) => (
        <Tooltip
          title={item.name}
          key={index}
          arrow
          placement="right"
          sx={{ backgroundColor: 'var(--royal-purple-300)' }}
        >
          <Box
            onClick={() => navigation(item.path)}
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
      ))}
    </Box>
  )
}

export default memo(SideMenu)
