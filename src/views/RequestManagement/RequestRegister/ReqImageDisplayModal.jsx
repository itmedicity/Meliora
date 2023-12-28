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
                // console.log(parts);
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

    // console.log("disArry", disArry);
    return (
        <CssVarsProvider>
            <Modal aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', maxHeight: 700, }}>
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: "50%", borderRadius: 'md', p: 3, boxShadow: 'lg', minHeight: 500,
                        maxWidth: 300, maxHeight: 700,
                    }}
                >
                    <Box sx={{
                        width: '100%', flex: 1, borderRadius: 1,
                        border: '0.1px solid #454545', minHeight: 500, margin: "auto",
                        height: window.innerHeight - 350, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }
                    }}>
                        {disArry && disArry.map((value, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: "column" }}>
                                <embed
                                    alt="CRF Image"
                                    // type="application/pdf"
                                    src={value.url}
                                    width="100%"
                                    height="100%"
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