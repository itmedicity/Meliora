import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const RoomCategoryTable = () => {
  const [column] = useState([
    { headerName: 'Action', minWidth: 50, cellRenderer: () => <EditButton /> },
    { headerName: 'SlNo', field: 'slno', wrapText: true, minWidth: 50 },
    { headerName: 'Description', field: 'name', wrapText: true, minWidth: 350 },
    { headerName: 'Short Name', field: 'name', wrapText: true, minWidth: 200 },
    { headerName: 'Status', field: 'status', wrapText: true, minWidth: 100 }
  ])
  const tableData = [
    {
      slno: '1',
      name: ' PC',
      status: 'Yes'
    }
  ]
  return <CusAgGridMast columnDefs={column} tableData={tableData} />
}
export default memo(RoomCategoryTable)
