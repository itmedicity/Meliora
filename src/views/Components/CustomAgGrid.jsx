import React, { Fragment, useState, memo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { useCallback } from 'react'
import { IconButton } from '@mui/material'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import EditButton from './EditButton'

const CustomAgGrid = () => {
  //Table
  const [columnDefs] = useState([
    { headerName: 'slno', field: 'slno', checkboxSelection: true, rowDrag: true },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Mobile', field: 'mobile' },
    { headerName: 'Gender ', field: 'gender', cellRenderer: EditButton },
  ])

  const tableData = [
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
    { slno: 1, name: 'Ajith', mobile: 9846009616, gender: 'male' },
  ]

  const rowHeight = 25
  const headerHeight = 40
  const defaultColDef = {
    // sortable: true,
    // filter: true,
    // floatingFilter: true
  }

  let gridApi
  const onGridReady = (params) => {
    gridApi = params.api
  }

  const onExportClick = useCallback(() => {
    gridApi.exportDataAsCsv()
  }, [gridApi])

  const onSelectionChanged = (event) => {
    console.log(event.api.getSelectedRows())
  }

  return (
    <Fragment>
      <div
        className="ag-theme-alpine ListItemScrol"
        style={{
          height: 250,
        }}
      >
        <IconButton aria-label="fingerprint" color="primary" onClick={onExportClick}>
          <CloudDownloadIcon />
        </IconButton>

        <AgGridReact
          columnDefs={columnDefs}
          rowData={tableData}
          defaultColDef={defaultColDef}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          rowDragManaged={true}
          animateRows={true}
          onGridReady={onGridReady}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
        ></AgGridReact>
      </div>
    </Fragment>
  )
}

export default memo(CustomAgGrid)
