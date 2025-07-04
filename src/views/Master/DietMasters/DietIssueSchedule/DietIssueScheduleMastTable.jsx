import React, { memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
function DietIssueScheduleMastTable() {
  const [column] = useState([
    {
      headerName: 'slno'
    },
    {
      headerName: 'Diet Issue Schedule'
    },
    {
      headerName: 'Status'
    },
    {
      headerName: 'Actions'
    }
  ])
  return <CusAgGridMast columnDefs={column} />
}
export default memo(DietIssueScheduleMastTable)
