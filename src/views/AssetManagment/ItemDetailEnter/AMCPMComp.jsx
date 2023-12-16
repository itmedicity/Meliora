import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import CusCheckBox from 'src/views/Components/CusCheckBox';
// import imageCompression from 'browser-image-compression';
// import UploadFileIcon from '@mui/icons-material/UploadFile'
import { format } from 'date-fns'

const AMCPMComp = ({ detailArry, amcPm, setAmcPm, assetSpare }) => {
    const { am_item_map_slno, am_spare_item_map_slno } = detailArry
    // const [selectFile, setSelectFile] = useState(null)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [amcStatus, setamcStatus] = useState(false)
    const [cmcStatus, setcmcStatus] = useState(false)
    const [pmStatus, setPmStatus] = useState(false)
    const updateamcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setamcStatus(true)
            setcmcStatus(false)
        } else {
            setamcStatus(false)
            setcmcStatus(false)
        }

    }, [])

    const updatecmcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setcmcStatus(true)
            setamcStatus(false)
        } else {
            setcmcStatus(false)
            setamcStatus(false)
        }

    }, [])

    const updatepmStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setPmStatus(true)
        } else {
            setPmStatus(false)
        }

    }, [])
    const [userdata, setUserdata] = useState({
        fromDate: '',
        toDate: '',
        FileStatus: '',
        address: '',
        instalationDate: '',
        dueDate: '',
        amc_from: '',
        amc_to: '',
        contact_address: ''
    })

    //Destructuring

    const { fromDate, toDate, amcFileStatus, address, instalationDate, dueDate, amc_from,
        amc_to, contact_address } = userdata
    const updateAMCCMC = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])

    useEffect(() => {
        const checkinsertOrNotAMCPM = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { amc_status, cmc_status, amc_from, amc_to, contact_address, pm_status,
                    instalation_date, due_date } = data[0]

                const frmdata = {
                    fromDate: amc_from,
                    toDate: amc_to,
                    FileStatus: '',
                    address: contact_address,
                    instalationDate: instalation_date !== null ? (format(new Date(instalation_date), "yyyy-MM-dd")) : '',
                    dueDate: due_date !== null ? (format(new Date(due_date), "yyyy-MM-dd")) : '',
                    amc_from: amc_from !== null ? (format(new Date(amc_from), "yyyy-MM-dd")) : '',
                    amc_to: amc_to !== null ? (format(new Date(amc_to), "yyyy-MM-dd")) : '',
                    contact_address: contact_address
                }
                setUserdata(frmdata)
                setcmcStatus(cmc_status === 1 ? true : false)
                setamcStatus(amc_status === 1 ? true : false)
                setPmStatus(pm_status === 1 ? true : false)
            }
            else {
                const frmdata = {
                    fromDate: '',
                    toDate: '',
                    FileStatus: '',
                    address: '',
                    instalationDate: '',
                    dueDate: '',
                    amc_from: '',
                    amc_to: '',
                    contact_address: ''
                }
                setUserdata(frmdata)
                setcmcStatus(false)
                setamcStatus(false)
                setPmStatus(false)
            }
        }

        checkinsertOrNotAMCPM(am_item_map_slno)

    }, [amcPm, am_item_map_slno])

    const postdata = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            amc_from: fromDate !== '' ? fromDate : null,
            amc_to: toDate !== '' ? toDate : null,
            contact_address: address,
            amc_file_status: amcFileStatus,
            instalation_date: instalationDate,
            due_date: dueDate,
            pm_status: pmStatus === true ? 1 : 0,
            create_user: id
        }
    }, [am_item_map_slno, amcStatus, cmcStatus, fromDate, toDate, amcFileStatus, instalationDate, dueDate,
        pmStatus, address, id])

    const postdataSpare = useMemo(() => {
        return {
            am_spare_item_map_slno: am_spare_item_map_slno,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            amc_from: fromDate !== '' ? fromDate : null,
            amc_to: toDate !== '' ? toDate : null,
            contact_address: address,
            amc_file_status: amcFileStatus,
            instalation_date: instalationDate,
            due_date: dueDate,
            pm_status: pmStatus === true ? 1 : 0,
            create_user: id
        }
    }, [am_spare_item_map_slno, amcStatus, cmcStatus, fromDate, toDate, amcFileStatus, instalationDate, dueDate,
        pmStatus, address, id])

    const patchData = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            amc_from: fromDate !== '' ? fromDate : null,
            amc_to: toDate !== '' ? toDate : null,
            contact_address: address,
            amc_file_status: amcFileStatus,
            instalation_date: instalationDate,
            due_date: dueDate,
            pm_status: pmStatus === true ? 1 : 0,
            edit_user: id
        }
    }, [am_item_map_slno, amcStatus, cmcStatus, fromDate, toDate, amcFileStatus, instalationDate, dueDate,
        pmStatus, address, id])


    const patchDataSpare = useMemo(() => {
        return {
            am_spare_item_map_slno: am_spare_item_map_slno,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            amc_from: fromDate !== '' ? fromDate : null,
            amc_to: toDate !== '' ? toDate : null,
            contact_address: address,
            amc_file_status: amcFileStatus,
            instalation_date: instalationDate,
            due_date: dueDate,
            pm_status: pmStatus === true ? 1 : 0,
            edit_user: id
        }
    }, [am_spare_item_map_slno, amcStatus, cmcStatus, fromDate, toDate, amcFileStatus, instalationDate, dueDate,
        pmStatus, address, id])

    const reset = useCallback(() => {
        const frmdata = {
            fromDate: '',
            toDate: '',
            FileStatus: '',
            address: '',
            instalationDate: '',
            dueDate: ''
        }
        setUserdata(frmdata)
        setamcStatus(false)
        setcmcStatus(false)
        setPmStatus(false)
    }, [])
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

        const InsertAMCPMDetailSpare = async (postdataSpare) => {
            const result = await axioslogin.post('/ItemMapDetails/AmcPmInsertSpare', postdataSpare)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setAmcPm(1)
            } else {
                infoNotify(message)
            }
        }
        if (assetSpare === 1) {
            InsertAMCPMDetail(postdata);
        } else {
            InsertAMCPMDetailSpare(postdataSpare)
        }

    }, [postdata, setAmcPm, assetSpare, postdataSpare])


    const EditDetails = useCallback((e) => {
        e.preventDefault()
        const AmcPmInsertOrNot = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { amc_status, cmc_status, amc_from, amc_to, contact_address, instalation_date, pm_status, due_date } = data[0]
                const frmdata = {
                    fromDate: format(new Date(amc_from), "yyyy-MM-dd"),
                    toDate: format(new Date(amc_to), "yyyy-MM-dd"),
                    FileStatus: '',
                    address: contact_address,
                    instalationDate: instalation_date,
                    dueDate: due_date
                }
                setUserdata(frmdata)
                setcmcStatus(cmc_status === 1 ? true : false)
                setamcStatus(amc_status === 1 ? true : false)
                setPmStatus(pm_status === 1 ? true : false)
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const AmcPmInsertOrNotSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNotSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { amc_status, cmc_status, amc_from, amc_to, contact_address, instalation_date, pm_status, due_date } = data[0]
                const frmdata = {
                    fromDate: format(new Date(amc_from), "yyyy-MM-dd"),
                    toDate: format(new Date(amc_to), "yyyy-MM-dd"),
                    FileStatus: '',
                    address: contact_address,
                    instalationDate: instalation_date,
                    dueDate: due_date
                }
                setUserdata(frmdata)
                setcmcStatus(cmc_status === 1 ? true : false)
                setamcStatus(amc_status === 1 ? true : false)
                setPmStatus(pm_status === 1 ? true : false)
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const updateAMCPMDetails = async (patchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/AmcPmUpdate', patchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)

            }
        }
        const updateAMCPMDetailsSpare = async (patchDataSpare) => {
            const result = await axioslogin.patch('/ItemMapDetails/AmcPmUpdateSpare', patchDataSpare);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)

            }
        }
        if (amc_from === '' && amc_to === '' && contact_address === '') {
            if (assetSpare === 1) {
                AmcPmInsertOrNot(am_item_map_slno)
            } else {
                AmcPmInsertOrNotSpare(am_spare_item_map_slno)
            }

        }
        else {
            if (assetSpare === 1) {
                updateAMCPMDetails(patchData)
            } else {
                updateAMCPMDetailsSpare(patchDataSpare)
            }

        }
    }, [am_item_map_slno, patchData, amc_from, amc_to, contact_address, am_spare_item_map_slno,
        patchDataSpare, assetSpare])

    const AmcPmReferesh = useCallback(() => {
        reset()
    }, [reset])


    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
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
                    amcStatus === true || cmcStatus === true ?
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                        }} >

                            <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >From Date</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="fromDate"
                                        value={fromDate}
                                        onchange={updateAMCCMC}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Date</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="toDate"
                                        value={toDate}
                                        onchange={updateAMCCMC}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Contact Information</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="fromDate"
                                        value={fromDate}
                                        onchange={updateAMCCMC}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                        </Box> : null
                }


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
                                        onchange={updateAMCCMC}
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
                                        onchange={updateAMCCMC}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>

                            {/* <Box sx={{ display: 'flex', width: '200px', pt: 1.2 }}>
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

                            </Box> */}

                        </Box>

                    </Box> : null
                }

                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                }}>
                    {
                        amcPm === 0 ? <CustomeToolTip title="Save" placement="top" >
                            <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveAMCPMDetails} >
                                    <LibraryAddIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip> :
                            <CustomeToolTip title="Save" placement="top" >
                                <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                                    <CusIconButton size="sm" variant="outlined"  >
                                        <LibraryAddIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>

                    }
                    {
                        amcPm === 0 ?
                            <CustomeToolTip title="Edit" placement="top" >
                                <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                                    <CusIconButton size="sm" variant="outlined" >
                                        <EditIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip> :
                            <CustomeToolTip title="Edit" placement="top" >
                                <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails} >
                                        <EditIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>
                    }
                    <CustomeToolTip title="Refresh" placement="top" >
                        <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
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

export default memo(AMCPMComp)