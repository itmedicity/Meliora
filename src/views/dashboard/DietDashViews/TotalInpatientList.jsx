import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useNavigate } from 'react-router-dom'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import { Box } from '@mui/system'
import { getTotalInPateint } from 'src/redux/actions/TotalInPateintList.action'

const TotalInpatientList = () => {
  //for routing
  const history = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTotalInPateint())
  }, [dispatch])

  const TotalIpPatient = useSelector(state => {
    return state.setTotalInPateint.InPateintList
  })

  //data setting in table
  const [column] = useState([
    { headerName: 'Sl No', field: 'dietpt_slno', autoHeight: true, wrapText: true, width: 150 },
    {
      headerName: 'Ip No',
      field: 'ip_no',
      filter: 'true',
      autoHeight: true,
      wrapText: true,
      width: 150,
    },
    { headerName: 'Pt No', field: 'pt_no', autoHeight: true, wrapText: true, width: 180 },
    {
      headerName: 'Pateint Name',
      field: 'ptc_ptname',
      filter: 'true',
      autoHeight: true,
      wrapText: true,
      width: 280,
    },
    {
      headerName: 'Ip Date',
      field: 'ipd_date',
      filter: 'true',
      autoHeight: true,
      wrapText: true,
      width: 180,
    },
    { headerName: 'Sex', field: 'ptc_sex', width: 200, autoHeight: true, wrapText: true },
    {
      headerName: 'Nursing Station',
      field: 'nsc_desc',
      filter: 'true',
      autoHeight: true,
      wrapText: true,
      width: 200,
    },
    { headerName: 'Room', field: 'rmc_desc', autoHeight: true, wrapText: true, width: 200 },
    { headerName: 'Doctor Name', field: 'doctor', autoHeight: true, wrapText: true, width: 250 },
  ])

  //Close function
  const backToSetting = useCallback(() => {
    history(`/Home`)
  }, [history])
  return (
    <CardCloseOnly title="Total In_pateint List" close={backToSetting}>
      <Box sx={{ p: 1 }}>
        <CusAgGridForMain columnDefs={column} tableData={TotalIpPatient} />
      </Box>
    </CardCloseOnly>
  )
}

export default memo(TotalInpatientList)
