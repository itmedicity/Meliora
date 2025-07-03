import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy'
import React, { memo } from 'react'
import PeopleIcon from '@mui/icons-material/People'
import ApprovalIcon from '@mui/icons-material/Approval'
import QiApprovalView from './QiApprovalView'
import DayWisePatientsListTable from '../../CommonComponents/DayWisePatientsListTable'

const EndoInchargeApproval = ({
  viewData,
  qitype,
  searchDate,
  qidept,
  setsearchFlag,
  equipmentlist,
  ipViewReport,
  testCount,
  endoDays,
}) => {
  return (
    <Box
      variant="outlined"
      sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220, bgcolor: '#F8F8F8', p: 0.5 }}
    >
      <CssVarsProvider>
        <Tabs
          defaultValue={0}
          size="sm"
          sx={{
            display: 'flex',
            mt: 0.5,
          }}
        >
          <TabList
            disableUnderline
            sx={{
              p: 0,
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                borderBottom: 5,
                bgcolor: 'white',
              },
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'white',
            }}
          >
            <Box sx={{ display: 'flex', flex: 1, mb: 0 }}>
              <Box sx={{ flex: 3, display: 'flex', px: 0.5 }}>
                <Tab disableIndicator sx={{}}>
                  <ApprovalIcon sx={{ color: '#555830', height: 25, width: 30 }} />
                  Approval
                </Tab>
                <Tab disableIndicator sx={{}}>
                  <PeopleIcon sx={{ color: '#555830', height: 25, width: 30 }} />
                  Patient List
                </Tab>
              </Box>
              <Box sx={{ flex: 2 }}></Box>
            </Box>
          </TabList>
          <TabPanel value={0} sx={{ p: 0, bgcolor: '#b0bec5' }}>
            <QiApprovalView
              viewData={viewData}
              searchDate={searchDate}
              setsearchFlag={setsearchFlag}
              qidept={qidept}
              ipViewReport={ipViewReport}
              testCount={testCount}
              equipmentlist={equipmentlist}
              endoDays={endoDays}
            />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0, bgcolor: 'white' }}>
            <DayWisePatientsListTable
              viewData={viewData}
              qitype={qitype}
              ipViewReport={ipViewReport}
            />
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(EndoInchargeApproval)
