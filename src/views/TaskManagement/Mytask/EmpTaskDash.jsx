import React, { memo, useEffect, useState } from 'react'
import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'
import { Box, CssVarsProvider, Typography } from '@mui/joy'
import Avatar from '@mui/joy/Avatar'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { Paper } from '@mui/material'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import LockResetIcon from '@mui/icons-material/LockReset'
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HistorySharpIcon from '@mui/icons-material/HistorySharp'
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import EmpAllTask from './EmpAllTask'
import EmpOverDueTaskList from './EmpOverDueTaskList'
import EmpCompletedTaskList from './EmpCompletedTaskList'
import MyProgressView from './MyProgressView'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import MyPerformance from './MyPerformance'
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined'
import { taskColor } from 'src/color/Color'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import DeligatedTask from './DeligatedTask'

const EmpTaskDash = () => {


  const id = useSelector((state) => state.LoginUserData.empid)
  const [employeeOverDue, setemployeeOverDue] = useState([])
  const [employeeeCompleted, setemployeeeCompleted] = useState([])
  const [employeeOnProgress, setemployeeOnProgress] = useState([])
  const [employeeInComplete, setemployeeInComplete] = useState([])
  const [employeeOnHold, setemployeeOnHold] = useState([])
  const [employeeOnPending, setemployeeOnPending] = useState([])
  const [projectcount, setprojectcount] = useState(0)


  useEffect(() => {
    const getOverDueEmpTable = async () => {
      const result = await axioslogin.get(`TmTableView/employeeOverDue/${id}`)
      const { data, success } = result.data
      if (success === 2) {
        setemployeeOverDue(data)
      } else {
        setemployeeOverDue([])
      }
    }
    const getEmpCompletedTable = async () => {
      const result = await axioslogin.get(`TmTableView/employeeCompleted/${id}`)
      const { data, success } = result.data
      if (success === 2) {
        setemployeeeCompleted(data)
      } else {
        setemployeeeCompleted([])
      }
    }
    const getEmpOnProgressTable = async () => {
      const result = await axioslogin.get(`TmTableView/employeeOnProgress/${id}`)
      const { data, success } = result.data
      if (success === 2) {
        setemployeeOnProgress(data)
      } else {
        setemployeeOnProgress([])
      }
    }
    const getEmpInCompleteTable = async () => {
      const result = await axioslogin.get(`TmTableView/employeeInCompleted/${id}`)
      const { data, success } = result.data
      if (success === 2) {
        setemployeeInComplete(data)
      } else {
        setemployeeInComplete([])
      }
    }
    const getEmpOnHoldTable = async () => {
      const result = await axioslogin.get(`TmTableView/employeeOnHold/${id}`)
      const { data, success } = result.data
      if (success === 2) {
        setemployeeOnHold(data)
      } else {
        setemployeeOnHold([])
      }
    }
    const getOnPendingEmpTable = async () => {
      const result = await axioslogin.get(`TmTableView/employeeOnPending/${id}`)
      const { data, success } = result.data
      if (success === 2) {
        setemployeeOnPending(data)
      } else {
        setemployeeOnPending([])
      }
    }
    getOverDueEmpTable()
    getEmpCompletedTable()
    getEmpOnProgressTable()
    getEmpInCompleteTable()
    getEmpOnHoldTable()
    getOnPendingEmpTable()
  }, [id])

  return (
    <Paper sx={{ p: 0.5, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', borderBottom: 0.1, borderColor: 'lightgrey', height: 40 }}>
        <DashboardOutlinedIcon fontSize="medium" sx={{ color: taskColor.darkPurple, m: 1 }} />
        <Box sx={{ pt: 1.2, color: taskColor.DarkViolet, }}>My Task</Box>
      </Box>
      <Box sx={{ bgcolor: ' #DFE3ED', p: 0.3 }}>
        <Box sx={{ bgcolor: 'white', p: 0.5 }}>
          <Box
            sx={{
              flex: 1,
              m: 0.5,
              borderRadius: 2,
              bgcolor: '#E8F0F7',
              border: 1,
              borderColor: '#6699CC',
            }}
          >
            <List
              orientation="horizontal"
              variant="plain"
              sx={{
                borderRadius: 'sm',
                height: 50,
              }}
            >
              <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 15, display: 'flex' }}>
                <RestartAltOutlinedIcon sx={{ color: taskColor.DarkViolet, p: .1 }} />
                <Box sx={{ fontWeight: 500, color: taskColor.DarkViolet, fontSize: 13, }}>
                  Over Due
                </Box>
                <Avatar
                  color="neutral"
                  size="sm"
                  variant="outlined"
                  sx={{
                    bgcolor: 'white',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: taskColor.DarkViolet,
                    ml: .5
                  }}
                >
                  {employeeOverDue.length}
                </Avatar>
              </Box>
              <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />

              <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 15, display: 'flex' }}>
                <RotateRightIcon sx={{ color: taskColor.DarkViolet, p: .1 }} />
                <Box sx={{ fontWeight: 500, color: taskColor.DarkViolet, fontSize: 13, }}>
                  On Progress
                </Box>
                <Avatar
                  color="neutral"
                  size="sm"
                  variant="outlined"
                  sx={{
                    bgcolor: 'white',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: taskColor.DarkViolet,
                    ml: .5
                  }}

                >
                  {employeeOnProgress.length}
                </Avatar>
              </Box>
              <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />

              <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 15, display: 'flex' }}>
                <LockResetIcon sx={{ color: taskColor.DarkViolet, p: .1 }} />
                <Box sx={{ fontWeight: 500, color: taskColor.DarkViolet, fontSize: 13, }}>
                  On Hold
                </Box>
                <Avatar
                  color="neutral"
                  size="sm"
                  variant="outlined"
                  sx={{
                    bgcolor: 'white',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: taskColor.DarkViolet,
                    ml: .5
                  }}
                >
                  {employeeOnHold.length}
                </Avatar>
              </Box>
              <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />

              <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 15, display: 'flex' }}>
                <RunningWithErrorsIcon sx={{ color: taskColor.DarkViolet, p: .1 }} />
                <Box sx={{ fontWeight: 500, color: taskColor.DarkViolet, fontSize: 13, }}>
                  Pending
                </Box>
                <Avatar
                  color="neutral"
                  size="sm"
                  variant="outlined"
                  sx={{
                    bgcolor: 'white',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: taskColor.DarkViolet,
                    ml: .5
                  }}
                >
                  {employeeOnPending.length}
                </Avatar>
              </Box>
              <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />

              <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 15, display: 'flex' }}>
                <DataUsageIcon sx={{ color: taskColor.DarkViolet, p: .1 }} />
                <Box sx={{ fontWeight: 500, color: taskColor.DarkViolet, fontSize: 13, }}>
                  Not Started
                </Box>
                <Avatar
                  color="neutral"
                  size="sm"
                  variant="outlined"
                  sx={{
                    bgcolor: 'white',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: taskColor.DarkViolet,
                    ml: .5
                  }}
                >
                  {employeeInComplete.length}
                </Avatar>
              </Box>
              <ListDivider sx={{ bgcolor: '#6699CC' }} inset="gutter" />

              <Box sx={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 15, display: 'flex' }}>
                <CheckCircleOutlinedIcon sx={{ color: taskColor.DarkViolet, p: .1 }} />
                <Box sx={{ fontWeight: 500, color: taskColor.DarkViolet, fontSize: 13, }}>
                  Completed
                </Box>
                <Avatar
                  color="neutral"
                  size="sm"
                  variant="outlined"
                  sx={{
                    bgcolor: 'white',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: taskColor.DarkViolet,
                    ml: .5
                  }}

                >
                  {employeeeCompleted.length}
                </Avatar>
              </Box>
            </List>
          </Box>
          <Box
            sx={{
              flex: 1,
              mx: 0.5,
              borderRadius: 2,
              border: 1,
              borderColor: '#6699CC',
              p: 0.5
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mt: 1, mx: 0.5 }}>
                <CssVarsProvider>
                  <Avatar color="neutral" size="lg" variant="outlined">
                    <TrackChangesIcon sx={{ height: 35, width: 35 }} />
                  </Avatar>
                </CssVarsProvider>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 20, fontWeight: 600, color: 'grey', pt: 0.7 }}>Task Management</Typography>
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'grey', pl: 0.5 }}>
                  My Task & Progress
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 1 }}>
              <CssVarsProvider>
                <Tabs
                  defaultValue={0}
                  size="sm"
                  sx={{
                    display: 'flex',
                    mt: 0.5
                  }}
                >
                  <TabList
                    disableUnderline
                    sx={{
                      p: 0,
                      [`& .${tabClasses.root}[aria-selected="true"]`]: {
                        borderBottom: 3,
                        bgcolor: 'white'
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'white'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flex: 1,
                        mb: 0,
                        borderBottom: 1,
                        borderColor: 'lightgray'
                      }}
                    >
                      <Box sx={{ display: 'flex', px: 0.5, justifyContent: "space-between" }}>
                        <Tab disableIndicator sx={{ color: '#52688F', fontWeight: 800, width: 120 }}>
                          <ListAltIcon sx={{ color: '#52688F' }} />All Tasks
                        </Tab>
                        <Tab disableIndicator sx={{ color: '#710117', fontWeight: 800, width: 120 }}>
                          <HistorySharpIcon sx={{ color: '#710117' }} />Over Due
                        </Tab>
                        <Tab disableIndicator sx={{ color: '#478C5C', fontWeight: 800, width: 120 }}>
                          <TaskAltSharpIcon sx={{ color: '#478C5C' }} />Completed
                        </Tab>
                        <Tab disableIndicator sx={{ fontWeight: 800, color: taskColor.darkPurple, width: 160 }}>
                          <SupervisorAccountIcon sx={{ color: taskColor.darkPurple }} />Deligated Tasks
                        </Tab>
                        <Tab disableIndicator sx={{ color: '#67595E', fontWeight: 800, width: 120 }}>
                          <SignalCellularAltOutlinedIcon sx={{ color: '#67595E' }} />MyProgress
                        </Tab>
                        <Tab disableIndicator sx={{ fontWeight: 800, color: '#3374A0', width: 200 }}>
                          <AdsClickIcon sx={{ color: '#3374A0' }} />Performance Sheet
                        </Tab>

                      </Box>

                    </Box>
                  </TabList>
                  <TabPanel value={0} sx={{ p: 0 }}>
                    <EmpAllTask
                      projectcount={projectcount}
                      setprojectcount={setprojectcount}
                    />
                  </TabPanel>
                  <TabPanel value={1} sx={{ p: 0 }}>
                    <EmpOverDueTaskList
                      projectcount={projectcount}
                      setprojectcount={setprojectcount}
                    />
                  </TabPanel>
                  <TabPanel value={2} sx={{ p: 0 }}>
                    <EmpCompletedTaskList
                      projectcount={projectcount}
                      setprojectcount={setprojectcount}
                    />
                  </TabPanel>
                  <TabPanel value={3} sx={{ p: 0 }}>
                    <DeligatedTask
                      projectcount={projectcount}
                      setprojectcount={setprojectcount} />
                  </TabPanel>
                  <TabPanel value={4} sx={{ p: 0 }}>
                    <MyProgressView />
                  </TabPanel>
                  <TabPanel value={5} sx={{ p: 0 }}>
                    <MyPerformance />
                  </TabPanel>
                </Tabs>
              </CssVarsProvider>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default memo(EmpTaskDash)
