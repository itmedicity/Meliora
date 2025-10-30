import React, { memo, useState, useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const InsideBuildBlockTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'rm_insidebuildblock_slno' },
    { headerName: 'Inside Building name', field: 'rm_insidebuildblock_name' },
    { headerName: 'Inside Building alias', field: 'rm_insidebuildblock_alias' },
    { headerName: 'Inside Building number', field: 'rm_insidebuildblock_no' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])
  useEffect(() => {
    const getBuilding = async () => {
      const result = await axioslogin.get('insidebuildblock/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getBuilding()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(InsideBuildBlockTable)
