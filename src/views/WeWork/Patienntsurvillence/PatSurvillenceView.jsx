import { Paper } from '@mui/material'
import React, { memo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { Fragment } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify, infoNotify } from 'src/views/Common/CommonCode'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'

const PatSurvillenceView = ({ ipno, setclosebtn }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    // { headerName: "slno", field: "sl_no" },
    { headerName: 'ipno', field: 'ip_no', wrapText: true, autoHeight: true, width: 250 },
    {
      headerName: 'name',
      field: 'ptc_ptname',
      wrapText: true,
      autoHeight: true,
      width: 300,
      filter: true
    },
    { headerName: 'Shift To', field: 'shift_to', wrapText: true, autoHeight: true, width: 300 },
    { headerName: 'Shift from', field: 'shift_from', width: 300, wrapText: true, autoHeight: true },
    { headerName: 'Bed', field: 'bdc_no' },
    { headerName: 'Room', field: 'room_category' },
    { headerName: 'Bed Type', field: 'bed_type' },
    { headerName: 'Is BHRC', field: 'bhrc_patient', width: 200 },
    { headerName: 'Payment', field: 'payment_mode' }
  ])

  useEffect(() => {
    const getSurvillencedetl = async ipno => {
      const result = await axioslogin.get(`/WeWork/survdetl/${ipno}`)
      const { success, data, message } = result.data
      if (success === 1) {
        setTabledata(data)
        // setaa(1)
      } else if (success === 2) {
        setTabledata([])
        infoNotify(message)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getSurvillencedetl(ipno)
  }, [ipno])

  const closeIcon = useCallback(() => {
    setclosebtn(1)
  }, [setclosebtn])

  return (
    <Fragment>
      <CardCloseOnly title="Patient shifting details" close={closeIcon}>
        <Paper sx={{ p: 2 }}>
          <CusAgGridMast tableData={tabledata} columnDefs={column} />
        </Paper>
      </CardCloseOnly>
    </Fragment>
  )
}

export default memo(PatSurvillenceView)
