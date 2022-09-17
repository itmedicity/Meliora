// import { Paper } from '@mui/material'
// import { Box } from '@mui/system'
// import React, { Fragment, memo } from 'react'
// import { AgGridReact } from 'ag-grid-react'
// import 'ag-grid-community/dist/styles/ag-grid.css'
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
// const CusAgGridMast = ({ columnDefs, tableData, onSelectionChanged, columnTypes }) => {
//     const rowHeight = 30
//     const headerHeight = 30
//     const defaultColDef = {
//     }
//     const onGridReady = (params) => {
//         params.api.sizeColumnsToFit()
//     }

//     const rowStyle = {
//         fontFamily: [
//             '-apple-system',
//             'BlinkMacSystemFont',
//             '"Segoe UI"',
//             'Roboto',
//             '"Helvetica Neue"',
//             'Arial',
//             'sans-serif',
//             '"Apple Color Emoji"',
//             '"Segoe UI Emoji"',
//             '"Segoe UI Symbol"',
//         ].join(','),
//     }

//     return (
//         <Fragment>
//             <Paper elevation={0}>
//                 <Box
//                     className="ag-theme-alpine ListItemScrol"
//                     sx={{
//                         height: 300
//                     }}
//                 >
//                     <AgGridReact
//                         columnDefs={columnDefs}
//                         rowData={tableData}
//                         defaultColDef={defaultColDef}
//                         rowHeight={rowHeight}
//                         headerHeight={headerHeight}
//                         rowDragManaged={true}
//                         animateRows={true}
//                         onGridReady={onGridReady}
//                         rowSelection="multiple"
//                         onSelectionChanged={onSelectionChanged}
//                         rowStyle={rowStyle}
//                         columnTypes={columnTypes}
//                     ></AgGridReact>
//                 </Box>
//             </Paper>
//         </Fragment>
//     )
// }

// export default memo(CusAgGridMast)

import React, { Fragment, memo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Box, height } from '@mui/system'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const CusAgGridMast = ({ columnDefs, tableData, onSelectionChanged, columnTypes }) => {
    const apiRef = useRef();
    /** useSelector is used for get aggrid download button state */
    // const exportState = useSelector((state) => {
    //     return state.changeStateAggrid.aggridstate
    // })
    /** To download report as excel */
    // if (exportState > 0 && tableDataMain.length > 0) {
    //     apiRef.current.api.exportDataAsCsv();
    // }

    /** Ag grid report row and column formatting */
    const rowHeight = 28
    const headerHeight = 30
    const defaultColDef = {
        sortable: true,
        filter: 'agTextColumnFilter',
        scroll: true
    }

    let gridApi
    const onGridReady = (params) => {
        gridApi = params.api
    }
    const statusBar = useMemo(() => {
        return {
            statusPanels: [{ statusPanel: 'agAggregationComponent' }],
        };
    }, []);

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
                    display: "flex",
                    flexWrap: 'nowrap',
                    flexDirection: { xs: "row", sm: "row", md: "row", lg: 'column', xl: "column" },
                    border: 2,
                    borderColor: '#d3d3d3',
                    // height: { xs: 540, sm: 540, md: 540, lg: 514, xl: 802 },
                    height: 500,
                    width: "100%",
                    width: { xs: "row", sm: "row", md: "row", lg: 'column', xl: "column" }

                    // width: { xs: "100%", sm: "100%", md: '100%', lg: '20%', xl: '15%' },

                }}>
                <Box
                    className="ag-theme-material ListItemScrol"
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: "row", sm: "row", md: "row", lg: 'column', xl: "column" },
                        height: { xs: 500, sm: 500, md: 500, lg: 500, xl: 802 },
                        // width: { xs: "100%", sm: "100%", md: '100%', lg: '20%', xl: '15%' },
                        // width: "100%"
                        width: { xs: "row", sm: "row", md: "row", lg: 'column', xl: "column" }
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
                        statusBar={statusBar}

                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(CusAgGridMast)


