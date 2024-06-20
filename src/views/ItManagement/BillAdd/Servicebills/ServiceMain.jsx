import { Box, } from '@mui/joy'
import React, { memo, useEffect, useState, } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import OtherBills from '../OtherBill/OtherBills';

const ServiceMain = ({ billCount, setbillCount }) => {


    const [otherData, setOtherData] = useState([])

    useEffect(() => {
        const getUnpaidBillsSerOther = async () => {
            const result = await axioslogin.get('ItBillAdd/otherServiceBillViewinDash')
            const { success, data } = result.data
            if (success === 2) {
                setOtherData(data)
            } else {
                setOtherData([])
            }
        }
        getUnpaidBillsSerOther()
    }, [billCount])


    return (
        <Box sx={{ mt: 1, mx: .5 }}>
            <OtherBills otherData={otherData} billCount={billCount} setbillCount={setbillCount} />
        </Box >
    )
}

export default memo(ServiceMain)