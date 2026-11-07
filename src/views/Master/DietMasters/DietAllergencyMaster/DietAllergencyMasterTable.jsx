import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const DietAllergencyMasterTable = ({ tabledata, rowSelect }) => {

  const [column] = useState([
    {
      headerName: 'Name',
      field: 'allergen_name',
      flex: 1
    },
    {
      headerName: 'Description',
      field: 'allergen_description',
      flex: 1
    },
    {
      headerName: 'Severity',
      field: 'severity_level',
      flex: 1,
      filter: 'agSetColumnFilter',
      cellRenderer: params => {
        const color =
          params.value === 'HIGH' ? 'red' :
            params.value === 'MEDIUM' ? 'orange' : 'green';

        return <span style={{ color }}>{params.value}</span>;
      }
    },
    {
      headerName: 'Status',
      field: 'is_active',
      width: 120,
      cellRenderer: params => (params.value === 1 ? 'Active' : 'Inactive')
    },
    {
      headerName: 'Action',
      width: 100,
      cellRenderer: params => (
        <EditButton onClick={() => rowSelect(params)} />
      )
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

export default memo(DietAllergencyMasterTable)