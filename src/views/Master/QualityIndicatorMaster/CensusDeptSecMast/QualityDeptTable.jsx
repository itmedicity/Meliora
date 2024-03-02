import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const QualityDeptTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    useEffect(() => {
        const getQtDepartment = async () => {
            const result = await axioslogin.get('/censusNursingStat/select')
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
        { headerName: "Sl.No", field: "census_ns_slno", width: 80, },
        { headerName: "Nursing Station Name", field: "census_ns_name", width: 150, filter: "true" },
        { headerName: "NS CODE", field: "census_ns_code", width: 150, filter: "true" },
        { headerName: "OU CODE", field: "census_ou_code", width: 150, filter: "true" },
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