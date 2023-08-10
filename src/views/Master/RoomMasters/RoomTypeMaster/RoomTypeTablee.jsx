import React from 'react'
import { memo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const RoomTypeTablee = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'rm_roomtype_slno' },
    { headerName: 'Room Type name', field: 'rm_roomtype_name' },
    { headerName: 'Room Type alias', field: 'rm_roomtype_alias' },
    { headerName: 'Room Type number', field: 'rm_roomtype_no' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  useEffect(() => {
    const getRoomType = async () => {
      const result = await axioslogin.get('roomtype/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getRoomType()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(RoomTypeTablee)
