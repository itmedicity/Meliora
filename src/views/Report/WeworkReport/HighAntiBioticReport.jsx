import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { getHighAntibiotic } from 'src/redux/actions/HighAntibiotic.action'
import { useDispatch, useSelector } from 'react-redux'
import CusReportDownloadClose from 'src/views/Components/CusReportDownloadClose'
import { useState } from 'react'

const HighAntiBioticReport = () => {
  const dispatch = useDispatch()

  const highAntibiotic = useSelector(state => {
    return state.getHighAntibioticdetl.AntibioticList
  })

  useEffect(() => {
    dispatch(getHighAntibiotic())
  }, [dispatch])

  const [column] = useState([
    { headerName: 'itemcode', field: 'high_item_code' },
    { headerName: 'AntiBiotic Name', field: 'high_item_desc' },
    { headerName: 'alias', field: 'high_item_alias' },
    { headerName: 'Status', field: 'high_item_status' },
  ])

  return (
    <Fragment>
      <CusReportDownloadClose
        title={'High Antibiotic List'}
        columnDefs={column}
        tableData={highAntibiotic}
        sx={{ width: '100%', height: 800 }}
      />
    </Fragment>
  )
}

export default HighAntiBioticReport
