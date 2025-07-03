import React, { memo } from 'react'
import { useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'

function TimeSlampMastTable() {
  const [column] = useState([
    {
      headerName: 'slno',
    },
    {
      headerName: 'Scheduled Time',
    },
    {
      headerName: 'Status',
    },
    {
      headerName: 'Actions',
    },
  ])

  return <CusAgGridMast columnDefs={column} />
}
export default memo(TimeSlampMastTable)
