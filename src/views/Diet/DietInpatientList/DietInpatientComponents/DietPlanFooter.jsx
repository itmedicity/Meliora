import React, { memo } from "react";
import { Box } from "@mui/joy";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DietButton from "../../DietComponent/DietButton";


const DietPlanFooter = ({
    HandleClose,
    handleSubmit,
    editMode,
    isPlanned
}) => {
    return (
        <Box
            sx={{
                p: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                borderTop: "1px solid #ececec",
                bgcolor: "#fff"
            }}
        >
            {/* CANCEL */}
            <DietButton
                width={150}
                onClick={HandleClose}
                icon={CancelIcon}
                name="Cancel"
            />

            {/* SAVE / UPDATE */}
            {
                (!isPlanned || editMode)&&
                <DietButton
                    width={150}
                    onClick={() =>
                        handleSubmit(editMode ? "update" : "save")
                    }
                    icon={SaveIcon}
                    name={(editMode || isPlanned) ? "Update Diet" : "Save Diet"}
                />
            }
        </Box>
    );
};

export default memo(DietPlanFooter);