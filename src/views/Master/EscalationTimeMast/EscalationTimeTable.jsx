import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const EscalationTimeTable = ({ rowSelect, count }) => {
  //state for setting table data
  const [tabledata, setTabledata] = useState([])
  //column title setting
  const [column] = useState([
    { headerName: 'SlNo', field: 'esc_slno', width: 220 },
    { headerName: 'Activity', field: 'esc_activity', wrapText: true, filter: 'true', width: 300 },
    {
      headerName: 'Responsibility',
      field: 'esc_responsibility',
      wrapText: true,
      filter: 'true',
      width: 290,
    },
    { headerName: 'Time Limit', field: 'esc_time_limit1', filter: 'true', width: 250 },
    { headerName: 'Level 1', field: 'lvl1', filter: 'true' },
    { headerName: 'Level 2', field: 'lvl2', filter: 'true' },
    { headerName: 'Level 3', field: 'lvl3', filter: 'true' },
    { headerName: 'Level 4', field: 'lvl4', filter: 'true' },
    { headerName: 'Top Level ED', field: 'toplvl', filter: 'true', minWidth: 150 },
    { headerName: 'Status', field: 'status', filter: 'true' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])
  //get all data
  useEffect(() => {
    const getEscalation = async () => {
      const result = await axioslogin.get('/escalation')
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getEscalation()
  }, [count])
  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}
export default memo(EscalationTimeTable)
