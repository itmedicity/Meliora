import { Box } from '@mui/material'
import React, { useCallback, memo } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { axioslogin } from 'src/views/Axios/Axios'
import { CrfPdfWithOutDetails } from '../CrfPdfView/CrfPdfWithOutDetails';
import { CrfPdfWithDetails } from '../CrfPdfView/CrfPdfWithDetail';
import { Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy';
import ButtonGroup from '@mui/joy/ButtonGroup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import { SiAdobeacrobatreader } from "react-icons/si";

const PurchaseApprovalButton = ({ val, setpuchaseFlag, setpuchaseModal, setpuchaseData, setImageShowFlag,
    setImageShow, setImageSlno }) => {
    const { ack_status, image_status, now_who, now_who_status } = val
    const ModalOpenfctn = useCallback(() => {
        setpuchaseFlag(1)
        setpuchaseModal(true)
        setpuchaseData(val)
    }, [val, setpuchaseFlag, setpuchaseModal, setpuchaseData])


    const PdfDownloadFctn = useCallback(() => {
        const { req_slno } = val
        const ItemDetailsGet = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            return result.data
        }

        const ItemDetailsApproved = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/getFinalItemListApproval/${req_slno}`)
            return result.data
        }

        ItemDetailsGet(req_slno).then((values) => {
            const { success, data } = values
            if (success === 1) {
                ItemDetailsApproved(req_slno).then((value) => {
                    const { succes, dataa } = value
                    if (succes === 1) {
                        CrfPdfWithDetails(val, data, dataa)
                    }
                    else {
                        const dataa = []
                        CrfPdfWithDetails(val, data, dataa)
                    }
                })
            }
            else if (success === 0) {
                CrfPdfWithOutDetails(val)
            }
            else {
                CrfPdfWithOutDetails(val)
            }
        })

    }, [val])


    const ViewImage = useCallback(() => {
        const { req_slno } = val
        setImageShowFlag(1)
        setImageShow(true)
        setImageSlno(req_slno)
    }, [val, setImageShowFlag, setImageShow, setImageSlno])

    const approveComp = (val) => {
        return val === 1 ? <Tooltip title="Approved" arrow color="success" size="sm" variant="solid" placement="top"><ThumbUpAltOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
            : val === 2 ? <Tooltip title="Reject" arrow color="danger" size="sm" variant="solid" placement="top"><ThumbDownOffAltOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
                : val === 3 ? <Tooltip title="On Hold" arrow color='warning' size="sm" variant="solid" placement="top"><PauseCircleOutlineOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
                    : <Tooltip title="Pending" arrow color="neutral" size="sm" variant="solid" placement="top">< BackHandOutlinedIcon sx={{ color: 'white' }} /></Tooltip>
    }

    return (

        <Box sx={{
            height: 40, backgroundColor:
                "#f0f3f5",
            display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5, justifyContent: 'space-between'
        }}>
            < Box sx={{ display: 'flex', }} >
                <Box>
                    <Box sx={{ pl: 2, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ModalOpenfctn}  >
                            <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                            <SaveAsIcon fontSize='small' />
                            <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Process</Typography>
                        </CusIconButton>
                    </Box>
                </Box>
                {ack_status === 1 ?
                    <Box sx={{ pl: 2, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={PdfDownloadFctn}  >
                            <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                            <SiAdobeacrobatreader fontSize='large' />
                            <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>View</Typography>
                        </CusIconButton>
                    </Box> : null
                }

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
                                        now_who_status === 3 ? "On-Hold" : ""
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
                </CssVarsProvider>
            </Box >
        </Box >
    )
}

export default memo(PurchaseApprovalButton)