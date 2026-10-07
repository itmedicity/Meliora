
import React, { memo, useEffect, useState } from "react";
import {
    Modal,
    ModalDialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Input,
    Textarea,
    Button,
    Box,
    Typography,
    Chip,
    Divider
} from "@mui/joy";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { axioslogin } from "src/views/Axios/Axios";
// import { errorNotify, succesNotify } from "src/views/Common/CommonCode";
// import { useQueryClient } from "@tanstack/react-query";
// import { useSelector } from "react-redux";

const PettyCashAssignmentModal = ({
    open,
    onClose,
    rowdetail,
}) => {
    // const queryClient = useQueryClient();
    // const id = useSelector(state => {
    //     return state.LoginUserData.empid
    // })
    // const [loading, setLoading] = useState(false);

    const [amount, setAmount] = useState("");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        if (open && rowdetail) {
            setAmount(
                rowdetail?.petty_cash_amount
                    ? String(rowdetail.petty_cash_amount)
                    : ""
            );
            setRemarks(rowdetail.remarks || "");
        }
    }, [open, rowdetail]);

    if (!rowdetail) return null;

    const currentCash = Number(rowdetail.petty_cash_amount || 0);

    // const handleSubmit = async () => {

    //     const cashAmount = Number(amount);

    //     if (!cashAmount || cashAmount <= 0) {
    //         return;
    //     }

    //     const payload = {
    //         assignment_id: rowdetail.assignment_id,
    //         employee_id: rowdetail.employee_id,
    //         given_by: id,
    //         amount: cashAmount,
    //         remarks: remarks.trim()
    //     };

    //     try {
    //         setLoading(true);
    //         const response = await axioslogin.post('/cashclosing/assign-pettycash', payload);
    //         const { success, message } = response?.data ?? {};
    //         if (success !== 1) return errorNotify("error in Inserting Petty Cash Details");
    //         succesNotify(message);
    //         await queryClient.invalidateQueries({ queryKey: ['employee-petty-cash'] });
    //         onClose();

    //     } catch (error) {
    //         console.error("Petty cash assignment failed:", error);
    //         errorNotify("Error in Inserting petty Cash Details!")
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <ModalDialog
                variant="outlined"
                sx={{
                    width: 480,
                    maxWidth: "calc(100vw - 32px)",
                    p: 0,
                    overflow: "hidden",
                    borderRadius: "lg",
                    boxShadow: "lg"
                }}
            >

                {/* HEADER */}
                <Box
                    sx={{
                        px: 2.5,
                        py: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.surface"
                    }}
                >

                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#7c51a1",
                            color: "#fff"
                        }}
                    >
                        <PaymentsOutlinedIcon />
                    </Box>

                    <Box sx={{ flex: 1 }}>

                        <DialogTitle
                            sx={{
                                p: 0,
                                fontSize: "17px",
                                fontWeight: 700
                            }}
                        >
                            Petty Cash Allocation
                        </DialogTitle>

                        <Typography
                            level="body-xs"
                            sx={{
                                mt: 0.25,
                                color: "text.tertiary"
                            }}
                        >
                            Allocate petty cash for this delivery assignment
                        </Typography>

                    </Box>

                </Box>


                <DialogContent
                    sx={{
                        p: 2.5,
                        gap: 2
                    }}
                >

                    {/* EMPLOYEE CARD */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: "md",
                            backgroundColor: "background.level1",
                            border: "1px solid",
                            borderColor: "divider"
                        }}
                    >

                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#ede7f3",
                                color: "#7c51a1"
                            }}
                        >
                            <PersonOutlineIcon />
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>

                            <Typography
                                level="body-xs"
                                sx={{ color: "text.tertiary" }}
                            >
                                Delivery Employee
                            </Typography>

                            <Typography
                                level="title-md"
                                fontWeight="lg"
                                noWrap
                            >
                                {rowdetail?.employee_name}
                            </Typography>


                        </Box>

                        <Chip
                            size="sm"
                            variant="soft"
                            color={
                                rowdetail?.delivery_status === "COMPLETED"
                                    ? "success"
                                    : "primary"
                            }
                        >
                            {rowdetail.delivery_status}
                        </Chip>

                    </Box>


                    {/* ASSIGNMENT SUMMARY */}
                    <Box>

                        <Typography
                            level="body-sm"
                            fontWeight="lg"
                            sx={{ mb: 1 }}
                        >
                            Assignment Summary
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: 1
                            }}
                        >


                            {/* Orders */}
                            <Box
                                sx={{
                                    p: 1.25,
                                    borderRadius: "sm",
                                    border: "1px solid",
                                    borderColor: "divider"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.7,
                                        color: "text.tertiary"
                                    }}
                                >
                                    <ReceiptLongOutlinedIcon
                                        sx={{ fontSize: 16 }}
                                    />

                                    <Typography level="body-xs">
                                        Orders
                                    </Typography>
                                </Box>

                                <Typography
                                    level="title-sm"
                                    fontWeight="lg"
                                    sx={{ mt: 0.5 }}
                                >
                                    {rowdetail.total_orders ?? 0}
                                </Typography>
                            </Box>


                            {/* Current Cash */}
                            <Box
                                sx={{
                                    p: 1.25,
                                    borderRadius: "sm",
                                    border: "1px solid",
                                    borderColor: "divider"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.7,
                                        color: "text.tertiary"
                                    }}
                                >
                                    <PaymentsOutlinedIcon
                                        sx={{ fontSize: 16 }}
                                    />

                                    <Typography level="body-xs">
                                        Current Cash
                                    </Typography>
                                </Box>

                                <Typography
                                    level="title-sm"
                                    fontWeight="lg"
                                    sx={{ mt: 0.5 }}
                                >
                                    ₹ {currentCash.toFixed(2)}
                                </Typography>
                            </Box>

                        </Box>

                    </Box>


                    <Divider />


                    {/* CASH STATUS */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >

                        <Box>

                            <Typography
                                level="body-sm"
                                fontWeight="lg"
                            >
                                Petty Cash Status
                            </Typography>

                            <Typography
                                level="body-xs"
                                sx={{ color: "text.tertiary" }}
                            >
                                Current allocation status
                            </Typography>

                        </Box>

                        <Chip
                            size="md"
                            variant="soft"
                            color={
                                rowdetail.petty_cash_status === "GIVEN"
                                    ? "success"
                                    : "warning"
                            }
                            startDecorator={
                                rowdetail.petty_cash_status === "GIVEN"
                                    ? <CheckCircleOutlineIcon />
                                    : <PaymentsOutlinedIcon />
                            }
                        >
                            {rowdetail.petty_cash_status || "PENDING"}
                        </Chip>

                    </Box>


                    {/* AMOUNT */}
                    <Box>

                        <Typography
                            level="body-sm"
                            fontWeight="lg"
                            sx={{ mb: 0.75 }}
                        >
                            Petty Cash
                        </Typography>

                        <Input
                            autoFocus
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            startDecorator={
                                <Typography
                                    fontWeight="lg"
                                    sx={{ color: "#7c51a1" }}
                                >
                                    ₹
                                </Typography>
                            }
                            sx={{
                                "--Input-focusedThickness": "2px",
                                "--Input-focusedHighlight": "#7c51a1",
                                fontSize: "18px",
                                fontWeight: 600,
                                minHeight: 48
                            }}
                            slotProps={{
                                input: {
                                    min: 0,
                                    step: "0.01",
                                    inputMode: "decimal"
                                }
                            }}
                        />

                    </Box>


                    {/* REMARKS */}
                    <Box>

                        <Typography
                            level="body-sm"
                            fontWeight="lg"
                            sx={{ mb: 0.75 }}
                        >
                            Remarks
                            <Typography
                                component="span"
                                level="body-xs"
                                sx={{
                                    ml: 0.5,
                                    color: "text.tertiary"
                                }}
                            >
                                (Optional)
                            </Typography>
                        </Typography>

                        <Textarea
                            minRows={2}
                            maxRows={4}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Add a note if required..."
                        />

                    </Box>

                </DialogContent>


                {/* FOOTER */}
                <DialogActions
                    sx={{
                        px: 2.5,
                        py: 1.75,
                        borderTop: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.level1",
                        gap: 1
                    }}
                >

                    <Button
                        variant="outlined"
                        color="neutral"
                        onClick={onClose}
                        // disabled={loading}
                        sx={{
                            minWidth: 90
                        }}
                    >
                        Cancel
                    </Button>

                    {/* <Button
                        color="primary"
                        loading={loading}
                        disabled={
                            !amount ||
                            Number(amount) <= 0 || rowdetail.petty_cash_status === "SETTLED"
                        }
                        onClick={handleSubmit}
                        startDecorator={
                            !loading && <PaymentsOutlinedIcon />
                        }
                        sx={{
                            minWidth: 155,
                            backgroundColor: "#7c51a1",
                            "&:hover": {
                                backgroundColor: "#69438a"
                            }
                        }}
                    >
                        Assign Petty Cash
                    </Button> */}

                </DialogActions>

            </ModalDialog>
        </Modal>
    );
};

export default memo(PettyCashAssignmentModal);

