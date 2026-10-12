import { Box, Typography, Button, CircularProgress } from '@mui/joy'
import React, { memo, useState } from 'react'

const ImageUpload = ({ handleUpload, handleFetchNutrition }) => {

    const [loading, setLoading] = useState(false);

    const onFetchClick = async () => {
        try {
            setLoading(true);
            await handleFetchNutrition(); // call parent function
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, minWidth: 160 }}>

            {/* Upload Box */}
            <Box
                component="label"
                sx={{
                    cursor: "pointer",
                    border: "1px dashed #ccc",
                    textAlign: "center",
                    p: 1,
                    borderRadius: "md",
                    '&:hover': {
                        borderColor: '#1976d2',
                        backgroundColor: 'rgba(25,118,210,0.05)'
                    },
                    // width: 300
                }}>
                <Typography fontSize={11} fontWeight={600}>
                    Upload Images
                </Typography>

                <input
                    hidden
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUpload}
                />
            </Box>

            {/* Fetch Button */}
            <Button
                size="sm"
                variant="soft"
                onClick={onFetchClick}
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size="sm" />
                ) : (
                    "Fetch Nutrition"
                )}
            </Button>

        </Box>
    )
}

export default memo(ImageUpload)