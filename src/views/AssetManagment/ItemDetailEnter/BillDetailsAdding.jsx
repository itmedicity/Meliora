import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import ImageDisplayModal from 'src/views/CentralRequestManagement/CRFRequestMaster/ImageDisplayModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import SupplierSelectMaster from './SupplierSelectMaster';
import { useDispatch } from 'react-redux'
import { getSupplierList } from 'src/redux/actions/AmSupplierListSelect'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BillAddMaster from './BillAddMaster';
import BillAddingModal from './BillAddingModal';

const BillDetailsAdding = ({ detailArry, grndetailarry, assetSpare }) => {
    const { am_item_map_slno, am_spare_item_map_slno, } = detailArry
    const { am_bill_mast_slno, am_bill_mastslno, am_bill_no, am_bill_date, am_bill_amount, am_bill_image,
        bill_supplier_name } = grndetailarry
    const dispatch = useDispatch();
    const [supplier, setSupplier] = useState(0)
    const [billDate, setBillDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [billDetailFlag, setBillDetailFlag] = useState(0)
    const [billAmount, setBillAmount] = useState()
    const [BillDtl, setBillDetail] = useState({
        billNo: '',
        billdate: format(new Date(), "yyyy-MM-dd"),
        vendor: '',
        billImage: '',
        bill_mastslno: ''
    })
    //Destructuring
    const { billNo, billdate, vendor, billImage, bill_mastslno } = BillDtl

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const [AddBillFlg, setBillFlg] = useState(0)

    const updateBillAmount = useCallback((e) => {
        setBillAmount(e.target.value)
    }, [])

    const [SupplerModal, setSupplerModal] = useState(0)
    const [BillArray, setBillArray] = useState([])

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    useEffect(() => {
        dispatch(getSupplierList())
    }, [dispatch])

    useEffect(() => {
        if (am_bill_mast_slno !== null && am_bill_mast_slno !== undefined) {
            setBillDetailFlag(1)
            const fromSetting = {
                billNo: am_bill_no,
                billdate: am_bill_date,
                vendor: bill_supplier_name,
                billImage: am_bill_image,
                bill_mastslno: am_bill_mastslno
            }
            setBillDetail(fromSetting)
            setBillAmount(am_bill_amount)
        }

    }, [am_bill_mast_slno, am_bill_no, am_bill_date, am_bill_amount, bill_supplier_name, am_bill_image,
        am_bill_mastslno])

    const updateBillDate = useCallback((e) => {
        setBillDate(e.target.value)
    }, [])

    const searchdata = useMemo(() => {
        return {
            am_bill_supplier: supplier,
            am_bill_date: billDate,
        }
    }, [billDate, supplier])


    const searchBillList = useCallback(() => {
        const gettingData = async (searchdata, am_bill_mast_slno) => {
            const result = await axioslogin.post('/ItemMapDetails/GetBillBySupplNDate', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                setBillArray(data);
                setSupplerModal(1)
            } else {
                warningNotify("No Bill Added in selected conditions")
                setBillArray([])
                setSupplerModal(2)
                if (am_bill_mast_slno === null || am_bill_mast_slno === undefined) {

                    const resetdata = {
                        billNo: '',
                        billdate: format(new Date(), "yyyy-MM-dd"),
                        vendor: '',
                        billImage: '',
                        bill_mastslno: ''
                    }
                    setBillDetail(resetdata)
                }
            }
        }
        if (supplier === 0) {
            warningNotify("Please Select supplier before search")
        } else {
            gettingData(searchdata, am_bill_mast_slno)
        }

    }, [searchdata, am_bill_mast_slno, supplier])


    const AddBillMaster = useCallback(() => {
        setBillFlg(1)
    }, [])

    const rowSelect = useCallback((value) => {
        const { am_bill_date, am_bill_image, am_bill_mastslno, am_bill_no, it_supplier_name
        } = value

        const fromdataset = {
            billNo: am_bill_no,
            billdate: format(new Date(am_bill_date), "yyyy-MM-dd"),
            vendor: it_supplier_name,
            billImage: am_bill_image,
            bill_mastslno: am_bill_mastslno
        }

        setBillDetail(fromdataset)
        setBillDetailFlag(1)

    }, [])


    const ViewBillImage = useCallback(() => {
        const getImage = async (bill_mastslno) => {
            const result = await axioslogin.get(`/AssetFileUpload/BillMasterImageView/${bill_mastslno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/BillMaster/${bill_mastslno}/${fileName}`;
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
        getImage(bill_mastslno)
    }, [bill_mastslno])
    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const billpatchData = useMemo(() => {
        return {
            am_bill_mast_slno: bill_mastslno,
            am_bill_amount: billAmount,
            edit_user: id,
            am_item_map_slno: am_item_map_slno
        }
    }, [bill_mastslno, billAmount, id, am_item_map_slno])

    const billpatchDataSpare = useMemo(() => {
        return {
            am_bill_mast_slno: bill_mastslno,
            am_bill_amount: billAmount,
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno
        }
    }, [bill_mastslno, billAmount, id, am_spare_item_map_slno])

    const SaveBillDetails = useCallback((e) => {
        e.preventDefault()
        const updateBillDetails = async (billpatchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/BillDetailsUpdate', billpatchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setBillArray([]);
                setSupplerModal(0)
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
                setBillArray([]);
                setSupplerModal(0)
            }
            else {
                warningNotify(message)
            }
        }

        if (bill_mastslno === '') {
            warningNotify("Please Select Any Bill before save")
        } else {
            if (assetSpare === 1) {
                updateBillDetails(billpatchData)
            } else {
                updateBillDetailsSpare(billpatchDataSpare)
            }
        }
    }, [billpatchData, assetSpare, billpatchDataSpare, bill_mastslno])

    const BillReferesh = useCallback(() => {
        const resetfrm = {
            billNo: '',
            billdate: format(new Date(), "yyyy-MM-dd"),
            vendor: '',
            billImage: '',
            bill_mastslno: ''
        }
        setBillDetail(resetfrm)
    }, [])

    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            {AddBillFlg === 1 ? <BillAddMaster setBillFlg={setBillFlg}
            /> : null}
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
            <Box sx={{
                display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
            }} >

                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }} >
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Select Supplier</Typography>
                        <Box>
                            <SupplierSelectMaster
                                supplier={supplier}
                                setSupplier={setSupplier}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '15%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Date</Typography>
                        <Box>
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="billDate"
                                value={billDate}
                                onchange={updateBillDate}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchBillList} >
                            <SearchOutlinedIcon fontSize='small' />
                        </CusIconButton>
                    </Box>

                    {SupplerModal === 1 ? <Box sx={{ display: 'flex', width: "60%", pt: 1, pl: 3, }}>
                        <BillAddingModal BillArray={BillArray} rowSelect={rowSelect} />
                    </Box>
                        :
                        SupplerModal === 2 ?
                            <Box sx={{ display: 'flex', width: "25%", height: 50, pt: 3, pl: 3 }}>
                                <Button onClick={AddBillMaster} variant="contained"
                                    size="small" color="primary">AddBill</Button>
                            </Box>
                            : <Box sx={{ display: 'flex', width: "25%", height: 50, pt: 3, pl: 3 }}>
                                <Button onClick={AddBillMaster} variant="contained"
                                    size="small" color="primary">AddBill</Button>
                            </Box>
                    }

                </Box>

                {billDetailFlag === 1 ?
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
                                    disabled={true}
                                ></TextFieldCustom>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Date</Typography>
                            <Box>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="billdate"
                                    value={billdate}
                                    disabled={true}
                                ></TextFieldCustom>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Vendor </Typography>
                            <Box>
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="vendor"
                                    value={vendor}
                                    disabled={true}
                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Bill Amount</Typography>
                            <Box>
                                <TextFieldCustom
                                    type="number"
                                    size="sm"
                                    name="billAmount"
                                    value={billAmount}
                                    onchange={updateBillAmount}
                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        {
                            billImage === 1 ?
                                <Box sx={{ display: 'flex', width: "30%", height: 55, pt: 3, pl: 1 }}>
                                    <Button onClick={ViewBillImage} variant="contained"
                                        size="small" color="primary">View Image</Button>
                                </Box> : null
                        }
                    </Box> : null}

                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }} >
                    <CustomeToolTip title="Save" placement="left" >
                        <Box sx={{ width: '3%', pl: 1, pt: 2, pb: 1 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveBillDetails} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>

                    <CustomeToolTip title="Refresh" placement="right" >
                        <Box sx={{ width: '3%', pl: 0.5, pt: 2, pb: 1 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={BillReferesh} >
                                <RefreshIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(BillDetailsAdding)