
import React, { memo, useCallback, useState } from "react";
import { Box } from "@mui/joy";

import DietTextComponent from "../DietComponent/DietTextComponent";
import CollectionAssignmentWrapper from "./CollectionAssignmentWrapper";
import ChooseAllEmployee from "src/views/CommonSelectCode/ChooseAllEmployee";
import { useKotFilter } from "../DietReducer/contextprovider/KotFilterContext";
import PizzaLoader from "../CanteenOrderConfirmation/Components/PizzaLoader";
import CollectionAssignmentPreviewModal from "./CollectionAssignmentPreviewModal";
import { FILTER_ACTIONS } from "../DietReducer/action/kotPreparationFilter.actions";
import DietButton from "../DietComponent/DietButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { warningNotify } from "src/views/Common/CommonCode";
import CollectionAssignmentConfirmModal from "../DietModal/CollectionAssignmentConfirmModal";

const CollectionMain = ({ bills = [], activeTab }) => {

    const [loading, setLoading] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [selectedBills, setSelectedBills] = useState([]);
    const [openModal, setOpenModal] = useState("");

    const { state, dispatch } = useKotFilter();
    const { assignee } = state;

    // Handle Assignment Details
    const handleAssignmentDetails = useCallback(() => {
        if (!selectedBills.length) {
            return warningNotify("Please select bills to assign.");
        }

        if (!assignee) {
            return warningNotify("Please select an employee.");
        }

        setSelectedBill(selectedBills);
        setOpenModal("assign");
    }, [selectedBills, assignee]);

    const handleCloseModal = useCallback(() => {
        setOpenModal("");
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "65vh",
                maxHeight: "75vh",
                mt: 1,
                bgcolor: "#f6f6f6d9",
                position: "relative",
                overflow: "hidden",
                borderRadius: "md",
            }}
        >
            {loading && <PizzaLoader />}

            <Box
                sx={{
                    height: "100%",
                    px: 2,
                    pl: "26px",
                    transition: "padding-left 0.3s ease",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {/* HEADER */}
                <Box
                    sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 22,
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "#f6f6f6d9",
                    }}
                >
                    <Box>
                        <DietTextComponent
                            size={22}
                            value="BILL MANAGEMENT"
                        />

                        <DietTextComponent
                            size={13}
                            value={`${selectedBills.length} bills selected`}
                            color="#5a2d82"
                        />
                    </Box>

                    {activeTab === "1" && (
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ChooseAllEmployee
                                value={assignee}
                                setValue={(value) =>
                                    dispatch({
                                        type: FILTER_ACTIONS.SET_ASSIGNEE,
                                        payload: value,
                                    })
                                }
                            />

                            <DietButton
                                name="Assign Patients"
                                width={180}
                                icon={CheckCircleIcon}
                                onClick={handleAssignmentDetails}
                                disabled={!selectedBills.length}
                            />
                        </Box>
                    )}
                </Box>

                <CollectionAssignmentWrapper
                    bills={bills}
                    setSelectedBill={setSelectedBill}
                    setOpenModal={setOpenModal}
                    onSelectionChange={setSelectedBills}
                    activeTab={activeTab}
                />

                <CollectionAssignmentPreviewModal
                    open={openModal === "view"}
                    onClose={handleCloseModal}
                    selectedBill={selectedBill}
                />

                <CollectionAssignmentConfirmModal
                    open={openModal === "assign"}
                    onClose={() => setOpenModal("")}
                    assignee={assignee}
                    selectedBills={selectedBills || []}
                    setLoading={setLoading}
                    loading={loading}
                />
            </Box>
        </Box>
    );
};

export default memo(CollectionMain);
