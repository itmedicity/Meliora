import React, { Fragment, memo, useCallback, useState } from 'react'
import { GetItemDetailsOfCRFCmp } from '../ComonComponent/GetItemDetailsOfCRFCmp'
import { GetKMCItemDetails } from '../ComonComponent/ComponentsKMC/GetKMCItemDetails'
import { PUBLIC_NAS_FOLDER, PUBLIC_NAS_FOLDER_KMC } from 'src/views/Constant/Static'
import { axioskmc, axioslogin } from 'src/views/Axios/Axios'
import { Chip, CssVarsProvider, IconButton, Tooltip, Typography } from '@mui/joy'
import { ToastContainer } from 'react-toastify'
import ImageDisplayModal from '../ComonComponent/ImageUploadCmp/ImageDisplayModal'
import HigherLevelApprovalView from '../ComonComponent/HigherLevelComponents/HigherLevelApprovalView'
import { Box, Button } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import BackHandTwoToneIcon from '@mui/icons-material/BackHandTwoTone';
import DescriptionIcon from '@mui/icons-material/Description';
import PublishedWithChangesTwoToneIcon from '@mui/icons-material/PublishedWithChangesTwoTone';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CountdownTimer from '../PurchaseProcess/Component/CountdownTimer';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import DoDisturbOffTwoToneIcon from '@mui/icons-material/DoDisturbOffTwoTone';
import CustomToolTipForCRF from '../ComonComponent/Components/CustomToolTipForCRF'

