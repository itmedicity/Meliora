import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import MyRectifiedList from './MyRectifiedList'
import MyVerifiedList from './MyVerifiedList'
import MyHoldList from './MyHoldList'
import MyAssignedList from './MyAssignedList'

const MyAllTickets = ({ assistReq, count, setCount }) => {
  const [rectifiedCheck, setRectifiedCheck] = useState(0)
  const [verifiedCheck, setVerifiedCheck] = useState(0)
  const [holdCheck, setholdCheck] = useState(0)
  const [AssingCheck, setAssingedCheck] = useState(1)

  const RectifiedCheck = useCallback(() => {
    setRectifiedCheck(1)
    setVerifiedCheck(0)
    setholdCheck(0)
    setAssingedCheck(0)
  }, [])

  const VerifiedCheck = useCallback(() => {
    setVerifiedCheck(1)
    setRectifiedCheck(0)
    setholdCheck(0)
    setAssingedCheck(0)
  }, [])

  const HoldCheck = useCallback(() => {
    setholdCheck(1)
    setVerifiedCheck(0)
    setRectifiedCheck(0)
    setAssingedCheck(0)
  }, [])

  const AssingedCheck = useCallback(() => {
    setAssingedCheck(1)
    setholdCheck(0)
    setVerifiedCheck(0)
    setRectifiedCheck(0)
  }, [])

  return (
    <Box sx={{ bgcolor: '#E3E7F1' }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          px: 3,
          pt: 2.5,
          pb: 2,
          justifyContent: 'center',
          bgcolor: 'white',
          gap: 2,
        }}
      >
        <Box sx={{ px: 1, display: 'flex', cursor: 'pointer' }} onClick={AssingedCheck}>
          {AssingCheck === 1 ? (
            <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#9A5B13' }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />
          )}
          <Typography sx={{ pl: 0.5 }}>Assigned</Typography>
        </Box>
        <Box sx={{ px: 1, display: 'flex', cursor: 'pointer' }} onClick={HoldCheck}>
          {holdCheck === 1 ? (
            <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#50655B' }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />
          )}
          <Typography sx={{ pl: 0.5 }}>On Hold</Typography>
        </Box>

        <Box sx={{ px: 1, display: 'flex', cursor: 'pointer' }} onClick={RectifiedCheck}>
          {rectifiedCheck === 1 ? (
            <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#59981A' }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />
          )}
          <Typography sx={{ pl: 0.5 }}>Rectified</Typography>
        </Box>
        <Box sx={{ px: 1, display: 'flex', cursor: 'pointer' }} onClick={VerifiedCheck}>
          {verifiedCheck === 1 ? (
            <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#3399FF' }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />
          )}
          <Typography sx={{ pl: 0.5 }}>Verified</Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, bgcolor: 'white' }}>
        {rectifiedCheck === 1 ? (
          <Box>
            <MyRectifiedList />
          </Box>
        ) : (
          <Box></Box>
        )}
        {verifiedCheck === 1 ? (
          <Box>
            <MyVerifiedList />
          </Box>
        ) : (
          <Box></Box>
        )}
        {holdCheck === 1 ? (
          <Box>
            <MyHoldList />
          </Box>
        ) : (
          <Box></Box>
        )}
        {AssingCheck === 1 ? (
          <Box>
            <MyAssignedList assistReq={assistReq} count={count} setCount={setCount} />
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(MyAllTickets)
