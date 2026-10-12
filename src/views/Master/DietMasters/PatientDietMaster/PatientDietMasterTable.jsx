import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const PatientDietMasterTable = ({ rowSelect, tabledata }) => {

  // Column definitions for ag-grid
  const [column] = useState([
    { headerName: 'SlNo', field: 'diet_id', width: 80 },
    { headerName: 'Diet Name', field: 'diet_name', flex: 1 },
    { headerName: 'Speciality Name', field: 'speciality_name', width: 120 },
    { headerName: 'Calories / Day', field: 'calories_per_day', width: 140 },
    { headerName: 'Protein / Day', field: 'protein_per_day', width: 130 },
    { headerName: 'Description', field: 'description', flex: 1 },
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

export default memo(PatientDietMasterTable)