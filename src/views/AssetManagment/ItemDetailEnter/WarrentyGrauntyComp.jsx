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
// import imageCompression from 'browser-image-compression';
// import UploadFileIcon from '@mui/icons-material/UploadFile'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { format } from 'date-fns'


const WarrentyGrauntyComp = ({ detailArry, warGararry, wargar, setWarGar, assetSpare }) => {
    const { am_item_map_slno, am_spare_item_map_slno } = detailArry
    const { guarenty_status, warrenty_status, from_date, to_date, troll_free, ph_one, ph_two, address } = warGararry
    // const [selectFile, setSelectFile] = useState(null)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [warrantyStatus, setwarrantyStatus] = useState(false)
    const [garantyStatus, setgarantyStatus] = useState(false)

    const updatewarrantyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setwarrantyStatus(true)
            setgarantyStatus(false)
        } else {
            setwarrantyStatus(false)
            setgarantyStatus(false)
            const frmdata = {
                fromdate: '',
                toDate: '',
                trollFree: '',
                phone1: '',
                phone2: '',
                adress: '',
            }
            setUserdata(frmdata)
        }

    }, [])

    const updategarantyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setgarantyStatus(true)
            setwarrantyStatus(false)
        } else {
            setgarantyStatus(false)
            setwarrantyStatus(false)
            const frmdata = {
                fromdate: '',
                toDate: '',
                trollFree: '',
                phone1: '',
                phone2: '',
                adress: '',
            }
            setUserdata(frmdata)
        }

    }, [])

    const [userdata, setUserdata] = useState({
        fromdate: '',
        toDate: '',
        trollFree: '',
        phone1: '',
        phone2: '',
        adress: '',
    })

    //Destructuring
    const { fromdate, toDate, trollFree, phone1, phone2,
        adress } = userdata
    const updatewarrenGuranDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])

    useEffect(() => {

        const frmdata = {
            fromdate: from_date,
            toDate: to_date,
            trollFree: troll_free,
            phone1: ph_one,
            phone2: ph_two,
            adress: address,
        }


        setUserdata(frmdata)
        setwarrantyStatus(warrenty_status === 1 ? true : false)
        setgarantyStatus(guarenty_status === 1 ? true : false)

    }, [guarenty_status, warrenty_status, from_date, to_date, troll_free, ph_one, ph_two, address])



    const postData = useMemo(() => {

        return {
            am_item_map_slno: am_item_map_slno,
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
            file_upload_status: 1,
            // file_upload_status: selectFile !== null ? 1 : 0,
            create_user: id
        }
    }, [am_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, id])

    const postDataSpare = useMemo(() => {

        return {
            am_spare_item_map_slno: am_spare_item_map_slno,
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
            file_upload_status: 1,
            // file_upload_status: selectFile !== null ? 1 : 0,
            create_user: id
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, id])


    const patchdata = useMemo(() => {
        return {
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
            file_upload_status: 1,
            // file_upload_status: selectFile !== null ? 1 : 0,
            edit_user: id,
            am_item_map_slno: am_item_map_slno,
        }
    }, [am_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, id])

    const patchdataSpare = useMemo(() => {
        return {
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
            file_upload_status: 1,
            // file_upload_status: selectFile !== null ? 1 : 0,
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno,
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, id])
    const reset = useCallback(() => {
        const frmdata = {
            fromdate: '',
            toDate: '',
            trollFree: '',
            phone1: '',
            phone2: '',
            adress: '',
        }
        setUserdata(frmdata)
        setwarrantyStatus(false)
        setgarantyStatus(false)
    }, [])

    const SaveWarGarDetails = useCallback((e) => {
        e.preventDefault()
        const InsertItemDetail = async (postData) => {
            const result = await axioslogin.post('/ItemMapDetails/WarentGraruntyInsert', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setWarGar(1)
            } else {
                infoNotify(message)
            }
        }

        const InsertItemDetailSpare = async (postDataSpare) => {
            const result = await axioslogin.post('/ItemMapDetails/WarentGraruntyInsertSpare', postDataSpare)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setWarGar(1)
            } else {
                infoNotify(message)
            }
        }
        if (assetSpare === 1) {
            InsertItemDetail(postData);
        } else {
            InsertItemDetailSpare(postDataSpare)
        }

    }, [postData, setWarGar, assetSpare, postDataSpare])


    const EditWarGarDetails = useCallback((e) => {
        e.preventDefault()
        const checkinsertOrNot = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { warrenty_status, guarenty_status, from_date, to_date, troll_free, ph_one,
                    ph_two, address, file_upload_status } = data[0]
                const frmdata = {
                    warrantyStatus: warrenty_status === 1 ? setwarrantyStatus(true) : setwarrantyStatus(false),
                    garantyStatus: guarenty_status === 1 ? setgarantyStatus(true) : setgarantyStatus(false),
                    fromdate: from_date !== null ? format(new Date(from_date), "yyyy-MM-dd") : '',
                    toDate: to_date !== null ? format(new Date(to_date), "yyyy-MM-dd") : '',
                    trollFree: troll_free,
                    phone1: ph_one,
                    phone2: ph_two,
                    adress: address,
                    imageStatus: file_upload_status
                }
                setUserdata(frmdata);
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const checkinsertOrNotSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNotSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { warrenty_status, guarenty_status, from_date, to_date, troll_free, ph_one,
                    ph_two, address, file_upload_status } = data[0]
                const frmdata = {
                    warrantyStatus: warrenty_status === 1 ? setwarrantyStatus(true) : setwarrantyStatus(false),
                    garantyStatus: guarenty_status === 1 ? setgarantyStatus(true) : setgarantyStatus(false),
                    fromdate: from_date !== null ? format(new Date(from_date), "yyyy-MM-dd") : '',
                    toDate: to_date !== null ? format(new Date(to_date), "yyyy-MM-dd") : '',
                    trollFree: troll_free,
                    phone1: ph_one,
                    phone2: ph_two,
                    adress: address,
                    imageStatus: file_upload_status
                }
                setUserdata(frmdata);
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const updateGRNDetails = async (patchdata) => {
            const result = await axioslogin.patch('/ItemMapDetails/WarentGraruntyUpdate', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }

        const updateGRNDetailsSpare = async (patchdataSpare) => {
            const result = await axioslogin.patch('/ItemMapDetails/WarentGraruntyUpdateSpare', patchdataSpare);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }
        if (fromdate === '' && toDate === '' && trollFree === '' && phone1 === '' && phone2 === '' &&
            adress === '') {
            if (assetSpare === 1) {
                checkinsertOrNot(am_item_map_slno)
            } else {
                checkinsertOrNotSpare(am_spare_item_map_slno)
            }

        }
        else {
            if (assetSpare === 1) {
                updateGRNDetails(patchdata)
            } else {
                updateGRNDetailsSpare(patchdataSpare)
            }

        }
    }, [am_item_map_slno, patchdata, fromdate, toDate, trollFree, phone1, phone2, adress, assetSpare,
        am_spare_item_map_slno, patchdataSpare])

    const WarGarReferesh = useCallback(() => {
        reset()
    }, [reset])
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
                            name="warrantyStatus"
                            label="Warranty"
                            value={warrantyStatus}
                            onCheked={updatewarrantyStatus}
                            checked={warrantyStatus}

                        />
                    </Box>
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                        <CusCheckBox
                            variant="outlined"
                            color="danger"
                            size="md"
                            name="garantyStatus"
                            label="Guarantee"
                            value={garantyStatus}
                            onCheked={updategarantyStatus}
                            checked={garantyStatus}
                        />
                    </Box>
                </Box>

                {
                    warrantyStatus === true || garantyStatus === true || wargar === 1 ?
                        <Box>
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            }} >

                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >From Date</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            name="fromdate"
                                            value={fromdate}
                                            onchange={updatewarrenGuranDetails}
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
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Trool Free No</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="trollFree"
                                            value={trollFree}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Phone No 1</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="phone1"
                                            value={phone1}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Phone No 2</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="phone2"
                                            value={phone2}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            }} >

                                <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Address</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="adress"
                                            value={adress}
                                            onchange={updatewarrenGuranDetails}
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


                                {
                                    wargar === 0 ? <CustomeToolTip title="Save" placement="top" >
                                        <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveWarGarDetails} >
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
                                    wargar === 0 ?
                                        <CustomeToolTip title="Edit" placement="top" >
                                            <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                                                <CusIconButton size="sm" variant="outlined" >
                                                    <EditIcon fontSize='small' />
                                                </CusIconButton>
                                            </Box>
                                        </CustomeToolTip> :
                                        <CustomeToolTip title="Edit" placement="top" >
                                            <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditWarGarDetails} >
                                                    <EditIcon fontSize='small' />
                                                </CusIconButton>
                                            </Box>
                                        </CustomeToolTip>
                                }
                                <CustomeToolTip title="Refresh" placement="top" >
                                    <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={WarGarReferesh} >
                                            <RefreshIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>
                            </Box>

                        </Box> : null
                }

            </Box>
        </Paper>
    )
}

export default memo(WarrentyGrauntyComp)