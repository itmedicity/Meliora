import React, { memo, useState, useEffect, } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const BillCategoryTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])
    const [column] = useState([
        { headerName: 'SlNo', field: 'it_bill_category_slno' },
        { headerName: 'Bill Category', field: 'it_bill_category_name' },
        { headerName: 'Bill Type', field: 'it_bill_type_name' },
        { headerName: 'Status', field: 'status' },
        {
            headerName: 'Action',
            cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
        },
    ])
    useEffect(() => {
        const setBillCategorys = async () => {
            const result = await axioslogin.get('/billCategory/view')
            const { success, data } = result.data
            if (success === 2) {
                setTabledata(data)
            } else {
                warningNotify('error occured')
            }
        }
        setBillCategorys()
    }, [count])
    return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(BillCategoryTable)