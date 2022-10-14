import React, { Fragment, memo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Box } from '@mui/system'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'

const CustomAGReportDispaly = ({ columnDefForTable, tableDataForTable }) => {

    const apiRef = useRef();
    /** useSelector is used for get aggrid download button state */
    const exportState = useSelector((state) => {
        return state.changeStateAggrid.aggridstate
    })

    /** To download report as excel */
    if (exportState > 0 && tableDataForTable.length > 0) {
        apiRef.current.api.exportDataAsCsv();
    }

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

    return (
        <Fragment>
            <Paper elevation={0}>
                <Box
                    className="ag-theme-material ListItemScrol"
                    sx={{
                        height: { xs: 540, sm: 540, md: 540, lg: 514, xl: 802 },
                        width: '100%',
                    }}
                >
                    <AgGridReact
                        ref={apiRef}
                        columnDefs={columnDefForTable}
                        rowData={tableDataForTable}
                        defaultColDef={defaultColDef}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        rowDragManaged={true}
                        animateRows={true}
                        rowSelection="multiple"
                        rowStyle={rowStyle}
                        suppressColumnVirtualisation={true}
                        suppressRowVirtualisation={true}
                        suppressRowClickSelection={true}
                        groupSelectsChildren={true}
                        rowGroupPanelShow={'always'}
                        pivotPanelShow={'always'}
                        enableRangeSelection={true}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(CustomAGReportDispaly)