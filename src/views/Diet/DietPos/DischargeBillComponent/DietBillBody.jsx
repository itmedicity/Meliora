import React, { memo } from "react";
import DietBillSummary from "./DietBillSummary";
import DietBillItemsTable from "./DietBillItemsTable";
import DietBillDetail from "./DietBillDetail";
import DietBillDateWiseSummary from "./DietBillDateWiseSummary";




const DietBillBody = ({
    printType,
    dietBills,
    extraBills,
    bystanderBills,
}) => {


    switch (printType) {

        case "SUMMARY":
            return (
                <DietBillSummary
                    dietBills={dietBills}
                    extraBills={extraBills}
                    bystanderBills={bystanderBills}
                />
            );


        case "ITEMWISE":
            return (
                <DietBillItemsTable
                    dietBills={dietBills}
                    extraBills={extraBills}
                    bystanderBills={bystanderBills}
                />
            );
        case "DATEWISE":
            return (
                <DietBillDateWiseSummary
                    dietBills={dietBills}
                    extraBills={extraBills}
                    bystanderBills={bystanderBills}
                />
            );


        case "DETAIL":
        default:
            return (
                <DietBillDetail
                    dietBills={dietBills}
                    extraBills={extraBills}
                    bystanderBills={bystanderBills}
                />
            );
    }

};


export default memo(DietBillBody);