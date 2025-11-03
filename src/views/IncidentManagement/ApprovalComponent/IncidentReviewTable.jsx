import React, { memo, useMemo } from "react";
import { Table, Sheet } from "@mui/joy";

import ActionChips from "./ActionChips";

// const getStatus = (value, hodApprove = null, qadApprove = null, isRCA = false) => {
//     if (!value || value.trim() === "") return "Pending";

//     if (isRCA) {
//         if (!hodApprove && !qadApprove) return "Pending Hod and Qad Approval";
//         if (!hodApprove) return "Pending Hod Approval";
//         if (!qadApprove) return "Pending Qad Approval";
//     }
//     return "Approved";
// };

// const StatusChip = ({ status }) => {
//     const colorMap = {
//         Pending: "danger",
//         "Pending Hod Approval": "warning",
//         "Pending Qad Approval": "warning",
//         "Pending Hod and Qad Approval": "danger",
//         Approved: "success",
//     };
//     return <Chip color={colorMap[status] || "neutral"} variant="soft">{status}</Chip>;
// };

const IncidentReviewTable = ({
    data,
    currentLevel,
    setCorrectiveEdit,
    setPreventiveEdit,
    setEvalutaionEdit,
    setReview,
    setEditItem,
    title,
    setRootCause,
    setEdit,
    involvedDepartment
}) => {


    const {
        inc_rca,
        inc_corrective_action,
        inc_preventive_action,
        inc_evaluation_status,
        // inc_rca_hod_approve,
        // inc_rca_qad_approve,
    } = data;

    // const rcaStatus = getStatus(inc_rca, inc_rca_hod_approve, inc_rca_qad_approve, true);
    // const correctiveStatus = getStatus(inc_corrective_action);
    // const preventiveStatus = getStatus(inc_preventive_action);
    // const evaluationstatus = getStatus(inc_evaluation_status);


    const isAcknowledged = useMemo(() => {
        // If array is empty, return true
        if (!involvedDepartment || involvedDepartment?.length === 0) return true;

        // If any department has status = 1, return true
        return involvedDepartment?.some(item => item?.inc_dep_status === 1);
    }, [involvedDepartment]);

    console.log(isAcknowledged, "isAcknowledged");



    return (
        <Sheet variant="outlined" sx={{ borderRadius: "sm", p: 2 }}>
            <Table
                variant="plain"
                borderAxis="xBetween"
                size="md"
                sx={{
                    "& th": { fontWeight: "bold", textAlign: "left" },
                    "& td": { verticalAlign: "top" },
                    tableLayout: "fixed",
                    width: "100%",
                }}>
                <colgroup>
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "65%" }} />
                    <col style={{ width: "20%" }} />
                    {/* <col style={{ width: "15%" }} /> */}
                </colgroup>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                        {/* <th>Status</th> */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>RCA</b></td>
                        <td>{inc_rca || "—"}</td>
                        {/* <td><StatusChip status={rcaStatus} /></td> */}
                        <td><ActionChips category="RCA" currentLevel={currentLevel} setReview={setRootCause} data={data} setEdit={setEdit} setEditItem={setEditItem} title={title} preventEdit={isAcknowledged} /></td>
                    </tr>
                    <tr>
                        <td><b>{`Corrective Action (${data?.incharge_name || '-'})`}</b></td>
                        <td>{inc_corrective_action || "—"}</td>
                        {/* <td><StatusChip status={correctiveStatus} /></td> */}
                        <td><ActionChips category="Corrective" currentLevel={currentLevel} data={data} setEdit={setCorrectiveEdit} setEditItem={setEditItem} setReview={setReview} title={title} preventEdit={isAcknowledged} /></td>
                    </tr>
                    <tr>
                        <td><b>{`Preventive Action (${data?.hod_name || '-'})`}</b></td>
                        <td>{inc_preventive_action || "—"}</td>
                        {/* <td><StatusChip status={preventiveStatus} /></td> */}
                        <td><ActionChips category="Preventive" currentLevel={currentLevel} data={data} setEdit={setPreventiveEdit} setReview={setReview} setEditItem={setEditItem} title={title} preventEdit={isAcknowledged} /></td>
                    </tr>
                    <tr>
                        <td><b>{`Evaluation Action (${data?.qad_name || '-'})`}</b></td>
                        <td>{inc_evaluation_status || "—"}</td>
                        {/* <td><StatusChip status={evaluationstatus} /></td> */}
                        <td><ActionChips category="Evaluation" currentLevel={currentLevel} data={data} setEdit={setEvalutaionEdit} setReview={setReview} setEditItem={setEditItem} title={title} preventEdit={isAcknowledged} /></td>
                    </tr>
                </tbody>
            </Table>
        </Sheet>
    );
};

export default memo(IncidentReviewTable);
