import React, { memo, useState, } from 'react'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'

const dashBoardNdrfTable = ({ wherePending, tabledata }) => {

    const [columnInch] = useState([
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Req.Department", field: "req_dept", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.DeptSec", field: "req_deptsec", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.Date", field: "reqcreate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Exp.DeptSec", field: "expected_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "NDRF Date", field: "ndrf_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Remarks", field: "remarks", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
    ])

    return (
        <CusAgGridForMain
            columnDefs={columnInch}
            tableData={tabledata}
        />
    )
}

export default memo(dashBoardNdrfTable)