const ApproveButtomForED = ({ setApprovalFlag, setApprovalModal, setCancelFlag, setCancelModal, setApprovalData,
    setCancelData, val, setReqItems, setApproveTableData, approveTableData, setPoDetails, reqItems, poDetails,
    setDataCollectData, setDataColFlag, setDataColData, setCollectDetailCheck, imagearray, setImageArry, datacolData,
    crfRadioValue, radiovalue, selectedCompany }) => {

    const { higher, crf_close, image_status, crf_closed_one, now_who, now_who_status, dept_type,
        dept_type_name, expected_date } = val

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [DetailViewFlag, setDetailViewFlag] = useState(0)
    const [DetailViewModal, setDetailViewModal] = useState(false)
    const [DetailViewData, setDetailViewData] = useState([])

    const Approvalfctn = useCallback(() => {
        const { req_slno } = val
        if (selectedCompany === '1') {
            const getImage = async (req_slno) => {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });
                    const savedFiles = fileUrls.map((val) => {
                        const parts = val.split('/');
                        const fileNamePart = parts[parts.length - 1];
                        const obj = {
                            imageName: fileNamePart,
                            url: val
                        }
                        return obj
                    })
                    setImageArry(savedFiles)
                } else {
                    setImageArry([])
                }
            }
            getImage(req_slno)
            GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
            const checkDataCollectComplete = async (req_slno) => {
                const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const xx = data?.filter((val) => val.crf_dept_status !== 1)
                    const yy = data?.filter((val) => val.crf_dept_status === 1)
                    if (xx.length !== 0) {
                        const datas = xx.map((val) => {
                            const obj = {
                                req_slno: val.crf_requst_slno,
                                crf_dept_remarks: val.crf_dept_remarks,
                                datagive_user: val.datagive_user,
                                data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                                reqest_one: val.reqest_one,
                                req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                                create_date: val.create_date,
                                update_date: val.update_date,
                                crf_req_remark: val.crf_req_remark,
                                data_coll_image_status: val.data_coll_image_status,
                                crf_data_collect_slno: val.crf_data_collect_slno
                            }
                            return obj
                        })
                        setDataCollectData(datas)
                        setApprovalFlag(2)
                        setCollectDetailCheck(true)
                    }
                    else {
                        setCollectDetailCheck(false)
                        setDataCollectData([])
                        setApprovalFlag(1)
                        setApprovalModal(true)
                    }
                    if (yy.length !== 0) {
                        setDataColFlag(1)
                        const datas = yy.map((val) => {
                            const obj = {
                                req_slno: val.crf_requst_slno,
                                crf_dept_remarks: val.crf_dept_remarks,
                                datagive_user: val.datagive_user,
                                data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                                reqest_one: val.reqest_one,
                                req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                                create_date: val.create_date,
                                update_date: val.update_date,
                                crf_req_remark: val.crf_req_remark,
                                data_coll_image_status: val.data_coll_image_status,
                                crf_data_collect_slno: val.crf_data_collect_slno
                            }
                            return obj
                        })
                        setDataColData(datas)
                    }
                    else {
                        setDataColFlag(0)
                        setDataColData([])
                    }
                }
                else {
                    setApprovalFlag(1)
                    setApprovalModal(true)
                    setCollectDetailCheck(false)
                }
            }
            checkDataCollectComplete(req_slno)
        } else if (selectedCompany === '2') {
        }
        setApprovalData(val)

    }, [setApprovalFlag, setApprovalModal, val, setApprovalData, setPoDetails, setApproveTableData, setReqItems,
        setDataCollectData, setDataColFlag, setDataColData, setCollectDetailCheck, setImageArry, selectedCompany
    ])
    const CloseFnctn = useCallback(() => {
        const { req_slno } = val
        if (selectedCompany === '1') {
            const getImage = async (req_slno) => {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });

                    const savedFiles = fileUrls.map((val) => {
                        const parts = val.split('/');
                        const fileNamePart = parts[parts.length - 1];
                        const obj = {
                            imageName: fileNamePart,
                            url: val
                        }
                        return obj
                    })
                    setImageArry(savedFiles)
                } else {
                    setImageArry([])
                }
            }
            getImage(req_slno)
            GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
        } else if (selectedCompany === '2') {
        }
        setCancelFlag(1)
        setCancelModal(true)
        setCancelData(val)
    }, [setCancelFlag, setCancelModal, setCancelData, val, setPoDetails, setReqItems, setImageArry, setApproveTableData,
        selectedCompany])

    const DataViewfnctn = useCallback(() => {
        const { req_slno } = val

        // GetAllItemDetails(req_slno, setReqItems, setAllItems, setPoDetails)
        if (selectedCompany === '1') {
            const getImage = async (req_slno) => {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });

                    const savedFiles = fileUrls.map((val) => {
                        const parts = val.split('/');
                        const fileNamePart = parts[parts.length - 1];
                        const obj = {
                            imageName: fileNamePart,
                            url: val
                        }
                        return obj
                    })
                    setImageArry(savedFiles)
                } else {
                    setImageArry([])
                }
            }
            getImage(req_slno)
            GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
            const checkDataCollectComplete = async (req_slno) => {
                const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const yy = data?.filter((val) => val.crf_dept_status === 1)
                    if (yy.length !== 0) {
                        setDataColFlag(1)
                        const datas = yy.map((val) => {
                            const obj = {
                                req_slno: val.crf_requst_slno,
                                crf_dept_remarks: val.crf_dept_remarks,
                                datagive_user: val.datagive_user,
                                data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                                reqest_one: val.reqest_one,
                                req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                                create_date: val.create_date,
                                update_date: val.update_date,
                                crf_req_remark: val.crf_req_remark,
                                data_coll_image_status: val.data_coll_image_status,
                                crf_data_collect_slno: val.crf_data_collect_slno,
                            }
                            return obj
                        })
                        setDataColData(datas)
                    }
                }
                else {
                    setDataColData([])
                }
            }
            checkDataCollectComplete(req_slno)
        } else if (selectedCompany === '2') {
            const getImage = async (req_slno) => {
                const result = await axioskmc.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER_KMC}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });

                    const savedFiles = fileUrls.map((val) => {
                        const parts = val.split('/');
                        const fileNamePart = parts[parts.length - 1];
                        const obj = {
                            imageName: fileNamePart,
                            url: val
                        }
                        return obj
                    })
                    setImageArry(savedFiles)
                } else {
                    setImageArry([])
                }
            }
            getImage(req_slno)
            GetKMCItemDetails(req_slno, setReqItems, setApproveTableData, setPoDetails)
            const checkDataCollectComplete = async (req_slno) => {
                const result = await axioskmc.get(`/CRFRegisterApproval/DataCollectComplete/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const yy = data?.filter((val) => val.crf_dept_status === 1)
                    if (yy.length !== 0) {
                        setDataColFlag(1)
                        const datas = yy.map((val) => {
                            const obj = {
                                req_slno: val.crf_requst_slno,
                                crf_dept_remarks: val.crf_dept_remarks,
                                datagive_user: val.datagive_user,
                                data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                                reqest_one: val.reqest_one,
                                req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                                create_date: val.create_date,
                                update_date: val.update_date,
                                crf_req_remark: val.crf_req_remark,
                                data_coll_image_status: val.data_coll_image_status,
                                crf_data_collect_slno: val.crf_data_collect_slno,
                            }
                            return obj
                        })
                        setDataColData(datas)
                    }
                }
                else {
                    setDataColData([])
                }
            }
            checkDataCollectComplete(req_slno)
        }
        setDetailViewFlag(1)
        setDetailViewData(val)
        setDetailViewModal(true)
    }, [val, setPoDetails, setReqItems, setImageArry, setDataColData, setDataColFlag, setApproveTableData, selectedCompany])

    const ViewImage = useCallback(() => {
        const { req_slno } = val
        const getImage = async (req_slno) => {

            if (selectedCompany === '1') {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });
                    setImageArry(fileUrls)
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    setImageShowFlag(0)
                    setImageShow(false)
                }
            }
            else if (selectedCompany === '2') {
                const result = await axioskmc.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER_KMC}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });
                    setImageArry(fileUrls)
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    setImageShowFlag(0)
                    setImageShow(false)
                }
            }
        }
        getImage(req_slno)
    }, [val, setImageArry, selectedCompany])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
    }, [setImageArry])

    const closeModal = useCallback(() => {
        setDetailViewFlag(0)
        setDetailViewModal(false)
        setDetailViewData([])
    }, [setDetailViewFlag, setDetailViewModal, setDetailViewData])
    const approveComp = (val) => {
        return val === 1 ?
            <CssVarsProvider>
                <Tooltip title="Approved" arrow color="success" size="sm" variant="solid" placement="top" >
                    <ThumbUpAltTwoToneIcon sx={{ color: '#18A558', height: 18, width: 18, fontWeight: 650 }} /></Tooltip>
            </CssVarsProvider>
            : val === 2 ?
                <CssVarsProvider>
                    <Tooltip title="Reject" arrow color="danger" size="sm" variant="solid" placement="top">
                        <ThumbDownTwoToneIcon sx={{ color: '#F83C31', height: 18, width: 18, }} /></Tooltip>
                </CssVarsProvider>
                : val === 3 ?
                    <CssVarsProvider>
                        <Tooltip title="On Hold" arrow color='warning' size="sm" variant="solid" placement="top">
                            <PauseCircleFilledTwoToneIcon sx={{ color: '#FF9800', height: 18, width: 18, }} /></Tooltip>
                    </CssVarsProvider>
                    : val === 4 ? < CssVarsProvider >
                        <Tooltip title="Internally Arranged" arrow color='primary' size="sm" variant="solid" placement="top">
                            <EventAvailableTwoToneIcon sx={{ color: '#0d47a1', height: 20, width: 20, }} /></Tooltip>
                    </CssVarsProvider >
                        : val === 5 ?
                            <CssVarsProvider>
                                <Tooltip arrow color="success" size="sm" variant="solid" placement="top">
                                    <ThumbUpAltTwoToneIcon sx={{ color: '#18A558', height: 18, width: 18, }} /></Tooltip>
                            </CssVarsProvider>
                            : <CssVarsProvider>
                                <Tooltip title="Pending" arrow color="neutral" size="sm" variant="solid" placement="top">
                                    < BackHandTwoToneIcon sx={{ color: '#607D8B', height: 18, width: 18, }} /></Tooltip>
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
            <ToastContainer />
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose} images={imagearray} /> : null}

            {DetailViewFlag === 1 ? <HigherLevelApprovalView open={DetailViewModal} closeModal={closeModal} imagearray={imagearray}
                DetailViewData={DetailViewData} reqItems={reqItems} approveTableData={approveTableData} poDetails={poDetails}
                datacolData={datacolData} selectedCompany={selectedCompany} /> : null}

            <Box sx={{
                display: 'flex', flex: 1, bgcolor: '#e3f2fd', borderRadius: 2, borderTopLeftRadius: 0,
                borderTopRightRadius: 0, justifyContent: 'space-between', flexWrap: 'wrap',
            }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', pl: 1 }} >
                    <Box sx={{ pl: 2, p: 0.5 }}>
                        {selectedCompany === '1' ?
                            <>
                                {crfRadioValue === '1' ?
                                    <>
                                        {higher === 1 ?
                                            <Button
                                                variant="contained"
                                                startIcon={
                                                    <DescriptionIcon
                                                        sx={{
                                                            height: 19,
                                                            width: 19,
                                                            color: '#0277bd',
                                                            // animation: `${rotate} 2s linear infinite`
                                                        }}
                                                    />
                                                }
                                                sx={buttonstyle}
                                                onClick={DataViewfnctn}
                                            >
                                                View
                                            </Button>
                                            :
                                            <Box sx={{ display: 'flex' }}>
                                                <Box sx={{}}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={
                                                            <PublishedWithChangesTwoToneIcon
                                                                sx={{
                                                                    height: 19,
                                                                    width: 19,
                                                                    color: '#0277bd',
                                                                    // animation: `${rotate} 2s linear infinite`
                                                                }}
                                                            />
                                                        }
                                                        sx={buttonstyle}
                                                        onClick={Approvalfctn}
                                                    >
                                                        Approval
                                                    </Button>
                                                </Box>
                                                <Box sx={{ pl: 1 }}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={
                                                            <NotInterestedOutlinedIcon
                                                                sx={{
                                                                    height: 19,
                                                                    width: 19,
                                                                    color: '#0277bd',
                                                                    // animation: `${rotate} 2s linear infinite`
                                                                }}
                                                            />
                                                        }
                                                        sx={buttonstyle}
                                                        onClick={CloseFnctn}
                                                    >
                                                        Close
                                                    </Button>
                                                </Box>
                                            </Box>}
                                    </>
                                    :
                                    <Box sx={{}}>
                                        <Button
                                            variant="contained"
                                            startIcon={
                                                <PublishedWithChangesTwoToneIcon
                                                    sx={{
                                                        height: 19,
                                                        width: 19,
                                                        color: '#0277bd',
                                                        // animation: `${rotate} 2s linear infinite`
                                                    }}
                                                />
                                            }
                                            sx={buttonstyle}
                                            onClick={Approvalfctn}
                                        >
                                            Approval
                                        </Button>
                                    </Box>
                                }
                            </>
                            :
                            <Button
                                variant="contained"
                                startIcon={
                                    <DescriptionIcon
                                        sx={{
                                            height: 19,
                                            width: 19,
                                            color: '#0277bd',
                                            // animation: `${rotate} 2s linear infinite`
                                        }}
                                    />
                                }
                                sx={buttonstyle}
                                onClick={DataViewfnctn}
                            >
                                View
                            </Button>
                        }
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', p: 0.5 }} >
                    <Box sx={{ pl: 2 }}>
                        <CountdownTimer endDate={expected_date} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', m: 0.4, p: 0.5 }} >
                    <CssVarsProvider>
                        <Chip
                            startDecorator={
                                dept_type === 1 ?
                                    <AddBusinessIcon sx={{ color: '#FB6B90', fontWeight: '650' }} />
                                    : dept_type === 2 ? <BadgeIcon sx={{ color: '#8155BA' }} /> :
                                        <SchoolIcon sx={{ color: '#29A0B1' }} />
                            }
                            size="sm"
                            variant="solid"
                            sx={{
                                bgcolor: 'white', border: '1px solid lightblue', fontWeight: 650,
                                color: (dept_type === 1 ? '#EF7C8E' : dept_type === 2 ? '#A16AE8' : '#29A0B1')
                            }}
                        >
                            {dept_type_name}
                        </Chip>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ pr: 1 }}>
                    {
                        crf_close !== 1 ?
                            <Box sx={{ display: 'flex', p: 0.5 }} >
                                {now_who_status === 4 ?
                                    <Button variant="plain"
                                        sx={{
                                            px: 1, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                            color: '#0277bd', borderRadius: 1, bgcolor: 'white',
                                            fontSize: 13, pr: 1, textTransform: 'capitalize', fontWeight: 550,
                                            '&:hover': {
                                                color: '#0277bd', bgcolor: 'white'
                                            },
                                        }}>

                                        Internally Arranged

                                    </Button>
                                    : null}
                                <Button variant="plain"
                                    sx={{
                                        px: 1, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                        bgcolor: '#0277bd', borderRadius: 1,
                                        '&:hover': {
                                            bgcolor: '#0277bd'
                                        },
                                    }}>
                                    {crfRadioValue === '2' ?
                                        <>
                                            {radiovalue === '6' ?
                                                <Typography sx={{ fontSize: 13, pl: 2, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>On-Hold Items</Typography>
                                                :
                                                radiovalue === '7' ?
                                                    <Typography sx={{ fontSize: 13, pl: 2, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>Rejected Items</Typography>
                                                    : null}
                                        </>
                                        :
                                        <>
                                            <Typography sx={{ fontSize: 13, pl: 2, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>{now_who}</Typography>
                                            <Typography sx={{ fontSize: 13, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>
                                                {now_who_status === 1 ? "Approved" : now_who_status === 2 ? "Rejected" :
                                                    now_who_status === 3 ? "On-Hold" : now_who_status === 4 ? 'Approved' : ""
                                                }</Typography>
                                        </>
                                    }

                                </Button>
                                <Box sx={{ mx: 0.3 }}>
                                    <CssVarsProvider>
                                        <IconButton
                                            sx={{
                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                width: '15px',
                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                bgcolor: 'white',
                                                '&:hover': {
                                                    bgcolor: 'white',
                                                },
                                            }}
                                        >
                                            {crfRadioValue === '2' ?
                                                <>
                                                    {radiovalue === '6' ?
                                                        approveComp(3)
                                                        :
                                                        radiovalue === '7' ?
                                                            approveComp(2)
                                                            : null}
                                                </>
                                                :
                                                approveComp(now_who_status)
                                            }
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>

                                {image_status === 1 ?
                                    <Box sx={{ mr: 0.5 }}>
                                        <CssVarsProvider>
                                            <CustomToolTipForCRF title="File View" placement='top'>
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
                                                    <AttachFileIcon fontSize='small' sx={{ color: '#2196F3' }} />
                                                </IconButton>
                                            </CustomToolTipForCRF>
                                        </CssVarsProvider>

                                    </Box> : null
                                }
                            </Box>
                            :
                            <Box sx={{ display: 'flex', p: 0.5 }} >
                                <Button variant="plain"
                                    sx={{
                                        px: 1, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                        bgcolor: '#0277bd', borderRadius: 1,
                                        '&:hover': {
                                            bgcolor: '#0277bd'
                                        },
                                    }}>
                                    <Typography sx={{ fontSize: 13, pl: 2, pr: 1, color: 'white', textTransform: 'capitalize', fontWeight: 550 }}>{now_who + ' By ' + crf_closed_one}</Typography>
                                </Button>
                                <Box sx={{ mx: 0.3 }}>
                                    <CssVarsProvider>
                                        <IconButton
                                            sx={{
                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                width: '15px',
                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                bgcolor: 'white',
                                                '&:hover': {
                                                    bgcolor: 'white',
                                                },
                                            }}
                                        >   <Tooltip title="Closed" arrow color="danger" size="sm" variant="solid" placement="top">
                                                <DoDisturbOffTwoToneIcon sx={{ color: 'red', height: 18, width: 18, }} /></Tooltip>
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                    }
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(ApproveButtomForED)