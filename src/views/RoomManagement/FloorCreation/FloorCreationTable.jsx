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
    { headerName: 'SlNo', field: 'rm_floor_slno' },
    { headerName: 'Campus', field: 'rm_campus_name' },
    { headerName: 'Building', field: 'rm_building_name' },
    { headerName: 'Block', field: 'rm_buildblock_name' },
    { headerName: 'Floor ', field: 'rm_floor_name' },
    { headerName: 'Alias', field: 'rm_floor_alias' },
    { headerName: 'floor Number', field: 'rm_floor_no' },
    { headerName: 'Room No.starts ', field: 'rm_floor_room_starts' },
    { headerName: 'Room No.ends', field: 'rm_floor_room_ends' },
    { headerName: 'Status', field: 'status' },
    {
      headerName: 'Action',
      cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
    },
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
