import React from 'react'
import { Box, CssVarsProvider, Modal, ModalDialog, Sheet, Typography } from '@mui/joy'
import PswdMasterTable from './PswdMasterTable';
import { memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const PswdModal = ({ open, handleClose, rowSelect, tabledata, setTabledata, count, setCount, searchData }) => {
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
                        width: "100%",
                        height: '95%',
                        borderRadius: 'md',
                        p: 1,
                        boxShadow: 'lg',
                    }}>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Box>< CloseIcon sx={{ color: '#5F093D', cursor: 'pointer', size: 'lg', }} onClick={handleClose} /></Box>
                    </Box>
                    <Sheet
                        sx={{
                            border: 1,
                            borderColor: '#145DA0',
                            height: '100%'
                        }}>
                        {/* <Box sx={{ display: 'flex' }}> */}
                        <Box sx={{ textAlign: 'center', flex: 1, mt: 1 }}>
                            <Typography sx={{ fontWeight: 500, fontSize: 30, color: '#5F093D', }} >
                                Device Details
                            </Typography>
                        </Box>
                        {/* <Box sx={{ height: 30, width: 32, m: 1, pl: .5, pb: 1, border: 1, borderColor: '#145DA0', borderRadius: 5 }}>
                                < CloseIcon sx={{ color: '#145DA0', cursor: 'pointer', size: 'lg', }} onClick={handleClose} />
                            </Box> */}
                        {/* </Box> */}
                        <Box sx={{ pt: .5 }} >
                            <PswdMasterTable rowSelect={rowSelect} tabledata={tabledata} setTabledata={setTabledata}
                                count={count} setCount={setCount} searchData={searchData} />
                        </Box>
                    </Sheet>
                </ModalDialog>
            </Modal>
        </CssVarsProvider>
    )
}

export default memo(PswdModal)