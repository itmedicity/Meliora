import { Box, Grid, IconButton, Paper } from '@mui/material'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ComplaintDeptSelect from 'src/views/CommonSelectCode/ComplaintDeptSelect'
import SelectEscalation from 'src/views/CommonSelectCode/SelectEscalation'
import CardMaster from 'src/views/Components/CardMaster'
import EscalationMappingTable from './EscalationMappingTable'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import { editicon } from 'src/color/Color'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
// import EditButton from 'src/views/Components/EditButton';

const EscalationMapping = () => {
  const history = useNavigate()
  const [cmdept, setCmdept] = useState(0)
  const [escalation, setEscalation] = useState(0)
  const [cmdept1, setCmdept1] = useState(0)
  const [escalation1, setEscalation1] = useState(0)
  const [count, setCount] = useState(0)
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const postData1 = useMemo(() => {
    return {
      esc_mapping_slno: 1,
      escalaion_slno: escalation,
      complaint_dept: cmdept,
      create_user: id
    }
  }, [escalation, cmdept, id])
  const postData2 = useMemo(() => {
    return {
      esc_mapping_slno: 2,
      escalaion_slno: escalation1,
      complaint_dept: cmdept1,
      create_user: id
    }
  }, [escalation1, cmdept1, id])
  const reset1 = () => {
    setCmdept(0)
    setEscalation(0)
  }
  const reset2 = () => {
    setCmdept1(0)
    setEscalation1(0)
  }
  const escalationInsert1 = async () => {
    if (cmdept !== 0 && escalation !== 0) {
      const result = await axioslogin.post('/escalationmaping', postData1)
      const { message, success } = result.data
      if (success === 1) {
        succesNotify(message)
        setCount(count + 1)
        reset1()
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    } else {
      infoNotify('Please Select Credentials')
    }
  }
  const escalationInsert2 = async () => {
    if (cmdept1 !== 0 && escalation1 !== 0) {
      const result = await axioslogin.post('/escalationmaping', postData2)
      const { message, success } = result.data
      if (success === 1) {
        succesNotify(message)
        setCount(count + 1)
        reset2()
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    } else {
      infoNotify('Please Select Credentials ')
    }
  }
  const refreshWindow = useCallback(() => {
    reset1()
    reset2()
  }, [])
  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  return (
    <Fragment>
      <CardMaster title="Escalation Mapping" close={backtoSetting} refresh={refreshWindow}>
        <Box sx={{ p: 1 }}>
          <Grid container spacing={1}>
            <Grid item xl={5} lg={5}>
              <Grid container spacing={1}>
                <Paper sx={{ width: '100%' }} elevation={0}>
                  <Box
                    sx={{
                      display: 'flex',
                      wdith: '100%',
                      mt: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: '30%',
                        mt: 0.5,
                        p: 0.5
                      }}
                    >
                      IT
                    </Box>
                    <Box
                      sx={{
                        width: '40%',
                        mt: 1
                      }}
                    >
                      <ComplaintDeptSelect value={cmdept} setValue={setCmdept} />
                    </Box>
                    <Box
                      sx={{
                        width: '40%',
                        mt: 1,
                        ml: 0.5
                      }}
                    >
                      <SelectEscalation value={escalation} setValue={setEscalation} />
                    </Box>
                    <Box
                      sx={{
                        width: '10%'
                      }}
                    >
                      <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={escalationInsert1}>
                        <PublishedWithChangesOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      wdith: '100%'
                    }}
                  >
                    <Box
                      sx={{
                        width: '30%',
                        mt: 0.5,
                        p: 0.5
                      }}
                    >
                      Maintenance
                    </Box>
                    <Box
                      sx={{
                        width: '40%',
                        mt: 1
                      }}
                    >
                      <ComplaintDeptSelect value={cmdept1} setValue={setCmdept1} />
                    </Box>
                    <Box
                      sx={{
                        width: '40%',
                        mt: 1,
                        ml: 0.5
                      }}
                    >
                      <SelectEscalation value={escalation1} setValue={setEscalation1} />
                    </Box>
                    <Box
                      sx={{
                        width: '10%'
                      }}
                    >
                      <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={escalationInsert2}>
                        <PublishedWithChangesOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xl={7} lg={7}>
              <EscalationMappingTable count={count} />
            </Grid>
          </Grid>
        </Box>
      </CardMaster>
    </Fragment>
  )
}
export default EscalationMapping
