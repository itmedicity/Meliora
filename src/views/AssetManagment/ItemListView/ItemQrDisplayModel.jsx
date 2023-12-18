import React, { Fragment, memo, useRef } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material'
import { useReactToPrint } from 'react-to-print';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const ItemQrDisplayModel = ({ open, handleClose, assetNo, dueDate }) => {

    const pmDueDate = dueDate !== null ? format(new Date(dueDate), "dd/MM/yyyy") : ''
    const ref = useRef();
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });

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
                < DialogContent id="alert-dialog-slide-descriptiona"
                //    sx={{ border: '5px solid #474b4f' ,borderRadius:1}}     
                >
                    <Box sx={{ width: '100%', height: '90%', borderRadius: 1, border: '0.1px solid #454545' }}>
                        <Box id="alert-dialog-slide-descriptiona" sx={{ fontWeight: 'bold', textAlign: 'center', height: '50px', pt: 1 }}>
                            QR Display
                        </Box>
                        <Box sx={{
                            width: 250,
                            height: 120,
                            flexDirection: 'column',
                        }}>

                            <div ref={ref} style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly" }} >
                                {/* <Barcode width={1} height={40} value={value} /> */}
                                {/* <QRCodeCanvas value="https://reactjs.org/" /> */}
                                <div style={{ display: 'flex', flexDirection: 'column', }}>
                                    <QRCodeSVG
                                        value={assetNo}
                                        size={100}
                                        level='Q'
                                        includeMargin={false}
                                        style={{
                                            marginTop: 15,
                                            height: 80,
                                            width: 145,
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: 145,
                                            fontSize: 12,
                                            fontWeight: 800,
                                            fontFamily: 'Arial, Helvetica, sans-serif',
                                            textAlign: 'center',
                                            marginTop: -2
                                        }}
                                    >{assetNo}</div>
                                    {
                                        dueDate !== null ?
                                            <div
                                                style={{
                                                    width: 145,
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    fontFamily: 'Arial, Helvetica, sans-serif',
                                                    textAlign: 'center',
                                                    marginTop: -2
                                                }}
                                            >PM:{pmDueDate}</div> : null
                                    }

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', }} >
                                    <QRCodeSVG
                                        value={assetNo}
                                        size={100}
                                        level='Q'
                                        includeMargin={false}
                                        style={{
                                            marginTop: 15,
                                            height: 80,
                                            width: 110,
                                            pl: 5
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: 110,
                                            fontSize: 12,
                                            fontWeight: 800,
                                            fontFamily: 'Arial, Helvetica, sans-serif',
                                            textAlign: 'center',
                                            marginTop: -2
                                        }}
                                    >{assetNo}</div>
                                    {
                                        dueDate !== null ?
                                            <div
                                                style={{
                                                    width: 110,
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    fontFamily: 'Arial, Helvetica, sans-serif',
                                                    textAlign: 'center',
                                                    marginTop: -2
                                                }}
                                            >PM:{pmDueDate}</div> : null
                                    }
                                </div>
                            </div>


                        </Box>
                    </Box>
                    <DialogActions>
                        <Button color="secondary" onClick={handlePrint}>Print</Button>
                        <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}

export default memo(ItemQrDisplayModel)