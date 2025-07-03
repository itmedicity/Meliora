import React, { useCallback, useEffect, useState, memo } from 'react'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import { Box, Paper } from '@mui/material'
import { getExtraOrderList } from 'src/redux/actions/DietExtraOrderList'
import { useDispatch, useSelector } from 'react-redux'
import EditButton from 'src/views/Components/EditButton'

const ExtraOrderView = ({ dietExtraViews, setDisview }) => {
  //*** Initializing */
  const dispatch = useDispatch()

  //column title setting
  const [column] = useState([
    { headerName: 'Process Slno', field: 'proc_slno' },
    { headerName: 'Patient Id', field: 'pt_no' },
    { headerName: 'Patient Name', field: 'ptc_ptname' },
    { headerName: 'Room/Ward', field: 'bdc_no' },
    { headerName: 'Order Date', field: 'orderdate' },
    { headerName: 'Requested Date', field: 'reqdate' },
    { headerName: 'Total Rate', field: 'rate_hos' },
    {
      headerName: 'Action',
      cellRenderer: params => <EditButton onClick={() => dietExtraViews(params)} />,
    },
  ])

  const tabledata = useSelector(state => {
    return state.setExtraOrderList.extraorderList
  })

  useEffect(() => {
    dispatch(getExtraOrderList())
  }, [dispatch])

  const backtoSetting = useCallback(() => {
    setDisview(0)
  }, [setDisview])

  return (
    <CardCloseOnly title="Extra Order List" close={backtoSetting}>
      <Box sx={{ width: '100%', p: 1 }}>
        <Paper square elevation={3}>
          <CusAgGridForMain columnDefs={column} tableData={tabledata} />
        </Paper>
      </Box>
    </CardCloseOnly>
  )
}

export default memo(ExtraOrderView)
