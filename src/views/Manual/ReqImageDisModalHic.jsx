import React, { memo } from 'react'
import Modal from '@mui/joy/Modal'
import Sheet from '@mui/joy/Sheet'
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import Button from '@mui/joy/Button'
import PdfViewerHic from './PdfViewerHic'


const ReqImageDisModalHic = ({ open, handleClose, previewFile }) => {
    return (
        <CssVarsProvider>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxHeight: window.innerHeight - 80
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: '50%',
                        borderRadius: 'sm',
                        p: 2,
                        boxShadow: 'lg',
                        height: window.innerHeight - 100
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            flex: 1,
                            borderRadius: 1,
                            border: '0.1px solid grey',
                            margin: 'auto',
                            height: window.innerHeight - 180,
                            overflowX: 'auto',
                            '::-webkit-scrollbar': { display: 'none' }
                        }}
                    >
                        {previewFile.type === 'image' ? (
                            <img
                                src={previewFile.url}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        ) : previewFile.type === 'pdf' ? (
                            // <PdfViewerHic src={previewFile.url} />
                            <embed
                                id="pdf-embed"
                                src={`${previewFile.url}#toolbar=0&navpanes=0&view=FitH`}
                                type="application/pdf"
                                height="100%"
                                width="100%"
                            />
                        ) : (
                            <Typography variant="h6" color="text.secondary">
                                Unsupported file type.
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
                        <Button variant="outlined" color="secondary" size="md" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Box>
                </Sheet>
            </Modal>
        </CssVarsProvider>
    )
}

export default ReqImageDisModalHic