import React, { useCallback, memo, Fragment } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { CssVarsProvider, Tooltip, Typography, Box, IconButton } from '@mui/joy';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import { SiAdobeacrobatreader } from "react-icons/si";
import { CrfPdfWithDetails } from '../../CrfPdfView/CrfPdfWithDetail';
import { CrfPdfWithOutDetails } from '../../CrfPdfView/CrfPdfWithOutDetails';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { keyframes } from '@mui/system';
import { Button } from '@mui/material';
import CountdownTimer from './CountdownTimer';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PurchaseApprovalButtonCmp = ({ val, setpuchaseFlag, setpuchaseModal, setpuchaseData, setImageShowFlag,
    setImageShow, setImageSlno }) => {

    const { ack_status, image_status, now_who, now_who_status, expected_date } = val
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
        return val === 1 ?
            <CssVarsProvider>
                <Tooltip title="Approved" arrow color="success" size="sm" variant="solid" placement="top">
                    <ThumbUpAltOutlinedIcon sx={{ color: 'white', height: 18, width: 18, }} /></Tooltip>
            </CssVarsProvider>
            : val === 2 ?
                <CssVarsProvider>
                    <Tooltip title="Reject" arrow color="danger" size="sm" variant="solid" placement="top">
                        <ThumbDownOffAltOutlinedIcon sx={{ color: 'white', height: 18, width: 18, }} /></Tooltip>
                </CssVarsProvider>
                : val === 3 ?
                    <CssVarsProvider>
                        <Tooltip title="On Hold" arrow color='warning' size="sm" variant="solid" placement="top">
                            <PauseCircleOutlineOutlinedIcon sx={{ color: 'white', height: 18, width: 18, }} /></Tooltip>
                    </CssVarsProvider>
                    : <CssVarsProvider>
                        <Tooltip title="Pending" arrow color="neutral" size="sm" variant="solid" placement="top">
                            < BackHandOutlinedIcon sx={{ color: 'white', height: 18, width: 18, }} /></Tooltip>
                    </CssVarsProvider>
    }
    const buttonstyle = {
        // textTransform: 'capitalize',
        px: 2,
        fontSize: 12,
        height: '30px',
        minHeight: '30px',
        lineHeight: '1.2',
        color: '#01579b',
        bgcolor: 'white',
        '&:hover': {
            bgcolor: '#F0F4F8',
        },
        borderRadius: 1,
    }
    return (
        <Fragment>
            <Box sx={{
                display: 'flex', flex: 1, bgcolor: '#e3f2fd', height: 40, borderRadius: 2, borderTopLeftRadius: 0,
                borderTopRightRadius: 0, justifyContent: 'space-between'
            }}>
                <Box sx={{ display: 'flex', }} >
                    <Box sx={{ pl: 2, pt: 0.6 }}>
                        <Button
                            variant="contained"
                            startIcon={
                                <AutoModeIcon
                                    sx={{
                                        height: 18,
                                        width: 18,
                                        color: '#0277bd',
                                        animation: `${rotate} 2s linear infinite`
                                    }}
                                />
                            }
                            sx={buttonstyle}
                            onClick={ModalOpenfctn}
                        >
                            Process
                        </Button>
                    </Box>
                    {ack_status === 1 ?
                        <Box sx={{ pl: 0.5, pt: 0.6 }}>
                            <Button
                                variant="contained"
                                startIcon={
                                    <SiAdobeacrobatreader
                                        sx={{
                                            height: 18,
                                            width: 18,
                                            color: '#0277bd',
                                            marginRight: '8px',
                                        }}
                                    />
                                }
                                sx={buttonstyle}
                                onClick={PdfDownloadFctn}
                            >
                                View
                            </Button>
                        </Box>
                        : null
                    }
                </Box>
                <Box sx={{ display: 'flex', }} >
                    <Box sx={{ pl: 2, pt: 0.6 }}>
                        <CountdownTimer endDate={expected_date} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', pt: 0.6, pr: 2 }} >
                    <Button variant="plain"
                        sx={{
                            px: 1, height: '30px', minHeight: '30px', lineHeight: '1.2',
                            bgcolor: 'white', borderRadius: 1,
                            '&:hover': {
                                bgcolor: 'white'
                            },
                        }}>
                        <Typography sx={{ fontSize: 13, pl: 2, pr: 1, color: '#01579b' }}>{now_who}</Typography>
                        <Typography sx={{ fontSize: 13, pr: 1, color: '#01579b' }}>
                            {now_who_status === 1 ? "Approved" : now_who_status === 2 ? "Rejected" :
                                now_who_status === 3 ? "On-Hold" : ""
                            }</Typography>
                    </Button>
                    <Box sx={{ mx: 0.3 }}>
                        <CssVarsProvider>
                            <IconButton
                                sx={{
                                    fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                    width: '15px',
                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                    bgcolor: now_who_status === 1 ? '#18A558' : now_who_status === 2 ? 'danger' :
                                        now_who_status === 3 ? 'warning' : '#5CACEE',
                                    '&:hover': {
                                        bgcolor: now_who_status === 1 ? '#18A558' : now_who_status === 2 ? 'danger' :
                                            now_who_status === 3 ? 'warning' : '#5CACEE'
                                    },
                                }}
                            > {approveComp(now_who_status)}
                            </IconButton>
                        </CssVarsProvider>
                    </Box>

                    {image_status === 1 ?
                        <Box sx={{ mr: 0.5 }}>
                            <CssVarsProvider>
                                <IconButton
                                    sx={{
                                        fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                        color: 'primary.main', bgcolor: 'white', width: '15px',
                                        '&:hover': {
                                            bgcolor: '#F0F4F8',
                                        },
                                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                    }}
                                    onClick={ViewImage} >
                                    <AttachFileIcon fontSize='small' sx={{ color: '#0277bd' }} />
                                </IconButton>
                            </CssVarsProvider>

                        </Box> : null
                    }

                </Box>
            </Box >
        </Fragment >
    )
}

export default memo(PurchaseApprovalButtonCmp)