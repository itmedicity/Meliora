import React, { memo } from 'react';
import { Box, Tooltip } from '@mui/joy';
import { MdDeleteOutline } from "react-icons/md";
import pdfimage from '../../../assets/images/pdf.png'

const AttachedFilesCard = ({
    incidentFiles,
    onFileClick,
    setFiles,
    setCurrentStep,
    isShowDelete
}) => {


    const handleFileRemove = (index) => {
        const updatedFiles = [...incidentFiles];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
        if (updatedFiles.length === 0) {
            // setIsFileEdited(true)
            setCurrentStep(4);
        }
    };


    return (
        <Box sx={{ p: 2 }}>
            <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                {incidentFiles?.map((file, idx) => {
                    const isImage = file.blob?.type?.startsWith("image/");
                    // || file.type.startsWith('image/')
                    const isPfd = file.blob?.type === "application/pdf"
                    let fileUrl = "";
                    if (file?.blob instanceof Blob) {
                        fileUrl = URL.createObjectURL(file.blob);
                    } else if (file instanceof File) {
                        fileUrl = URL.createObjectURL(file);
                    } else if (file?.url) {
                        fileUrl = file.url;
                    };

                    return (
                        <Box
                            key={idx}
                            sx={{
                                width: 120,
                                height: 120,
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 1,
                                cursor: "pointer",
                                position: "relative",
                            }}
                            onClick={() => isImage && onFileClick(file)}
                        >
                            {/* delete button */}
                            {isShowDelete && (
                                <Box
                                    sx={{ position: "absolute", right: -10, top: 0 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFileRemove(idx);
                                    }}
                                >
                                    <Tooltip title="Delete File">
                                        <Box
                                            sx={{
                                                p: 0.5,
                                                bgcolor: "#ced4da",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <MdDeleteOutline fontSize={22} style={{ color: "var(--royal-purple-400)" }} />
                                        </Box>
                                    </Tooltip>
                                </Box>
                            )}

                            {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
                            {isPfd ? (
                                <a href={file?.url} target="_blank" rel="noopener noreferrer">
                                    <img src={pdfimage} alt='pdf' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </a>
                                // <PdfViewer src={value.url} />

                            ) : (
                                <img alt="" src={fileUrl} height={820} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default memo(AttachedFilesCard);
