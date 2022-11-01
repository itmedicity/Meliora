import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import DeptWiseEmpSelect from 'src/views/CommonSelectCode/DeptWiseEmpSelect';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModalAssignComplaint = ({ open, setOpen, complaint, empdept, count, setCount }) => {
    //props data for modal
    const { complaint_slno, complaint_desc, sec_name, req_type_name, complaint_type_name } = complaint[0]
    //state for employee select box
    // const [emp, setEmp] = useState(0)
    // sate for getting emp dept
    const [empdeptwise, setEmpdept] = useState(0)
    // state for remarks
    const [remark, setRemark] = useState('');
    //setting emp dept
    useEffect(() => {
        if (empdept.length !== 0) {
            const { em_department } = empdept[0]
            setEmpdept(em_department)
        }
    }, [empdept])
    //updating remark state
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [setRemark])
    //reset to intial
    const reset = useCallback(() => {
        setOpen(false)
        // setEmp(0)
        setRemark('')
        setPersonName([])
    }, [setOpen, setRemark])
    //setting data to detailed assign
    const [personName, setPersonName] = useState([]);
    //data setting to indert to db
    const postData = personName && personName.map((val) => {
        return {
            complaint_remark: remark,
            complaint_slno: complaint_slno,
            assigned_emp: val,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }
    })
    //data set for complaint remark
    const compremark = useMemo(() => {
        return {
            complaint_remark: remark,
            complaint_slno: complaint_slno
        }
    }, [remark, complaint_slno])
    //inserting detailed assign
    const detailAssign = useCallback(() => {
        const Assignemp = async (postData) => {
            const result = await axioslogin.post(`/complaintassign/detailassign`, postData);
            const { message, success } = result.data;
            if (success === 1) {
                const result = await axioslogin.patch(`/complaintassign/remark`, compremark);
                const { message } = result.data;
                succesNotify(message)
                setCount(count + 1)
                reset();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (personName.length === 0) {
            infoNotify("Please Select Employee")
        } else if (remark === '') {
            infoNotify("Please Enter Any Remark")
        } else {
            Assignemp(postData);
        }
    }, [postData, count, reset, setCount, compremark, remark, personName])
    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={reset}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Complaint Assign
                    </DialogContentText>
                    <Box sx={{ width: "100%", p: 1 }}>
                        <Paper square elevation={3} sx={{ p: 2, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 0.5,
                                mt: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <Typography>Request Type</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <Typography>{req_type_name}</Typography>
                                </Box>
                                <Box>
                                </Box>
                            </Box>
                            {/* 2nd section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // p: 1
                                p: 0.5,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <Typography>Department Section</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <Typography>{sec_name}</Typography>
                                </Box>
                            </Box>
                            {/* 3rd section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // p: 1
                                p: 0.5,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <Typography>Complaint Type</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <Typography>{complaint_type_name}</Typography>
                                </Box>
                            </Box>
                            {/* 4th section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // p: 1
                                p: 0.5,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: "100%"
                                }} >
                                    <Typography sx={{ textAlign: "center" }}>Complaint Description</Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // p: 1
                                p: 0.5,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    mt: 0
                                }} >
                                    <CustomTextarea
                                        style={{ width: 390 }}
                                        minRows={4}
                                        value={complaint_desc}
                                        disabled
                                    />
                                </Box>
                            </Box>
                            {/* 5th section */}
                            <Box sx={{
                                width: "100%",
                                // display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // p: 1
                                p: 0.5,
                                mt: 0.5
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                    mb: 1
                                }} >
                                    <Typography>Select Employee</Typography>
                                </Box>
                                <Box sx={{
                                    width: "100%",
                                    // bgcolor: "cyan"
                                    // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <DeptWiseEmpSelect personName={personName} setPersonName={setPersonName} empdeptwise={empdeptwise} />
                                </Box>
                            </Box>
                            {/* 6th section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                // bgcolor: "cyan",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // p: 1
                                p: 0.5,
                            }}>
                                <Box sx={{
                                    // mt: 3,
                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <CustomTextarea
                                        style={{ width: 390 }}
                                        minRows={4}
                                        placeholder="Remarks"
                                        name='remark'
                                        value={remark}
                                        onchange={updateRemark}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={detailAssign} >Save</Button>
                    <Button color="secondary" onClick={reset}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
export default memo(ModalAssignComplaint)