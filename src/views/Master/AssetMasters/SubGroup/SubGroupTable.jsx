import React, { useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const SubGroupTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'subgroup_slno' },
    { headerName: 'Group', field: 'sub_group_name' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  useEffect(() => {
    const getCategory = async () => {
      const result = await axioslogin.get('subgroup/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getCategory()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}
export default SubGroupTable
