
import React, { memo, useState, useEffect, useMemo, useCallback } from "react";

import Box from "@mui/material/Box";

import UnassignedBillsTable from "./UnassignedBillsTable";
import AssignedBillsTable from "./AssignedBillsTable";

const getBillId = (row) => row.billing_id ?? row.bill_no;

const getAssignmentStatus = (row) =>
    String(row.assignment_status || "").toUpperCase();

const isBillAssigned = (row) =>
    row.assignment_id != null &&
    Number(row.is_current) === 1 &&
    getAssignmentStatus(row) !== "CANCELLED";

const CollectionAssignmentTable = ({
    data = [],
    onView,
    onAssign,
    onSelectionChange,
    activeTab
}) => {
    const bills = Array.isArray(data) ? data : [];

    const [selectedIds, setSelectedIds] = useState([]);

    const assignedBills = useMemo(
        () => bills.filter(isBillAssigned),
        [bills]
    );

    const unassignedBills = useMemo(
        () => bills.filter((row) => !isBillAssigned(row)),
        [bills]
    );

    const selectableBills = useMemo(
        () =>
            unassignedBills.filter((row) => {
                const balance =
                    row.balance_amount != null
                        ? Number(row.balance_amount)
                        : Math.max(
                            0,
                            (Number(row.total_amount) || 0) -
                            (Number(row.paid_amount) || 0)
                        );

                return (
                    String(row.billing_status || "OPEN").toUpperCase() !==
                    "CANCELLED" &&
                    balance > 0
                );
            }),
        [unassignedBills]
    );

    const selectableIds = useMemo(
        () => selectableBills.map(getBillId),
        [selectableBills]
    );

    useEffect(() => {
        const validIds = new Set(
            selectableIds
        );

        setSelectedIds((previous) =>
            previous.filter((id) => validIds.has(id))
        );
    }, [selectableIds]);

    const selectedBills = useMemo(
        () =>
            selectableBills.filter((row) =>
                selectedIds.includes(getBillId(row))
            ),
        [selectableBills, selectedIds]
    );

    useEffect(() => {
        onSelectionChange?.(selectedBills);
    }, [selectedBills, onSelectionChange]);

    const allSelected =
        selectableIds.length > 0 &&
        selectableIds.every((id) => selectedIds.includes(id));

    const someSelected =
        selectableIds.some((id) => selectedIds.includes(id)) &&
        !allSelected;

    const handleSelectAll = useCallback(
        (event) => {
            if (event.target.checked) {
                setSelectedIds((previous) =>
                    [...new Set([...previous, ...selectableIds])]
                );
            } else {
                setSelectedIds((previous) =>
                    previous.filter((id) => !selectableIds.includes(id))
                );
            }
        },
        [selectableIds]
    );

    const handleSelectRow = useCallback((row, checked) => {
        if (isBillAssigned(row)) return;

        const id = getBillId(row);

        setSelectedIds((previous) =>
            checked
                ? [...new Set([...previous, id])]
                : previous.filter((selectedId) => selectedId !== id)
        );
    }, []);

    return (
        <Box sx={{ width: "100%" }}>
            {
                activeTab === '1' ?
                    <UnassignedBillsTable
                        data={unassignedBills}
                        selectedIds={selectedIds}
                        selectableIds={selectableIds}
                        allSelected={allSelected}
                        someSelected={someSelected}
                        onSelectAll={handleSelectAll}
                        onSelectRow={handleSelectRow}
                        onView={onView}
                        onAssign={onAssign}
                    />
                    :
                    <AssignedBillsTable
                        data={assignedBills}
                        onView={onView}
                    />
            }
        </Box>
    );
};

export default memo(CollectionAssignmentTable);
