import { Box, CssVarsProvider, Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import MonthlyPaidBills from '../PaidBills/MonthlyPaidBills';
import QuarterlyPaidBills from '../PaidBills/QuarterlyPaidBills';
import YearlyPaidBills from '../PaidBills/YearlyPaidBills';
import OtherPaidBills from '../PaidBills/OtherPaidBills';


const PaidBills = ({ billCount, setbillCount }) => {

    const [montBills, setmontBills] = useState([])
    const [quarBills, setQuarBills] = useState([])
    const [yearBills, setYearBills] = useState([])
    const [otherBills, setOtherBills] = useState([])

    useEffect(() => {
        const getMonthlyBills = async () => {
            const result = await axioslogin.get('/ItBillVieww/telemonthlyPaid');
            const { success, data } = result.data;
            if (success === 2) {
                setmontBills(data)
            } else {
                setmontBills([])
            }
        }
        getMonthlyBills()
    }, [])
    useEffect(() => {
        const getQaurterlyPaidBills = async () => {
            const result = await axioslogin.get('/ItBillVieww/teleQuarterPaid');
            const { success, data } = result.data;
            if (success === 2) {
                setQuarBills(data)
            } else {
                setQuarBills([])
            }
        }
        getQaurterlyPaidBills()
    }, [])
    useEffect(() => {
        const getYearPaidBills = async () => {
            const result = await axioslogin.get('/ItBillVieww/teleYearPaid');
            const { success, data } = result.data;
            if (success === 2) {
                setYearBills(data)
            } else {
                setYearBills([])
            }
        }
        getYearPaidBills()
    }, [])
    useEffect(() => {
        const getOtherPaidBills = async () => {
            const result = await axioslogin.get('/ItBillVieww/teleOthrPaid');
            const { success, data } = result.data;
            if (success === 2) {
                setOtherBills(data)
            } else {
                setOtherBills([])
            }
        }
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
                            // pt: 2,
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
                        <MonthlyPaidBills montBills={montBills} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <QuarterlyPaidBills quarBills={quarBills} />
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: 0 }} >
                        <YearlyPaidBills yearBills={yearBills} />
                    </TabPanel>
                    <TabPanel value={3} sx={{ p: 0 }}>
                        <OtherPaidBills otherBills={otherBills} />
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Box >
    )
}

export default memo(PaidBills)