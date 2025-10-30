import { Box, IconButton } from '@mui/joy';
import React, { useRef } from 'react';
import FileViewer from 'react-file-viewer';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";


const PdfViewerHic = ({ src }) => {
    const componentRef = useRef();
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            {/* Overlayed Navigation Bar */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    borderRadius: 1,
                    boxShadow: 1,
                    zIndex: 10,
                    padding: '4px 8px',
                }}
            >
                <IconButton >
                    <IoArrowBackCircleOutline />
                </IconButton>
                <IconButton>
                    <IoArrowForwardCircleOutline />
                </IconButton>
                {/* <IconButton onClick={handlePrint}>
                    <IoPrintOutline />
                </IconButton> */}
            </Box>

            {/* Your PDF Viewer */}
            <Box ref={componentRef} sx={{ width: '100%', height: '100%', }}>
                <FileViewer fileType="pdf" filePath={src} onError={(e) => console.error(e)} sx={{ mt: 7 }} />
            </Box>
        </Box>)
}

export default PdfViewerHic