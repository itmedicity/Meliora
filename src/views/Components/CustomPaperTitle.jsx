import { Box } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'

const CustomPaperTitle = ({ heading, mandtry }) => {
  return (
    <Fragment>
      <Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          <CssVarsProvider>
            <Typography
              textColor="#757575"
              sx={{
                display: 'flex',
                p: 0,
                px: 0.7,
                fontSize: 14,
                fontWeight: 550
              }}
            >
              {heading}
            </Typography>
            {mandtry === 1 ? <Typography textColor="red">*</Typography> : ''}
          </CssVarsProvider>
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(CustomPaperTitle)
