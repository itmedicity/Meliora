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
import SchoolIcon from '@mui/icons-material/School';

const ApproveButtonsCompnt = ({ setApprovalFlag, setApprovalModal, setCancelFlag, setCancelModal,
    setApprovalData, setCancelData, val, setDetailViewFlag, setDetailViewData, setDetailViewModal,
    setImageShowFlag, setImageShow, setImageSlno }) => {

    const { higher, crf_close, image_status, crf_closed_one, ed_approve, md_approve,
        now_who, now_who_status, emergency_flag, dept_type } = val

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

                {dept_type === 3 ?
                    <Box sx={{
                        width: "100%", mt: 0.5, backgroundColor: '#77B0AA', borderRadius: 2.5,
                        height: 25, display: "flex", flexDirection: "row"
                    }}>

                        <CssVarsProvider>
                            <Typography sx={{
                                fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                cursor: "pointer"
                            }}>Academic</Typography>
                        </CssVarsProvider>
                        <SchoolIcon />
                    </Box> :
                    dept_type === 1 ?
                        <Box sx={{
                            width: "100%", mt: 0.5, backgroundColor: '#FB9AD1', borderRadius: 2.5,
                            height: 25, display: "flex", flexDirection: "row"
                        }}>

                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Clinical</Typography>
                            </CssVarsProvider>
                            <svg fill="#B80000" viewBox="0 0 14 14" role="img" focusable="false"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                                </g><g id="SVGRepo_iconCarrier">
                                    <path d="m 6.28989,12.87055 c -0.50058,-0.3012 -0.84444,-0.6893 -0.9954,-1.1234 -0.0964,-0.2772 -0.0612,-0.5377 0.11306,-0.8353 0.0983,-0.1679 0.51285,-0.5848 0.75166,-0.7558 0.099,-0.071 0.17753,-0.1388 0.17441,-0.1508 -0.003,-0.012 -0.0875,-0.072 -0.18741,-0.1346 -0.3498,-0.2171 -0.67861,-0.4953 -0.85437,-0.7231 -0.0737,-0.095 -0.16033,-0.2842 -0.19186,-0.4181 -0.0893,-0.3788 0.2201,-1.0159 0.63134,-1.3001 0.0315,-0.022 0.0526,-0.043 0.0469,-0.048 -0.006,0 -0.12639,-0.032 -0.26827,-0.06 C 4.73383,7.16405 3.9012,6.92005 3.56899,6.75255 3.13203,6.53225 2.86389,6.23735 2.86743,5.98105 c 0.003,-0.1985 0.19504,-0.4479 0.45019,-0.5839 0.33064,-0.1762 0.81341,-0.2534 1.74593,-0.2792 0.63471,-0.017 0.82289,-0.01 0.99262,0.057 0.13193,0.049 0.1784,0.1215 0.16351,0.2536 -0.0147,0.1305 -0.074,0.2115 -0.20056,0.2742 -0.0913,0.045 -0.13664,0.049 -0.49248,0.047 -0.66056,0 -1.31942,0.06 -1.55303,0.1533 -0.0779,0.031 -0.0897,0.044 -0.0668,0.072 0.0762,0.092 0.69533,0.3382 1.25138,0.4981 0.43784,0.1259 1.49028,0.3841 1.50515,0.3692 0.006,-0.01 0.004,-0.4702 -0.005,-1.0306 l -0.0172,-1.0187 -0.17268,-0.013 c -0.12475,-0.01 -0.21795,-0.034 -0.3358,-0.088 l -0.16312,-0.075 -0.11235,0.056 c -0.0979,0.049 -0.14568,0.056 -0.37184,0.056 -0.25085,0 -0.26514,0 -0.42972,-0.084 l -0.17023,-0.085 -0.14484,0.061 c -0.12896,0.054 -0.17577,0.061 -0.42676,0.061 -0.27122,0 -0.28783,0 -0.43824,-0.077 l -0.15633,-0.077 -0.14805,0.053 c -0.12278,0.044 -0.19606,0.053 -0.42946,0.053 -0.31245,-1e-4 -0.43361,-0.033 -0.65778,-0.1807 -0.11233,-0.074 -0.12451,-0.076 -0.37408,-0.079 -0.29455,0 -0.47703,-0.05 -0.66768,-0.1727 -0.12635,-0.081 -0.35619,-0.3164 -0.40927,-0.4191 l -0.0329,-0.064 0.28526,0 c 0.68301,-0.01 1.37192,-0.2681 2.11447,-0.8005 0.30846,-0.2212 0.49531,-0.3789 0.91107,-0.7691 0.20442,-0.1918 0.42076,-0.3833 0.48075,-0.4255 0.31967,-0.2249 0.5255,-0.1368 0.85653,0.3665 0.10727,0.1631 0.24026,0.3373 0.29554,0.3872 0.14251,0.1285 0.32737,0.2069 0.52018,0.2207 0.15126,0.011 0.16051,0.01 0.16051,-0.038 0,-0.03 -0.0252,-0.062 -0.0656,-0.083 -0.10726,-0.055 -0.25684,-0.2152 -0.32214,-0.3441 -0.21771,-0.4296 -0.0338,-0.9468 0.41122,-1.1561 0.13264,-0.062 0.17833,-0.072 0.35177,-0.072 0.17345,0 0.21914,0.01 0.35178,0.072 0.2732,0.1285 0.45168,0.3669 0.49088,0.6558 0.0217,0.1597 -0.008,0.3579 -0.0719,0.4866 -0.0564,0.1129 -0.23741,0.3085 -0.33108,0.3578 -0.0392,0.021 -0.0645,0.053 -0.0645,0.083 0,0.047 0.009,0.049 0.16437,0.038 0.19816,-0.014 0.4135,-0.1113 0.54396,-0.2453 0.0478,-0.049 0.17442,-0.2208 0.28142,-0.3815 0.2376,-0.3569 0.35662,-0.4565 0.54549,-0.4565 0.16271,0 0.29028,0.078 0.58604,0.3579 0.4368,0.4136 0.71791,0.659 0.98161,0.8568 0.79132,0.5935 1.5209,0.8834 2.23663,0.8887 l 0.28572,0 -0.0334,0.065 c -0.0535,0.1034 -0.2829,0.3386 -0.40974,0.42 -0.19065,0.1223 -0.37312,0.1695 -0.66767,0.1726 -0.24957,0 -0.26175,0.01 -0.37408,0.079 -0.22417,0.1473 -0.34533,0.1806 -0.65779,0.1808 -0.23459,10e-5 -0.30645,-0.01 -0.43185,-0.054 l -0.15043,-0.054 -0.15321,0.078 c -0.14831,0.075 -0.16226,0.078 -0.43586,0.078 -0.25177,0 -0.29846,-0.01 -0.42748,-0.061 l -0.14484,-0.061 -0.17024,0.085 c -0.16457,0.082 -0.17887,0.084 -0.42972,0.084 -0.22616,0 -0.27391,-0.01 -0.37183,-0.056 l -0.11235,-0.056 -0.16312,0.075 c -0.11778,0.054 -0.21107,0.079 -0.33557,0.088 l -0.17244,0.013 -0.0153,0.3524 c -0.008,0.1938 -0.0153,0.6514 -0.0153,1.017 0,0.5593 0.005,0.6646 0.0334,0.6646 0.0696,0 1.42222,-0.3522 1.71177,-0.4457 0.52286,-0.1689 0.9783,-0.3835 0.94122,-0.4435 -0.0223,-0.036 -0.26277,-0.096 -0.52884,-0.1326 -0.15863,-0.022 -0.52079,-0.041 -0.87943,-0.048 -0.5691,-0.01 -0.61677,-0.014 -0.71527,-0.063 -0.0747,-0.037 -0.12185,-0.082 -0.16132,-0.1538 -0.0496,-0.091 -0.0528,-0.1119 -0.0287,-0.1922 0.0592,-0.1978 0.20442,-0.2375 0.85729,-0.2345 1.29578,0.01 1.91506,0.1254 2.26047,0.436 0.13154,0.1182 0.23839,0.3145 0.23803,0.4371 -3e-4,0.1044 -0.0929,0.2971 -0.19959,0.4152 -0.31105,0.3443 -1.14087,0.6578 -2.43261,0.919 -0.15156,0.031 -0.27555,0.061 -0.27555,0.068 0,0.01 0.057,0.057 0.12667,0.1115 0.22629,0.1767 0.41071,0.4591 0.50714,0.7766 0.1744,0.5742 -0.13705,1.0519 -1.06423,1.6325 l -0.16072,0.1006 0.11099,0.076 c 0.54698,0.3763 0.92819,0.8435 0.99815,1.2232 0.0944,0.5126 -0.36967,1.1871 -1.10135,1.6006 l -0.14835,0.084 0.0477,-0.081 c 0.3907,-0.6622 0.56075,-1.0922 0.53841,-1.3616 -0.0132,-0.1595 -0.12344,-0.3885 -0.27395,-0.5693 -0.12946,-0.1554 -0.42384,-0.4126 -0.44649,-0.3899 -0.007,0.01 -0.019,0.3897 -0.0258,0.8498 -0.0136,0.9208 -0.0158,0.9345 -0.15731,1.0017 -0.10239,0.049 -0.2145,0.03 -0.28765,-0.048 -0.0738,-0.079 -0.09,-0.2843 -0.0921,-1.1667 -9e-4,-0.3837 -0.008,-0.6977 -0.0159,-0.6977 -0.008,0 -0.0812,0.053 -0.16292,0.1183 -0.22477,0.1788 -0.44634,0.4309 -0.53209,0.6052 -0.0693,0.1409 -0.0763,0.1748 -0.0757,0.3666 4.5e-4,0.1706 0.0127,0.244 0.0633,0.3796 0.0905,0.2426 0.26374,0.582 0.46794,0.9165 0.0256,0.042 0.0429,0.076 0.0385,0.076 -0.004,0 -0.10005,-0.055 -0.21259,-0.1231 z m 0.39248,-5.0538 c -0.008,-0.042 -0.0204,-0.076 -0.0285,-0.076 -0.008,0 -0.10091,0.042 -0.20613,0.093 -0.37034,0.1792 -0.54221,0.4021 -0.56745,0.7359 -0.0122,0.1613 -0.008,0.1854 0.0487,0.2822 0.0748,0.1276 0.18263,0.2173 0.50733,0.4218 l 0.24624,0.1551 0.007,-0.7676 c 0.004,-0.4222 6e-4,-0.8019 -0.007,-0.8438 z m 0.9375,1.367 c 0.27635,-0.1825 0.40781,-0.3274 0.41402,-0.4564 0.0162,-0.3359 -0.0678,-0.5511 -0.28058,-0.7191 -0.11653,-0.092 -0.42114,-0.259 -0.43705,-0.2397 -0.003,0 -0.0121,0.3695 -0.0198,0.8125 -0.0125,0.722 -0.0102,0.8039 0.0224,0.7913 0.02,-0.01 0.15546,-0.093 0.30096,-0.1886 z"></path></g></svg>
                        </Box> :
                        <Box sx={{
                            width: "100%", mt: 0.5, backgroundColor: '#AD88C6', borderRadius: 2.5,
                            height: 25, display: "flex", flexDirection: "row"
                        }}>
                            <CssVarsProvider>
                                <Typography sx={{
                                    fontSize: 15, pl: 1, pr: 2, color: 'white', textAlign: "center",
                                    cursor: "pointer"
                                }}>Non Clinical</Typography>
                            </CssVarsProvider>
                            <Box sx={{
                                pt: 0.1
                            }}>
                                <svg width="30px" height="20px" viewBox="0 0 1024 1024"
                                    version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                                    </g><g id="SVGRepo_iconCarrier">
                                        <path d="M365.71 548.57h438.86v73.14H365.71zM365.7 402.56h219.43v73.14H365.7zM365.71 694.86h438.86V768H365.71zM639.76 321.68v54.86h63.93v18.58h-61.9v54.86h61.9v59.61h54.85v-59.61h61.88v-54.86h-61.88v-18.58h63.93v-54.86h-32.09l43.84-43.84-38.78-38.79-64.32 64.33-64.33-64.33-38.78 38.79 43.84 43.84z" fill="#0F1F3C"></path><path d="M219.44 109.62v219.52H73.14v475.43c0 60.59 49.12 109.71 109.71 109.71 0.3 0 0.58-0.09 0.89-0.09h631.8c74.62 0 135.32-61.14 135.32-136.3V109.62H219.44z m-36.58 731.52c-20.17 0-36.57-16.41-36.57-36.57V402.29h73.14v402.29c0 20.01-16.18 36.23-36.13 36.48h-0.43l-0.01 0.08z m694.86-63.25c0 34.82-27.89 63.16-62.18 63.16H285.88c4.06-11.47 6.69-23.62 6.69-36.48V378.93h0.01V182.77h585.14v595.12z" fill="#0F1F3C"></path></g></svg>
                            </Box>
                        </Box>

                }
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