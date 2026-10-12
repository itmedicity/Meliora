import { Box } from '@mui/joy'
import React, { memo, useMemo, useState } from 'react'
import KotItemHeader from '../KotItemList/KotItemHeader'
import { useBillClosingDetails, useBillSummaryDetails, useCashCloseEmployee } from '../CommonData/UseQuery';
import CollectionTables from './CollectionTables';
import CollectionTab from './CollecitonComponent/CollectionTab';
import CollectionSummaryCard from './CollecitonComponent/CollectionSummaryCard';
import ClosingTab from './CollecitonComponent/ClosingTab';
import { createClosingByEmployeeMap, parseNumberArray } from '../CommonData/Common';



const CollectionClosing = () => {

    const [activeTab, setActiveTab] = useState("ALL");

    const [mainactiveTab, setMainActiveTab] = useState("OPEN");

    const [viewdetail, setViewDetails] = useState({});


    const { data: ClosedEmployeeDetail = [] } = useCashCloseEmployee();

    const [opendenomination, setOpenDenomination] = useState(false);

    const { data: BillClosingDetails = [] } = useBillClosingDetails(viewdetail?.employee_id);

    const { data: BillSummaryDetails = [] } = useBillSummaryDetails();

    const FilterData = activeTab !== "ALL" ? BillClosingDetails?.filter(item => item.billing_status === activeTab) : BillClosingDetails;

    const currentSelecteEmployeeSummary = BillSummaryDetails?.find((emp) => emp.employee_id === viewdetail?.employee_id);

    const isDetailChecked = viewdetail && typeof viewdetail === 'object' && Object.keys(viewdetail).length > 0;


    const closingByEmployee = createClosingByEmployeeMap(ClosedEmployeeDetail);

    const CombinedBillSummary = (BillSummaryDetails || []).map((employee) => {
        const employeeId = Number(employee?.employee_id);

        const allBillingIds = parseNumberArray(employee?.billing_ids);

        const openBillingIds = parseNumberArray(employee?.open_billing_ids, true);

        const employeeClosings = closingByEmployee.get(employeeId) || [];

        const closingDetails = {
            closing_ids: [],
            expected_amount: 0,
            cash_amount: 0,
            coin_amount: 0,
            counted_amount: 0,
            difference_amount: 0
        };

        let latestClosing = null;

        for (const closed of employeeClosings) {
            const closingId = Number(closed?.closing_id);

            if (closingId > 0) {
                closingDetails.closing_ids.push(closingId);
            }

            closingDetails.expected_amount += Number(
                closed?.expected_amount || 0
            );

            closingDetails.cash_amount += Number(
                closed?.cash_amount || 0
            );

            closingDetails.coin_amount += Number(
                closed?.coin_amount || 0
            );

            closingDetails.counted_amount += Number(
                closed?.counted_amount || 0
            );

            closingDetails.difference_amount += Number(
                closed?.difference_amount || 0
            );

            if (
                !latestClosing ||
                closingId > Number(latestClosing?.closing_id)
            ) {
                latestClosing = closed;
            }
        }

        const isFullyClosed =
            Number(employee?.open_bill_count || 0) === 0 &&
            allBillingIds.length > 0;

        const closingData =
            isFullyClosed && latestClosing
                ? {
                    closing_id: latestClosing.closing_id,
                    closing_date: latestClosing.closing_date,
                    closing_status: latestClosing.closing_status,
                    expected_amount: latestClosing.expected_amount,
                    cash_amount: latestClosing.cash_amount,
                    coin_amount: latestClosing.coin_amount,
                    counted_amount: latestClosing.counted_amount,
                    difference_amount: latestClosing.difference_amount,
                    created_by: latestClosing.created_by,
                    created_at: latestClosing.created_at
                }
                : {
                    closing_id: null,
                    closing_date: null,
                    closing_status: "OPEN",
                    expected_amount: 0,
                    cash_amount: 0,
                    coin_amount: 0,
                    counted_amount: 0,
                    difference_amount: 0,
                    created_by: null,
                    created_at: null
                };

        return {
            ...employee,

            billing_ids: JSON.stringify(allBillingIds),

            bill_count: openBillingIds.length || allBillingIds.length || 0,

            total_bill_amount: Number(employee?.total_bill_amount || 0),

            open_bill_count: Number(employee?.open_bill_count || 0),

            open_bill_amount: Number(employee?.open_bill_amount || 0),

            paid_amount: Number(employee?.paid_amount || 0),

            pending_amount: Number(employee?.pending_amount || 0),

            open_billing_ids: JSON.stringify(openBillingIds),

            cash_closed: isFullyClosed,

            closing_ids: closingDetails.closing_ids,

            closing_details: closingDetails,

            ...closingData
        };
    });

    const FilterBillSummary = useMemo(() => {
        return CombinedBillSummary?.filter(
            (item) => item?.closing_status === mainactiveTab
        );
    }, [CombinedBillSummary, mainactiveTab]);



    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <KotItemHeader name="DAILY USER BILL CLOSING" />
            {
                isDetailChecked &&
                <>
                    < CollectionSummaryCard
                        totalBills={currentSelecteEmployeeSummary?.bill_count}
                        billAmount={currentSelecteEmployeeSummary?.total_bill_amount}
                        collectedAmount={currentSelecteEmployeeSummary?.paid_amount}
                        pendingAmount={currentSelecteEmployeeSummary?.pending_amount}
                    />

                    <CollectionTab
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </>
            }

            {
                (!opendenomination && !isDetailChecked) &&
                <ClosingTab
                    activeTab={mainactiveTab}
                    setActiveTab={setMainActiveTab}
                />
            }
            <CollectionTables
                setViewDetails={setViewDetails}
                isDetailChecked={isDetailChecked}
                billdetails={FilterData}
                billSummary={FilterBillSummary}
                setOpenDenomination={setOpenDenomination}
                opendenomination={opendenomination}
            />
        </Box>
    )
}

export default memo(CollectionClosing)