import { Badge, Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useState } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import ForVerifySupervisor from './ForVerifySupervisor';
import OnholdInAllList from '../AssignComplaint/AllTicketList/OnholdInAllList';
import RectifiedInAllList from '../AssignComplaint/AllTicketList/RectifiedInAllList';
import VerifiedInAllList from '../AssignComplaint/AllTicketList/VerifiedInAllList';
import AssingedInAllList from '../AssignComplaint/AllTicketList/AssingedInAllList';



const AllTicketsSuperwiser = ({ forVerifyList, count, setCount, forverifyLength, menurights }) => {


    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })
    const [rectifiedCheck, setRectifiedCheck] = useState(0)
    const [verifiedCheck, setVerifiedCheck] = useState(0)
    const [holdCheck, setholdCheck] = useState(0)
    const [assinged, setAssinged] = useState(0)
    const [pendingCompl, setpendingCompl] = useState([])
    const [onholdCompl, setOnholdCompl] = useState([])
    const [holdLength, setholdLength] = useState(0)
    const [pendingLength, setpendingLength] = useState(0)
    const [forVerifycheck, setforVerifycheck] = useState(1)
    const [assignFlag, setassignFlag] = useState(0)


    const RectifiedCheck = useCallback(() => {
        setRectifiedCheck(1)
        setVerifiedCheck(0)
        setholdCheck(0)
        setAssinged(0)
        setforVerifycheck(0)
    }, [])

    const VerifiedCheck = useCallback(() => {
        setVerifiedCheck(1)
        setRectifiedCheck(0)
        setholdCheck(0)
        setAssinged(0)
        setforVerifycheck(0)
    }, [])

    const HoldCheck = useCallback(() => {
        setholdCheck(1)
        setVerifiedCheck(0)
        setRectifiedCheck(0)
        setAssinged(0)
        setforVerifycheck(0)
    }, [])

    const AllAssinged = useCallback(() => {
        setAssinged(1)
        setholdCheck(0)
        setVerifiedCheck(0)
        setRectifiedCheck(0)
        setforVerifycheck(0)
    }, [])

    const ForVerrify = useCallback(() => {
        setforVerifycheck(1)
        setAssinged(0)
        setholdCheck(0)
        setVerifiedCheck(0)
        setRectifiedCheck(0)
    }, [])

    const searchDate = useMemo(() => {
        return {

            complaint_deptslno: empdept,
        };
    }, [empdept]);

    useEffect(() => {
        const getAllPendingCompalints = async () => {
            const result = await axioslogin.post('/Rectifycomplit/getDepartmentPendingList', searchDate);
            const { success, data } = result.data;
            if (success === 2) {
                const PendingCompl = data.filter(complaint =>
                    complaint.complaint_status !== 2 &&
                    complaint.complaint_status !== 3 &&
                    complaint.cm_rectify_status !== 'O');

                const OnholdCompl = data.filter(complaint =>
                    complaint.complaint_status !== 2 &&
                    complaint.complaint_status !== 3 &&
                    complaint.cm_rectify_status === 'O'
                );
                setpendingCompl(PendingCompl)
                setOnholdCompl(OnholdCompl)
                setholdLength(OnholdCompl.length === 0 ? 0 : OnholdCompl.length)
                setpendingLength(PendingCompl.length === 0 ? 0 : PendingCompl.length)

            }
            else {
                setpendingCompl([])
            }
        };

        getAllPendingCompalints(searchDate)
    }, [searchDate, count, assignFlag]);


    return (
        <Box sx={{ flex: 1, bgcolor: '#E3E7F1', p: .4 }}>
            <Box sx={{ flex: 1, display: 'flex', px: 3, pb: 2.5, justifyContent: 'center', bgcolor: 'white', pt: 4, gap: 3 }}>
                <Badge badgeContent={forverifyLength} color="primary">
                    <Box sx={{ px: 1, display: 'flex', cursor: 'pointer', }} onClick={ForVerrify}>
                        {forVerifycheck === 1 ?
                            <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#0B6BCB' }} />
                            : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                        <Typography sx={{ pl: .5 }}>For Verify</Typography>
                    </Box>
                </Badge>
                <Badge badgeContent={pendingLength} color="warning">
                    <Box sx={{ px: 1, display: 'flex', cursor: 'pointer', }} onClick={AllAssinged}>
                        {assinged === 1 ?
                            <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#9A5B13' }} />
                            : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                        <Typography sx={{ pl: .5 }}>Assinged</Typography>
                    </Box>
                </Badge>
                <Badge badgeContent={holdLength} color="neutral">
                    <Box sx={{ px: 1, display: 'flex', cursor: 'pointer' }} onClick={HoldCheck}>
                        {holdCheck === 1 ?
                            <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#50655B' }} />
                            : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                        <Typography sx={{ pl: .5 }}>On Hold</Typography>
                    </Box>
                </Badge>

                <Box sx={{ px: 1, display: 'flex', cursor: 'pointer' }} onClick={RectifiedCheck}>
                    {rectifiedCheck === 1 ?
                        <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#59981A' }} />
                        : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                    <Typography sx={{ pl: .5 }}>Rectified</Typography>
                </Box>
                <Box sx={{ px: 1, display: 'flex', cursor: 'pointer' }} onClick={VerifiedCheck} >
                    {verifiedCheck === 1 ?
                        <RadioButtonCheckedIcon sx={{ cursor: 'pointer', color: '#3399FF' }} />
                        : <RadioButtonUncheckedIcon sx={{ cursor: 'pointer' }} />}
                    <Typography sx={{ pl: .5 }}>Verified</Typography>
                </Box>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'white', px: .5 }}>
                {rectifiedCheck === 1 ?
                    <Box>
                        <RectifiedInAllList />
                    </Box> :
                    <Box></Box>
                }
                {verifiedCheck === 1 ?
                    <Box>
                        <VerifiedInAllList />
                    </Box> :
                    <Box></Box>
                }
                {holdCheck === 1 ?
                    <Box>
                        <OnholdInAllList onholdCompl={onholdCompl} count={count} setCount={setCount} menurights={menurights} />
                    </Box> :
                    <Box></Box>
                }
                {assinged === 1 ?
                    <Box>
                        <AssingedInAllList pendingCompl={pendingCompl} setassignFlag={setassignFlag} assignFlag={assignFlag} menurights={menurights} />
                    </Box> :
                    <Box></Box>
                }
                {forVerifycheck === 1 ?
                    <Box>
                        <ForVerifySupervisor forVerifyList={forVerifyList} count={count} setCount={setCount} />
                    </Box> :
                    <Box></Box>
                }
            </Box>
        </Box>
    )
}

export default memo(AllTicketsSuperwiser)