import { Box } from '@mui/joy'
import React, { memo } from 'react'

const TicketDashTile = ({ name, icon, iconbgcolor, count, percentage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        border: 1,
        borderColor: 'lightgrey',
        minHeight: 70,
        flex: 1,
        bgcolor: 'white',
        borderRadius: 5
      }}
    >
      <Box sx={{ flex: 1, pl: 1, pt: 1 }}>
        <Box sx={{ fontSize: 20, fontWeight: 600, color: '#41729F', pl: 0.5 }}>{count}</Box>
        <Box>{name}</Box>
      </Box>
      <Box
        sx={{
          width: 80,
          m: 0.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: iconbgcolor
        }}
      >
        <Box>
          <Box sx={{ pl: 0.1 }}>{icon}</Box>
          <Box sx={{ fontSize: 12, pl: 0.4 }}>{percentage}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(TicketDashTile)
