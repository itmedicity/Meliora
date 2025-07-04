import React from 'react'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CusReportDownloadClose from 'src/views/Components/CusReportDownloadClose'
import { useDispatch, useSelector } from 'react-redux'
import { getNoshifingList } from 'src/redux/actions/WeOneSheeetDetl.action'
const NoshiftReport = () => {
  const dispatch = useDispatch()

  const getnosheet = useSelector(state => {
    return state.getwenoShiftdetl.noshiftdetlList || 0
  })

  useEffect(() => {
    dispatch(getNoshifingList())
  }, [dispatch])

  const [column] = useState([
    { headerName: 'MRDno', field: 'pt_no' },
    { headerName: 'AdNo', field: 'ip_no' },
    { headerName: 'Ad.Date', field: 'ipd_date', wrapText: true, autoHeight: true },
    { headerName: 'Name', field: 'ptc_ptname', filter: true },
    { headerName: 'consultant', field: 'doc_name', filter: true },
    { headerName: 'Room', field: 'rmc_desc' },
    { headerName: 'Bed', field: 'bdc_no' },
    { headerName: 'Shift_from', field: 'shift_from' },
    { headerName: 'Shift_to', field: 'shift_to' }
  ])
  return (
    <Fragment>
      <CusReportDownloadClose
        title={'No sheet change'}
        tableData={getnosheet}
        columnDefs={column}
        sx={{ width: '100%', height: 800 }}
      />
    </Fragment>
  )
}

export default NoshiftReport
