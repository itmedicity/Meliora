import React, { Fragment, memo, useCallback, useMemo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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

const SubStoreRecevModal = ({ open, subReceivdata, itemtabrender, setItemTabRender, setSubRecev,
    setSubRecevModal, setSubRecevData, count, setCount }) => {

    const { po_log_slno, fully, po_slno } = subReceivdata
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const patchdataSubstrrecev = useMemo(() => {
        return {
            substore_receive: 1,
            substore_receive_user: id,
            substore_receive_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            po_log_slno: po_log_slno,
            po_slno: po_slno,
            fully: fully
        }
    }, [id, po_log_slno, po_slno, fully])

    const handleClose = useCallback(() => {
        setItemTabRender(itemtabrender + 1)
        setSubRecev(0)
        setSubRecevModal(false)
        setSubRecevData([])
    }, [setItemTabRender, setSubRecevData, itemtabrender, setSubRecev, setSubRecevModal])


    const Receive = useCallback(() => {
        const updateSubStoreReceive = async (patchdataSubstrrecev) => {
            const result = await axioslogin.patch('/newCRFStore/SubstoreReciverdataUpdate', patchdataSubstrrecev);
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                handleClose()
                setCount(count + 1)
            } else {
                warningNotify(message)
            }
        }
        updateSubStoreReceive(patchdataSubstrrecev)

    }, [patchdataSubstrrecev, handleClose, count, setCount])


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
                <DialogContent sx={{
                    minWidth: 600,
                    maxWidth: 400
                }}>
                    <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                        <Box sx={{
                            width: "100%", display: "flex",
                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                        }}>
                            <Box sx={{ pr: 1.5 }}>
                                <CssVarsProvider>
                                    <Typography sx={{ fontSize: 18, textAlign: "center" }}>
                                        Are you sure to  Receive Item against Selected PO
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>

                </DialogContent>
                <DialogActions>
                    <Button onClick={Receive} color="secondary" >Yes</Button>
                    <Button onClick={handleClose} color="secondary" >No</Button>
                </DialogActions>
            </Dialog>

        </Fragment>
    )
}

export default memo(SubStoreRecevModal)