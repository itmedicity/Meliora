import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import ComplaintDeptSelect from 'src/views/CommonSelectCode/ComplaintDeptSelect';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const TransferDeptmodal = ({ open, setOpen, transfer, count, setCount, setTransmodal }) => {
    const [cmpdept, setCmpdept] = useState(0);
    const { complaint_slno, complaint_desc } = transfer
    const [remark, setRemark] = useState('');
    //updating remark state
    const updateRemark = useCallback((e) => {
        setRemark(e.target.value)
    }, [setRemark])
    //patch data for updating complaint dept
    const patchData = useMemo(() => {
        return {
            complaint_deptslno: cmpdept,
            dept_transfer_remarks: remark,
            complaint_slno: complaint_slno
        }
    }, [cmpdept, complaint_slno, remark])
    //reset function for to intial state
    const reset = useCallback(() => {
        setOpen(false);
        setCmpdept(0);
        setTransmodal(0);
        setCount(0)
        setRemark("")
    }, [setOpen, setCount, setTransmodal])
    // when we click on transfer function
    const Transfer = useCallback(() => {
        const TranserDept = async (patchData) => {
            const result = await axioslogin.patch(`/complaintassign/complaint/transfer`, patchData);
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
        if (cmpdept !== 0) {
            TranserDept(patchData)
        } else {
            infoNotify("Please Choose the Complaint Department")
        }
    }, [patchData, count, reset, setCount, cmpdept])
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
                        Transfer Department
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
                            {/* complain dept select box */}
                            <Box sx={{
                                width: "100%",
                                // display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                // p: 1
                                p: 0.5,
                                mt: 0.5
                            }}>
                                <Box sx={{
                                    width: "100%"
                                }}>
                                    <ComplaintDeptSelect value={cmpdept} setValue={setCmpdept} />
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
                    <Button color="secondary"
                        onClick={Transfer}
                    >Save</Button>
                    <Button color="secondary"
                        onClick={reset}
                    >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(TransferDeptmodal)