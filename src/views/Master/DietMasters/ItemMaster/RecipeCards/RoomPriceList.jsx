import React, { memo, useEffect, useState } from "react";
import { Box, Checkbox, Typography } from "@mui/joy";
import { warningNotify } from "src/views/Common/CommonCode";
import { UseRoomCategoryDetail } from "src/views/Diet/CommonData/UseQuery";

const rateLabels = [
    "Bystander Rate (₹)",
    "Patient Rate (₹)",
    "Staff Rate (₹)",
    "Guest Rate (₹)",
    "Special Rate (₹)"
];

const RoomPriceList = ({ editIndex }) => {

    const { data: RoomCategoryDetil = [] } = UseRoomCategoryDetail();

    const [rooms, setRooms] = useState([]);
    const [rates, setRates] = useState({});
    const [applyAll, setApplyAll] = useState(false);
    const [applyColumn, setApplyColumn] = useState({}); // track per-column apply

    useEffect(() => {
        setRooms(RoomCategoryDetil);
    }, [RoomCategoryDetil]);

    // Handle rate change per room and per rate column
    const handleRateChange = (roomKey, rateIndex, value) => {
        setRates(prev => ({
            ...prev,
            [roomKey]: {
                ...prev[roomKey],
                [rateIndex]: value
            }
        }));
    };

    // Apply first row rate to all rooms
    const applySameToAll = (checked) => {
        if (!rooms.length) return warningNotify("No rooms available");

        const firstRoomKey = rooms[0].diet_rm_name;

        if (checked) {
            if (!rates[firstRoomKey] || Object.values(rates[firstRoomKey]).every(v => !v)) {
                return warningNotify("Please enter rate for first room before applying");
            }

            const updatedRates = {};
            rooms.forEach(room => {
                updatedRates[room.diet_rm_name] = { ...rates[firstRoomKey] };
            });
            setApplyAll(true);
            setRates(updatedRates);
        } else {
            setApplyAll(false);
        }
    };

    // Apply a single column value from first row to all rows
    const applyColumnToAll = (rateIndex, checked) => {
        const firstRoomKey = rooms[0]?.diet_rm_name;
        const firstValue = rates[firstRoomKey]?.[rateIndex];

        if (checked) {
            if (!firstValue) {
                return warningNotify("Please enter value in first room before applying");
            }

            setRates(prev => {
                const updated = { ...prev };
                rooms.forEach(room => {
                    const key = room.diet_rm_name;
                    updated[key] = {
                        ...updated[key],
                        [rateIndex]: firstValue
                    };
                });
                return updated;
            });
        } else {
            setRates(prev => {
                const updated = { ...prev };
                rooms?.forEach(room => {
                    const key = room.diet_rm_name;
                    if (key !== firstRoomKey && updated[key]) {
                        delete updated[key][rateIndex];
                    }
                });
                return updated;
            });
        }

        setApplyColumn(prev => ({ ...prev, [rateIndex]: checked }));
    };

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Checkbox
                label="Apply same price to all rooms"
                checked={applyAll}
                onChange={(e) => applySameToAll(e.target.checked)}
                sx={{ mb: 1 }}
            />

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ padding: "8px", border: "1px solid #ccc", fontSize: 12 }}>Room Name</th>
                        {rateLabels?.map((label, rateIndex) => (
                            <th key={rateIndex} style={{ padding: "8px", border: "1px solid #ccc" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: 12, justifyContent: 'center' }}>
                                    {label}
                                    {/* Checkbox to apply this column to all */}
                                    <Checkbox
                                        size="sm"
                                        checked={applyColumn[rateIndex] || false}
                                        onChange={(e) => applyColumnToAll(rateIndex, e.target.checked)}
                                    />
                                </Box>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        rooms?.map((room, i) => {
                            const roomKey = room?.diet_rm_name;
                            return (
                                <tr
                                    key={roomKey}
                                    style={{
                                        background: editIndex === i ? "#e3f2fd" : "white"
                                    }}>
                                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                                        <Typography fontSize={12} fontWeight={500} >
                                            {roomKey}
                                        </Typography>
                                    </td>

                                    {rateLabels?.map((_, rateIndex) => (
                                        <td key={rateIndex} style={{ padding: "4px", border: "1px solid #ccc" }}>
                                            <input
                                                type="number"
                                                value={rates[roomKey]?.[rateIndex] || ""}
                                                onChange={(e) =>
                                                    handleRateChange(roomKey, rateIndex, e.target.value)
                                                }
                                                style={{
                                                    width: "100%",
                                                    padding: "6px",
                                                    borderRadius: 4,
                                                    border: "1px solid #ccc"
                                                }}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </Box>
    );
};

export default memo(RoomPriceList);
