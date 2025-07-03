import React, { memo } from 'react'
import { Backdrop as Drop, Box, CircularProgress } from '@mui/material'
import MLogoIcon from 'src/assets/MLogoIcon'

const BackDrop = () => {
  return (
    <Drop open sx={{ backgroundColor: 'var(--royal-purple-50)', justifyContent: 'center' }}>
      {/* <MLogoIcon width={50} height={50} /> */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.1, // make it subtle
          zIndex: 1,
        }}
      >
        <MLogoIcon width={600} height={600} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: 'var(--royal-purple-400)' }} />
      </Box>
    </Drop>
  )
}

export default memo(BackDrop)
