import { Avatar, Box, CssVarsProvider, Dropdown, Menu, MenuButton, MenuItem, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Divider, Grid, Paper } from '@mui/material'
import EngineeringIcon from '@mui/icons-material/Engineering'
import ChecklistIcon from '@mui/icons-material/Checklist'
import FeedbackIcon from '@mui/icons-material/Feedback'
import EditNoteIcon from '@mui/icons-material/EditNote'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ListDivider from '@mui/joy/ListDivider'
import ListMenuForIP from './ListMenuForIP'
import { infoNotify } from 'src/views/Common/CommonCode'
import { useNavigate } from 'react-router-dom'

const PatientDetailsView = ({ nsName, setListFlag }) => {
  const [formFlag, setformFlag] = useState(0)
  const [regFormFlag, setRegFormFlag] = useState(0)
  const [modalopen, setModalOpen] = useState(false)
  const [ptDetails, setptDetails] = useState([])
  const [addFlag, setaddFlag] = useState(0)
  const [detailFlag, setDetailFlag] = useState(0)
  const history = useNavigate()
  const backtoHome = useCallback(() => {
    history('/Home/feedback')
    setListFlag(0)
    setDetailFlag(0)
  }, [history, setListFlag])

  const ipList = [
    {
      ipno: 1,
      ptid: 'K-00004752',
      ptname: 'ADHYA',
      bed: 'A017 AC',
      doctor: 'ANANTHAKRISHNAN S',
      room: 1,
      complnt: 1,
      incident: 0,
      feedback: 0
    },
    {
      ipno: 2,
      ptid: 'L-00047321',
      ptname: 'DILEEP S',
      bed: 'A026 NR',
      doctor: 'AFFIN A',
      room: 0,
      complnt: 0,
      incident: 0,
      feedback: 0
    },
    {
      ipno: 3,
      ptid: 'M-00000143',
      ptname: 'APPU',
      bed: 'A015 AC',
      doctor: 'ASWIN M NAIR',
      room: 0,
      complnt: 1,
      incident: 1,
      feedback: 0
    },
    {
      ipno: 4,
      ptid: 'N-00045120',
      ptname: 'JIBIN WILLAM',
      bed: 'A016 NR',
      doctor: 'JUMALY GEORGE',
      room: 1,
      complnt: 1,
      incident: 1,
      feedback: 0
    },
    {
      ipno: 5,
      ptid: 'N-00008541',
      ptname: 'JAYANANDA .K  ',
      bed: 'A026 AC',
      doctor: 'ARUN KUMAR A S',
      room: 1,
      complnt: 0,
      incident: 1,
      feedback: 0
    },
    {
      ipno: 6,
      ptid: '',
      ptname: '',
      bed: 'A036 AC',
      doctor: 'ARUN KUMAR A S',
      room: 0,
      complnt: 0,
      incident: 0,
      feedback: 0
    },

    {
      ipno: 1,
      ptid: 'K-00004752',
      ptname: 'ADHYA',
      bed: 'A017 AC',
      doctor: 'ANANTHAKRISHNAN S',
      room: 1,
      complnt: 1,
      incident: 0,
      feedback: 0
    },
    {
      ipno: 2,
      ptid: 'L-00047321',
      ptname: 'DILEEP S',
      bed: 'A026 NR',
      doctor: 'AFFIN A',
      room: 0,
      complnt: 0,
      incident: 0,
      feedback: 0
    },
    {
      ipno: 3,
      ptid: 'M-00000143',
      ptname: 'APPU',
      bed: 'A015 AC',
      doctor: 'ASWIN M NAIR',
      room: 0,
      complnt: 1,
      incident: 1,
      feedback: 0
    },
    {
      ipno: 4,
      ptid: 'N-00045120',
      ptname: 'JIBIN WILLAM',
      bed: 'A016 NR',
      doctor: 'JUMALY GEORGE',
      room: 1,
      complnt: 1,
      incident: 0,
      feedback: 0
    },
    {
      ipno: 5,
      ptid: 'N-00008541',
      ptname: 'JAYANANDA .K  ',
      bed: 'A026 AC',
      doctor: 'ARUN KUMAR A S',
      room: 1,
      complnt: 0,
      incident: 1,
      feedback: 0
    },
    {
      ipno: 6,
      ptid: '',
      ptname: '',
      bed: 'A036 AC',
      doctor: 'ARUN KUMAR A S',
      room: 0,
      complnt: 0,
      incident: 0,
      feedback: 0
    }
  ]
  const capitalizeWords = str =>
    str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  const iconStyle = {
    height: 25,
    width: 25,
    ml: 1,
    borderRadius: 2,
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
    p: 0.3,
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }

  const iconStyleAfterSave = {
    height: 25,
    width: 25,
    ml: 1,
    bgcolor: '#388E3C',
    color: 'white',
    borderRadius: 5,
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
    p: 0.3,
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
  const iconStyleIncident = {
    height: 25,
    width: 25,
    ml: 1,
    bgcolor: '#D32F2F',
    color: 'white',
    borderRadius: 5,
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
    p: 0.3,
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
  const menuIconStyle = {
    p: 1,
    bgcolor: 'background.paper',
    boxShadow: 1,
    borderRadius: 2,
    position: 'relative',
    '&:before': {
      content: '""',
      width: 0,
      height: 0,
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderTop: '8px solid background.paper',
      position: 'absolute',
      bottom: -8,
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }
  const AddDetails = useCallback(val => {
    const { ptid } = val
    if (ptid === '') {
      infoNotify('Room Is vacant')
      setaddFlag(0)
    } else {
      setaddFlag(1)
    }
  }, [])

  const RoomChecklistDetails = useCallback(val => {
    setformFlag(1)
    setptDetails(val)
    setRegFormFlag(1)
  }, [])
  const RegComplaintDetails = useCallback(val => {
    setformFlag(1)
    setptDetails(val)
    setRegFormFlag(2)
  }, [])
  const RegIncidentDetails = useCallback(val => {
    setformFlag(1)
    setptDetails(val)
    setModalOpen(true)
    setRegFormFlag(3)
  }, [])
  const FeedbackDetails = useCallback(val => {
    setformFlag(1)
    setptDetails(val)
    setRegFormFlag(4)
  }, [])
  const handleClose = useCallback(() => {
    setModalOpen(false)
    setformFlag(0)
  }, [setModalOpen])

  const DetailedView = useCallback(val => {
    const { ptid, room, complnt, incident, feedback } = val
    if (ptid === '') {
      infoNotify('Room Is vacant')
      setDetailFlag(0)
      setformFlag(0)
    } else if (room === 0 && complnt === 0 && incident === 0 && feedback === 0) {
      infoNotify('No Entries Recorded')
      setDetailFlag(0)
      setformFlag(0)
    } else {
      setptDetails(val)
      setDetailFlag(1)
      setformFlag(1)
    }
  }, [])
  return (
    <Fragment>
      {formFlag === 1 ? (
        <ListMenuForIP
          setformFlag={setformFlag}
          ptDetails={ptDetails}
          regFormFlag={regFormFlag}
          nsName={nsName}
          open={modalopen}
          handleClose={handleClose}
          detailFlag={detailFlag}
          setDetailFlag={setDetailFlag}
        />
      ) : (
        <Box sx={{ maxHeight: '79vh' }}>
          <Box sx={{ display: 'flex', height: 42 }}>
            <Box sx={{ flex: 1, fontSize: 19, pt: 1, pl: 2 }}>{nsName}</Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                flex: 1,
                fontSize: 20,
                pt: 0.8,
                pr: 0.2
              }}
            >
              <Tooltip title="Close" placement="bottom">
                <Avatar size="sm" variant="plain" sx={{ bgcolor: '#F5F5F5' }}>
                  <CloseIcon
                    sx={{
                      cursor: 'pointer',
                      size: 'lg',
                      fontSize: 20,
                      color: '#424242',
                      '&:hover': { color: 'red' }
                    }}
                    onClick={backtoHome}
                  />
                </Avatar>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ height: window.innerHeight - 280, overflow: 'auto' }}>
            <Grid container spacing={0}>
              {ipList.map((val, index) => (
                <Grid item key={index} xs={12} sm={5} md={4} lg={3}>
                  <Box sx={{ m: 0.5 }}>
                    <Box sx={{ bgcolor: '#F0F4F8', borderRadius: 2, boxShadow: 3, pb: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: 100,
                          p: 2,
                          mb: 1,
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: '#E0E7EE' }
                        }}
                        onClick={() => DetailedView(val)}
                      >
                        <Typography variant="h6" component="div" sx={{ fontSize: 18, fontWeight: 600, color: '#333' }}>
                          {val.bed}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ fontSize: 18, fontWeight: 600, color: '#333' }}>
                          {val.ptid}
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ fontSize: 16, color: '#555' }}>
                          {capitalizeWords(val.ptname)}
                        </Typography>
                      </Box>
                      <Divider flexItem sx={{ borderColor: '#BDBDBD' }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#fff' }}>
                        {val.ptid === '' ? (
                          <Box sx={{ display: 'flex', pl: 1, pt: 1 }}>
                            <Tooltip title="Room Checklist" placement="bottom">
                              <ChecklistIcon sx={iconStyle} />
                            </Tooltip>
                            <Tooltip title="Reg. Complaint" placement="bottom">
                              <EngineeringIcon sx={iconStyle} />
                            </Tooltip>
                            <Tooltip title="Incident Reg." placement="bottom">
                              <EditNoteIcon sx={iconStyle} />
                            </Tooltip>
                            <Tooltip title="Feedback" placement="bottom">
                              <FeedbackIcon sx={iconStyle} />
                            </Tooltip>
                          </Box>
                        ) : (
                          <Box sx={{ display: 'flex', pl: 1, pt: 1 }}>
                            <Tooltip title="Room Checklist" placement="bottom">
                              <ChecklistIcon
                                sx={val.room === 1 ? iconStyleAfterSave : iconStyle}
                                onClick={() => RoomChecklistDetails(val)}
                              />
                            </Tooltip>
                            <Tooltip title="Reg. Complaint" placement="bottom">
                              <EngineeringIcon
                                sx={val.complnt === 1 ? iconStyleIncident : iconStyle}
                                onClick={() => RegComplaintDetails(val)}
                              />
                            </Tooltip>
                            <Tooltip title="Incident Reg." placement="bottom">
                              <EditNoteIcon
                                sx={val.incident === 1 ? iconStyleIncident : iconStyle}
                                onClick={() => RegIncidentDetails(val)}
                              />
                            </Tooltip>
                            <Tooltip title="Feedback" placement="bottom">
                              <FeedbackIcon sx={iconStyle} onClick={() => FeedbackDetails(val)} />
                            </Tooltip>
                          </Box>
                        )}
                        <CssVarsProvider>
                          <Dropdown>
                            <MenuButton sx={{ p: 0, m: 0.5, border: 0, pr: 1 }}>
                              <Tooltip title="Add" placement="right">
                                <AddBoxIcon
                                  sx={{ color: '#757575', height: 28, width: 28 }}
                                  onClick={() => AddDetails(val)}
                                />
                              </Tooltip>
                            </MenuButton>
                            {addFlag === 1 ? (
                              <Menu sx={menuIconStyle}>
                                <MenuItem onClick={() => RoomChecklistDetails(val)}>Room Checklist</MenuItem>
                                <ListDivider />
                                <MenuItem onClick={() => RegComplaintDetails(val)}>Complaint Reg.</MenuItem>
                                <ListDivider />
                                <MenuItem onClick={() => RegIncidentDetails(val)}>Incident Reg.</MenuItem>
                                <ListDivider />
                                <MenuItem onClick={() => FeedbackDetails(val)}>Feedback</MenuItem>
                              </Menu>
                            ) : null}
                          </Dropdown>
                        </CssVarsProvider>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              position: 'relative',
              m: 1,
              borderRadius: 2,
              boxShadow: 3,
              '@media (max-width: 600px)': {
                position: 'relative',
                mt: 1
              }
            }}
          >
            <Box
              sx={{
                border: '1px solid lightgrey',
                bgcolor: '#388E3C',
                borderRadius: 8,
                boxShadow: 5,
                p: 0.5,
                fontSize: 10,
                fontWeight: 550,
                color: 'white'
              }}
            >
              CheckList Added/Completed
            </Box>
            <Box
              sx={{
                border: '1px solid lightgrey',
                bgcolor: '#d32f2f',
                borderRadius: 8,
                boxShadow: 5,
                p: 0.5,
                fontSize: 10,
                fontWeight: 550,
                color: 'white'
              }}
            >
              Complaint Registered
            </Box>
            <Box
              sx={{
                border: '1px solid lightgrey',
                borderRadius: 8,
                boxShadow: 5,
                p: 0.5,
                fontSize: 10,
                fontWeight: 550
              }}
            >
              No Entries Reported
            </Box>
          </Box>
        </Box>
      )}
    </Fragment>
  )
}
export default memo(PatientDetailsView)
