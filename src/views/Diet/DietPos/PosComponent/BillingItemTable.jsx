import React, { useMemo, useState } from "react";
import { Box, Chip } from "@mui/material";
import { format } from "date-fns";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Collapse, IconButton } from "@mui/material";

const Header = ({ children }) => (
    <DietTextComponent
        value={children}
        size={14}
        weight={700}
    />
);

const billingTypeConfig = {
    DIET_ORDER: {
        title: "Diet Package",
        color: "success",
    },
    EXTRA_ORDER: {
        title: "Patient Extra Food",
        color: "warning",
    },
    PATIENT_CANTEEN_ORDER: {
        title: "Bystander Food",
        color: "info",
    },
};

const BillingItemTable = ({ items = [] }) => {

    const groupedData = useMemo(() => {

        return items?.reduce((acc, item) => {
            const dateKey = format(new Date(item.created_at), "yyyy-MM-dd");
            if (!acc[dateKey]) {
                acc[dateKey] = {};
            }
            if (!acc[dateKey][item.billing_type]) {
                acc[dateKey][item.billing_type] = [];
            }
            acc[dateKey][item.billing_type].push(item);
            return acc;
        }, {});

    }, [items]);

    const [expanded, setExpanded] = useState({});

    const handleToggle = (key) => {
        setExpanded((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <Box
            // elevation={1}
            sx={{
                p: 1,
                borderRadius: 2,
            }}
        >
            <DietTextComponent
                value="TOTAL ITEM DETAILS"
                size={18}
                weight={800}
            />

            <Box sx={{ mt: 2 }}>

                {
                    Object.entries(groupedData).map(([date, billingTypes]) => (

                        <Box
                            key={date}
                            sx={{
                                mb: 1,
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 2,
                                overflow: "hidden",
                            }}
                        >

                            {/* Date Header */}

                            <Box
                                onClick={() => handleToggle(date)}
                                sx={{
                                    bgcolor: "#8259a8",
                                    color: "white",
                                    px: 2,
                                    py: 1.2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    "&:hover": {
                                        bgcolor: "#73479b",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <CalendarMonthIcon fontSize="small" />

                                    <DietTextComponent
                                        value={format(
                                            new Date(date),
                                            "dd MMM yyyy (EEEE)"
                                        )}
                                        weight={700}
                                        color="white"
                                    />
                                </Box>

                                <IconButton
                                    size="small"
                                    sx={{ color: "white" }}
                                >
                                    {expanded[date] ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </IconButton>
                            </Box>
                            <Collapse
                                in={expanded[date]}
                                timeout="auto"
                                unmountOnExit
                            >
                                {

                                    Object.entries(billingTypes)?.map(([type, rows]) => {
                                        const config = billingTypeConfig[type] || { title: type, color: "default" };
                                        return (

                                            <Box
                                                key={type}
                                                sx={{ p: 2 }}
                                            >

                                                {/* Billing Type */}
                                                <Chip
                                                    label={config.title}
                                                    color={config.color}
                                                    size="small"
                                                    sx={{
                                                        mb: 1,
                                                        fontWeight: 600,
                                                    }}
                                                />

                                                {/* Header */}

                                                <Box
                                                    sx={{
                                                        display: "grid",
                                                        gridTemplateColumns:
                                                            "1.2fr  2fr .7fr 1fr 1fr 1fr",
                                                        gap: 1,
                                                        px: 1,
                                                        py: 1,
                                                        bgcolor: "grey.100",
                                                        borderRadius: 1,
                                                    }}
                                                >
                                                    <Header>Meal</Header>
                                                    <Header>Item</Header>
                                                    <Header>Qty</Header>
                                                    <Header>Rate</Header>
                                                    <Header>GST</Header>
                                                    <Header>Amount</Header>
                                                </Box>

                                                {/* Rows */}

                                                {

                                                    rows?.map((item, index) => (

                                                        <Box
                                                            key={`${type}-${index}`}
                                                            sx={{
                                                                display: "grid",
                                                                gridTemplateColumns:
                                                                    "1.2fr  2fr .7fr 1fr 1fr 1fr",
                                                                gap: 1,
                                                                px: 1,
                                                                py: 0.5,
                                                                alignItems: "center",
                                                                borderBottom:
                                                                    index !== rows.length - 1
                                                                        ? "1px solid"
                                                                        : "none",
                                                                borderColor: "divider",
                                                            }}
                                                        >

                                                            <DietTextComponent
                                                                size={12}
                                                                value={item.meal_name}
                                                            />

                                                            <DietTextComponent
                                                                size={12}
                                                                value={
                                                                    item.item_name ||
                                                                    "Diet Package"
                                                                }
                                                                weight={600}
                                                            />


                                                            <DietTextComponent
                                                                size={12}
                                                                value={item.quantity}
                                                            />

                                                            <DietTextComponent
                                                                size={12}
                                                                value={`₹ ${Number(
                                                                    item.unit_rate
                                                                ).toFixed(2)}`}
                                                            />

                                                            <DietTextComponent
                                                                size={12}
                                                                value={`₹ ${Number(
                                                                    item.gst_amount
                                                                ).toFixed(2)}`}
                                                            />

                                                            <DietTextComponent
                                                                size={12}
                                                                value={`₹ ${Number(
                                                                    item.net_amount
                                                                ).toFixed(2)}`}
                                                                weight={700}
                                                            />

                                                        </Box>

                                                    ))

                                                }

                                                {/* Section Total */}

                                                <Box
                                                    sx={{
                                                        mt: 1,
                                                        pt: 1,
                                                        borderTop: "1px dashed",
                                                        borderColor: "divider",
                                                        display: "flex",
                                                        justifyContent: "flex-end",
                                                    }}
                                                >
                                                    <DietTextComponent
                                                        size={12}
                                                        value={`Section Total : ₹ ${rows
                                                            .reduce(
                                                                (sum, row) =>
                                                                    sum +
                                                                    Number(
                                                                        row.net_amount
                                                                    ),
                                                                0
                                                            )
                                                            .toFixed(2)}`}
                                                        weight={800}
                                                    />
                                                </Box>
                                            </Box>
                                        );
                                    })
                                }
                            </Collapse>
                        </Box>
                    ))
                }

            </Box>

        </Box >
    );
};

export default BillingItemTable;