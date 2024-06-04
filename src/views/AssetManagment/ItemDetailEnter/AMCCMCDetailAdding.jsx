import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { addDays, format } from 'date-fns'
import { getAmcCmcMaster } from 'src/redux/actions/AmAmcCmcSlect.action';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SupplierSelectMaster from './SupplierSelectMaster';
import AMCCMCAddingModal from './AMCCMCAddingModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageDisplayModal from 'src/views/CentralRequestManagement/CRFRequestMaster/ImageDisplayModal';
import AmcCmcAdding from './AmcCmcAdding';

const AMCCMCDetailAdding = ({ detailArry, amcPm, setAmcPm, amcPmarry }) => {

    const { am_item_map_slno } = detailArry
    const { amc_slno } = amcPmarry
    const dispatch = useDispatch();
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [amcStatus, setamcStatus] = useState(false)
    const [cmcStatus, setcmcStatus] = useState(false)
    const [pmStatus, setPmStatus] = useState(false)
    const [dueDate, setdueDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [dueDateCount, setdueDateCount] = useState(0)
    const [instalationDate, setinstalationDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [supplier, setSupplier] = useState(0)
    const [billDate, setBillDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [SupplerModal, setSupplerModal] = useState(0)
    const [AmcCmcArray, setAmcCmcArray] = useState([])
    const [AddnewAmcFlg, setNewAMCFlg] = useState(0)
    const [amcCmcDetailFlag, setamcCmcDetailFlag] = useState(0)
    const [amcCmcDetail, setamcCmcDetal] = useState({
        sup_name: '',
        amccmc_from: '',
        amccmc_to: '',
        amcImage: '',
        amcCmcSlno: ''
    })
    const { sup_name, amccmc_from, amccmc_to, amcImage, amcCmcSlno } = amcCmcDetail
    const UpdateinstalationDate = useCallback((e) => {
        setinstalationDate(e.target.value)
    }, [])

    const reset = useCallback(() => {
        setSupplier(0)
        setBillDate(format(new Date(), "yyyy-MM-dd"))
        setSupplerModal(0)
        setAmcCmcArray([])
    }, [])

    const updateamcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setamcStatus(true)
            setcmcStatus(false)
            reset()
            dispatch(getAmcCmcMaster())
        } else {
            setamcStatus(false)
            setcmcStatus(false)
        }
    }, [dispatch, reset])

    const updatecmcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setcmcStatus(true)
            setamcStatus(false)
            reset()
            dispatch(getAmcCmcMaster())
        } else {
            setcmcStatus(false)
            setamcStatus(false)
        }
    }, [dispatch, reset])

    const updatepmStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setPmStatus(true)
        } else {
            setPmStatus(false)
        }
    }, [])

    const updateBillDate = useCallback((e) => {
        setBillDate(e.target.value)
    }, [])

    const UpdatedueDateCount = useCallback((e) => {
        setdueDateCount(e.target.value)
        const Due = addDays(new Date(instalationDate), e.target.value)
        setdueDate(format(new Date(Due), "yyyy-MM-dd"))
    }, [instalationDate])

    useEffect(() => {
        const { pm_status, instalation_date, due_date, amc_status, cmc_status,
            it_supplier_name, from_date, to_date, image_upload, amc_slno
        } = amcPmarry
        setPmStatus(pm_status === 1 ? true : false)
        setdueDate(due_date)
        setamcStatus(amc_status === 1 ? true : false)
        setcmcStatus(cmc_status === 1 ? true : false)
        setinstalationDate(instalation_date)
        if (amc_slno !== undefined) {
            const frmsetting = {
                sup_name: it_supplier_name,
                amccmc_from: from_date,
                amccmc_to: to_date,
                amcImage: image_upload,
                amcCmcSlno: amc_slno
            }
            setamcCmcDetal(frmsetting)
            setamcCmcDetailFlag(1)
        }
    }, [amcPmarry])

    const AmcPmReferesh = useCallback(() => {
        reset()
    }, [reset])

    const searchdata = useMemo(() => {
        return {
            suplier_slno: supplier,
            from_date: billDate,
        }
    }, [billDate, supplier])


    const searchAMCList = useCallback(() => {
        const gettingData = async (searchdata, amc_slno) => {
            const result = await axioslogin.post('/ItemMapDetails/GetAMCBySupplNDate', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                setAmcCmcArray(data);
                setSupplerModal(1)
            } else {
                warningNotify("No Bill Added in selected conditions")
                setAmcCmcArray([])
                setSupplerModal(2)
                if (amc_slno === null || amc_slno === undefined) {
                    const setformdata = {
                        sup_name: '',
                        amccmc_from: '',
                        amccmc_to: '',
                        amcImage: '',
                        amcCmcSlno: ''
                    }
                    setamcCmcDetal(setformdata)
                    setamcCmcDetailFlag(0)
                }
            }
        }
        if (supplier === 0) {
            warningNotify("Please select supplier before search")
        } else {
            gettingData(searchdata, amc_slno)
        }

    }, [searchdata, amc_slno, supplier])

    const searchCMCList = useCallback(() => {
        const gettingData = async (searchdata, amc_slno) => {
            const result = await axioslogin.post('/ItemMapDetails/GetCMCBySupplNDate', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                setAmcCmcArray(data);
                setSupplerModal(1)
            } else {
                warningNotify("No Bill Added in selected conditions")
                setAmcCmcArray([])
                setSupplerModal(2)
                if (amc_slno === null || amc_slno === undefined) {
                    const setformdata = {
                        sup_name: '',
                        amccmc_from: '',
                        amccmc_to: '',
                        amcImage: '',
                        amcCmcSlno: ''
                    }
                    setamcCmcDetal(setformdata)
                    setamcCmcDetailFlag(0)
                }
            }
        }
        gettingData(searchdata, amc_slno)
    }, [searchdata, amc_slno])


    const rowSelect = useCallback((value) => {
        const { amccmc_slno, it_supplier_name, from_date, to_date, image_upload } = value
        const frmsetting = {
            sup_name: it_supplier_name,
            amccmc_from: from_date,
            amccmc_to: to_date,
            amcImage: image_upload,
            amcCmcSlno: amccmc_slno
        }
        setamcCmcDetal(frmsetting)
        setamcCmcDetailFlag(1)
    }, [])


    const AddAMCMaster = useCallback(() => {
        setNewAMCFlg(1)
    }, [])

    const AddCMCMaster = useCallback(() => {
        setNewAMCFlg(1)
    }, [])

    const postdata = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            instalation_date: instalationDate,
            due_date: dueDate,
            pm_status: pmStatus === true ? 1 : 0,
            create_user: id,
            amc_slno: amcCmcSlno === '' ? null : amcCmcSlno
        }
    }, [am_item_map_slno, amcStatus, cmcStatus, instalationDate, dueDate,
        pmStatus, id, amcCmcSlno])

    const patchData = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            instalation_date: instalationDate,
            due_date: dueDate,
            pm_status: pmStatus === true ? 1 : 0,
            edit_user: id,
            amc_slno: amcCmcSlno === '' ? null : amcCmcSlno
        }
    }, [am_item_map_slno, amcStatus, cmcStatus, instalationDate, dueDate,
        pmStatus, id, amcCmcSlno])


    const SaveAMCPMDetails = useCallback((e) => {
        e.preventDefault()
        const InsertAMCPMDetail = async (postdata) => {
            const result = await axioslogin.post('/ItemMapDetails/AmcPmInsert', postdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setAmcPm(1)
            } else {
                infoNotify(message)
            }
        }

        const updateAMCPMDetails = async (patchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/AmcPmUpdate', patchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
        }

        if (amcPm === 0) {
            InsertAMCPMDetail(postdata);
        } else {
            updateAMCPMDetails(patchData);
        }
    }, [amcPm, postdata, patchData, setAmcPm])


    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const ViewAmcCmcImage = useCallback(() => {
        const getImage = async (amcCmcSlno) => {
            const result = await axioslogin.get(`/AssetFileUpload/AmcCmcImageView/${amcCmcSlno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/AMCCMC/${amcCmcSlno}/${fileName}`;
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
        getImage(amcCmcSlno)

    }, [amcCmcSlno])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            {AddnewAmcFlg === 1 ? <AmcCmcAdding setNewAMCFlg={setNewAMCFlg}
                setSupplierdetl={setSupplier} setBillDate={setBillDate}
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
                        <CusCheckBox
                            variant="outlined"
                            color="danger"
                            size="md"
                            name="amcStatus"
                            label="AMC"
                            value={amcStatus}
                            onCheked={updateamcStatus}
                            checked={amcStatus}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                        <CusCheckBox
                            variant="outlined"
                            color="danger"
                            size="md"
                            name="cmcStatus"
                            label="CMC"
                            value={cmcStatus}
                            onCheked={updatecmcStatus}
                            checked={cmcStatus}
                        />
                    </Box>
                </Box>
                {
                    amcStatus === true ?
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }} >

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
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchAMCList} >
                                        <SearchOutlinedIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>

                                {SupplerModal === 1 ? <Box sx={{ display: 'flex', width: "60%", pt: 1, pl: 3, }}>
                                    <AMCCMCAddingModal AmcCmcArray={AmcCmcArray} rowSelect={rowSelect} />
                                </Box>
                                    :
                                    SupplerModal === 2 ?
                                        <Box sx={{ display: 'flex', width: "25%", height: 50, pt: 3, pl: 3 }}>
                                            <Button onClick={AddAMCMaster} variant="contained"
                                                size="small" color="primary">Add AMC</Button>
                                        </Box>
                                        : null
                                }
                            </Box>
                        </Box> : null
                }
                {
                    cmcStatus === true ?
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }} >

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
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchCMCList} >
                                        <SearchOutlinedIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>

                                {SupplerModal === 1 ? <Box sx={{ display: 'flex', width: "60%", pt: 1, pl: 3, }}>
                                    <AMCCMCAddingModal AmcCmcArray={AmcCmcArray} rowSelect={rowSelect} />
                                </Box>
                                    :
                                    SupplerModal === 2 ?
                                        <Box sx={{ display: 'flex', width: "25%", height: 50, pt: 3, pl: 3 }}>
                                            <Button onClick={AddCMCMaster} variant="contained"
                                                size="small" color="primary">Add CMC</Button>
                                        </Box>
                                        : null
                                }
                            </Box>
                        </Box> : null
                }

                {amcCmcDetailFlag === 1 ?
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                    }} >
                        <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
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
                        <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >From Date</Typography>
                            <Box>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="amccmc_from"
                                    value={amccmc_from}
                                    disabled={true}
                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Date</Typography>
                            <Box>
                                <TextFieldCustom
                                    type="text"
                                    size="sm"
                                    name="amccmc_to"
                                    value={amccmc_to}
                                    disabled={true}
                                ></TextFieldCustom>
                            </Box>
                        </Box>
                        {
                            amcImage === 1 ?
                                <Box sx={{ display: 'flex', width: "30%", height: 55, pt: 3, pl: 1 }}>
                                    <Button onClick={ViewAmcCmcImage} variant="contained"
                                        size="small" color="primary">View Image</Button>
                                </Box> : null
                        }
                    </Box> : null}
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }} >
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                        <CusCheckBox
                            variant="outlined"
                            color="danger"
                            size="md"
                            name="pmStatus"
                            label="PM"
                            value={pmStatus}
                            onCheked={updatepmStatus}
                            checked={pmStatus}
                        />
                    </Box>
                </Box>
                {pmStatus === true ?
                    <Box>
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                        }} >

                            <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Installation date</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="instalationDate"
                                        value={instalationDate}
                                        onchange={UpdateinstalationDate}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Days</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="number"
                                        size="sm"
                                        name="dueDateCount"
                                        value={dueDateCount}
                                        onchange={UpdatedueDateCount}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Due date</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="dueDate"
                                        value={dueDate}
                                        disabled={true}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                        </Box>
                    </Box> : null
                }
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }}>
                    <CustomeToolTip title="Save" placement="left" >
                        <Box sx={{ width: '3%', pl: 1, pt: 1, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveAMCPMDetails} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                    <CustomeToolTip title="Refresh" placement="right" >
                        <Box sx={{ width: '3%', pl: 1, pt: 1, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={AmcPmReferesh} >
                                <RefreshIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(AMCCMCDetailAdding)
