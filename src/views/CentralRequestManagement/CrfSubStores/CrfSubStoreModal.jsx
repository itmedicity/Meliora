import React, { Fragment, memo, useCallback, useMemo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { ToastContainer } from 'react-toastify';
import { Box, Paper } from '@mui/material'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { CssVarsProvider, Typography } from '@mui/joy'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfSubStoreModal = ({ open, handleClose, podetldata, count, setCount }) => {

    const { po_detail_slno, req_slno, req_deptsec, user_deptsection,
        req_date, actual_requirement, needed, expected_date, } = podetldata
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const patchdataStoe = useMemo(() => {
        return {
            sub_store_recieve_user: id,
            sub_store_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            po_detail_slno: po_detail_slno
        }
    }, [po_detail_slno, id])

    const Receive = useCallback(() => {
        const updatePoReciver = async (patchdataStoe) => {
            const result = await axioslogin.patch('/newCRFPurchase/SubstoreReciverdataUpdate', patchdataStoe);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                handleClose()
            }
            else {
                warningNotify(message)
            }
        }
        updatePoReciver(patchdataStoe)

    }, [patchdataStoe, setCount, count, handleClose])


    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='md'

                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: 300
                    }}
                >
                    <DialogContentText id="alert-dialog-slide-descriptiona">
                        Are you sure to  Receive Item against PO
                    </DialogContentText>
                    <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%", display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box sx={{ pr: 1.5 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{req_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 4 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Req.Date: {req_date}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                {
                                    actual_requirement !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "35%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {actual_requirement}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    needed !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "35%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {needed}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    req_deptsec !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "35%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Item Require Department:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {req_deptsec}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    user_deptsection !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "35%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Requested Department:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {user_deptsection}
                                        </Paper>
                                    </Box> : null
                                }
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>

                            </Box>
                        </Paper>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={Receive} color="secondary" >Yes</Button>
                    <Button onClick={handleClose} color="secondary" >No</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(CrfSubStoreModal)