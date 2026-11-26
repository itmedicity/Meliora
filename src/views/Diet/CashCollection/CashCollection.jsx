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
    const [selectedStations, setSelectedStations] = useState([])
    const { data: BillDetails = [] } = useBillDetails();

    const filteredBills = useMemo(() => {
        const searchValue = normalize(search);

        return BillDetails?.filter((bill) => {

            const assigned =
                bill.assignment_id != null &&
                String(bill.assignment_status ?? "").toUpperCase() !== "CANCELLED";

            // Tab filtering
            if (activeTab === "1" && assigned) {
                return false;
            }

            if (activeTab === "2" && !assigned) {
                return false;
            }

            // Nursing station filtering
            if (
                selectedStations.length > 0 &&
                !selectedStations.includes(bill.fb_ns_code)
            ) {
                return false;
            }

            // Search filtering
            const matchesSearch =
                !searchValue ||
                [
                    bill.patient_name,
                    bill.patient_id,
                    bill.ip_number,
                    bill.admission_id,
                    bill.bill_no,
                    bill.assigned_employee_name,
                ].some((value) => normalize(value).includes(searchValue));

            if (!matchesSearch) return false;

            // Status filtering
            if (!activeStatus) return true;

            if (activeTab === "1") {
                return getAssignmentStatus(bill) === activeStatus;
            }

            return getCollectionStatus(bill) === activeStatus;

        });
    }, [
        BillDetails,
        search,
        activeTab,
        activeStatus,
        selectedStations
    ]);

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
                selectedStations={selectedStations}
                setSelectedStations={setSelectedStations}
            />
        </Box>
    );
};

export default memo(CashCollection);