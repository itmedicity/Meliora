import React, { Fragment, memo } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CusIconButton from './CusIconButton'
import theme from './MuiTheme'
// import CustomeToolTip from './CustomeToolTip';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh'
import CustomCardHeaderOne from './CustomCardHeaderOne'
import { cardActionBgClr } from 'src/color/Color'
import { Box, CardContent, Tooltip } from '@mui/joy'
import { Card, CardActions, ThemeProvider } from '@mui/joy'

const CardMasterJoy = ({ children, title, close, submit, refresh, contentStyle }) => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Card sx={{ borderRadius: 0, boxShadow: 1 }}>
          <CustomCardHeaderOne title={title} onClickClose={close} cardStyle={{}} />
          <CardContent sx={contentStyle}>{children}</CardContent>
          <CardActions sx={{ backgroundColor: cardActionBgClr, py: 0.3, pt: 0.5 }}>
            {/* Save button */}

            <Tooltip title="Save" placement="left">
              <Box>
                <CusIconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  clickable="true"
                  onClick={submit}
                >
                  <LibraryAddIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </Tooltip>
            {/* Refresh Button */}
            <Tooltip title="Refresh" placement="left">
              <Box>
                <CusIconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  clickable="true"
                  onClick={refresh}
                >
                  <RefreshIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </Tooltip>
            {/* Close button */}
            <Tooltip title="Close" placement="left">
              <Box>
                <CusIconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  clickable="true"
                  onClick={close}
                >
                  <CloseIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </Tooltip>
          </CardActions>
        </Card>
      </ThemeProvider>
    </Fragment>
  )
}

export default memo(CardMasterJoy)
