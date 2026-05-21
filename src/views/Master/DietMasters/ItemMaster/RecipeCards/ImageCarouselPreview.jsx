import { Box, IconButton, Skeleton } from '@mui/joy'
import React, { memo, useState, useCallback } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const ImageCarouselPreview = ({
    images = [],
    setImages,
    formData
}) => {


  
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



    const safeImages = Array.isArray(images)
        ? images
        : [];



    const handleDelete = useCallback(async () => {
        const selectedImage = safeImages[currentImage];
        try {
            /* DELETE BACKEND FILE */
            if (selectedImage?.blob) {
                const result = await axioslogin.post(
                    "/fooditemmast/files/delete",
                    {
                        id: formData?.item_id,
                        filename: selectedImage?.name
                    }
                );
                const { success, message } = result.data;
                if (success !== 1) {
                    return warningNotify(
                        message || "Failed to delete file"
                    );
                }
                succesNotify(message || "File deleted successfully");
            }
            /* REMOVE FROM FRONTEND */
            const updated = images.filter(
                (_, i) => i !== currentImage
            );
            setImages(updated);
            if (currentImage >= updated.length) {
                setCurrentImage(
                    updated.length > 0
                        ? updated.length - 1
                        : 0
                );
            }
        } catch (error) {
            console.log("DELETE ERROR :", error);
            errorNotify(
                error?.response?.data?.message ||
                "Error deleting file"
            );
        }

    }, [
        currentImage,
        images,
        setImages,
        formData
    ]);

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
                        src={images[currentImage]?.url}
                        alt="preview"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />

                    {/* DELETE */}
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

                    {/* PREVIOUS */}
                    {images.length > 1 && (
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
                    )}

                    {/* NEXT */}
                    {images.length > 1 && (
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
                    )}

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