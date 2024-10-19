import React, { memo, useCallback } from 'react'
import { Paper, Typography } from '@mui/material';
import { Box, Button, Chip, CssVarsProvider, Modal, ModalDialog } from '@mui/joy';
import CancelIcon from '@mui/icons-material/Cancel';

const ServiceDocumentModal = ({ setopenDocuments, open, setdocumetOpenCheck, DocumentView }) => {

    console.log("DocumentView", DocumentView);



    const Close = useCallback(() => {
        setdocumetOpenCheck(false)
        setopenDocuments(0)
    }, [setdocumetOpenCheck, setopenDocuments])

    return (
        <CssVarsProvider>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ p: 0, width: '85%', height: '90%' }}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {/* Sticky Header Section */}
                        <Box sx={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', mt: 1, p: 1, bgcolor: '#fff', borderBottom: '1px solid #ccc' }}>
                            <Box sx={{ flex: 1, color: 'grey', fontWeight: 600, pl: 1 }}>
                                Document View
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={Close} />
                            </Box>
                        </Box>

                        {/* Scrollable Content Section */}
                        <Box sx={{ flex: 1, px: 3, py: 2, overflow: 'auto' }}>
                            {DocumentView.map((imageUrl, index) => (
                                <Paper
                                    key={index}
                                    sx={{
                                        bgcolor: '#EBEBE8',
                                        cursor: 'pointer',
                                        height: 700,
                                        // width: '99%',
                                        mb: 1,
                                        mx: 1,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <embed
                                        id="pdf-embed"
                                        src={imageUrl}
                                        type="application/pdf"
                                        height={650}
                                        width="100%"
                                    />
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                </ModalDialog>
            </Modal>
        </CssVarsProvider>

    )
}

export default memo(ServiceDocumentModal)