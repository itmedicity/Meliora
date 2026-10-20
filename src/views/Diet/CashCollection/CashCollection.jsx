import React, { memo, useMemo, useState } from "react";
import { Box } from "@mui/material";

import KotItemHeader from "../KotItemList/KotItemHeader";
import CollectionAssignmentTabs from "./CollectionAssignmentTabs";
import CollectionMain from "./CollectionMain";
import CollectionAssignmentSearch from "./CollectionAssignmentSearch";
import { useBillDetails } from "../CommonData/UseQuery";
import { getAssignmentStatus, getCollectionStatus, normalize } from "./CashCollectionResuse/reusablefun";


const CashCollection = () => {
    const [activeTab, setActiveTab] = useState("1");
    const [activeStatus, setActiveStatus] = useState("PENDING");
    const [search, setSearch] = useState("");

    const { data: BillDetails = [] } = useBillDetails();

    const filteredBills = useMemo(() => {
        const searchValue = normalize(search);

        return BillDetails.filter((bill) => {
            const assigned =
                bill.assignment_id != null &&
                String(bill.assignment_status ?? "").toUpperCase() !== "CANCELLED";

            // Tab 1: BILL ASSIGNMENT - show unassigned bills only
            if (activeTab === "1" && assigned) {
                return false;
            }

            // Tab 2: COLLECTION STATUS - show assigned bills only
            if (activeTab === "2" && !assigned) {
                return false;
            }

            // Search by patient name, MRD number, IP number, or bill number
            const matchesSearch =
                !searchValue ||
                [
                    bill.patient_name,
                    bill.patient_id,
                    bill.ip_number,
                    bill.admission_id,
                    bill.bill_no,
                ].some((value) => normalize(value).includes(searchValue));

            if (!matchesSearch) return false;

            // Apply status filter for the selected tab
            if (!activeStatus) return true;

            if (activeTab === "1") {
                return getAssignmentStatus(bill) === activeStatus;
            }

            return getCollectionStatus(bill) === activeStatus;
        });
    }, [BillDetails, search, activeTab, activeStatus]);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <KotItemHeader name="COLLECTION ASSIGNMENT" />

            <CollectionAssignmentTabs
                FilteredBillDetail={BillDetails}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
            />

            <CollectionAssignmentSearch
                search={search}
                setSearch={setSearch}
            />

            <CollectionMain
                bills={filteredBills}
                activeTab={activeTab}
            />
        </Box>
    );
};

export default memo(CashCollection);