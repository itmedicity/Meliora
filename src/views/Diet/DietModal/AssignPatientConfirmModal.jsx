import React, { useState } from "react";
import {
    Modal,
    ModalDialog,
    Box,
    Divider
} from "@mui/joy";
import DietButton from "../DietComponent/DietButton";
import DietTextComponent from "../DietComponent/DietTextComponent";
import { FILTER_ACTIONS } from "../DietReducer/action/kotPreparationFilter.actions";
import { useAllEmployeeFetch } from "../CommonData/UseQuery";
import DietInputLabel from "src/views/Master/DietMasters/DietComponent/DietInputLabel";
import { succesNotify, warningNotify } from "src/views/Common/CommonCode";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { axioslogin } from "src/views/Axios/Axios";
import PizzaLoader from "../CanteenOrderConfirmation/Components/PizzaLoader";
import { useQueryClient } from "@tanstack/react-query";


const AssignPatientConfirmModal = ({
    open,
    onClose,
    assignee,
    patients,
    dispatch,
}) => {

    const [remark, setRemark] = useState("");
    const [remarkError, setRemarkError] = useState(false);
    const [priorityMap, setPriorityMap] = useState({});
    const [loading, SetLoading] = useState(false);
    const queryClient = useQueryClient()
    const data = useSelector(state => {
        return state.LoginUserData
    })


    const { data: AllEmployee = [] } = useAllEmployeeFetch() // Fetching All Employee with status 1
    const [expandedId, setExpandedId] = useState(null);
    /**
     * 
     * Not Optimize Will be Handle Later 
     * toIsoStirng need to be Convert wiht date-fns later!!!!!!!!!!!! 
     * 
     * Use try Catch Later When Writteing Proper Fun
     * 
     */



    const handleFinalConfirm = async () => {
        try {
            SetLoading(true)
            // ASSIGNEE VALIDATION
            if (!assignee) {
                return warningNotify(
                    "Please Select Employee Before Confirming"
                );
            }
            // PATIENT VALIDATION
            if (!patients || patients?.length === 0) {
                return warningNotify(
                    "No Orders Selected For Assignment"
                );
            }
            // REMARK VALIDATION
            if (!remark.trim()) {
                setRemarkError(true);
                return warningNotify(
                    "Delivery Remark Required"
                );
            }
            // ORDER VALIDATION
            const invalidOrders = patients?.filter(
                (pt) => !pt.canteen_order_id
            );
            if (invalidOrders.length > 0) {
                return warningNotify(
                    "Some Orders Missing Order ID"
                );
            }
            // FINAL PAYLOAD
            const payload = {
                assigned_to: assignee,
                assigned_by: data.empid,
                delivery_status: 'ASSIGNED',
                remarks: remark.trim(),
                orders: patients?.map((pt) => ({
                    canteen_order_id: pt.canteen_order_id,
                    type_slno: pt.type_slno,
                    delivery_priority:
                        priorityMap[pt.canteen_order_id] || "NORMAL",
                    remarks: remark.trim()
                }))
            };
         

            const response = await axioslogin.post(
                '/dietdelivery/create',
                payload
            );
            const { success, message } = response.data;
            if (success !== 1) {
                return warningNotify(
                    message || "Failed To Assign Orders"
                );
            }
            succesNotify(message || "Assigned Success Fully")
            // SUCCESS
            dispatch({
                type: FILTER_ACTIONS.CLEAR_SELECTED_PATIENTS
            });

            setPriorityMap({});
            setRemark("");
            setRemarkError(false);
            queryClient.invalidateQueries(['canteenorderstatus'])
            queryClient.invalidateQueries(['assignedorder'])
            onClose();

        } catch (error) {
            console.log(error);
            warningNotify(
                error?.response?.data?.message ||
                "Something Went Wrong"
            );
        } finally {
            SetLoading(false)
        }
    };

    /**
     * Currently using because of the Static Data 
     * Once Everything fine we can Just Left join
     * From the Employyee Table
     */

    const AssignedEmployee = AllEmployee && AllEmployee?.find((emp) => Number(emp.em_id) === Number(assignee));

    /**
     * 
     * Function to Remvove Patinet Form the Selected Patient 
     * Funciton Focus of Removing the Patient Maped to the Assignee
     */
    const handleRemovePatient = (patientData) => {
        const remainingCount = patients?.length - 1;
        dispatch({
            type: FILTER_ACTIONS.REMOVE_SELECTED_PATIENT,
            payload: patientData
        });
        // If last patient removed → close modal
        if (remainingCount <= 0) {
            onClose();
        }
        // Optional: reset expanded if same item
        if (expandedId === patientData.canteen_order_id) {
            setExpandedId(null);
        }
    };



    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{ width: 600 }}>

                <Box>
                    <DietTextComponent
                        value="Assign Patient Confirmation"
                        weight={600}
                        size={16}
                    />
                </Box>

                {
                    loading && <PizzaLoader />
                }

                <Divider sx={{ my: 1 }} />

                {/* ASSIGNEE SECTION */}
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietInputLabel name={"Assignee To"} />
                        <DietTextComponent
                            value={AssignedEmployee?.em_name || "Not Selected"}
                            size={13}
                        />
                    </Box >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietInputLabel name={"Assignee By"} />
                        <DietTextComponent
                            value={data?.empname}
                            size={13}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietInputLabel name={"Designation"} />
                        <DietTextComponent
                            value={data?.designation}
                            size={13}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietInputLabel name={"Department"} />
                        <DietTextComponent
                            value={data?.empdeptname}
                            size={13}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietInputLabel name={"Department section"} />
                        <DietTextComponent
                            value={data?.empdeptsec}
                            size={13}
                        />
                    </Box>

                </Box>

                <Divider sx={{ my: 1 }} />

                {/* PATIENT LIST */}

                <Box
                    sx={{
                        maxHeight: 300,
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >
                    {patients?.map((pt, index) => {

                        const isOpen = expandedId === pt.canteen_order_id;
                        return (
                            <Box
                                key={pt.canteen_order_id}
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 1,
                                    p: 1,
                                    transition: "all 0.3s ease",
                                    backgroundColor: isOpen ? "#f5f5f5" : "#fff"
                                }}
                            >
                                {/* Header Row */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        setExpandedId(isOpen ? null : pt.canteen_order_id)
                                    }
                                >
                                    <DietTextComponent
                                        value={`${index + 1}. ${pt.fb_ptc_name}`}
                                        weight={600}
                                        size={13}
                                    />

                                    {/* Remove Icon */}
                                    <CloseIcon
                                        fontSize="small"
                                        sx={{
                                            cursor: "pointer",
                                            color: "#d32f2f"
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent expand toggle
                                            handleRemovePatient({
                                                canteen_order_id: pt.canteen_order_id,
                                                batch_id: pt.batch_id,
                                                fb_ip_no: pt.fb_ip_no
                                            });
                                        }}
                                    />
                                </Box>

                                {/* Expandable Section */}
                                <Box
                                    sx={{
                                        overflow: "hidden",
                                        transition: "all 0.3s ease",
                                        maxHeight: isOpen ? 200 : 0,
                                        opacity: isOpen ? 1 : 0
                                    }}
                                >
                                    <DietTextComponent
                                        value={`IP No: ${pt.fb_pt_no}`}
                                        size={12}
                                    />

                                    <DietTextComponent
                                        value={`Ns Station: ${pt.nursing_station}`}
                                        size={12}
                                    />

                                    <DietTextComponent
                                        value={`Meal: ${pt.meal_type}`}
                                        size={12}
                                    />


                                    <DietTextComponent
                                        value={`Order ID: ${pt.canteen_order_id}`}
                                        size={11}
                                    />

                                    <Box sx={{ mt: 1 }}>
                                        <DietInputLabel name={"Priority"} />

                                        <select
                                            value={priorityMap[pt.canteen_order_id] || "NORMAL"}
                                            onChange={(e) => {
                                                setPriorityMap((prev) => ({
                                                    ...prev,
                                                    [pt.canteen_order_id]: e.target.value
                                                }));
                                            }}

                                            style={{
                                                width: "100%",
                                                marginTop: 5,
                                                padding: 6,
                                                borderRadius: 5,
                                                border: "1px solid #cfcfcf",
                                                outline: "none",
                                                fontSize: 12
                                            }}
                                        >
                                            <option value="NORMAL">
                                                NORMAL
                                            </option>

                                            <option value="URGENT">
                                                URGENT
                                            </option>

                                            <option value="STAT">
                                                STAT
                                            </option>
                                        </select>
                                    </Box>
                                </Box>

                            </Box>

                        );
                    })}
                </Box>

                <Divider sx={{ my: 2 }} />


                {/* REMARK SECTION */}
                <Box>
                    <DietInputLabel name={"Delivery Remark"} />

                    <textarea
                        style={{
                            width: "100%",
                            height: 80,
                            marginTop: 8,
                            padding: 8,
                            resize: "none",
                            borderRadius: 6,
                            outline: "none",
                            border: remarkError
                                ? "1px solid red"
                                : "1px solid #cfcfcf",
                            fontFamily: "inherit",
                            fontSize: 13
                        }}

                        value={remark}

                        placeholder="Enter delivery remark..."

                        onChange={(e) => {

                            const value = e.target.value.toUpperCase();

                            setRemark(value);

                            if (value.trim()) {
                                setRemarkError(false);
                            }
                        }}
                    />
                </Box>

                {/* ACTION BUTTONS */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1
                    }}
                >
                    <DietButton
                        icon={HighlightOffIcon}
                        name="Cancel"
                        onClick={onClose}
                    />

                    <DietButton
                        width={150}
                        icon={AddReactionIcon}
                        name="Confirm Assign"
                        onClick={handleFinalConfirm}
                    />
                </Box>

            </ModalDialog>
        </Modal>
    );
};

export default AssignPatientConfirmModal;
