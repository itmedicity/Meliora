import React from "react";
import { Box } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";

const DietFoodTable = ({
    columns = [],
    data = [],
    expandedRowId = null,
    onEdit,
    renderExpandedRow,
    minWidth = 600
}) => {
    if (!columns.length) return null;

    return (
        <Box
            sx={{
                width: "100%",
                overflowX: "auto",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 6,
                mb: 2
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth
                }}
            >
                {/* HEADER */}
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th
                                key={col.key}
                                style={{
                                    padding: 8,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    textAlign: "left",
                                    background: "#f5f5f5",
                                    borderBottom: "1px solid rgba(0,0,0,0.15)"
                                }}
                            >
                                {col.label}
                            </th>
                        ))}

                        {/* EDIT HEADER */}
                        {onEdit && (
                            <th
                                style={{
                                    padding: 8,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    background: "#f5f5f5",
                                    borderBottom: "1px solid rgba(0,0,0,0.15)",
                                    textAlign: "center"
                                }}
                            >
                                Edit
                            </th>
                        )}
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (onEdit ? 1 : 0)}
                                style={{
                                    padding: 12,
                                    textAlign: "center",
                                    fontSize: 12,
                                    color: "#888"
                                }}
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <React.Fragment key={row.id || index}>
                                {/* MAIN ROW */}
                                <tr
                                    style={{
                                        borderBottom: "1px solid rgba(0,0,0,0.08)"
                                    }}
                                >
                                    {columns.map(col => (
                                        <td
                                            key={col.key}
                                            style={{
                                                padding: 8,
                                                fontSize: 12,
                                                fontWeight: 500
                                            }}
                                        >
                                            {row[col.key] ?? "-"}
                                        </td>
                                    ))}

                                    {/* EDIT CELL */}
                                    {onEdit && (
                                        <td
                                            style={{
                                                padding: 8,
                                                textAlign: "center",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => onEdit(row, index)}
                                        >
                                            <EditIcon sx={{ fontSize: 16, color: "#1976d2" }} />
                                        </td>
                                    )}
                                </tr>

                                {/* EXPANDED ROW */}
                                {expandedRowId === row.id && renderExpandedRow && (
                                    <tr>
                                        <td
                                            colSpan={columns.length + (onEdit ? 1 : 0)}
                                            style={{
                                                padding: 8,
                                                fontSize: 12,
                                                fontWeight: 500,
                                                background: "#fafafa"
                                            }}
                                        >
                                            {renderExpandedRow(row)}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </Box>
    );
};

export default DietFoodTable;
