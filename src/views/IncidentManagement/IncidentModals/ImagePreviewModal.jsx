import React, { memo } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ImagePreviewModal = ({ open, handleClose, imageSrc }) => {
    if (!imageSrc) return null;


    // Determine if it's a File object or a stored URL
    const isFile = imageSrc instanceof File;
    const url = isFile ? URL.createObjectURL(imageSrc) : imageSrc?.url || '';
    const name = isFile ? imageSrc.name : imageSrc?.imageName;

    const isPdf = name?.toLowerCase().endsWith('.pdf');

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: 2,
                    outline: 'none',
                    width: '40vw',
                    height: '50vh',
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'black',
                        bgcolor: 'var(--royal-purple-400)',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {isPdf ? (
                    <embed
                        src={`${url}#toolbar=0&navpanes=0&view=FitH`}
                        type="application/pdf"
                        height="100%"
                        width="100%"
                    />
                ) : (
                    <img
                        alt={name}
                        src={url}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            margin: 'auto',
                            borderRadius: 8,
                            objectFit: 'contain',
                        }}
                    />
                )}
            </Box>
        </Modal>
    );
};

export default memo(ImagePreviewModal);

