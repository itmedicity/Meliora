import { Box, Chip, Tab, TabList, TabPanel, Tabs, tabClasses, } from '@mui/joy'
import React, { memo, useEffect, useState, } from 'react'
import { isAfter, startOfMonth, startOfYear } from 'date-fns';
import format from 'date-fns/format'
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import MonthlyBill from '../Monthly/MonthlyBill';
import QuaterlyBill from '../Quaterly/QuaterlyBill';
import YearlyBill from '../Yearly/YearlyBill';
import OtherBills from '../OtherBill/OtherBills';

const ServiceMain = ({ billCount, setbillCount }) => {

    const [monthlydata, setMonthlydata] = useState([])
    const [quaterlydata, setQuaterlydata] = useState([])
    const [yearlydata, setYearlydata] = useState([])
    const [otherData, setOtherData] = useState([])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    useEffect(() => {
        const getUnpaidBillsServMonthly = async () => {
            const result = await axioslogin.get('ItBillAdd/getUnpaidBillsServMonthly')
            const { success, data } = result.data
            if (success === 2) {
                setMonthlydata(data)
            } else {
                setMonthlydata([])
            }
        }
        const getUnpaidBillsSerQuarter = async () => {
            const result = await axioslogin.get('ItBillAdd/getUnpaidBillsSerQuarter')
            const { success, data } = result.data
            if (success === 2) {
                setQuaterlydata(data)
            } else {
                setQuaterlydata([])
            }
        }
        const getUnpaidBillsSerYear = async () => {
            const result = await axioslogin.get('ItBillAdd/getUnpaidBillsSerYear')
            const { success, data } = result.data
            if (success === 2) {
                setYearlydata(data)
            } else {
                setYearlydata([])
            }
        }
        const getUnpaidBillsSerOther = async () => {
            const result = await axioslogin.get('ItBillAdd/otherServiceBillViewinDash')
            const { success, data } = result.data
            if (success === 2) {
                setOtherData(data)
            } else {
                setOtherData([])
            }
        }
        getUnpaidBillsServMonthly()
        getUnpaidBillsSerQuarter()
        getUnpaidBillsSerYear()
        getUnpaidBillsSerOther()
    }, [billCount])

    useEffect(() => {
        const currentmonth = format(new Date(startOfMonth(new Date())), "yyyy-MM-dd")
        const today = new Date();
        const currentYear = today.getFullYear();
        const startOfApr = startOfMonth(new Date(currentYear, 3, 1)); // April
        const startOfJul = startOfMonth(new Date(currentYear, 6, 1)); // July
        const startOfOct = startOfMonth(new Date(currentYear, 9, 1)); // October
        const currentQuarter = isAfter(new Date(), startOfOct) ? `${currentYear}-10-01` : isAfter(new Date(), startOfJul) ? `${currentYear}-07-01` :
            isAfter(new Date(), startOfApr) ? `${currentYear}-04-01` : `${currentYear}-01-01`
        const currentYearz = format(new Date(startOfYear(new Date())), "yyyy-MM-dd")
        //getMonthlyTarrif to get all monthly tariff bills from the bill add table
        const getMonthlyTarrif = async () => {
            const result = await axioslogin.get('/ItBillAdd/monthlyview');
            return result.data;
        }
        //getCurrentMonthData to check current month data exist in the monthly tariff table
        const getCurrentMonthData = async () => {
            const result = await axioslogin.get(`/ItBillAdd/checkMonthlyInsert/${currentmonth}`);
            return result.data;
        }
        //insertMonthlyData to insert current month data to the monthly tariff table
        const insertMonthlyData = async (insertData) => {
            const result = await axioslogin.post('/ItBillAdd/monthlyTarrifInsert', insertData);
            return result.data;
        }
        const getQuarterlyTarrif = async () => {
            const result = await axioslogin.get('/ItBillAdd/quarterlyview');
            return result.data;
        }
        const getCurrentQuarterData = async () => {
            const result = await axioslogin.get(`/ItBillAdd/checkQuarterlyInsert/${currentQuarter}`)
            return result.data;
        }
        const insertDataQuarter = async (insertQuarterData) => {
            const result = await axioslogin.post('/ItBillAdd/quaterlyTarrifInsert', insertQuarterData);
            return result.data;
        }
        const getYearlyTarrif = async () => {
            const result = await axioslogin.get('/ItBillAdd/yearlyview');
            return result.data;
        }
        const getCurrentYearData = async () => {
            const result = await axioslogin.get(`/ItBillAdd/checkYearlyInsert/${currentYearz}`);
            return result.data;
        }
        const insertYearlyData = async (insertYearData) => {
            const result = await axioslogin.post('/ItBillAdd/yearlyTarrifInsert', insertYearData);
            return result.data;
        }
        const getUnpaidBillsServMonthly = async () => {
            const result = await axioslogin.get('ItBillAdd/getUnpaidBillsServMonthly')
            const { success, data } = result.data
            if (success === 2) {
                setMonthlydata(data)
            }
        }
        const getUnpaidBillsSerQuarter = async () => {
            const result = await axioslogin.get('ItBillAdd/getUnpaidBillsSerQuarter')
            const { success, data } = result.data
            if (success === 2) {
                setQuaterlydata(data)
            }
        }
        const getUnpaidBillsSerYear = async () => {
            const result = await axioslogin.get('ItBillAdd/getUnpaidBillsSerYear')
            const { success, data } = result.data
            if (success === 2) {
                setYearlydata(data)
            }
        }
        getMonthlyTarrif().then((val) => {
            const { data, success } = val
            if (success === 2) {
                getCurrentMonthData().then((value) => {
                    const { success, dataa } = value
                    if (success === 1) {
                        const insertData = data?.map((val) => {
                            return {
                                bill_add_slno: val.bill_add_slno,
                                monthly_bill_generate: currentmonth,
                                create_user: id
                            }
                        })
                        insertMonthlyData(insertData).then((val) => {
                            getUnpaidBillsServMonthly()

                        })
                    } else if (success === 2) {
                        const monthlybills = data?.filter((val) => {
                            return !dataa?.find((item) => (val.bill_add_slno === item.bill_add_slno))
                        })
                        if (monthlybills.length !== 0) {
                            const insertData = monthlybills?.map((val) => {
                                return {
                                    bill_add_slno: val.bill_add_slno,
                                    monthly_bill_generate: currentmonth,
                                    create_user: id
                                }
                            })
                            insertMonthlyData(insertData).then((val) => {
                                getUnpaidBillsServMonthly()

                            })
                        }
                    }
                })
            }
        })
        getQuarterlyTarrif().then((val) => {
            const { data, success } = val
            if (success === 2) {
                getCurrentQuarterData().then((value) => {
                    const { success, dataa } = value
                    if (success === 1) {
                        const insertQuarterData = data?.map((val) => {
                            return {
                                bill_add_slno: val.bill_add_slno,
                                quaterly_bill_generate: currentQuarter,
                                create_user: id
                            }
                        })
                        insertDataQuarter(insertQuarterData).then((val) => {
                            getUnpaidBillsSerQuarter()

                        })
                    } else if (success === 2) {
                        const quarterBills = data?.filter((val) => {
                            return !dataa?.find((item) => (val.bill_add_slno === item.bill_add_slno))
                        })
                        if (quarterBills.length !== 0) {
                            const insertQuarterData = quarterBills?.map((val) => {
                                return {
                                    bill_add_slno: val.bill_add_slno,
                                    quaterly_bill_generate: currentQuarter,
                                    create_user: id
                                }
                            })
                            insertDataQuarter(insertQuarterData).then((val) => {
                                getUnpaidBillsSerQuarter()

                            })
                        }
                    }
                })
            }
        })
        getYearlyTarrif().then((val) => {
            const { data, success } = val
            if (success === 2) {
                getCurrentYearData().then((value) => {
                    const { success, dataa } = value
                    if (success === 1) {
                        const insertYearData = data?.map((val) => {
                            return {
                                bill_add_slno: val.bill_add_slno,
                                yearly_bill_generate: currentYearz,
                                create_user: id
                            }
                        })
                        insertYearlyData(insertYearData).then((val) => {
                            getUnpaidBillsSerYear()
                        })
                    } else if (success === 2) {
                        const yearBills = data?.filter((val) => {
                            return !dataa?.find((item) => (val.bill_add_slno === item.bill_add_slno))
                        })
                        if (yearBills.length !== 0) {
                            const insertYearData = yearBills?.map((val) => {
                                return {
                                    bill_add_slno: val.bill_add_slno,
                                    yearly_bill_generate: currentYearz,
                                    create_user: id
                                }
                            })
                            insertYearlyData(insertYearData).then((val) => {
                                getUnpaidBillsSerYear()
                            })
                        }
                    }
                })
            }
        })
    }, [id])
    return (
        <Box>
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
                            bgcolor: '#BA0F30'
                        },
                    }}
                >
                    <Box sx={{ display: 'flex' }}>
                        <Tab disableIndicator >
                            Monthly{' '}
                            <Chip
                                size="md"
                                variant="soft"
                                sx={{ ml: .5, color: '#710117' }}
                            >
                                {monthlydata.length}
                            </Chip>
                        </Tab>
                        <Tab disableIndicator>
                            Quaterly{' '}
                            <Chip
                                size="sm"
                                variant="soft"
                                sx={{
                                    ml: .5,
                                    color: '#710117'
                                }}
                            >
                                {quaterlydata.length}
                            </Chip>
                        </Tab>
                        <Tab disableIndicator>
                            Yearly{' '}
                            <Chip
                                size="sm"
                                variant="soft"
                                sx={{ ml: .5, color: '#710117' }}
                            >
                                {yearlydata.length}
                            </Chip>
                        </Tab>
                        <Tab disableIndicator >
                            Others{' '}
                            <Chip
                                size="sm"
                                variant="soft"
                                sx={{ ml: .5, color: '#710117' }}
                            >
                                {otherData.length}
                            </Chip>
                        </Tab>
                    </Box>
                </TabList>
                <Box sx={{ maxHeight: '62vh', overflow: 'auto' }}>
                    <TabPanel value={0} sx={{ p: .5 }}>
                        <MonthlyBill monthlydata={monthlydata} billCount={billCount} setbillCount={setbillCount} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: .5 }}>
                        <QuaterlyBill quaterlydata={quaterlydata} billCount={billCount} setbillCount={setbillCount} />
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: .5 }}>
                        <YearlyBill yearlydata={yearlydata} billCount={billCount} setbillCount={setbillCount} />
                    </TabPanel>
                    <TabPanel value={3} sx={{ p: .5 }}>
                        <OtherBills otherData={otherData} billCount={billCount} setbillCount={setbillCount} />
                    </TabPanel>
                </Box>
            </Tabs>
        </Box >
    )
}

export default memo(ServiceMain)