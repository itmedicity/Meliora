import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SettingsIcon from '@mui/icons-material/Settings'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { Badge, IconButton } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  iconHome,
  iconMessage,
  iconNotification,
  iconPowerOff,
  iconSettings,
} from 'src/color/Color'

import { ActionTyps } from 'src/redux/constants/action.type'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-0" style={{ padding: 0 }}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: ActionTyps.APP_SIDEBAR_SHOW, sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" style={{ color: iconSettings }} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
              <IconButton disableRipple sx={{ paddingX: 0, color: iconHome }}>
                <HomeRoundedIcon />
              </IconButton>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/dashboard">
              <IconButton disableRipple sx={{ paddingX: 0, color: iconSettings }}>
                <SettingsIcon />
              </IconButton>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/dashboard">
              <IconButton disableRipple sx={{ paddingX: 0, color: iconPowerOff }}>
                <PowerSettingsNewIcon />
              </IconButton>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/dashboard">
              <Badge badgeContent={4} color="error">
                <EmailIcon sx={{ color: iconMessage }} />
              </Badge>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/dashboard">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon sx={{ color: iconNotification }} />
              </Badge>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown sx={{ paddingX: 0 }} />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
