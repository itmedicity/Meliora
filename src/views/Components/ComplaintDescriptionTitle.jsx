import React, { Fragment } from 'react'
import { Box } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
const ComplaintDescriptionTitle = () => {
  return (
    <Fragment>
      <Box>
        <Box sx={{ flex: 1 }}>
          <CssVarsProvider>
            <Typography textColor="neutral.400" sx={{ display: 'flex', p: 0.5 }}>
              Complaint Description
            </Typography>
          </CssVarsProvider>
        </Box>
      </Box>
    </Fragment>
  )
}

export default ComplaintDescriptionTitle
