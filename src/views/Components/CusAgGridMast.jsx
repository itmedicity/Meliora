import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, memo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

const CusAgGridMast = ({ columnDefs, tableData, onSelectionChanged, columnTypes }) => {

    const apiRef = useRef();
    /** useSelector is used for get aggrid download button state */


    const rowHeight = 30

    const headerHeight = 30
    const defaultColDef = {
        alwaysShowHorizontalScroll: true,
        sortable: true,
        filter: 'agTextColumnFilter',
        scrollbars: true,
        minWidth: 100,

    }
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit()
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
            <Paper elevation={0}
                sx={{
                    width: 1200
                }}
            >
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={{
                        height: 300,
                        width: 1200

                    }}
                >
                    <AgGridReact

                        ref={apiRef}
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
                        columnTypes={columnTypes}
                        onSelectionChanged={onSelectionChanged}
                        alwaysShowHorizontalScroll={true}
                    // debounceVerticalScrollbar={true}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(CusAgGridMast)




