import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const BillingCategoryTable = ({ tabledata, rowSelect }) => {

  const [column] = useState([
    {
      headerName: 'Category Name',
      field: 'category_name',
      flex: 1,
      filter: true
    },
    {
      headerName: 'Description',
      field: 'description',
      flex: 1,
      filter: true
    },
    {
      headerName: 'Status',
      field: 'is_active',
      width: 120,
      filter: 'agSetColumnFilter',
      cellRenderer: params => (
        params.value === 1 ? 'Active' : 'Inactive'
      )
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
      defaultColDef={{
        sortable: true,
        filter: true,
        floatingFilter: true
      }}
    />
  )
}

export default memo(BillingCategoryTable)