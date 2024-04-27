import { Box, Chip, Tab, TabList, TabPanel, Tabs, tabClasses, } from '@mui/joy'
import React, { memo, useEffect, useState, } from 'react'
import { getQuarter, isAfter, startOfMonth, startOfYear } from 'date-fns';
import format from 'date-fns/format'
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import MonthlyBill from '../Monthly/MonthlyBill';
import QuaterlyBill from '../Quaterly/QuaterlyBill';
import YearlyBill from '../Yearly/YearlyBill';
import OtherBills from '../OtherBill/OtherBills';

const TeleMain = ({ billCount, setbillCount }) => {

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const QuarterList = {
        0: 'Jan_Mar',
        1: 'Apr_Jun',
        2: 'jul_Sep',
        3: 'Oct_Dec',
    }
    const today = new Date()
    const month = today.getMonth()
    const monthName = monthNames[month]
    const Quarter = getQuarter(month)
    const QuarterName = QuarterList[Quarter]
    const [monthlydata, setMonthlydata] = useState([])
    const [quaterlydata, setQuaterlydata] = useState([])
    const [yearlydata, setYearlydata] = useState([])
    const [otherData, setOtherData] = useState(0)
    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    useEffect(() => {
        const monthlyy = format(new Date(startOfMonth(new Date())), "yyyy-MM-dd")
        const yearStart = format(new Date(startOfYear(new Date())), "yyyy-MM-dd")
        const today = new Date();
        const currentYear = today.getFullYear();
        const startOfApr = startOfMonth(new Date(currentYear, 3, 1)); // April
        const startOfJul = startOfMonth(new Date(currentYear, 6, 1)); // July
        const startOfOct = startOfMonth(new Date(currentYear, 9, 1)); // October

        const initial = async (checking) => {
            const result1 = await axioslogin.post(`/ItBillAdd/CheckInsetMonthlyOrNot`, checking);
            const { success } = result1.data
            if (success !== 1) {
                const result = await axioslogin.post(`/ItBillAdd/monthlyTarrifInsert`, checking);
                const { success } = result.data
                if (success === 1) {
                    return 0
                }
            }
        }
        const getMonthlywise = async () => {
            const result = await axioslogin.get('ItBillAdd/monthlyview')
            const { success, data
            } = result.data
            if (success === 2) {
                data && data.map((val) => {
                    const checking = {
                        bill_add_slno: val.bill_add_slno,
                        create_user: id,
                        monthly_bill_generate: monthlyy
                    }
                    initial(checking)
                    return 0
                })
            }
        }
        const quater = async (checking) => {
            const result1 = await axioslogin.post(`/ItBillAdd/CheckInsetQuaterlyOrNot`, checking);
            const { success } = result1.data
            if (success !== 1) {
                const result = await axioslogin.post(`/ItBillAdd/quaterlyTarrifInsert`, checking);
                const { success } = result.data
                if (success === 1) {
                    return 0
                }
            }
        }
        const getQuaterlywise = async () => {
            const result = await axioslogin.get('ItBillAdd/quarterlyview')
            const { success, data } = result.data
            if (success === 2) {
                data && data.map((val) => {
                    const checking = {
                        bill_add_slno: val.bill_add_slno,
                        create_user: id,
                        quaterly_bill_generate: isAfter(new Date(), startOfOct)
                            ? `${currentYear}-10-01`
                            : isAfter(new Date(), startOfJul)
                                ? `${currentYear}-07-01`
                                : isAfter(new Date(), startOfApr)
                                    ? `${currentYear}-04-01`
                                    : `${currentYear}-01-01`,
                    };
                    quater(checking)
                    return 0
                })
            }
        }
        const year = async (checking) => {
            const result1 = await axioslogin.post(`/ItBillAdd/CheckInsetYearlyOrNot`, checking);
            const { success } = result1.data
            if (success !== 1) {
                const result = await axioslogin.post(`/ItBillAdd/yearlyTarrifInsert`, checking);
                const { success } = result.data
                if (success === 1) {
                    return 0
                }
            }
        }
        const getyearlywise = async () => {
            const result = await axioslogin.get('ItBillAdd/yearlyview')
            const { success, data } = result.data
            if (success === 2) {
                data && data.map((val) => {
                    const checking = {
                        bill_add_slno: val.bill_add_slno,
                        create_user: id,
                        yearly_bill_generate: yearStart
                    }
                    year(checking)
                    return 0
                })
            }
        }
        getMonthlywise()
        getQuaterlywise()
        getyearlywise()
    }, [id])

    useEffect(() => {
        const monthlyy = format(new Date(startOfMonth(new Date())), "yyyy-MM-dd")
        const getMonthlywiseArray = async () => {
            const Monthdataget = {
                monthly_bill_generate: monthlyy
            }
            const result1 = await axioslogin.post(`/ItBillAdd/getTeleMonthData`, Monthdataget);
            const { success, dataa } = result1.data
            if (success === 1) {
                setMonthlydata(dataa);
            }
        }
        getMonthlywiseArray()
    }, [billCount])

    useEffect(() => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const startOfApr = startOfMonth(new Date(currentYear, 3, 1)); // April
        const startOfJul = startOfMonth(new Date(currentYear, 6, 1)); // July
        const startOfOct = startOfMonth(new Date(currentYear, 9, 1)); // October
        const getQuaterlywiseArray = async () => {
            const Quaterdataget = {
                quaterly_bill_generate: isAfter(new Date(), startOfOct) ? "2023-10-01" :
                    isAfter(new Date(), startOfJul) ? "2023-07-01" :
                        isAfter(new Date(), startOfApr) ? "2023-04-01" : "2023-01-01"
            }
            const result1 = await axioslogin.post(`/ItBillAdd/getTeleQuarterlyData`, Quaterdataget);
            const { success, dataa } = result1.data
            if (success === 1) {
                setQuaterlydata(dataa);
            }
        }
        getQuaterlywiseArray()
    }, [billCount])
    useEffect(() => {
        const yearStart = format(new Date(startOfYear(new Date())), "yyyy-MM-dd")
        const getyearlywiseArray = async () => {
            const Yeardataget = {
                yearly_bill_generate: yearStart
            }
            const result1 = await axioslogin.post(`/ItBillAdd/getTeleYearlyData`, Yeardataget);
            const { success, dataa } = result1.data
            if (success === 1) {
                setYearlydata(dataa);
            }
        }
        getyearlywiseArray()
    }, [billCount])

    useEffect(() => {
        const getOtherBills = async () => {
            const result = await axioslogin.get('/ItBillAdd/otherTeleBillViewinDash');
            const { success, data } = result.data;
            if (success === 2) {
                setOtherData(data)
            } else {
                setOtherData([])
            }
        }
        getOtherBills()

    }, [billCount])

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
                        // pt: 2,
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
                <Box sx={{ maxHeight: '60vh', }}>
                    <TabPanel value={0} sx={{ p: .5 }}>
                        <MonthlyBill monthlydata={monthlydata} billCount={billCount} setbillCount={setbillCount} monthName={monthName} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: .5 }}>
                        <QuaterlyBill quaterlydata={quaterlydata} billCount={billCount} setbillCount={setbillCount} QuarterName={QuarterName} />
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: .5 }}>
                        <YearlyBill yearlydata={yearlydata} billCount={billCount} setbillCount={setbillCount} />
                    </TabPanel>
                    <TabPanel value={3} sx={{ p: .5 }}>
                        <OtherBills otherData={otherData} billCount={billCount} setbillCount={setbillCount} />
                    </TabPanel>
                </Box>
            </Tabs>
        </Box>
    )
}

export default memo(TeleMain)