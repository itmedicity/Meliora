import React, { Fragment, useState, useCallback, useMemo, memo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';

const CommunicationModalEdit = ({ open, handleClose, getarry, count, setCount }) => {
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const { device_type_name, dept_name, reciver_name, asset_no, device_num, tarrifname,
        providername, amount, receiver_emp_id, sec_name, sim_number, device_ima, ima, sim_mobile_num,
        device_slno, issue_date, contact_no, issue_status, device_name
    } = getarry
    const [issueEditModal, setissueEditModal] = useState({
        recievID: receiver_emp_id,
        recievName: reciver_name,
        recievContact: contact_no,
        issuedDate: issue_date,
        issueStatus: issue_status === 1 ? true : false,
    })
    const { recievID, recievName, recievContact, issuedDate, issueStatus, } = issueEditModal

    const issueEditModalUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setissueEditModal({ ...issueEditModal, [e.target.name]: value })
        },
        [issueEditModal],
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
            provider: '',
            issue_date: '',
            asset_no: '',
            tarrif: '',
            amount: '',
            device_num: '',
            device_ima: '',
            sim_mobile_num: '',
            receiver_emp_id: '',
            issue_status: false
        }
        setissueEditModal(formdata)
    }
    const patchdata = useMemo(() => {
        return {
            device_slno: device_slno,
            receiver_emp_id: recievID,
            reciver_name: recievName,
            contact_no: recievContact,
            issue_date: issuedDate,
            issue_status: issueStatus === true ? 1 : 0,
            edit_user: id
        }
    }, [
        device_slno,
        id, recievID, recievName, recievContact, issuedDate, issueStatus
    ])
    const submitModal = useCallback(
        (e) => {
            e.preventDefault()
            const isValidMobileNumber = (number) => /^\d{10}$/.test(number);
            const containsOnlyDigits = (value) => /^\d+$/.test(value);
            const containsOnlyLetters = (value) => /^[A-Za-z]+$/.test(value);

            if (recievContact !== '') {
                if (!isValidMobileNumber(recievContact)) {
                    infoNotify("Please enter a valid 10-digit receiver mobile number");
                    return; // Stop further processing if the number is invalid
                }
            }
            if (recievID !== '' && !containsOnlyDigits(recievID)) {
                infoNotify("Please enter a valid employee ID with digits only");
                return; // Stop further processing if the employee ID is invalid
            }
            if (recievName !== '' && !containsOnlyLetters(recievName)) {
                infoNotify("Please enter the receiver name with alphabetic characters only");
                return; // Stop further processing if the name is invalid
            }
            const UpdateIssueModal = async (patchdata) => {

                const result = await axioslogin.patch('/communicationDeviceDetails/update', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    handleClose()
                    reset()
                    setCount(count + 1)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (recievName !== '' && recievName !== '') {
                UpdateIssueModal(patchdata)
                reset()
            }
            else {
                if (recievID === '') {
                    infoNotify("Please enter the receiver employeee id");
                }
                else if (recievName === '') {
                    infoNotify("Please enter the receiver name");
                }
            }
        },
        [patchdata, handleClose, setCount, recievName, recievContact, recievID, count],
    )
    return (
        <Fragment  >
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
            >
                < DialogContent
                    sx={{ width: 630, height: 730 }}>
                    <Box sx={{ width: '100%' }}>
                        <Box id="alert-dialog-slide-descriptiona"
                            sx={{ fontWeight: 'bold', height: '50px', pt: 2, color: '#004F76', textAlign: 'center', }}>
                            Add Communication Device Details
                        </Box>

                        <Box sx={{
                            width: '100%',
                            height: '92%',
                            borderRadius: 1,
                        }}>




                            <Box sx={{
                                width: '100%',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,


                            }}>
                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 18, pl: 1, color: '#5F093D', pt: 1 }}>Asseted location</Typography>
                                </CssVarsProvider>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Department</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        // backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {dept_name}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Location</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {sec_name}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 18, pl: 1, pt: .5, color: '#5F093D' }}>Device details</Typography>
                                </CssVarsProvider>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Device name</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {device_name}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Device type</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {device_type_name}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Device Sl No./IM</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {device_ima}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Device No.</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {device_num}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>




                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 18, pl: 1, color: '#5F093D' }}>Sim details</Typography>
                                </CssVarsProvider>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>SIM Serial No./IMA</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {ima}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>SIM Number</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {sim_number}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>SIM Operator</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {providername}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Sim mobile No.</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {sim_mobile_num}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>



                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    // backgroundColor: 'orange',
                                    margin: 'auto',
                                    // pt:.5
                                }}>




                                </Box>
                                {/* </Box> */}



                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 18, pl: 1, color: '#5F093D' }}>Tarrif details</Typography>
                                </CssVarsProvider>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Tarrif</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {tarrifname}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Amount</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {amount}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                                {/* </Box> */}

                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 17, pl: 1, color: '#5F093D' }}>Asset Number</Typography>
                                </CssVarsProvider>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{ flex: .3, pl: 1 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Asset No.</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        //   backgroundColor: 'red',
                                        flex: 1
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {asset_no}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>


                            </Box>

                            <Box sx={{
                                //    flex:1,
                                width: '100%',
                                // height:'30%',
                                // backgroundColor:'lightgrey',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1,
                                mt: .5,
                                // margin: 'auto',
                                pt: .5

                            }}>


                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 17, pl: 1, color: '#5F093D' }}>Recievers details</Typography>
                                </CssVarsProvider>

                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{
                                        flex: .2, pl: 1, pt: 1,
                                        // backgroundColor: 'blue'
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Reciever Emp ID</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        // backgroundColor: 'red',
                                        flex: .4,
                                        // mr: 1,
                                        mb: .5,
                                        pt: .5,
                                        ml: 1




                                    }}>
                                        <TextFieldCustom
                                            placeholder="Emp.ID"
                                            type="text"
                                            size="sm"
                                            name="recievID"
                                            value={recievID}
                                            onchange={issueEditModalUpdate}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{
                                        flex: .2, pl: 1,
                                        // backgroundColor: 'blue'
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Reciever Name</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        // backgroundColor: 'red',
                                        flex: .7,
                                        // mr: 1,
                                        mb: .5,
                                        ml: 1




                                    }}>
                                        <TextFieldCustom
                                            placeholder=" Name"
                                            type="text"
                                            size="sm"
                                            name="recievName"
                                            value={recievName}
                                            onchange={issueEditModalUpdate}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{
                                        flex: .2, pl: 1,
                                        // backgroundColor: 'blue'
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Reciever Ph No</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box sx={{
                                        // backgroundColor: 'red',
                                        flex: .4,
                                        // mr: 1,
                                        ml: 1




                                    }}>
                                        <TextFieldCustom
                                            placeholder="Contact No"
                                            type="text"
                                            size="sm"
                                            name="recievContact"
                                            value={recievContact}
                                            onchange={issueEditModalUpdate}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    // backgroundColor: 'orange',
                                    margin: 'auto',
                                    pt: 1
                                }}>



                                </Box>

                                <Box sx={{
                                    //    flex:1,
                                    width: '100%',
                                    // height:'30%',
                                    // backgroundColor:'lightgrey',
                                    // border: .5, borderColor: '#9DBED1', borderRadius: 1,
                                    // mt: .5,
                                    // margin: 'auto',

                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 17, pl: 1, color: '#5F093D' }}>Issued details</Typography>
                                    </CssVarsProvider>
                                    <Box
                                        sx={{ display: 'flex', }}>
                                        <Box sx={{
                                            flex: .2, pl: 1, pt: 1.5
                                            // backgroundColor: 'blue'
                                        }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Issued Date</Typography>
                                            </CssVarsProvider>
                                        </Box>

                                        <Box sx={{
                                            // backgroundColor: 'red',
                                            flex: .4,
                                            mr: 1,
                                            mb: .5,
                                            pt: 1,
                                            ml: 1



                                        }}>
                                            <TextFieldCustom
                                                // placeholder="Contact No."
                                                type="date"
                                                size="sm"
                                                name="issuedDate"
                                                value={issuedDate}
                                                onchange={issueEditModalUpdate}
                                            ></TextFieldCustom>
                                        </Box>

                                    </Box>
                                    <Box sx={{ display: 'flex', py: 2, margin: 'auto', width: '40%' }}>
                                        {/* <Box sx={{ flex: 1, }}> */}
                                        {/* <CusCheckBox
                                            color="primary"
                                            size="md"
                                            name="issueStatus"
                                            value={issueStatus}
                                            checked={issueStatus}
                                            onCheked={issueEditModalUpdate}
                                        ></CusCheckBox> */}
                                        {/* </Box> */}

                                        {/* <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, pl: 1, }}>Issued Status</Typography>
                                        </CssVarsProvider> */}

                                    </Box>

                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        // backgroundColor: 'orange',
                                        margin: 'auto',
                                        pt: 1
                                    }}>

                                        {/* 
                                        <Box
                                            sx={{
                                                height: '25%',
                                                flex: 1,
                                                px: .5,
                                                pb: .5
                                                // backgroundColor: 'red'
                                            }}>
                                            <TextFieldCustom
                                                // placeholder="Contact No."
                                                type="date"
                                                size="sm"
                                                name="issuedDate"
                                                value={issuedDate}
                                                onchange={issueEditModalUpdate}
                                            ></TextFieldCustom>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', pl: .5, pt: .5 }}>
                                            <CusCheckBox
                                                color="primary"
                                                size="md"
                                                name="issueStatus"
                                                value={issueStatus}
                                                checked={issueStatus}
                                                onCheked={issueEditModalUpdate}
                                            ></CusCheckBox>
                                        </Box> */}
                                        {/* <Box sx={{ flex: .9, pl: .5 }}>

                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Issued Status</Typography>
                                            </CssVarsProvider>
                                        </Box> */}




                                    </Box>
                                </Box>
                            </Box>

                            {/* <Box sx={{
                    // backgroundColor: 'orange',
                    display: 'flex', height: 50, width: 400,
                    pt:1,
                    margin: 'auto'
                }} >
                    <Box sx={{ flex: .3 ,}}>
                        
                    <CssVarsProvider>
                        <Typography sx={{ fontSize: 15 }}>Sim Status</Typography>
                    </CssVarsProvider>
                    </Box>
                    <Box sx={{ flex: .4 ,}} >
                    <CusCheckBox
                    color="primary"
                    size="md"
                    name="sim_status"
                    value={sim_status}
                    checked={sim_status}
                    onCheked={DeviceTypeUpdate}
                ></CusCheckBox>
                    </Box>
                    <Box  sx={{flex:.3,}}>
                    <CssVarsProvider>
                        <Typography sx={{ fontSize: 15 }}>Issued Status</Typography>
                    </CssVarsProvider>
                    </Box>
                    <Box sx={{flex:.3}}>
                    <CusCheckBox
                    color="primary"
                    size="md"
                    name="issue_status"
                    value={issue_status}
                    checked={issue_status}
                    onCheked={DeviceTypeUpdate}
                ></CusCheckBox>
                    </Box>
                
                </Box> */}

                        </Box>




                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={submitModal}
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


export default memo(CommunicationModalEdit)