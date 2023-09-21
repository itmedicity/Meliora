import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Box } from '@mui/joy'


const TaskHomePage = () => {

  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empname

  })
  const monthdate = moment(new Date()).format('MMM-D')
  const dayss = moment(new Date()).format('dddd')

  return (
    <Box sx={{
      backgroundColor: 'lightgray'
    }} >
      dsdssds
    </Box>
  )
}

export default memo(TaskHomePage)