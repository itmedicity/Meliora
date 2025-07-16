import { useQuery } from '@tanstack/react-query'
import React, { memo, useState } from 'react'
import { getFloorData } from 'src/api/Roomapi'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

function RoomNewCreationTable({ rowSelect }) {

  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 100,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    },
    { headerName: 'SlNo', field: 'rm_room_slno', wrapText: true, minWidth: 70 },
    {
      headerName: 'Room Name',
      field: 'rm_room_name',
      wrapText: true,
      minWidth: 250,
      filter: 'true'
    },
    {
      headerName: 'Room Number',
      field: 'rm_room_no_dis',
      wrapText: true,
      minWidth: 150,
      filter: 'true'
    },
    {
      headerName: 'Building',
      field: 'rm_building_name',
      wrapText: true,
      minWidth: 250,
      filter: 'true'
    },
    {
      headerName: 'Block.',
      field: 'rm_buildblock_name',
      wrapText: true,
      minWidth: 250,
      filter: 'true'
    },
    {
      headerName: 'Inside building block',
      field: 'rm_insidebuildblock_name',
      wrapText: true,
      minWidth: 180
    },
    { headerName: 'Floor', field: 'rm_floor_name', wrapText: true, minWidth: 200 },
    {
      headerName: 'Room Type',
      field: 'rm_roomtype_name',
      wrapText: true,
      minWidth: 200,
      filter: 'true'
    },
    {
      headerName: 'Room Category',
      field: 'rm_roomcategory_name',
      wrapText: true,
      minWidth: 250,
      filter: 'true'
    },
    { headerName: 'Status', field: 'status', wrapText: true, minWidth: 100 }
  ])

  const { isLoading, error, data } = useQuery({
    queryKey: 'GetroomData',
    queryFn: getFloorData
  })
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error occurred.</p>

  return <CusAgGridMast columnDefs={column} tableData={data} />
}

export default memo(RoomNewCreationTable)
