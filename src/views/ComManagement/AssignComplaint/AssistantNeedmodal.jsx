import React, { Fragment, useCallback, useEffect, useMemo, useState, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Box } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useSelector } from 'react-redux';
import AssistantEmpSelect from 'src/views/CommonSelectCode/AssistantEmpSelect';
import { format } from 'date-fns'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import CusCheckBox from 'src/views/Components/CusCheckBox';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const AssistantNeedmodal = ({ open, setOpen, assistant, empdept, count, setCount }) => {
    const { complaint_slno, complaint_desc, sec_name, complaint_type_name } = assistant[0]
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [userdept, setUser] = useState(0);
    useEffect(() => {
        if (empdept.length !== 0) {
            const { em_department } = empdept[0]
            setUser(em_department)
        }
    }, [empdept])
    const postdata = {
        em_department: userdept,
        em_id: id
    }
    const [assistemp, setAssistemp] = useState(0)
    const [assistuser, setAssist] = useState(false);
    const updateAssistuser = useCallback((e) => {
        setAssist(e.target.checked)
    }, [])
    const assistentData = useMemo(() => {
        return {
            complaint_slno: complaint_slno,
            assigned_emp: assistemp,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assist_flag: assistuser === true ? 1 : 0
        }
    }, [complaint_slno, assistemp, assistuser]);
    const reset = useCallback(() => {
        setOpen(false)
        setAssistemp(0)
    }, [setOpen])
    const Assistent = useCallback(() => {
        const AssistentEmp = async () => {
            const result = await axioslogin.post(`/complaintassign/assistant/emp`, assistentData);
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
        if (assistemp === 0) {
            infoNotify("Please Select Employee")
        } else if (assistuser === false) {
            infoNotify("Please Click Assistant Needed")
        } else {
            AssistentEmp(assistentData)
        }
    }, [assistentData, assistuser, count, reset, setCount, assistemp])
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
                        Assistant Needed
                    </DialogContentText>

                    <Box sx={{ width: "100%", p: 1 }}>
                        <Paper square elevation={3} sx={{ p: 2, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 1,
                                mt: 1
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
                                <Box>
                                </Box>
                            </Box>
                            {/* 2nd section */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 1
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
                                p: 1
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
                                p: 1
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
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 1
                            }}>
                                <Box sx={{
                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <CusCheckBox
                                        label="Assistant Needed"
                                        color="primary"
                                        size="md"
                                        name="assistuser"
                                        value={assistuser}
                                        checked={assistuser}
                                        onCheked={updateAssistuser}
                                    />
                                </Box>
                            </Box>




                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 1
                            }}>
                                <Box sx={{
                                    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <AssistantEmpSelect postdata={postdata} value={assistemp} setValue={setAssistemp} />
                                </Box>
                            </Box>

                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={Assistent} >Save</Button>
                    <Button color="secondary" onClick={reset}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(AssistantNeedmodal)