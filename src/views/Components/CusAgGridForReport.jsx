import { Box } from '@mui/system'
import React, { useRef, memo, } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useSelector } from 'react-redux';

const CusAgGridForReport = ({ columnDefs, tableData, columnTypes, getRowStyle }) => {

    /** Ag grid report row and column formatting */
    const rowHeight = 25
    const headerHeight = 30
    const defaultColDef = {
        sortable: true,
        filter: 'agTextColumnFilter',
    }

    const rowStyle = {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
    const onGridReady = params => {
        params.columnApi.autoSizeAllColumns();
    };

    const gridRef = useRef();
    /** useSelector is used for get aggrid download button state */
    const exportState = useSelector((state) => {
        return state.changeStateAggrid.aggridstate
    })

    /** To download report as excel */
    if (exportState > 0 && tableData.length > 0) {
        gridRef.current.api.exportDataAsCsv();
    }

    return (
        <Box
            className="ag-theme-alpine ListItemScrol"
            sx={{
                height: { xs: 475, sm: 475, md: 565, lg: 582, xl: 582 },
                width: '100%',
            }}
        >
            <AgGridReact
                ref={gridRef}
                columnDefs={columnDefs}
                rowData={tableData}
                defaultColDef={defaultColDef}
                rowHeight={rowHeight}
                headerHeight={headerHeight}
                rowDragManaged={true}
                animateRows={true}
                onGridReady={onGridReady}
                rowSelection="multiple"
                rowStyle={rowStyle}
                suppressColumnVirtualisation={true}
                suppressRowVirtualisation={true}
                suppressRowClickSelection={true}
                groupSelectsChildren={true}
                rowGroupPanelShow={'always'}
                pivotPanelShow={'always'}
                enableRangeSelection={true}
                suppressExcelExport={true}
                columnTypes={columnTypes}
                getRowStyle={getRowStyle}

            ></AgGridReact>
        </Box>
    )
}

export default memo(CusAgGridForReport)