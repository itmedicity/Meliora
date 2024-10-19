import { Badge, Box, CssVarsProvider, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { axioslogin } from 'src/views/Axios/Axios';
import DirectPendingList from './DirectTicketList/DirectPendingList';
import SectionwiseHoldList from './DirectTicketList/SectionwiseHoldList';
import SectionWiseVerify from './DirectTicketList/SectionWiseVerify';
import SectionWiseRectifyList from './DirectTicketList/SectionWiseRectifyList';
import SectionwiseVerifyList from './DirectTicketList/SectionwiseVerifyList';

const DirectComplaintTable = ({ count, setCount, rowSelect }) => {

    const [pending, setpending] = useState(1)
    const [verifiedCheck, setVerifiedCheck] = useState(0)
    const [holdCheck, setholdCheck] = useState(0)
    const [holdLength, setholdLength] = useState(0)
    const [pendingLength, setpendingLength] = useState(0)
    const [verifyLength, setverifyLength] = useState(0)
    const [rectifiedCheck, setRectifiedCheck] = useState(0)
    const [verifiedListCheck, setVerifiedListCheck] = useState(0)
    const [pendingCompl, setpendingCompl] = useState([])
    const [onholdCompl, setOnholdCompl] = useState([])
    const [forVerify, setforVerify] = useState([])


    // const empsecid = useSelector((state) => {
    //     return state.LoginUserData.empsecid
    // })

    const RectifiedCheck = useCallback(() => {
        setholdCheck(0)
        setVerifiedCheck(0)
        setpending(0)
        setRectifiedCheck(1)
        setVerifiedListCheck(0)
    }, [])

    const VerifiedListCheck = useCallback(() => {
        setholdCheck(0)
        setVerifiedCheck(0)
        setpending(0)
        setRectifiedCheck(0)
        setVerifiedListCheck(1)

    }, [])

    const PendingCheck = useCallback(() => {
        setholdCheck(0)
        setVerifiedCheck(0)
        setpending(1)
        setRectifiedCheck(0)
        setVerifiedListCheck(0)
    }, [])

    const VerifiedCheck = useCallback(() => {
        setholdCheck(0)
        setVerifiedCheck(1)
        setpending(0)
        setRectifiedCheck(0)
        setVerifiedListCheck(0)
    }, [])

    const HoldCheck = useCallback(() => {
        setholdCheck(1)
        setVerifiedCheck(0)
        setpending(0)
        setRectifiedCheck(0)
        setVerifiedListCheck(0)
    }, [])


    useEffect(() => {
        const getAllPendingCompalints = async () => {
            try {
                const result = await axioslogin.get(`/complaintreg/viewAllPendingTicket`);
                const { success, data } = result.data;
                if (success === 2) {
                    const PendingCompl = data.filter(complaint =>
                        complaint.compalint_status !== 2 &&
                        complaint.compalint_status !== 3 &&
                        complaint.cm_rectify_status !== 'O');

                    const OnholdCompl = data.filter(complaint =>
                        complaint.compalint_status !== 2 &&
                        complaint.compalint_status !== 3 &&
                        complaint.cm_rectify_status === 'O'
                    );
                    const ForVerify = data.filter(complaint =>
                        complaint.compalint_status === 2 &&
                        complaint.compalint_status !== 3 &&
                        complaint.cm_rectify_status === 'R'
                    );

                    setpendingCompl(PendingCompl)
                    setOnholdCompl(OnholdCompl)
                    setforVerify(ForVerify)
                    setholdLength(OnholdCompl.length === 0 ? 0 : OnholdCompl.length)
                    setpendingLength(PendingCompl.length === 0 ? 0 : PendingCompl.length)
                    setverifyLength(ForVerify.length === 0 ? 0 : ForVerify.length)
                }
                else {
                    setpendingCompl([])
                }
            } catch (error) {
                console.error("Error fetching pending complaints:", error);
                setpendingCompl([]);
            }
        }
        getAllPendingCompalints()
    }, [count])


    return (
        <Box sx={{ flex: 1 }}>
            <Box sx={{ flex: 1, display: 'flex', px: 3, pt: 2.5, pb: .5, justifyContent: 'center', gap: 3 }}>
                <CssVarsProvider>
                    <Badge badgeContent={pendingLength} color="danger">
                        <Box sx={{ px: 2, display: 'flex', cursor: 'pointer', }} onClick={PendingCheck}>
                            {pending === 1 ?
                                <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#F44336' }} />
                                : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                            <Typography sx={{ pl: .5 }}>Pending</Typography>
                        </Box>
                    </Badge>
                </CssVarsProvider>
                <CssVarsProvider>
                    <Badge badgeContent={holdLength} color="neutral">
                        <Box sx={{ px: 2, display: 'flex', cursor: 'pointer', }} onClick={HoldCheck}>
                            {holdCheck === 1 ?
                                <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#50655B' }} />
                                : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                            <Typography sx={{ pl: .5 }}>On Hold</Typography>
                        </Box>
                    </Badge>
                </CssVarsProvider>
                <CssVarsProvider>
                    <Badge badgeContent={verifyLength} color="primary">
                        <Box sx={{ px: 2, display: 'flex', cursor: 'pointer', }} onClick={VerifiedCheck}>
                            {verifiedCheck === 1 ?
                                <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#3399FF' }} />
                                : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                            <Typography sx={{ pl: .5 }}>For Verify</Typography>
                        </Box>
                    </Badge>
                </CssVarsProvider>
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
            <Box sx={{ flex: 1, }}>
                {pending === 1 ?
                    <Box>
                        <DirectPendingList count={count} setCount={setCount} rowSelect={rowSelect} pendingCompl={pendingCompl} />
                    </Box> :
                    <Box></Box>
                }
                {verifiedCheck === 1 ?
                    <Box>
                        <SectionWiseVerify count={count} setCount={setCount} forVerify={forVerify} />

                    </Box> :
                    <Box></Box>
                }
                {holdCheck === 1 ?
                    <Box>
                        <SectionwiseHoldList count={count} setCount={setCount} onholdCompl={onholdCompl} />
                    </Box> :
                    <Box></Box>
                }
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


        </Box>
    )
}

export default memo(DirectComplaintTable)

