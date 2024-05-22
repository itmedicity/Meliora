import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { addDays, format } from 'date-fns'
import AmcCmcAdding from './AmcCmcAdding';
import AmcCmcSelectcomp from './AmcCmcSelectcomp';
import { useDispatch } from 'react-redux'
import { getAmcCmcMaster } from 'src/redux/actions/AmAmcCmcSlect.action';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageDisplayModal from 'src/views/CentralRequestManagement/CRFRequestMaster/ImageDisplayModal';

const AMCMCPMComp = ({ detailArry, amcPm, setAmcPm, amcPmarry }) => {
    const { am_item_map_slno } = detailArry

    const { amc_slno } = amcPmarry
    const dispatch = useDispatch();
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [AmcCmc, setAmcCmc] = useState(0)
    const [amcStatus, setamcStatus] = useState(false)
    const [cmcStatus, setcmcStatus] = useState(false)
    const [pmStatus, setPmStatus] = useState(false)
    const [dueDate, setdueDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [dueDateCount, setdueDateCount] = useState(0)
    const [instalationDate, setinstalationDate] = useState(format(new Date(), "yyyy-MM-dd"))

    const updateamcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setamcStatus(true)
            setcmcStatus(false)
            dispatch(getAmcCmcMaster())
        } else {
            setamcStatus(false)
            setcmcStatus(false)
        }

    }, [dispatch])

    const updatecmcStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setcmcStatus(true)
            setamcStatus(false)
            dispatch(getAmcCmcMaster())
        } else {
            setcmcStatus(false)
            setamcStatus(false)
        }

    }, [dispatch])

    const updatepmStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setPmStatus(true)
        } else {
            setPmStatus(false)
        }
    }, [])

    const [userdata, setUserdata] = useState({
        contactInfotmation: '',
        fromdate: '',
        todate: '',
        image: ''
    })

    //Destructuring
    const { contactInfotmation, fromdate, todate, image } = userdata
    const UpdatedueDateCount = useCallback((e) => {
        setdueDateCount(e.target.value)
        const Due = addDays(new Date(instalationDate), e.target.value)
        setdueDate(format(new Date(Due), "yyyy-MM-dd"))
    }, [instalationDate])

    const UpdateinstalationDate = useCallback((e) => {
        setinstalationDate(e.target.value)
    }, [])

    useEffect(() => {
        const { pm_status, instalation_date, due_date, amc_status, cmc_status } = amcPmarry
        setPmStatus(pm_status === 1 ? true : false)
        setdueDate(due_date)
        setamcStatus(amc_status === 1 ? true : false)
        setcmcStatus(cmc_status === 1 ? true : false)
        setinstalationDate(instalation_date)
    }, [amcPmarry])

    const reset = useCallback(() => {
        const frmdata = {
            instalationDate: ''
        }
        setUserdata(frmdata)
        setamcStatus(false)
        setcmcStatus(false)
        setPmStatus(false)
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
            amc_slno: AmcCmc
        }
    }, [am_item_map_slno, amcStatus, cmcStatus, instalationDate, dueDate,
        pmStatus, id, AmcCmc])

    const patchData = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            amc_status: amcStatus === true ? 1 : 0,
            cmc_status: cmcStatus === true ? 1 : 0,
            instalation_date: instalationDate,
            due_date: dueDate,
            pm_status: pmStatus === true ? 1 : 0,
            edit_user: id,
            amc_slno: AmcCmc
        }
    }, [am_item_map_slno, amcStatus, cmcStatus, instalationDate, dueDate,
        pmStatus, id, AmcCmc])

    useEffect(() => {
        const GetBillDetailById = async (AmcCmc) => {
            const result = await axioslogin.get(`/ItemMapDetails/GetAmcCmcMasterById/${AmcCmc}`);
            const { success, data } = result.data
            if (success === 1) {
                const { contact_address, from_date, to_date, image_upload } = data[0]
                const frmdata = {
                    contactInfotmation: contact_address,
                    fromdate: from_date,
                    todate: to_date,
                    image: image_upload
                }
                setUserdata(frmdata)
            }
            else {
                const frmdata = {
                    contactInfotmation: '',
                    fromdate: '',
                    todate: '',
                    image: ''
                }
                setUserdata(frmdata)
            }
        }

        if (AmcCmc === undefined) {
            GetBillDetailById(amc_slno)
        } else {
            GetBillDetailById(AmcCmc)
        }

    }, [AmcCmc, amc_slno])

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



    const AmcPmReferesh = useCallback(() => {
        reset()
    }, [reset])

    const [AddnewAmcFlg, setNeAMCFlg] = useState(0)
    const AddAMCCMC = useCallback(() => {
        setNeAMCFlg(1)
    }, [])
    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [imageshow, setImageShow] = useState(false)
    const ViewAmcCmcImage = useCallback(() => {
        const getImage = async (AmcCmc) => {
            const result = await axioslogin.get(`/AssetFileUpload/AmcCmcImageView/${AmcCmc}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Asset/AMCCMC/${AmcCmc}/${fileName}`;
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
        getImage(AmcCmc)

    }, [AmcCmc])

    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
    }, [])

    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            {AddnewAmcFlg === 1 ? <AmcCmcAdding AddnewAmcFlg={AddnewAmcFlg} setNeAMCFlg={setNeAMCFlg}
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
                    amcStatus === true || cmcStatus === true ?


                        <Box sx={{
                            display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
                        }} >
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            }} >
                                <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Contact Information</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="contactInfotmation"
                                            value={contactInfotmation}
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
                                            name="fromdate"
                                            value={fromdate}
                                            disabled={true}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Date</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            name="todate"
                                            value={todate}
                                            disabled={true}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                {
                                    image === 1 ?
                                        <Box sx={{ display: 'flex', width: "30%", height: 55, pt: 3, pl: 1 }}>
                                            <Button onClick={ViewAmcCmcImage} variant="contained"
                                                size="small" color="primary">View Image</Button>
                                        </Box> : null
                                }
                            </Box>
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            }} >

                                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 3 }} >Select AMC</Typography>
                                    <Box>
                                        <AmcCmcSelectcomp
                                            AmcCmc={AmcCmc}
                                            setAmcCmc={setAmcCmc}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', width: "25%", height: 50, pt: 3, pl: 3 }}>
                                    <Button onClick={AddAMCCMC} variant="contained"
                                        size="small" color="primary">Add New AMC/CMC</Button>
                                </Box>

                            </Box>

                        </Box>
                        : null

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
                                        onchange={UpdateinstalationDate}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column' }} >
                                <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Installation date</Typography>
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
                        <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveAMCPMDetails} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>

                    <CustomeToolTip title="Refresh" placement="right" >
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

export default memo(AMCMCPMComp)