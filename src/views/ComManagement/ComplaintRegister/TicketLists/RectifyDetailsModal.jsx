import { Box, Button, Chip, CssVarsProvider, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { axioslogin } from 'src/views/Axios/Axios';
import { differenceInSeconds, format, } from 'date-fns';
import LockClockIcon from '@mui/icons-material/LockClock';


const RectifyDetailsModal = ({ open, setDetailsOpen, detailsData, setDetailsFlag, count }) => {

    const { complaint_slno, complaint_desc, compalint_date, rm_roomtype_name, rm_room_name, rm_insidebuildblock_name, rm_floor_name, complaint_deptslno,
        cm_rectify_status, location, complaint_type_name, priority_check, compalint_priority, assigned_date, rectify_pending_hold_remarks, verify_spervsr_name,
        cm_rectify_time, holduser, verify_spervsr, verified_user_name, cm_verfy_time, suprvsr_verify_time, assinged_employees, } = detailsData

    const [assetDetl, setassetDetl] = useState([])
    const Close = useCallback(() => {
        setDetailsFlag(0)
        setDetailsOpen(false)
    }, [setDetailsOpen, setDetailsFlag])

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

    const formatTimeDifference = (assignedDate, rectifyTime) => {
        const assigned = new Date(assignedDate);
        const rectify = new Date(rectifyTime);
        const diffInSeconds = Math.abs(differenceInSeconds(rectify, assigned));
        const days = Math.floor(diffInSeconds / (24 * 60 * 60));
        const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
        const seconds = diffInSeconds % 60;
        return `${days > 0 ? `${days} day${days > 1 ? 's' : ''}, ` : ''}${hours} hr : ${minutes} min : ${seconds} sec`;
    };

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
                    open={open} >
                    < ModalDialog
                        sx={{
                            width: '65vw',
                            p: 0,
                            overflow: 'auto'
                        }}
                    >       <Box>
                            <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1, }}>
                                <Box sx={{ flex: 1, color: 'grey', }}>
                                    Ticket Verification
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <CancelIcon
                                        sx={{ color: 'darkred', cursor: 'pointer' }}
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

                                        {compalint_date
                                            ? format(new Date(compalint_date), 'dd MMM yyyy,  hh:mm a')
                                            : 'Invalid Date'}
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
                                            < Chip sx={{ bgcolor: '#FBAA60' }}>
                                                Emergency
                                            </Chip>
                                            : compalint_priority === 2 ?
                                                <Chip sx={{ bgcolor: '#FBAA60' }}>
                                                    High priority
                                                </Chip>
                                                : compalint_priority === 3 ?
                                                    <Chip sx={{ bgcolor: '#FBAA60' }}>
                                                        Medium Priority
                                                    </Chip> :
                                                    compalint_priority === 4 ?
                                                        <Chip sx={{ bgcolor: '#FBAA60' }}>
                                                            Normal
                                                        </Chip> :
                                                        null}
                                        {priority_check === 1 ?
                                            <Chip sx={{ bgcolor: '#E43D40', ml: .5 }}>
                                                Critical
                                            </Chip> : <Chip sx={{ bgcolor: '#FBC490' }}>
                                                Medium
                                            </Chip>}
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: 1 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Assigned Employees
                                    </Typography>
                                    <Box sx={{ flex: 3, display: 'flex', gap: .5 }}>

                                        {assinged_employees === null ?
                                            <Chip>
                                                Not Updated
                                            </Chip>
                                            :
                                            <>
                                                {assinged_employees.split(',').map((name, index) => (
                                                    <Chip
                                                        key={index}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: 0.8, marginRight: 0.1 }}
                                                    >
                                                        {name.trim()}
                                                    </Chip>
                                                ))}
                                            </>}
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Assigned Date
                                    </Typography>
                                    <Box sx={{ flex: 3, gap: .5 }}>
                                        <Chip sx={{ bgcolor: '#E3E7F1' }}>

                                            {assigned_date
                                                ? format(new Date(assigned_date), 'dd MMM yyyy,  hh:mm a')
                                                : 'Invalid Date'}
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
                                            {cm_rectify_time
                                                ? format(new Date(cm_rectify_time), 'dd MMM yyyy,  hh:mm a')
                                                : 'Invalid Date'}
                                        </Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                    <Typography sx={{ flex: 1.8, pl: 3, fontWeight: 500, fontSize: 15 }}>
                                        Complaint Rectification Duration
                                    </Typography>
                                    <Tooltip title='Time taken to Rectify complaint (Assigned time to Rectified time)' placement='bottom' sx={{ width: 180 }}>
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
                                        <Typography sx={{ fontWeight: 600, color: '#0B6BCB' }}> Deptarment Verified Details</Typography>
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

                                                    {suprvsr_verify_time
                                                        ? format(new Date(suprvsr_verify_time), 'dd MMM yyyy,  hh:mm a')
                                                        : 'Invalid Date'}
                                                </Chip>
                                            </Box>

                                        </Box>
                                    </Box> : verify_spervsr === 0 ?
                                        <Box sx={{ pl: 3, pt: 2, }}>
                                            <Typography sx={{ fontWeight: 600, color: '#0B6BCB' }}> Deptarment Verified Details</Typography>
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
                                        </Box> : null}

                                {cm_rectify_status === "V" ?
                                    <Box sx={{ pl: 3, pt: 2, }}>
                                        <Typography sx={{ fontWeight: 600, color: '#0B6BCB' }}> User Verified Details</Typography>
                                        <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                            <Typography sx={{ flex: 1.8, fontWeight: 500, fontSize: 15 }}>
                                                Verified By
                                            </Typography>
                                            <Box sx={{ flex: 3, pl: .3 }}>
                                                <Chip sx={{ bgcolor: '#E2C9DD' }}>
                                                    {verified_user_name}
                                                </Chip>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex', mt: .5 }}>
                                            <Typography sx={{ flex: 1.8, fontWeight: 500, fontSize: 15 }}>
                                                Verified Date and Time
                                            </Typography>
                                            <Box sx={{ flex: 3, pl: .3 }}>
                                                <Chip sx={{ bgcolor: '#E3E8E9' }}>
                                                    {cm_verfy_time
                                                        ? format(new Date(cm_verfy_time), 'dd MMM yyyy,  hh:mm a')
                                                        : 'Invalid Date'}
                                                </Chip>
                                            </Box>

                                        </Box>
                                    </Box> : null}
                            </Box>
                            <Box sx={{ textAlign: 'right', pb: 3, mr: 1 }}>
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

export default memo(RectifyDetailsModal)