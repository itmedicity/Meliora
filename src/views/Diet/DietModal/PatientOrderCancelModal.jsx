import React, { memo, useState } from "react";
import {
    Modal,
    ModalDialog,
    ModalClose,
    Box,
    Divider
} from "@mui/joy";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DietTextComponent from "../DietComponent/DietTextComponent";
import DietButton from "../DietComponent/DietButton";
import { axioslogin } from "src/views/Axios/Axios";
import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
import { useSelector } from "react-redux";

const PatientOrderCancelModal = ({
    open,
    onClose,
    patient,
}) => {
    const [reason, setReason] = useState("");
    const [error, setError] = useState(false);

    const id = useSelector(state => {
        return state.LoginUserData.empid
    });

    if (!patient) return null;




    const HandlePatientMealcancellation = async () => {
        if (!reason.trim()) {
            setError(true);
            return;
        }
        const Payload = {
            patient_name: patient.ptc_ptname,
            type_name: patient.meal,
            batch_id: patient.batch_id,
            plan_id: patient.plan_id,
            cancel_reason: reason,
            cancelled_by: id
        }

        try {
            const response = await axioslogin.post('/fooddietorder/patient-batch-cancel', Payload);
            const { success, message } = response.data ?? {};
            if (success === 0) return warningNotify(message);
            succesNotify(message)
        }
        catch (error) {
            console.error('Error Inserting item:', error);
            errorNotify(`Error in Cancelling ${patient.meal} !`)
            // Optional: show toast or alert to user
        }

        setError(false);

        setReason("");
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                size="sm"
                sx={{
                    width: 480,
                    borderRadius: "md",
                    p: 2
                }}
            >
                <ModalClose />

                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CancelOutlinedIcon color="error" fontSize="small" />
                    <DietTextComponent
                        value="Cancel Patient Order"
                        size={18}
                        weight={600}
                    />
                </Box>

                {/* Patient Info */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1.5
                    }}
                >
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <PersonOutlineIcon sx={{ fontSize: 16 }} />
                            <DietTextComponent
                                value={patient?.fb_ptc_name}
                                size={15}
                                weight={600}
                            />
                        </Box>

                        <DietTextComponent
                            value={`IP: ${patient?.fb_ip_no}`}
                            size={13}
                            weight={400}
                            color="#555"
                        />
                    </Box>

                    <Box sx={{ textAlign: "right" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
                            <RestaurantOutlinedIcon sx={{ fontSize: 14 }} />
                            <DietTextComponent
                                value={patient?.meal_type}
                                size={12}
                                weight={400}
                                color="#666"
                            />
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
                            <ReceiptLongOutlinedIcon sx={{ fontSize: 14 }} />
                            <DietTextComponent
                                value={patient?.canteen_order_id}
                                size={12}
                                weight={400}
                                color="#666"
                            />
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Cancel Reason */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <DietTextComponent
                        value="Cancellation Reason"
                        size={14}
                        weight={600}
                    />
                    <span style={{ color: "#d32f2f", fontWeight: 600 }}>*</span>
                </Box>

                <textarea
                    className="qty-input"
                    style={{
                        width: "100%",
                        height: 80,
                        marginTop: 8,
                        padding: 8,
                        resize: "none",
                        ...(error && { border: "1px solid #d32f2f" }),
                        borderRadius: 4,
                        outline: "none"
                    }}
                    placeholder="Enter reason for cancellation..."
                    value={reason}
                    onChange={(e) => {
                        setReason(e.target.value);
                        if (e.target.value.trim()) {
                            setError(false);
                        }
                    }}
                />

                {/* Error Message */}
                {error && (
                    <Box sx={{ mt: 0.5 }}>
                        <DietTextComponent
                            value="Please enter the cancellation reason"
                            size={12}
                            weight={400}
                            color="#d32f2f"
                        />
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1
                    }}
                >
                    <DietButton
                        name="Close"
                        width={80}
                        onClick={onClose}
                    />

                    <DietButton
                        name="Confirm Cancel"
                        width={140}
                        icon={CheckCircleIcon}
                        onClick={HandlePatientMealcancellation}
                    />
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default memo(PatientOrderCancelModal);
