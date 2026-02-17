import React, {
  // useCallback, useEffect,
  memo,
  //  useState 
} from 'react'
// import CardCloseOnly from '../Components/CardCloseOnly'
// import { useNavigate } from 'react-router-dom'
// import DietProcessDashCmp from '../dashboard/DietProcessDashCmp'
import { Box } from '@mui/material'
import ProcessList from './DietProcessing/ProcessList'

const DietProcess = () => {
  //*** Initializing */
  // const history = useNavigate()
  // const [count, setCount] = useState(0)

  // useEffect(() => { }, [count])
  // //close button function
  // const backtoSetting = useCallback(() => {
  //   history('/Home/Settings')
  // }, [history])

  return (
    // <CardCloseOnly title="Diet Proccess" close={backtoSetting}>
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* <DietProcessDashCmp count={count} setCount={setCount} /> */}
      <ProcessList />
    </Box>
    // </CardCloseOnly>
  )
}

export default memo(DietProcess)
