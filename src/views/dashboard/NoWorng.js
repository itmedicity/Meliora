import { Paper, Box } from '@mui/material'
import React, { Fragment } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'

const NoWorng = () => {
  return (
    <Fragment>
      <Box sx={{ width: '100%', p: 1 }}>
        <Paper square elevation={2} sx={{ p: 1 }}>
          <Box
            sx={{
              // pl: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <CssVarsProvider>
              <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }}>
                Approval Not Done{' '}
              </Typography>
            </CssVarsProvider>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  )
}

export default NoWorng
