import React, { memo } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const PatientIntactionTable = ({ ipno, count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])

  const [column] = useState([
    { headerName: 'SlNo', field: 'slno', width: 150 },
    { headerName: 'Date', field: 'remark_date', width: 150 },
    { headerName: 'Time', field: 'remark_time', width: 150 },
    { headerName: 'Name', field: 'ptc_ptname', width: 150 },
    { headerName: 'Particular', field: 'particular', width: 150 },
    { headerName: 'Status', field: 'status', width: 150 },
    { headerName: 'Remark', field: 'remarks', width: 150 },
    {
      headerName: 'Actions',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])

  useEffect(() => {
    const getIntarction = async ipno => {
      const result = await axioslogin.get(`/WeWork/intraction/${ipno}`)

      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('please add patient intraction')
      }
    }
    getIntarction(ipno)
  }, [count, ipno])

  return (
    <Fragment>
      <CusAgGridMast columnDefs={column} tableData={tabledata} />
    </Fragment>
  )
}

export default memo(PatientIntactionTable)
