import React, { Fragment, memo } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Button, CssVarsProvider } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

const ViewTaskImage = ({ open, handleClose, imageUrls }) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
            >
                <DialogContent sx={{
                    width: "100%",
                    height: '60%',
                    bgcolor: 'white'
                }}><Box sx={{ display: 'flex' }}>
                        <Box sx={{
                            flex: 1,
                            fontWeight: 'bold',
                            height: '50px',
                            color: '#0074B7',
                            fontSize: 20

                        }}>
                            Task
                        </Box>
                        <Box sx={{
                            marginLeft: 'auto',
                        }}>
                            <CloseIcon sx={{ color: '#0074B7', cursor: 'pointer' }} onClick={handleClose} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 1, gap: 5 }}>
                        {imageUrls.map((imageUrl, index) => (
                            < img alt="Task"
                                key={index}
                                src={imageUrl}
                                height={820}
                                style={{ maxWidth: '100%', maxHeight: '100%', margin: '6px', }}
                            />
                        ))
                        }
                    </Box>
                    <DialogActions>
                        <CssVarsProvider>
                            <Button
                                variant='plain'
                                sx={{ color: "#0074B7", fontWeight: 'bold' }}
                                onClick={handleClose}
                            >Cancel</Button>
                        </CssVarsProvider>

                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}

export default memo(ViewTaskImage)