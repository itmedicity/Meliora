import React, { Fragment, useCallback, useState, memo, useMemo, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper, IconButton, Input } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import Divider from '@mui/material/Divider';
import { TypoHeadColor } from 'src/color/Color'
import _ from 'underscore'
import CRFDataItemEditCmnt from './CRFDataItemEditCmnt';
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import CRFDataItemOrginal from './CRFDataItemOrginal';
import ReqImageDisplayModal from '../RequestRegister/ReqImageDisplayModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import imageCompression from 'browser-image-compression';
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CRFDataCollectinModel = ({ open, setOpen, datas, count, setCount }) => {
    const { req_slno, req_date, actual_requirement, needed, location, dept_name,
        req_userdeptsec, expected_date, req_user, userdeptsec, image_status,
        incharge_approve, approve_incharge, incharge_remarks, approve_hod, hod_remarks, category, incharge_apprv_date,
        hod_approve_date, inch_user, hod_user, inch_detial_analysis, hod_detial_analysis, incharge_req,
        hod_approve, hod_req, crf_dept_remarks, crf_data_collect_slno, crf_req_remark,
        datacoll_reqdate, datacoll_requser, crf_dept_status
    } = datas[0]

    const reqdate = req_date !== null ? format(new Date(req_date), 'dd-MM-yyyy') : null
    const expdate = format(new Date(expected_date), 'dd-MM-yyyy')
    const inchadate = incharge_apprv_date !== null ? format(new Date(incharge_apprv_date), 'dd-MM-yyyy hh:mm:ss') : null
    const hoddate = hod_approve_date !== null ? format(new Date(hod_approve_date), 'dd-MM-yyyy hh:mm:ss') : null
    //redux for geting login id
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    // const [imgFlag, setImgFlag] = useState(0)
    //state for Remarks
    const [remark, setRemark] = useState('')
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [])

    useEffect(() => {
        if (crf_dept_status === 1) {
            setRemark(crf_dept_remarks)
        } else {
            setRemark('')
        }
    }, [crf_dept_remarks, crf_dept_status])

    const [selectFile, setSelectFile] = useState([])
    const uploadFile = useCallback(async (e) => {
        const newFiles = [...selectFile]
        newFiles.push(e.target.files[0])
        setSelectFile(newFiles)
    }, [selectFile, setSelectFile])

    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };


    const [orginal, setorginal] = useState([])
    const [tableOrginal, setTableOrginal] = useState(0)

    useEffect(() => {
        const getOrginalData = async (req_slno) => {
            const result = await axioslogin.get(`/requestRegister/getItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setorginal(data)
                setTableOrginal(1)
            }
            else {
                setTableOrginal(0)
            }
        }

        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/CrfImageUpload/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }


        getOrginalData(req_slno)
        getImage(req_slno)
    }, [req_slno])


    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])

    const ViewImage = useCallback(() => {
        setImageShowFlag(1)
        setImageShow(true)
    }, [])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const patchdata = useMemo(() => {
        return {
            crf_dept_remarks: remark,
            save_user: id,
            crf_data_collect_slno: crf_data_collect_slno
        }
    }, [remark, crf_data_collect_slno, id])

    const submit = useCallback((e) => {
        e.preventDefault();
        const reset = () => {
            setOpen(false)
            setRemark('')
        }
        const updateInchApproval = async (patchdata) => {
            const result = await axioslogin.patch('/requestRegister/CrfDataCollactnSave', patchdata);
            return result.data
        }

        const FileInsert = async (crf_data_collect_slno, req_slno, selectFile) => {
            try {
                const formData = new FormData();
                formData.append('id', crf_data_collect_slno);
                formData.append('reqslno', req_slno);
                for (const file of selectFile) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', file, file.name);
                    }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const result = await axioslogin.post('/CrfImageUpload/crf/DataCollection', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return result.data
            } catch (error) {
                warningNotify('An error occurred during file upload.');

            }
        }

        if (remark !== '') {
            updateInchApproval(patchdata).then((value) => {
                const { success, message } = value
                if (success === 1) {
                    if (selectFile.length !== 0) {
                        FileInsert(crf_data_collect_slno, req_slno, selectFile).then((val) => {
                            const { success, message } = val
                            if (success === 1) {
                                succesNotify(message)
                                setCount(count + 1)
                                reset()
                            }
                            else {
                                warningNotify(message)
                            }
                        })
                    } else {
                        succesNotify(message)
                        setCount(count + 1)
                        reset()
                    }
                }
                else {
                    warningNotify(message)
                }
            })
        }
        else {
            warningNotify("Please Enter remarks Before Save")
        }

    }, [patchdata, setOpen, count, setCount, setRemark, remark, crf_data_collect_slno,
        req_slno, selectFile, handleImageUpload])
    // reset 
    const Close = useCallback(() => {
        setOpen(false)
        setRemark('')
        setorginal([])
        setTableOrginal(0)
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
    }, [setOpen])


    return (
        <Fragment>
            <ToastContainer />
            <Box>
                {imageshowFlag === 1 ? <ReqImageDisplayModal open={imageshow} handleClose={handleClose} images={imagearray} /> : null}


                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-descriptiona"
                    fullWidth
                    maxWidth='md'
                >
                    < DialogContent id="alert-dialog-slide-descriptiona"
                        sx={{
                            width: '100%',
                            height: 540
                        }}
                    >
                        < DialogContentText id="alert-dialog-slide-descriptiona">
                            Data Collection Model
                        </DialogContentText>

                        <Box sx={{ width: "100%", mt: 0 }}>
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ pr: 8 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Request No:  {req_slno}</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ pl: 6 }}                                    >
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Req.Date: {reqdate}</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>

                                    {
                                        actual_requirement !== null ? <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>

                                            <Box
                                                sx={{ width: "25%", }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Paper sx={{
                                                width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                            }} variant='none'>
                                                {actual_requirement}
                                            </Paper>


                                        </Box> : null
                                    }
                                    {
                                        needed !== null ? <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>

                                            <Box
                                                sx={{ width: "25%", }}>
                                                <CssVarsProvider>
                                                    <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                                </CssVarsProvider>
                                            </Box>
                                            <Paper sx={{
                                                width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                            }} variant='none'>
                                                {needed}
                                            </Paper>
                                        </Box> : null
                                    }
                                    {location !== null ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>

                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Location:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {location}
                                        </Paper>
                                    </Box> : null}
                                    {category !== null ? <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Category:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15,
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {category}
                                        </Paper>
                                    </Box> : null}
                                    <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Department:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {dept_name !== null ? dept_name.toLowerCase() : "Not Updated"}
                                        </Paper>
                                    </Box>

                                    <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Department Section:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {req_userdeptsec !== null ? req_userdeptsec.toLowerCase() : "Not Updated"}
                                        </Paper>
                                    </Box>

                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5, pb: 0,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{ p: 0.5, }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, textTransform: "capitalize", }}>
                                                Requested User: {req_user !== null ? req_user.toLowerCase() : "Not Updated"}</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            p: 0.5,
                                            flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                        }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, textTransform: "capitalize", }}>
                                                Requested DeptSec: {userdeptsec !== null ? userdeptsec.toLowerCase() : "Not Updated"}</Typography>
                                        </CssVarsProvider>
                                        {image_status === 1 ? <Box sx={{ display: 'flex', width: "20%", height: 30, pl: 3 }}>
                                            <Button onClick={ViewImage} variant="contained"
                                                color="primary">View Image</Button>

                                        </Box> : null}
                                    </Box>

                                    <Box sx={{ width: "100%", mt: 0 }}>
                                        <Paper variant='outlined' sx={{ mt: 1 }} >
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                            }}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    pl: 0.2, pr: 0.5,
                                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                }}>
                                                    <Box
                                                        sx={{ pr: 9 }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ pl: 1, fontWeight: 900, fontSize: 14, color: TypoHeadColor }} >Data Collection Request Details</Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Box>
                                                <Box sx={{
                                                    width: "100%", display: "flex", p: 0.5,
                                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                }}>
                                                    <Box
                                                        sx={{ width: "25%", }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Remarks</Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                    <Paper sx={{
                                                        width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                    }} variant='none'>
                                                        {crf_req_remark}
                                                    </Paper>
                                                </Box>
                                                <Box sx={{
                                                    width: "100%", display: "flex", p: 0.5,
                                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                                }}>
                                                    <Box
                                                        sx={{ width: "25%", }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ pl: 1, fontSize: 15 }}>Requested Details</Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                    <Paper sx={{
                                                        width: '25%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                    }} variant='none'>
                                                        {datacoll_requser}
                                                    </Paper>
                                                    <Paper sx={{
                                                        width: '20%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                                    }} variant='none'>
                                                        {datacoll_reqdate}
                                                    </Paper>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </Box>



                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        {tableOrginal === 1 ?
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                p: 0.5, pb: 0,
                                                flexDirection: "column",
                                            }}>
                                                <Box
                                                    sx={{ pr: 9 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15 }}>Requested data</Typography>
                                                    </CssVarsProvider>
                                                </Box>

                                                <CRFDataItemOrginal
                                                    dataPost={orginal}
                                                />
                                                <Box
                                                    sx={{ pr: 9 }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 15 }}>Data Enter For Collection</Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                                <CRFDataItemEditCmnt
                                                    reqslno={req_slno}
                                                />
                                            </Box>

                                            : null}

                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ width: "100%", mt: 0 }}>
                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                }}>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        pl: 0.2, pr: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ pr: 9 }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontWeight: 900, fontSize: 14, color: TypoHeadColor, pl: 1 }} >Department Approval</Typography>
                                            </CssVarsProvider>
                                        </Box>

                                    </Box>
                                    {
                                        hod_req === 1 ? <Box>

                                            {incharge_req === 1 ?
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    pl: 1, pr: 0.5, pt: 0.4,

                                                    flexDirection: 'column'
                                                }}>
                                                    <Box
                                                        sx={{
                                                            // pl: 1,
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: "space-between"
                                                        }}>

                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Incharge :
                                                                {
                                                                    incharge_approve === 1 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="success" variant="outlined"> {approve_incharge}
                                                                        </Typography> : incharge_approve === 2 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="danger" variant="outlined"> {approve_incharge}
                                                                            </Typography> : incharge_approve === 3 ?
                                                                                <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }} color="primary" variant="outlined"> {approve_incharge}
                                                                                </Typography> : null
                                                                }
                                                            </Typography>
                                                        </CssVarsProvider>
                                                        {
                                                            inchadate !== null ? <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-evenly",
                                                                    pr: 2
                                                                }}>
                                                                <CssVarsProvider>
                                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>{inchadate !== null ? inchadate : "Not Update"}</Typography>
                                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                    <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>    {inch_user !== null ? inch_user.toLowerCase() : null} </Typography>
                                                                </CssVarsProvider>   </Box> : null
                                                        }
                                                    </Box>
                                                    {
                                                        incharge_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remarks} </Typography>
                                                            </CssVarsProvider>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{inch_detial_analysis} </Typography>
                                                            </CssVarsProvider> </Box> :
                                                            incharge_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remarks} </Typography>
                                                                </CssVarsProvider>
                                                            </Box> :
                                                                incharge_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                    <CssVarsProvider>
                                                                        <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                        <Typography ml={10} sx={{ fontSize: 15 }} >{incharge_remarks} </Typography>
                                                                    </CssVarsProvider>
                                                                </Box> : null
                                                    }
                                                </Box> : <Box>
                                                    <CssVarsProvider>
                                                        <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Requested By Incharge </Typography>
                                                    </CssVarsProvider>
                                                </Box>
                                            }

                                            <Divider
                                                // variant="middle"
                                                sx={{ my: 0.8 }} />
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                pl: 1, pr: 0.5, pb: 0.5,
                                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                                            }}>
                                                <Box
                                                    sx={{
                                                        // pl: 1,
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <CssVarsProvider>
                                                        <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Head Of the Department :
                                                            {
                                                                hod_approve === 1 ?
                                                                    <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> {approve_hod}
                                                                    </Typography> : hod_approve === 2 ?
                                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="danger" variant="outlined"> {approve_hod}
                                                                        </Typography> : hod_approve === 3 ?
                                                                            <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="primary" variant="outlined"> {approve_hod}
                                                                            </Typography> : null
                                                            }
                                                        </Typography>
                                                    </CssVarsProvider>
                                                    {
                                                        hoddate !== null ? <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: 'row',
                                                                justifyContent: "space-evenly",
                                                                pr: 2
                                                            }}>
                                                            <CssVarsProvider>
                                                                <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }}>{hoddate !== null ? hoddate : "Not Update"}</Typography>
                                                                <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                                <Typography ml={2} mb={0.5} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>    {hod_user !== null ? hod_user.toLowerCase() : null} </Typography>
                                                            </CssVarsProvider>   </Box> : null
                                                    }

                                                </Box>
                                                {
                                                    hod_approve === 1 ? <Box sx={{ width: "100%" }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification/ Requirement Description: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                        </CssVarsProvider>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detailed Analysis of Requirement: </Typography>
                                                            <Typography ml={10} sx={{ fontSize: 15 }} >{hod_detial_analysis} </Typography>
                                                        </CssVarsProvider> </Box> :
                                                        hod_approve === 2 ? <Box sx={{ width: "100%" }}>
                                                            <CssVarsProvider>
                                                                <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for Reject: </Typography>
                                                                <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                            </CssVarsProvider>
                                                        </Box> :
                                                            hod_approve === 3 ? <Box sx={{ width: "100%" }}>
                                                                <CssVarsProvider>
                                                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} >Detail Justification for On-Hold: </Typography>
                                                                    <Typography ml={10} sx={{ fontSize: 15 }} >{hod_remarks} </Typography>
                                                                </CssVarsProvider>
                                                            </Box> : null
                                                }
                                            </Box>
                                        </Box>
                                            : <Box>
                                                <CssVarsProvider>
                                                    <Typography ml={10} sx={{ fontSize: 15, fontWeight: 500 }} >Requested By Head Of The Department </Typography>
                                                </CssVarsProvider>
                                            </Box>
                                    }
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ width: "100%", mt: 0 }}>
                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <CustomPaperTitle heading="Remarks" />
                                    <Box sx={{
                                        display: 'flex',
                                        p: 0.5,
                                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >
                                        <CustomTextarea
                                            required
                                            type="text"
                                            size="sm"
                                            style={{
                                                width: "100%",
                                                height: 70,
                                            }}
                                            value={remark}
                                            onchange={updateRemark}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                        <Box sx={{ display: 'flex', width: '200px', pt: 1 }}>
                            <Box sx={{ pt: 1 }}>
                                <CustomPaperTitle heading="Maximum Size 2MB" />
                                <label htmlFor="file-input">
                                    <CustomeToolTip title="upload">
                                        <IconButton color="primary" aria-label="upload file" component="span">
                                            <UploadFileIcon />
                                        </IconButton>
                                    </CustomeToolTip>
                                </label>
                                <Input
                                    id="file-input"
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .pdf"
                                    style={{ display: 'none' }}
                                    onChange={uploadFile}
                                />
                            </Box>
                            {
                                selectFile && selectFile.map((val, index) => {
                                    return <Box sx={{ display: "flex", flexDirection: "row", ml: 2, pt: 2 }}
                                        key={index} >
                                        <Box >{val.name}</Box>
                                        <Box sx={{ ml: .3 }}><CloseIcon sx={{ height: '18px', width: '20px', cursor: 'pointer' }}
                                            onClick={() => handleRemoveFile(index)}
                                        /></Box>

                                    </Box>
                                }
                                )}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={submit} >Save</Button>
                        <Button onClick={Close} color="secondary" >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Fragment >
    )
}

export default memo(CRFDataCollectinModel)