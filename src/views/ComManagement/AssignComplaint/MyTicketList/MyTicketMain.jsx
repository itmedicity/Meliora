import { Box } from '@mui/joy'
import React, { memo } from 'react'
import MyAllTickets from './MyAllTickets';
const MyTicketMain = ({ assistReq, count, setCount }) => {
    return (
        <Box sx={{
            flex: 1,
            bgcolor: '#E3E7F1',
            mt: .3,
            px: .3,
            pt: .3,
            pb: .5
        }}>
            <MyAllTickets assistReq={assistReq} count={count} setCount={setCount} />
        </Box>
    )
}

export default memo(MyTicketMain)