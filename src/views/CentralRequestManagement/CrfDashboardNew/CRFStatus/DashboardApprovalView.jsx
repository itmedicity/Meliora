import { Box, Chip, CssVarsProvider, Grid, IconButton, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageDisplayModal from '../../CRFRequestMaster/ImageDisplayModal'
import { warningNotify } from 'src/views/Common/CommonCode'
import DataCollectnImageDis from '../../ComonComponent/DataCollectnImageDis'

const DashboardApprovalView = ({ modalData, handleClose, open, approvalRemarks, datacolflag, datacolData }) => {
    const [reqItems, setreqItems] = useState([])
    // const [apprvdItems, setapprvdItems] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])

    const [collImageShowFlag, setCollImageShowFlag] = useState(0)
    const [collImageShow, setCollImageShow] = useState(false)
    const [dataCollSlno, setDataCollSlNo] = useState('')

    const { req_slno, incharge, incharge_approve, incharge_remarks, inch_detial_analysis,
        incharge_apprv_date, incharge_user, hod, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date,
        hod_user, hod_image, dms, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, dms_user,
        dms_image, ms, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, ms_approve_user,
        ms_image, om, manag_operation_approv, manag_operation_remarks, om_detial_analysis, om_approv_date,
        manag_operation_user, mo_image, smo, senior_manage_approv, senior_manage_remarks, smo_detial_analysis,
        som_aprrov_date, senior_manage_user, smo_image, gm, gm_approve, gm_approve_remarks, gm_detial_analysis,
        gm_approv_date, gm_user, gm_image, ed, ed_approve, ed_approve_remarks, ed_detial_analysis,
        ed_approve_date, ed_user, ed_image, md, md_approve, md_approve_remarks, md_detial_analysis,
        md_approve_date, md_user, md_image, image_status, crf_close, crf_close_remark, closed_user, crf_closed_one, close_date
    } = approvalRemarks[0]
    useEffect(() => {
        if (modalData.length !== 0) {
            const req = modalData?.filter((val) => val.item_add_higher === 0)
            setreqItems(req)
        }
    }, [modalData])

    const ViewImageDataColection = useCallback((val) => {
        setDataCollSlNo(val);
        setCollImageShowFlag(1)
        setCollImageShow(true)
    }, [])

    const handleCloseCollect = useCallback(() => {
        setCollImageShow(false)
        setCollImageShowFlag(1)
        setDataCollSlNo('')
    }, [])
    const ViewImage = useCallback(() => {

        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/CrfImageUpload/crfRegimageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [setImageShowFlag, setImageShow, req_slno])

    const handleCloseImage = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])
    const ViewHODUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfHodImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/HodUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [req_slno])
    const ViewDMSUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfDMSImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/DMSUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [req_slno])
    const ViewMSUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfMSImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/MSUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [req_slno])

    const ViewMOUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfMOImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/MOUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [req_slno])

    const ViewSMOUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfSMOImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/SMOUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [req_slno])

    const ViewGMUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfGMImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/GMUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [req_slno])

    const ViewMDUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfMDImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/MDUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [req_slno])
    const ViewEDUploadImage = useCallback(() => {
        const getImage = async (req_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegisterImages/crfEDImageGet/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const fileNames = data;
                    const fileUrls = fileNames.map((fileName) => {
                        return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/EDUpload/${fileName}`;
                    });
                    setImageArry(fileUrls);
                    setImageShowFlag(1)
                    setImageShow(true)
                } else {
                    warningNotify("Error Occured to display image")
                    setImageShowFlag(0)
                    setImageShow(false)
                    setImageArry([])
                }
            } catch (error) {
                warningNotify("Error fetching Image:", error)
                setImageArry([])
                setImageShowFlag(0)
                setImageShow(false)
            }
        }
        getImage(req_slno)

    }, [req_slno])

    const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';

    return (
        <Fragment>
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleCloseImage}
                images={imagearray} /> : null}
            {collImageShowFlag === 1 ? <DataCollectnImageDis open={collImageShow} handleCloseCollect={handleCloseCollect}
                dataCollSlno={dataCollSlno} req_slno={req_slno}
            /> : null}

            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleClose}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog
                        variant="outlined"
                        sx={{
                            width: '85vw',
                            maxHeight: '90vh',
                            overflow: 'auto'
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                m: 1,
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 35, width: 35
                            }}
                        />
                        <Box sx={{ mx: 0.5 }}>
                            <Typography sx={{ fontWeight: 550, fontSize: 16, fontFamily: 'system-ui' }}>
                                CRF/TMC/{req_slno}&nbsp; Details </Typography>
                        </Box>
                        <Box>
                            {reqItems.length !== 0 ?
                                <Box sx={{ flexWrap: 'wrap' }}>
                                    <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                                        Requested Items
                                    </Typography>
                                    <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' >
                                        <thead style={{ height: 4 }} size='small'>
                                            <tr style={{ height: 4 }} size='small'>
                                                <th size='sm' style={{ width: 50, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Sl.No</th>
                                                <th size='sm' style={{ width: 300, backgroundColor: '#EBEBE8' }}>&nbsp;&nbsp;Description</th>
                                                <th size='sm' style={{ width: 100, backgroundColor: '#EBEBE8' }}>&nbsp;&nbsp;Brand</th>
                                                <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Qty</th>
                                                <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#EBEBE8' }}>UOM</th>
                                                <th size='sm' style={{ width: 350, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Specification</th>
                                                <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Price</th>
                                                <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Approx.cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reqItems.map((item, ind) => (
                                                <tr key={ind}>
                                                    <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                                                    <td style={{ fontSize: 13 }}>&nbsp;{item.item_desc}</td>
                                                    <td style={{}}>&nbsp;{item.item_brand}</td>
                                                    <td style={{ textAlign: 'center', }}>{item.item_qnty}</td>
                                                    <td style={{ textAlign: 'center', }}>{item.item_unit === 0 ? 'Not Given' : item.uom_name}</td>
                                                    <td style={{}}>&nbsp;{item.item_specification}</td>
                                                    <td style={{ textAlign: 'center', }}>{item.item_unit_price === 0 ? 'Not Given' : item.item_unit_price}</td>
                                                    <td style={{ textAlign: 'center', }}>{item.aprox_cost === 0 ? 'Not Given' : item.aprox_cost}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Box>
                                : null
                            }
                            {modalData.length !== 0 ?
                                <Box sx={{ flexWrap: 'wrap', }}>
                                    <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                                        Approved Items
                                    </Typography>
                                    <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' >
                                        <thead style={{ height: 4 }} size='small'>
                                            <tr style={{ height: 4 }} size='small'>
                                                <th size='sm' style={{ width: 50, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Sl.No</th>
                                                <th size='sm' style={{ width: 300, backgroundColor: '#EBEBE8' }}>&nbsp;&nbsp;Description</th>
                                                <th size='sm' style={{ width: 100, backgroundColor: '#EBEBE8' }}>&nbsp;&nbsp;Brand</th>
                                                <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Qty</th>
                                                <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#EBEBE8' }}>UOM</th>
                                                <th size='sm' style={{ width: 350, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Specification</th>
                                                <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Price</th>
                                                <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#EBEBE8' }}>Approx.cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modalData.map((item, ind) => (
                                                <tr key={ind}>
                                                    <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                                                    <td style={{ fontSize: 13 }}>&nbsp;{item.approve_item_desc}</td>
                                                    <td style={{}}>&nbsp;{item.approve_item_brand}</td>
                                                    <td style={{ textAlign: 'center', }}>{item.item_qnty_approved}</td>
                                                    <td style={{ textAlign: 'center', }}>{item.approve_item_unit === 0 ? 'Not Given' : item.apprv_uom}</td>
                                                    <td style={{}}>&nbsp;{item.approve_item_specification}</td>
                                                    <td style={{ textAlign: 'center', }}>{item.approve_item_unit_price === 0 ? 'Not Given' : item.approve_item_unit_price}</td>
                                                    <td style={{ textAlign: 'center', }}>{item.approve_aprox_cost === 0 ? 'Not Given' : item.approve_aprox_cost}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Box>
                                : null
                            }
                            {image_status === 1 ?
                                <Box sx={{ mr: 0.5, display: 'flex' }}>
                                    <CssVarsProvider>
                                        <IconButton
                                            sx={{
                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                '&:hover': {
                                                    bgcolor: '#F0F4F8',
                                                },
                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                            }}
                                            onClick={ViewImage} >
                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box> : null
                            }

                            {(incharge_approve === 1) ?

                                <Box>
                                    <Typography sx={{ fontWeight: 'bold', mx: 1, color: '#145DA0', fontSize: 14 }}>
                                        Approved Details
                                    </Typography>
                                    <Box sx={{}}>
                                        <Paper variant="outlined" square sx={{ flexWrap: 'wrap', }}>
                                            <Grid container spacing={0.5} sx={{ flexGrow: 1, py: 0.5 }}>
                                                {/* {incharge_approve === 1 ? */}
                                                <Grid xs={4} sx={{ pl: 0.5 }}>
                                                    <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                        <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                            <Typography sx={{ fontSize: 14, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                Incharge
                                                            </Typography>
                                                            <Box sx={{ flex: 1 }}>
                                                                {incharge_user !== "" ?
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((incharge_approve === 1) ? '#28a745' : incharge_approve === 2 ? '#dc3545' : incharge_approve === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5, fontSize: 12, fontWeight: 550
                                                                    }}>
                                                                        {incharge}
                                                                    </Chip> :
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ('#6c757d'),
                                                                        height: 25, pb: 0.5, fontSize: 12, fontWeight: 550
                                                                    }}>
                                                                        Note Done </Chip>}
                                                            </Box>
                                                        </Box>
                                                        {incharge_approve === 1 ?
                                                            <>
                                                                <Box sx={{ display: 'flex' }}>
                                                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        : &nbsp;  {incharge_remarks}</Typography>
                                                                </Box>
                                                                <Box sx={{ display: 'flex' }}>
                                                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        : &nbsp;  {inch_detial_analysis}</Typography>
                                                                </Box>
                                                            </>
                                                            :
                                                            incharge_approve === 2 ?
                                                                <Box sx={{ display: 'flex' }}>
                                                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        : &nbsp;  {incharge_remarks}</Typography>
                                                                </Box>
                                                                :
                                                                incharge_approve === 3 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {incharge_remarks}</Typography>
                                                                    </Box>
                                                                    : null
                                                        }

                                                        {incharge_apprv_date !== null ?
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By </Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {incharge_approve === 1 ? capitalizeWords(incharge_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh :mm:ss a') : 'Not Updated'}</Typography>
                                                                </Box>
                                                            </Box>
                                                            : null}
                                                    </Paper>
                                                </Grid>
                                                {hod_approve !== null ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                    HOD
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((hod_approve === 1) ? '#28a745' : hod_approve === 2 ? '#dc3545' : hod_approve === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        {hod}
                                                                    </Chip>
                                                                </Box>
                                                            </Box>
                                                            {hod_approve === 1 ?
                                                                <>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {hod_remarks}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {hod_detial_analysis}</Typography>
                                                                    </Box>
                                                                </>
                                                                :
                                                                hod_approve === 2 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {hod_remarks}</Typography>
                                                                    </Box>
                                                                    :
                                                                    hod_approve === 3 ?
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                            <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                                : &nbsp;  {hod_remarks}</Typography>
                                                                        </Box>
                                                                        : null
                                                            }
                                                            <Box sx={{ display: 'flex', }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By</Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {hod_approve !== null ? capitalizeWords(hod_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {hod_approve !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                                </Box>
                                                            </Box>
                                                            {hod_image === 1 ?
                                                                <Box sx={{ display: 'flex', ml: 2 }}>
                                                                    <CssVarsProvider>
                                                                        <IconButton
                                                                            sx={{
                                                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                                                '&:hover': {
                                                                                    bgcolor: '#F0F4F8',
                                                                                },
                                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                            }}
                                                                            onClick={ViewHODUploadImage} >
                                                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                        </IconButton>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                    : null}
                                                {dms_approve !== null ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                    DMS
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((dms_approve === 1) ? '#28a745' : dms_approve === 2 ? '#dc3545' : dms_approve === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        {dms}
                                                                    </Chip>
                                                                </Box>
                                                            </Box>

                                                            {dms_approve === 1 ?
                                                                <>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {dms_remarks}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {dms_detail_analysis}</Typography>
                                                                    </Box>
                                                                </>
                                                                :
                                                                dms_approve === 2 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {dms_remarks}</Typography>
                                                                    </Box>
                                                                    :
                                                                    dms_approve === 3 ?
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                            <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                                : &nbsp;  {dms_remarks}</Typography>
                                                                        </Box>
                                                                        : null
                                                            }

                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By </Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {dms_approve !== null ? capitalizeWords(dms_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {dms_approve !== null ? format(new Date(dms_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                                </Box>
                                                            </Box>
                                                            {dms_image === 1 ?
                                                                <Box sx={{ display: 'flex', ml: 2 }}>
                                                                    <CssVarsProvider>
                                                                        <IconButton
                                                                            sx={{
                                                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                                                '&:hover': {
                                                                                    bgcolor: '#F0F4F8',
                                                                                },
                                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                            }}
                                                                            onClick={ViewDMSUploadImage} >
                                                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                        </IconButton>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                    : null}

                                                {ms_approve !== null ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                    MS
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((ms_approve === 1) ? '#28a745' : ms_approve === 2 ? '#dc3545' : ms_approve === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        {ms}
                                                                    </Chip>
                                                                </Box>
                                                            </Box>
                                                            {ms_approve === 1 ?
                                                                <>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {ms_approve_remark}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {ms_detail_analysis}</Typography>
                                                                    </Box>
                                                                </>
                                                                :
                                                                ms_approve === 2 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {ms_approve_remark}</Typography>
                                                                    </Box>
                                                                    :
                                                                    ms_approve === 3 ?
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                            <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                                : &nbsp;  {ms_approve_remark}</Typography>
                                                                        </Box>
                                                                        : null
                                                            }

                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By </Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {ms_approve !== null ? capitalizeWords(ms_approve_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {ms_approve !== null ? format(new Date(ms_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                                </Box>
                                                            </Box>
                                                            {ms_image === 1 ?
                                                                <Box sx={{ display: 'flex', ml: 2 }}>
                                                                    <CssVarsProvider>
                                                                        <IconButton
                                                                            sx={{
                                                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                                                '&:hover': {
                                                                                    bgcolor: '#F0F4F8',
                                                                                },
                                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                            }}
                                                                            onClick={ViewMSUploadImage} >
                                                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                        </IconButton>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                    : null}
                                                {manag_operation_approv !== null ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                    OM
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((manag_operation_approv === 1) ? '#28a745' : manag_operation_approv === 2 ? '#dc3545' : manag_operation_approv === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        {om}
                                                                    </Chip>
                                                                </Box>
                                                            </Box>
                                                            {manag_operation_approv === 1 ?
                                                                <>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {manag_operation_remarks}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {om_detial_analysis}</Typography>
                                                                    </Box>
                                                                </>
                                                                :
                                                                manag_operation_approv === 2 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {manag_operation_remarks}</Typography>
                                                                    </Box>
                                                                    :
                                                                    manag_operation_approv === 3 ?
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                            <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                                : &nbsp;  {manag_operation_remarks}</Typography>
                                                                        </Box>
                                                                        : null
                                                            }
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>User</Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {manag_operation_approv !== null ? capitalizeWords(manag_operation_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {manag_operation_approv !== null ? format(new Date(om_approv_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                                </Box>
                                                            </Box>
                                                            {mo_image === 1 ?
                                                                <Box sx={{ display: 'flex', ml: 2 }}>
                                                                    <CssVarsProvider>
                                                                        <IconButton
                                                                            sx={{
                                                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                                                '&:hover': {
                                                                                    bgcolor: '#F0F4F8',
                                                                                },
                                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                            }}
                                                                            onClick={ViewMOUploadImage} >
                                                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                        </IconButton>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                    : null}

                                                {senior_manage_approv !== null ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                    SMO
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((senior_manage_approv === 1) ? '#28a745' : senior_manage_approv === 2 ? '#dc3545' : senior_manage_approv === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        {smo}
                                                                    </Chip>
                                                                </Box>
                                                            </Box>

                                                            {senior_manage_approv === 1 ?
                                                                <>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {senior_manage_remarks}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {smo_detial_analysis}</Typography>
                                                                    </Box>
                                                                </>
                                                                :
                                                                senior_manage_approv === 2 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {senior_manage_remarks}</Typography>
                                                                    </Box>
                                                                    :
                                                                    senior_manage_approv === 3 ?
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                            <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                                : &nbsp;  {senior_manage_remarks}</Typography>
                                                                        </Box>
                                                                        : null
                                                            }
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By </Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {senior_manage_approv !== null ? capitalizeWords(senior_manage_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {senior_manage_approv !== null ? format(new Date(som_aprrov_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                                </Box>
                                                            </Box>
                                                            {smo_image === 1 ?
                                                                <Box sx={{ display: 'flex', ml: 2 }}>
                                                                    <CssVarsProvider>
                                                                        <IconButton
                                                                            sx={{
                                                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                                                '&:hover': {
                                                                                    bgcolor: '#F0F4F8',
                                                                                },
                                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                            }}
                                                                            onClick={ViewSMOUploadImage} >
                                                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                        </IconButton>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                    : null}
                                                {gm_approve !== null ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                    GM
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((gm_approve === 1) ? '#28a745' : gm_approve === 2 ? '#dc3545' : gm_approve === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        {gm}
                                                                    </Chip>
                                                                </Box>
                                                            </Box>
                                                            {gm_approve === 1 ?
                                                                <>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {gm_approve_remarks}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {gm_detial_analysis}</Typography>
                                                                    </Box>
                                                                </>
                                                                :
                                                                gm_approve === 2 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {gm_approve_remarks}</Typography>
                                                                    </Box>
                                                                    :
                                                                    gm_approve === 3 ?
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                            <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                                : &nbsp;  {gm_approve_remarks}</Typography>
                                                                        </Box>
                                                                        : null
                                                            }

                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By </Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {gm_approve !== null ? capitalizeWords(gm_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {gm_approve !== null ? format(new Date(gm_approv_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                                </Box>
                                                            </Box>
                                                            {gm_image === 1 ?
                                                                <Box sx={{ display: 'flex', ml: 2 }}>
                                                                    <CssVarsProvider>
                                                                        <IconButton
                                                                            sx={{
                                                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                                                '&:hover': {
                                                                                    bgcolor: '#F0F4F8',
                                                                                },
                                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                            }}
                                                                            onClick={ViewGMUploadImage} >
                                                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                        </IconButton>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                    : null}
                                                {md_approve !== null ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                    MD
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((md_approve === 1) ? '#28a745' : md_approve === 2 ? '#dc3545' : md_approve === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        {md}
                                                                    </Chip>
                                                                </Box>
                                                            </Box>
                                                            {md_approve === 1 ?
                                                                <>  <Box sx={{ display: 'flex' }}>
                                                                    <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        : &nbsp;  {md_approve_remarks}</Typography>
                                                                </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {md_detial_analysis}</Typography>
                                                                    </Box>
                                                                </>
                                                                :
                                                                md_approve === 2 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {md_approve_remarks}</Typography>
                                                                    </Box>
                                                                    :
                                                                    md_approve === 3 ?
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                            <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                                : &nbsp;  {md_approve_remarks}</Typography>
                                                                        </Box>
                                                                        : null
                                                            }

                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By </Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {md_approve !== null ? capitalizeWords(md_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {md_approve !== null ? format(new Date(md_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                                </Box>
                                                            </Box>
                                                            {md_image === 1 ?
                                                                <Box sx={{ display: 'flex', ml: 2 }}>
                                                                    <CssVarsProvider>
                                                                        <IconButton
                                                                            sx={{
                                                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                                                '&:hover': {
                                                                                    bgcolor: '#F0F4F8',
                                                                                },
                                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                            }}
                                                                            onClick={ViewMDUploadImage} >
                                                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                        </IconButton>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                    : null}
                                                {ed_approve !== null ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650 }}>
                                                                    ED
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: ((ed_approve === 1) ? '#28a745' : ed_approve === 2 ? '#dc3545' : ed_approve === 3 ? '#ffc107' : '#6c757d'),
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        {ed}
                                                                    </Chip>
                                                                </Box>
                                                            </Box>
                                                            {ed_approve === 1 ?
                                                                <>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {ed_approve_remarks}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Analysis </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {ed_detial_analysis}</Typography>
                                                                    </Box>
                                                                </>
                                                                :
                                                                ed_approve === 2 ?
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Reject Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                            : &nbsp;  {ed_approve_remarks}</Typography>
                                                                    </Box>
                                                                    :
                                                                    ed_approve === 3 ?
                                                                        <Box sx={{ display: 'flex' }}>
                                                                            <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>On-Hold Remarks </Typography>
                                                                            <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                                : &nbsp;  {ed_approve_remarks}</Typography>
                                                                        </Box>
                                                                        : null
                                                            }

                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By </Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {ed_approve !== null ? capitalizeWords(ed_user) : ''}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {ed_approve !== null ? format(new Date(ed_approve_date), 'dd-MM-yyyy hh :mm:ss a') : ''}</Typography>
                                                                </Box>
                                                            </Box>
                                                            {ed_image === 1 ?
                                                                <Box sx={{ display: 'flex', ml: 2 }}>
                                                                    <CssVarsProvider>
                                                                        <IconButton
                                                                            sx={{
                                                                                fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2',
                                                                                color: 'primary.main', bgcolor: 'white', width: '120px',
                                                                                '&:hover': {
                                                                                    bgcolor: '#F0F4F8',
                                                                                },
                                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                            }}
                                                                            onClick={ViewEDUploadImage} >
                                                                            <Typography sx={{ fontSize: 14, px: 1 }}>File View</Typography>
                                                                            <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                        </IconButton>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                            }
                                                        </Paper>
                                                    </Grid>
                                                    : null}

                                                {crf_close === 1 ?
                                                    <Grid xs={4} sx={{ pl: 0.5 }}>
                                                        <Paper sx={{ bgcolor: 'white', m: 0.5, height: 165 }}>
                                                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                <Typography sx={{ fontSize: 13, pl: 1, pt: 0.5, flex: 0.5, fontWeight: 650, color: '#dc3545' }}>
                                                                    {crf_closed_one}
                                                                </Typography>
                                                                <Box sx={{ flex: 1 }}>
                                                                    <Chip size="md" variant="outlined" sx={{
                                                                        color: 'red',
                                                                        height: 25, pb: 0.5,
                                                                        fontSize: 12, fontWeight: 550,
                                                                    }}>
                                                                        CRF Closed
                                                                    </Chip>
                                                                </Box>
                                                            </Box>
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 13, flex: 0.5 }}>Actioned By </Typography>
                                                                <Box sx={{ flex: 1, display: 'flex', }}>
                                                                    <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 0.7 }}>
                                                                        : &nbsp;  {capitalizeWords(closed_user)}</Typography>
                                                                    <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                        {format(new Date(close_date), 'dd-MM-yyyy hh :mm:ss a')}</Typography>
                                                                </Box>
                                                            </Box>
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                <Typography sx={{ height: 30, fontSize: 12, fontWeight: 550, flex: 1 }}>
                                                                    : &nbsp;  {crf_close_remark}</Typography>
                                                            </Box>
                                                        </Paper>
                                                    </Grid>
                                                    : null}
                                            </Grid>
                                        </Paper>
                                    </Box>
                                    <Box sx={{}}>
                                        {datacolflag === 1 ?
                                            <>
                                                <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.5, color: '#145DA0', fontSize: 14 }}>
                                                    Data Collection Details
                                                </Typography>
                                                <Box sx={{ overflow: 'auto', flexWrap: 'wrap', }}>
                                                    {datacolData.map((val, index) => (

                                                        <Paper key={index} variant="outlined" sx={{ m: 0.5, border: '1px solid lightblue' }} >
                                                            <Grid container spacing={0.5}>
                                                                <Grid xs={6}>
                                                                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Requested To </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 1, textTransform: 'capitalize' }}>
                                                                            : &nbsp;  {val.data_entered}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Requested By </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 1, textTransform: 'capitalize' }}>
                                                                            : &nbsp;  {val.req_user}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Date</Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 1, textTransform: 'capitalize' }}>
                                                                            : &nbsp;  {format(new Date(val.create_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Requested By </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 1, textTransform: 'capitalize' }}>
                                                                            : &nbsp;  {val.crf_req_remark}</Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid xs={6}>
                                                                    <Box sx={{ display: 'flex', pt: 0.5 }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>End-User </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 1, textTransform: 'capitalize' }}>
                                                                            : &nbsp;  {val.datagive_user}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Date </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 1, textTransform: 'capitalize' }}>
                                                                            : &nbsp;  {format(new Date(val.update_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                                    </Box>
                                                                    <Box sx={{ display: 'flex' }}>
                                                                        <Typography sx={{ pl: 1, fontSize: 14, flex: 0.5 }}>Remarks </Typography>
                                                                        <Typography sx={{ height: 30, fontSize: 13, fontWeight: 550, flex: 1, textTransform: 'capitalize' }}>
                                                                            : &nbsp;  {val.crf_dept_remarks}</Typography>
                                                                    </Box>
                                                                    {val.data_coll_image_status === 1 ?
                                                                        <Box sx={{ display: 'flex', pb: 0.5 }}>
                                                                            <CssVarsProvider>
                                                                                <IconButton
                                                                                    sx={{
                                                                                        fontSize: 12, height: '28px', minHeight: '28px', lineHeight: '1.2',
                                                                                        color: 'primary.main', bgcolor: 'white', width: '120px', border: '1px solid lightblue',
                                                                                        '&:hover': {
                                                                                            bgcolor: '#F0F4F8',
                                                                                        },
                                                                                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                                    }}
                                                                                    onClick={() => ViewImageDataColection(val.crf_data_collect_slno)}
                                                                                >
                                                                                    <Typography sx={{ fontSize: 13, px: 1 }}>File View</Typography>
                                                                                    <AttachmentTwoToneIcon fontSize='small' sx={{ color: '#0277bd', width: 35, height: 25 }} />
                                                                                </IconButton>
                                                                            </CssVarsProvider>
                                                                        </Box> : null
                                                                    }
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    ))}
                                                </Box>
                                            </>
                                            : null
                                        }
                                    </Box>
                                </Box>
                                :
                                <Box sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                                    color: 'grey'
                                }}>
                                    Approval Not Initiated
                                </Box>}
                        </Box>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider >
        </Fragment >
    )
}

export default memo(DashboardApprovalView)