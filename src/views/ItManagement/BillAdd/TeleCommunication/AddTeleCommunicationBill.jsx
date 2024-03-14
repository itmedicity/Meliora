import { Box, Button, CssVarsProvider, Modal, ModalDialog } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

const AddTeleCommunicationBill = ({ open, setAddModalFlag, setaddModalOpen, }) => {

    const handleClose = useCallback(() => {
        setAddModalFlag(0)
        setaddModalOpen(false)
    }, [setAddModalFlag, setaddModalOpen])
    return (
        <Box>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>

                <Box sx={{ margin: 'auto', }}>
                    <ModalDialog variant="outlined"
                        sx={{ width: 1000 }}>
                        <Box sx={{ height: 700, borderRadius: 10 }}>
                            <Box sx={{ display: 'flex', pl: 1, fontSize: 20, fontWeight: 500, }}>
                                <ReceiptLongOutlinedIcon sx={{ pt: .5 }} />
                                Add TeleCommunication Bills
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: "flex-end" }}>
                                    <Box sx={{ m: .5, borderRadius: 5, borderColor: '#D6E2E8' }}>
                                        {/* <Tooltip title="Close"> */}
                                        < CloseIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: '#004F76', }}
                                            onClick={handleClose}
                                        />
                                        {/* </Tooltip> */}
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "99%",
                                borderTop: 1, borderBlockColor: '#6AABD2', pt: 1, mx: .5
                            }}>
                            </Box>
                            <Box sx={{ display: 'flex', }}></Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: "flex-end", height: 60, borderTop: 1, borderBlockColor: '#6AABD2', pt: 2 }}>
                            <Box sx={{ mr: .5, fontSize: 20, cursor: 'pointer', }}>
                                <CssVarsProvider>
                                    <Button variant="plain"
                                        // onClick={SubmitTask}
                                        sx={{ fontSize: 16, color: '#004F76', }} >Create</Button>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ mr: 2, cursor: 'pointer' }}>
                                <CssVarsProvider>
                                    <Button variant="plain" onClick={handleClose} sx={{ fontSize: 16, color: '#004F76', }}> Cancel</Button>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </ModalDialog>
                </Box>
            </Modal>
        </Box >

    )
}

export default memo(AddTeleCommunicationBill)