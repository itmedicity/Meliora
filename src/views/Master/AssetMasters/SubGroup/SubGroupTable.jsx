import React, { useState } from 'react'
import { memo } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const SubGroupTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 20,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    },
    { headerName: 'SlNo', field: 'subgroup_slno', minWidth: 50 },
    { headerName: 'Sub Group', field: 'sub_group_name', minWidth: 50 },
    { headerName: 'Group', field: 'group_name', minWidth: 50 },
    { headerName: 'Status', field: 'status', minWidth: 50 }
  ])
  useEffect(() => {
    const getGroup = async () => {
      const result = await axioslogin.get('subgroup/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getGroup()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}
export default memo(SubGroupTable)
