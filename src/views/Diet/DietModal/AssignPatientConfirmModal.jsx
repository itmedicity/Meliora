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
import { warningNotify } from "src/views/Common/CommonCode";
import CloseIcon from "@mui/icons-material/Close";


const AssignPatientConfirmModal = ({
    open,
    onClose,
    assignee,
    patients,
    dispatch
}) => {



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
    const handleFinalConfirm = () => {
        //Error Handling
        if (!assignee) return warningNotify("Please Select Employye Before Confirmig")
        if (!patients || patients?.length === 0) return warningNotify("Patient Nots Selected")


        const newAssignment = {
            assignedAt: new Date().toISOString(),
            assignee,
            patients
        };

        // Get existing data
        const existing = JSON.parse(
            localStorage.getItem("assignedPatients") || "[]"
        );

        // Push new assignment
        const updated = [...existing, newAssignment];

        // Save back
        localStorage.setItem(
            "assignedPatients",
            JSON.stringify(updated)
        );

        console.log("Saved to localStorage:", updated);
        dispatch({ type: FILTER_ACTIONS.CLEAR_SELECTED_PATIENTS });
        onClose();
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
    const handleRemovePatient = (orderId) => {
        const remainingCount = patients?.length - 1;
        dispatch({
            type: FILTER_ACTIONS.REMOVE_SELECTED_PATIENT,
            payload: orderId
        });
        // If last patient removed → close modal
        if (remainingCount <= 0) {
            onClose();
        }
        // Optional: reset expanded if same item
        if (expandedId === orderId) {
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

                <Divider sx={{ my: 1 }} />

                {/* ASSIGNEE SECTION */}
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietInputLabel name={"Assignee"} />
                        <DietTextComponent
                            value={AssignedEmployee?.em_name || "Not Selected"}
                            size={13}
                        />
                    </Box >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietInputLabel name={"Departments"} />
                        <DietTextComponent
                            value={"Korma Dep"}
                            size={13}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <DietInputLabel name={"Designation"} />
                        <DietTextComponent
                            value={"Service Boy"}
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

                        const isOpen = expandedId === pt.order_id;

                        return (
                            <Box
                                key={pt.order_id}
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
                                        setExpandedId(isOpen ? null : pt.order_id)
                                    }
                                >
                                    <DietTextComponent
                                        value={`${index + 1}. ${pt.ptc_ptname}`}
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
                                            handleRemovePatient(pt.order_id);
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
                                        value={`IP No: ${pt.ip_no}`}
                                        size={12}
                                    />

                                    <DietTextComponent
                                        value={`Diet: ${pt.diet_name}`}
                                        size={12}
                                    />

                                    <DietTextComponent
                                        value={`Meal: ${pt.meal}`}
                                        size={12}
                                    />

                                    <DietTextComponent
                                        value={`Order ID: ${pt.order_id}`}
                                        size={11}
                                    />
                                </Box>
                            </Box>

                        );
                    })}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* ACTION BUTTONS */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1
                    }}
                >
                    <DietButton
                        name="Cancel"
                        onClick={onClose}
                    />

                    <DietButton
                        name="Confirm Assign"
                        onClick={handleFinalConfirm}
                    />
                </Box>

            </ModalDialog>
        </Modal>
    );
};

export default AssignPatientConfirmModal;
