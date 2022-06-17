import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import {
  iconMessage,
  iconNotification,
  iconProfile,
  iconPowerOff,
  iconSettings,
} from 'src/color/Color'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { infoNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const history = useHistory()
  const hrmLogout = () => {
    sessionStorage.clear();
    infoNotify('You Are Logged Out Successfully');
    history.push('/')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
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
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <LogoutIcon className="me-2" sx={{ color: iconPowerOff }} onClick={hrmLogout} />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
