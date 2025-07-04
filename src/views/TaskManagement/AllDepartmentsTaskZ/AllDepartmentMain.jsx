import { Avatar, Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs, Typography, tabClasses } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AllTaskListx from './AllTaskListx'
import ByProjects from './ByProjects'
import CreateTaskInAllDept from './CreateTaskInAllDept'
import AllGoalsList from './AllGoalsList'
import RadarIcon from '@mui/icons-material/Radar'
import AllProjectsList from './AllProjectsList'
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone'
import RejectedTasks from './RejectedTasks'
import PendingActionsSharpIcon from '@mui/icons-material/PendingActionsSharp'
import PendingAssingments from './PendingAssingments'

const AllDepartmentMain = () => {
  const [tableCount, setTableCount] = useState(0)
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)

  const addModal = useCallback(() => {
    setAddModalFlag(1)
    setaddModalOpen(true)
  }, [])

  return (
    <Paper sx={{ pb: 0.3, bgcolor: '#DFE3ED' }}>
      {AddModalFlag === 1 ? (
        <CreateTaskInAllDept
          open={addModalOpen}
          tableCount={tableCount}
          setTableCount={setTableCount}
          setAddModalFlag={setAddModalFlag}
          setaddModalOpen={setaddModalOpen}
        />
      ) : null}
      <Box
        sx={{
          flex: 1,
          height: 35,
          borderBottom: 1,
          borderColor: 'lightgrey',
          pt: 0.8,
          pl: 0.8,
          color: '#C7C8CB',
          bgcolor: 'white'
        }}
      >
        All Department Task
      </Box>
      <Box
        sx={{
          flex: 1,
          border: 0.1,
          m: 0.3,
          borderColor: '#EAEAEA',
          borderRadius: 1,
          bgcolor: 'white'
        }}
      >
        <Box sx={{ mt: 1, display: 'flex' }}>
          <Box sx={{ mt: 0.8, mx: 0.5 }}>
            <CssVarsProvider>
              <Avatar color="neutral" size="lg" variant="outlined">
                <TrackChangesIcon sx={{ height: 35, width: 35 }} />
              </Avatar>
            </CssVarsProvider>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 600, color: 'grey', pt: 0.5 }}>Task Management</Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: 'grey', pl: 0.5 }}>
              Goal,Projects & Tasks
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mx: 6,
            width: 155,
            color: 'black',
            bgcolor: '#79A9F5',
            boxShadow: 1,
            borderRadius: 30,
            border: 1,
            textAlign: 'center',
            borderColor: '#4B7BF5',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#4B7BF5' }
          }}
          onClick={addModal}
        >
          {' '}
          + Create New
        </Box>
        <Box sx={{ mt: 2 }}>
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
                  <Box sx={{ flex: 2, display: 'flex', px: 0.5 }}>
                    <Tab disableIndicator sx={{ color: '#8C5249', fontWeight: 800, width: 140 }}>
                      <AccountTreeIcon sx={{ color: '#8C5249' }} />
                      &nbsp;By Projects
                    </Tab>
                    <Tab disableIndicator sx={{ color: '#52688F', fontWeight: 800, width: 110 }}>
                      <ListAltIcon sx={{ color: '#52688F' }} />
                      &nbsp;All Tasks
                    </Tab>
                    <Tab disableIndicator sx={{ color: '#613659', fontWeight: 800, width: 200 }}>
                      <PendingActionsSharpIcon sx={{ color: '#613659' }} />
                      &nbsp;Pending Acceptance
                    </Tab>
                    <Tab disableIndicator sx={{ color: '#74112F', fontWeight: 800, width: 200 }}>
                      <AccountTreeTwoToneIcon sx={{ color: '#74112F' }} />
                      &nbsp;Task Under Queries
                    </Tab>
                    <Tab disableIndicator sx={{ color: '#177DBB', fontWeight: 800, width: 100 }}>
                      <RadarIcon sx={{ color: '#177DBB' }} />
                      &nbsp;Goals
                    </Tab>
                    <Tab disableIndicator sx={{ color: '#0AADC7', fontWeight: 800, width: 100 }}>
                      <AccountTreeTwoToneIcon sx={{ color: '#0AADC7' }} />
                      &nbsp;Projects
                    </Tab>
                  </Box>
                  <Box sx={{ flex: 4 }}></Box>
                </Box>
              </TabList>
              <TabPanel value={0} sx={{ p: 0 }}>
                <ByProjects />
              </TabPanel>
              <TabPanel value={1} sx={{ p: 0 }}>
                <AllTaskListx />
              </TabPanel>
              <TabPanel value={2} sx={{ p: 0 }}>
                <PendingAssingments setTableCount={setTableCount} tableCount={tableCount} />
              </TabPanel>
              <TabPanel value={3} sx={{ p: 0 }}>
                <RejectedTasks setTableCount={setTableCount} tableCount={tableCount} />
              </TabPanel>
              <TabPanel value={4} sx={{ p: 0 }}>
                <AllGoalsList setTableCount={setTableCount} tableCount={tableCount} />
              </TabPanel>
              <TabPanel value={5} sx={{ p: 0 }}>
                <AllProjectsList setTableCount={setTableCount} tableCount={tableCount} />
              </TabPanel>
            </Tabs>
          </CssVarsProvider>
        </Box>
      </Box>
    </Paper>
  )
}

export default memo(AllDepartmentMain)
