import React, { Fragment, memo, useCallback, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import { CssVarsProvider, Typography } from '@mui/joy'
import { format } from 'date-fns'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DeptWiseEmpSelect from 'src/views/CommonSelectCode/DeptWiseEmpSelect';
import CustomTextarea from 'src/views/Components/CustomTextarea';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const AssistTransferSuper = ({ open, setOpen, transfer, count, empdept, setCount, setTransmodal }) => {
    //props data for modal
    const { complaint_slno, complaint_desc, compalint_date, sec_name, req_type_name, complaint_type_name,
        priority } = transfer[0]

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [getAssignEmp, setGetAssignEmp] = useState([])
    // sate for getting emp dept
    const [empdeptwise, setEmpdept] = useState(0)
    //setting data to detailed assign
    const [personName, setPersonName] = useState([]);
    const [remark, setRemark] = useState('');
    //updating remark state
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [setRemark])
    //getting department of the user
    useEffect(() => {
        if (empdept.length !== 0) {
            const { em_department } = empdept[0]
            setEmpdept(em_department)
        }
    }, [empdept])

    useEffect(() => {
        const getEmployeees = async () => {
            const result = await axioslogin.get(`complaintassign/getAssistRequest/${complaint_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setGetAssignEmp(data)
            }
            else {
                setGetAssignEmp([])
            }
        }
        getEmployeees();
    }, [complaint_slno])

    //data setting to indert to db
    const postData = personName && personName.map((val) => {
        return {
            complaint_slno: complaint_slno,
            assigned_emp: val,
            assign_rect_status: 0,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assigned_userid: id,
            assist_flag: 1,
            assist_assign_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assist_receive: 1,
            assist_requested_empid: id,
            assign_status: 1
        }
    })
    const inactive = getAssignEmp && getAssignEmp.map((value) => {
        return {
            complaint_slno: complaint_slno,
            assigned_emp: value.assigned_emp
        }
    })
    //reset function for to intial state
    const reset = useCallback(() => {
        setOpen(false);
        setTransmodal(0);
        setGetAssignEmp([])
        setEmpdept(0)
        setPersonName([])
        setRemark('')
    }, [setOpen, setTransmodal])


    // when we click on transfer function
    const Transfer = useCallback(() => {
        const Assignemp = async (postData) => {
            const result = await axioslogin.post(`/complaintassign/Assisttransfer/insert`, postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const Inactiveemp = async (inactive) => {
            const result = await axioslogin.post(`/complaintassign/assistTrans/Inactive`, inactive);
            return result.data

        }
        if (personName.length === 0) {
            infoNotify("Please Select Employee")
        } else {
            Inactiveemp(inactive).then((result) => {
                const { messagee, succes } = result;
                if (succes === 1) {
                    Assignemp(postData);
                } else if (succes === 0) {
                    infoNotify(messagee)
                } else {
                    infoNotify(messagee)
                }
            })
        }
    }, [postData, inactive, count, reset, setCount, personName])

    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
                fullWidth
                maxWidth='md'
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: '100%',
                        height: "100%"
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Employee Trasfer
                    </DialogContentText>


                    <Box sx={{ width: "100%", mt: 0, mb: 2 }}>
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 8 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Complaint No:  {complaint_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 3 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request Type: {req_type_name}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 7 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request Date: {format(new Date(compalint_date), 'dd-MM-yyyy hh:mm:ss')}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: "row",
                                    }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, pr: 8 }}>Department Section:</Typography>
                                        <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 1.7 }}> {sec_name.toLowerCase()}</Typography>
                                    </CssVarsProvider>

                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        p: 0.5,
                                        flexDirection: "row",
                                    }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15, pr: 8 }}>Complaint Type:</Typography>
                                        <Typography sx={{ textTransform: "capitalize", fontSize: 15, pl: 5.4 }}> {complaint_type_name.toLowerCase()}</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Complaint Description:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Paper sx={{
                                        width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='none'>
                                        {complaint_desc}
                                    </Paper>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Complaint Priority:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Paper sx={{
                                        width: "75%", minHeight: 10, maxHeight: 70, pl: 0.9, fontSize: 15,
                                        overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                    }} variant='none'>
                                        {priority}
                                    </Paper>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ width: "30%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Assist Request Employees:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{
                                        pl: 2,
                                        display: 'flex',
                                        width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    }} >

                                        {
                                            getAssignEmp.length !== 0 ?
                                                getAssignEmp && getAssignEmp.map((val) => {
                                                    return <Box key={val.assigned_emp} sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                                    }}>
                                                        <CssVarsProvider>
                                                            <Typography sx={{ textTransform: "capitalize", textAlign: "left" }}>{val.em_name.toLowerCase()},</Typography>
                                                        </CssVarsProvider>
                                                    </Box>
                                                })
                                                : <CssVarsProvider>
                                                    <Typography sx={{ textTransform: "capitalize", textAlign: "left" }}>No Assigned Employee</Typography>
                                                </CssVarsProvider>
                                        }
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Assign to:</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ width: "53%", pt: 0.5 }}                                    >
                                        <DeptWiseEmpSelect personName={personName} setPersonName={setPersonName} empdeptwise={empdeptwise} />
                                    </Box>
                                </Box>

                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ width: "25%", }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Remarks:</Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box
                                        sx={{ width: "50%", }}>
                                        <CustomTextarea
                                            style={{ width: 450 }}
                                            minRows={4}
                                            placeholder="Remarks"
                                            name='remark'
                                            value={remark}
                                            onchange={updateRemark}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={Transfer} >Save</Button>
                    <Button color="secondary" onClick={reset}>Cancel</Button>
                </DialogActions>
            </Dialog >
        </Fragment >
    )
}

export default memo(AssistTransferSuper)