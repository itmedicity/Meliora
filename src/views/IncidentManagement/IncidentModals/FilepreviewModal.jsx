import { Box, IconButton } from '@mui/joy'
import React, { memo, useState } from 'react'
// import { ArrowBack, ArrowForward } from '@mui/icons-material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FilepreviewModal = ({ IncidentFiles }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? IncidentFiles.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === IncidentFiles.length - 1 ? 0 : prev + 1))
    }

    const file = IncidentFiles?.[currentIndex];

    const isPdf = file.blob?.type === "application/pdf";
    const isImage = file.blob?.type?.startsWith("image/");


    return (
        <Box
            sx={{
                width: '70vw',
                height: '65vh',
                position: 'relative',
                bgcolor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                // p: 2
            }}>
            {/* File display */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"
                }}>
                {isPdf ? (

                    <embed
                        src={file.url}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        style={{
                            border: "none",
                            borderRadius: "8px"
                        }}
                    />
                ) : isImage ? (
                    <img
                        src={file.url}
                        alt={file.imageName}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            borderRadius: "8px"
                        }}
                    />
                ) : (
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                        📎 {file.imageName}
                    </a>
                )}

            </Box>

            {/* Controls */}
            {IncidentFiles?.length > 1 && (
                <>
                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: 16,
                            transform: "translateY(-50%)",
                            bgcolor: "#fff",
                            boxShadow: 2
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: 16,
                            transform: "translateY(-50%)",
                            bgcolor: "#fff",
                            boxShadow: 2
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </>
            )}

            {/* Dots indicator */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1, gap: 1 }}>
                {IncidentFiles?.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: i === currentIndex ? "primary.solidBg" : "neutral.outlinedBorder",
                            cursor: "pointer"
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default memo(FilepreviewModal)
