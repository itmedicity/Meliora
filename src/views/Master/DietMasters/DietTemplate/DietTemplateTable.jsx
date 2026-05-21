import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const DietTemplateTable = ({ rowSelect, tabledata }) => {

  // Column definitions for ag-grid
  const [column] = useState([
    { headerName: 'SlNo', field: 'template_id', width: 80 },
    { headerName: 'Diet', field: 'diet_name', width: 100 },
    { headerName: 'Template Name', field: 'template_name', flex: 1 },
    { headerName: 'Version No', field: 'version_no', width: 110 },
    { headerName: 'Effective From', field: 'effective_from', width: 140 },
    { headerName: 'Effective To', field: 'effective_to', width: 140 },
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

  return (
    <CusAgGridMast
      columnDefs={column}
      tableData={tabledata}
      onClick={rowSelect}
    />
  )
}

export default memo(DietTemplateTable)