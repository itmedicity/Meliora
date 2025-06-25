import React, { Fragment, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import { iconPowerOff } from 'src/color/Color'
import LogoutIcon from '@mui/icons-material/Logout'
import ModelMessage from 'src/views/Components/ModelMessage'
import ModelPaswdChange from 'src/views/Components/ModelPaswdChange'
import KeyIcon from '@mui/icons-material/Key'

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

const AppHeaderDropdown = () => {
  const [open, setOpen] = useState(false)
  const [openChangPswd, setOpenChangPswd] = useState(false)
  const cmsLogout = () => {
    setOpen(true)
  }
  const passwordChange = () => {
    setOpenChangPswd(true)
  }
  const handleClose = () => {
    setOpenChangPswd(false)
    setOpen(false)
  }

  return (
    <Fragment>
      <ModelPaswdChange open={openChangPswd} handleClose={handleClose} />
      <ModelMessage open={open} handleClose={handleClose} />
      {/* <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <Avatar src="/broken-image.jpg" /> */}
      {/* <CAvatar src="/broken-image.jpg" size="md" /> */}
      {/* </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end"> */}
      {/* <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
            <ManageAccountsIcon className="me-2" sx={{ color: iconProfile }} />
            Profile
          </CDropdownItem>
          <CDropdownItem href="#">
            <EmailIcon className="me-2" sx={{ color: iconMessage }} />
            Message
            <CBadge style={{ backgroundColor: iconMessage }} className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <NotificationsIcon className="me-2" style={{ color: iconNotification }} />
            Notification
            <CBadge style={{ backgroundColor: iconNotification }} className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownItem href="#">
            <SettingsIcon className="me-2" sx={{ color: iconSettings }} />
            Settings
            <CBadge style={{ backgroundColor: iconSettings }} className="ms-2">
              42
            </CBadge>
          </CDropdownItem> */}

      {/* <CDropdownDivider />
          <CDropdownItem href="#" onClick={passwordChange} >
            <KeyIcon className="me-2" sx={{ color: iconPowerOff }} onClick={cmsLogout} />
            Change Password
          </CDropdownItem>
          <CDropdownItem href="#" onClick={cmsLogout} >
            <LogoutIcon className="me-2" sx={{ color: iconPowerOff }} onClick={cmsLogout} />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown> */}
      <CssVarsProvider>
        <Menu
          placement="bottom-end"
          sx={{
            minWidth: 300,
            borderRadius: '20px',
            padding: '10px',
          }}
        >
          <MenuItem>
            <ListItemDecorator>
              <FcSettings size={22} />
            </ListItemDecorator>
            Settings
          </MenuItem>
          <MenuItem onClick={passwordChange}>
            <ListItemDecorator>
              <FcEditImage size={22} />
            </ListItemDecorator>
            Change Password
          </MenuItem>
          <ListDivider />
          <MenuItem onClick={cmsLogout}>
            <ListItemDecorator>
              <FcLock size={22} />
            </ListItemDecorator>
            End Session
          </MenuItem>
        </Menu>
      </CssVarsProvider>
    </Fragment>
  )
}

export default AppHeaderDropdown
