import React from 'react'
import { CardHeader, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { cardHeaderColor, cardHeaderFont } from 'src/color/Color'

const CustomCardHeader = ({ title }) => {
  return (
    <CardHeader
      title={title}
      action={
        <Tooltip title="Close" arrow>
          <IconButton aria-label="settings" size="small" sx={{ paddingTop: 0 }}>
            <CloseIcon sx={{ paddingTop: 0.3, color: cardHeaderFont }} />
          </IconButton>
        </Tooltip>
      }
      titleTypographyProps={{ variant: 'subtitle2' }}
      //   disableTypography
      sx={{
        backgroundColor: cardHeaderColor,
        paddingY: 0.5,
        borderBottom: 0.1,
        borderBottomColor: cardHeaderColor,
        fontSize: 14,
        color: cardHeaderFont,
        border: 0.1,
        borderColor: '#66bb6a',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      }}
    />
  )
}

export default CustomCardHeader
