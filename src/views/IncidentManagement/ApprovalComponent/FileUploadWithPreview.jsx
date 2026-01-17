import React, { memo } from "react";
import { Box, IconButton } from "@mui/joy";
import { IoAttachOutline, IoCloseCircle } from "react-icons/io5";
import IncidentTextComponent from "../Components/IncidentTextComponent";

const FileUploadWithPreview = ({
    label = "Attach Files",
    multiple = true,
    previewUrls,
    handleFileSelect,
    handleRemoveFile,
}) => {

    return (
        <>
            {/* Upload Button */}
            <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <label>
                    <input
                        type="file"
                        hidden
                        multiple={multiple}
                        onChange={handleFileSelect}
                    />
                    <IconButton
                        component="span"
                        color="primary"
                        sx={{ bgcolor: "#ede7f6", "&:hover": { bgcolor: "#d1c4e9" } }}
                    >
                        <IoAttachOutline size={20} />
                    </IconButton>
                </label>

                <IncidentTextComponent text={label} size={13} weight={500} color="#444" />
            </Box>

            {/* Preview */}
            {previewUrls?.length > 0 && (
                <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {previewUrls.map((file) => (
                        <Box
                            key={file.name}
                            sx={{
                                p: 1,
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                bgcolor: "#fafafa",
                                position: "relative",
                            }}
                        >
                            {file.type.startsWith("image") ? (
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    width={50}
                                    height={50}
                                    style={{ borderRadius: 4 }}
                                />
                            ) : (
                                <IncidentTextComponent text={file.name} size={12} color="#333" />
                            )}

                            <IoCloseCircle
                                size={22}
                                color="red"
                                style={{ cursor: "pointer", position: "absolute", right: -8, top: -8 }}
                                onClick={() => handleRemoveFile(file.name)}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
};

export default memo(FileUploadWithPreview);
