import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditButton from 'src/views/Components/EditButton'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
const ScheduleTimeTable = ({ count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'SlNo', field: 'schedule_time_id', width: 80 },
    { headerName: 'Schedule Time', field: 'schedule_time_name', width: 150, filter: 'true' },
    { headerName: 'Status', field: 'status', width: 100 },
    {
      headerName: 'Action',
      width: 100,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])
  useEffect(() => {
    const getScheduleTime = async () => {
      const result = await axioslogin.get('/scheduletime/select')
      const { success, data } = result.data
      if (success === 2) {
        setTabledata(data)
      } else {
      }
    }
    getScheduleTime()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}
export default memo(ScheduleTimeTable)
