import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Chip } from "@mui/joy";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';



const DashBoardAgeGrid = ({ type, keyword }) => {


    console.log(keyword, "keyword");


    const columnDefs = useMemo(
        () => [
            {
                headerName: "Incident ID",
                field: "id",
                // pinned: "left",
                flex: 1,
            },
            {
                headerName: "Incident Title",
                field: "name",
                flex: 1,
            },
            {
                headerName: "Department",
                field: "department",
                flex: 1,
            },
            {
                headerName: "Status",
                field: "status",
                // flex: 1,
                width: 200,
                cellRenderer: (params) => {
                    const statusColors = {
                        Open: "danger",
                        "In Progress": "warning",
                        Closed: "success",
                    };

                    return (
                        <Chip
                            variant="soft"
                            color={statusColors[params.value] || "neutral"}
                            size="sm"
                        >
                            {params.value}
                        </Chip>
                    );
                },
            },
            {
                headerName: "ETA",
                field: "eta",
                flex: 1,
                cellRenderer: (params) => (
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', cursor: 'pointer' }}>
                        <AlarmOnIcon style={{ color: '#9da0a2ff', fontSize: 15 }} />
                        {params.value}
                    </div>
                ),
            },
            {
                headerName: "Last Updates",
                field: "lastUpdate",
                flex: 1,

            },
            {
                headerName: "Attachments",
                field: "attachments",
                flex: 1,
                cellRenderer: (params) => (
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', cursor: 'pointer' }}>
                        <AttachFileIcon style={{ color: '#3a84b8ff', transform: 'rotate(30deg)', fontSize: 15 }} />
                        {params.value} Files
                    </div>
                ),
            }
        ],
        []
    );

    const rowData = [
        {
            id: 1542134,
            name: "Email Server Down",
            status: "Open",
            department: "Information Technology",
            eta: "3h",
            attachments: 1,
            lastUpdate: "12 Jul 2024",
        },
        {
            id: 1542135,
            name: "VPN Connectivity Issue",
            status: "In Progress",
            department: "Network",
            eta: "2h",
            attachments: 2,
            lastUpdate: "11 Jul 2024",
        },
        {
            id: 1542136,
            name: "Software License Renewal",
            status: "Closed",
            department: "Procurement",
            eta: "-",
            attachments: 1,
            lastUpdate: "10 Jul 2024",
        },
        {
            id: 1542137,
            name: "Printer Not Responding",
            status: "Open",
            department: "Admin",
            eta: "1h",
            attachments: 0,
            lastUpdate: "12 Jul 2024",
        },
        {
            id: 1542138,
            name: "Unauthorized Access Alert",
            status: "In Progress",
            department: "Security",
            eta: "5h",
            attachments: 3,
            lastUpdate: "11 Jul 2024",
        },
        {
            id: 1542139,
            name: "Slow Internet in Floor 3",
            status: "Closed",
            department: "Network",
            eta: "-",
            attachments: 2,
            lastUpdate: "09 Jul 2024",
        },
        {
            id: 1542140,
            name: "Laptop Battery Issue",
            status: "Open",
            department: "Support",
            eta: "4h",
            attachments: 1,
            lastUpdate: "12 Jul 2024",
        },
        {
            id: 1542141,
            name: "Data Backup Failed",
            status: "In Progress",
            department: "DevOps",
            eta: "3h",
            attachments: 2,
            lastUpdate: "10 Jul 2024",
        },
        {
            id: 1542142,
            name: "Meeting Room Display Broken",
            status: "Closed",
            department: "Facilities",
            eta: "-",
            attachments: 1,
            lastUpdate: "09 Jul 2024",
        },
        {
            id: 1542143,
            name: "Outlook Not Syncing",
            status: "Open",
            department: "Information Technology",
            eta: "2h",
            attachments: 0,
            lastUpdate: "12 Jul 2024",
        },
        {
            id: 1542144,
            name: "Firewall Policy Update",
            status: "In Progress",
            department: "Security",
            eta: "6h",
            attachments: 1,
            lastUpdate: "11 Jul 2024",
        },
        {
            id: 1542145,
            name: "App Deployment Error",
            status: "Closed",
            department: "DevOps",
            eta: "-",
            attachments: 0,
            lastUpdate: "08 Jul 2024",
        },
        {
            id: 1542146,
            name: "Employee Onboarding Setup",
            status: "Open",
            department: "HR",
            eta: "8h",
            attachments: 2,
            lastUpdate: "12 Jul 2024",
        },
        {
            id: 1542147,
            name: "Power Fluctuation in Lab",
            status: "In Progress",
            department: "Facilities",
            eta: "1h",
            attachments: 1,
            lastUpdate: "11 Jul 2024",
        },
        {
            id: 1542148,
            name: "Antivirus Expiry Warning",
            status: "Closed",
            department: "Security",
            eta: "-",
            attachments: 2,
            lastUpdate: "09 Jul 2024",
        },
    ];

    const defaultColDef = useMemo(() => ({
        flex: 1,
        cellStyle: { fontFamily: 'var(--roboto-font)', fontSize: 14, fontWeight: 400 },
        headerClass: "ag-center-header custom-header-style",
    }), []);

    const filteredData = useMemo(() => {
        let result = [...rowData];

        // Filter by type
        if (type !== "Incident") {
            if (type === "Open") result = result?.filter(d => d.status === "Open");
            else if (type === "Closed") result = result?.filter(d => d.status === "Closed");
            else if (type === "RCA") result = result?.filter(d => d.status === "In Progress");
            else result = result.filter(d => d?.status === type);
        }

        // Filter by keyword
        if (keyword?.trim()) {
            const search = keyword.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(search) ||
                item.department.toLowerCase().includes(search) ||
                item.status.toLowerCase().includes(search) ||
                String(item.id).includes(search)
            );
        }

        return result;
    }, [type, keyword, rowData]);




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

export default DashBoardAgeGrid;
