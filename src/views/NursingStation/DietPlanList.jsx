import React, { Fragment, useCallback, useEffect, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from '../Axios/Axios'
import { warningNotify, infoNotify } from '../Common/CommonCode'
import CardCloseOnly from '../Components/CardCloseOnly'
import CusAgGridMast from '../Components/CusAgGridMast'
import { Box, Paper } from '@mui/material'
import NursingStationMeliSelect from '../CommonSelectCode/NursingStationMeliSelect'
const DietPlanList = () => {
  const history = useNavigate()
  //state for setting table data
  const [tabledata, setTabledata] = useState([])
  const [nurse, setNurse] = useState(0)
  //column title setting
  const [column] = useState([
    { headerName: 'Patient  No', field: 'pt_no' },
    { headerName: 'Diet  No', field: 'dietpt_slno' },
    { headerName: 'Name', field: 'ptc_ptname', filter: 'true' },
    { headerName: 'Bed', field: 'bdc_no' },
    { headerName: 'Diet', field: 'diet_name' },
    { headerName: 'Diet Approval', field: 'plan status' }
  ])
  //get diet planned patient list
  useEffect(() => {
    const getDietpatientList = async () => {
      const result = await axioslogin.get(`/dietplan/AllList/${nurse}`)
      const { success, data, message } = result.data
      if (success === 1) {
        setTabledata(data)
      } else if (success === 2) {
        setTabledata([])
        infoNotify(message)
      } else {
        warningNotify('Error occured contact EDP')
      }
    }
    getDietpatientList()
  }, [nurse])
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  return (
    <Fragment>
      <CardCloseOnly title="Diet Plan List" close={backtoSetting}>
        {' '}
        <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
          <Paper
            square
            elevation={3}
            sx={{
              pl: 1,
              pt: 1,
              pr: 1,
              pb: 1
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
                flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
              }}
            >
              <Box sx={{ width: '25%', pr: 1, mt: 1 }}>
                <Paper>
                  <NursingStationMeliSelect value={nurse} setValue={setNurse} />
                </Paper>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ width: '100%', p: 1 }}>
          <CusAgGridMast columnDefs={column} tableData={tabledata} />
        </Box>
      </CardCloseOnly>
    </Fragment>
  )
}
export default memo(DietPlanList)
