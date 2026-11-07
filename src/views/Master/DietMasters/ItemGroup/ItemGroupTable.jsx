import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const ItemGroupTable = ({ rowSelect ,tabledata}) => {

  // Column definitions for ag-grid
  const [column] = useState([
    { headerName: 'SlNo', field: 'item_group_id', width: 80 },
    { headerName: 'Group Name', field: 'group_name', flex: 1 },
    { headerName: 'Group Code', field: 'group_code', flex: 1 },
    { headerName: 'Display Order', field: 'display_order', width: 130 },
    {
      headerName: 'Status',
      field: 'is_active',
      width: 120,
      cellRenderer: params => (params.value === 1 ? 'Active' : 'Inactive')
    },
    {
      headerName: 'Action',
      width: 100,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
    }
  ])

  return <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
}

export default memo(ItemGroupTable)