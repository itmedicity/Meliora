
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
import CanteenContextDrawer from "../CanteenOrderConfirmation/CanteenContextDrawer";
import MenuIcon from '@mui/icons-material/Menu'

const DRAWER_WIDTH = 280

const CollectionMain = ({
    bills = [],
    activeTab,
    selectedStations,
    setSelectedStations
}) => {

    const [loading, setLoading] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [selectedBills, setSelectedBills] = useState([]);
    const [openModal, setOpenModal] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(true);

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

            {!open && (
                <MenuIcon
                    onClick={() => setOpen(true)}
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 20,
                        fontSize: 18,
                        cursor: "pointer",
                    }}
                />
            )}

            <Box
                onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
                sx={{
                    height: "100%",
                    px: 2,
                    pl: open ? `${DRAWER_WIDTH + 20}px` : "26px",
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
                        bgcolor: isScrolled ? "#fffffff2" : "#f6f6f6d9",
                        boxShadow: isScrolled ? "md" : "",
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

                <CanteenContextDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    width={DRAWER_WIDTH}
                    selectedStations={selectedStations}
                    setSelectedStations={setSelectedStations}
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
