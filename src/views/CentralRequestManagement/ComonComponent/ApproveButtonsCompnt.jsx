import { Box } from '@mui/material'
import React, { useCallback, memo } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import { useState } from 'react';

const ApproveButtonsCompnt = ({ setApprovalFlag, setApprovalModal, setCancelFlag, setCancelModal,
    setApprovalData, setCancelData, val }) => {
    const [crfStat, setCrfStatus] = useState(0)

    const { higher, crf_close } = val
    const Approvalfctn = useCallback(() => {
        setApprovalFlag(1)
        setApprovalModal(true)
        setApprovalData(val)
    }, [setApprovalFlag, setApprovalModal, val, setApprovalData])

    const CloseFnctn = useCallback(() => {
        setCancelFlag(1)
        setCancelModal(true)
        setCancelData(val)
    }, [setCancelFlag, setCancelModal])

    const approveComp = (val) => {
        return val === 0 ? <Tooltip title="Approved" arrow color="success" size="sm" variant="solid" placement="top"><ThumbUpAltOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
            : val === 1 ? <Tooltip title="Not Approved" arrow color="danger" size="sm" variant="solid" placement="top"><ThumbDownOffAltOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
                : val === 2 ? <Tooltip title="On Hold" arrow color='warning' size="sm" variant="solid" placement="top"><BackHandOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
                    : <Tooltip title="Pending" arrow color="neutral" size="sm" variant="solid" placement="top"><PauseCircleOutlineOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
    }

    return (
        <Box sx={{
            height: 40, backgroundColor: "#f0f3f5",
            display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5, justifyContent: 'space-between'
        }}>
            <Box sx={{ display: 'flex', }} >
                <Box>
                    {
                        higher === 1 ?
                            <Box sx={{ pl: 2, }}>
                                <CusIconButton size="sm" variant="outlined"   >
                                    <SaveAsIcon fontSize='small' sx={{ ml: 1 }} />
                                    <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Views</Typography>
                                </CusIconButton>
                            </Box>
                            :
                            // <CustomeToolTip title="Approval" placement="left" >
                            <Box sx={{ pl: 2, }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={Approvalfctn}  >
                                    <SaveAsIcon fontSize='small' sx={{ ml: 1 }} />
                                    <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 2 }}>Approval</Typography>
                                </CusIconButton>
                            </Box>
                        // </CustomeToolTip>

                    }
                </Box>
                <Box>
                    <CustomeToolTip title="Close" placement="left" >
                        <Box sx={{ pl: 1.5 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={CloseFnctn} >
                                <SubtitlesOffIcon fontSize='small' sx={{ ml: 1 }} />
                                <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Close</Typography>
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', mr: 1 }} >
                <CssVarsProvider>
                    <Box sx={{ mx: 0.5 }}>
                        <ButtonGroup
                            size='sm'
                            color="warning"
                            variant="outlined"
                        >
                            <Button variant='solid' color='primary' >status</Button>
                            <Button
                                startDecorator={<Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>HOD</Typography>}
                                endDecorator={<Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>dsafsdasds</Typography>}
                            />
                            <Button variant='solid'
                                color={crfStat === 0 ? 'success' : crfStat === 1 ? 'danger' : crfStat === 2 ? 'primary' : crfStat === 3 ? 'warning' : 'neutral'}
                            >
                                {approveComp(0)}
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <Box sx={{ mx: 0.5 }}>
                        <Button
                            color="primary"
                            onClick={function () { }}
                            size="sm"
                            variant="outlined"
                        ><AttachFileIcon /></Button>
                    </Box>
                    <Box sx={{ mx: 0.5 }}>
                        <Button
                            color="danger"
                            onClick={function () { }}
                            size="sm"
                            variant="outlined"
                            startDecorator={<Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>InCharge</Typography>}
                            endDecorator={<ThumbUpOffAltIcon />}
                        >Closed CRF</Button>
                    </Box>
                    <Box sx={{ mx: 0.5 }}>
                        <Button
                            color="success"
                            onClick={function () { }}
                            size="sm"
                            variant="outlined"
                            endDecorator={<ThumbUpOffAltIcon />}
                        >Approved CRF</Button>
                    </Box>
                </CssVarsProvider>
            </Box>

        </Box>
    )
}

export default memo(ApproveButtonsCompnt)