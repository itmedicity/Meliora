import React, { memo } from "react";
import { Sheet, Typography } from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SubCategoryItem = ({ sub, isSelected, onSelect }) => {
    return (
        <Sheet
            key={sub?.inc_sub_cat_slno}
            onClick={() => onSelect(sub?.inc_sub_cat_slno)}
            variant="outlined"
            sx={{
                cursor: "pointer",
                px: 1.5,
                py: 0.75,
                borderRadius: "sm",
                borderWidth: "2px",
                borderColor: isSelected
                    ? "var(--royal-purple-300)"
                    : "neutral.outlinedBorder",
                backgroundColor: isSelected
                    ? "var(--royal-purple-100)"
                    : "background.body",
                minWidth: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "0.2s ease",
                "&:hover": {
                    boxShadow: "sm",
                    borderColor: "primary.outlinedHoverBorder",
                },
            }}
        >
            <Typography
                level="body-sm"
                sx={{
                    fontWeight: 500,
                    fontSize: 13,
                    textAlign: "left",
                }}
            >
                {sub?.inc_sub_category_name}
            </Typography>

            {isSelected && (
                <CheckCircleIcon
                    fontSize="small"
                    sx={{ color: "var(--royal-purple-300)" }}
                />
            )}
        </Sheet>
    );
};

export default memo(SubCategoryItem);
