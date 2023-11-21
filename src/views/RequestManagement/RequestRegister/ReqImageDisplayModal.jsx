import React, { memo, useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider } from '@mui/joy';
import { Box } from '@mui/material'
import Button from '@mui/joy/Button';

const ReqImageDisplayModal = ({ open, handleClose, images }) => {

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
                sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: "30%", borderRadius: 'md', p: 3, boxShadow: 'lg', height: 600,
                        maxWidth: 300
                    }}
                >
                    <Box sx={{ width: '100%', flex: 1, height: '90%', borderRadius: 1, border: '0.1px solid #454545' }}>
                        {disArry && disArry.map((value, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: "column" }}>
                                <embed
                                    alt="CRF Image"
                                    src={value.url}
                                    height={200}
                                    style={{ maxWidth: '100%', maxHeight: '100%', margin: '6px', }}
                                />
                                {value.imageName}
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

export default memo(ReqImageDisplayModal)