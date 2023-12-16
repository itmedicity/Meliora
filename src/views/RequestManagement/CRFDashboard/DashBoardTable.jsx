import React, { memo, useState, } from 'react'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'

const DashBoardTable = ({ wherePending, tabledata }) => {

    const [columnInch] = useState([
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Purpose", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Justification", field: "needed", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Location", field: "locations", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Req. Date", field: "req_date", minWidth: 200 },
        { headerName: "Inch.Status", field: "incharge", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Inch.Remark", field: "incharge_remark", minWidth: 250, wrapText: true, },
        { headerName: "Hod.Status", field: "hod", minWidth: 150, wrapText: true, },
        { headerName: "Hod.Remark", field: "hod_remarks", minWidth: 250, wrapText: true, },
        { headerName: "DMS.Status", field: "dms", minWidth: 150, wrapText: true, },
        { headerName: "DMS.Remark", field: "dms_remarks", minWidth: 250, wrapText: true, },
        { headerName: "MS.Status", field: "ms", minWidth: 150, wrapText: true, },
        { headerName: "MS.Remark", field: "ms_approve_remark", minWidth: 250, wrapText: true, },
        { headerName: "OM Status", field: "om", minWidth: 150, wrapText: true, },
        { headerName: "OM.Remark", field: "manag_operation_remarks", minWidth: 250, wrapText: true, },
        { headerName: "SMO Status", field: "smo", minWidth: 150, wrapText: true, },
        { headerName: "SMO.Remark", field: "senior_manage_remarks", minWidth: 250, wrapText: true, },
        { headerName: "CAO/COO Status", field: "cao", minWidth: 180, wrapText: true, },
        { headerName: "CAO/COO.Remark", field: "cao_approve_remarks", minWidth: 250, wrapText: true, },
        { headerName: "ED/MD  Status", field: "ed", minWidth: 150, wrapText: true, },
        { headerName: "ED/MD.Remark", field: "ed_approve_remarks", minWidth: 250, wrapText: true, },
    ])

    return (
        <CusAgGridForMain
            columnDefs={columnInch}
            tableData={tabledata}
        />
    )
}

export default memo(DashBoardTable)