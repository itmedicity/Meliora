import React, { useCallback, useEffect, memo, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import DietProcessDashCmp from '../dashboard/DietProcessDashCmp'

const DietProcess = () => {
  //*** Initializing */
  const history = useNavigate()
  const [count, setCount] = useState(0)

  useEffect(() => {}, [count])
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  return (
    <CardCloseOnly title="Diet Proccess" close={backtoSetting}>
      <Box sx={{ width: '100%', pl: 2, pt: 1, pr: 2, pb: 2 }}>
        <DietProcessDashCmp count={count} setCount={setCount} />
      </Box>
    </CardCloseOnly>
  )
}

export default memo(DietProcess)
