import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

function RoomNewCreationTable({ count, rowSelect }) {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'rm_room_slno' },
    { headerName: 'Building', field: 'rm_building_name' },
    { headerName: 'Block.', field: 'rm_buildblock_name' },
    { headerName: 'Inside building block', field: 'rm_insidebuildblock_name' },
    { headerName: 'Floor', field: 'rm_floor_name' },
    { headerName: 'Room Type', field: 'rm_roomtype_name' },
    { headerName: 'Room Category', field: 'rm_roomcategory_name' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  useEffect(() => {
    const getFloorData = async () => {
      const result = await axioslogin.get('roomnewcreation/view')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
        warningNotify('error occured')
      }
    }
    getFloorData()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} />
}

export default memo(RoomNewCreationTable)
