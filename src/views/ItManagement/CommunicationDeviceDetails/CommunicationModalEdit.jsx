import React, { Fragment, useState, useCallback, useMemo, memo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Divider, } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';

const CommunicationModalEdit = ({ open, handleClose, getarry, count, setCount }) => {
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const {
        device_type_name, dept_name, reciver_name, asset_no, device_num, tarrifname,
        providername, amount, receiver_emp_id, sec_name, sim_number, device_ima, ima, sim_mobile_num,
        device_slno, issue_date, contact_no, issue_status, device_name
    } = getarry
    const [issueEditModal, setissueEditModal] = useState({
        recievID: receiver_emp_id === null ? '' : receiver_emp_id,
        recievName: reciver_name === null ? '' : reciver_name,
        recievContact: contact_no === null ? '' : contact_no,
        issuedDate: issue_date === null ? '' : issue_date,
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

    const patchdata = useMemo(() => {
        return {
            device_slno: device_slno,
            receiver_emp_id: recievID === '' ? null : recievID,
            reciver_name: recievName === '' ? null : recievName,
            contact_no: recievContact === '' ? null : recievContact,
            issue_date: issuedDate === '' ? null : issuedDate,
            issue_status: issueStatus === true ? 1 : 0,
            edit_user: id
        }
    }, [device_slno, id, recievID, recievName, recievContact, issuedDate, issueStatus
    ])
    const submitModal = useCallback(
        (e) => {
            e.preventDefault()
            const isValidMobileNumber = (number) => /^\d{10}$/.test(number);
            const containsOnlyDigits = (value) => /^\d+$/.test(value);
            const containsOnlyLetters = (value) => /^[A-Za-z]+$/.test(value);

            if (recievContact !== '') {
                if (!isValidMobileNumber(recievContact)) {
                    infoNotify("Please enter a valid 10-digit  mobile number");
                    return;
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

                    setCount(count + 1)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (recievName !== '' && recievID !== '') {
                UpdateIssueModal(patchdata)
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
                    sx={{ width: 800, height: '100vw' }}>
                    <Box sx={{ width: '100%' }}>

                        <Box sx={{
                            borderRadius: 1
                        }}>
                            <Box sx={{
                                width: '100%',
                                border: .5, borderColor: '#9DBED1', borderRadius: 1
                            }}>
                                <Box id="alert-dialog-slide-descriptiona"
                                    sx={{ fontWeight: 600, fontSize: 18, pt: 2, color: '#004F76', textAlign: 'center', }}>
                                    Edit Reciever Details
                                </Box>
                                <CssVarsProvider>
                                    <Divider textAlign="left" sx={{ fontWeight: 400, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                        Asseted Location</Divider>

                                </CssVarsProvider>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Department</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 3 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {dept_name !== null ? dept_name : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Section</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {sec_name !== null ? sec_name : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <CssVarsProvider>
                                    <Divider textAlign="left" sx={{ fontWeight: 400, mx: 2, fontSize: 18, color: '#5F093D', mt: 1, fontFamily: 'Georgia' }}>
                                        Device Details</Divider>

                                </CssVarsProvider>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Device name</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {device_name !== null ? device_name : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Device type</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {device_type_name !== null ? device_type_name : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Device Sl No./IM</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {device_ima !== null ? device_ima : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Device No.</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {device_num !== null ? device_num : "Not given"}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <CssVarsProvider>
                                    <Divider textAlign="left" sx={{ fontWeight: 400, mx: 2, fontSize: 18, color: '#5F093D', mt: 1, fontFamily: 'Georgia' }}>
                                        Sim Details</Divider>

                                </CssVarsProvider>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>SIM Serial No./IMA</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {ima !== null ? ima : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>SIM Number</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {sim_number !== null ? sim_number : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>SIM Operator</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {providername !== null ? providername : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ pt: .5, display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Sim mobile No.</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {sim_mobile_num !== null ? sim_mobile_num : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    margin: 'auto'
                                }}>
                                </Box>
                                <CssVarsProvider>
                                    <Divider textAlign="left" sx={{ fontWeight: 400, mx: 2, fontSize: 18, color: '#5F093D', mt: 1, fontFamily: 'Georgia' }}>
                                        Tariff Details Location</Divider>

                                </CssVarsProvider>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Tarrif</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {tarrifname !== null ? tarrifname : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Amount</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {amount !== null ? amount : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <CssVarsProvider>
                                    <Divider textAlign="left" sx={{ fontWeight: 400, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                                        Asset Details</Divider>
                                </CssVarsProvider>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{ flex: 1, pr: 1, display: 'flex', justifyContent: 'right' }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66', }}>Asset No.</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>:&nbsp;
                                                {asset_no !== null ? asset_no : 'Not given'}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <CssVarsProvider>
                                    <Divider textAlign="left" sx={{ fontWeight: 400, mx: 2, fontSize: 18, color: '#5F093D', mt: 1, fontFamily: 'Georgia' }}>
                                        Reciever&apos;s details</Divider>
                                </CssVarsProvider>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{
                                        flex: 1, pl: 1, pt: 1, display: 'flex', justifyContent: 'right'
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Employee ID</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3,
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
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{
                                        flex: 1, pl: 1, display: 'flex', justifyContent: 'right'
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}> Name</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3,
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
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box
                                    sx={{ display: 'flex', }}>
                                    <Box sx={{
                                        flex: 1, pl: 1, display: 'flex', justifyContent: 'right'
                                    }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15, color: '#000C66' }}>Comtact No.</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        flex: 3,
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
                                    </Box><Box sx={{ flex: 1 }}></Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    margin: 'auto',
                                    pt: 1
                                }}>
                                </Box>
                                <Box sx={{
                                    width: '100%',
                                }}>
                                    <CssVarsProvider>
                                        <Divider textAlign="left" sx={{ fontWeight: 400, mx: 2, fontSize: 18, color: '#5F093D', mt: 1, fontFamily: 'Georgia' }}>
                                            Issued Details</Divider>

                                    </CssVarsProvider>
                                    <Box
                                        sx={{ display: 'flex', }}>
                                        <Box sx={{
                                            flex: 1, pl: 1, pt: 1.5, display: 'flex', justifyContent: 'right'
                                        }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15, color: '#000C66' }}>Issued Date</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{
                                            flex: 3,
                                            mr: 1,
                                            mb: .5,
                                            pt: 1,
                                            ml: 1
                                        }}>
                                            <TextFieldCustom
                                                type="date"
                                                size="sm"
                                                name="issuedDate"
                                                value={issuedDate}
                                                onchange={issueEditModalUpdate}
                                            ></TextFieldCustom>
                                        </Box><Box sx={{ flex: 1 }}></Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', py: 2, margin: 'auto', width: '40%' }}>
                                    </Box>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        margin: 'auto',
                                        pt: 1
                                    }}>
                                    </Box>
                                </Box>
                            </Box>
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