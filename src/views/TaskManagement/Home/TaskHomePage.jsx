import { Box } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { innerHeight } from 'src/views/Constant/Constant';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const TaskHomePage = () => {

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);



  return (
    <Box sx={{
      display: 'flex',
      minHeight: `${innerHeight - 80}px`,
      borderRadius: 2,
      overflow: 'hidden',
      flexDirection: 'column',
      border: 1,
      borderWidth: 1.5,
      borderColor: '#6D6E6F'
    }} >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#6D6E6F',
          maxHeight: 40,
          alignItems: 'center',
          pl: 2
        }}
      >
        <DashboardOutlinedIcon fontSize='medium' sx={{ color: 'white' }} />
        <Box sx={{ pl: 1, color: 'white', display: 'flex', pt: 0.3 }} >My Dashboard</Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 1,
        // backgroundColor: '#e0dedc',
        overflow: 'hidden'
        // border: 1
      }} >

        <Paper
          sx={{
            width: '20%',
            height: 150
          }}
        >
          dsdfsd
        </Paper>
      </Box>
    </Box>
  )
}

export default memo(TaskHomePage) 
