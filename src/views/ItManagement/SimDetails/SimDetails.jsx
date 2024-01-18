import { Box, Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SimOperator from './SimOperator'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useState } from 'react'
import TariffSelect from './TariffSelect'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import SimDataTable from './SimDataTable'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { Paper } from '@mui/material'
import CusIconButton from 'src/views/Components/CusIconButton'
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect';
import { getDepartment } from 'src/redux/actions/Department.action';
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect';

const SimDetails = () => {
    const [provider, setProvider] = useState(0)
    const [tarrif, setTarrif] = useState(0)
    const [tableCount, settableCount] = useState(0)
    const [value, setvalue] = useState(0)
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [checkFlag, setcheckFlag] = useState(0)
    const [cugCheck, setCugCheck] = useState(false)
    const [prepaidCheck, setPrepaidCheck] = useState(false)
    const [postPaidCheck, setpostPaidCheck] = useState(false)
    const [reciverCheck, setRecieverCheck] = useState(false)
    const [reciverFlag, setRecieverFlag] = useState(0)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch,])

    const recieverBox = useCallback((e) => {
        if (e.target.checked === true) {
            setRecieverCheck(true)
            setRecieverFlag(1)
        }
        else {
            setRecieverCheck(false)
            setRecieverFlag(0)
        }
    }, [])


    const ChangeCug = useCallback((e) => {
        if (e.target.checked === true) {
            setCugCheck(true)
            setPrepaidCheck(false)
            setpostPaidCheck(false)
            setcheckFlag(1)
        }
        else {
            setCugCheck(false)
            setPrepaidCheck(false)
            setpostPaidCheck(false)
            setcheckFlag(0)

        }
    }, [])
    const ChangePrepaid = useCallback((e) => {

        if (e.target.checked === true) {
            setCugCheck(false)
            setPrepaidCheck(true)
            setpostPaidCheck(false)
            setcheckFlag(2)
        }
        else {
            setCugCheck(false)
            setPrepaidCheck(false)
            setpostPaidCheck(false)
            setcheckFlag(0)

        }
    }, [])

    const ChangePostpaid = useCallback((e) => {
        if (e.target.checked === true) {
            setCugCheck(false)
            setPrepaidCheck(false)
            setpostPaidCheck(true)
            setcheckFlag(3)
        }
        else {
            setCugCheck(false)
            setPrepaidCheck(false)
            setpostPaidCheck(false)
            setcheckFlag(0)
        }
    }, [])



    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [simMast, setSimMast] = useState({
        it_sim_slno: '',
        it_sim_serial_no: '',
        it_sim_imei_no: '',
        it_sim_mobile_no: '',
        it_sim_tariff_amount: '',
        it_sim_recie_empid: '',
        it_sim_recie_name: '',
        it_sim_recei_contact: '',
        it_sim_issue_date: '',
        it_sim_status: true,


    })
    const { it_sim_slno, it_sim_serial_no, it_sim_imei_no, it_sim_mobile_no, it_sim_tariff_amount, it_sim_status, it_sim_recie_empid,
        it_sim_recie_name, it_sim_recei_contact, it_sim_issue_date } = simMast



    const SimMastUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setSimMast({ ...simMast, [e.target.name]: value })
        },
        [simMast],
    )
    const reset = () => {
        const form = {
            it_sim_slno: '',
            it_sim_serial_no: '',
            it_sim_imei_no: '',
            it_sim_mobile_no: '',
            it_sim_tariff_amount: '',
            it_sim_recie_empid: '',
            it_sim_recie_name: '',
            it_sim_recei_contact: '',
            it_sim_issue_date: '',
            it_sim_status: true
        }
        setSimMast(form)
        setProvider(0)
        setTarrif(0)
        setCugCheck(0)
        setPrepaidCheck(0)
        setpostPaidCheck(0)
        setDepartment(0)
        setDeptSec(0)
        setRecieverFlag(0)
        setRecieverCheck(false)
    }

    const postData = useMemo(() => {
        return {
            it_sim_serial_no: it_sim_serial_no === '' ? null : it_sim_serial_no,
            it_sim_imei_no: it_sim_imei_no === '' ? null : it_sim_imei_no,
            it_sim_mobile_no: it_sim_mobile_no === '' ? null : it_sim_mobile_no,
            it_sim_operator: provider === 0 ? null : provider,
            it_sim_tariff: tarrif === 0 ? null : tarrif,
            it_sim_tariff_amount: it_sim_tariff_amount === '' ? null : it_sim_tariff_amount,
            it_sim_status: it_sim_status === true ? 1 : 0,
            it_sim_category: checkFlag,
            it_sim_dept: department,
            it_sim_deptsec: deptsec,
            it_sim_recie_empid: it_sim_recie_empid,
            it_sim_recie_name: it_sim_recie_name,
            it_sim_recei_contact: it_sim_recei_contact,
            it_sim_issue_date: it_sim_issue_date,
            // it_device_assetno:it_device_assetno,
            create_user: id,

        }
    }, [it_sim_serial_no, it_sim_imei_no, it_sim_mobile_no, provider, tarrif, it_sim_tariff_amount, it_sim_status, checkFlag, department, deptsec,
        it_sim_recie_empid, it_sim_recie_name, it_sim_recei_contact, it_sim_issue_date, id])


    const rowSelect = useCallback((data) => {

        const { it_sim_dept } = data

        setvalue(1)
        if (it_sim_dept === 0 || it_sim_dept === null) {
            setRecieverFlag(0)
            setRecieverCheck(false)
            const {
                it_sim_slno,
                it_sim_serial_no,
                it_sim_imei_no,
                it_sim_mobile_no,
                it_sim_operator,
                it_sim_tariff,
                it_sim_tariff_amount,
                it_sim_status,
                it_sim_category,
                // it_sim_dept,
                // it_sim_deptsec,
                // it_sim_recie_empid,
                // it_sim_recie_name,
                // it_sim_recei_contact,
                // it_sim_issue_date
            } = data

            const frmdata = {
                it_sim_slno: it_sim_slno,
                it_sim_serial_no: it_sim_serial_no === '' ? null : it_sim_serial_no,
                it_sim_imei_no: it_sim_imei_no === '' ? null : it_sim_imei_no,
                it_sim_mobile_no: it_sim_mobile_no === '' ? null : it_sim_mobile_no,
                it_sim_operator: it_sim_operator === 0 ? null : it_sim_operator,
                it_sim_tariff: it_sim_tariff === 0 ? null : it_sim_tariff,
                it_sim_tariff_amount: it_sim_tariff_amount === '' ? null : it_sim_tariff_amount,
                it_sim_status: it_sim_status === 1 ? true : false,
                // it_sim_dept: department,
                // it_sim_deptsec: deptsec,
                // it_sim_recie_empid: it_sim_recie_empid,
                // it_sim_recie_name: it_sim_recie_name,
                // it_sim_recei_contact: it_sim_recei_contact,
                // it_sim_issue_date: it_sim_issue_date,
            }
            setSimMast(frmdata)
            setProvider(it_sim_operator)
            setTarrif(it_sim_tariff)
            setCugCheck(it_sim_category === 1 ? true : false)
            setPrepaidCheck(it_sim_category === 2 ? true : false)
            setpostPaidCheck(it_sim_category === 3 ? true : false)
            // setDepartment(it_sim_dept)
            // setDeptSec(it_sim_deptsec)
        }
        else {
            setRecieverFlag(1)
            setRecieverCheck(true)
            const {
                it_sim_slno,
                it_sim_serial_no,
                it_sim_imei_no,
                it_sim_mobile_no,
                it_sim_operator,
                it_sim_tariff,
                it_sim_tariff_amount,
                it_sim_status,
                it_sim_category,
                it_sim_dept,
                it_sim_deptsec,
                it_sim_recie_empid,
                it_sim_recie_name,
                it_sim_recei_contact,
                it_sim_issue_date
            } = data

            const frmdata = {
                it_sim_slno: it_sim_slno,
                it_sim_serial_no: it_sim_serial_no === '' ? null : it_sim_serial_no,
                it_sim_imei_no: it_sim_imei_no === '' ? null : it_sim_imei_no,
                it_sim_mobile_no: it_sim_mobile_no === '' ? null : it_sim_mobile_no,
                it_sim_operator: it_sim_operator === 0 ? null : it_sim_operator,
                it_sim_tariff: it_sim_tariff === 0 ? null : it_sim_tariff,
                it_sim_tariff_amount: it_sim_tariff_amount === '' ? null : it_sim_tariff_amount,
                it_sim_status: it_sim_status === 1 ? true : false,
                it_sim_dept: department === 0 ? null : department,
                it_sim_deptsec: deptsec === 0 ? null : deptsec,
                it_sim_recie_empid: it_sim_recie_empid === '' ? null : it_sim_recie_empid,
                it_sim_recie_name: it_sim_recie_name === '' ? null : it_sim_recie_name,
                it_sim_recei_contact: it_sim_recei_contact === '' ? null : it_sim_recei_contact,
                it_sim_issue_date: it_sim_issue_date === '' ? null : it_sim_issue_date,

                // it_sim_category: it_sim_category === 1 ?

            }
            setSimMast(frmdata)
            setProvider(it_sim_operator)
            setTarrif(it_sim_tariff)
            setCugCheck(it_sim_category === 1 ? true : false)
            setPrepaidCheck(it_sim_category === 2 ? true : false)
            setpostPaidCheck(it_sim_category === 3 ? true : false)
            setDepartment(it_sim_dept)
            setDeptSec(it_sim_deptsec)
        }

    }, [setSimMast, setProvider, setTarrif, setCugCheck, setPrepaidCheck, setpostPaidCheck, setDepartment, setDeptSec, department, deptsec])


    const patchData = useMemo(() => {
        return {
            it_sim_slno: it_sim_slno,
            it_sim_serial_no: it_sim_serial_no === '' ? null : it_sim_serial_no,
            it_sim_imei_no: it_sim_imei_no === '' ? null : it_sim_imei_no,
            it_sim_mobile_no: it_sim_mobile_no === '' ? null : it_sim_mobile_no,
            it_sim_operator: provider === 0 ? null : provider,
            it_sim_tariff: tarrif === 0 ? null : tarrif,
            it_sim_tariff_amount: it_sim_tariff_amount === '' ? null : it_sim_tariff_amount,
            it_sim_status: it_sim_status === true ? 1 : 0,
            it_sim_category: checkFlag,
            it_sim_dept: department,
            it_sim_deptsec: deptsec,
            it_sim_recie_empid: it_sim_recie_empid,
            it_sim_recie_name: it_sim_recie_name,
            it_sim_recei_contact: it_sim_recei_contact,
            it_sim_issue_date: it_sim_issue_date,
            edit_user: id,
        }
    }, [it_sim_slno, it_sim_serial_no, it_sim_imei_no, it_sim_mobile_no, provider, tarrif, it_sim_tariff_amount, it_sim_status, checkFlag,
        department,
        deptsec,
        it_sim_recie_empid,
        it_sim_recie_name,
        it_sim_recei_contact,
        it_sim_issue_date, id])




    const InsertSimDetails = useCallback((e) => {
        e.preventDefault()

        const isValidMobileNumber = (number) => /^\d{10}$/.test(number);

        if (it_sim_mobile_no !== '') {
            if (!isValidMobileNumber(it_sim_mobile_no)) {
                infoNotify("Please enter a valid 10-digit SiM mobile number");
                return; // Stop further processing if the number is invalid
            }
        }
        if (it_sim_mobile_no !== '' && provider !== 0 && tarrif !== 0) {
            const InsertMastSim = async (postData) => {
                const result = await axioslogin.post('/communicationDeviceDetails/siminsert', postData)
                const { message, success } = result.data

                if (success === 1) {
                    succesNotify(message)
                    settableCount(tableCount + 1)
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            InsertMastSim(postData)
        } else {
            infoNotify('Please fill the mandatory feilds')
        }
    }, [postData, tableCount, settableCount, it_sim_mobile_no, provider, tarrif])

    const UpdateSimDetails = useCallback((e) => {

        e.preventDefault()
        const isValidMobileNumber = (number) => /^\d{10}$/.test(number);

        if (it_sim_mobile_no !== '') {
            if (!isValidMobileNumber(it_sim_mobile_no)) {
                infoNotify("Please enter a valid 10-digit SiM mobile number");
                return; // Stop further processing if the number is invalid
            }
        }
        if (it_sim_mobile_no !== '' && provider !== 0 && tarrif !== 0) {
            const UpdateMastSim = async (patchData) => {
                const result = await axioslogin.patch('/communicationDeviceDetails/simUpdate', patchData)
                const { message, success } = result.data


                if (success === 2) {
                    succesNotify(message)
                    settableCount(tableCount + 1)
                    reset()
                    setvalue(0)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            UpdateMastSim(patchData)
        } else {
            infoNotify('Please fill the mandatory feilds')
        }
    }, [patchData, tableCount, it_sim_mobile_no, settableCount, provider, tarrif])



    return (

        <Paper sx={{ height: '60vw', }}>

            <CssVarsProvider>
                <Box sx={{ flex: 1, height: 33, bgcolor: '#D9E4EC', display: 'flex' }}>
                    <Box sx={{ flex: 1, p: .5, fontWeight: 600, color: '#003B73' }}>
                        SiM Details
                    </Box>
                    <Box>
                        <CusIconButton size="sm" variant="outlined" color="primary"  >
                            <Tooltip title="Close" placement="bottom" >
                                <CloseIcon fontSize='small'
                                // onClick={BackToDash}
                                />
                            </Tooltip>
                        </CusIconButton>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', mt: 5, }}>
                        <Box sx={{ flex: 2 }}>
                        </Box>
                        <Box sx={{ flex: 3, display: 'flex' }}>
                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <Box sx={{ pl: 3, pt: .5 }}>
                                    <CusCheckBox

                                        color="primary"
                                        size="md"
                                        name="cugCheck"
                                        value={cugCheck}
                                        checked={cugCheck}
                                        onCheked={ChangeCug}
                                    ></CusCheckBox>
                                </Box>
                                <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>CUG SiM</Box>
                            </Box>

                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <Box sx={{ pl: 3, pt: .5 }}>
                                    <CusCheckBox

                                        color="primary"
                                        size="md"
                                        name="prepaidCheck"
                                        value={prepaidCheck}
                                        checked={prepaidCheck}
                                        onCheked={ChangePrepaid}
                                    ></CusCheckBox>
                                </Box>
                                <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Prepaid</Box>
                            </Box>

                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <Box sx={{ pl: 3, pt: .5 }}>
                                    <CusCheckBox

                                        color="primary"
                                        size="md"
                                        name="postPaidCheck"
                                        value={postPaidCheck}
                                        checked={postPaidCheck}
                                        onCheked={ChangePostpaid}
                                    ></CusCheckBox>
                                </Box>
                                <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Postpaid</Box>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 2 }}>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', }}>
                        <Box sx={{ flex: 2 }}>
                            <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 40, pt: 1, }}>
                                <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                    Sim Operator<Typography sx={{ color: '#5F093D' }}>*</Typography>
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 30, }}>
                                <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                    Sim SlNo
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, }}>
                                <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                    Sim IMEI
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, }}>
                                <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                    Sim Mobile No.<Typography sx={{ color: '#5F093D' }}>*</Typography>
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, }}>
                                <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                    Tariff<Typography sx={{ color: '#5F093D' }}>*</Typography>
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 35, }}>
                                <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                    Tariff Amount
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 2.5, }}>
                            <Box sx={{ pt: .5 }}>
                                <SimOperator
                                    provider={provider}
                                    setProvider={setProvider} />

                            </Box>
                            <Box sx={{ pt: .3 }}>
                                <TextFieldCustom
                                    placeholder="Sim SlNo"
                                    type="text"
                                    size="sm"
                                    name="it_sim_serial_no"
                                    value={it_sim_serial_no}
                                    onchange={SimMastUpdate}
                                ></TextFieldCustom>
                            </Box>
                            <Box sx={{ pt: .3 }}>
                                <TextFieldCustom
                                    placeholder="Sim IMEI"
                                    type="text"
                                    size="sm"
                                    name="it_sim_imei_no"
                                    value={it_sim_imei_no}
                                    onchange={SimMastUpdate}
                                ></TextFieldCustom>
                            </Box>

                            <Box sx={{ pt: .3 }}>
                                <TextFieldCustom
                                    placeholder="Sim Mobile Number"
                                    type="text"
                                    size="sm"
                                    name="it_sim_mobile_no"
                                    value={it_sim_mobile_no}
                                    onchange={SimMastUpdate}
                                ></TextFieldCustom>

                            </Box>
                            <Box sx={{ mt: .3 }}>
                                <TariffSelect
                                    tarrif={tarrif}
                                    setTarrif={setTarrif} />
                            </Box>
                            <Box sx={{ mt: .3 }}>
                                <TextFieldCustom
                                    placeholder=" Amount. Rs."
                                    type="text"
                                    size="sm"
                                    name="it_sim_tariff_amount"
                                    value={it_sim_tariff_amount}
                                    onchange={SimMastUpdate}
                                ></TextFieldCustom>
                            </Box>

                            <Box sx={{ display: 'flex', mt: 1 }}>
                                <Box>
                                    <CusCheckBox
                                        // label="status"
                                        color="primary"
                                        size="md"
                                        name="it_sim_status"
                                        value={it_sim_status}
                                        checked={it_sim_status}
                                        onCheked={SimMastUpdate}
                                    ></CusCheckBox>
                                </Box>
                                <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>Sim Status</Box>
                                {/* {value === 1 ? */}
                                <Box sx={{ flex: 1, display: 'flex', ml: 3 }}>
                                    <Box sx={{ pt: .5 }}>
                                        <CusCheckBox

                                            color="primary"
                                            size="md"
                                            name="reciverCheck"
                                            value={reciverCheck}
                                            checked={reciverCheck}
                                            onCheked={recieverBox}
                                        ></CusCheckBox>
                                    </Box>
                                    <Box sx={{ pl: 1, color: '#000C66', fontFamily: 'Georgia' }}>SiM Issue</Box>
                                </Box>
                                {/* : null} */}
                            </Box>

                        </Box>

                        <Box sx={{ flex: 2, }}>
                        </Box>
                    </Box>

                    {/* ////////////// */}
                    {reciverFlag === 1 ?
                        <Box sx={{ display: 'flex', }}>
                            <Box sx={{ flex: 2, }}>
                                <Box sx={{ fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 40, pt: 1, }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Department
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, height: 30, }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Section
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Reciever&apos;s EmpID
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Reciever&apos;s Name
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 30, }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Contact No.
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 2, fontSize: 15, display: 'flex', justifyContent: 'right', mr: 1, mt: .5, height: 35, }}>
                                    <Typography sx={{ color: '#003B73', fontFamily: 'Georgia' }}>
                                        Issue Date
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ flex: 2.5 }}>
                                <Box sx={{ pt: .5 }}>
                                    <TmDepartmentSelect
                                        department={department}
                                        setDepartment={setDepartment} />

                                </Box>
                                <Box sx={{ pt: .3 }}>
                                    <TmDeptSectionSelect
                                        deptsec={deptsec}
                                        setDeptSec={setDeptSec} />
                                </Box>
                                <Box sx={{ pt: .5 }}>
                                    <TextFieldCustom
                                        placeholder="employee id"
                                        type="text"
                                        size="sm"
                                        name="it_sim_recie_empid"
                                        value={it_sim_recie_empid}
                                        onchange={SimMastUpdate}
                                    ></TextFieldCustom>

                                </Box>
                                <Box sx={{ pt: .3 }}>
                                    <TextFieldCustom
                                        placeholder="Reciver's Name"
                                        type="text"
                                        size="sm"
                                        name="it_sim_recie_name"
                                        value={it_sim_recie_name}
                                        onchange={SimMastUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ pt: .5 }}>
                                    <TextFieldCustom
                                        placeholder="Reciver's Contact No."
                                        type="text"
                                        size="sm"
                                        name="it_sim_recei_contact"
                                        value={it_sim_recei_contact}
                                        onchange={SimMastUpdate}
                                    ></TextFieldCustom>

                                </Box>
                                <Box sx={{ pt: .3 }}>
                                    <TextFieldCustom
                                        placeholder="date"
                                        type="date"
                                        size="sm"
                                        name="it_sim_issue_date"
                                        value={it_sim_issue_date}
                                        onchange={SimMastUpdate}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>

                            <Box sx={{ flex: 2 }}>
                            </Box>

                        </Box> : null}
                    {/* /////////////////// */}





                    <Box sx={{ display: 'flex', }}>
                        <Box sx={{ flex: 1.5, }}>
                        </Box>


                        <Box sx={{ flex: 1, display: 'flex', }}>

                            <CssVarsProvider>
                                {value === 0 ?
                                    <Button variant="outlined"
                                        onClick={InsertSimDetails}

                                        sx={{ fontSize: 15, width: 150 }} ><AddIcon />Add SiM</Button> :

                                    value === 1 ? <Button variant="outlined"
                                        onClick={UpdateSimDetails}
                                        sx={{ fontSize: 16, width: 150 }} >Update </Button> : null}


                            </CssVarsProvider>

                        </Box><Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>


                        </Box>



                    </Box>
                    <Box >
                        <SimDataTable tableCount={tableCount} rowSelect={rowSelect} />
                    </Box>

                </Box>

            </CssVarsProvider>
        </Paper >

    )
}

export default memo(SimDetails)