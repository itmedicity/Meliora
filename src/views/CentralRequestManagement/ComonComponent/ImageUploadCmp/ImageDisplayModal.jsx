import React, { memo, useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider } from '@mui/joy';
import { Box } from '@mui/material'
import Button from '@mui/joy/Button';

const ImageDisplayModal = ({ open, handleClose, images }) => {

    const [disArry, setDissArry] = useState([])
    useEffect(() => {
        if (images.length !== 0) {
            const disimage = images.map((val) => {
                const parts = val.split('/');
                const fileNamePart = parts[parts.length - 1];
                const obj = {
                    imageName: fileNamePart,
                    url: val
                }
                return obj
            })
            setDissArry(disimage)
        }
    }, [images])
    return (
        <CssVarsProvider>
            <Modal aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{
                    display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center',
                    maxHeight: window.innerHeight - 80, pt: 10
                }}>
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: "50%", borderRadius: 'sm', p: 3, boxShadow: 'lg', height: window.innerHeight - 100,
                    }}
                >
                    <Box sx={{
                        width: '100%', flex: 1, borderRadius: 1, border: '0.1px solid grey', margin: "auto",
                        height: window.innerHeight - 180, overflowX: "auto", '::-webkit-scrollbar': { display: "none" },
                    }}>
                        {disArry && disArry.map((value, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: "column" }}>
                                {
                                    value.imageName.endsWith('.pdf') ? (
                                        <embed
                                            src={value.url}
                                            type="application/pdf"
                                            height={820}
                                            width="100%"
                                        />) : (
                                        <img
                                            alt=''
                                            src={value.url}
                                            height={820}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                    )
                                }
                            </Box>
                        ))
                        }
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: "flex-end", }}>
                        <Button variant="outlined" color="secondary"
                            size="md" onClick={handleClose}>Cancel</Button>
                    </Box>
                </Sheet>
            </Modal>
        </CssVarsProvider >
    )
}

export default memo(ImageDisplayModal)