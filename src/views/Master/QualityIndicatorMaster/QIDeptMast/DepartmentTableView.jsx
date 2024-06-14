import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const DepartmentTableView = ({ rowSelect, count }) => {

    const [tabledata, setTabledata] = useState([])
    useEffect(() => {
        const getQtDepartment = async () => {
            const result = await axioslogin.get('/qidepartment/select')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
            }
        }
        getQtDepartment();
    }, [count])

    const [column] = useState([
        { headerName: "Sl.No", field: "qi_dept_no", width: 45, },
        { headerName: "Department Name", field: "qi_dept_desc", width: 150, filter: "true" },
        { headerName: "Dept Code", field: "qi_dept_code", width: 70, filter: "true" },
        { headerName: "Dept Sec", field: "sec_name", width: 150, filter: "true" },
        { headerName: "QI Type", field: "qi_list_type_name", width: 100, filter: "true" },
        { headerName: "Status", field: "status", width: 50, },
        {
            headerName: 'Action',
            width: 50, cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />
        },
    ])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}
        />
    )
}

export default memo(DepartmentTableView)