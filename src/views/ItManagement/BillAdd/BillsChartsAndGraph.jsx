import React, { memo, } from 'react'
import BarChartIcon from '@mui/icons-material/BarChart';
import { Paper } from '@mui/material';
import { Box, } from '@mui/joy';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import { BarChart, PieChart } from '@mui/x-charts';
// import { endOfMonth, endOfYear, format, startOfMonth, startOfYear } from 'date-fns';
// import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
// import { gettingArrayList, gettingArrayListYearly } from './CommonFunctnFile';
// import { getBillCategory } from 'src/redux/actions/ItBillCategoryList.action';
// import { addMonths, subMonths } from 'date-fns';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const BillsChartsAndGraph = () => {

    // const [searchMonthAndYear, setSearchMonthAndYear] = useState(format(new Date(), 'MMM-yyyy'));
    // const [fromDate, setFromDate] = useState(moment(new Date()))
    // const [searchYear, setSearchYear] = useState(format(new Date(), 'yyyy'));
    // const [monthINyearData, setmonthINyearData] = useState([])
    // const [barChartViewMonthYear, setBarChartViewMonthYear] = useState([])
    // const [monthYearFlag, setmonthYearFlag] = useState(0)
    // const [monthYeartotAmount, setmonthYeartotAmount] = useState(0)
    // const [yearData, setYearData] = useState([])
    // const [barChartViewYear, setBarChartViewYear] = useState([])
    // const [yeartotAmount, setYeartotAmount] = useState(0)
    // const [yearFlag, setYearFlag] = useState(0)
    // const billCategoryNames = useSelector((state) => state?.getBillCategory?.BillCategorylist)

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getBillCategory())
    // }, [dispatch])

    // useEffect(() => {
    //     const startDate = startOfMonth(new Date(searchMonthAndYear))
    //     const endDate = endOfMonth(new Date(searchMonthAndYear))
    //     const monthBillSearch = {
    //         from: moment(new Date(startDate)).format('YYYY-MM-DD 00:00:00'),
    //         to: moment(new Date(endDate)).format('YYYY-MM-DD 23:59:59'),
    //     }
    //     const gettingArayFun = async (monthBillSearch, setmonthINyearData) => {
    //         await gettingArrayList(monthBillSearch, setmonthINyearData)
    //     }
    //     gettingArayFun(monthBillSearch, setmonthINyearData)
    // }, [searchMonthAndYear, setmonthINyearData])

    // useEffect(() => {
    //     const startDate = startOfYear(new Date(searchYear))
    //     const endDate = endOfYear(new Date(searchYear))
    //     const yearBillSearch = {
    //         from: moment(new Date(startDate)).format('YYYY-MM-DD 00:00:00'),
    //         to: moment(new Date(endDate)).format('YYYY-MM-DD 23:59:59'),
    //     }
    //     const gettingArayFunYear = async (yearBillSearch, setYearData) => {
    //         await gettingArrayListYearly(yearBillSearch, setYearData)
    //     }
    //     gettingArayFunYear(yearBillSearch, setYearData)
    // }, [searchYear, setYearData])

    // useEffect(() => {
    //     if (monthINyearData.length !== 0) {
    //         const MonthNdYearChartData = billCategoryNames?.map((val) => {
    //             const totBill = (monthINyearData?.filter((item) => (val.it_bill_category_slno === item.bill_category))
    //                 .reduce((acc, curr) => acc + (curr.bill_amount), 0))
    //             return {
    //                 category: val.it_bill_category_name,
    //                 totBillAmount: totBill
    //             }
    //         })
    //         setBarChartViewMonthYear(MonthNdYearChartData)
    //         const totamount = monthINyearData?.map(val => val.bill_amount).reduce((prev, next) => Number(prev) + Number(next));
    //         setmonthYeartotAmount(totamount)
    //         setmonthYearFlag(1)
    //     }
    //     else {
    //         setmonthYearFlag(0)
    //         setmonthYeartotAmount(0)
    //     }
    //     if (yearData.length !== 0) {
    //         const yearChartData = billCategoryNames?.map((val) => {
    //             const totBill = (yearData?.filter((item) => (val.it_bill_category_slno === item.bill_category))
    //                 .reduce((acc, curr) => acc + (curr.bill_amount), 0))
    //             return {
    //                 categorys: val.it_bill_category_name,
    //                 totBillAmounts: totBill
    //             }
    //         })
    //         setBarChartViewYear(yearChartData)
    //         const totamount = yearData?.map(val => val.bill_amount).reduce((prev, next) => Number(prev) + Number(next));
    //         setYeartotAmount(totamount)
    //         setYearFlag(1)
    //     }
    //     else {
    //         setYearFlag(0)
    //         setYeartotAmount(0)
    //         setBarChartViewYear([])
    //     }
    // }, [monthINyearData, billCategoryNames, yearData])
    // const valueFormatter = (value) => `${value} Rs`;


    return (
        <Paper sx={{
            mt: .5,
            borderRadius: 0, p: .5,
            boxShadow: '0px 0px 1px',
            bgcolor: '#E3E7F1'
        }} >
            <Box sx={{ flex: 1, fontWeight: 600, fontSize: 20, color: '#2F435A', p: .2 }}>
                <BarChartIcon sx={{ color: '#2F435A', height: 25, width: 20 }} />Bills Tracker
            </Box>
            <Box sx={{ px: .5, flex: 1, display: 'flex' }}>
                <Paper sx={{ flex: 2.5, borderRadius: 0, bgcolor: 'white', height: '36vh', mb: 1 }}>
                    {/* <Box sx={{ flex: 1, mx: 1, pt: 1, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 20, color: '#52688F', flex: 1 }}>
                            &nbsp;Monthly Paid Amount
                        </Typography>
                        <CssVarsProvider>
                            <Chip sx={{ bgcolor: '#E7F2F8', fontSize: 20, color: '#BA0F30', fontWeight: 800, mt: .5 }}>
                                <CurrencyRupeeIcon sx={{ width: 20, color: '#BA0F30' }} />
                                {new Intl.NumberFormat('en-IN').format(monthYeartotAmount)}
                            </Chip>
                        </CssVarsProvider>
                    </Box> */}

                    {/* <Box sx={{ ml: 1.5 }}> */}


                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={searchMonthAndYear}
                                views={['year', 'month']}
                                size="sm"
                                inputFormat='MMM-yyyy'
                                onChange={(newValue) => {
                                    setSearchMonthAndYear(newValue);
                                }}

                                renderInput={(params) => (
                                    <Input {...params} helperText={null} size='small'
                                        sx={{
                                            height: 35,
                                            borderRadius: 100, borderColor: 'red', bgcolor: '#BDC3CB'
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider> */}

                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                value={searchMonthAndYear}
                                size="small"
                                inputFormat='MMM yyyy'
                                onChange={(newValue) => {
                                    setSearchMonthAndYear(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} variant="solid" style={{ width: 100, borderRadius: 50 }} />
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box> */}


                    {/* <Box sx={{ flex: 1, overflow: 'auto', pl: 3 }}>
                        {monthYearFlag === 1 ?
                            <BarChart
                                height={230}
                                dataset={barChartViewMonthYear}
                                xAxis={[{
                                    scaleType: 'band', dataKey: 'category',
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
                            : <BarChart
                                xAxis={[{
                                    scaleType: 'band',
                                    data: billCategoryNames?.map((val) => val.it_bill_category_name)
                                }]}
                                series={[{ data: [0], label: 'Amount', color: 'darkRed', }]}
                                height={200}
                                tooltip={{ trigger: 'item' }}
                                axisHighlight={{
                                    x: 'none',
                                    y: 'none',
                                }}
                            />}
                    </Box> */}
                </Paper>
                {/* <Paper sx={{ flex: 1.2, borderRadius: 0, bgcolor: 'white', height: '36vh', mb: 1, ml: 1 }}>
                    <Box sx={{ flex: 1, mx: 1, pt: 1, display: 'flex' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 20, color: '#52688F', flex: 1 }}>
                            &nbsp;Annual Paid Amount</Typography>
                        <CssVarsProvider>
                            <Chip sx={{ bgcolor: '#E7F2F8', fontSize: 20, color: '#BA0F30', fontWeight: 800 }}>
                                <CurrencyRupeeIcon sx={{ width: 20, color: '#BA0F30' }} />
                                {new Intl.NumberFormat('en-IN').format(yeartotAmount)}
                            </Chip>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ width: 130, ml: 1.5 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={searchYear}
                                views={['year']}
                                openTo="year"
                                size="sm"
                                inputFormat='yyyy'
                                onChange={(newValue) => {
                                    setSearchYear(newValue);
                                }}
                                maxDate={new Date()}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={null} size='small'
                                        sx={{
                                            height: 35,
                                            borderRadius: 100, bgcolor: '#BDC3CB'
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ width: 355, margin: 'auto', pl: 2.5, pt: 1 }}>
                        <Box sx={{ ml: 5 }} >
                            {yearFlag === 1 ?
                                <PieChart
                                    height={200}
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
                                            outerRadius: 90,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                            startAngle: -180,
                                            endAngle: 180,
                                            cl: 180,
                                            cb: 1
                                        }
                                    ]}
                                    slotProps={{
                                        legend: { hidden: true },
                                    }}
                                />
                                :
                                <Box sx={{ pt: 5, margin: 'auto' }}>
                                    <DonutSmallSharpIcon sx={{ height: 150, width: 150, color: '#9CA6B8' }} />
                                </Box>
                            }
                        </Box>
                    </Box>
                </Paper> */}


                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={searchMonthAndYear}
                                views={['year', 'month']}
                                size="sm"
                                inputFormat='MMM-yyyy'
                                onChange={(newValue) => {
                                    setSearchMonthAndYear(newValue);
                                }}

                                renderInput={(params) => (
                                    <TextField {...params} helperText={null} size='small'
                                        sx={{
                                            height: 35,
                                            borderRadius: 100, borderColor: 'red', bgcolor: '#BDC3CB'
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider> */}
            </Box>
        </Paper>
    )
}

export default memo(BillsChartsAndGraph)