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

const LeaseDetails = ({ detailArry, grndetailarry, exist, setExist }) => {
    const { am_item_map_slno } = detailArry
    const { am_lease_status, am_lease_from, am_lease_to, am_lease_amount, am_lease_image } = grndetailarry
    // const [leaseFile, setLeaseFile] = useState(null)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [LeaseStatus, setLeaseStatus] = useState(false)
    const updateLeaseStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setLeaseStatus(true)
        } else {
            setLeaseStatus(false)
        }

    }, [])

    const [userdata, setUserdata] = useState({
        fromDate: '',
        toDate: '',
        leaseAmount: '',
    })

    //Destructuring
    const { fromDate, toDate, leaseAmount } = userdata
    const updateAMCCMC = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])

    useEffect(() => {

        if (am_lease_from !== null || am_lease_to !== null || am_lease_amount !== null) {
            const frmdata = {
                fromDate: am_lease_from,
                toDate: am_lease_to,
                leaseAmount: am_lease_amount,
            }
            setUserdata(frmdata)

        }
        setLeaseStatus(am_lease_status === 1 ? true : false)
    }, [am_lease_status, am_lease_from, am_lease_to, am_lease_amount, am_lease_image])

    const postdata = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            am_lease_status: LeaseStatus === true ? 1 : 0,
            am_lease_from: fromDate,
            am_lease_to: toDate,
            am_lease_amount: leaseAmount,
            am_lease_image: 1,
            // am_lease_image: leaseFile !== null ? 1 : 0,
            create_user: id
        }
    }, [am_item_map_slno, LeaseStatus, fromDate, toDate, leaseAmount, id])

    const patchData = useMemo(() => {
        return {
            am_lease_status: LeaseStatus === true ? 1 : 0,
            am_lease_from: fromDate,
            am_lease_to: toDate,
            am_lease_amount: leaseAmount,
            am_lease_image: 1,
            // am_lease_image: leaseFile !== null ? 1 : 0,
            create_user: id,
            am_item_map_slno: am_item_map_slno
        }
    }, [am_item_map_slno, LeaseStatus, fromDate, toDate, leaseAmount, id])

    const reset = useCallback(() => {
        const frmdata = {
            fromDate: '',
            toDate: '',
            FileStatus: '',
            leaseAmount: '',
        }
        setUserdata(frmdata)
        setLeaseStatus(false)
    }, [])

    // const uploadFile = async (event) => {
    //     const file = event.target.files[0];
    //     setLeaseFile(file);
    //     const options = {
    //         maxSizeMB: 1,
    //         maxWidthOrHeight: 1920
    //     }
    //     const compressedFile = await imageCompression(file, options);
    //     setLeaseFile(compressedFile);
    // };

    // const ViewImage = useCallback(() => {

    // }, [])

    const SaveLeaseDetails = useCallback((e) => {
        e.preventDefault()
        const InsertLeaseDetail = async (postdata) => {
            const result = await axioslogin.post('/ItemMapDetails/LeaseDetailsInsert', postdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                setExist(1)
            } else {
                infoNotify(message)
            }
        }
        InsertLeaseDetail(postdata);
    }, [postdata, setExist])


    const EditDetails = useCallback((e) => {
        e.preventDefault()
        const checkinsertOrNot = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_lease_status, am_lease_from, am_lease_to, am_lease_amount, am_lease_image } = data[0]
                const frmdata = {
                    fromDate: format(new Date(am_lease_from), "yyyy-MM-dd"),
                    toDate: format(new Date(am_lease_to), "yyyy-MM-dd"),
                    FileStatus: am_lease_image,
                    leaseAmount: am_lease_amount,
                }
                setUserdata(frmdata);
                setLeaseStatus(am_lease_status === 1 ? true : false)
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const updateLeaseDetails = async (patchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/LeaseDetailsUpdate', patchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }
        if (fromDate === '' && toDate === '' && leaseAmount === '') {
            checkinsertOrNot(am_item_map_slno)
        }
        else {
            updateLeaseDetails(patchData)
        }
    }, [am_item_map_slno, fromDate, toDate, leaseAmount, patchData])

    const DeviceRefresh = useCallback(() => {
        reset()
    }, [reset])

    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            }} >

                <Box sx={{ display: 'flex', width: '10%', p: 0.5, py: 2, flexDirection: 'column' }} >
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
                            display: 'flex', width: '70%', flexDirection: 'row', flexWrap: 'wrap',
                        }}>
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
                            <Box sx={{ display: 'flex', width: '15%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Lease Amount</Typography>
                                <Box>
                                    <TextFieldCustom
                                        type="text"
                                        size="sm"
                                        name="leaseAmount"
                                        value={leaseAmount}
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
                                {leaseFile !== null ?
                                    <Box sx={{ pt: 1.5 }}>
                                        <Button onClick={ViewImage} variant="contained"
                                            size="small" color="primary">View Image</Button>

                                    </Box> : null
                                }

                            </Box> */}

                            {
                                exist === 0 ? <CustomeToolTip title="Save" placement="top" >
                                    <Box sx={{ width: '3%', pt: 3, }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveLeaseDetails} >
                                            <LibraryAddIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip> :
                                    <CustomeToolTip title="Save" placement="top" >
                                        <Box sx={{ width: '3%', pt: 3, }}>
                                            <CusIconButton size="sm" variant="outlined"  >
                                                <LibraryAddIcon fontSize='small' />
                                            </CusIconButton>
                                        </Box>
                                    </CustomeToolTip>

                            }
                            {
                                exist === 0 ?
                                    <CustomeToolTip title="Edit" placement="top" >
                                        <Box sx={{ width: '3%', pl: 0.5, pt: 3, }}>
                                            <CusIconButton size="sm" variant="outlined"  >
                                                <EditIcon fontSize='small' />
                                            </CusIconButton>
                                        </Box>
                                    </CustomeToolTip> :
                                    <CustomeToolTip title="Edit" placement="top" >
                                        <Box sx={{ width: '3%', pl: 0.5, pt: 3, }}>
                                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails} >
                                                <EditIcon fontSize='small' />
                                            </CusIconButton>
                                        </Box>
                                    </CustomeToolTip>
                            }
                            <CustomeToolTip title="Refresh" placement="top" >
                                <Box sx={{ width: '3%', pl: 1.5, pt: 3, }}>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={DeviceRefresh} >
                                        <RefreshIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>


                        </Box> : null


                }


            </Box>
        </Paper >
    )
}

export default memo(LeaseDetails)