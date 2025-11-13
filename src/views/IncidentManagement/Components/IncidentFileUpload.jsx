import React, { useRef } from 'react';
import { Box, Typography, IconButton, Card, CardCover } from '@mui/joy';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import IncidentTextComponent from './IncidentTextComponent';

const IncidentFileUpload = ({ files = [], setFiles }) => {
    const inputRef = useRef();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newFiles = selectedFiles.filter(file => !files?.some(f => f?.name === file?.name));
        setFiles(prev => [...prev, ...newFiles]);
        inputRef.current.value = ''; // Clear the input
    };

    // Function to remove the selected images
    const handleFileRemove = (index) => {
        const updatedFiles = [...files];
        updatedFiles?.splice(index, 1);
        setFiles(updatedFiles);
    };

    const isImage = (file) => file.type.startsWith('image/');

    return (
        <Box sx={{ mt: 2 }}>
            <IncidentTextComponent text={"5. Upload Files"} color={'#403d3dff'} size={18} weight={600} />
            <Box
                onClick={() => inputRef.current?.click()}
                sx={{
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    padding: '6px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: '0.3s ease',
                    '&:hover': {
                        borderColor: '#7c3aed',
                        backgroundColor: '#fafaff',
                    }
                }}
            >
                <UploadFileIcon color="primary" />
                <IncidentTextComponent text={" Click to upload or drag & drop files"} color={'#403d3dff'} size={12} weight={400} />
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
            </Box>

            {/* Preview Area */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {files?.filter((file) => file instanceof File)
                    ?.map((file, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            sx={{
                                width: 90,
                                height: 90,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: '#fafafa',
                                border: '1px solid #ddd'
                            }}
                        >
                            {isImage(file) ? (
                                <CardCover>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 4
                                        }}
                                    />
                                </CardCover>
                            ) : (
                                <Typography sx={{ textAlign: 'center', px: 1, fontSize: 12 }}>
                                    {file.name}
                                </Typography>
                            )}

                            <IconButton
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents card click
                                    handleFileRemove(index);
                                }}
                                sx={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 4,
                                    backgroundColor: '#fff',
                                    zIndex: 10
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Card>
                    ))}

            </Box>
        </Box>
    );
};

export default IncidentFileUpload;
