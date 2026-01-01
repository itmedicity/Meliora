import React, { memo, useState } from "react";
import { Box, Chip, IconButton } from "@mui/joy";
import { IoAttachOutline } from "react-icons/io5";
import IncidentTextComponent from "../Components/IncidentTextComponent";

const ExpandableSection = ({
    isOpen,
    rca,
    preventiveAction,
    hasFile,
    onFileClick,
    fileId,
}) => {
    const [zoomRca, setZoomRca] = useState(false);
    const [zoomPrev, setZoomPrev] = useState(false);

    if (!isOpen) return null;

    return (
        <>
            {/* RCA */}
            <Box sx={{ mt: 1.5, p: 1, borderRadius: "8px", backgroundColor: "#f9f6ff" }}>
                <Chip
                    onDoubleClick={() => setZoomRca(p => !p)}
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{ mb: 0.5, cursor: "zoom-in" }}
                >
                    RCA
                </Chip>

                <Box
                    onDoubleClick={() => setZoomRca(p => !p)}
                    sx={{
                        width: "100%",
                        cursor: "zoom-in",
                        transition: "all 0.25s ease",
                    }}
                >
                    <IncidentTextComponent
                        text={`${rca ? rca : 'Not Acknowledged Yet'}`}
                        size={zoomRca ? 20 : 14}
                        weight={400}
                        color="#444"
                    />
                </Box>
            </Box>

            {/* Preventive Action */}
            <Box sx={{ mt: 1.5, p: 1, borderRadius: "8px", backgroundColor: "#f9f6ff" }}>
                <Chip onDoubleClick={() => setZoomPrev(p => !p)} size="sm" variant="soft" color="warning"
                    sx={{ mb: 0.5, cursor: "zoom-in" }}>
                    Preventive Action
                </Chip>

                <Box
                    onDoubleClick={() => setZoomPrev(p => !p)}
                    sx={{
                        width: "100%",
                        cursor: "zoom-in",
                        transition: "all 0.25s ease",
                    }}
                >
                    <IncidentTextComponent
                        text={`${preventiveAction ? preventiveAction : 'Not Acknowledged Yet'}`}
                        size={zoomPrev ? 20 : 14}
                        weight={400}
                        color="#444"
                    />
                </Box>
            </Box>

            {/* FILE */}
            {hasFile && (
                <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        onClick={() => onFileClick(fileId)}
                        color="primary"
                        sx={{ bgcolor: "#ede7f6", "&:hover": { bgcolor: "#d1c4e9" } }}
                    >
                        <IoAttachOutline size={20} />
                    </IconButton>

                    <IncidentTextComponent
                        text="Attached files"
                        size={13}
                        weight={500}
                        color="#444"
                    />
                </Box>
            )}
        </>
    );
};

export default memo(ExpandableSection);
