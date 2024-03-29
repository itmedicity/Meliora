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

const WifiQRCodeModel = ({ open, handleClose, qrCodeDis }) => {

    const ref = useRef();
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });
    const codeScan = "http://192.168.34.34:4501/index.cgi?code=" + qrCodeDis


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
                                        value={codeScan}
                                        size={100}
                                        level='Q'
                                        includeMargin={false}
                                        style={{
                                            marginLeft: 0.5,
                                            marginTop: 10,
                                            height: 100,
                                            width: 100,
                                        }}
                                    />
                                </div>
                                <div style={{
                                    marginLeft: 0.5,
                                    marginTop: 10,
                                    height: 100,
                                    width: 144,
                                }}>
                                    <Box
                                        sx={{ flexDirection: 'column', pt: 0.5 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                                            <Box sx={{ fontSize: 11, height: '20px', }}>
                                                Connect to SSID:
                                            </Box>
                                            <Box sx={{ fontSize: 12, fontWeight: 'bold', height: '20px', pl: 1 }}>
                                                MEDIFY
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', textAlign: 'center', flexDirection: 'row', width: "100%" }}>
                                            <Box sx={{ fontSize: 11, height: '20px', }}>
                                                Enter code:
                                            </Box>
                                            <Box sx={{ fontSize: 12, fontWeight: 'bold', height: '20px', pl: 1 }}>
                                                {qrCodeDis}
                                            </Box>
                                        </Box>
                                        <Box sx={{ fontSize: 11, height: '20px', textAlign: 'center' }}>
                                            Or
                                        </Box>
                                        <Box sx={{ fontSize: 11, height: '20px', }}>
                                            Scan the QR Code
                                        </Box>
                                    </Box>
                                </div>
                            </div>
                        </Box>
                    </Box>
                    <DialogActions>
                        <Button color="secondary" onClick={handlePrint}>Print</Button>
                        <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog >
        </Fragment >
    )
}

export default memo(WifiQRCodeModel)