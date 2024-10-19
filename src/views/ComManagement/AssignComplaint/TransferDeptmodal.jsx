import React, { memo, useCallback, useMemo, useState } from 'react'
import { Typography } from '@mui/material';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { Box, Button, CssVarsProvider, Modal, ModalDialog, Textarea } from '@mui/joy';
import ComDepartmentSelect from '../CmComponent/ComDepartmentSelect';


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
    }, [setOpen, setCount, setTransmodal, setOpen, setRemark])
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

    const buttonStyle = {
        fontSize: 16,
        color: '#523A28',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#523A28',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }


    return (
        <Box>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                    <ModalDialog variant="outlined" sx={{ width: '43vw', p: 0, overflow: 'auto' }}>
                        <Typography sx={{ flex: 1, fontWeight: 600, pl: .5, color: '#523A28', bgcolor: '#D0B49F', p: 1 }}>Department Transfer</Typography>
                        <Box sx={{ px: 2, mt: 1, }}>
                            <Typography sx={{ fontWeight: 600 }}>
                                Complaint Description
                            </Typography>
                            <Textarea
                                variant="outlined"
                                minRows={2}
                                value={complaint_desc}
                                readOnly
                            />
                            <Typography sx={{ fontWeight: 600, pt: 1, pb: .3 }}>
                                Transfer to
                            </Typography>
                            <ComDepartmentSelect value={cmpdept} setValue={setCmpdept} />
                            {/* <ComplaintDeptSelect value={cmpdept} setValue={setCmpdept} /> */}
                            <Typography sx={{ fontWeight: 600, pt: 1, pb: .3 }}>
                                Remarks
                            </Typography>
                            <CustomTextarea
                                style={{ width: '100%' }}
                                minRows={4}
                                placeholder="Remarks"
                                name='remark'
                                value={remark}
                                onchange={updateRemark}
                            />
                        </Box>
                        <Box sx={{ textAlign: 'right', pb: 1, mr: 1 }}>
                            <Button
                                variant='plain'
                                sx={buttonStyle}
                                onClick={Transfer}
                            >Save</Button>
                            <Button
                                variant='plain'
                                sx={buttonStyle}
                                onClick={reset}
                            >Cancel</Button>
                        </Box>

                    </ModalDialog>
                </Modal>
            </CssVarsProvider>

            {/* <Fragment>
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
                                complain dept select box
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
            </Fragment> */}
        </Box >
    )
}

export default memo(TransferDeptmodal)




