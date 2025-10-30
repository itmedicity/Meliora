import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const BuildBlockMastTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'rm_buildblock_slno' },
    { headerName: 'Build Block name', field: 'rm_buildblock_name' },
    { headerName: 'Build Block alias', field: 'rm_buildblock_alias' },
    { headerName: 'Build Block number', field: 'rm_buildblock_no' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])
  useEffect(() => {
    const getbuildBlock = async () => {
      const result = await axioslogin.get('buildblock/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getbuildBlock()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(BuildBlockMastTable)
