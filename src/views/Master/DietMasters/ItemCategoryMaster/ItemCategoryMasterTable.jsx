import React, { useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ItemCategoryMasterTable = ({ rowSelect, tabledata }) => {



  const [column] = useState([
    { headerName: 'SlNo', field: 'item_category_id', width: 80 },

    {
      headerName: 'Group Name',
      field: 'group_name',
      width: 150,
      filter: 'agTextColumnFilter',
      floatingFilter: true
    },

    { headerName: 'Category Name', field: 'category_name', flex: 1 },

    { headerName: 'Category Code', field: 'category_code', flex: 1 },

    {
      headerName: 'Display Order',
      field: 'display_order',
      width: 130, filter: 'agTextColumnFilter',
      floatingFilter: true
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


  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true
  }

  return (
    <CusAgGridMast
      defaultColDef={defaultColDef}
      columnDefs={column}
      tableData={tabledata}
      onClick={rowSelect}
    />
  )
}

export default memo(ItemCategoryMasterTable)