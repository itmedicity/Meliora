import { Avatar, Box } from '@mui/joy'
import React, { memo } from 'react'

const DashBoadTile = ({ imageUrl, Name, totalCount, icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        border: 1,
        borderColor: '#d0d6e5',
        flex: 1,
        bgcolor: '#fafbfd',
        borderRadius: 5,
        height: 75
      }}
    >
      <Box sx={{ flex: 1, pl: 1.5 }}>
        <Box sx={{ fontSize: 20, fontWeight: 600, color: '#41729F', pt: 1.5 }}>{totalCount}</Box>
        <Box sx={{ fontSize: 13, fontWeight: 600, color: '#636b74' }}>{Name}</Box>
      </Box>
      <Box
        sx={{
          width: 60,
          m: 0.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            src={imageUrl}
            alt="pics"
            sx={{
              width: 50,
              height: 50,
              bgcolor: 'white'

              // boxShadow: '0px 4px 10px rgba(123, 147, 202, 0.25)'
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(DashBoadTile)
