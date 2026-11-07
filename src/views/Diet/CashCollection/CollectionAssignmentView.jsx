
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Box } from "@mui/joy";

import DietTextComponent from "../DietComponent/DietTextComponent";
import CollectionAssignmentTable from "./CollectionAssignmentTable";

const CollectionAssignmentView = ({
    bills = [],
    setOpenModal,
    setSelectedBill,
    onSelectionChange,
    activeTab
}) => {
    return (
        <Box sx={{ mt: 1, height: '70vh', overflow: 'hidden' }}>

            <DietTextComponent
                size={15}
                value={`Bills (${bills.length})`}
                color="#5a2d82"
            />

            <AnimatePresence>
                <CollectionAssignmentTable
                    data={bills}
                    activeTab={activeTab}
                    onSelectionChange={onSelectionChange}
                    onView={(row) => {
                        setSelectedBill(row);
                        setOpenModal("view");
                    }}
                    onAssign={(row) => {
                        setSelectedBill(row);
                        setOpenModal("assign");
                    }}
                />
            </AnimatePresence>
        </Box>
    );
};

export default CollectionAssignmentView;
