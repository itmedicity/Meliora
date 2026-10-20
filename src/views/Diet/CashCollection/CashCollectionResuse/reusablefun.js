export const normalize = (value) => String(value ?? "").trim().toLowerCase();

const getBillingStatus = (bill) =>
    String(bill.billing_status ?? bill.BillStatus ?? bill.status ?? "")
        .trim()
        .toUpperCase();

const hasAssignment = (bill) =>
    bill.assignment_id != null &&
    String(bill.assignment_status ?? "").toUpperCase() !== "CANCELLED";

export const getAssignmentStatus = (bill) => {
    const billingStatus = getBillingStatus(bill);

    if (billingStatus === "CANCELLED") return "CANCELLED";

    if (hasAssignment(bill)) return "ASSIGNED";

    if (["OPEN", "PARTIAL"].includes(billingStatus)) return "PENDING";

    return "OTHER";
};

export const getCollectionStatus = (bill) => {
    const billingStatus = getBillingStatus(bill);

    if (billingStatus === "PAID") return "COLLECTED";
    if (billingStatus === "PARTIAL") return "PARTIAL";
    if (billingStatus === "OPEN") return "UNPAID";
    if (billingStatus === "CANCELLED") return "CANCELLED";

    return "OTHER";
};


export const createAssignmentPayload = ({
    selectedBills = [],
    assignee,
    assignedBy,
    remarks
}) => {
    return {
        assigned_to: Number(assignee),
        assigned_by: Number(assignedBy),
        remarks: remarks,
        bills: selectedBills.map((bill) => ({
            billing_id: Number(bill.billing_id),
        })),
    };
};