import React, { Fragment, memo, useState, useCallback, useMemo, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Divider } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ItCommunicationDeviceTypeSelect from 'src/views/CommonSelectCode/ItCommunicationDeviceTypeSelect';
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect';
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useDispatch, useSelector } from 'react-redux';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { getDepartment } from 'src/redux/actions/Department.action';

const ModalCommunicationDevice = ({ open, count, setCount, handleClose,
}) => {



    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch,])

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [deviceType, setDeviceType] = useState(0)
    const [department, setDepartment] = useState(0)
    const [location, setLocation] = useState(0)
    // const [tarrif, setTarrif] = useState(0)
    // const [provider, setProvider] = useState(0)

    const [communicationDeviceModal, setcommunicationDeviceModal] = useState({
        device_slno: '',
        reciver_name: '',
        contact_no: '',
        ima: '',
        sim_number: '',
        issue_date: '',
        asset_no: '',
        sim_status: false,
        amount: '',
        device_ima: '',
        device_num: '',
        sim_mobile_num: '',
        receiver_emp_id: '',
        device_name: '',
        issue_status: false,
    })
    const { reciver_name, contact_no, ima, sim_number, issue_date, asset_no, sim_status, amount,
        issue_status, device_ima, device_num, sim_mobile_num, receiver_emp_id, device_name } = communicationDeviceModal

    const DeviceTypeUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setcommunicationDeviceModal({ ...communicationDeviceModal, [e.target.name]: value })
        },
        [communicationDeviceModal],
    )
    const reset = () => {
        const formdata = {
            device_slno: '',
            device_name: '',
            device_type_slno: '',
            department: '',
            location: '',
            reciver_name: '',
            contact_no: '',
            ima: '',
            sim_number: '',
            // provider: '',
            issue_date: '',
            asset_no: '',
            sim_status: '',
            // tarrif: '',
            amount: '',
            device_ima: '',
            device_num: '',
            sim_mobile_num: '',
            receiver_emp_id: '',
            issue_status: false
        }
        setcommunicationDeviceModal(formdata)
    }

    const postdata = useMemo(() => {
        return {
            reciver_name: reciver_name === '' ? null : reciver_name,
            contact_no: contact_no === '' ? null : contact_no,
            ima: ima === '' ? null : ima,
            sim_number: sim_number === '' ? null : sim_number,
            // provider: provider === 0 ? null : provider,
            issue_date: issue_date === '' ? null : issue_date,
            asset_no: asset_no === '' ? null : asset_no,
            sim_status: sim_status === true ? 1 : 0,
            // tarrif: tarrif === 0 ? null : tarrif,
            amount: amount === '' ? null : amount,
            device_type_slno: deviceType === 0 ? null : deviceType,
            department: department === 0 ? null : department,
            location: location === 0 ? null : location,
            device_ima: device_ima === '' ? null : device_ima,
            device_num: device_num === '' ? null : device_num,
            sim_mobile_num: sim_mobile_num === '' ? null : sim_mobile_num,
            receiver_emp_id: receiver_emp_id === '' ? null : receiver_emp_id,
            device_name: device_name === '' ? null : device_name,
            issue_status: issue_status === true ? 1 : 0,
            create_user: id,
            edit_user: issue_status === 1 ? id : null,
        }
    }, [reciver_name, contact_no, ima, sim_number,
        // provider,
        issue_date, asset_no, sim_status,
        // tarrif,
        amount, deviceType, issue_status, department, location,
        device_ima, device_num, sim_mobile_num, receiver_emp_id, device_name, id])
    const submitDeviceType = useCallback(
        (e) => {
            e.preventDefault()
            const isValidMobileNumber = (number) => /^\d{10}$/.test(number);
            const containsOnlyDigits = (value) => /^\d+$/.test(value);
            const containsOnlyLetters = (value) => /^[A-Za-z]+$/.test(value);

            if (contact_no !== '') {
                if (!isValidMobileNumber(contact_no)) {
                    infoNotify("Please enter a valid 10-digit receiver mobile number");
                    return; // Stop further processing if the number is invalid
                }
            }
            if (sim_mobile_num !== '') {
                if (!isValidMobileNumber(sim_mobile_num)) {
                    infoNotify("Please enter a valid 10-digit SIM mobile number");
                }
            }
            if (amount !== '' && !containsOnlyDigits(amount)) {
                infoNotify("Please enter tarrif amount with digits only");
                return; // Stop further processing if the amount is invalid
            }
            if (receiver_emp_id !== '' && !containsOnlyDigits(receiver_emp_id)) {
                infoNotify("Please enter a valid employee ID with digits only");
                return; // Stop further processing if the employee ID is invalid
            }
            if (reciver_name !== '' && !containsOnlyLetters(reciver_name)) {
                infoNotify("Please enter the receiver name with alphabetic characters only");
                return; // Stop further processing if the name is invalid
            }
            const InsertDeviceType = async (postdata) => {
                const result = await axioslogin.post('/communicationDeviceDetails/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    handleClose()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }

            if (
                // tarrif !== 0 &&
                amount !== '' && device_name !== '' && reciver_name !== ''
                && receiver_emp_id !== '' && deviceType !== 0 && department !== 0 && location !== 0) {
                InsertDeviceType(postdata);
                reset()
            } else {
                if (device_name === '') {
                    infoNotify("Please enter the device name");
                }
                else if (reciver_name === '') {
                    infoNotify("Please enter the receiver name");
                }
                else if (receiver_emp_id === '') {
                    infoNotify("Please enter the receiver employee ID");
                }
                // else if (tarrif === 0) {
                //     infoNotify("Please choose a tarrif");
                // }
                else if (amount === '') {
                    infoNotify("Please enter the tarrif amount");
                }
                else if (deviceType === 0) {
                    infoNotify("Please select the device type");
                }
                else if (department === 0) {
                    infoNotify("Please select the department");
                }
                else if (location === 0) {
                    infoNotify("Please select the department section");
                }
            }
        },
        [count, postdata, handleClose, device_name, reciver_name, receiver_emp_id,
            // tarrif,
            amount, sim_mobile_num, contact_no, deviceType, department, location, setCount],
    )
    return (
        <Fragment  >
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
            >
                < DialogContent
                    sx={{
                        width: 850,
                        height: '100vw',
                    }}
                >
                    <Box sx={{
                        width: '100%',
                        border: .5, borderColor: '#9DBED1', borderRadius: 1
                    }}>
                        <Box id="alert-dialog-slide-descriptiona"
                            sx={{ fontWeight: 600, fontSize: 19, height: '50px', pt: 2, color: '#004F76', textAlign: 'center', }}>
                            Add Communication Device Details
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                    Location</Divider>
                            </CssVarsProvider>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, pt: 1, display: 'flex', justifyContent: 'right' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Department
                                            <Typography sx={{ color: '#A30000' }}>*</Typography></Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: 1, ml: 1 }}>

                                    <DepartmentSelect value={department} setValue={setDepartment} />
                                    {/* <TmDepartmentSelect
                                        department={department}
                                        setDepartment={setDepartment} /> */}


                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>

                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .5, }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Section
                                            <Typography sx={{ color: '#5F093D' }}>
                                                *
                                            </Typography></Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: 1, ml: 1 }}>

                                    {/* <TmDeptSectionSelect
                                        deptsec={department}
                                        setDeptSec={setLocation} /> */}

                                    <DeptSecUnderDept dept={department} value={location} setValue={setLocation} />


                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                    Device Details</Divider>
                            </CssVarsProvider>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', pt: 1.5, justifyContent: 'right' }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Device Name
                                            <Typography sx={{ color: '#5F093D' }}>
                                                *
                                            </Typography></Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: 1, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder="Device Name"
                                        type="text"
                                        size="sm"
                                        name="device_name"
                                        value={device_name}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>

                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Device type<Typography sx={{ color: '#5F093D' }}>
                                            *
                                        </Typography></Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: 1, ml: 1 }}>
                                    <ItCommunicationDeviceTypeSelect value={deviceType} setValue={setDeviceType} />
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .8 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Device slno./IMA</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: .5, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder="Device Sl No./IMA"
                                        type="text"
                                        size="sm"
                                        name="device_ima"
                                        value={device_ima}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Device Number</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: .5, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder="Device No."
                                        type="text"
                                        size="sm"
                                        name="device_num"
                                        value={device_num}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                    Sim Details</Divider>
                            </CssVarsProvider>


                            {/* <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>SIM slno./IMA</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: 1, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder="SIM Serial No./IMA"
                                        type="text"
                                        size="sm"
                                        name="ima"
                                        value={ima}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box> */}

                            {/* <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .8 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>SIM Number</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: .5, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder=" SIM Number"
                                        type="text"
                                        size="sm"
                                        name="sim_number"
                                        value={sim_number}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box> */}
                            {/* <Box sx={{ display: 'flex', }}> */}
                            {/* <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>SIM Operator</Typography>
                                    </CssVarsProvider>
                                </Box> */}
                            {/* <Box sx={{ flex: 3, ml: 1, mt: 1, }}> */}
                            {/* <ProviderDropDown
                                        value={provider}
                                        setValue={setProvider} /> */}
                            {/* </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box> */}
                            {/* <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>SIM Mobile No.</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: .5, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder="SIM mobile No."
                                        type="text"
                                        size="sm"
                                        name="sim_mobile_num"
                                        value={sim_mobile_num}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box> */}
                        </Box>
                        <Box>
                            {/* <CssVarsProvider>
                                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                    Tariff Details</Divider>
                            </CssVarsProvider> */}
                            {/* <Box sx={{ display: 'flex', }}> */}
                            {/* <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Tarrif    <Typography sx={{ color: '#5F093D' }}>
                                            *
                                        </Typography> </Typography>
                                    </CssVarsProvider>
                                </Box> */}
                            {/* <Box sx={{ flex: 3, mt: 2, ml: 1 }}> */}
                            {/* <TarrifDropDown value={tarrif} setValue={setTarrif} /> */}
                            {/* </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box> */}

                            <Box sx={{ display: 'flex', }}>
                                {/* <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Tariff Amount<Typography sx={{ color: '#5F093D' }}>
                                            *
                                        </Typography></Typography>
                                    </CssVarsProvider>
                                </Box> */}
                                {/* <Box sx={{ flex: 3, mt: .1, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder=" Amount. Rs."
                                        type="text"
                                        size="sm"
                                        name="amount"
                                        value={amount}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box> */}
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                    Asset Details</Divider>
                            </CssVarsProvider>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Asset Number</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: 1, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder="Asset No."
                                        type="text"
                                        size="sm"
                                        name="asset_no"
                                        value={asset_no}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                    Reciever&apos;s Details</Divider>
                            </CssVarsProvider>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Employee ID<Typography sx={{ color: '#5F093D' }}>
                                            *
                                        </Typography></Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: 1, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder="Emp.ID"
                                        type="text"
                                        size="sm"
                                        name="receiver_emp_id"
                                        value={receiver_emp_id}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}> Employee Name<Typography sx={{ color: '#5F093D' }}>
                                            *
                                        </Typography></Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: .5, ml: 1 }}>
                                    <TextFieldCustom
                                        placeholder="Receiver name"
                                        type="text"
                                        size="sm"
                                        name="reciver_name"
                                        value={reciver_name}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: .5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Contact No.</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, ml: 1, mt: .5 }}>
                                    <TextFieldCustom
                                        placeholder="Contact No"
                                        type="text"
                                        size="sm"
                                        name="contact_no"
                                        value={contact_no}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <CssVarsProvider>
                                <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                    Issued Details</Divider>
                            </CssVarsProvider>
                            <Box sx={{ display: 'flex', }}>
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', pt: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, color: '#000C66', }}>Issued Date</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ flex: 3, mt: 1, ml: 1 }}>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="issue_date"
                                        value={issue_date}
                                        onchange={DeviceTypeUpdate}
                                    ></TextFieldCustom>
                                </Box>
                                <Box sx={{ flex: 1 }}></Box>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', mb: 1 }}>
                            <Box sx={{ flex: 2, display: 'flex', justifyContent: 'right', }}>
                                <CusCheckBox
                                    // label="Sim Status"
                                    color="primary"
                                    size="md"
                                    name="sim_status"
                                    value={sim_status}
                                    checked={sim_status}
                                    onCheked={DeviceTypeUpdate}
                                ></CusCheckBox>
                            </Box>
                            <Box sx={{ pl: 1, flex: 3, color: '#000C66', fontFamily: 'Georgia' }}>Sim Status</Box>
                        </Box>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={submitDeviceType}
                        sx={{ color: "#004F76", fontWeight: 'bold' }}
                    >Save</Button>
                    <Button
                        sx={{ color: "#004F76", fontWeight: 'bold' }}
                        onClick={handleClose}
                    >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(ModalCommunicationDevice)