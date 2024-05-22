import React, { memo, useCallback, useEffect, useState, } from 'react'
import BarChartIcon from '@mui/icons-material/BarChart';
import { Paper } from '@mui/material';
import { Box, Chip, CssVarsProvider, Input, Typography, } from '@mui/joy';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { BarChart, PieChart } from '@mui/x-charts';
import { endOfMonth, endOfYear, format, startOfMonth, startOfYear, subYears } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { gettingArrayList, gettingArrayListFirstYear, gettingArrayListSecondYear, gettingArrayListYearly } from './CommonFunctnFile';
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action';
import DonutSmallSharpIcon from '@mui/icons-material/DonutSmallSharp';

const BillsChartsAndGraph = () => {

    const [searchMonthAndYear, setSearchMonthAndYear] = useState(format(new Date(), 'yyyy-MM'));
    const [searchYear, setSearchYear] = useState(format(new Date(), 'yyyy'));
    const [CompareYearOne, setCompareYearOne] = useState(format(new Date(), 'yyyy'))
    const [CompareYearTwo, setCompareYearTwo] = useState(format(subYears(new Date(), 1), 'yyyy'));
    const [monthINyearData, setmonthINyearData] = useState([])
    const [barChartViewMonthYear, setBarChartViewMonthYear] = useState([])
    const [monthYearFlag, setmonthYearFlag] = useState(0)
    const [monthYeartotAmount, setmonthYeartotAmount] = useState(0)
    const [yearData, setYearData] = useState([])
    const [barChartViewYear, setBarChartViewYear] = useState([])
    const [yeartotAmount, setYeartotAmount] = useState(0)
    const [yearFlag, setYearFlag] = useState(0)
    const billCategoryNames = useSelector((state) => state?.getBillCategory?.BillCategorylist)
    const [firstYear, setfirstYear] = useState([])
    const [secondYear, setsecondYear] = useState([])
    const [combinedDatas, setcombinedDatas] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBillCategory())
    }, [dispatch])

    useEffect(() => {
        const monthBillSearch = {
            from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
            to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59')
        }
        const gettingArayFun = async (monthBillSearch, setmonthINyearData) => {
            await gettingArrayList(monthBillSearch, setmonthINyearData)
        }
        gettingArayFun(monthBillSearch, setmonthINyearData)
    }, [searchMonthAndYear, setmonthINyearData])

    useEffect(() => {
        const startDate = startOfYear(new Date(searchYear))
        const endDate = endOfYear(new Date(searchYear))
        const yearBillSearch = {
            from: moment(new Date(startDate)).format('YYYY-MM-DD 00:00:00'),
            to: moment(new Date(endDate)).format('YYYY-MM-DD 23:59:59'),
        }
        const gettingArayFunYear = async (yearBillSearch, setYearData) => {
            await gettingArrayListYearly(yearBillSearch, setYearData)
        }
        gettingArayFunYear(yearBillSearch, setYearData)
    }, [searchYear, setYearData])

    useEffect(() => {
        const startDate = startOfYear(new Date(CompareYearOne))
        const endDate = endOfYear(new Date(CompareYearOne))
        const firstyearBillSearch = {
            from: moment(new Date(startDate)).format('YYYY-MM-DD 00:00:00'),
            to: moment(new Date(endDate)).format('YYYY-MM-DD 23:59:59'),
        }
        const gettingArayFunFirstYear = async (firstyearBillSearch, setfirstYear) => {
            await gettingArrayListFirstYear(firstyearBillSearch, setfirstYear)
        }
        gettingArayFunFirstYear(firstyearBillSearch, setfirstYear)
    }, [CompareYearOne, setfirstYear])

    useEffect(() => {
        const startDate = startOfYear(new Date(CompareYearTwo))
        const endDate = endOfYear(new Date(CompareYearTwo))
        const secondyearBillSearch = {
            from: moment(startDate).format('YYYY-MM-DD 00:00:00'),
            to: moment(endDate).format('YYYY-MM-DD 23:59:59'),
        };
        const gettingArayFunSecondYear = async (secondyearBillSearch, setsecondYear) => {
            await gettingArrayListSecondYear(secondyearBillSearch, setsecondYear);
        };
        gettingArayFunSecondYear(secondyearBillSearch, setsecondYear);
    }, [setsecondYear, CompareYearTwo]);

    useEffect(() => {
        const Xvalue = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        if (monthINyearData.length !== 0) {
            const MonthNdYearChartData = billCategoryNames?.map((val) => {
                const totBill = (monthINyearData?.filter((item) => (val.it_bill_category_slno === item.bill_category))
                    .reduce((acc, curr) => acc + (curr.bill_amount), 0))
                return {
                    category: val.it_bill_category_name,
                    totBillAmount: totBill
                }
            })
            setBarChartViewMonthYear(MonthNdYearChartData)
            const totamount = monthINyearData?.map(val => val.bill_amount).reduce((prev, next) => Number(prev) + Number(next));
            setmonthYeartotAmount(totamount)
            setmonthYearFlag(1)
        }
        else {
            setmonthYearFlag(0)
            setmonthYeartotAmount(0)
        }
        if (yearData.length !== 0) {
            const yearChartData = billCategoryNames?.map((val) => {
                const totBill = (yearData?.filter((item) => (val.it_bill_category_slno === item.bill_category))
                    .reduce((acc, curr) => acc + (curr.bill_amount), 0))
                return {
                    categorys: val.it_bill_category_name,
                    totBillAmounts: totBill
                }
            })
            setBarChartViewYear(yearChartData)
            const totamount = yearData?.map(val => val.bill_amount).reduce((prev, next) => Number(prev) + Number(next));
            setYeartotAmount(totamount)
            setYearFlag(1)
        }
        else {
            setYearFlag(0)
            setYeartotAmount(0)
            setBarChartViewYear([])
        }
        const firstYearData = Xvalue?.map((val) => {
            const toBillAmount = (firstYear?.filter((item) => format(new Date(item.bill_paid_date), 'MMM') === val)
                .reduce((acc, curr) => acc + (curr.bill_amount), 0))
            return {
                month: val,
                firstamount: toBillAmount
            }
        })
        const secondYearData = Xvalue?.map((val) => {
            const totBillAmnt = (secondYear?.filter((item) => format(new Date(item.bill_paid_date), 'MMM') === val)
                .reduce((acc, curr) => acc + (curr.bill_amount), 0))
            return {
                month: val,
                secondamount: totBillAmnt
            }
        })
        const CombinedData = firstYearData?.map((val) => {
            const newArray = secondYearData?.find((item) => item.month === val.month)
            return {
                ...val,
                secondamount: newArray ? newArray.secondamount : 0
            }
        })
        setcombinedDatas(CombinedData)
    }, [monthINyearData, billCategoryNames, yearData, firstYear, secondYear])

    const valueFormatter = (value) => `${value} Rs`;
    const monthChange = useCallback((e) => {
        const value = e.target.value
        setSearchMonthAndYear(value)
    }, [])
    const yearChange = useCallback((e) => {
        const value = e.target.value
        setSearchYear(value)
    }, [])
    const yearChangeCompare = useCallback((e) => {
        const value = e.target.value
        setCompareYearOne(value)
    }, [])
    const yearChangeCompareTwo = useCallback((e) => {
        const value = e.target.value
        setCompareYearTwo(value)
    }, [])

    return (
        <Paper sx={{
            mt: .5,
            borderRadius: 0, p: .5,
            boxShadow: '0px 0px 1px',
            bgcolor: '#E3E7F1',
            maxHeight: '80wvh'

        }} >
            <Box sx={{ flex: 1, fontWeight: 600, fontSize: 20, color: '#2F435A', p: .2 }}>
                <BarChartIcon sx={{ color: '#2F435A', height: 25, width: 20 }} />Bills Tracker
            </Box>
            <Box sx={{ px: .5, flex: 1, display: 'flex' }}>
                <Paper sx={{ flex: 2.5, borderRadius: 0, bgcolor: 'white', height: 300, mb: 1 }}>
                    <Box sx={{ flex: 1, mx: 1, pt: 1, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#52688F', flex: 1 }}>
                            &nbsp;Monthly Paid Amount
                        </Typography>
                        <CssVarsProvider>
                            <Chip sx={{ bgcolor: '#E7F2F8', fontSize: 20, color: '#BA0F30', fontWeight: 800, mt: .5 }}>
                                <CurrencyRupeeIcon sx={{ width: 20, color: '#BA0F30' }} />
                                {new Intl.NumberFormat('en-IN').format(monthYeartotAmount)}
                            </Chip>
                        </CssVarsProvider>
                    </Box>

                    <Box sx={{ width: 155, ml: 1.5, }}>
                        <Input
                            variant="solid"
                            sx={{ borderRadius: 20, pl: 3, cursor: 'pointer', color: 'white' }}
                            name="searchMonthAndYear"
                            type="month"
                            size="sm"
                            value={searchMonthAndYear}
                            onChange={monthChange} />
                    </Box>
                    <Box sx={{ flex: 1, overflow: 'auto', pl: 3, }}>
                        {monthYearFlag === 1 ?
                            <BarChart
                                height={210}
                                dataset={barChartViewMonthYear}
                                xAxis={[{
                                    scaleType: 'band', dataKey: 'category',
                                    tickLabelStyle: {
                                        angle: -26,
                                        textAnchor: 'end',
                                        fontSize: 10,
                                    },
                                }]}
                                series={[{
                                    dataKey: "totBillAmount", label: 'Amount',
                                    highlightScope: {
                                        faded: 'global', highlighted: 'item'
                                    },
                                    faded: { innerRadius: 25, additionalRadius: -30, color: 'gray' }, color: 'darkred', valueFormatter,
                                }]}
                                tooltip={{ trigger: 'item', }}
                                axisHighlight={{
                                    x: 'none',
                                    y: 'none',
                                }}
                            />
                            :
                            <Box sx={{ display: 'flex', ml: 4 }}>
                                <Box sx={{ height: 150, pt: 10, }}>0-</Box>
                                <Box sx={{ flex: 1, }}>
                                    <Box sx={{
                                        mt: 5, mr: 10, height: 120, borderLeft: 1, borderBottom: 1, flex: 1, display: 'flex',
                                        justifyContent: 'center', pt: 2
                                    }}>
                                        <Box sx={{ width: 20, height: 20, bgcolor: 'darkred', textAlign: 'center', mr: .4, }}></Box> Amount
                                    </Box>
                                    <Box sx={{ mr: 10, flex: 1, textAlign: 'center', borderLeft: 1, borderRight: 1, height: 5 }}></Box>
                                    <Box sx={{ ml: 5, mr: 10, flex: 1, textAlign: 'center', }}>-categories-</Box>
                                </Box>
                            </Box>
                        }
                    </Box>
                </Paper>
                <Paper sx={{ flex: 1.2, borderRadius: 0, bgcolor: 'white', height: 300, mb: 1, ml: 1 }}>
                    <Box sx={{ flex: 1, mx: 1, pt: 1, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#52688F', flex: 1 }}>
                            &nbsp;Annual Paid Amount</Typography>
                        <CssVarsProvider>
                            <Chip sx={{ bgcolor: '#E7F2F8', fontSize: 20, color: '#BA0F30', fontWeight: 800 }}>
                                <CurrencyRupeeIcon sx={{ width: 20, color: '#BA0F30' }} />
                                {new Intl.NumberFormat('en-IN').format(yeartotAmount)}
                            </Chip>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: 90, ml: 1.5, pl: 1 }}>
                        <Input
                            variant="solid"
                            sx={{ borderRadius: 20, pl: 3 }}
                            name="searchYear"
                            type="number"
                            size="sm"
                            min='2000'
                            value={searchYear}
                            onChange={yearChange} />
                    </Box>
                    <Box sx={{ width: 300, margin: 'auto', mt: 2, pl: .3 }}>
                        <Box>
                            {yearFlag === 1 ?
                                <Box sx={{ ml: 7, width: 250 }} >
                                    <PieChart
                                        height={160}
                                        sx={{ mb: 1 }}
                                        series={[
                                            {
                                                data: barChartViewYear.map(item => ({
                                                    x: item.categorys,
                                                    y: item.totBillAmounts,
                                                    value: item.totBillAmounts,
                                                    label: item.categorys,
                                                })),
                                                highlightScope: {
                                                    faded: 'global', highlighted: 'item'
                                                },
                                                faded: { innerRadius: 25, additionalRadius: -30, color: 'gray' },
                                                innerRadius: 8,
                                                outerRadius: 80,
                                                paddingAngle: 5,
                                                cornerRadius: 5,
                                                startAngle: -180,
                                                endAngle: 180,
                                                cl: 180,
                                                cb: 0
                                            }
                                        ]}
                                        slotProps={{
                                            legend: { hidden: true },
                                        }}
                                    />
                                </Box>
                                :
                                <Box sx={{ margin: 'auto', width: 110, pt: 2 }}>
                                    <DonutSmallSharpIcon sx={{ height: 110, width: 110, color: '#B1B1B1' }} />
                                    <Typography sx={{ pl: 3.5, color: '#B1B1B1', fontWeight: 800 }}>No Data</Typography>

                                </Box>
                            }
                        </Box>
                    </Box>
                </Paper>
            </Box >
            <Paper sx={{ flex: 1.2, borderRadius: 0, bgcolor: 'white', height: 300, mb: 1, mx: .5 }}>
                <Box sx={{ flex: 1, mx: 1, pt: 1, display: 'flex' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#52688F', flex: 1 }}>
                        &nbsp;Annual Comparison</Typography>
                </Box>
                <Box sx={{ width: 180, ml: 1, pl: 1, display: 'flex' }}>
                    <Input
                        variant="solid"
                        sx={{ borderRadius: 20, pl: 3, mr: .5 }}
                        name="CompareYearOne"
                        type="number"
                        size="sm"
                        min='2000'
                        value={CompareYearOne}
                        onChange={yearChangeCompare} />
                    <Input
                        variant="solid"
                        sx={{ borderRadius: 20, pl: 3 }}
                        name="CompareYearTwo"
                        type="number"
                        size="sm"
                        min='2000'
                        value={CompareYearTwo}
                        onChange={yearChangeCompareTwo} />
                </Box>
                <Box sx={{ flex: 1, }}>
                    <BarChart
                        dataset={combinedDatas}
                        height={200}
                        sx={{ mb: 1 }}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'firstamount', label: CompareYearOne, valueFormatter, color: '#214358' },
                            { dataKey: 'secondamount', label: CompareYearTwo, valueFormatter, color: '#B8390E' },
                        ]}
                    />
                </Box>
            </Paper>
        </Paper >
    )
}

export default memo(BillsChartsAndGraph)