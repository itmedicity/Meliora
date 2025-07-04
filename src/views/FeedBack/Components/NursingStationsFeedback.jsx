import {
  Box,
  Button,
  CssVarsProvider,
  Dropdown,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import PatientDetailsView from './PatientDetailsView'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const NursingStationsFeedback = () => {
  const [nurstation, setNurstation] = useState([])
  const [listFlag, setListFlag] = useState(0)
  const [nsName, setnsName] = useState()

  useEffect(() => {
    const getNursingStation = async () => {
      const result = await axioslogin.get('/feedback/viewns')
      return result.data
    }
    getNursingStation().then(value => {
      const { success, data } = value
      if (success === 1) {
        setNurstation(data)
      } else {
      }
    })
  }, [])
  const ViewPatientDetails = useCallback(val => {
    setListFlag(1)
    const { census_ns_name } = val
    setnsName(census_ns_name)
  }, [])

  const FeedbackDetails = useCallback(() => {
    // setformFlag(1)
    // setptDetails(val)
    // setRegFormFlag(4)
  }, [])

  return (
    <Fragment>
      {listFlag === 1 ? (
        <PatientDetailsView nsName={nsName} setListFlag={setListFlag} />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CssVarsProvider>
              <Dropdown>
                <MenuButton sx={{ p: 0, m: 0.5, border: 0 }}>
                  <Tooltip placement="right">
                    <MoreVertIcon sx={{ color: '#757575', height: 30, width: 30 }} />
                  </Tooltip>
                </MenuButton>
                <Menu sx={{ display: 'flex', alignItems: 'left' }}>
                  <MenuItem onClick={() => FeedbackDetails()}>Feedback</MenuItem>
                </Menu>
              </Dropdown>
            </CssVarsProvider>
          </Box>
          <Box sx={{ maxHeight: window.innerHeight - 250, overflow: 'auto' }}>
            <Box sx={{ p: 1 }}>
              <Grid container spacing={2}>
                {nurstation.map((val, index) => (
                  <Grid key={index} xs={12} sm={4} md={3} lg={2}>
                    <Paper
                      sx={{
                        padding: 2,
                        bgcolor: '#E3F2FD',
                        display: 'flex',
                        alignItems: 'center',
                        height: 100,
                        cursor: 'pointer',
                        ':hover': { bgcolor: '#E3EFF9' },
                      }}
                      onClick={() => ViewPatientDetails(val)}
                    >
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <Typography variant="h6" component="div">
                          {val.census_ns_name}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: '#BFD7ED',
                            borderRadius: '50%',
                            minWidth: 40,
                            minHeight: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            ':hover': { bgcolor: '#C3CEDA' },
                          }}
                          onClick={() => ViewPatientDetails(val)}
                        >
                          {val.census_ns_slno}
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </Fragment>
  )
}

export default memo(NursingStationsFeedback)
