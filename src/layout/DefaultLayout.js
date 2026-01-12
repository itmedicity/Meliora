import React, { useState } from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import { Box } from '@mui/system'
import SideMenu from 'src/components/SideMenu'
import { NotificationProvider } from 'src/views/IncidentManagement/IncidentNotification/NotificationContext'
import SocketListener from 'src/views/IncidentManagement/IncidentNotification/SocketListener'
import NotificationRouteListener from 'src/views/IncidentManagement/IncidentNotification/NotificationRouteListener'


const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <NotificationProvider>
      {/* Socket starts ONLY after login */}
      <SocketListener />
       <NotificationRouteListener />

      <Box sx={{ display: 'flex', height: '100vh', flex: 1 }}>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* Side Bar */}
        <Box
          sx={{
            width: 60,
            zIndex: 998,
            display: { xs: 'none', md: 'block' },
            borderRight: '1px solid',
            borderRightColor: 'var(--royal-purple-100)',
            height: '100vh',
            paddingTop: 10,
            flexDirection: 'column'
          }}
        >
          <SideMenu />
        </Box>
        {/* content */}
        <Box sx={{ flex: 1, bgcolor: '#FBFBFB', padding: 2, paddingTop: 8, overflow: 'auto' }}>
          <AppContent />
        </Box>
      </Box>
    </NotificationProvider>
  )
}

export default DefaultLayout
