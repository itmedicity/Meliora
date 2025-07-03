import React, { Fragment, useCallback, useEffect, memo, useState } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import LocalDiningSharpIcon from '@mui/icons-material/LocalDiningSharp'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { IconButton } from '@mui/material'
import { editicon } from 'src/color/Color'
import DietPlan from '../Diet/DietPlan'
import { Box, Paper } from '@mui/material'
import CardMaster from '../Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import NursingStationMeliSelect from '../CommonSelectCode/NursingStationMeliSelect'
const InPatientList = () => {
  const history = useNavigate()
  //state for setting table data
  const [tabledata, setTabledata] = useState([])
  // state for modal rendering
  const [ab, setAb] = useState(0)
  //setting data to modal
  const [data, setData] = useState([])
  //state for modal open
  const [open, setOpen] = useState(false)
  //state for nursing station
  const [nurse, setNurse] = useState(0)
  //state for table open
  const [table, setTable] = useState(0)
  //column title setting
  const [column] = useState([
    { headerName: 'Diet Patient No', field: 'dietpt_slno' },
    { headerName: 'IP No', field: 'ip_no' },
    { headerName: 'OP No', field: 'pt_no' },
    { headerName: 'Name', field: 'ptc_ptname', filter: 'true' },
    { headerName: 'Doctor', field: 'doc_name', filter: 'true' },
    { headerName: 'Bed', field: 'bdc_no' },
    { headerName: 'Room Type', field: 'rtc_desc' },
    { headerName: 'Room', field: 'rmc_desc' },

    {
      headerName: 'Diet Plan',
      cellRenderer: params => {
        if (params.data.plan_status === 1) {
          return (
            <IconButton disabled sx={{ color: editicon, paddingY: 0.5 }}>
              <LocalDiningSharpIcon />
            </IconButton>
          )
        } else {
          return (
            <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={() => dietPlan(params)}>
              <LocalDiningSharpIcon />
            </IconButton>
          )
        }
      },
    },
  ])
  //modal open and pass data when clicked on diet plan button
  const dietPlan = useCallback(params => {
    const data = params.api.getSelectedRows()
    setAb(1)
    setOpen(true)
    setData(data)
  }, [])
  //getting data against nursing station
  useEffect(() => {
    const getPatientList = async () => {
      if (nurse !== 0) {
        const result = await axioslogin.get(`/common/inpatientList/${nurse}`)
        const { success, data, message } = result.data
        if (success === 1) {
          setTabledata(data)
          setTable(1)
        } else if (success === 2) {
          setTabledata([])
          infoNotify(message)
        } else {
          warningNotify('Error occured contact EDP')
        }
      }
    }
    getPatientList()
  }, [nurse])

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  return (
    <Fragment>
      <CardMaster title="In Patient List" close={backtoSetting}>
        <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
          <Paper
            square
            elevation={3}
            sx={{
              pl: 1,
              pt: 1,
              pr: 1,
              pb: 1,
            }}
          >
            <Box
              sx={{
                width: '100%',
                pl: 1,
                pt: 0.5,
                pr: 1,
                pb: 0.5,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' },
              }}
            >
              <Box sx={{ width: '25%', pr: 1, mt: 1 }}>
                <Paper>
                  <NursingStationMeliSelect value={nurse} setValue={setNurse} />
                </Paper>
              </Box>
            </Box>
          </Paper>
          <Box sx={{ mt: 1 }}>
            {table === 1 ? <CusAgGridMast columnDefs={column} tableData={tabledata} /> : null}
          </Box>
          {ab === 1 ? <DietPlan open={open} setOpen={setOpen} data={data} /> : null}
        </Box>
      </CardMaster>
    </Fragment>
  )
}
export default memo(InPatientList)
