import React, { memo, useState } from "react";
import { Box, Chip, Table } from "@mui/joy";
import DietTextComponent from "src/views/Diet/DietComponent/DietTextComponent";
import { format, addDays } from "date-fns";
import { getStatusColor, getTypeStatus } from "src/views/Diet/CommonData/CommonFun";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const TemplateDetailsTable = ({ groupedData = {} }) => {

    console.log({
        groupedData
    });


    const [expanded, setExpanded] = useState({});

    const handleToggle = (day, type) => {
        setExpanded((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [type]: !prev?.[day]?.[type]
            }
        }));
    };

    // get today & tomorrow
    const getTodayAndTomorrow = () => {
        const today = new Date();
        const tomorrow = addDays(today, 1);

        return [
            format(today, "EEEE"),
            format(tomorrow, "EEEE")
        ];
    };

    const [today, tomorrow] = getTodayAndTomorrow();

    const filteredData = {
        [today]: groupedData?.[today],
        [tomorrow]: groupedData?.[tomorrow]
    };

    return (
        <Box sx={{ mt: 2 }}>
            <DietTextComponent size={14} weight={700} value="Template Details" />

            {/* Scroll Container */}
            <Box
                sx={{
                    maxHeight: 400,
                    overflow: "auto",

                    // hide scrollbar (all browsers)
                    scrollbarWidth: "none",          // Firefox
                    msOverflowStyle: "none",         // IE/Edge
                    "&::-webkit-scrollbar": {
                        display: "none"              // Chrome/Safari
                    },

                    borderRadius: "sm",
                    // border: "1px solid #ddd",
                    mt: 1
                }}
            >
                <Table size="sm" borderAxis="both" stickyHeader>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    background: "#fff",
                                    zIndex: 2
                                }}
                            >
                                Day
                            </th>
                            <th
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    background: "#fff",
                                    zIndex: 2
                                }}
                            >
                                Type
                            </th>
                            <th style={{
                                position: "sticky",
                                top: 0,
                                background: "#fff",
                                zIndex: 2
                            }}>Status</th>
                            <th
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    background: "#fff",
                                    zIndex: 2
                                }}
                            >
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* {Object.entries(filteredData)?.map(([day, types]) =>
                            types
                                ? Object.entries(types).map(([type, items], index) => {
                                    const isOpen = expanded?.[day]?.[type];

                                    return (
                                        <React.Fragment key={`${day}-${type}`}>
                                            <tr>
                                                <td>
                                                    {index === 0 && (
                                                        day === today ? (
                                                            <>
                                                                <span style={{ color: "#2e7d32", fontWeight: 800 }}>
                                                                    TODAY
                                                                </span>
                                                                {" "}
                                                                <span style={{ color: "#555", fontWeight: 800 }}>
                                                                    ({day?.toUpperCase()})
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span style={{ color: "#2e7d32", fontWeight: 800 }}>
                                                                    TOMMAROW
                                                                </span>
                                                                {" "}
                                                                <span style={{ color: "#555", fontWeight: 800 }}>
                                                                    ({day?.toUpperCase()})
                                                                </span>
                                                            </>
                                                        )
                                                    )}
                                                </td>

                                                <td>{type}</td>
                                                <td>
                                                    <Chip
                                                        size="sm"
                                                        variant="soft"
                                                        color={getStatusColor(getTypeStatus(items))}
                                                    >
                                                        {getTypeStatus(items)}
                                                    </Chip>
                                                </td>

                                                <td>
                                                    {isOpen ? (
                                                        <VisibilityOffIcon
                                                            onClick={() => handleToggle(day, type)}
                                                            style={{ cursor: "pointer", color: "#d32f2f", fontSize: 16 }}
                                                        />
                                                    ) : (
                                                        <RemoveRedEyeIcon
                                                            onClick={() => handleToggle(day, type)}
                                                            style={{ cursor: "pointer", color: "#1976d2", fontSize: 16 }}
                                                        />
                                                    )}
                                                </td>
                                            </tr>

                                            {isOpen && (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <Table
                                                            size="sm"
                                                            sx={{
                                                                background: "#f9f9f9"
                                                            }}
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th>Slno</th>
                                                                    <th>Item</th>
                                                                    <th>Group</th>
                                                                    <th>Category</th>
                                                                    <th>Quantity</th>
                                                                    <th>Food Status</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {items.map((item, index) => (
                                                                    <tr key={item.template_food_id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item.item_name}</td>
                                                                        <td>{item.group_name || "-"}</td>
                                                                        <td>{item.category_name}</td>
                                                                        <td>
                                                                            {item.quantity} {item.unit_code}
                                                                        </td>
                                                                        <td>{item.order_status ?? "Order Not Yet"}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </td>
                                                </tr>
                                            )}

                                        </React.Fragment>
                                    );
                                })
                                : null
                        )} */}
                        {Object.entries(filteredData)?.map(([day, types]) =>
                            types
                                ? Object.entries(types).map(([type, typeData], index) => {

                                    const isOpen = expanded?.[day]?.[type];

                                    return (
                                        <React.Fragment key={`${day}-${type}`}>

                                            <tr>
                                                <td>
                                                    {index === 0 && (
                                                        day === today ? (
                                                            <>
                                                                <span style={{ color: "#2e7d32", fontWeight: 800 }}>
                                                                    TODAY
                                                                </span>
                                                                {" "}
                                                                <span style={{ color: "#555", fontWeight: 800 }}>
                                                                    ({day?.toUpperCase()})
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span style={{ color: "#2e7d32", fontWeight: 800 }}>
                                                                    TOMORROW
                                                                </span>
                                                                {" "}
                                                                <span style={{ color: "#555", fontWeight: 800 }}>
                                                                    ({day?.toUpperCase()})
                                                                </span>
                                                            </>
                                                        )
                                                    )}
                                                </td>

                                                <td>{type}</td>

                                                <td>
                                                    <Chip
                                                        size="sm"
                                                        variant="soft"
                                                        color={getStatusColor(getTypeStatus(typeData))}
                                                    >
                                                        {getTypeStatus(typeData)}
                                                    </Chip>
                                                </td>

                                                <td>
                                                    {isOpen ? (
                                                        <VisibilityOffIcon
                                                            onClick={() => handleToggle(day, type)}
                                                            style={{
                                                                cursor: "pointer",
                                                                color: "#d32f2f",
                                                                fontSize: 16
                                                            }}
                                                        />
                                                    ) : (
                                                        <RemoveRedEyeIcon
                                                            onClick={() => handleToggle(day, type)}
                                                            style={{
                                                                cursor: "pointer",
                                                                color: "#1976d2",
                                                                fontSize: 16
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                            </tr>

                                            {isOpen && (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <Table
                                                            size="sm"
                                                            sx={{
                                                                background: "#f9f9f9"
                                                            }}
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th>Slno</th>
                                                                    <th>Item</th>
                                                                    <th>Group</th>
                                                                    <th>Category</th>
                                                                    <th>Quantity</th>
                                                                    <th>Food Status</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {typeData?.items?.map((item, index) => (
                                                                    <tr key={item.template_food_id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item.item_name}</td>
                                                                        <td>{item.group_name || "-"}</td>
                                                                        <td>{item.category_name}</td>
                                                                        <td>
                                                                            {item.quantity} {item.unit_code}
                                                                        </td>
                                                                        <td>
                                                                            {item.order_status ?? "Order Not Yet"}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </td>
                                                </tr>
                                            )}

                                        </React.Fragment>
                                    );
                                })
                                : null
                        )}
                    </tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default memo(TemplateDetailsTable);