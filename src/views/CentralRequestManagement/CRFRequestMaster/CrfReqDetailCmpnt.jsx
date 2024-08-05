import { Paper } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { Box } from '@mui/joy'
const CrfReqDetailCmpnt = ({ columnDefs, tableData, onSelectionChanged, columnTypes, getRowStyle }) => {

    const rowHeight = 27
    const headerHeight = 27
    const defaultColDef = {
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
            <Paper elevation={0} aria-hidden='true'>
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={{
                        height: 150,
                        width: "100%"
                    }}
                >
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={tableData}
                        defaultColDef={defaultColDef}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        rowDragManaged={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        onSelectionChanged={onSelectionChanged}
                        rowStyle={rowStyle}
                        columnTypes={columnTypes}
                        getRowStyle={getRowStyle}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(CrfReqDetailCmpnt)