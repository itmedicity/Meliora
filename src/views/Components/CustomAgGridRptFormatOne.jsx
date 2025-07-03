import React, { Fragment, useState, memo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Paper } from '@mui/material'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import { Box } from '@mui/system'

const CustomAgGridRptFormatOne = () => {
  //Table
  const [columnDefs] = useState([
    {
      headerName: '#',
      field: 'slno',
      // filter: true,
      filterParams: {
        buttons: ['reset', 'apply'],
        debounceMs: 200,
      },
      // filter: 'agTextColumnFilter',
      // filter: 'agNumberColumnFilter',
      // checkboxSelection: true,
      // headerCheckboxSelectionFilteredOnly: true,
      // headerCheckboxSelection: true,
      // resizable: false,
      // width: 30,
    },
    { headerName: 'Name', field: 'name' },
    { headerName: 'mobile ', field: 'mobile' },
    { headerName: 'City ', field: 'city' },
    // { headerName: 'Age ', field: 'age' },
    // { headerName: 'Place ', field: 'place' },
    // { headerName: 'Gender ', field: 'gender' },
    // { headerName: 'State ', field: 'state' },
    // { headerName: 'Nation ', field: 'nation' },
  ])

  const tableData = [
    {
      slno: 12,
      name: 'Ajith',
      mobile: 9846009616,
      city: 'kottiyam',
      // age: 32,
      // place: 'kollam',
      // gender: 'male',
      // state: 'kerala',
      // nation: 'indian',
    },
    {
      slno: 22,
      name: 'Ajith',
      mobile: 9846009616,
      city: 'kottiyam',
      // age: 32,
      // place: 'kollam',
      // gender: 'male',
      // state: 'kerala',
      // nation: 'indian',
    },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
    // {
    //   slno: 22,
    //   name: 'Ajith',
    //   mobile: 9846009616,
    //   city: 'kottiyam',
    //   age: 32,
    //   place: 'kollam',
    //   gender: 'male',
    //   state: 'kerala',
    //   nation: 'indian',
    // },
  ]

  const rowHeight = 25
  const headerHeight = 30
  const defaultColDef = {
    // resizable: true,
    sortable: true,
    filter: true,
    // floatingFilter: true
    // filter: 'agTextColumnFilter',
  }

  let gridApi
  const onGridReady = params => {
    gridApi = params.api
    gridApi.sizeColumnsToFit()
  }
  //--- For Get the Selected Row Values
  const onSelectionChanged = event => {
    event.api.getSelectedRows()
  }

  const rowStyle = {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }

  return (
    <Fragment>
      <Paper elevation={0}>
        <Box
          className="ag-theme-material ListItemScrol"
          sx={{
            height: { xs: 540, sm: 540, md: 540, lg: 514, xl: 802 },
            width: '100%',
          }}
        >
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
            rowStyle={rowStyle}
            suppressColumnVirtualisation={true}
            suppressRowVirtualisation={true}
            // autoGroupColumnDef={autoGroupColumnDef}
            suppressRowClickSelection={true}
            groupSelectsChildren={true}
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            enableRangeSelection={true}
            pagination={true}
          ></AgGridReact>
        </Box>
      </Paper>
    </Fragment>
  )
}

export default memo(CustomAgGridRptFormatOne)
