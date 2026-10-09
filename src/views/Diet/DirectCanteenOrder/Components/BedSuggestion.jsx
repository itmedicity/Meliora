import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";

const BedSuggestion = ({ suggestions, onSelect, activeIndex }) => {

    return (
        <Box
            sx={{
                position: "absolute",
                top: "110%",
                left: 0,
                right: 0,
                bgcolor: "#fff",
                borderRadius: 8,
                boxShadow: "md",
                zIndex: 20
            }}
        >
            {suggestions?.map((bed, index) => {
                const bedName = bed?.fb_bdc_no ?? "UNKNOWN";
                const bedCode = bed?.fb_bd_code ?? "-";

                return (
                    <Box
                        key={bed?.fb_bed_slno}
                        onClick={() => onSelect(bed)}
                        sx={{
                            px: 2,
                            py: 1,
                            cursor: "pointer",
                            bgcolor: index === activeIndex ? "#e3f2fd" : "transparent",
                            "&:hover": {
                                bgcolor: "#f1f1f1",
                            },
                        }}
                    >
                        <Typography fontSize={14} fontWeight={600}>
                            {bedName.toUpperCase()}
                        </Typography>

                        <Typography fontSize={12} color="neutral.500">
                            Code: {bedCode}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default memo(BedSuggestion);