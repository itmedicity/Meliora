import React, { Fragment } from 'react'
import { Card, CardActions, CardContent, ThemeProvider } from '@mui/material'
import CusIconButton from './CusIconButton'
import theme from './MuiTheme'
import { Box } from '@mui/system'
import CustomeToolTip from './CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh'
import { cardActionBgClr } from 'src/color/Color'

const CardMastComplaint = ({ children, title, close, submit, refresh, contentStyle }) => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Card sx={{ borderRadius: 0, boxShadow: 1 }}>
          <CardContent sx={contentStyle}>{children}</CardContent>
          <CardActions
            sx={{ backgroundColor: cardActionBgClr, py: 0.3, pt: 0.5 }}
            disableSpacing={false}
          >
            <CustomeToolTip title="Save" placement="left">
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
            </CustomeToolTip>
            <CustomeToolTip title="Refresh" placement="left">
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
            </CustomeToolTip>
          </CardActions>
        </Card>
      </ThemeProvider>
    </Fragment>
  )
}

export default CardMastComplaint
