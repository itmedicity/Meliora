import { Box } from '@mui/material'
import React, { useCallback, memo, } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ButtonGroup from '@mui/joy/ButtonGroup';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import DescriptionIcon from '@mui/icons-material/Description';


const ApproveButtonsCompnt = ({ setApprovalFlag, setApprovalModal, setCancelFlag, setCancelModal,
    setApprovalData, setCancelData, val, setDetailViewFlag, setDetailViewData, setDetailViewModal,
    setImageShowFlag, setImageShow, setImageSlno }) => {

    const { higher, crf_close, image_status, crf_closed_one, ed_approve, md_approve,
        now_who, now_who_status, emergency_flag } = val
    const Approvalfctn = useCallback(() => {
        setApprovalFlag(1)
        setApprovalModal(true)
        setApprovalData(val)
    }, [setApprovalFlag, setApprovalModal, val, setApprovalData])

    const CloseFnctn = useCallback(() => {
        setCancelFlag(1)
        setCancelModal(true)
        setCancelData(val)
    }, [setCancelFlag, setCancelModal, setCancelData, val])

    const DataViewfnctn = useCallback(() => {
        setDetailViewFlag(1)
        setDetailViewData(val)
        setDetailViewModal(true)
    }, [setDetailViewFlag, setDetailViewData, val, setDetailViewModal])


    const approveComp = (val) => {
        return val === 1 ? <Tooltip title="Approved" arrow color="success" size="sm" variant="solid" placement="top"><ThumbUpAltOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
            : val === 2 ? <Tooltip title="Reject" arrow color="danger" size="sm" variant="solid" placement="top"><ThumbDownOffAltOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
                : val === 3 ? <Tooltip title="On Hold" arrow color='warning' size="sm" variant="solid" placement="top"><PauseCircleOutlineOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
                    : <Tooltip title="Pending" arrow color="neutral" size="sm" variant="solid" placement="top">< BackHandOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
    }

    const ViewImage = useCallback(() => {
        const { req_slno } = val
        setImageShowFlag(1)
        setImageShow(true)
        setImageSlno(req_slno)
    }, [val, setImageShowFlag, setImageShow, setImageSlno])


    return (
        <Box sx={{
            height: 40, backgroundColor:
                emergency_flag === 1 && md_approve !== 1 && ed_approve !== 1 ? "#edd8e0" :
                    md_approve === 1 && ed_approve === 1 ? "#e6edd8" :
                        "#f0f3f5",
            display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5, justifyContent: 'space-between'
        }}>
            {/* {imageshowFlag === 1 ? <ReqImageDisModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null} */}
            < Box sx={{ display: 'flex', }} >
                <Box>
                    {
                        higher === 1 ?
                            <Box sx={{ pl: 2, }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={DataViewfnctn}  >
                                    <DescriptionIcon fontSize='small' sx={{ ml: 1 }} />
                                    <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 2 }}>View</Typography>
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
                    {
                        higher === 1 ?
                            null
                            :
                            <CustomeToolTip title="Close" placement="left" >
                                <Box sx={{ pl: 1.5 }}>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={CloseFnctn} >
                                        <SubtitlesOffIcon fontSize='small' sx={{ ml: 1 }} />
                                        <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Close</Typography>
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>

                    }

                </Box>
            </Box >

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
                                startDecorator={<Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>{now_who}</Typography>}
                                endDecorator={<Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>
                                    {now_who_status === 1 ? "Approved" : now_who_status === 2 ? "Rejected" :
                                        now_who_status === 3 ? "On-Hold" : now_who_status === 4 ? "Received" : ""
                                    }</Typography>}
                            />
                            <Button variant='solid'
                                color={now_who_status === 1 ? 'success' : now_who_status === 2 ? 'danger' :
                                    now_who_status === 3 ? 'warning' : 'neutral'}
                            >
                                {approveComp(now_who_status)}
                            </Button>
                        </ButtonGroup>
                    </Box>
                    {image_status === 1 ?
                        <Box sx={{ mx: 0.5 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewImage}  >
                                <AttachFileIcon fontSize='small' sx={{ ml: 1 }} />
                            </CusIconButton>
                        </Box> : null
                    }
                    {
                        crf_close === 1 ?
                            <Box sx={{ mx: 0.5 }}>
                                <Button
                                    color="danger"
                                    //  onClick={function () { }}
                                    size="sm"
                                    variant="outlined"
                                    startDecorator={<Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>{crf_closed_one}</Typography>}
                                    endDecorator={<ThumbUpOffAltIcon />}
                                >Closed CRF</Button>
                            </Box> : null

                    }
                    {ed_approve === 1 && md_approve === 1 ?
                        <Box sx={{ mx: 0.5 }}>
                            <Button
                                color="success"
                                //  onClick={function () { }}
                                size="sm"
                                variant="outlined"
                                endDecorator={<ThumbUpOffAltIcon />}
                            >Approved CRF</Button>
                        </Box> : null

                    }

                </CssVarsProvider>
            </Box >

        </Box >
    )
}

export default memo(ApproveButtonsCompnt)