import React, { useEffect } from 'react'
import { memo } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const FloorCreationTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    {
      headerName: 'Action', minWidth: 100,
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'SlNo', field: 'rm_floor_slno', wrapText: true, minWidth: 70 },
    { headerName: 'Floor ', field: 'rm_floor_name', wrapText: true, minWidth: 200 },
    { headerName: 'Alias', field: 'rm_floor_alias', wrapText: true, minWidth: 100 },
    { headerName: 'Block', field: 'rm_buildblock_name', wrapText: true, minWidth: 200 },
    { headerName: 'Building', field: 'rm_building_name', wrapText: true, minWidth: 300 },
    { headerName: 'Campus', field: 'rm_campus_name', wrapText: true, minWidth: 250 },
    { headerName: 'floor Number', field: 'rm_floor_no', wrapText: true, minWidth: 200 },
    { headerName: 'Floor Code', field: 'floor_order', wrapText: true, minWidth: 80 },
    { headerName: 'Room No.starts ', field: 'rm_floor_room_starts', wrapText: true, minWidth: 150 },
    { headerName: 'Room No.ends', field: 'rm_floor_room_ends', wrapText: true, minWidth: 150 },
    { headerName: 'Status', field: 'status', wrapText: true, minWidth: 100 },
  ])
  useEffect(() => {
    const getFloorData = async () => {
      const result = await axioslogin.get('floorcreation/view')
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

export default memo(FloorCreationTable)
