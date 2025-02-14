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
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { format } from 'date-fns'
import SupplierSelectMaster from './SupplierSelectMaster';
import LeaseAddMast from './LeaseAddMast';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LeaseAddingModal from './LeaseAddingModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageDisplayModal from 'src/views/CentralRequestManagement/ComonComponent/ImageUploadCmp/ImageDisplayModal';

const LeaseDetailsAdd = ({ grndetailarry }) => {
    const { am_item_map_detl_slno, am_lease_mast_slno,
        am_lease_mastslno, lease_suppliername, lease_fromdate, lease_todate, lease_image, lease_amount
    } = grndetailarry
    // const [leaseFile, setLeaseFile] = useState(null)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [LeaseStatus, setLeaseStatus] = useState(false)
    const [supplier, setSupplier] = useState(0)
    const [billDate, setBillDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [SupplerModal, setSupplerModal] = useState(0)
    const [BillArray, setBillArray] = useState([])


    const [leaseDetail, setLeaseDetal] = useState({
        sup_name: '',
        lease_from: '',
        lease_to: '',
        lease_Amount: '',
        leaseImage: '',
        leaseSlno: ''
    })
    const { sup_name, lease_from, lease_to, lease_Amount, leaseImage, leaseSlno } = leaseDetail

    const updateLeaseStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setLeaseStatus(true)
        } else {
            setLeaseStatus(false)
        }

    }, [])

    const updateBillDate = useCallback((e) => {
        setBillDate(e.target.value)
    }, [])

    useEffect(() => {
        if (am_lease_mast_slno !== null && am_lease_mast_slno !== undefined) {
            setLeaseDetailFlag(1)
            const fromSetting = {
                sup_name: lease_suppliername,
                lease_from: lease_fromdate,
                lease_to: lease_todate,
                lease_Amount: lease_amount,
                leaseImage: lease_image,
                leaseSlno: am_lease_mastslno
            }
            setLeaseDetal(fromSetting)
            setLeaseStatus(true)
        }

    }, [lease_suppliername, lease_fromdate, lease_todate, lease_amount, am_lease_mastslno, lease_image, am_lease_mast_slno])


    const searchdata = useMemo(() => {
        return {
            lease_suppler_slno: supplier,
            lease_fromdate: billDate,
        }
    }, [billDate, supplier])


    const searchLease = useCallback(() => {
        const gettingData = async (searchdata) => {
            const result = await axioslogin.post('/ItemMapDetails/GetLeaseBySupplNDate', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                setBillArray(data);
                setSupplerModal(1)
            } else {
                warningNotify("No Lease details added under selected conditions")
                setBillArray([])
                setSupplerModal(2)
            }

        }

        if (supplier === 0) {
            warningNotify("Please Select any supplier")
        } else {
            gettingData(searchdata)
        }
    }, [searchdata, supplier])

    const [LeaseDetailFlag, setLeaseDetailFlag] = useState(0)

    const rowSelect = useCallback((value) => {

        const { it_supplier_name, lease_fromdate, lease_todate, lease_amount, lease_image, am_lease_mastslno } = value

        const frmdataset = {
            sup_name: it_supplier_name,
            lease_from: lease_fromdate,
            lease_to: lease_todate,
            lease_Amount: lease_amount,
            leaseImage: lease_image,
            leaseSlno: am_lease_mastslno
        }
        setLeaseDetal(frmdataset)
        setLeaseDetailFlag(1)
    }, [])

    const [AddLeaseFlg, setLeaseFlg] = useState(0)

    const AddLeaseMaster = useCallback(() => {
        setLeaseFlg(1)
    }, [])

    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const ViewLeaseImage = useCallback(() => {
        const getImage = async (leaseSlno) => {
            const result = await axioslogin.get(`/AssetFileUpload/LeaseMasterImageView/${leaseSlno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/LeaseMaster/${leaseSlno}/${fileName}`;
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
        getImage(leaseSlno)

    }, [leaseSlno])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    const LeasepatchData = useMemo(() => {
        return {
            am_lease_mast_slno: leaseSlno,
            edit_user: id,
            am_item_map_detl_slno: am_item_map_detl_slno
        }
    }, [am_item_map_detl_slno, id, leaseSlno])


    const SaveLeaseDetails = useCallback((e) => {
        e.preventDefault()
        const updateLeaseDetails = async (LeasepatchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/AMLeaseDetailsUpdate', LeasepatchData);
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
        if (leaseSlno !== '') {
            updateLeaseDetails(LeasepatchData)
        } else {
            warningNotify("Please select Lease before save")
        }
    }, [LeasepatchData, leaseSlno])

    const LeaseReferesh = useCallback(() => {
        const fromSetting = {
            sup_name: '',
            lease_from: '',
            lease_to: '',
            lease_Amount: '',
            leaseImage: '',
            leaseSlno: ''
        }
        setLeaseDetal(fromSetting)
        setLeaseDetailFlag(0)
        setLeaseStatus(false)
        setSupplier(0)
        setBillDate(format(new Date(), "yyyy-MM-dd"))
        setSupplerModal(0)
        setBillArray([])
        setLeaseFlg(0)
        setImageShowFlag(0)
        setImageArry([])
        setImageShow(false)
    }, [])


    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            {AddLeaseFlg === 1 ? <LeaseAddMast setLeaseFlg={setLeaseFlg}
            /> : null}
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
            <Box sx={{
                display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
            }} >
                <Box sx={{ display: 'flex', width: '7%', p: 0.5, py: 2, flexDirection: 'column' }} >
                    <CusCheckBox
                        variant="outlined"
                        color="danger"
                        size="md"
                        name="LeaseStatus"
                        label="Lease"
                        value={LeaseStatus}
                        onCheked={updateLeaseStatus}
                        checked={LeaseStatus}
                    />
                </Box>

                {
                    LeaseStatus === true ?
                        <Box sx={{
                            display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap',
                        }}>

                            <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Select Supplier</Typography>
                                <Box>
                                    <SupplierSelectMaster
                                        supplier={supplier}
                                        setSupplier={setSupplier}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '12%', p: 0.5, flexDirection: 'column' }} >
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
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchLease} >
                                    <SearchOutlinedIcon fontSize='small' />
                                </CusIconButton>
                            </Box>

                            {SupplerModal === 1 ? <Box sx={{ display: 'flex', width: "60%", pt: 1, pl: 1, pb: 1 }}>
                                <LeaseAddingModal BillArray={BillArray} rowSelect={rowSelect} />
                            </Box>
                                :
                                SupplerModal === 2 ?
                                    <Box sx={{ display: 'flex', width: "25%", height: 50, pt: 3, pl: 3 }}>
                                        <Button onClick={AddLeaseMaster} variant="contained"
                                            size="small" color="primary">Add Lease</Button>
                                    </Box>
                                    : null
                            }

                        </Box> : null
                }

                {
                    LeaseDetailFlag === 1 ?
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                        }} >

                            <Box sx={{ display: 'flex', width: '30%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Supplier Name</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="sup_name"
                                        value={sup_name}
                                        disabled={true}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '15%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >From Date</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="lease_from"
                                        value={lease_from}
                                        disabled={true}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '15%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Date</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="lease_to"
                                        value={lease_to}
                                        disabled={true}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '15%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Lease Amount</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="lease_Amount"
                                        value={lease_Amount}
                                        disabled={true}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            {
                                leaseImage === 1 ?
                                    <Box sx={{ display: 'flex', width: "20%", height: 55, pt: 3, pl: 1 }}>
                                        <Button onClick={ViewLeaseImage} variant="contained"
                                            size="small" color="primary">View Image</Button>
                                    </Box> : null
                            }

                        </Box> : null

                }
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }} >
                    <CustomeToolTip title="Save" placement="left" >
                        <Box sx={{ width: '3%', pl: 1, pt: 2, pb: 1 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveLeaseDetails} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>

                    <CustomeToolTip title="Refresh" placement="right" >
                        <Box sx={{ width: '3%', pl: 0.5, pt: 2, pb: 1 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={LeaseReferesh} >
                                <RefreshIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(LeaseDetailsAdd)