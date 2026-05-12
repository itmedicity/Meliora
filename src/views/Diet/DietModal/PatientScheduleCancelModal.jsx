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
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DietTextComponent from "../DietComponent/DietTextComponent";
import DietButton from "../DietComponent/DietButton";
import { axioslogin } from "src/views/Axios/Axios";
import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
import { useSelector } from "react-redux";

const PatientScheduleCancelModal = ({
    open,
    onClose,
    patient,
    fetchscheduled,
    fetchactive
}) => {

    const [reason, setReason] = useState("");
    const [error, setError] = useState(false);

    const id = useSelector(state => state.LoginUserData.empid);

    if (!patient) return null;

    const handleCancelSchedule = async () => {

        if (!reason.trim()) {
            setError(true);
            return;
        }

        const payload = {
            patient_diet_id: patient.patient_diet_id,
            cancel_reason: reason,
            cancelled_by: id,
            status: "CANCELLED",
            updated_by: id
        };

        try {
            const response = await axioslogin.post(
                "/dietschedule/schedule/cancel",
                payload
            );

            const { success, message } = response.data ?? {};

            if (success === 0) return warningNotify(message);

            succesNotify(message);
            fetchscheduled();
            fetchactive();

        } catch (error) {
            console.error(error);
            errorNotify("Error in cancelling schedule");
        }

        setReason("");
        setError(false);
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
                        value="Cancel Patient Schedule"
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
                                value={patient.patient_name}
                                size={15}
                                weight={600}
                            />
                        </Box>

                        <DietTextComponent
                            value={`IP: ${patient.fb_ip_no}`}
                            size={13}
                            color="#555"
                        />
                    </Box>

                    <Box sx={{ textAlign: "right" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
                            <RestaurantOutlinedIcon sx={{ fontSize: 14 }} />
                            <DietTextComponent
                                value={patient.diet_name}
                                size={12}
                                color="#666"
                            />
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
                            <AccessTimeIcon sx={{ fontSize: 14 }} />
                            <DietTextComponent
                                value={patient.type_desc}
                                size={12}
                                color="#666"
                            />
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Reason */}
                <Box>
                    <DietTextComponent
                        value="Cancellation Reason"
                        size={14}
                        weight={600}
                    />
                </Box>

                <textarea
                    style={{
                        width: "100%",
                        height: 80,
                        marginTop: 8,
                        padding: 8,
                        resize: "none",
                        borderRadius: 4,
                        outline: "none",
                        ...(error && { border: "1px solid red" })
                    }}
                    value={reason}
                    placeholder="Enter reason..."
                    onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        setReason(value);
                        if (e.target.value.trim()) setError(false);
                    }}
                />

                {error && (
                    <DietTextComponent
                        value="Please enter reason"
                        size={12}
                        color="red"
                    />
                )}

                <Divider sx={{ my: 2 }} />

                {/* Buttons */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <DietButton
                        name="Close"
                        width={80}
                        onClick={onClose}
                    />

                    <DietButton
                        name="Confirm Cancel"
                        width={140}
                        icon={CheckCircleIcon}
                        onClick={handleCancelSchedule}
                    />
                </Box>

            </ModalDialog>
        </Modal>
    );
};

export default memo(PatientScheduleCancelModal);