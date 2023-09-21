import { Box } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { innerHeight } from 'src/views/Constant/Constant';

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
      borderColor: '#e0dedc'
    }} >
      <Box sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 1,
        backgroundColor: '#e0dedc',
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
