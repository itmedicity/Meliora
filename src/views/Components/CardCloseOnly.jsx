import React, { Fragment, memo } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Card, CardActions, CardContent, ThemeProvider } from '@mui/material'
import CusIconButton from './CusIconButton'
import theme from './MuiTheme'
import { Box } from '@mui/system'
import CustomeToolTip from './CustomeToolTip'
import CustomCardHeaderOne from './CustomCardHeaderOne'
import { cardActionBgClr } from 'src/color/Color'

const CardCloseOnly = ({ children, title, close }) => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Card sx={{ borderRadius: 0, boxShadow: 1 }}>
          <CustomCardHeaderOne title={title} onClickClose={close} cardStyle={{}} />
          <CardContent sx={{ p: 0 }}>{children}</CardContent>
          <CardActions sx={{ backgroundColor: cardActionBgClr, py: 0.3, pt: 0.5 }} disableSpacing={false}>
            {/* Close button */}
            <CustomeToolTip title="Close" placement="left">
              <Box>
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={close}>
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

export default memo(CardCloseOnly)
