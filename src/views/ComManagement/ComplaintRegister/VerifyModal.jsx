import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button } from "@material-ui/core";
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { format } from 'date-fns'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const VerifyModal = ({ open, setOpen, mddata, count, setCount }) => {
    const { complaint_slno } = mddata
    const handleClose = () => {
        setOpen(false)
        setVerify(false)
        setNotrectify(false)
        setFlag(0)
        setRemark('')
    }
    const [verify, setVerify] = useState(false);
    const [notrectify, setNotrectify,] = useState(false);
    const [flag, setFlag] = useState(0)
    const [remark, setRemark] = useState('');
    const updateRemarks = useCallback((e) => {
        setRemark(e.target.value);
    }, [])
    const updateVerify = (e) => {
        if (e.target.checked === true) {
            setVerify(true)
            setNotrectify(false)
            setFlag(0)
        } else {
            setVerify(false)
        }
    }
    const updateNotrectify = (e) => {
        if (e.target.checked === true) {
            setNotrectify(true)
            setVerify(false)
            setFlag(1)
        } else {
            setFlag(0)
            setNotrectify(false)
        }
    }

    const verifyData = useMemo(() => {
        return {
            // compalint_status: verify === true ? 3 : compalint_status,
            cm_verfy_time: verify === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            cm_rectify_status: notrectify === true ? 'Z' : null,
            verify_remarks: notrectify === true ? remark : null,
            cm_not_verify_time: notrectify === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            complaint_slno: complaint_slno
        }
    }, [verify, notrectify, remark, complaint_slno])
    const Verify = useCallback((e) => {
        e.preventDefault();
        const verified = async (verifyData) => {
            const result = await axioslogin.patch('/Rectifycomplit/update/verify', verifyData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (verify === true || notrectify === true) {
            verified(verifyData);
        } else {
            infoNotify("Please Choose Any")
        }
    }, [verifyData, verify, notrectify, setCount, count])
    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                // onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"Complaint Verification"}
                </DialogTitle>
                <DialogContent sx={{
                    width: 400,
                    height: 200
                }}>
                    <Box sx={{ width: "100%", mt: 0 }}>
                        <Paper square elevation={3} sx={{ p: 1, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 0.5,
                                mt: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    // width: "50%"
                                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                    p: 1
                                }} >
                                    <CusCheckBox
                                        label="Verified"
                                        color="primary"
                                        size="md"
                                        name="verify"
                                        value={verify}
                                        checked={verify}
                                        onCheked={updateVerify}
                                    />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: "50%",
                                    p: 1
                                    // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%', }
                                }} >
                                    <CusCheckBox
                                        label="Not Rectified"
                                        color="primary"
                                        size="md"
                                        name="notrectify"
                                        value={notrectify}
                                        checked={notrectify}
                                        onCheked={updateNotrectify}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 0.5,
                                mt: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: "50%"
                                }} >
                                    {
                                        flag === 1 ? <Box>
                                            <CustomTextarea
                                                style={{ width: 330 }}
                                                minRows={4}
                                                placeholder="Remarks"
                                                value={remark}
                                                onchange={updateRemarks}
                                            />
                                        </Box> : null
                                    }
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={Verify}>Ok</Button>
                    <Button color="secondary" onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
export default memo(VerifyModal)