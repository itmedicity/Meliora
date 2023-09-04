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
    { headerName: 'SlNo', field: 'uom_slno' },
    { headerName: 'Unit of measurement', field: 'uom_name' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
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
