import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy'
import React, { memo } from 'react'
import PeopleIcon from '@mui/icons-material/People'
import AssessmentIcon from '@mui/icons-material/Assessment'
import DayWisePatientsListTable from '../../CommonComponents/DayWisePatientsListTable'
import EndoMonthlyReport from '../MonthlyReport/EndoMonthlyReport'

const EndoDayWiseReport = ({
  viewData,
  qitype,
  dayFlag,
  fromDate,
  equipmentlist,
  ipViewReport,
  testCount,
  endoDays,
}) => {
  return (
    <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 240, p: 0.5 }}>
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
                  <PeopleIcon sx={{ color: '#555830', height: 25, width: 30 }} />
                  Patient List
                </Tab>
                <Tab disableIndicator sx={{}}>
                  <AssessmentIcon sx={{ color: '#555830', height: 25, width: 30 }} />
                  Report
                </Tab>
              </Box>
              <Box sx={{ flex: 2 }}></Box>
            </Box>
          </TabList>
          <TabPanel value={0} sx={{ p: 0, bgcolor: 'white' }}>
            <DayWisePatientsListTable
              viewData={viewData}
              ipViewReport={ipViewReport}
              qitype={qitype}
            />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0, bgcolor: '#b0bec5' }}>
            <Box>
              <EndoMonthlyReport
                viewData={viewData}
                ipViewReport={ipViewReport}
                dayFlag={dayFlag}
                searchDate={fromDate}
                testCount={testCount}
                equipmentlist={equipmentlist}
                endoDays={endoDays}
              />
            </Box>
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(EndoDayWiseReport)
