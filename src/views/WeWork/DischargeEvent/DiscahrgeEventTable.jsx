import React, { memo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Fragment } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const DiscahrgeEventTable = ({ ipno, count, rowSelect }) => {
  const [tabledata, setTabledata] = useState([])
  const [column] = useState([
    { headerName: 'Slno', field: 'slno', width: 150 },
    { headerName: 'IPno', field: 'ip_no', wrapText: true, autoHeight: true },
    { headerName: 'name', field: 'ptc_ptname', wrapText: true, autoHeight: true, width: 300 },
    {
      headerName: 'Disc.report',
      field: 'disc_report_date',
      wrapText: true,
      autoHeight: true,
      width: 300,
    },
    {
      headerName: 'Disc.entry ',
      field: 'act_dis_entry_time',
      width: 350,
      wrapText: true,
      autoHeight: true,
    },
    { headerName: 'Disc.type', field: 'discharge_type', width: 350 },
    {
      headerName: 'Bill time',
      field: 'act_dmd_date',
      wrapText: true,
      autoHeight: true,
      width: 350,
    },
    {
      headerName: 'Final disc.date',
      field: 'act_disc_date',
      wrapText: true,
      autoHeight: true,
      width: 350,
    },
    {
      headerName: 'Room cleaning ',
      field: 'room_clear_time',
      width: 350,
      wrapText: true,
      autoHeight: true,
    },
    {
      headerName: 'Summary time',
      field: 'summary_time',
      width: 350,
      wrapText: true,
      autoHeight: true,
    },
    {
      headerName: 'Actions',
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
  ])

  useEffect(() => {
    const getDiscahrge = async ipno => {
      const result = await axioslogin.get(`/WeWork/getDisc/${ipno}`)
      const { success, data } = result.data
      if (success === 1) {
        setTabledata(data)
      } else {
        warningNotify('please add Discharge details!')
      }
    }
    getDiscahrge(ipno)
  }, [ipno, count])
  return (
    <Fragment>
      <CusAgGridMast tableData={tabledata} columnDefs={column} height={600} />
    </Fragment>
  )
}

export default memo(DiscahrgeEventTable)
