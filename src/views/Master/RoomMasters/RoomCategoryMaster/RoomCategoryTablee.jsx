import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const RoomCategoryTablee = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'rm_roomcategory_slno' },
    { headerName: 'Category name', field: 'rm_roomcategory_name' },
    { headerName: 'Category  alias', field: 'rm_roomcategory_alias' },
    { headerName: 'Category  number', field: 'rm_roomcategory_no' },
    { headerName: 'Status', field: 'status' },

  ])
  useEffect(() => {
    const getRoomCategory = async () => {
      const result = await axioslogin.get('roomcategory/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getRoomCategory()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(RoomCategoryTablee)
