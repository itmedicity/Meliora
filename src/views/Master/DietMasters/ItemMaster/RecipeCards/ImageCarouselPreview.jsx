import { Box, IconButton, Skeleton } from '@mui/joy'
import React, { memo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

const ImageCarouselPreview = ({ images, setImages }) => {

    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = () => {
        setCurrentImage(prev =>
            prev === images.length - 1 ? 0 : prev + 1
        )
    }

    const prevImage = () => {
        setCurrentImage(prev =>
            prev === 0 ? images.length - 1 : prev - 1
        )
    }

    const handleDelete = () => {
        const updated = images.filter((_, i) => i !== currentImage)
        setImages(updated)
        if (currentImage >= updated.length) {
            setCurrentImage(updated.length - 1)
        }
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: 300,
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: "md",
                p: 0.5,
                position: "relative"
            }}
        >

            {images.length > 0 ? (
                <>
                    <img
                        src={images[currentImage]}
                        alt="preview"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />

                    {/* Delete Button */}
                    <IconButton
                        size="sm"
                        onClick={handleDelete}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "#ffffffcc"
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                    {/* Previous */}
                    <Box
                        onClick={prevImage}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: 5,
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            bgcolor: "#00000055",
                            color: "white",
                            px: 1,
                            borderRadius: 2
                        }}
                    >
                        ◀
                    </Box>

                    {/* Next */}
                    <Box
                        onClick={nextImage}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: 5,
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            bgcolor: "#00000055",
                            color: "white",
                            px: 1,
                            borderRadius: 2
                        }}
                    >
                        ▶
                    </Box>
                </>
            ) : (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ borderRadius: 5 }}
                />
            )}
        </Box>
    )
}

export default memo(ImageCarouselPreview)