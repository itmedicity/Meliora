import React from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper flex flex-column min-vh-100 " style={{ backgroundColor: "#BEC1C5" }} >
        <AppHeader />
        <div className="body flex-grow-1 px-0 py-2" >
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
