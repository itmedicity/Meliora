import React, { memo } from "react";
import { Box } from "@mui/joy";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DietTextComponent from "../DietComponent/DietTextComponent";

const PatientOrderItemList = ({ items = [], onRemove }) => {
    return (
        <Box sx={{ maxHeight: 220, overflowY: "auto", px: 2 }}>
            {items?.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                        borderBottom: "1px solid #f0f0f0",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <LunchDiningOutlinedIcon sx={{ fontSize: 16, mt: 0.3 }} />
                        <Box>
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}>
                        
                                <DietTextComponent
                                    value={item.item_name}
                                    size={14}
                                    weight={600}
                                />
                                {item.isNew && (
                                    <Box
                                        sx={{
                                            bgcolor: "#2ecc71",
                                            color: "#fff",
                                            fontSize: 10,
                                            px: 1,
                                            borderRadius: 1,
                                            fontWeight: 600
                                        }}>
                                        NEW
                                    </Box>
                                )}
                            </Box>

                            <DietTextComponent
                                value={
                                    item.nutritious_value ||
                                    "Good For the Patient Health"
                                }
                                size={11}
                                weight={400}
                                color="#777"
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            textAlign: "right",
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <DietTextComponent
                                value={`x${item.qty}`}
                                size={13}
                                weight={500}
                            />
                            <DietTextComponent
                                value={`₹${item.qty * item.price}`}
                                size={13}
                                weight={600}
                            />
                        </Box>

                        <HighlightOffIcon
                            onClick={() => onRemove(index)}
                            sx={{ fontSize: 18, cursor: "pointer" }}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default memo(PatientOrderItemList);
