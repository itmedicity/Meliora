
import React, { memo, useMemo, useState } from "react";
import {
    Modal,
    ModalDialog,
    Box,
    Divider,
    Textarea,
} from "@mui/joy";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

import DietButton from "../DietComponent/DietButton";
import DietTextComponent from "../DietComponent/DietTextComponent";
import DietInputLabel from "src/views/Master/DietMasters/DietComponent/DietInputLabel";
import { useAllEmployeeFetch } from "../CommonData/UseQuery";
import { axioslogin } from "src/views/Axios/Axios";
import {
    confirmNotify,
    succesNotify,
    warningNotify,
} from "src/views/Common/CommonCode";
import PizzaLoader from "../CanteenOrderConfirmation/Components/PizzaLoader";
import { createAssignmentPayload } from "../CashCollection/CashCollectionResuse/reusablefun";

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(value) || 0);


const CollectionAssignmentConfirmModal = ({
    open,
    onClose,
    assignee,
    selectedBills = [],
    setLoading,
    loading
}) => {
    const [remark, setRemark] = useState("");


    const loginData = useSelector(
        (state) => state.LoginUserData
    );

    const queryClient = useQueryClient();

    const { data: AllEmployee = [] } = useAllEmployeeFetch();

    const assignedTo =
        typeof assignee === "object" && assignee !== null
            ? assignee.em_id
            : assignee;

    const AssignedEmployee = useMemo(
        () =>
            AllEmployee?.find(
                (emp) => Number(emp.em_id) === Number(assignedTo)
            ),
        [AllEmployee, assignedTo]
    );

    const totalAmount = useMemo(
        () =>
            selectedBills?.reduce(
                (total, bill) =>
                    total + (Number(bill.balance_amount) || 0),
                0
            ),
        [selectedBills]
    );


    // This function is Used to handle the Assignement of bills to the  Corresponding  Colletores
    

    const handleFinalConfirm = async () => {

        if (loading) return;

        if (!assignedTo || !loginData?.empid) {
            return warningNotify("Please select an employee.");
        }

        if (!selectedBills.length) {
            return warningNotify("Please select at least one bill.");
        }

        const invalidBill = selectedBills.some(
            (bill) => !Number.isInteger(Number(bill.billing_id)) ||
                Number(bill.billing_id) <= 0
        );

        if (invalidBill) {
            return warningNotify("One or more selected bills are invalid.");
        }
        const isConfirmed = await confirmNotify(
            `By Continuing You are Assigning the Bills to ${AssignedEmployee?.em_name}`
        );
        if (!isConfirmed) return; //  STOP if cancel

        try {
            setLoading(true);

            const payload = createAssignmentPayload({
                selectedBills,
                assignee,
                assignedBy: loginData.empid,
                remarks: remark,
            });

            // Replace this URL with your actual backend assignment endpoint.
            const response = await axioslogin.post(
                "/cashclosing/assign-bill",
                payload
            );

            const { success, message } = response.data;

            if (success !== 1) {
                return warningNotify(
                    message || "Failed to assign bills."
                );
            }

            succesNotify(message || "Bills assigned successfully.");

            await queryClient.invalidateQueries({
                queryKey: ["bill-details"],
            });

            onClose(true);
        } catch (error) {
            console.error("Collection assignment failed:", error);

            warningNotify(
                error?.response?.data?.message ||
                "Something went wrong while assigning bills."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={() => !loading && onClose()}>
            <ModalDialog
                sx={{
                    width: { xs: "94%", sm: 600 },
                    maxWidth: "94vw",
                    maxHeight: "90vh",
                    overflow: "auto",
                    borderRadius: "lg",
                    p: 2,
                }}
            >
                {loading && <PizzaLoader />}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <AssignmentIndOutlinedIcon
                        sx={{ color: "#6b3fa0", fontSize: 27 }}
                    />

                    <Box>
                        <DietTextComponent
                            value="Confirm Bill Assignment"
                            weight={700}
                            size={17}
                        />
                        <DietTextComponent
                            value={`${selectedBills.length} bills selected for assignment`}
                            size={12}
                            color="#777"
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* EMPLOYEE DETAILS */}
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: "md",
                        bgcolor: "background.level1",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <DietInputLabel name="Assigned To" />
                        <DietTextComponent
                            value={
                                AssignedEmployee?.em_name ||
                                (typeof assignee === "object"
                                    ? assignee?.em_name
                                    : null) ||
                                "Loading employee..."
                            }
                            size={13}
                            weight={600}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <DietInputLabel name="Assigned By" />
                        <DietTextComponent
                            value={loginData?.empname || "Unknown"}
                            size={13}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <DietInputLabel name="Employee ID" />
                        <DietTextComponent
                            value={String(assignedTo ?? "-")}
                            size={13}
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* SELECTED BILLS */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <DietTextComponent
                        value="Selected Bills"
                        weight={600}
                        size={14}
                    />

                    <DietTextComponent
                        value={`${selectedBills.length} bills`}
                        color="#6b3fa0"
                        size={12}
                    />
                </Box>

                <Box
                    sx={{
                        maxHeight: 280,
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    {selectedBills.map((bill, index) => (
                        <Box
                            key={bill.billing_id}
                            sx={{
                                p: 1.25,
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: "md",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <DietTextComponent
                                    value={`${index + 1}. ${bill.patient_name || "Unknown Patient"}`}
                                    weight={600}
                                    size={13}
                                />

                                <DietTextComponent
                                    value={`Bill: ${bill.bill_no || bill.billing_id}`}
                                    size={12}
                                    color="#666"
                                />

                                <DietTextComponent
                                    value={`IP No: ${bill.ip_number || bill.admission_id || "-"}`}
                                    size={12}
                                    color="#666"
                                />

                                <DietTextComponent
                                    value={`Status: ${bill.billing_status || "-"}`}
                                    size={11}
                                    color="#777"
                                />
                            </Box>

                            <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                                <DietTextComponent
                                    value={formatCurrency(bill.total_amount)}
                                    weight={600}
                                    size={13}
                                />

                                <DietTextComponent
                                    value={`Balance: ${formatCurrency(bill.balance_amount)}`}
                                    size={11}
                                    color="#777"
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* TOTAL */}
                <Box
                    sx={{
                        mt: 1.5,
                        p: 1.5,
                        borderRadius: "md",
                        bgcolor: "background.level1",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <DietTextComponent
                        value="Total Outstanding"
                        weight={600}
                        size={13}
                    />

                    <DietTextComponent
                        value={formatCurrency(totalAmount)}
                        weight={700}
                        size={17}
                        color="#6b3fa0"
                    />
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* REMARKS */}
                <Box sx={{ mb: 1 }}>
                    <DietInputLabel name="Assignment Remarks (Optional)" />

                    <Textarea
                        minRows={2}
                        maxRows={4}
                        placeholder="Enter assignment remarks..."
                        value={remark}
                        onChange={(event) => setRemark(event.target.value)}
                        disabled={loading}
                        sx={{ mt: 0.75, fontSize: 13 }}
                    />
                </Box>

                {/* ACTIONS */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                        mt: 1,
                    }}
                >
                    <DietButton
                        name="Cancel"
                        icon={HighlightOffRoundedIcon}
                        onClick={() => onClose()}
                        disabled={loading}
                    />

                    <DietButton
                        name={loading ? "Assigning..." : "Confirm Assignment"}
                        width={190}
                        icon={AddTaskRoundedIcon}
                        onClick={handleFinalConfirm}
                        disabled={loading || !selectedBills.length || !assignedTo}
                    />
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default memo(CollectionAssignmentConfirmModal);
