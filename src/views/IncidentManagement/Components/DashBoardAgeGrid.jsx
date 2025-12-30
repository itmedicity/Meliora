import React, { memo, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Chip } from "@mui/joy";
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { getStatusInfo } from "../CommonComponent/CommonCode";


const DashBoardAgeGrid = ({ type, keyword, CurrrentComapny, DashboardIncidents }) => {



    const CompanyNumber = CurrrentComapny?.length > 0 ? CurrrentComapny[0]?.company_slno : null;

    //  CHOOSING THE CURRENT COMPANY DETAILS
    const CompanyName = useMemo(() => {
        if (CompanyNumber == null) return ''; // or loading text
        return Number(CompanyNumber) === 1
            ? 'INCI/TMCH/'
            : 'INCI/KMCH/';
    }, [CompanyNumber]);


    const columnDefs = useMemo(
        () => [
            {
                headerName: "ID",
                field: "inc_register_slno",
                flex: 1,
                cellRenderer: (params) => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                            {`${CompanyName}${params.value}`}
                        </div>
                    );
                }
            },
            {
                headerName: "Incident Against",
                field: "inc_initiator_name",
                flex: 1,
                valueFormatter: params => (params.value ? String(params.value).toUpperCase() : "")
            },
            {
                headerName: "Department Section",
                field: "sec_name",
                flex: 1,
            },
            {
                headerName: "Status",
                field: "status",
                width: 200,
                cellRenderer: (params) => {

                    const IncidentStatus = params.data?.inc_all_approved === 1 ? "All Approved" : params.data?.inc_current_level_review_state === 'A' ? 'Processing' :
                        params.data?.inc_current_level_review_state === 'R' ? 'Rejected' : 'Pending';

                    const statusColors = params.data?.inc_all_approved === 1 ? "success" : params.data?.inc_current_level_review_state === 'A' ? 'primary' :
                        params.data?.inc_current_level_review_state === 'R' ? 'danger' : 'neutral';

                    return (
                        <Chip
                            variant="soft"
                            color={statusColors || "neutral"}
                            size="sm"
                            sx={{ fontSize: 13, fontWeight: 600 }}
                        >
                            {IncidentStatus}
                        </Chip>
                    );
                },
            },
            {
                headerName: "Descritpion",
                field: "inc_describtion",
                flex: 1,

            },
            {
                headerName: "Corrective ",
                field: "inc_reg_corrective",
                flex: 1,

            },
            {
                headerName: "Attachments",
                field: "file_status",
                flex: 1,
                cellRenderer: (params) => (
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', cursor: 'pointer' }}>
                        <AttachFileIcon style={{ color: '#3a84b8ff', transform: 'rotate(30deg)', fontSize: 15 }} />
                        {params.value === 1 ? "Files" : "No Attachments"}
                    </div>
                ),
            }
        ],
        [CompanyName]
    );


    const defaultColDef = useMemo(() => ({
        flex: 1,
        cellStyle: { fontFamily: 'var(--roboto-font)', fontSize: 14, fontWeight: 400 },
        headerClass: "ag-center-header custom-header-style",
    }), []);

    const filteredData = useMemo(() => {
        if (!DashboardIncidents) return [];

        let result = [...DashboardIncidents];
        // Filter by type
        if (type !== "All") {
            if (type === "New") result = result?.filter(d => d.inc_current_level === 0 && d.inc_current_level_review_state === null);
            else if (type === "Open") result = result?.filter(d => d.inc_current_level != 0 && d.inc_current_level_review_state != null && d.inc_all_approved === 0);
            else if (type === "Rejected") result = result?.filter(d => d.inc_current_level != 0 && d.inc_current_level_review_state === 'R' && d.inc_all_approved === 0);
            else if (type === "Closed") result = result?.filter(d => d.inc_all_approved === 1);
            else result;
        }

        // Filter by keyword
        if (keyword?.trim()) {
            const search = keyword.toLowerCase();
            result = result.filter(item =>
                // item.name.toLowerCase().includes(search) ||
                item.sec_name.toLowerCase().includes(search) ||
                // item.status.toLowerCase().includes(search) ||
                String(item.inc_register_slno).includes(search)
            );
        }

        return result;
    }, [type, keyword, DashboardIncidents]);


    return (
        <div
            className="ag-theme-alpine"
            style={{
                height: '100%',
                width: "100%",
                borderRadius: 10
            }}
        >
            <AgGridReact
                rowData={filteredData || []}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default memo(DashBoardAgeGrid);
