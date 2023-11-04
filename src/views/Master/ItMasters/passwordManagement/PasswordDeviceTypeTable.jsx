import React, { memo, useState, useEffect, } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const PasswordDeviceTypeTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'device_type_slno' },
        { headerName: 'Device type', field: 'device_type_name' },
        { headerName: 'Status', field: 'status' },
        {
            headerName: 'Action',
            cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
        },
    ])
    useEffect(() => {
        const setModel = async () => {
            const result = await axioslogin.get('PasswordDeviceType/view')
            const { success, data } = result.data
            if (success === 2) {
                setTabledata(data)
            } else {
                warningNotify('error occured')
            }
        }
        setModel()
    }, [count])
    return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(PasswordDeviceTypeTable)