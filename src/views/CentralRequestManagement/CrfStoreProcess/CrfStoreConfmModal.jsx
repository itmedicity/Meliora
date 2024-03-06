import React, { Fragment, memo, useCallback, useMemo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { ToastContainer } from 'react-toastify';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfStoreConfmModal = ({ open, handleClose, podetlno, count, setCount }) => {
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const patchdataStoe = useMemo(() => {
        return {
            store_receive_user: id,
            store_receive_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            po_detail_slno: podetlno
        }
    }, [podetlno, id])

    const Receive = useCallback(() => {
        const updatePoReciver = async (patchdataStoe) => {
            const result = await axioslogin.patch('/newCRFPurchase/storeReciverdataUpdate', patchdataStoe);
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

    }, [patchdataStoe, handleClose, setCount, count])

    return (
        <Fragment>
            <ToastContainer />
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-descriptiona"
                >
                    <DialogContent sx={{
                        minWidth: 400,
                        maxWidth: 400
                    }}>
                        <DialogContentText id="alert-dialog-slide-descriptiona">
                            Are you sure to  Receive Item against PO
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={Receive} color="secondary" >Yes</Button>
                        <Button onClick={handleClose} color="secondary" >No</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>

    )
}

export default memo(CrfStoreConfmModal)