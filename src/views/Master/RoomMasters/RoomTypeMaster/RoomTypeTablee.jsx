import React from 'react'
import { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const RoomTypeTablee = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 80,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'rm_roomtype_slno', minWidth: 50 },
    { headerName: 'Type name', field: 'rm_roomtype_name', minWidth: 300 },
    { headerName: 'Type alias', field: 'rm_roomtype_alias', minWidth: 150 },
    { headerName: 'Type number', field: 'rm_roomtype_no', minWidth: 150 },
    { headerName: 'Type', field: 'room_type', minWidth: 100 },
    { headerName: 'Status', field: 'status', minWidth: 100 },
  ])
  useEffect(() => {
    const getRoomType = async () => {
      const result = await axioslogin.get('roomtypeMaster/view')
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
