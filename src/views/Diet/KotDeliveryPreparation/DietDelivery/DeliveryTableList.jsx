import React, { useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { Box, Paper } from "@mui/material";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import { useNursingStationMaster } from "../../CommonData/UseQuery";

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

    const { data: NURSING_STATIONS = [] } = useNursingStationMaster();

    const stationMap = useMemo(() => {
        return NURSING_STATIONS.reduce((acc, s) => {
            acc[s.fb_ns_code] = s;
            return acc;
        }, {});
    }, [NURSING_STATIONS]);

    console.log({
        data
    });


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
                    ["Patient", 140],
                    ["Pt No", 120],
                    ["Meal", 120],
                    ["Diet", 160],
                    ["NS", 160],
                    ["Items", 90],
                    ["Food Status", 120],
                    ["Assignee", 100],
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
                    const station = stationMap[row.ns_code];

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

                            <Cell width={140}>
                                <DietTextComponent
                                    value={row.ptc_ptname}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent value={row.pt_no} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent
                                    value={row.meal?.toUpperCase()}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={160}>
                                <DietTextComponent value={row.diet_name} size={12} />
                            </Cell>

                            <Cell width={160}>
                                <DietTextComponent
                                    value={station?.fb_ns_name ?? row.ns_code}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={90}>
                                <DietTextComponent
                                    value={`${row.items?.length || 0} items`}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent
                                    value={row.foodStatus || "Pending"}
                                    size={12}
                                    color={row.color}
                                />
                            </Cell>

                            <Cell width={100}>
                                <DietTextComponent
                                    value={row.assigneeName || "-"}
                                    size={12}
                                />
                            </Cell>

                            <Cell width={180}>
                                <DietTextComponent
                                    value={
                                        row.assignedAt
                                            ? new Date(row.assignedAt).toLocaleString()
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
