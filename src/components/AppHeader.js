import React, { Fragment } from 'react'
import { AppHeaderDropdown } from './header/index'
import { TiThMenuOutline } from 'react-icons/ti'
import { IoMdTime } from "react-icons/io";
import { BsFillPersonLinesFill } from "react-icons/bs";
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
import { useSelector } from 'react-redux'


const AppHeader = ({ collapsed, setCollapsed }) => {

  const empname = useSelector(state => {
    return state.LoginUserData.empname
  })

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
              <Box sx={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                <Box sx={{ fontWeight: 600, fontSize: 12, fontFamily: 'var(--roboto-font)' }}>Travancore Medicity</Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                  <BsFillPersonLinesFill />

                  <Box sx={{ fontWeight: 600, fontSize: 12, fontFamily: 'var(--roboto-font)' }}>
                    {empname
                      ?.toLowerCase()
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}

                  </Box>
                  <IoMdTime />
                  <LiveClock />
                </Box>                {/* <Box sx={{ fontWeight: 600,fontSize:12,fontFamily: 'var(--roboto-font)'  }} >Hospital Administration System</Box> */}
              </Box>
              <Dropdown>
                <MenuButton
                  sx={{ ml: 2, background: 'var(--royal-purple-100)' }}
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: 'outlined', color: 'danger' } }}
                >
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
