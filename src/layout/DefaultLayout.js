import React, { useState } from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import { Box } from '@mui/system'
import SideMenu from 'src/components/SideMenu'

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
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
          // borderRightColor: 'var(--rose-pink-400)',
          borderRightColor: 'var(--royal-purple-100)',
          height: '100vh',
          paddingTop: 10,
          flexDirection: 'column',
        }}
      >
        <SideMenu />
      </Box>
      {/* content */}
      <Box sx={{ flex: 1, bgcolor: '#FBFBFB', padding: 2, paddingTop: 8 }}>
        {/* <AppContent /> */}
      </Box>
    </Box>
    // <div
    //   style={{ display: 'flex', backgroundColor: 'green', flexDirection: 'row', height: '100vh' }}
    // >
    //   <div style={{ backgroundColor: 'yellow' }}>
    //     <div style={{ backgroundColor: 'orange' }}>
    //       <AppContent />
    //     </div>
    //     <AppFooter />
    //   </div>
    // </div>
  )
}

export default DefaultLayout
