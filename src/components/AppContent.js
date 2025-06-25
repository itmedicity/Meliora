import React, { Suspense, memo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// routes config
import routes from '../routes'
import BackDrop from 'src/views/Components/BackDrop'
import { Box } from '@mui/material'

const AppContent = () => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Suspense fallback={<BackDrop />}>
        <Routes>
          {/* {routes.map((route, idx) => {
            return route.component && <Route key={idx} path={route.path} element={route.element} />
          })} */}
          {routes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </Box>
  )
}

export default memo(AppContent)
