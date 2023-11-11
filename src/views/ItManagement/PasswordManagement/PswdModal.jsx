import React from 'react'
import { Box, CssVarsProvider, Modal, ModalDialog, Sheet, Typography } from '@mui/joy'
import PswdMasterTable from './PswdMasterTable';
import { Paper } from '@mui/material';
import { memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const PswdModal = ({ open, handleClose, rowSelect, tabledata, setTabledata, count, setCount }) => {
    return (
        <CssVarsProvider>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1 }}
            >
                <ModalDialog variant="outlined"
                    sx={{
                        width: "75%",
                        height: '80%',
                        borderRadius: 'md',
                        p: 1,
                        boxShadow: 'lg',
                    }}>
                    <Sheet >
                        <Paper sx={{ display: 'flex' }}>
                            <Box sx={{ textAlign: 'center', width: '100%' }}>
                                <Typography sx={{ fontSize: 20, color: '#145DA0', }} >
                                    Device Details
                                </Typography>
                            </Box>
                            <Box>
                                < CloseIcon sx={{ color: '#145DA0', cursor: 'pointer', size: 'lg', width: 30, height: 30 }} onClick={handleClose} />
                            </Box>
                        </Paper>
                        <Box sx={{ pt: .5 }} >
                            <PswdMasterTable rowSelect={rowSelect} tabledata={tabledata} setTabledata={setTabledata}
                                count={count} setCount={setCount} />
                        </Box>
                    </Sheet>
                </ModalDialog>
            </Modal>
        </CssVarsProvider>
    )
}

export default memo(PswdModal)