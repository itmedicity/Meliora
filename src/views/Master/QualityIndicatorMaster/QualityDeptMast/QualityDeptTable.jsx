import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const QualityDeptTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    useEffect(() => {
        const getQtDepartment = async () => {
            const result = await axioslogin.get('/qualityDept/select')
            const { success, data } = result.data
            if (success === 2) {
                setTabledata(data)
            }
            else {
            }
        }
        getQtDepartment();
    }, [count])
    const [column] = useState([
        { headerName: "SlNo", field: "qi_dept_slno", width: 80, },
        { headerName: "Department", field: "qi_dept_name", width: 150, filter: "true" },
        { headerName: "Status", field: "status", width: 100, },
        {
            headerName: 'Action',
            width: 100, cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />
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

export default memo(QualityDeptTable)