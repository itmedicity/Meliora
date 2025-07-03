import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const CompanyMastTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'SlNo', field: 'company_slno' },
    { headerName: 'Company Name', field: 'company_name' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  useEffect(() => {
    const getData = async () => {
      const result = await axioslogin.get('/companyMast/view')
      const { success, data, message } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify(message)
      }
    }
    getData()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(CompanyMastTable)
