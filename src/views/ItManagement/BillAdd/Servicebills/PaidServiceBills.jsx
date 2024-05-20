import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import QuarterlyPaidBills from '../PaidBills/QuarterlyPaidBills'
import MonthlyPaidBills from '../PaidBills/MonthlyPaidBills'
import YearlyPaidBills from '../PaidBills/YearlyPaidBills'
import OtherPaidBills from '../PaidBills/OtherPaidBills'

const PaidServiceBills = () => {

    const [montBillsSer, setmontBillsSer] = useState([])
    const [quarBillsSer, setQuarBillsSer] = useState([])
    const [yearBillsSer, setYearBillsSer] = useState([])
    const [otherBillsSer, setOtherBillsSer] = useState([])

    useEffect(() => {

        const getMonthlyBills = async () => {
            const result = await axioslogin.get('/ItBillVieww/servicemonthlyPaid');
            const { success, data } = result.data;
            if (success === 2) {
                setmontBillsSer(data)
            } else {
                setmontBillsSer([])
            }
        }
        const getQaurterlyPaidBills = async () => {
            const result = await axioslogin.get('/ItBillVieww/serViceQuarterPaid');
            const { success, data } = result.data;
            if (success === 2) {
                setQuarBillsSer(data)
            } else {
                setQuarBillsSer([])
            }
        }
        const getYearPaidBills = async () => {
            const result = await axioslogin.get('/ItBillVieww/serviceYearPaid');
            const { success, data } = result.data;
            if (success === 2) {
                setYearBillsSer(data)
            } else {
                setYearBillsSer([])
            }
        }
        const getOtherPaidBills = async () => {
            const result = await axioslogin.get('/ItBillVieww/serviceOthrPaid');
            const { success, data } = result.data;
            if (success === 2) {
                setOtherBillsSer(data)
            } else {
                setOtherBillsSer([])
            }
        }
        getYearPaidBills()
        getMonthlyBills()
        getQaurterlyPaidBills()
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
                                bgcolor: '#3D5B59'
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', }}>
                            <Tab sx={{ flexGrow: 1 }}
                                disableIndicator
                            >   Monthly
                            </Tab>
                            <Tab sx={{ flexGrow: 1 }}
                                disableIndicator
                            >
                                Quarterly
                            </Tab>
                            <Tab sx={{ flexGrow: 1 }}
                                disableIndicator
                            > Yearly
                            </Tab>
                            <Tab sx={{ flexGrow: 1 }}
                                disableIndicator
                            >
                                Other Bills
                            </Tab>
                        </Box>

                    </TabList>
                    <TabPanel value={0} sx={{ p: 0, borderRadius: 0 }}>
                        <MonthlyPaidBills montBills={montBillsSer} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <QuarterlyPaidBills quarBills={quarBillsSer} />
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: 0 }} >
                        <YearlyPaidBills yearBills={yearBillsSer} />
                    </TabPanel>
                    <TabPanel value={3} sx={{ p: 0 }}>
                        <OtherPaidBills otherBills={otherBillsSer} />
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(PaidServiceBills)