import React, { useState, memo } from 'react'
import { warningNotify } from 'src/views/Common/CommonCode';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import EditButton from 'src/views/Components/EditButton';
import { useQuery } from 'react-query'
import { getComplaintDepartmentData } from 'src/api/CommonApi';

const ComplaintDeptMastTable = ({ rowSelect }) => {

    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_dept_slno" },
        { headerName: "Complaint Department", field: "complaint_dept_name", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Department Name", field: "dept_name", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Status", field: "status" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    ])
    //get all data

    const { isLoading, error, data } = useQuery({
        queryKey: 'getComplaintDept',
        queryFn: getComplaintDepartmentData
    })

    if (error) warningNotify(error)

    return (
        <CusAgGridMast
            columnDefs={column}
            loading={isLoading}
            tableData={data?.length > 0 && data || []}
            onClick={rowSelect}
        />
    )
}
export default memo(ComplaintDeptMastTable)