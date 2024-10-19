import React, { memo, useCallback } from 'react'
import { Paper, Typography } from '@mui/material';
import { Box, Button, CssVarsProvider, Modal, ModalDialog } from '@mui/joy';
import CancelIcon from '@mui/icons-material/Cancel';

const ComFileView = ({ imageUrls, imageViewOpen, fileDetails, setimageViewOpen, setimage }) => {

    const { complaint_slno, complaint_desc, compalint_date, rm_roomtype_name, rm_room_name, rm_insidebuildblock_name,
        rm_floor_name, location, complaint_type_name, } = fileDetails


    const Close = useCallback(() => {
        setimageViewOpen(false)
        setimage(0)
    }, [setimageViewOpen, setimage])

    const buttonStyle = {
        fontSize: 16,
        color: '#523A28',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#523A28',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }

    return (
        <CssVarsProvider>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={imageViewOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog variant="outlined" sx={{ p: 0, overflow: 'auto' }}>
                    <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1, }}>
                        <Box sx={{ flex: 1, color: 'grey', }}>
                            File View
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }}
                                onClick={Close}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: .5 }}>
                        <Box sx={{ flex: 1, pl: .5 }}>
                            <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', }}>Ticket No.{complaint_slno}</Typography>
                            <Typography sx={{ pl: .5, fontSize: 14, color: 'Black', }}>
                                {complaint_desc}
                            </Typography>
                            <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', py: .5 }}>
                                Complaint Type: {complaint_type_name}
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1, textAlign: 'right', pr: 1.5 }}>
                            <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                {location}
                            </Typography>
                            {rm_room_name !== null ?
                                <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                    {rm_room_name}
                                    {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name ?
                                        ` (${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''}${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${(rm_insidebuildblock_name && rm_floor_name) ? ' - ' : ''}${rm_floor_name ? rm_floor_name : ''})`
                                        : "Not Updated"}
                                </Typography> : null}
                            <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                                {compalint_date}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ gap: 5 }}>
                        {imageUrls.map((imageUrl, index) => (
                            <Paper key={index} sx={{ bgcolor: '#EBEBE8', cursor: 'pointer', height: 700, width: 820, mb: 1, mx: 1 }}>
                                <embed
                                    id="pdf-embed"
                                    src={imageUrl}
                                    type="application/pdf"
                                    height={650}
                                    width={'100%'} />

                            </Paper>
                        ))
                        }
                    </Box>
                    <Box sx={{ textAlign: 'right', pb: 1, mr: 1 }}>
                        <Button
                            variant='plain'
                            sx={buttonStyle}
                            onClick={Close}
                        >Cancel</Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </CssVarsProvider>

    )
}

export default memo(ComFileView)