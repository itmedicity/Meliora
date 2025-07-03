import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const QIListTypeTable = ({ rowSelect, count }) => {
  const [tabledata, setTabledata] = useState([])
  useEffect(() => {
    const getQtDepartment = async () => {
      const result = await axioslogin.get('/qiTypeList/select')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
      }
    }
    getQtDepartment()
  }, [count])

  const [column] = useState([
    { headerName: 'Sl.No', field: 'qi_list_type', width: 40 },
    { headerName: 'QI Type', field: 'qi_list_type_name', width: 150, filter: 'true' },
    { headerName: 'Status', field: 'status', width: 50 },
    {
      headerName: 'Action',
      width: 50,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(QIListTypeTable)
