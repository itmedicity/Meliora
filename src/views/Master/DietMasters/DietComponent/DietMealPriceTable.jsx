import React, { memo } from "react";
import { Box } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";

const DietMealPriceTable = ({
    columnsPrice = [],
    data = [],
    minWidth = 500,
    onEdit,
}) => {

    if (!columnsPrice?.length) return null;

    return (
        <Box
            sx={{
                width: "100%",
                overflowX: "auto",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 6,
                mb: 2,
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth,
                }}
            >
                {/* HEADER */}
                <thead>
                    <tr>
                        {columnsPrice.map((col) => (
                            <th
                                key={col.key}
                                style={{
                                    padding: 8,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    textAlign: col.align || "left",
                                    background: "#f5f5f5",
                                    borderBottom: "1px solid rgba(0,0,0,0.15)",
                                }}
                            >
                                {col.label}
                            </th>
                        ))}

                        <th
                            style={{
                                padding: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                background: "#f5f5f5",
                                borderBottom: "1px solid rgba(0,0,0,0.15)",
                                textAlign: "center",
                            }}
                        >
                            Edit
                        </th>
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {data?.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columnsPrice.length + 1}
                                style={{
                                    padding: 12,
                                    textAlign: "center",
                                    fontSize: 12,
                                    color: "#888",
                                }}
                            >
                                No Meal Prices Available
                            </td>
                        </tr>
                    ) : (
                        data?.map((row, index) => (
                            <tr
                                key={row.type_slno ?? index}
                                style={{
                                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                                }}
                            >
                                {columnsPrice?.map((col) => (
                                    <td
                                        key={col.key}
                                        style={{
                                            padding: 8,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            textAlign: col.align || "left",
                                        }}
                                    >
                                        {col.key === "is_active"
                                            ? row.is_active
                                                ? "Yes"
                                                : "No"
                                            : row[col.key] ?? "-"}
                                    </td>
                                ))}
                                <td
                                    style={{
                                        padding: 8,
                                        textAlign: "center",
                                    }}>
                                    <span
                                        style={{
                                            color: "#1976d2",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                        }}
                                        onClick={() => onEdit?.(row, index)}
                                    >
                                        <EditIcon sx={{ fontSize: 16 }} />
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </Box>
    );
};

export default memo(DietMealPriceTable);