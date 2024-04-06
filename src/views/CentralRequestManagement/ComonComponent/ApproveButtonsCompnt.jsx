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
        now_who, now_who_status, emergency_flag, } = val

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
            height: 40, backgroundColor: now_who_status === 3 ? "#c9b661" :
                now_who_status === 2 ? '#db6775' :
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

                    {/* <svg fill="#EEE2DE"
                        version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-3.2 -3.2 38.40 38.40" xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-3.2" y="-3.2" width="38.40"
                            height="38.40" rx="19.2" fill="#2B2A4C" strokewidth="0"></rect></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <path id="medical_1_" d="M16,31.36c-0.199,0-0.36-0.161-0.36-0.36v-8c0-0.199,0.161-0.36,0.36-0.36s0.36,0.161,0.36,0.36v8 C16.36,31.199,16.199,31.36,16,31.36z M14.382,27.186c-0.047,0-0.095-0.01-0.141-0.029c-0.999-0.427-1.697-1.533-1.697-2.692 c0-1.22,0.518-2.151,1.631-2.932c0.164-0.113,0.387-0.074,0.501,0.088c0.114,0.163,0.075,0.388-0.088,0.502 c-0.928,0.65-1.325,1.352-1.325,2.342c0,0.879,0.518,1.714,1.259,2.03c0.183,0.078,0.268,0.289,0.19,0.473 C14.655,27.104,14.522,27.186,14.382,27.186z M17.617,27.186c-0.108,0-0.216-0.05-0.287-0.143c-0.12-0.158-0.089-0.385,0.069-0.505 c0.924-0.7,1.335-1.204,1.335-2.335c0-1.4-1.379-2.346-2.839-3.346c-1.642-1.125-3.339-2.288-3.339-4.272 c0-1.106,0.649-2.115,1.654-2.57c0.181-0.08,0.395-0.001,0.477,0.18s0.001,0.395-0.18,0.477c-0.748,0.338-1.231,1.089-1.231,1.914 c0,1.604,1.47,2.612,3.026,3.679c1.55,1.062,3.153,2.159,3.153,3.939c0,1.412-0.569,2.111-1.62,2.909 C17.77,27.161,17.693,27.186,17.617,27.186z M17.617,19.845c-0.108,0-0.216-0.05-0.287-0.143c-0.12-0.159-0.089-0.385,0.069-0.505 c0.924-0.699,1.335-1.202,1.335-2.334c0-1.25-1.1-2.138-2.375-3.025v4.164c0,0.199-0.161,0.36-0.36,0.36s-0.36-0.161-0.36-0.36 v-4.659c-1.558-1.072-3.084-2.215-3.084-4.097c0-1.107,0.649-2.116,1.654-2.57c0.181-0.08,0.395-0.001,0.477,0.18 s0.001,0.395-0.18,0.477c-0.748,0.338-1.231,1.089-1.231,1.914c0,1.374,1.078,2.31,2.364,3.22V5.333c-1.131-0.174-2-1.154-2-2.333 c0-1.301,1.059-2.36,2.36-2.36c1.302,0,2.36,1.059,2.36,2.36c0,1.179-0.869,2.159-2,2.333v7.63c1.532,1.049,3.095,2.142,3.095,3.9 c0,1.413-0.569,2.113-1.62,2.909C17.77,19.82,17.693,19.845,17.617,19.845z M16,4.639c0.01,0,0.02,0,0.03,0.001 c0.89-0.016,1.61-0.745,1.61-1.64c0-0.904-0.735-1.64-1.64-1.64S14.36,2.096,14.36,3c0,0.895,0.72,1.624,1.61,1.64 C15.98,4.639,15.99,4.639,16,4.639z M19,13.36c-0.135,0-0.265-0.076-0.325-0.207c-0.085-0.18-0.008-0.394,0.172-0.479 c1.041-0.491,1.888-1.88,1.888-3.098c0-1.894,1.059-2.936,2.979-2.936H30c0.199,0,0.36,0.161,0.36,0.36S30.199,7.36,30,7.36h-6.286 c-1.178,0-1.875,0.411-2.138,1.28H28c0.199,0,0.36,0.161,0.36,0.36S28.199,9.36,28,9.36h-6.54c-0.004,0.07-0.005,0.142-0.005,0.216 c0,0.334-0.057,0.698-0.164,1.065h4.688c0.199,0,0.36,0.161,0.36,0.36s-0.161,0.36-0.36,0.36h-4.963 c-0.392,0.819-1.03,1.572-1.862,1.964C19.104,13.349,19.052,13.36,19,13.36z M13,13.36c-0.052,0-0.104-0.011-0.153-0.034 c-0.832-0.392-1.47-1.145-1.861-1.964H6c-0.199,0-0.36-0.161-0.36-0.36s0.161-0.36,0.36-0.36h4.71 c-0.107-0.368-0.163-0.731-0.163-1.065c0-0.074-0.002-0.146-0.005-0.216H4C3.801,9.36,3.64,9.199,3.64,9S3.801,8.64,4,8.64h6.426 c-0.263-0.869-0.96-1.28-2.138-1.28H2C1.801,7.36,1.64,7.199,1.64,7S1.801,6.64,2,6.64h6.288c1.684,0,2.704,0.801,2.931,2.273 c0.005,0.023,0.009,0.046,0.01,0.071c0.025,0.187,0.038,0.384,0.038,0.592c0,1.218,0.846,2.608,1.886,3.098 c0.18,0.085,0.257,0.299,0.172,0.479C13.264,13.284,13.135,13.36,13,13.36z M17.617,12.361c-0.113,0-0.225-0.053-0.295-0.153 c-0.114-0.163-0.074-0.387,0.088-0.501c0.929-0.651,1.324-1.352,1.324-2.342c0-0.879-0.518-1.713-1.259-2.03 c-0.183-0.078-0.268-0.29-0.189-0.472c0.078-0.183,0.291-0.268,0.473-0.19c0.998,0.426,1.696,1.533,1.696,2.692 c0,1.22-0.519,2.151-1.631,2.932C17.761,12.34,17.688,12.361,17.617,12.361z">
                        </path> <rect id="_Transparent_Rectangle" style="fill:none;" width="32" height="32"></rect> </g></svg> */}

                    <Box sx={{ mx: 0.5 }}>
                        <ButtonGroup
                            size='sm'
                            color="warning"
                            variant="outlined"
                        >
                            <Button variant='solid' color='primary' >status</Button>
                            <Button
                                startDecorator={<Typography color="primary" sx={{
                                    fontSize: 15, pl: 2, pr: 2,
                                    color: now_who_status === 3 ? 'white' : now_who_status === 2 ? 'white' : null
                                }}>{now_who}</Typography>}
                                endDecorator={<Typography
                                    color="primary"
                                    sx={{
                                        fontSize: 15, pl: 2, pr: 2,
                                        color: now_who_status === 3 ? 'white' : now_who_status === 2 ? 'white' : null
                                    }}>
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
                                <AttachFileIcon fontSize='small' />
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