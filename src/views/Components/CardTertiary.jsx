import React, { Fragment } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Card, CardActions, CardContent, ThemeProvider } from '@mui/material'
import CusIconButton from './CusIconButton'
import theme from './MuiTheme'
import { Box } from '@mui/system'
import CustomeToolTip from './CustomeToolTip'
import RefreshIcon from '@mui/icons-material/Refresh'
import CustomCardHeaderOne from './CustomCardHeaderOne'

const CardTertiary = ({ children, title }) => {
  const toDashBoard = () => {}
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Card sx={{ borderRadius: 0, boxShadow: 1 }}>
          <CustomCardHeaderOne title={title} onClickClose={toDashBoard} cardStyle={{}} />
          <CardContent>{children}</CardContent>
          <CardActions sx={{ backgroundColor: '#f0f3f5', py: 0.3, pt: 0.5 }} disableSpacing={false}>
            {/* Refresh Button */}
            <CustomeToolTip title="Refresh" placement="left">
              <Box>
                <CusIconButton size="sm" variant="outlined" color="primary">
                  <RefreshIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </CustomeToolTip>
            {/* Close button */}
            <CustomeToolTip title="Close" placement="left">
              <Box>
                <CusIconButton size="sm" variant="outlined" color="primary">
                  <CloseIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </CustomeToolTip>
          </CardActions>
        </Card>
      </ThemeProvider>
    </Fragment>
  )
}

export default CardTertiary
