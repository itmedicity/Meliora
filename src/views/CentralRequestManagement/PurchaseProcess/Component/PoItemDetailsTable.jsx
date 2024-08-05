import { Paper } from '@mui/material'
import React, { Fragment, memo, useState } from 'react'
import { Box } from '@mui/joy';
import { AgGridReact } from 'ag-grid-react';

const PoItemDetailsTable = ({ itemTableData, onSelectionChanged, columnTypes, getRowStyle }) => {
    const rowHeight = 27
    const headerHeight = 27
    const defaultColDef = {
    }
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit()
    }
    const [column] = useState([
        { headerName: "Sl.No.", field: "slno", autoHeight: true, wrapText: true, width: 80 },
        // { headerName: "Item Code", field: "item_code", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, width: 300, filter: "true" },
        { headerName: "Qnty", field: "item_qty", autoHeight: true, wrapText: true, width: 150 },
        { headerName: "Rate", field: "item_rate", autoHeight: true, wrapText: true, width: 150 },
        { headerName: "Tax", field: "tax", autoHeight: true, wrapText: true, width: 150 },
        { headerName: "Tax Amount", field: "tax_amount", autoHeight: true, wrapText: true, width: 150 },
        { headerName: "MRP", field: "item_mrp", autoHeight: true, wrapText: true, width: 150, },
    ])
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
                        columnDefs={column}
                        rowData={itemTableData}
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

export default memo(PoItemDetailsTable)