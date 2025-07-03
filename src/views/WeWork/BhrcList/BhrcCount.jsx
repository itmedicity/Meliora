import { Box } from '@mui/system'
import React, { memo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getTotalBhrcList } from 'src/redux/actions/WeBhrcDetl.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CusReportDownloadClose from 'src/views/Components/CusReportDownloadClose'
import { Card } from '@mui/material'
import { Typography } from '@mui/material'

const BhrcCount = () => {
  const dispatch = useDispatch()
  const [addmission, setaddmission] = useState(false)
  const [discharge, setdischarge] = useState(false)
  const [TableData, setTableData] = useState([])
  const [checking, setchecking] = useState(0)

  const getadmmision = e => {
    if (e.target.checked === true) {
      setaddmission(true)
      setdischarge(false)
      setchecking(1)
    } else {
      setaddmission(false)
      setdischarge(false)
      setchecking(0)
    }
  }

  const getdischarge = e => {
    if (e.target.checked === true) {
      setdischarge(true)
      setaddmission(false)
      setchecking(2)
    } else {
      setdischarge(false)
      setaddmission(false)
      setchecking(0)
    }
  }

  const BhrcList = useSelector(state => {
    return state.getWeBhrcDetl.WeBhrcList || 0
  })

  useEffect(() => {
    dispatch(getTotalBhrcList())
  }, [dispatch])

  useEffect(() => {
    if (checking === 1) {
      const array =
        BhrcList &&
        BhrcList.filter(val => {
          return val.ipd_status === 'N' ? val : null
        })
      setTableData(array)
    } else if (checking === 2) {
      const array2 =
        BhrcList &&
        BhrcList.filter(val => {
          return val.ipd_status === 'Y' ? val : null
        })
      setTableData(array2)
    } else {
      const arrys =
        BhrcList &&
        BhrcList.filter(val => {
          return val
        })
      setTableData(arrys)
    }
  }, [checking, BhrcList])

  const [column] = useState([
    { headerName: 'MRDno', field: 'pt_no' },
    { headerName: 'AdNo', field: 'ip_no' },
    { headerName: 'Ad.Date', field: 'ipd_date', wrapText: true, autoHeight: true },
    { headerName: 'Name', field: 'ptc_ptname', filter: true },
    { headerName: 'consultant', field: 'doc_name', filter: true },
    { headerName: 'Room', field: 'rmc_desc' },
    { headerName: 'Bed', field: 'bdc_no' },
    { headerName: 'Shift_from', field: 'shift_from' },
    { headerName: 'Shift_to', field: 'shift_to' },
  ])

  return (
    <Card title="Bhrc patient">
      <Typography
        sx={{
          fontStyle: 'normal',
          color: '#263238',
          textAlign: 'left',
          fontSize: 18,
          pl: 3,
          pt: 2,
        }}
      >
        Bhrc patient List
      </Typography>
      <Box sx={{ width: '100%', p: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box
            sx={{
              width: '50%',
              pt: 1.5,
              pl: 2,
            }}
          >
            <CusCheckBox
              label="Admitted"
              color="primary"
              size="md"
              name="addmission"
              value={addmission}
              checked={addmission}
              onCheked={getadmmision}
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              pt: 1.5,
              pl: 2,
            }}
          >
            <CusCheckBox
              label="Discharged"
              color="primary"
              size="md"
              name="discharge"
              value={discharge}
              checked={discharge}
              onCheked={getdischarge}
            />
          </Box>
        </Box>
        <CusReportDownloadClose
          columnDefs={column}
          tableData={TableData}
          sx={{ width: '100%', height: 800 }}
        />
      </Box>
    </Card>
  )
}

export default memo(BhrcCount)
