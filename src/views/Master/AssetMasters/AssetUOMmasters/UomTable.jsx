import React from 'react'
import { memo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const UomTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 10,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'uom_slno', minWidth: 50 },
    { headerName: 'Unit of measurement', field: 'uom_name', minWidth: 50 },
    { headerName: 'Status', field: 'status', minWidth: 50 },
  ])
  useEffect(() => {
    const setModel = async () => {
      const result = await axioslogin.get('uom/view')
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

export default memo(UomTable)
