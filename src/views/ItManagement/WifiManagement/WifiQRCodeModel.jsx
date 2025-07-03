import React, { Fragment, memo, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
// import { ToastContainer } from 'react-toastify';
import { Box, Typography } from '@mui/material'
import { useReactToPrint } from 'react-to-print';
import { QRCodeSVG } from 'qrcode.react';
import { axioslogin } from 'src/views/Axios/Axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const WifiQRCodeModel = ({ open, handleClose, qrCodeDis, qrCodeUserName }) => {
    const [qrcodeLink, setQrcodeLink] = useState('')
    useEffect(() => {
        const getQRCodeLink = async () => {
            const result = await axioslogin.get('/wifiManagement/getqrLink')
            const { success, data } = result.data
            if (success === 1) {
                const { qr_code_link } = data[0]
                setQrcodeLink(qr_code_link)
            }
        }
        getQRCodeLink()
    }, [])
    const ref = useRef();
    const handlePrint = useReactToPrint({
        content: () => ref.current,
    });
    // const codeScan = "http://192.168.34.34:4501/index.cgi?code=" + qrCodeDis

    const codeScan = `${qrcodeLink}/login?username=${qrCodeUserName}&password=${qrCodeDis}`;

    // const codeScan = `https://192.168.10.144:1003/login?username=${qrCodeUserName}&password=${qrCodeDis}`;


    return (
        <Fragment>
            {/* <ToastContainer /> */}
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: '25vw'

                    }}
                >
                    <Box ref={ref} sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 0.6 }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <QRCodeSVG value={codeScan} size={100} level="Q" includeMargin={false}
                                    style={{
                                        marginLeft: 0.5,
                                        marginTop: 8,
                                    }} />
                            </div>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }}>
                            <Box sx={{ fontSize: 11 }}>
                                <Typography sx={{ fontSize: 11, fontWeight: 'bold', }}>Instructions</Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ flex: 1, fontSize: 12, }}>1. Connect to SSID</Box>
                                    <Box sx={{ flex: 0.6, fontWeight: 'bold', fontSize: 11 }}>: MEDIFY</Box>
                                </Box>
                                <Box sx={{ fontSize: 11 }}>2. Scan the QR Code</Box>
                                <Box sx={{ fontSize: 11 }}>3. Enter the Credentials:</Box>
                                <Box sx={{ display: 'flex', pl: 2 }}>
                                    <Box sx={{ flex: 0.8, fontSize: 11 }}>- Username</Box>
                                    <Box sx={{ fontWeight: 'bold', flex: 1, fontSize: 11 }}>: {qrCodeUserName}</Box>
                                </Box>
                                <Box sx={{ display: 'flex', pl: 2 }}>
                                    <Box sx={{ flex: 0.8, fontSize: 11 }}>- Password</Box>
                                    <Box sx={{ fontWeight: 'bold', flex: 1, fontSize: 11 }}>: {qrCodeDis}</Box>
                                </Box>
                            </Box>
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