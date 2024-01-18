import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

function RoomNewCreationTable({ count, rowSelect }) {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    {
      headerName: 'Action', minWidth: 100,
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'rm_room_slno', wrapText: true, minWidth: 70 },
    { headerName: 'Room Name', field: 'rm_room_name', wrapText: true, minWidth: 250, filter: "true" },
    { headerName: 'Room Number', field: 'rm_room_no_dis', wrapText: true, minWidth: 150, filter: "true" },
    { headerName: 'Building', field: 'rm_building_name', wrapText: true, minWidth: 250, filter: "true" },
    { headerName: 'Block.', field: 'rm_buildblock_name', wrapText: true, minWidth: 250, filter: "true" },
    { headerName: 'Inside building block', field: 'rm_insidebuildblock_name', wrapText: true, minWidth: 180 },
    { headerName: 'Floor', field: 'rm_floor_name', wrapText: true, minWidth: 200 },
    { headerName: 'Room Type', field: 'rm_roomtype_name', wrapText: true, minWidth: 200, filter: "true" },
    { headerName: 'Room Category', field: 'rm_roomcategory_name', wrapText: true, minWidth: 250, filter: "true" },
    { headerName: 'Status', field: 'status', wrapText: true, minWidth: 100 },

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
