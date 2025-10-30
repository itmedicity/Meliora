import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getDiscAfternoonList } from 'src/redux/actions/WeDiscAfternoon.action'
import CusReportDownloadClose from 'src/views/Components/CusReportDownloadClose'

const DischargeList = () => {
  const dispatch = useDispatch()
  const AfternoonDisc = useSelector(state => {
    return state.getDischargeList.DischargeList || 0
  })

  useEffect(() => {
    dispatch(getDiscAfternoonList())
  }, [dispatch])

  const [column] = useState([
    { headerName: 'MRDno', field: 'pt_no', filter: true },
    { headerName: 'AdNo', field: 'ip_no', filter: true },
    { headerName: 'Adn.Date', field: 'ipd_date', autoHeight: true, wrapText: true },
    { headerName: 'Name', field: 'ptc_ptname', filter: true },
    { headerName: 'Disc.time', field: 'disc_time' },
    { headerName: 'Disc.Date', field: 'actual_disc' },
    { headerName: 'consultant', field: 'doc_name', filter: true },
    { headerName: 'shift_from', field: 'shift_from' },
    { headerName: 'shift_to', field: 'shift_to' },
    { headerName: 'Room', field: 'rmc_desc' }
  ])

  return (
    <Fragment>
      <CusReportDownloadClose
        title={'Discharge After 2 pm '}
        columnDefs={column}
        tableData={AfternoonDisc}
        sx={{ width: '100%', height: 800 }}
      />
    </Fragment>
  )
}

export default DischargeList
