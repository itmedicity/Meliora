import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SettingsIcon from '@mui/icons-material/Settings'
import SummarizeIcon from '@mui/icons-material/Summarize'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import CustomeToolTip from '../views/Components/CustomeToolTip'
import { iconHome, iconPowerOff, iconSettings, iconReport, iconManual } from 'src/color/Color'
import { ActionTyps } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import ModelMessage from 'src/views/Components/ModelMessage'
import { TiThMenuOutline } from 'react-icons/ti'

// import { Box } from '@mui/material'
import { useId } from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import Menu from '@mui/joy/Menu'
import MenuItem from '@mui/joy/MenuItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListDivider from '@mui/joy/ListDivider'
import MoreVert from '@mui/icons-material/MoreVert'
import Edit from '@mui/icons-material/Edit'
import DeleteForever from '@mui/icons-material/DeleteForever'
import MenuButton from '@mui/joy/MenuButton'
import Dropdown from '@mui/joy/Dropdown'

import { IoPersonOutline } from 'react-icons/io5'
import { IoIosLogOut } from 'react-icons/io'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { FcSettings } from 'react-icons/fc'
import { FcLock } from 'react-icons/fc'
import { FcEditImage } from 'react-icons/fc'
import { CssVarsProvider } from '@mui/joy'

const AppHeader = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
  const [open, setOpen] = useState(false)
  const cmsLogout = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
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

  return (
    <Fragment>
      <Box
        sx={{
          flexGrow: 1,
          position: 'fixed',
          top: 0,
          left: 0, // adjust based on sidebar width
          right: 0,
          zIndex: 999,
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
              <Typography
                component="div"
                sx={{ fontFamily: 'var(--roboto-font)', fontWeight: 900 }}
              >
                Meliora
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
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

      {/* <ModelMessage open={open} handleClose={handleClose} />
      <ToastContainer />
      <CHeader
        position="sticky"
        className="mb-0"
        style={{ padding: 0, backgroundColor: '#474b4f' }}
      >
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() =>
              dispatch({ type: ActionTyps.APP_SIDEBAR_SHOW, sidebarShow: !sidebarShow })
            }
          >
            <CIcon icon={cilMenu} size="lg" style={{ color: iconSettings }} />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink to="/Home" component={NavLink}>
                <HomeRoundedIcon sx={{ color: iconHome }} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/Home/Settings" component={NavLink}>
                <SettingsIcon sx={{ color: iconSettings }} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/Home/Reports" component={NavLink}>
                <SummarizeIcon sx={{ color: iconReport }} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/Home/Manual" component={NavLink}>
                <MenuBookIcon sx={{ color: iconManual }} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="#" component={NavLink} onClick={cmsLogout}>
                <PowerSettingsNewIcon sx={{ color: iconPowerOff }} />
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CustomeToolTip title="Complaint Register" placement="top">
            <CHeaderNav className="ms-3">
              <CNavItem>
                <CNavLink to="/Home/ComplaintRegister" component={NavLink}>
                  <BookmarksIcon sx={{ color: iconManual }} />
                </CNavLink>
              </CNavItem>
            </CHeaderNav>
          </CustomeToolTip>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown sx={{ paddingX: 0 }} />
          </CHeaderNav>
        </CContainer>
      </CHeader> */}
    </Fragment>
  )
}

export default AppHeader
