import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SectionWiseRectifyList from '../DirectCmRegister/DirectTicketList/SectionWiseRectifyList';
import SectionwiseVerifyList from '../DirectCmRegister/DirectTicketList/SectionwiseVerifyList';

const ResolvedDirectTickets = () => {

    const [rectifiedCheck, setRectifiedCheck] = useState(1)
    const [verifiedListCheck, setVerifiedListCheck] = useState(0)
    const [count, setCount] = useState(0)

    const RectifiedCheck = useCallback(() => {
        setRectifiedCheck(1)
        setVerifiedListCheck(0)
    }, [])

    const VerifiedListCheck = useCallback(() => {
        setRectifiedCheck(0)
        setVerifiedListCheck(1)
    }, [])

    return (
        <Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', pt: 2, pb: 1, }}>
                <Box sx={{ px: 2, display: 'flex', cursor: 'pointer' }} onClick={RectifiedCheck}>
                    {rectifiedCheck === 1 ?
                        <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#59981A' }} />
                        : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                    <Typography sx={{ pl: .5 }}>Rectified</Typography>
                </Box>
                <Box sx={{ px: 1, display: 'flex', cursor: 'pointer' }} onClick={VerifiedListCheck} >
                    {verifiedListCheck === 1 ?
                        <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#3399FF' }} />
                        : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                    <Typography sx={{ pl: .5 }}>Verified</Typography>
                </Box>
            </Box>
            {rectifiedCheck === 1 ?
                <Box>
                    < SectionWiseRectifyList count={count} setCount={setCount} />
                </Box> :
                <Box></Box>
            }
            {verifiedListCheck === 1 ?
                <Box>
                    <SectionwiseVerifyList count={count} setCount={setCount} />
                </Box> :
                <Box></Box>
            }
        </Box>
    )
}

export default memo(ResolvedDirectTickets)