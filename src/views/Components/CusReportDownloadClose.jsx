import { Box } from '@mui/system'
import React, { Fragment, memo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import theme from './MuiTheme'
import { Card, ThemeProvider, CardHeader } from '@mui/material'
import CusIconButton from './CusIconButton'
import CustomeToolTip from './CustomeToolTip'
import CloseIcon from '@mui/icons-material/Close'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { ActionTyps } from 'src/redux/constants/action.type'
import { useDispatch, useSelector } from 'react-redux'
import { warningNotify } from '../Common/CommonCode'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const CusReportDownloadClose = ({
  title,
  columnDefs,
  tableData,
  onSelectionChanged,
  columnTypes,
  getRowStyle,
  sx,
}) => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [exports, setexport] = useState(0)
  const rowHeight = 30
  const headerHeight = 30
  const defaultColDef = {}

  const onGridReady = params => {
    params.api.sizeColumnsToFit()
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

  const CardHeaderStyle = {
    backgroundColor: '#f0f3f5',
    fontFamily: 'Roboto',
    py: 0,
    pb: 0.65,
    pt: 0.8,
  }

  const CloseReport = () => {
    dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
    history(`/Home`)
  }

  const onExportClick = () => {
    if (tableData.length === 0) {
      warningNotify('Please Click The Search Button')
      setexport(0)
    } else {
      // dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
      setexport(1)
    }
  }
  const apiRef = useRef()
  /** useSelector is used for get aggrid download button state */
  const exportState = useSelector(state => {
    return state.changeStateAggrid.aggridstate
  })

  /** To download report as excel */
  if (exportState > 0 && tableData.length > 0) {
    apiRef.current.api.exportDataAsCsv()
  }
  useEffect(() => {
    if (exports === 1) {
      dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
      setexport(0)
    } else {
      dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
    }
  }, [exports, setexport, dispatch])

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Card sx={{ borderRadius: 0, boxShadow: 1 }}>
          <CardHeader
            title={title}
            titleTypographyProps={{ variant: 'headerFontSize' }}
            action={
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CustomeToolTip title="Close" placement="left">
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      onClick={CloseReport}
                    >
                      <CloseIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </CustomeToolTip>
                <CustomeToolTip title="Download" placement="left">
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      onClick={onExportClick}
                    >
                      <CloudDownloadIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </CustomeToolTip>
              </Box>
            }
            sx={{ ...CardHeaderStyle }}
          />
          <Box className="ag-theme-alpine ListItemScrol" sx={{ p: 1, ...sx }}>
            <AgGridReact
              ref={apiRef}
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
              columnTypes={columnTypes}
              getRowStyle={getRowStyle}
            ></AgGridReact>
          </Box>
        </Card>
      </ThemeProvider>
    </Fragment>
  )
}

export default memo(CusReportDownloadClose)
