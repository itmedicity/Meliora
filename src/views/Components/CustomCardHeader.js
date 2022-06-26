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
      // disableTypography
      sx={{
        backgroundColor: cardHeaderColor,
        paddingY: 0.5,
        borderBottom: 0.1,
        borderBottomColor: cardHeaderColor,
        fontSize: 14,
        color: cardHeaderFont,
        borderColor: '#66bb6a',
        // backgroundColor: {
        //     xs: 'red',
        //     sm: 'green',
        //     md: 'yellow',
        //     lg: 'brown',
        //     xl: 'lightgreen'
        // },
      }}
    />
  )
}

export default CustomCardHeader
