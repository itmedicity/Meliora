import React, { memo, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Paper,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const options = [
    {
        value: "SUMMARY",
        title: "Summary Bill",
        desc: "Overall bill with totals only",
        icon: <DescriptionIcon fontSize="large" />,
    },
    {
        value: "DATEWISE",
        title: "Date Wise Bill",
        desc: "Grouped by billing date",
        icon: <CalendarMonthIcon fontSize="large" />,
    },
    {
        value: "ITEMWISE",
        title: "Item Wise Bill",
        desc: "One row for each billed item",
        icon: <RestaurantMenuIcon fontSize="large" />,
    },
    {
        value: "DETAIL",
        title: "Detailed Bill",
        desc: "Complete discharge bill",
        icon: <ReceiptLongIcon fontSize="large" />,
    },
];

const BillPrintDialog = ({
    open,
    onClose,
    onPrint,
}) => {

    const [selected, setSelected] = useState("DETAIL");

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle
                sx={{
                    fontWeight: 700,
                }}
            >
                Print Bill
            </DialogTitle>

            <DialogContent>

                <Typography
                    sx={{
                        mb: 2,
                        color: "text.secondary",
                    }}
                >
                    Select the bill format to print
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                    }}
                >
                    {options.map(option => (

                        <Paper
                            key={option.value}
                            elevation={0}
                            onClick={() => setSelected(option.value)}
                            sx={{
                                cursor: "pointer",
                                p: 2,
                                borderRadius: 2,
                                border: "2px solid",
                                borderColor:
                                    selected === option.value
                                        ? "primary.main"
                                        : "divider",
                                bgcolor:
                                    selected === option.value
                                        ? "primary.50"
                                        : "#fff",
                                transition: ".25s",

                                "&:hover": {
                                    borderColor: "primary.main",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: 1,
                                    color: "primary.main",
                                }}
                            >
                                {option.icon}
                            </Box>

                            <Typography
                                align="center"
                                fontWeight={700}
                                fontSize={15}
                            >
                                {option.title}
                            </Typography>

                            <Typography
                                align="center"
                                fontSize={12}
                                color="text.secondary"
                                mt={0.5}
                            >
                                {option.desc}
                            </Typography>

                        </Paper>

                    ))}
                </Box>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={() => onPrint(selected)}
                >
                    Continue
                </Button>

            </DialogActions>

        </Dialog>
    );
};

export default memo(BillPrintDialog);