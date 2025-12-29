import React, { Fragment, useEffect } from 'react'
import { AppHeaderDropdown } from './header/index'
import { TiThMenuOutline } from 'react-icons/ti'

// import { Box } from '@mui/material'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import MenuButton from '@mui/joy/MenuButton'
import Dropdown from '@mui/joy/Dropdown'

import { IoPersonOutline } from 'react-icons/io5'
import LiveClock from 'src/views/Components/LiveClock'
import NotificationBell from 'src/views/IncidentManagement/IncidentNotification/NotificationBell'
import { initNotificationSound } from 'src/views/IncidentManagement/IncidentNotification/notificationSound'

const AppHeader = ({ collapsed, setCollapsed }) => {
  // // Get login user emp_id
  // const id = useSelector((state) => {
  //   return state.LoginUserData.empid
  // })
  // useEffect(() => {
  //   dispatch(getManualEmpList());
  // }, [dispatch])

  // const emparry = useSelector((state) => {
  //   return state.setManualEmpList.ManualEmpListdata
  // })

  // const [Manualshow, setManualshow] = useState(0)

  // useEffect(() => {
  //   if (emparry.length !== 0) {
  //     const resultarray = emparry.filter((val) => {
  //       return val.emp_id_inch === id
  //     })
  //     if (resultarray.length !== 0) {
  //       setManualshow(1)
  //     } else {
  //       setManualshow(0)
  //     }
  //   }
  // }, [emparry, id])

  // const TEXT_PRIMARY = 'var(--rose-pink-400)'
  // const PRIMARY_LIGHT = 'var(--rose-pink-300)'
  // const PRIMARY_MAIN = 'var(--rose-pink-200)'
  // const PRIMARY_DARKER = 'var(--rose-pink-100)'

  useEffect(() => {
    const enableSound = () => {
      initNotificationSound();
      window.removeEventListener("click", enableSound);
    };

    window.addEventListener("click", enableSound);

    return () => {
      window.removeEventListener("click", enableSound);
    };
  }, []);


  return (
    <Fragment>
      <Box
        sx={{
          flexGrow: 1,
          position: 'fixed',
          top: 0,
          left: 0, // adjust based on sidebar width
          right: 0,
          zIndex: 999
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: 'var(--royal-purple-400)' }} elevation={1}>
          <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setCollapsed(!collapsed)}
              >
                <TiThMenuOutline />
              </IconButton>
              <Typography component="div" sx={{ fontFamily: 'var(--roboto-font)', fontWeight: 900 }}>
                Meliora
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
              <NotificationBell />
              <Box sx={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                <Box sx={{ fontWeight: 600, fontSize: 12, fontFamily: 'var(--roboto-font)' }}>Travancore Medicity</Box>
                <LiveClock />
                {/* <Box sx={{ fontWeight: 600,fontSize:12,fontFamily: 'var(--roboto-font)'  }} >Hospital Administration System</Box> */}
              </Box>
            
              <Dropdown>
                <MenuButton
                  sx={{ ml: 2, background: 'var(--royal-purple-100)' }}
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: 'outlined', color: 'danger' } }}>
                  <IoPersonOutline color="var(--rose-pink-400)" />
                </MenuButton>
                <AppHeaderDropdown />
              </Dropdown>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  )
}

export default AppHeader
