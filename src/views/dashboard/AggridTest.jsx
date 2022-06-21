
import { AgGridReact } from 'ag-grid-react';
import React, { Fragment, useState } from 'react'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useCallback } from 'react';
import { IconButton } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const DesignationReportTable = ({ tableData }) => {
    //Table
    const [columnDefs] = useState([
        { headerName: "emp_no", field: 'em_no', checkboxSelection: true, rowDrag: true },
        { headerName: "Name", field: 'em_name' },
        { headerName: "Mobile", field: 'em_mobile' },
        { headerName: "Gender ", field: 'Gender' },
        { headerName: "Age", field: 'em_age_year' },
        { headerName: "Blood group", field: 'group_name' },
        { headerName: "Marital status", field: 'marital_status' },
        { headerName: "Religion", field: 'relg_name' },
        { headerName: "Category", field: 'ecat_name' },
        { headerName: "Branch", field: 'branch_name' },
        { headerName: "Section", field: 'sect_name' },
        { headerName: "Designation", field: 'desg_name' },
        { headerName: "Date of joining", field: 'em_doj' },
        { headerName: "Tech/Nontech", field: 'inst_emp_type' }
    ]);
    const rowHeight = 25;
    const headerHeight = 25;
    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true
    };

    let gridApi;
    const onGridReady = (params) => {
        gridApi = params.api
    }

    const onExportClick = useCallback(() => {
        gridApi.exportDataAsCsv();
    }, []);

    return (
        <Fragment>
            <IconButton aria-label="fingerprint" color='primary' onClick={onExportClick}>
                <CloudDownloadIcon />
            </IconButton>
            <div className='ag-theme-alpine ListItemScrol' style={{ height: 700, width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={tableData}
                    defaultColDef={defaultColDef}
                    rowHeight={rowHeight}
                    headerHeight={headerHeight}
                    rowDragManaged={true}
                    animateRows={true}
                    onGridReady={onGridReady}
                >
                </AgGridReact>
            </div>
        </Fragment>
    )
}

export default DesignationReportTable