import React, { Fragment, useState } from 'react'
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
import SummarizeIcon from '@mui/icons-material/Summarize';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

import {
  iconHome,
  iconPowerOff,
  iconSettings, iconReport, iconManual
} from 'src/color/Color'
import { ActionTyps } from 'src/redux/constants/action.type'
import { ToastContainer } from 'react-toastify'
import ModelMessage from 'src/views/Components/ModelMessage'


const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
  const [open, setOpen] = useState(false);
  const cmsLogout = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };
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

  return (
    < Fragment >
      <ModelMessage open={open} handleClose={handleClose} />
      <ToastContainer />
      <CHeader position="sticky" className="mb-0" style={{ padding: 0, backgroundColor: '#474b4f' }}>
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
              <CNavLink to="/Home" component={NavLink} activeClassName="active">
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
              <CNavLink to="#" component={NavLink} onClick={cmsLogout}>
                <PowerSettingsNewIcon sx={{ color: iconPowerOff }} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/Home/Manual" component={NavLink} >
                <MenuBookIcon sx={{ color: iconManual }} />
              </CNavLink>
            </CNavItem>
            {/* {
              Manualshow === 1 ? <CNavItem>
                <CNavLink to="/Home/Manual" component={NavLink} >
                  <MenuBookIcon sx={{ color: iconManual }} />
                </CNavLink>
              </CNavItem> : null
            } */}

          </CHeaderNav>
          {/* <CHeaderNav>
            <CNavItem>
              <CNavLink to="/Home">
                <Badge badgeContent={4} color="error">
                  <EmailIcon sx={{ color: iconMessage }} />
                </Badge>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/Home">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon sx={{ color: iconNotification }} />
                </Badge>
              </CNavLink>
            </CNavItem>
          </CHeaderNav> */}
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown sx={{ paddingX: 0 }} />
          </CHeaderNav>
        </CContainer>
      </CHeader>
    </Fragment >
  )
}

export default AppHeader
