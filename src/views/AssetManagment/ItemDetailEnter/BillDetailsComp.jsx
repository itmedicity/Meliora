import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'

// import imageCompression from 'browser-image-compression';
// import UploadFileIcon from '@mui/icons-material/UploadFile'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'


const BillDetailsComp = ({ detailArry, grndetailarry, exist, setExist, assetSpare }) => {
    const { am_item_map_slno, am_spare_item_map_slno } = detailArry
    const { am_bill_no, am_bill_date, am_bill_amount, am_bill_vendor_detail, am_bill_image } = grndetailarry
    // const [selectFile, setSelectFile] = useState(null)
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


    // const uploadFile = async (event) => {
    //     const file = event.target.files[0];
    //     setSelectFile(file);
    //     const options = {
    //         maxSizeMB: 1,
    //         maxWidthOrHeight: 1920
    //     }
    //     const compressedFile = await imageCompression(file, options);
    //     setSelectFile(compressedFile);
    // };

    // const ViewImage = useCallback(() => {

    // }, [])


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



    const EditDetails = useCallback((e) => {
        e.preventDefault()
        const checkinsertOrNot = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_bill_no, am_bill_date, am_bill_amount, am_bill_vendor_detail, am_bill_image } = data[0]
                const frmdata = {
                    billNo: am_bill_no !== null ? am_bill_no : '',
                    billDate: am_bill_date !== null ? format(new Date(am_bill_date), "yyyy-MM-dd") : '',
                    billamount: am_bill_amount !== null ? am_bill_amount : '',
                    bill_vendor_detail: am_bill_vendor_detail !== null ? am_bill_vendor_detail : '',
                    billImage: am_bill_image !== null ? am_bill_image : 0
                }
                setBillData(frmdata);
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const checkinsertOrNotSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_bill_no, am_bill_date, am_bill_amount, am_bill_vendor_detail, am_bill_image } = data[0]
                const frmdata = {
                    billNo: am_bill_no !== null ? am_bill_no : '',
                    billDate: am_bill_date !== null ? format(new Date(am_bill_date), "yyyy-MM-dd") : '',
                    billamount: am_bill_amount !== null ? am_bill_amount : '',
                    bill_vendor_detail: am_bill_vendor_detail !== null ? am_bill_vendor_detail : '',
                    billImage: am_bill_image !== null ? am_bill_image : 0
                }
                setBillData(frmdata);
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const updateGRNDetails = async (billpatchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillDetailsUpdate', billpatchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }

        const updateGRNDetailsSpare = async (billpatchDataSpare) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillDetailsUpdateSpare', billpatchDataSpare);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }



        if (billNo === '' && billDate === '' && billamount === '' && bill_vendor_detail === '') {
            if (assetSpare === 1) {
                checkinsertOrNot(am_item_map_slno)
            } else {
                checkinsertOrNotSpare(am_spare_item_map_slno)
            }

        }
        else {
            if (assetSpare === 1) {
                updateGRNDetails(billpatchData)
            } else {
                updateGRNDetailsSpare(billpatchDataSpare)
            }

        }

    }, [billNo, billDate, billamount, bill_vendor_detail, am_item_map_slno, billpatchData, assetSpare,
        am_spare_item_map_slno, billpatchDataSpare])


    const BillRefresh = useCallback(() => {
        reset()
    }, [])
    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            }} >
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
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
                {/* <Box sx={{ display: 'flex', width: '10%', pt: 1.2 }}>
                    <Box sx={{ pt: 1 }}>
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
                    {selectFile !== null ?
                        <Box sx={{ pt: 1.5 }}>

                            <Button onClick={ViewImage} variant="contained"
                                size="small" color="primary">View Image</Button>

                        </Box> : null
                    }

                    {billImage === 1 ?
                        <Box sx={{ pt: 1.5 }}>
                            <Button onClick={ViewImage} variant="contained"
                                size="small" color="primary">View Image</Button>
                        </Box> : null
                    }

                </Box> */}

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
        </Paper>
    )
}

export default memo(BillDetailsComp)