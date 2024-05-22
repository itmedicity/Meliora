import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, IconButton, Paper, Button, Input } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close';
import ImageDisplayModal from 'src/views/CentralRequestManagement/CRFRequestMaster/ImageDisplayModal';
import imageCompression from 'browser-image-compression';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const BillDetailsComp = ({ detailArry, grndetailarry, exist, setExist, assetSpare }) => {
    const { am_item_map_slno, am_spare_item_map_slno, } = detailArry
    const { am_bill_no, am_bill_date, am_bill_amount, am_bill_vendor_detail, am_bill_image,
        am_item_map_detl_slno } = grndetailarry
    const [selectFile, setSelectFile] = useState([])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [billdata, setBillData] = useState({
        billNo: '',
        billDate: '',
        billamount: '',
        bill_vendor_detail: '',
        billImage: 0
    })

    useEffect(() => {
        if (am_bill_no !== undefined || am_bill_date !== undefined || am_bill_amount !== undefined ||
            am_bill_vendor_detail !== undefined || am_bill_image !== undefined) {

            const frmdata = {
                billNo: am_bill_no !== null ? am_bill_no : '',
                billDate: am_bill_date !== null ? format(new Date(am_bill_date), "yyyy-MM-dd") : '',
                billamount: am_bill_amount !== null ? am_bill_amount : '',
                bill_vendor_detail: am_bill_vendor_detail !== null ? am_bill_vendor_detail : '',
                billImage: am_bill_image !== null ? am_bill_image : ''
            }
            setBillData(frmdata);
        }
    }, [am_bill_no, am_bill_date, am_bill_amount, am_bill_vendor_detail, am_bill_image])


    //Destructuring
    const { billNo, billDate, billamount, bill_vendor_detail } = billdata
    const updateBillDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setBillData({ ...billdata, [e.target.name]: value })
    }, [billdata])


    const billpatchData = useMemo(() => {
        return {
            am_bill_no: billNo !== '' ? billNo : null,
            am_bill_date: billDate !== '' ? billDate : null,
            am_bill_amount: billamount !== '' ? billamount : null,
            am_bill_vendor_detail: bill_vendor_detail !== '' ? bill_vendor_detail : null,
            am_bill_image: 1,
            // am_bill_image: selectFile !== null ? 1 : 0,
            edit_user: id,
            am_item_map_slno: am_item_map_slno
        }
    }, [billNo, billDate, billamount, bill_vendor_detail, id, am_item_map_slno])

    const billpatchDataSpare = useMemo(() => {
        return {
            am_bill_no: billNo !== '' ? billNo : null,
            am_bill_date: billDate !== '' ? billDate : null,
            am_bill_amount: billamount !== '' ? billamount : null,
            am_bill_vendor_detail: bill_vendor_detail !== '' ? bill_vendor_detail : null,
            am_bill_image: 1,
            // am_bill_image: selectFile !== null ? 1 : 0,
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno
        }
    }, [billNo, billDate, billamount, bill_vendor_detail, id, am_spare_item_map_slno])

    const reset = () => {
        const frmdata = {
            billNo: '',
            billDate: '',
            billamount: '',
            bill_vendor_detail: '',
            bill_image: 0
        }
        setBillData(frmdata)
    }

    const uploadFile = useCallback(async (e) => {
        if (e.target.files[0].type === "application/pdf") {
            if ((e.target.files[0].size) > 2000000) {
                warningNotify("File Size Is to Large")
            } else {
                const newFiles = [...selectFile]
                newFiles.push(e.target.files[0])
                setSelectFile(newFiles)
            }

        } else {
            const newFiles = [...selectFile]
            newFiles.push(e.target.files[0])
            setSelectFile(newFiles)
        }

    }, [selectFile, setSelectFile])


    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 25,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)
        return compressedFile
    }, []);

    const EditDetails = useCallback((e) => {
        e.preventDefault()
        const updateBillDetails = async (billpatchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillDetailsUpdate', billpatchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }
        const updateBillDetailsSpare = async (billpatchDataSpare) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillDetailsUpdateSpare', billpatchDataSpare);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }

        const FileInsert = async (selectFile, am_item_map_detl_slno) => {
            try {
                const formData = new FormData();
                formData.append('id', am_item_map_detl_slno);
                for (const file of selectFile) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file);
                        formData.append('files', compressedFile, compressedFile.name);
                    } else {
                        formData.append('files', file, file.name);
                    }
                }
                // Use the Axios instance and endpoint that matches your server setup
                const result = await axioslogin.post('/AssetFileUpload/asset/BillUpload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return result.data
            } catch (error) {
                warningNotify('An error occurred during file upload.');

            }
        }

        if (assetSpare === 1) {
            updateBillDetails(billpatchData)
            FileInsert(selectFile, am_item_map_detl_slno).then((val) => {
                const { success, message } = val
                if (success === 1) {
                    succesNotify(message)
                    setSelectFile([])
                    reset()
                }
                else {
                    warningNotify(message)
                }
            })
        } else {
            updateBillDetailsSpare(billpatchDataSpare)
        }
    }, [billpatchData, assetSpare, billpatchDataSpare, selectFile, am_item_map_detl_slno, handleImageUpload])

    const BillRefresh = useCallback(() => {
        reset()
    }, [])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const handleRemoveFile = (index) => {
        setSelectFile((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1); // Remove the file at the specified index
            return updatedFiles;
        });
    };


    const ViewBillImage = useCallback(() => {
        const getImage = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/AssetFileUpload/AssetBillView/${am_item_map_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/${am_item_map_slno}/Bill/${fileName}`;
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
        }
        getImage(am_item_map_slno)

    }, [am_item_map_slno])

    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            }} >
                <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill No</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="billNo"
                            value={billNo}
                            onchange={updateBillDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Date</Typography>
                    <Box>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="billDate"
                            value={billDate}
                            onchange={updateBillDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column', ml: 0.5 }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Amount</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="billamount"
                            value={billamount}
                            onchange={updateBillDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Vendor Details</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="bill_vendor_detail"
                            value={bill_vendor_detail}
                            onchange={updateBillDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{
                    width: "25%", display: "flex", flexDirection: "row", pl: 1,
                }}>
                    <Box sx={{ display: 'flex', width: "75%", pt: 2 }}>
                        <Box >
                            <label htmlFor="file-input">
                                <CustomeToolTip title="upload">
                                    <IconButton color="primary" aria-label="upload file" component="span">
                                        <UploadFileIcon />
                                        <CustomPaperTitle heading="Maximum Size 25MB" />
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

                    </Box>
                    {
                        am_bill_image === 1 ?
                            <Box sx={{ display: 'flex', width: "25%", height: 50, pt: 1 }}>
                                <Button onClick={ViewBillImage} variant="contained"
                                    size="small" color="primary">View Image</Button>
                            </Box> : null
                    }
                </Box>
                <CustomeToolTip title="Save" placement="top" >
                    <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails} >
                            <LibraryAddIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
                <CustomeToolTip title="Refresh" placement="top" >
                    <Box sx={{ width: '3%', pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={BillRefresh} >
                            <RefreshIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
            </Box>

            {selectFile.length !== 0 ?
                < Paper sx={{
                    width: '100%', mt: 0.8
                }} variant='outlined'>
                    <Box sx={{
                        width: "100%", display: "flex", flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                    }}>
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
                </Paper> : null
            }
        </Paper>
    )
}

export default memo(BillDetailsComp)