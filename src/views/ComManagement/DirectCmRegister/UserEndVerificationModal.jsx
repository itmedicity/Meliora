import { Box, Button, Checkbox, Chip, CssVarsProvider, Modal, ModalDialog, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { axioslogin } from 'src/views/Axios/Axios';
import { differenceInSeconds, format } from 'date-fns';
import LockClockIcon from '@mui/icons-material/LockClock';
import { useSelector } from 'react-redux';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';

const UserEndVerificationModal = ({ open, setverifyOpen, forVerifyData, setverifyFlag, count, setcount }) => {
    const { complaint_slno, complaint_desc, compalint_date, rm_roomtype_name, rm_room_name, rm_insidebuildblock_name, rm_floor_name, compalint_status, complaint_deptslno,
        location, complaint_type_name, priority_check, compalint_priority, assigned_date, rectify_pending_hold_remarks, cm_rectify_time, holduser,
        verify_spervsr_name, verify_spervsr, suprvsr_verify_time } = forVerifyData


    const empid = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [empName, setempname] = useState([])
    const [verify, setVerify] = useState(false);
    const [notrectify, setNotrectify,] = useState(false);
    const [flag, setFlag] = useState(0)
    const [messagee, setMessage] = useState('');
    const [assetDetl, setassetDetl] = useState([])


    const Close = useCallback(() => {
        setverifyFlag(0)
        setverifyOpen(false)
        setempname([])
        setVerify(false)
        setNotrectify(false)
        setFlag(0)
        setMessage('')
    }, [setverifyOpen, setverifyFlag, setempname, setVerify, setNotrectify, setFlag, setMessage])

    const updateVerify = (e) => {
        if (e.target.checked === true) {
            setVerify(true)
            setNotrectify(false)
            setFlag(0)
        } else {
            setFlag(0)
            setVerify(false)
        }
    }

    const updateNotrectify = (e) => {
        if (e.target.checked === true) {
            setNotrectify(true)
            setVerify(false)
            setFlag(1)
        } else {
            setFlag(0)
            setNotrectify(false)
        }
    }

    useEffect(() => {
        const getEmployeees = async () => {
            const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setempname(data)
            }
            else {
                setempname([])
            }
        }
        getEmployeees();
    }, [complaint_slno])

    useEffect(() => {
        const getAssetinComplaint = async (complaint_slno) => {
            const result = await axioslogin.get(`/complaintreg/getAssetinComplaint/${complaint_slno}`);
            const { success, data } = result.data;
            if (success === 2) {
                setassetDetl(data)
            }
            else {
                setassetDetl([])
            }
        }
        getAssetinComplaint(complaint_slno)
    }, [complaint_slno, count])

    const updateMessage = useCallback((e) => {
        setMessage(e.target.value)
    }, [setMessage])

    const formatTimeDifference = (assignedDate, rectifyTime) => {
        const assigned = new Date(assignedDate);
        const rectify = new Date(rectifyTime);
        // Calculate the difference
        const diffInSeconds = Math.abs(differenceInSeconds(rectify, assigned));
        const days = Math.floor(diffInSeconds / (24 * 60 * 60));
        const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
        const seconds = diffInSeconds % 60;

        return `${days > 0 ? `${days} day${days > 1 ? 's' : ''}, ` : ''}${hours} hr : ${minutes} min : ${seconds} sec`;
    };

    const verifyData = useMemo(() => {
        return {
            compalint_status: verify === true ? 3 : notrectify === true ? 0 : compalint_status,
            cm_verfy_time: verify === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            cm_rectify_status: notrectify === true ? 'Z' : verify === true ? 'V' : null,
            verify_remarks: notrectify === true ? messagee : null,
            cm_not_verify_time: notrectify === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            verified_user: empid,
            complaint_slno: complaint_slno
        }
    }, [verify, notrectify, messagee, complaint_slno, compalint_status, empid])

    // updating function to db
    const Submit = useCallback((e) => {
        e.preventDefault();
        const verified = async (verifyData) => {
            const result = await axioslogin.patch('/Rectifycomplit/update/verify', verifyData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setcount(count + 1)
                Close();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (verify === true || notrectify === true) {
            verified(verifyData);
        } else {
            infoNotify("Please Choose Any")
        }
    }, [verifyData, verify, notrectify, setcount, count, Close])


    const buttonStyle = {
        fontSize: 16,
        color: '#523A28',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#523A28',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }

    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    open={open}
                >
                    < ModalDialog
                        sx={{
                            width: '55vw',
                            p: 0,
                            overflow: 'auto'
                        }}
                    >
                        <Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1, }}>
                                <Box sx={{ flex: 1, color: 'grey', }}>
                                    Ticket Verification
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }}
                                        onClick={Close}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: .5 }}>
                                <Box sx={{ flex: 1, pl: .5 }}>
                                    <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', }}>Ticket No.{complaint_slno}</Typography>
                                    <Typography sx={{ pl: .5, fontSize: 14, color: 'Black', }}>
                                        {complaint_desc}
                                    </Typography>
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', py: .5 }}>
                                        Complaint Type: {complaint_type_name}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: 'right', pr: 1.5 }}>
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                        {location}
                                    </Typography>
                                    {rm_room_name !== null ?
                                        <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                            {rm_room_name}
                                            {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name ?
                                                ` (${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''}${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${(rm_insidebuildblock_name && rm_floor_name) ? ' - ' : ''}${rm_floor_name ? rm_floor_name : ''})`
                                                : "Not Updated"}
                                        </Typography> : null}
                                    <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                        {compalint_date}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pb: 3, pt: 2 }}>

                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Complaint To
                                    </Typography>
                                    <Typography sx={{ flex: 3, gap: .5, fontWeight: 500 }}>
                                        {complaint_deptslno === 1 ? 'BioMedical' : complaint_deptslno === 2 ? "Maintenance" :
                                            complaint_deptslno === 3 ? 'Information Technology' : complaint_deptslno === 4 ? 'houseKeeping' :
                                                complaint_deptslno === 5 ? "Operations" : null}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15, pt: .5 }}>
                                        Priority
                                    </Typography>

                                    <Box sx={{ flex: 3, }}>

                                        {compalint_priority === 1 ?
                                            < Chip sx={{ bgcolor: '#FBAA60', mr: .5 }}>
                                                Level 1
                                            </Chip>
                                            : compalint_priority === 2 ?
                                                <Chip sx={{ bgcolor: '#FBAA60', mr: .5 }}>
                                                    Level 2
                                                </Chip>
                                                : compalint_priority === 3 ?
                                                    <Chip sx={{ bgcolor: '#FBAA60', mr: .5 }}>
                                                        Level 3
                                                    </Chip> :
                                                    null}
                                        {priority_check === 1 ?
                                            <Chip sx={{ bgcolor: '#E43D40', }}>
                                                Critical
                                            </Chip> : <Chip sx={{ bgcolor: '#FBC490' }}>
                                                Medium
                                            </Chip>}


                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: 1 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Assinged Employees
                                    </Typography>
                                    <Box sx={{ flex: 3, display: 'flex', gap: .5 }}>
                                        {empName?.map((val, index) => {
                                            return (
                                                <Chip
                                                    key={index}
                                                    size="sm"
                                                    variant="outlined"
                                                    sx={{ bgcolor: '#D3C7A1' }}>
                                                    {val.em_name}
                                                </Chip>
                                            )
                                        })}
                                    </Box>
                                </Box>

                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Assinged Date
                                    </Typography>
                                    <Box sx={{ flex: 3, gap: .5 }}>
                                        <Chip sx={{ bgcolor: '#E3E7F1' }}>
                                            {assigned_date}
                                        </Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Rectified Remark
                                    </Typography>
                                    <Typography sx={{ flex: 3, gap: .5 }}>
                                        {rectify_pending_hold_remarks}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Rectified Date and Time
                                    </Typography>
                                    <Box sx={{ flex: 3, gap: .5 }}>
                                        <Chip sx={{ bgcolor: '#C3E0E5' }}>
                                            {cm_rectify_time}
                                        </Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Complaint Rectification Duration
                                    </Typography>
                                    <Tooltip title='Time taken to Rectify complaint (Assinged time to Rectified time)' placement='bottom' sx={{ width: 180 }}>
                                        <Box sx={{ flex: 3, gap: .5, color: '#05445E', cursor: 'pointer' }}>
                                            <LockClockIcon sx={{ color: '#05445E', borderRadius: 1, pb: .4 }} />
                                            {formatTimeDifference(assigned_date, cm_rectify_time)}
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Rectified By
                                    </Typography>
                                    <Box sx={{ flex: 3, gap: .5 }}>
                                        <Chip sx={{ bgcolor: '#ADC9C5' }}>
                                            {holduser}
                                        </Chip>
                                    </Box>
                                </Box>

                                {assetDetl.length !== 0 ?
                                    < Box sx={{ py: 2, }}>
                                        <Typography sx={{ fontWeight: 600, color: '#0B6BCB', pl: 3, }}> Asset Detail</Typography>
                                        {assetDetl.map((val, index) => {
                                            const formattedSlno = val.am_item_map_slno.toString().padStart(6, '0');
                                            return (
                                                <Box key={index} sx={{ flex: 1, display: 'flex', pt: .8 }}>
                                                    <Box sx={{ textAlign: 'center', fontSize: 13, pl: 3, pr: 2, fontWeight: 700, pt: .3 }}>{index + 1}</Box>
                                                    <Chip sx={{ fontSize: 13, bgcolor: '#dad5ed' }}>{val.item_asset_no}/{formattedSlno}</Chip>
                                                    <Chip sx={{ fontSize: 13, ml: 1, bgcolor: '#dad5ed' }}>{val.item_name}</Chip>
                                                </Box>
                                            );
                                        })}
                                    </Box> : null}


                                {verify_spervsr === 1 ?
                                    <Box sx={{ pl: 3, pt: 2, }}>
                                        <Typography sx={{ fontWeight: 600, color: '#0B6BCB' }}> Supervisor Verified Details</Typography>
                                        <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                            <Typography sx={{ flex: 1.8, fontWeight: 500, fontSize: 15 }}>
                                                Verified By
                                            </Typography>
                                            <Box sx={{ flex: 3, pl: .3 }}>
                                                <Chip sx={{ bgcolor: '#DDCAFD' }}>
                                                    {verify_spervsr_name}
                                                </Chip>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                            <Typography sx={{ flex: 1.8, fontWeight: 500, fontSize: 15 }}>
                                                Verified Date and Time
                                            </Typography>
                                            <Box sx={{ flex: 3, pl: .3 }}>
                                                <Chip sx={{ bgcolor: '#E2DFFD' }}>
                                                    {suprvsr_verify_time}
                                                </Chip>
                                            </Box>

                                        </Box>
                                    </Box> : verify_spervsr === 0 ?
                                        <Box sx={{ pl: 3, pt: 2, }}>
                                            <Typography sx={{ fontWeight: 600, color: '#0B6BCB' }}> Supervisor Verified Details</Typography>
                                            <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                                <Typography sx={{ flex: 1.8, fontWeight: 500, fontSize: 15 }}>
                                                    Verified Status
                                                </Typography>
                                                <Box sx={{ flex: 3, pl: .3 }}>
                                                    <Chip sx={{ bgcolor: '#EECAC9' }}>
                                                        Pending
                                                    </Chip>
                                                </Box>
                                            </Box>
                                        </Box> : null
                                }

                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: 3.5, gap: 2.5 }}>
                                    <Checkbox
                                        label="Verified"
                                        color="primary"
                                        name="verify"
                                        checked={verify}
                                        onChange={updateVerify}
                                    />
                                    <Checkbox
                                        label="Not Verified"
                                        color="danger"
                                        value="notrectify"
                                        checked={notrectify}
                                        onChange={updateNotrectify}
                                    />
                                </Box>
                                {flag === 1 ?
                                    <Textarea
                                        minRows={2}
                                        placeholder='Remarks...'
                                        sx={{ mt: 1, mx: 2 }}
                                        name='messagee'
                                        value={messagee}
                                        onChange={updateMessage} /> : null}
                            </Box>
                            <Box sx={{ textAlign: 'right', pb: 3, mr: 1 }}>
                                <Button
                                    variant='plain'
                                    sx={buttonStyle}
                                    onClick={Submit}
                                >Save</Button>
                                <Button
                                    variant='plain'
                                    sx={buttonStyle}
                                    onClick={Close}
                                >Cancel</Button>
                            </Box>

                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(UserEndVerificationModal)