import { Box } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import OtherPaidBills from '../PaidBills/OtherPaidBills'

const PaidServiceBills = () => {
  const [otherBillsSer, setOtherBillsSer] = useState([])

  useEffect(() => {
    const getOtherPaidBills = async () => {
      const result = await axioslogin.get('/ItBillVieww/serviceOthrPaid')
      const { success, data } = result.data
      if (success === 2) {
        setOtherBillsSer(data)
      } else {
        setOtherBillsSer([])
      }
    }
    getOtherPaidBills()
  }, [])

  return (
    <Box sx={{ mt: 1, mx: 0.5 }}>
      <OtherPaidBills otherBills={otherBillsSer} />
    </Box>
  )
}

export default memo(PaidServiceBills)
