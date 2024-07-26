import React, { memo, useCallback, useEffect, useMemo, useState, } from 'react'
import BarChartIcon from '@mui/icons-material/BarChart';
import { Paper } from '@mui/material';
import { Box, Chip, CssVarsProvider, Dropdown, Input, ListDivider, Menu, MenuButton, MenuItem, Typography, } from '@mui/joy';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { BarChart, PieChart } from '@mui/x-charts';
import { endOfMonth, endOfYear, format, isAfter, parse, startOfMonth, startOfYear, subYears } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { gettingArrayList, gettingArrayListFirstYear, gettingArrayListSecondYear, gettingArrayListYearly } from './CommonFunctnFile';
import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action';
import DonutSmallSharpIcon from '@mui/icons-material/DonutSmallSharp';
import { axioslogin } from 'src/views/Axios/Axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
    const [quarterStartDate, setQuarterStartDate] = useState('');
    const [quarterRange, setQuarterRange] = useState('');
    const [billchangeAmtMonth, setbillchangeAmtMonth] = useState(0)
    const [billchangeAmtQuart, setbillchangeAmtQuart] = useState(0)
    const [billchangeAmtOther, setbillchangeAmtOther] = useState(0)
    const [billChargeYearly, setbillChargeYearly] = useState(0)
    const [totMonthlyCharge, setTotMonthlyCharge] = useState(0)
    const [totQutrCharge, setTotQutrCharge] = useState(0)
    const [totOtherCharge, setTotOtherCharge] = useState(0)
    const totalMonthlyChargedAmount = billchangeAmtMonth + billchangeAmtQuart + billchangeAmtOther;
    const totalyearlyChargedAmount = billChargeYearly + totMonthlyCharge + totQutrCharge + totOtherCharge

    const dispatch = useDispatch();
    const [monthName, setMonthName] = useState('');

    useEffect(() => {
        const parsedDate = parse(searchMonthAndYear, 'yyyy-MM', new Date());
        const month = format(parsedDate, 'MMMM');
        setMonthName(month);
    }, [searchMonthAndYear]);

    useEffect(() => {
        // Call the function on component mount
        const today = new Date();
        const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
        const quarterStartDate = getQuarterStartDate(currentDate);
        setQuarterStartDate(quarterStartDate);
    }, []);

    const getQuarterStartDate = (date) => {
        const [year, month] = date.split("-")
        const currentYear = parseInt(year, 10)
        const currentMonth = parseInt(month, 10)
        let selectedQuarter;
        let range;
        // Default to the selected date's month start
        selectedQuarter = startOfMonth(new Date(currentYear, currentMonth - 1));
        // Determine the start date of the quarter
        if (currentMonth >= 1 && currentMonth <= 3) {
            selectedQuarter = `${currentYear}-01-01`
            range = "Jan-Mar"
        } else if (currentMonth >= 4 && currentMonth <= 6) {
            selectedQuarter = `${currentYear}-04-01`
            range = "Apr-Jun";
        } else if (currentMonth >= 7 && currentMonth <= 9) {
            selectedQuarter = `${currentYear}-07-01`
            range = "Jul-Sep";
        } else if (currentMonth >= 10 && currentMonth <= 12) {
            selectedQuarter = `${currentYear}-10-01`
            range = "Oct-Dec";
        }
        setQuarterStartDate(selectedQuarter)
        setQuarterRange(range)
        return selectedQuarter;
    };

    const monthChange = useCallback((e) => {
        const value = e.target.value
        setSearchMonthAndYear(value)
        const quarterStart = getQuarterStartDate(value);
        setQuarterStartDate(quarterStart);
    }, [])

    // const monthChange = useCallback((e) => {
    //     const value = e.target.value
    //     setSearchMonthAndYear(value)
    // }, [])

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

    const searchmonthlychargedAmount = useMemo(() => {
        return {
            from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd'),
            to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd'),
        }
    }, [searchMonthAndYear])

    useEffect(() => {
        const getmonthlychargedAmount = async () => {
            const result = await axioslogin.post('/ItBillAdd/getmonthlychargedAmount', searchmonthlychargedAmount);
            const { success, data } = result.data;
            if (success === 2) {
                const totalBillAmount = data.reduce((acc, item) => acc + item.bill_amount, 0);
                setbillchangeAmtMonth(totalBillAmount)
            }
            else {
                setbillchangeAmtMonth(0)
            }
        }
        getmonthlychargedAmount(searchmonthlychargedAmount)
    }, [searchmonthlychargedAmount])


    const searchquarterlychargedAmount = useMemo(() => {
        return {
            from: quarterStartDate,
            to: quarterStartDate,
        }
    }, [quarterStartDate])

    useEffect(() => {
        const getQuarterlychargedAmount = async () => {
            const result = await axioslogin.post('/ItBillAdd/getQuarterlychargedAmount', searchquarterlychargedAmount);
            const { success, data } = result.data;
            if (success === 2) {
                const totalBillAmountQuar = data.reduce((acc, item) => acc + item.bill_amount, 0);
                setbillchangeAmtQuart(totalBillAmountQuar)
            }
            else {
                setbillchangeAmtQuart(0)
            }
        }
        getQuarterlychargedAmount(searchquarterlychargedAmount)
    }, [searchquarterlychargedAmount])


    const searchmonthlychargedAmountOther = useMemo(() => {
        return {
            from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd'),
            to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd'),
        }
    }, [searchMonthAndYear])

    useEffect(() => {
        const getmonthlychargedAmountOther = async () => {
            const result = await axioslogin.post('/ItBillAdd/getOtherchargedAmount', searchmonthlychargedAmountOther);
            const { success, data } = result.data;

            if (success === 2) {
                const totalBillAmountOther = data.reduce((acc, item) => acc + item.bill_amount, 0);
                setbillchangeAmtOther(totalBillAmountOther)
            }
            else {
                setbillchangeAmtOther(0)
            }
        }
        getmonthlychargedAmountOther(searchmonthlychargedAmountOther)
    }, [searchmonthlychargedAmountOther])



    const searchyearlyCharged = useMemo(() => {
        return {
            from: format(startOfYear(new Date(searchYear)), 'yyyy-MM-dd'),
            to: format(endOfYear(new Date(searchYear)), 'yyyy-MM-dd'),
        }
    }, [searchYear])

    useEffect(() => {
        const getYearlychargedAmount = async () => {
            const result = await axioslogin.post('/ItBillAdd/getYearlychargedAmount', searchyearlyCharged);
            const { success, data } = result.data;

            if (success === 2) {
                const totalBillAmountYearlycharged = data.reduce((acc, item) => acc + item.bill_amount, 0);
                setbillChargeYearly(totalBillAmountYearlycharged)
            }
            else {
                setbillChargeYearly(0)
            }
        }
        getYearlychargedAmount(searchyearlyCharged)
    }, [searchyearlyCharged])

    const searchTotMonthCharged = useMemo(() => {
        return {
            from: format(startOfYear(new Date(searchYear)), 'yyyy-MM-dd'),
            to: format(endOfYear(new Date(searchYear)), 'yyyy-MM-dd'),
        }
    }, [searchYear])

    useEffect(() => {
        const getTotmonthlychargedAmount = async () => {
            const result = await axioslogin.post('/ItBillAdd/getmonthlychargedAmount', searchTotMonthCharged);
            const { success, data } = result.data;
            if (success === 2) {
                const totalBillAmount = data.reduce((acc, item) => acc + item.bill_amount, 0);
                setTotMonthlyCharge(totalBillAmount)
            }
            else {
                setTotMonthlyCharge(0)
            }
        }
        getTotmonthlychargedAmount(searchTotMonthCharged)
    }, [searchTotMonthCharged])

    const searchTotQuartCharged = useMemo(() => {
        return {
            from: format(startOfYear(new Date(searchYear)), 'yyyy-MM-dd'),
            to: format(endOfYear(new Date(searchYear)), 'yyyy-MM-dd'),
        }
    }, [searchYear])

    useEffect(() => {
        const getTotQuartchargedAmount = async () => {
            const result = await axioslogin.post('/ItBillAdd/getQuarterlychargedAmount', searchTotQuartCharged);
            const { success, data } = result.data;
            if (success === 2) {
                const totalBillAmount = data.reduce((acc, item) => acc + item.bill_amount, 0);
                setTotQutrCharge(totalBillAmount)
            }
            else {
                setTotQutrCharge(0)
            }
        }
        getTotQuartchargedAmount(searchTotQuartCharged)
    }, [searchTotQuartCharged])

    const searchTotOtherCharged = useMemo(() => {
        return {
            from: format(startOfYear(new Date(searchYear)), 'yyyy-MM-dd'),
            to: format(endOfYear(new Date(searchYear)), 'yyyy-MM-dd'),
        }
    }, [searchYear])

    useEffect(() => {
        const getTotOtherchargedAmount = async () => {
            const result = await axioslogin.post('/ItBillAdd/getOtherchargedAmount', searchTotOtherCharged);
            const { success, data } = result.data;
            if (success === 2) {
                const totalBillAmount = data.reduce((acc, item) => acc + item.bill_amount, 0);
                setTotOtherCharge(totalBillAmount)
            }
            else {
                setTotOtherCharge(0)
            }
        }
        getTotOtherchargedAmount(searchTotOtherCharged)
    }, [searchTotOtherCharged])



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
                <Paper sx={{ flex: 2.1, borderRadius: 0, bgcolor: 'white', height: 300, mb: 1 }}>


                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <Box sx={{ flex: 1, }}>
                            <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#52688F', py: .5, pl: 2 }}>
                                &nbsp;Monthly charts
                            </Typography>
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
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: .5 }}>
                            <Box sx={{ textAlign: 'center', pt: .8 }}>
                                <Box sx={{ fontSize: 20, fontWeight: 700, color: '#CB6112' }}>
                                    <CurrencyRupeeIcon sx={{ width: 20, color: '#6E5828' }} />
                                    {new Intl.NumberFormat('en-IN').format(monthYeartotAmount)}
                                </Box>
                                <Typography sx={{ fontSize: 13, color: '#211625' }}>
                                    Paid Amount
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center', px: 2 }}>
                                <Box sx={{ fontSize: 20, fontWeight: 700, color: '#CB6112' }}>
                                    <CurrencyRupeeIcon sx={{ width: 20, color: '#6E5828' }} />
                                    {new Intl.NumberFormat('en-IN').format(totalMonthlyChargedAmount)}
                                    <Dropdown>
                                        <MenuButton
                                            // slots={{ root: IconButton }}
                                            variant="plain"
                                            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                                            sx={{ '&:hover': { color: 'blue' }, width: 2 }}
                                        >
                                            <ArrowDropDownIcon />
                                        </MenuButton>
                                        <Menu
                                            variant="outlined"
                                            invertedColors
                                            aria-labelledby="apps-menu-demo"
                                            sx={{
                                                '--List-padding': '0.5rem',
                                                '--ListItemDecorator-size': '3rem',
                                                // display: 'grid',
                                                gridTemplateColumns: 'repeat(3, 100px)',
                                                gridAutoRows: '100px',
                                                gap: .5,
                                                width: 260
                                            }}
                                        >
                                            <MenuItem sx={{ flex: 1, display: 'flex' }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography >
                                                        Monthly Tarrif
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12, pl: 2 }}>
                                                        ({monthName})
                                                    </Typography>
                                                </Box>
                                                <Typography sx={{ fontSize: 15, pl: 5, pb: 1 }}>
                                                    <CurrencyRupeeIcon sx={{ width: 15, color: '#6E5828' }} />
                                                    {new Intl.NumberFormat('en-IN').format(billchangeAmtMonth)}
                                                </Typography>
                                            </MenuItem>
                                            <ListDivider />
                                            <MenuItem sx={{ flex: 1, display: 'flex' }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography>
                                                        Quaterly Tarrif
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12, pl: 2 }}>
                                                        ({quarterRange})
                                                    </Typography>
                                                </Box>
                                                <Typography sx={{ fontSize: 15, pl: 5, pb: 1 }}>
                                                    <CurrencyRupeeIcon sx={{ width: 15, color: '#6E5828' }} />
                                                    {new Intl.NumberFormat('en-IN').format(billchangeAmtQuart)}
                                                </Typography>
                                            </MenuItem>
                                            <ListDivider />
                                            <MenuItem sx={{ flex: 1, display: 'flex' }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography>
                                                        Other Bills
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12, pl: 2 }}>
                                                        ({monthName})
                                                    </Typography>
                                                </Box>
                                                <Typography sx={{ fontSize: 15, pl: 5, pb: 1 }}>
                                                    <CurrencyRupeeIcon sx={{ width: 15, color: '#6E5828' }} />
                                                    {new Intl.NumberFormat('en-IN').format(billchangeAmtOther)}
                                                </Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Dropdown>
                                </Box>
                                <Typography sx={{ fontSize: 13, color: '#211625' }}>
                                    Billed Amount
                                </Typography>
                            </Box>

                        </Box>
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
                                    faded: { innerRadius: 25, additionalRadius: -30, color: 'gray' }, color: '#AB3917', valueFormatter,
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
                <Paper sx={{ flex: 1.3, borderRadius: 0, bgcolor: 'white', height: 300, mb: 1, ml: 1 }}>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <Box sx={{ flex: .6, }}>
                            <Typography sx={{ fontWeight: 800, fontSize: 18, color: '#52688F', py: .5, pl: 2 }}>
                                &nbsp;Annual charts
                            </Typography>
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
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: .5 }}>
                            <Box sx={{ textAlign: 'center', pr: 1 }}>
                                <Box sx={{ fontSize: 20, fontWeight: 700, color: '#CB6112' }}>
                                    <CurrencyRupeeIcon sx={{ width: 20, color: '#6E5828' }} />
                                    {new Intl.NumberFormat('en-IN').format(yeartotAmount)}
                                </Box>
                                <Typography sx={{ fontSize: 13, color: '#211625' }}>
                                    Paid Amount
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center', pr: 3 }}>
                                <Box sx={{ fontSize: 20, fontWeight: 700, color: '#CB6112' }}>
                                    <CurrencyRupeeIcon sx={{ width: 20, color: '#6E5828' }} />
                                    {new Intl.NumberFormat('en-IN').format(totalyearlyChargedAmount)}
                                </Box>
                                <Typography sx={{ fontSize: 13, color: '#211625' }}>
                                    Billed Amount
                                </Typography>
                            </Box>
                        </Box>
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
                        min=''
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