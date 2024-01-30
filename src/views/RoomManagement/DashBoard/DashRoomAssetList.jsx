import React, { Fragment, memo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { Paper } from '@mui/material'
import { Box } from '@mui/system'

const DashRoomAssetList = ({ RoomAssetList }) => {

    const rowHeight = 35
    const headerHeight = 30
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


    const [column] = useState([
        { headerName: 'SlNo', field: 'slno', minWidth: 10 },
        { headerName: 'Category', field: 'category_name', autoHeight: true, wrapText: true, minWidth: 100, filter: "true" },
        { headerName: 'Item Name', field: 'item_name', autoHeight: true, wrapText: true, minWidth: 400, filter: "true" },
        { headerName: 'Primary Custodian', field: 'cus_primary', autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: 'Secondary Custodian', field: 'cus_second', autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: 'Room', field: 'rm_room_name', minWidth: 70, filter: "true" },
        { headerName: 'Sub Room', field: 'subroom_name', minWidth: 70, filter: "true" },
    ])
    return (

        <Fragment>
            <Paper elevation={0}>
                <Box
                    className="ag-theme-alpine ListItemScrol"
                    sx={{
                        height: 550,
                        width: "100%"
                    }}
                >
                    <AgGridReact
                        columnDefs={column}
                        rowData={RoomAssetList}
                        defaultColDef={defaultColDef}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        rowDragManaged={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        // onSelectionChanged={onSelectionChanged}
                        rowStyle={rowStyle}
                    // columnTypes={columnTypes}
                    // getRowStyle={getRowStyle}
                    ></AgGridReact>
                </Box>
            </Paper>
        </Fragment>

    )
}

export default memo(DashRoomAssetList)



// import React, { memo } from 'react'
// import { CssVarsProvider } from '@mui/joy/'
// import Table from '@mui/joy/Table';
// import { Box } from '@mui/material'

// const DashRoomAssetList = ({ RoomAssetList }) => {

//     return (
//         <Box sx={{
//             borderBottom: 1, borderWidth: 0.1, borderColor: 'black', minHeight: 600, maxHeight: 500,
//             overflow: 'auto'
//         }} >
//             <CssVarsProvider>
//                 <Table stickyHeader>
//                     <thead>
//                         <tr>
//                             <th style={{ width: '20%', align: "center" }}>Sl No</th>
//                             <th style={{ width: '70%', align: "center" }}>Item Name</th>
//                             <th style={{ width: '30%', align: "center" }}>Primary Custodian</th>
//                             <th style={{ width: '30%', align: "center" }}>Secondary Custodian</th>
//                             <th style={{ width: '20%', align: "center" }}>Room</th>
//                             <th style={{ width: '20%', align: "center" }}>Sub Room</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {RoomAssetList && RoomAssetList.map((val, index) => {
//                             return <tr
//                                 key={index}
//                                 sx={{
//                                     '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
//                                     minHeight: 5
//                                 }}
//                             >
//                                 <td> {index + 1}</td>
//                                 <td> {val.item_name}</td>
//                                 <td> {val.cus_primary}</td>
//                                 <td> {val.cus_second}</td>
//                                 <td> {val.rm_room_name}</td>
//                                 <td> {val.subroom_name}</td>
//                             </tr>
//                         })}
//                     </tbody>
//                 </Table>
//             </CssVarsProvider>
//         </Box>
//     )
// }

// export default memo(DashRoomAssetList)