import { Box, CircularProgress } from '@mui/material'
import React, { memo } from 'react'

const CustomCircularProgress = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        width: '90%',
        height: '100%'
      }}
    >
      <CircularProgress sx={{ display: 'flex' }} />
    </Box>
  )
}

export default memo(CustomCircularProgress)
