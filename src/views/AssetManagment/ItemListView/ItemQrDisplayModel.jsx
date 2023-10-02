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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const ItemQrDisplayModel = ({ open, handleClose, assetNo }) => {


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
                            width: 300,
                            height: 150, pl: 3,
                            flexDirection: 'column',
                        }}>

                            <div ref={ref} style={{ display: 'flex', flexDirection: 'row' }} >
                                {/* <Barcode width={1} height={40} value={value} /> */}
                                {/* <QRCodeCanvas value="https://reactjs.org/" /> */}
                                <div>
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
                                            fontWeight: 700,
                                            fontFamily: 'initial',
                                            textAlign: 'center',
                                            marginTop: -2
                                        }}
                                    >{assetNo}</div>
                                </div>
                                <div>
                                    <QRCodeSVG
                                        value={assetNo}
                                        size={100}
                                        level='Q'
                                        includeMargin={false}
                                        style={{
                                            marginTop: 15,
                                            height: 80,
                                            width: 110,
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: 110,
                                            fontSize: 12,
                                            fontWeight: 700,
                                            fontFamily: 'initial',
                                            textAlign: 'center',
                                            marginTop: -2
                                        }}
                                    >{assetNo}</div>
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