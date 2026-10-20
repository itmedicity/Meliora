import React from "react";
import { Box } from "@mui/joy";
import CollectionAssignmentView from "./CollectionAssignmentView";

const CollectionAssignmentWrapper = ({
    bills = [],
    setSelectedBill,
    setOpenModal,
    onSelectionChange,
    activeTab
}) => {
    const billList = Array.isArray(bills)
        ? bills
        : Array.isArray(bills?.data)
            ? bills.data
            : Array.isArray(bills?.data?.data)
                ? bills.data.data
                : [];



    if (billList.length === 0) {
        return (
            <Box
                sx={{
                    p: 1.5,
                    borderRadius: 6,
                    bgcolor: "#fff3f3",
                    border: "1px dashed #ffb3b3",
                    fontSize: 13,
                }}
            >
                No bills found for collection assignment
            </Box>
        );
    }

    return (
        <CollectionAssignmentView
            bills={billList}
            setSelectedBill={setSelectedBill}
            setOpenModal={setOpenModal}
            onSelectionChange={onSelectionChange}
            activeTab={activeTab}
        />
    );
};

export default CollectionAssignmentWrapper;