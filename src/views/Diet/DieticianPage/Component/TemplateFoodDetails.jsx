import React, { memo, useState } from "react";
import {
    Box,
    Table,
    Chip,
    IconButton
} from "@mui/joy";
import Collapse from "@mui/material/Collapse";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DietTextComponent from "../../DietComponent/DietTextComponent";



const TemplateFoodDetails = ({ templateData }) => {

    const [openDays, setOpenDays] = useState({});

    const toggleDay = (day) => {
        setOpenDays(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    return (
        <Box>
            {Object.entries(templateData || {}).map(
                ([day, meals]) => (
                    <Box
                        key={day}
                        sx={{
                            mb: 2,
                            border: "1px solid #ececec",
                            borderRadius: 10,
                            overflow: "hidden"
                        }}
                    >
                        {/* DAY HEADER */}
                        <Box
                            onClick={() => toggleDay(day)}
                            sx={{
                                px: 2,
                                py: 1.5,
                                bgcolor: "#fafafa",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer"
                            }}
                        >
                            <DietTextComponent
                                value={day}
                                size={16}
                                weight={800}
                            />

                            <IconButton size="sm">
                                {openDays[day] ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </IconButton>
                        </Box>

                        <Collapse in={openDays[day]}>
                            <Box sx={{ p: 2 }}>

                                {Object.entries(meals).map(
                                    ([mealType, mealData]) => (
                                        <Box
                                            key={mealType}
                                            sx={{ mb: 3 }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    mb: 1
                                                }}
                                            >
                                                <DietTextComponent
                                                    value={mealType}
                                                    size={14}
                                                    weight={700}
                                                />

                                                <Chip
                                                    size="sm"
                                                    variant="soft"
                                                >
                                                    {mealData?.items?.length || 0}
                                                </Chip>
                                            </Box>

                                            <Table
                                                size="sm"
                                                borderAxis="xBetween"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Food Item</th>
                                                        <th>Alias</th>
                                                        <th>Group</th>
                                                        <th>Category</th>
                                                        <th>Qty</th>
                                                        <th>Unit</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {mealData?.items?.map(
                                                        (item) => (
                                                            <tr
                                                                key={
                                                                    item.template_food_id
                                                                }
                                                            >
                                                                <td>
                                                                    {
                                                                        item.item_name
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        item.alias_name ||
                                                                        "-"
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        item.group_name
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        item.category_name
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        item.unit_code
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Box>
                                    )
                                )}
                            </Box>
                        </Collapse>
                    </Box>
                )
            )}
        </Box>
    );
};

export default memo(TemplateFoodDetails);