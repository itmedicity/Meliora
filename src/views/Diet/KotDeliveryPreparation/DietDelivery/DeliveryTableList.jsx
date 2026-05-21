import React, { } from "react";
import { Virtuoso } from "react-virtuoso";
import { Box, Paper } from "@mui/material";
import DietTextComponent from "../../DietComponent/DietTextComponent";


const Cell = ({ width, children }) => (
    <Box
        sx={{
            width,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
        }}
    >
        {children}
    </Box>
);

const DeliveryTableList = ({ data = [] }) => {

    return (
        <Paper sx={{ width: "100%" }}>
            {/* HEADER */}
            <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                    bgcolor: "#7c51a1",
                    py: 0.6,
                    px: 1,
                    borderBottom: "1px solid lightgrey",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                }}
            >
                {[
                    ["Sl.No", 60],
                    ["Order Id", 60],
                    ["Patient", 140],
                    ["Pt No", 120],
                    ["Meal", 120],
                    ["NS", 160],
                    ["Order Status", 120],
                    ["Item Priority", 120],
                    ["Assignee", 180],
                    ["Assignee Status", 100],
                    ["Assigned At", 180],
                ].map(([label, width]) => (
                    <Cell key={label} width={width}>
                        <DietTextComponent
                            value={label}
                            weight={600}
                            color={"white"}
                        />
                    </Cell>
                ))}
            </Box>

            {/* BODY */}
            <Virtuoso
                style={{ height: "72vh" }}
                data={data}
                itemContent={(index, row) => {
                    return (
                        <Box
                            key={`${row.order_id}-${index}`}
                            display="flex"
                            justifyContent="space-between"
                            sx={{
                                borderBottom: "1px solid #eee",
                                alignItems: "center",
                                px: 1,
                                py: 0.6,
                                backgroundColor: row.bgcolor || "white",
                            }}
                        >
                            <Cell width={60}>
                                <DietTextComponent value={index + 1} size={12} />
                            </Cell>
                               <Cell width={60}>
                                <DietTextComponent value={`#${row.canteen_order_id}`} size={12} />
                            </Cell>


                            <Cell width={140}>
                                <DietTextComponent
                                    value={row.fb_ptc_name}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent value={row.fb_pt_no} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent
                                    value={row.meal_type?.toUpperCase()}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={160}>
                                <DietTextComponent
                                    value={row.nursing_station}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent
                                    value={row.ItemStatus || "Pending"}
                                    size={12}
                                    color={row.color}
                                />
                            </Cell>
                            <Cell width={120}>
                                <DietTextComponent
                                    value={row.ItemPriority || "Pending"}
                                    size={12}
                                    color={row.color}
                                />
                            </Cell>

                            <Cell width={180}>
                                <DietTextComponent
                                    value={row.assigned_to || "-"}
                                    size={12}
                                />
                            </Cell>
                            <Cell width={100}>
                                <DietTextComponent
                                    value={row.ItemStatus}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={180}>
                                <DietTextComponent
                                    value={
                                        row.assigned_at
                                            ? new Date(row.assigned_at).toLocaleString()
                                            : "-"
                                    }
                                    size={12}
                                />
                            </Cell>


                        </Box>
                    );
                }}
            />
        </Paper>
    );
};

export default DeliveryTableList;
