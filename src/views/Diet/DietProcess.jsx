import React, {
  memo,
} from 'react'

import { Box } from '@mui/material'
import ProcessList from './DietProcessing/ProcessList'

const DietProcess = () => {
  return (

    <Box sx={{ width: '100%', height: '100%' }}>
      <ProcessList />
    </Box>

  )
}

export default memo(DietProcess)
