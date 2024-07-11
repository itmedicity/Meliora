import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import { Button, Paper } from '@mui/material';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { format } from 'date-fns'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const VerifyModal = ({ open, setOpen, mddata, count, setCount }) => {
    const { complaint_slno, compalint_status } = mddata
    //state for verified checkbox
    const [verify, setVerify] = useState(false);
    //state for notrectified
    const [notrectify, setNotrectify,] = useState(false);
    // flag for remark textarea opening
    const [flag, setFlag] = useState(0)
    //state for remarks
    const [remark, setRemark] = useState('');
    // function for update remark
    const updateRemarks = useCallback((e) => {
        setRemark(e.target.value);
    }, [])
    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //function for update verify checkbox
    const updateVerify = (e) => {
        if (e.target.checked === true) {
            setVerify(true)
            setNotrectify(false)
            setFlag(0)
        } else {
            setVerify(false)
        }
    }
    //function for update not rectify check box
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
    //function for state to intial state
    const handleClose = useCallback(() => {
        setOpen(false)
        setVerify(false)
        setNotrectify(false)
        setFlag(0)
        setRemark('')
    }, [setOpen])
    //data setting for verification
    const verifyData = useMemo(() => {
        return {
            compalint_status: verify === true ? 3 : notrectify === true ? 0 : compalint_status,
            cm_verfy_time: verify === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            cm_rectify_status: notrectify === true ? 'Z' : verify === true ? 'V' : null,
            verify_remarks: notrectify === true ? remark : null,
            cm_not_verify_time: notrectify === true ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
            create_user: id,
            complaint_slno: complaint_slno
        }
    }, [verify, notrectify, remark, complaint_slno, compalint_status, id])
    // updating function to db
    const Verify = useCallback((e) => {
        e.preventDefault();
        const verified = async (verifyData) => {
            const result = await axioslogin.patch('/Rectifycomplit/update/verify', verifyData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                handleClose();
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
    }, [verifyData, verify, notrectify, setCount, count, handleClose])
    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"Complaint Verification"}
                </DialogTitle>
                <DialogContent sx={{
                    width: 400,
                    height: 130
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
                                        label="Not Verified"
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