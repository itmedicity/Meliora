import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import QuarterlyPaidBills from '../PaidBills/QuarterlyPaidBills'
import YearlyPaidBills from '../PaidBills/YearlyPaidBills'
import OtherPaidBills from '../PaidBills/OtherPaidBills'
import MonthlyPaidBills from '../PaidBills/MonthlyPaidBills'

const PaidBillsSoftWare = () => {
  const [montBillsSoft, setmontBillsSoft] = useState([])
  const [quarBillsSoft, setQuarBillsSoft] = useState([])
  const [yearBillsSoft, setYearBillsSoft] = useState([])
  const [otherBillsSoft, setOtherBillsSoft] = useState([])

  useEffect(() => {
    const getMonthlyBills = async () => {
      const result = await axioslogin.get('/ItBillVieww/softwaremonthlyPaid')
      const { success, data } = result.data
      if (success === 2) {
        setmontBillsSoft(data)
      } else {
        setmontBillsSoft([])
      }
    }
    const getQaurterlyPaidBills = async () => {
      const result = await axioslogin.get('/ItBillVieww/softwareQuarterlyPaid')
      const { success, data } = result.data
      if (success === 2) {
        setQuarBillsSoft(data)
      } else {
        setQuarBillsSoft([])
      }
    }
    const getYearPaidBills = async () => {
      const result = await axioslogin.get('/ItBillVieww/softYearPaid')
      const { success, data } = result.data
      if (success === 2) {
        setYearBillsSoft(data)
      } else {
        setYearBillsSoft([])
      }
    }
    const getOtherPaidBills = async () => {
      const result = await axioslogin.get('/ItBillVieww/softOthrPaid')
      const { success, data } = result.data
      if (success === 2) {
        setOtherBillsSoft(data)
      } else {
        setOtherBillsSoft([])
      }
    }
    getMonthlyBills()
    getQaurterlyPaidBills()
    getYearPaidBills()
    getOtherPaidBills()
  }, [])

  return (
    <Box>
      <CssVarsProvider>
        <Tabs
          aria-label="Basic tabs"
          defaultValue={0}
          size="sm"
          sx={{
            display: 'flex',
          }}
        >
          <TabList
            disableUnderline
            sx={{
              bgcolor: 'background.level1',
              borderBottom: 0,
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: 'sm',
                borderBottom: 0,
                borderColor: 'white',
                color: 'white',
                borderRadius: 20,
                bgcolor: '#3D5B59',
              },
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Tab sx={{ flexGrow: 1 }} disableIndicator>
                {' '}
                Monthly
              </Tab>
              <Tab sx={{ flexGrow: 1 }} disableIndicator>
                Quarterly
              </Tab>
              <Tab sx={{ flexGrow: 1 }} disableIndicator>
                {' '}
                Yearly
              </Tab>
              <Tab sx={{ flexGrow: 1 }} disableIndicator>
                Other Bills
              </Tab>
            </Box>
          </TabList>
          <TabPanel value={0} sx={{ p: 0, borderRadius: 0 }}>
            <MonthlyPaidBills montBills={montBillsSoft} />
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0 }}>
            <QuarterlyPaidBills quarBills={quarBillsSoft} />
          </TabPanel>
          <TabPanel value={2} sx={{ p: 0 }}>
            <YearlyPaidBills yearBills={yearBillsSoft} />
          </TabPanel>
          <TabPanel value={3} sx={{ p: 0 }}>
            <OtherPaidBills otherBills={otherBillsSoft} />
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(PaidBillsSoftWare)
