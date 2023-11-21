import { Box, Button, CssVarsProvider, Typography, Grid } from '@mui/joy'
import React, { useState, memo } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {
    getDailyCount,
    getDayDetails,
    getDaysDetails,
    getMonthDetails,
    getMonthlyCount,
    getSelectedDaysDetails,
    getWeeklyBackup,
    getWeeklyDetails,
    getYearDetails,
    getYearlyBackup,
} from 'src/redux/actions/BackupDashboard.action'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import VerificationDetailTable from './TableComponents/DayBackup/VerificationDetailTable'
import DayCountTable from './TableComponents/DayBackup/DayCountTable'
import { infoNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment'
import CurrentMonthTable from './TableComponents/MonthBackup/CurrentMonthTable'
import NextMonthTable from './TableComponents/MonthBackup/NextMonthTable'
import MonthVerificationTAble from './TableComponents/MonthBackup/MonthVerificationTAble'
import CurrentYearTable from './TableComponents/YearBackup/CurrentYearTable'
import NexrYearTable from './TableComponents/YearBackup/NexrYearTable'
import YearlyVerificationTable from './TableComponents/YearBackup/YearlyVerificationTable'
import WeekCountTable from './TableComponents/WeeklyBackup/WeekCountTable'
import NextWeekTable from './TableComponents/WeeklyBackup/NextWeekTable'
import WeekVerificationTable from './TableComponents/WeeklyBackup/WeekVerificationTable'
import SelectedDaysTable from './TableComponents/AlternativeDays/SelectedDaysTable'
import VerificationDaysTable from './TableComponents/AlternativeDays/VerificationDaysTable'
import { addDays, eachDayOfInterval, endOfWeek, startOfWeek, } from 'date-fns';
import format from 'date-fns/format'
import NextDayBackupTable from './TableComponents/DayBackup/NextDayBackupTable'
import SelectDaysUpcoming from './TableComponents/AlternativeDays/SelectDaysUpcoming'
import { Paper } from '@mui/material'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewListIcon from '@mui/icons-material/ViewList';
import { isAfter, startOfMonth, startOfYear } from 'date-fns';
import MonthlyTarifView from '../../ItManagement/DashboardBackup/DashBoardTariff/MonthlyTarrif/MonthlyTarifView';
import QuaterlyTariffView from '../../ItManagement/DashboardBackup/DashBoardTariff/QuaterlyTarrif/QuaterlyTariffView';
import YearlyTariffView from '../../ItManagement/DashboardBackup/DashBoardTariff/YearlyTarrif/YearlyTariffView';
import MonthlyPendingBill from '../../ItManagement/DashboardBackup/DashBoardTariff/MonthlyTarrif/MonthlyPendingBill';
import QuaterlyPendingBill from '../../ItManagement/DashboardBackup/DashBoardTariff/QuaterlyTarrif/QuaterlyPendingBill';
import YearlyPendingBillView from '../../ItManagement/DashboardBackup/DashBoardTariff/YearlyTarrif/YearlyPendingBillView';

const Newdashboard = () => {
    const dispatch = useDispatch()



    const [count, setCount] = useState(0);
    const [dayscount, setDayscount] = useState(0)
    const [daysNow, setdaysNow] = useState([])
    const [daysflag, setdaysflag] = useState(0)
    const [daysdue, setdaysdue] = useState([])
    const [dayserror, setDayserror] = useState([])
    const [daysnext, setDaysnext] = useState([])
    const [daysList, setDaysList] = useState([])
    const [weeklydata, setWeeklydata] = useState([])
    const [weekflag, setWeekflag] = useState(0)
    const [weekduedata, setWeekduedata] = useState([])
    const [weekerrordata, setWeekerrordata] = useState([])
    const [dayflag, setDayFlag] = useState(0)
    const [daydata, setDayData] = useState([])
    const [dueData, setDueData] = useState([])
    const [errorData, setErrorData] = useState([])
    const [monthflag, setMonthflag] = useState(0)
    const [monthdata, setMonthdata] = useState([])
    const [dueMonthdata, setDueMonthdata] = useState([])
    const [ErrorMonthdata, setErrorMonthdata] = useState([])
    const [yearflag, setYearflag] = useState(0)
    const [yeardata, setYeardata] = useState([])
    const [dueYearData, setdueYearData] = useState([])
    const [errorYearData, setErrorYearData] = useState([])
    const [altflag, setAltflag] = useState(0)
    const [daytabflag, setDaytabflag] = useState(0)
    const [weektabflag, setWeektabflag] = useState(0)
    const [monthtabflag, setMonthtabflag] = useState(0)
    const [yeartabflag, setYeartabflag] = useState(0)
    const [weekcount, setweekcount] = useState(0)
    const [altcount, setAltcount] = useState(0)
    const [monthcount, setMonthcount] = useState(0)
    const [yearcount, setyearcount] = useState(0)
    const history = useHistory()


    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    const backtoHome = useCallback(() => {
        history.push('/Home')
        // setBacktodash(0)
    }, [history])
    useEffect(() => {
        dispatch(getDailyCount())
        dispatch(getDayDetails())
        dispatch(getMonthlyCount())
        dispatch(getMonthDetails())
        dispatch(getYearlyBackup())
        dispatch(getYearDetails())
        dispatch(getWeeklyBackup())
        dispatch(getWeeklyDetails())
        dispatch(getSelectedDaysDetails())
        dispatch(getDaysDetails())
    }, [dispatch, count, setDayData])
    const dailycount = useSelector((state) => state?.getDailyCount?.DailyCount)
    const daysdetails = useSelector((state) => state?.getDayDetails?.dayslist)
    const monthlycount = useSelector((state) => state?.getMonthlyCount?.MonthlyCount)
    const monthdetails = useSelector((state) => state?.getMonthDetails?.Monthdata)
    const yearlycounts = useSelector((state) => state?.getYearlyBackup?.YearlyInitial)
    const yeardetails = useSelector((state) => state?.getYearDetails?.Yearlydata)
    const weeklycount = useSelector((state) => state?.getWeeklyBackup?.Weekinitial)
    const weekdetails = useSelector((state) => state?.getWeeklyDetails?.WeekInit)
    const selecteddays = useSelector((state) => state?.getSelectedDaysDetails?.Daysinitial)
    const daysdata = useSelector((state) => state?.getDaysDetails?.DaysData)
    useEffect(() => {
        if (daysdetails.length !== 0 || count !== 0) {
            const newdata = daysdetails.filter((val) => val.backup_daily_date === moment(new Date()).format('YYYY-MM-DD'))
            setDayData(newdata)
            const currentcount = daysdetails.filter((val) => val.verify_status === 0 && val.backup_daily_date === moment(new Date()).format('YYYY-MM-DD'))
            setDayscount(currentcount)
            const duedata = daysdetails.filter((val) => val.verify_status === 0 && val.backup_daily_date < moment(new Date()).format('YYYY-MM-DD'))
            setDueData(duedata)
            const errordata = daysdetails.filter((val) => val.verify_status === 2 && val.backup_daily_date <= moment(new Date()).format('YYYY-MM-DD'))
            setErrorData(errordata)
        }
    }, [daysdetails, count])
    const DailyCountDetails = useCallback(() => {
        if (daydata.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setDaytabflag(1)
            setDayFlag(1)
        }
    }, [daydata])
    const DueCountDetails = useCallback(() => {
        if (dueData.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setDaytabflag(1)
            setDayFlag(2)
        }
    }, [dueData])
    const BackupError = useCallback(() => {
        if (errorData.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setDaytabflag(1)
            setDayFlag(3)
        }
    }, [errorData])
    const BackupTomorrow = useCallback(() => {
        if (dailycount.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setDayFlag(4)
        }
    }, [dailycount])

    const ViewVerificationReport = useCallback(() => {
        setDayFlag(5)

    }, [])
    useEffect(() => {
        if (weeklycount.length !== 0) {
            const getendOfWeek = endOfWeek(new Date())
            const postdata = weeklycount?.map((val) => {
                return {
                    time_slno: val.time_slno,
                    backup_slno: val.backup_slno,
                    backup_weekly_date: moment(new Date(getendOfWeek)).format('YYYY-MM-DD'),
                    backup_schedule_time: val.backup_schedule_time,
                    verify_status: 0,
                    create_user: id
                }
            })
            const InsertBackupWeekly = async (postdata) => {
                const result = await axioslogin.post('/backupdash/insertweek', postdata);
                const { success } = result.data;
                if (success === 1) {
                    setCount(count + 1);
                }
                else {
                    return 0
                }
            }
            InsertBackupWeekly(postdata)
        }
    }, [weeklycount, id, count])
    useEffect(() => {
        if (weekdetails.length !== 0) {
            const getstartOfWeek = startOfWeek(new Date())
            const getendOfWeek = endOfWeek(new Date())
            const newdata = weekdetails.filter((val) => {
                if (((moment(new Date(getstartOfWeek)).format('YYYY-MM-DD')) <= val.backup_weekly_date)
                    && ((val.backup_weekly_date <= moment(new Date(getendOfWeek)).format('YYYY-MM-DD')))) {
                    return val.backup_weekly_date
                }
                else {
                    return 0
                }
            })
            setWeeklydata(newdata)
            const countdata = weekdetails.filter((val) => {
                if (((moment(new Date(getstartOfWeek)).format('YYYY-MM-DD')) <= val.backup_weekly_date)
                    && ((val.backup_weekly_date <= moment(new Date(getendOfWeek)).format('YYYY-MM-DD'))) && val.verify_status === 0) {
                    return val.backup_weekly_date
                }
                else {
                    return 0
                }
            })
            setweekcount(countdata)
            const duedata = weekdetails.filter((val) => val.verify_status === 0 && val.backup_weekly_date < moment(new Date(getstartOfWeek)).format('YYYY-MM-DD'))
            setWeekduedata(duedata)
            const errordata = weekdetails.filter((val) => val.verify_status === 2 && val.backup_weekly_date <= moment(new Date()).format('YYYY-MM-DD'))
            setWeekerrordata(errordata)
        }
    }, [weekdetails])
    const WeeklyCountDetails = useCallback(() => {
        if (weeklydata.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setWeekflag(1)
            setWeektabflag(1)
        }
    }, [weeklydata])
    const DueWeekDetails = useCallback(() => {
        if (weekduedata.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setWeekflag(2)
            setWeektabflag(1)
        }
    }, [weekduedata])
    const WeekBackupError = useCallback(() => {
        if (weekerrordata.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setWeekflag(3)
            setWeektabflag(1)
        }
    }, [weekerrordata])
    const BackupWeekTomorrow = useCallback(() => {
        if (weeklycount.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setWeekflag(4)
        }
    }, [weeklycount])

    const WeekVerificationReport = useCallback(() => {
        setWeekflag(5)
    }, [])
    useEffect(() => {
        if (daysdata.length !== 0) {
            const getdata = async () => {
                const result = await axioslogin.get('/backupdash/exist')
                const { success } = result.data
                if (success === 1) {
                    const startdate = moment(new Date()).format('YYYY-MM-DD')
                    const postdata = daysdata?.map((val) => {
                        return {
                            backup_slno: val.backup_slno,
                            selected_days: val.selected_days,
                            backup_selected_date: startdate,
                            due_date: moment(addDays(new Date(startdate), val.selected_days)).format('YYYY-MM-DD'),
                            verify_status: 0,
                            create_user: val.create_user
                        }
                    })
                    const InsertSelectedDays = async (postdata) => {
                        const result = await axioslogin.post('/backupdash/add', postdata);
                        const { success } = result.data;
                        if (success === 1) {
                            setCount(count + 1);
                        }
                        else {
                            return 0
                        }
                    }
                    InsertSelectedDays(postdata)
                }
                else {
                }
            }
            getdata()
        }
    }, [daysdata, count])
    useEffect(() => {
        if (selecteddays.length !== 0) {
            const newdata = selecteddays.filter((val) => (val.verify_status === 0 || 1) && (val.due_date === moment(new Date()).format('YYYY-MM-DD')))
            setdaysNow(newdata)
            const countdata = selecteddays.filter((val) => (val.verify_status === 0) && (val.due_date === moment(new Date()).format('YYYY-MM-DD')))
            setAltcount(countdata)
            const duedata = selecteddays.filter((val) => val.verify_status === 0 && val.due_date < moment(new Date()).format('YYYY-MM-DD'))
            setdaysdue(duedata)
            const errordata = selecteddays.filter((val) => val.verify_status === 2 && val.due_date <= moment(new Date()).format('YYYY-MM-DD'))
            setDayserror(errordata)
            const nextdata = selecteddays.filter((val) => val.verify_status === 0 && val.due_date > moment(new Date()).format('YYYY-MM-DD'))
            setDaysnext(nextdata)
        }
    }, [selecteddays])
    const SelectedDaysDetails = useCallback(() => {
        if (daysNow.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setdaysflag(1)
            setAltflag(1)
        }
    }, [daysNow])
    const DueSelectedDays = useCallback(() => {
        if (daysdue.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setdaysflag(2)
            setAltflag(1)
        }
    }, [daysdue])
    const ErrorSelectedDays = useCallback(() => {
        if (dayserror.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setdaysflag(3)
            setAltflag(1)
        }
    }, [dayserror])
    const NextSelectedDays = useCallback(() => {
        if (daysnext.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setdaysflag(4)
        }
    }, [daysnext])

    const getVerificationReport = useCallback(() => {
        setdaysflag(5)
    }, [])
    useEffect(() => {
        const getdata = async () => {
            const result = await axioslogin.get('/backupdash/lastday')
            const { success, data } = result.data
            if (success === 2) {
                const lastBackup = data[0];
                if (lastBackup.last_backup_date === null) {
                    const dayrange = eachDayOfInterval({ start: new Date(), end: new Date() })
                    const newdata = dayrange?.map((val) => {
                        return {
                            backup_date: moment(new Date(val)).format('YYYY-MM-DD')
                        }
                    })
                    setDaysList(newdata);
                }
                else {
                    if (lastBackup.last_backup_date === format(new Date(), "yyyy-MM-dd")) {

                    }
                    else {
                        const dayrange = eachDayOfInterval({ start: addDays(new Date(lastBackup.last_backup_date), 1), end: new Date() })

                        const newdata = dayrange?.map((val) => {
                            return {
                                backup_date: moment(new Date(val)).format('YYYY-MM-DD')
                            }
                        })
                        setDaysList(newdata);
                    }
                }
            }
        }
        getdata()
    }, [])
    useEffect(() => {
        if (dailycount.length !== 0) {
            const postdata = dailycount?.map((val) => {
                const item = daysList?.map((value) => {
                    return {
                        time_slno: val.time_slno,
                        backup_slno: val.backup_slno,
                        backup_daily_date: moment(new Date(value.backup_date)).format('YYYY-MM-DD'),
                        backup_schedule_time: val.backup_schedule_time,
                        verify_status: 0,
                        create_user: id
                    }
                })
                return item
            })
            const InsertArry = [];
            for (const innerArray of postdata) {
                for (const obj of innerArray) {
                    InsertArry.push(obj);
                }
            }
            const InsertBackupDaily = async (InsertArry) => {
                const result = await axioslogin.post('/backupdash/insertdaily', InsertArry);
                const { success } = result.data;
                if (success === 1) {
                    setCount(count + 1);
                }
                else {
                    return 0
                }
            }
            InsertBackupDaily(InsertArry)
        }
    }, [dailycount, daysList, id, count])
    useEffect(() => {
        if (monthlycount.length !== 0) {
            const postdata = monthlycount?.map((val) => {
                return {
                    time_slno: val.time_slno,
                    backup_slno: val.backup_slno,
                    backup_monthly_date: moment(new Date()).format('YYYY-MM-01'),
                    backup_schedule_time: val.backup_schedule_time,
                    verify_status: 0,
                    create_user: id
                }
            })
            const InsertBackupMonthly = async (postdata) => {
                const result = await axioslogin.post('/backupdash/insertmonthly', postdata);
                const { success } = result.data;
                if (success === 1) {
                    setCount(count + 1);
                }
                else {
                    return 0
                }
            }
            InsertBackupMonthly(postdata)
        }
    }, [monthlycount, id, count])
    useEffect(() => {
        if (yearlycounts.length !== 0) {
            const postdata = yearlycounts?.map((val) => {
                return {
                    time_slno: val.time_slno,
                    backup_slno: val.backup_slno,
                    backup_yearly_date: moment(new Date()).format('YYYY-01-01'),
                    backup_schedule_time: val.backup_schedule_time,
                    verify_status: 0,
                    create_user: id
                }
            })
            const InsertBackupYearly = async (postdata) => {
                const result = await axioslogin.post('/backupdash/insertyearly', postdata);
                const { success } = result.data;
                if (success === 1) {
                    setCount(count + 1);
                }
                else {
                    return 0
                }
            }
            InsertBackupYearly(postdata)
        }
    }, [yearlycounts, id, count])
    useEffect(() => {
        if (monthdetails.length !== 0) {
            const newdata = monthdetails.filter((val) => val.backup_monthly_date === moment(new Date()).format('YYYY-MM-01'))
            setMonthdata(newdata)
            const countmonth = monthdetails.filter((val) => val.verify_status === 0 && val.backup_monthly_date === moment(new Date()).format('YYYY-MM-01'))
            setMonthcount(countmonth)
            const duedata = monthdetails.filter((val) => val.verify_status === 0 && val.backup_monthly_date < moment(new Date()).format('YYYY-MM-01'))
            setDueMonthdata(duedata)
            const errordata = monthdetails.filter((val) => val.verify_status === 2 && val.backup_monthly_date <= moment(new Date()).format('YYYY-MM-01'))
            setErrorMonthdata(errordata)
        }
    }, [monthdetails, monthlycount])
    const MonthlyDetails = useCallback(() => {
        if (monthdata.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setMonthflag(1)
            setMonthtabflag(1)
        }
    }, [monthdata])
    const DueMonthDetails = useCallback(() => {
        if (dueMonthdata.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setMonthflag(2)
            setMonthtabflag(1)
        }
    }, [dueMonthdata])
    const MonthBackupError = useCallback(() => {
        if (ErrorMonthdata.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setMonthflag(3)
            setMonthtabflag(1)
        }
    }, [ErrorMonthdata])
    const NextMonthBackupDetails = useCallback(() => {
        if (monthlycount.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setMonthflag(4)
        }
    }, [monthlycount])
    const MonthVerificationReport = useCallback(() => {
        setMonthflag(5)
    }, [])
    useEffect(() => {
        if (yeardetails.length !== 0) {
            const newdata = yeardetails.filter((val) => val.backup_yearly_date === moment(new Date()).format('YYYY-01-01'))
            setYeardata(newdata)
            const countyear = yeardetails.filter((val) => val.verify_status === 0 && val.backup_yearly_date === moment(new Date()).format('YYYY-01-01'))
            setyearcount(countyear)
            const duedata = yeardetails.filter((val) => val.verify_status === 0 && val.backup_yearly_date < moment(new Date()).format('YYYY-01-01'))
            setdueYearData(duedata)
            const errordata = yeardetails.filter((val) => val.verify_status === 2 && val.backup_yearly_date <= moment(new Date()).format('YYYY-01-01'))
            setErrorYearData(errordata)
        }
    }, [yeardetails, yearlycounts])
    const YearlyDetails = useCallback(() => {
        if (yeardata.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setYearflag(1)
            setYeartabflag(1)
        }
    }, [yeardata])
    const DueYearDetails = useCallback(() => {
        if (dueYearData.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setYearflag(2)
            setYeartabflag(1)
        }
    }, [dueYearData])
    const YearBackupErrorDetails = useCallback(() => {
        if (errorYearData.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setYearflag(3)
            setYeartabflag(1)
        }
    }, [errorYearData])
    const NextYearBackupDetails = useCallback(() => {
        if (yearlycounts.length === 0) {
            infoNotify("No Data Found")
        }
        else {
            setYearflag(4)
        }
    }, [yearlycounts])

    const YearlyVerificationReport = useCallback(() => {
        setYearflag(5)
    }, [])



    ///////////////////////////////////////////////////////////////////////////

    const [monthly, setmonthly] = useState(0);
    const [quaterly, setquarterly] = useState(0);
    const [yearly, setyearly] = useState(0);
    const [monthlyPendingBill, setmonthlyPendingBill] = useState(0);
    const [quaterlyPendingBill, setquaterlyPendingBill] = useState(0);
    const [yearlyPendingBill, setyearlyPendingBill] = useState(0);
    const [monthlydata, setMonthlydata] = useState([])
    const [quaterlydata, setQuaterlydata] = useState([])
    const [yearlydata, setYearlydata] = useState([])
    const [monthlyCount, setMonthlyCount] = useState(0)
    const [quaterlyCount, setQuaterlyCount] = useState(0)
    const [yearCount, setYearCount] = useState(0)
    const ViewMonthlyList = useCallback((e) => {
        setmonthly(1);
        setquarterly(0);
        setyearly(0);
        setmonthlyPendingBill(0);
        setquaterlyPendingBill(0);
        setyearlyPendingBill(0);
    }, [])
    const ViewQuaterlyList = useCallback((e) => {
        setquarterly(1);
        setmonthly(0);
        setyearly(0);
        setmonthlyPendingBill(0);
        setquaterlyPendingBill(0);
        setyearlyPendingBill(0);
    }, [])
    const ViewYearlyList = useCallback((e) => {
        setyearly(1);
        setmonthly(0);
        setquarterly(0);
        setmonthlyPendingBill(0);
        setquaterlyPendingBill(0);
        setyearlyPendingBill(0);;
    }, [])

    const MonthlyPendingData = monthlydata && monthlydata.filter((val) => val.payed_status !== 1)
    const MonthlyPendingBillList = useCallback((e) => {
        setyearly(0);
        setmonthly(0);
        setquarterly(0);
        setmonthlyPendingBill(1);
        setquaterlyPendingBill(0);
        setyearlyPendingBill(0);
    }, [])
    const QuaterlyPendingData = quaterlydata && quaterlydata.filter((val) => val.payed_status !== 1)
    const QuaterlyPendingBillList = useCallback((e) => {
        setyearly(0);
        setmonthly(0);
        setquarterly(0);
        setquaterlyPendingBill(1)
        setmonthlyPendingBill(0)
        setyearlyPendingBill(0)
    }, [])
    const YearlyPendingData = yearlydata && yearlydata.filter((val) => val.payed_status !== 1)
    const YearlyPendingBillList = useCallback((e) => {
        setyearly(0);
        setmonthly(0);
        setquarterly(0);
        setquaterlyPendingBill(0)
        setmonthlyPendingBill(0)
        setyearlyPendingBill(1)
    }, [])
    useEffect(() => {
        const monthlyy = format(new Date(startOfMonth(new Date())), "yyyy-MM-dd")
        const yearStart = format(new Date(startOfYear(new Date())), "yyyy-MM-dd")
        const today = new Date();
        const currentYear = today.getFullYear();
        const startOfApr = startOfMonth(new Date(currentYear, 3, 1)); // April
        const startOfJul = startOfMonth(new Date(currentYear, 6, 1)); // July
        const startOfOct = startOfMonth(new Date(currentYear, 9, 1)); // October

        const initial = async (checking) => {
            const result1 = await axioslogin.post(`/tarrifDetails/CheckInsetMonthlyOrNot`, checking);
            const { success } = result1.data
            if (success !== 1) {
                const result = await axioslogin.post(`/tarrifDetails/monthlyTarrifInsert`, checking);
                const { success } = result.data
                if (success === 1) {
                    return 0
                }
            }
        }
        const getMonthlywise = async () => {

            const result = await axioslogin.get('tarrifDetails/monthlyview')
            const { success, data
            } = result.data
            if (success === 2) {
                data && data.map((val) => {
                    const checking = {
                        device_slno: val.device_slno,
                        tarrif_amount: val.amount,
                        create_user: id,
                        monthly_bill_generate: monthlyy
                    }
                    initial(checking)
                    return 0
                })
            }
        }
        const quater = async (checking) => {
            const result1 = await axioslogin.post(`/tarrifDetails/CheckInsetQuaterlyOrNot`, checking);
            const { success } = result1.data
            if (success !== 1) {
                const result = await axioslogin.post(`/tarrifDetails/quaterlyTarrifInsert`, checking);
                const { success } = result.data
                if (success === 1) {
                    return 0
                }
            }
        }
        const getQuaterlywise = async () => {
            const result = await axioslogin.get('tarrifDetails/quaterlyview')
            const { success, data
            } = result.data
            if (success === 2) {
                data && data.map((val) => {
                    const checking = {
                        device_slno: val.device_slno,
                        tarrif_amount: val.amount,
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
            const result1 = await axioslogin.post(`/tarrifDetails/CheckInsetYearlyOrNot`, checking);
            const { success } = result1.data
            if (success !== 1) {
                const result = await axioslogin.post(`/tarrifDetails/yearlyTarrifInsert`, checking);
                const { success } = result.data
                if (success === 1) {
                    return 0
                }
            }
        }
        const getyearlywise = async () => {
            const result = await axioslogin.get('tarrifDetails/yearlyview')
            const { success, data
            } = result.data
            if (success === 2) {
                data && data.map((val) => {
                    const checking = {
                        device_slno: val.device_slno,
                        tarrif_amount: val.amount,
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
    }, [count, id])
    useEffect(() => {
        const monthlyy = format(new Date(startOfMonth(new Date())), "yyyy-MM-dd")
        const getMonthlywiseArray = async () => {
            const Monthdataget = {
                monthly_bill_generate: monthlyy
            }
            const result1 = await axioslogin.post(`/tarrifDetails/getMonthData`, Monthdataget);
            const { success, dataa } = result1.data
            if (success === 1) {
                setMonthlydata(dataa);
            }
        }
        getMonthlywiseArray()
    }, [monthlyCount])
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
            const result1 = await axioslogin.post(`/tarrifDetails/getQuaterlyData`, Quaterdataget);
            const { success, dataa } = result1.data
            if (success === 1) {
                setQuaterlydata(dataa);
            }
        }
        getQuaterlywiseArray()
    }, [quaterlyCount])
    useEffect(() => {
        const yearStart = format(new Date(startOfYear(new Date())), "yyyy-MM-dd")
        const getyearlywiseArray = async () => {
            const Yeardataget = {
                yearly_bill_generate: yearStart
            }
            const result1 = await axioslogin.post(`/tarrifDetails/getYearlyData`, Yeardataget);
            const { success, dataa } = result1.data
            if (success === 1) {
                setYearlydata(dataa);
            }
        }
        getyearlywiseArray()
    }, [yearCount])
    return (
        <Fragment>
            <Paper>
                {
                    // alternativedays
                    altflag === 1 ? <SelectedDaysTable alternativedata={daysflag === 1 ? daysNow : daysflag === 2 ? daysdue : daysflag === 3 ? dayserror : []}
                        daysflag={daysflag} setAltflag={setAltflag} count={count} setCount={setCount} /> :
                        daysflag === 4 ? <SelectDaysUpcoming daysnext={daysnext} setdaysflag={setdaysflag} /> :
                            daysflag === 5 ? <VerificationDaysTable setdaysflag={setdaysflag} /> :
                                // daily
                                daytabflag === 1 ? <DayCountTable dayTabledata={dayflag === 1 ? daydata : dayflag === 2 ? dueData : dayflag === 3 ? errorData : []}
                                    setDaytabflag={setDaytabflag} dayflag={dayflag} count={count} setCount={setCount} /> :
                                    dayflag === 4 ? <NextDayBackupTable dailycount={dailycount} setDayFlag={setDayFlag} /> :
                                        dayflag === 5 ? <VerificationDetailTable setDayFlag={setDayFlag} /> :
                                            weektabflag === 1 ? <WeekCountTable weektableData={weekflag === 1 ? weeklydata : weekflag === 2 ? weekduedata : weekflag === 3 ? weekerrordata : []}
                                                setWeektabflag={setWeektabflag} weekflag={weekflag} count={count} setCount={setCount} /> :
                                                weekflag === 4 ? <NextWeekTable weeklycount={weeklycount} setWeekflag={setWeekflag} /> :
                                                    weekflag === 5 ? <WeekVerificationTable setWeekflag={setWeekflag} /> :
                                                        monthtabflag === 1 ? <CurrentMonthTable monthtabdata={monthflag === 1 ? monthdata : monthflag === 2 ? dueMonthdata : monthflag === 3 ? ErrorMonthdata : []}
                                                            setMonthtabflag={setMonthtabflag} monthflag={monthflag} count={count} setCount={setCount} /> :
                                                            monthflag === 4 ? <NextMonthTable nextmonthdata={monthlycount} setMonthflag={setMonthflag} /> :
                                                                monthflag === 5 ? <MonthVerificationTAble setMonthflag={setMonthflag} /> :
                                                                    yeartabflag === 1 ? <CurrentYearTable yeartabData={yearflag === 1 ? yeardata : yearflag === 2 ? dueYearData : yearflag === 3 ? errorYearData : []}
                                                                        setYeartabflag={setYeartabflag} yearflag={yearflag} count={count} setCount={setCount} /> :
                                                                        yearflag === 4 ? <NexrYearTable nextyeardata={yearlycounts} setYearflag={setYearflag} /> :
                                                                            yearflag === 5 ? <YearlyVerificationTable setYearflag={setYearflag} /> :
                                                                                // communication device detail
                                                                                monthly === 1 ? <MonthlyTarifView monthlydata={monthlydata} setmonthly={setmonthly}
                                                                                    monthlyCount={monthlyCount} setMonthlyCount={setMonthlyCount} /> :
                                                                                    quaterly === 1 ? <QuaterlyTariffView quaterlydata={quaterlydata} setquarterly={setquarterly}
                                                                                        quaterlyCount={quaterlyCount} setQuaterlyCount={setQuaterlyCount} /> :
                                                                                        yearly === 1 ? <YearlyTariffView yearlydata={yearlydata} setyearly={setyearly}
                                                                                            yearCount={yearCount} setYearCount={setYearCount} /> :
                                                                                            monthlyPendingBill === 1 ? <MonthlyPendingBill
                                                                                                monthlyCount={monthlyCount}
                                                                                                setMonthlyCount={setMonthlyCount}
                                                                                                MonthlyPendingData={MonthlyPendingData}
                                                                                                setmonthlyPendingBill={setmonthlyPendingBill}
                                                                                                setCount={setCount} count={count} /> :
                                                                                                quaterlyPendingBill === 1 ? <QuaterlyPendingBill
                                                                                                    quaterlyCount={quaterlyCount}
                                                                                                    setQuaterlyCount={setQuaterlyCount}
                                                                                                    setquaterlyPendingBill={setquaterlyPendingBill}
                                                                                                    QuaterlyPendingData={QuaterlyPendingData}
                                                                                                    setCount={setCount}
                                                                                                    count={count} /> :
                                                                                                    yearlyPendingBill === 1 ? <YearlyPendingBillView
                                                                                                        yearCount={yearCount}
                                                                                                        setYearCount={setYearCount}
                                                                                                        setyearlyPendingBill={setyearlyPendingBill}
                                                                                                        YearlyPendingData={YearlyPendingData}
                                                                                                        setCount={setCount}
                                                                                                        count={count} /> :
                                                                                                        <CardMasterClose close={backtoHome}>
                                                                                                            <Box sx={{ p: 1 }}>
                                                                                                                <Typography sx={{ pl: 1, fontSize: 20 }}> Backup Checks & Monitoring</Typography>
                                                                                                            </Box>
                                                                                                            <Paper variant="outlined" sx={{ py: 0.5, height: 100 }}>
                                                                                                                <Box sx={{ pl: 0.2 }} >
                                                                                                                    <Typography sx={{ pl: 1 }}>Daily</Typography>
                                                                                                                </Box>
                                                                                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Today&apos;s Backup</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={DailyCountDetails}
                                                                                                                                    >
                                                                                                                                        {dayscount.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Dues</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={DueCountDetails}
                                                                                                                                    >
                                                                                                                                        {dueData.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Errors</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={BackupError}
                                                                                                                                    >
                                                                                                                                        {errorData.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Upcoming Backup</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={BackupTomorrow}
                                                                                                                                    >
                                                                                                                                        {dailycount.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, justifyContent: 'center', pr: 1 }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 280,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            justifyContent: 'center',
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <CssVarsProvider>
                                                                                                                                <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 10, fontSize: 14 }}
                                                                                                                                    onClick={ViewVerificationReport}
                                                                                                                                >Verification Report</Button>
                                                                                                                            </CssVarsProvider>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                </Box>
                                                                                                            </Paper>
                                                                                                            {/* weekly */}
                                                                                                            <Paper variant="outlined" sx={{ py: 0.5, height: 100 }}>
                                                                                                                <Box sx={{ pl: 0.2 }} >
                                                                                                                    <Typography sx={{ pl: 1 }}>Weekly</Typography>
                                                                                                                </Box>
                                                                                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Current week</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={WeeklyCountDetails}
                                                                                                                                    >
                                                                                                                                        {weekcount.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Dues</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={DueWeekDetails}
                                                                                                                                    >
                                                                                                                                        {weekduedata.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Errors</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={WeekBackupError}
                                                                                                                                    >
                                                                                                                                        {weekerrordata.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Upcoming Backup</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={BackupWeekTomorrow}
                                                                                                                                    >
                                                                                                                                        {weeklycount.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, justifyContent: 'center' }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 280,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            justifyContent: 'center',
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <CssVarsProvider>
                                                                                                                                <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 10, fontSize: 14 }}
                                                                                                                                    onClick={WeekVerificationReport}
                                                                                                                                >Verification Report</Button>
                                                                                                                            </CssVarsProvider>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                </Box>
                                                                                                            </Paper>
                                                                                                            {/* Monthly */}
                                                                                                            <Paper variant="outlined" sx={{ py: 0.5, height: 100 }}>
                                                                                                                <Box sx={{ pl: 0.2 }} >
                                                                                                                    <Typography sx={{ pl: 1 }}>Monthly</Typography>
                                                                                                                </Box>
                                                                                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Current Month</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={MonthlyDetails}
                                                                                                                                    >
                                                                                                                                        {monthcount.length}</Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Dues</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={DueMonthDetails}
                                                                                                                                    >
                                                                                                                                        {dueMonthdata.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Errors</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={MonthBackupError}
                                                                                                                                    >
                                                                                                                                        {ErrorMonthdata.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Upcoming Backup</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={NextMonthBackupDetails}
                                                                                                                                    >
                                                                                                                                        {monthlycount.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, justifyContent: 'center' }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 280,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            justifyContent: 'center',
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <CssVarsProvider>
                                                                                                                                <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 10, fontSize: 14 }}
                                                                                                                                    onClick={MonthVerificationReport}
                                                                                                                                >Verification Report</Button>
                                                                                                                            </CssVarsProvider>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                </Box>
                                                                                                            </Paper>
                                                                                                            {/* Yearly */}
                                                                                                            <Paper variant="outlined" sx={{ py: 0.5, height: 100 }}>
                                                                                                                <Box sx={{ pl: 0.2 }} >
                                                                                                                    <Typography sx={{ pl: 1 }}>Yearly</Typography>
                                                                                                                </Box>
                                                                                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Current Year</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={YearlyDetails}
                                                                                                                                    >
                                                                                                                                        {yearcount.length}</Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Dues</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={DueYearDetails}
                                                                                                                                    >
                                                                                                                                        {dueYearData.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Error</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={YearBackupErrorDetails}
                                                                                                                                    >
                                                                                                                                        {errorYearData.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Upcoming Backup</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={NextYearBackupDetails}
                                                                                                                                    >
                                                                                                                                        {yearlycounts.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, justifyContent: 'center' }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 280,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            justifyContent: 'center',
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <CssVarsProvider>
                                                                                                                                <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 10, fontSize: 14 }}
                                                                                                                                    onClick={YearlyVerificationReport}
                                                                                                                                >Verification Report</Button>
                                                                                                                            </CssVarsProvider>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                </Box>
                                                                                                            </Paper>
                                                                                                            {/* Selected days */}
                                                                                                            <Paper variant="outlined" sx={{ py: 0.5, height: 100 }}>
                                                                                                                <Box sx={{ pl: 0.2 }} >
                                                                                                                    <Typography sx={{ pl: 1 }}>Alternative Days</Typography>
                                                                                                                </Box>
                                                                                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Today&apos;s Backup</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={SelectedDaysDetails}
                                                                                                                                    >
                                                                                                                                        {altcount.length}</Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Dues</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={DueSelectedDays}
                                                                                                                                    >
                                                                                                                                        {daysdue.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Backup Errors</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={ErrorSelectedDays}
                                                                                                                                    >
                                                                                                                                        {dayserror.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 300,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <Box sx={{ flex: 3, pt: 1 }}>
                                                                                                                                <Typography sx={{ fontSize: 15 }}>Upcoming Backup</Typography>
                                                                                                                            </Box>
                                                                                                                            <Box sx={{ flex: 1, pt: 0.3 }}>
                                                                                                                                <CssVarsProvider>
                                                                                                                                    <Button variant="outlined" sx={{ width: 40, height: 40, borderRadius: 10, fontSize: 20 }}
                                                                                                                                        onClick={NextSelectedDays}
                                                                                                                                    >
                                                                                                                                        {daysnext.length}
                                                                                                                                    </Button>
                                                                                                                                </CssVarsProvider>
                                                                                                                            </Box>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                    <Box sx={{ px: 1, flex: 1, justifyContent: 'center' }}>
                                                                                                                        <Paper variant="outlined" sx={{
                                                                                                                            width: 280,
                                                                                                                            height: 60,
                                                                                                                            display: "flex",
                                                                                                                            p: 1,
                                                                                                                            borderRadius: 2,
                                                                                                                            justifyContent: 'center',
                                                                                                                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                                                                                        }}
                                                                                                                        >
                                                                                                                            <CssVarsProvider>
                                                                                                                                <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 10, fontSize: 14 }}
                                                                                                                                    onClick={getVerificationReport}
                                                                                                                                >Verification Report</Button>
                                                                                                                            </CssVarsProvider>
                                                                                                                        </Paper>
                                                                                                                    </Box>
                                                                                                                </Box>
                                                                                                            </Paper>

                                                                                                            {/* communication device details */}
                                                                                                            <Paper sx={{ mt: 2 }}>
                                                                                                                <Box sx={{ mt: 2 }}>
                                                                                                                    <Typography sx={{ pl: 1, fontSize: 20 }}> Communication Device Bill Details</Typography>
                                                                                                                </Box>


                                                                                                                <Box sx={{ display: 'flex', flex: 1 }}>
                                                                                                                    <Grid sx={{ p: 1 }} container spacing={2}>
                                                                                                                        <Grid sx={{ width: 400, }}>
                                                                                                                            <Paper
                                                                                                                                variant="outlined"
                                                                                                                                sx={{
                                                                                                                                    display: 'flex',
                                                                                                                                    flexDirection: 'column',
                                                                                                                                    p: 1,
                                                                                                                                    width: '100%',
                                                                                                                                }}>
                                                                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                                                                                    <Box
                                                                                                                                        sx={{
                                                                                                                                            width: 40,
                                                                                                                                            height: 40,
                                                                                                                                            backgroundColor: '#BBC8DE',
                                                                                                                                            borderRadius: '50%',
                                                                                                                                            display: 'flex',
                                                                                                                                            justifyContent: 'center',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            opacity: 0.7,
                                                                                                                                        }}>
                                                                                                                                        <CalendarMonthIcon />
                                                                                                                                    </Box>
                                                                                                                                    <Box
                                                                                                                                        sx={{
                                                                                                                                            display: 'flex',
                                                                                                                                            flexDirection: 'row',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            flex: 1,
                                                                                                                                        }}>
                                                                                                                                        <Box
                                                                                                                                            sx={{
                                                                                                                                                padding: '4px',
                                                                                                                                                borderRadius: '8px',
                                                                                                                                                marginRight: 'auto',
                                                                                                                                            }}>
                                                                                                                                            <Typography sx={{ fontSize: 20, color: '#055C9D' }}>Monthly Tariff</Typography>
                                                                                                                                        </Box>
                                                                                                                                    </Box>
                                                                                                                                    <Box><CssVarsProvider>
                                                                                                                                        <Button variant="outlined"
                                                                                                                                            sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                                                                                                                                            onClick={(e) => {
                                                                                                                                                MonthlyPendingBillList(e)
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            {MonthlyPendingData.length}
                                                                                                                                        </Button>
                                                                                                                                    </CssVarsProvider></Box>
                                                                                                                                </Box>
                                                                                                                                <Box
                                                                                                                                    sx={{
                                                                                                                                        display: 'flex',
                                                                                                                                        borderTop: 2,
                                                                                                                                        borderColor: '#BBC8DE',
                                                                                                                                        marginTop: 3,
                                                                                                                                        alignItems: 'center',
                                                                                                                                        cursor: 'pointer',
                                                                                                                                    }}
                                                                                                                                    onClick={(e) => {
                                                                                                                                        ViewMonthlyList(e)
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
                                                                                                                                        <Typography sx={{ color: '#04425B' }}>view</Typography>
                                                                                                                                        <ViewListIcon sx={{ color: '#055C9D' }} />
                                                                                                                                    </Box>
                                                                                                                                    <Box sx={{ ml: 1, mt: 1 }}></Box>
                                                                                                                                </Box>
                                                                                                                            </Paper>
                                                                                                                        </Grid>
                                                                                                                    </Grid>
                                                                                                                    <Grid sx={{ p: 1 }} container spacing={2}>
                                                                                                                        <Grid sx={{ width: 400, ml: 5 }}>

                                                                                                                            <Paper
                                                                                                                                // key={index}
                                                                                                                                variant="outlined"
                                                                                                                                sx={{
                                                                                                                                    display: 'flex',
                                                                                                                                    flexDirection: 'column',
                                                                                                                                    p: 1,
                                                                                                                                    width: '100%',
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                                                                                    <Box
                                                                                                                                        sx={{
                                                                                                                                            width: 40,
                                                                                                                                            height: 40,
                                                                                                                                            backgroundColor: '#BBC8DE',
                                                                                                                                            borderRadius: '50%',
                                                                                                                                            display: 'flex',
                                                                                                                                            justifyContent: 'center',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            opacity: 0.7,
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <CalendarMonthIcon />

                                                                                                                                    </Box>
                                                                                                                                    <Box
                                                                                                                                        sx={{
                                                                                                                                            display: 'flex',
                                                                                                                                            flexDirection: 'row',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            flex: 1,
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <Box
                                                                                                                                            sx={{
                                                                                                                                                padding: '4px',
                                                                                                                                                borderRadius: '8px',
                                                                                                                                                marginRight: 'auto',
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <Typography sx={{ fontSize: 20, color: '#055C9D' }}>
                                                                                                                                                Quarterly Tariff
                                                                                                                                            </Typography>
                                                                                                                                        </Box>
                                                                                                                                    </Box>
                                                                                                                                    <Box

                                                                                                                                    >

                                                                                                                                        <CssVarsProvider>
                                                                                                                                            <Button variant="outlined"
                                                                                                                                                sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                                                                                                                                                onClick={(e) => {
                                                                                                                                                    QuaterlyPendingBillList(e)
                                                                                                                                                }}
                                                                                                                                            >
                                                                                                                                                {QuaterlyPendingData.length}
                                                                                                                                            </Button>
                                                                                                                                        </CssVarsProvider>
                                                                                                                                    </Box>
                                                                                                                                </Box>

                                                                                                                                <Box
                                                                                                                                    sx={{
                                                                                                                                        display: 'flex',
                                                                                                                                        borderTop: 2,
                                                                                                                                        borderColor: '#BBC8DE',
                                                                                                                                        marginTop: 3,
                                                                                                                                        alignItems: 'center',
                                                                                                                                        cursor: 'pointer',
                                                                                                                                        // backgroundColor:'red'
                                                                                                                                    }}
                                                                                                                                    onClick={(e) => {
                                                                                                                                        ViewQuaterlyList(e)
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
                                                                                                                                        <Typography sx={{ color: '#04425B' }}>view</Typography>
                                                                                                                                        <ViewListIcon sx={{ color: '#055C9D' }} />
                                                                                                                                    </Box>
                                                                                                                                    <Box sx={{ ml: 1, mt: 1 }}>

                                                                                                                                    </Box>
                                                                                                                                </Box>
                                                                                                                            </Paper>
                                                                                                                        </Grid>
                                                                                                                        {/* ))} */}
                                                                                                                    </Grid>
                                                                                                                    <Grid sx={{ p: 1 }} container spacing={2}>

                                                                                                                        <Grid sx={{ width: 400, ml: 5 }}

                                                                                                                        >

                                                                                                                            <Paper
                                                                                                                                // key={index}
                                                                                                                                variant="outlined"
                                                                                                                                sx={{
                                                                                                                                    display: 'flex',
                                                                                                                                    flexDirection: 'column',
                                                                                                                                    p: 1,
                                                                                                                                    width: '100%',
                                                                                                                                }}
                                                                                                                            >
                                                                                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                                                                                    <Box
                                                                                                                                        sx={{
                                                                                                                                            width: 40,
                                                                                                                                            height: 40,
                                                                                                                                            backgroundColor: '#BBC8DE',
                                                                                                                                            borderRadius: '50%',
                                                                                                                                            display: 'flex',
                                                                                                                                            justifyContent: 'center',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            opacity: 0.7,
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <CalendarMonthIcon />

                                                                                                                                    </Box>
                                                                                                                                    <Box
                                                                                                                                        sx={{
                                                                                                                                            display: 'flex',
                                                                                                                                            flexDirection: 'row',
                                                                                                                                            alignItems: 'center',
                                                                                                                                            flex: 1,
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        <Box
                                                                                                                                            sx={{
                                                                                                                                                padding: '4px',
                                                                                                                                                borderRadius: '8px',
                                                                                                                                                marginRight: 'auto',
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            <Typography sx={{ fontSize: 20, color: '#055C9D' }}>
                                                                                                                                                Yearly Tariff
                                                                                                                                            </Typography>
                                                                                                                                        </Box>
                                                                                                                                    </Box>
                                                                                                                                    <Box

                                                                                                                                    >

                                                                                                                                        <CssVarsProvider>
                                                                                                                                            <Button variant="outlined"
                                                                                                                                                sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                                                                                                                                                onClick={(e) => {
                                                                                                                                                    YearlyPendingBillList(e)
                                                                                                                                                }}
                                                                                                                                            >
                                                                                                                                                {YearlyPendingData.length}

                                                                                                                                            </Button>
                                                                                                                                        </CssVarsProvider>
                                                                                                                                    </Box>
                                                                                                                                </Box>

                                                                                                                                <Box
                                                                                                                                    sx={{
                                                                                                                                        display: 'flex',
                                                                                                                                        borderTop: 2,
                                                                                                                                        borderColor: '#BBC8DE',
                                                                                                                                        marginTop: 3,
                                                                                                                                        alignItems: 'center',
                                                                                                                                        cursor: 'pointer',
                                                                                                                                        // backgroundColor:'red'
                                                                                                                                    }}
                                                                                                                                    onClick={(e) => {
                                                                                                                                        ViewYearlyList(e)
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
                                                                                                                                        <Typography sx={{ color: '#04425B' }}>view</Typography>
                                                                                                                                        <ViewListIcon sx={{ color: '#055C9D' }} />
                                                                                                                                    </Box>
                                                                                                                                    <Box sx={{ ml: 1, mt: 1 }}>
                                                                                                                                        {/* <IconButton size="small" color="success">
                                                           <ArrowRightAltIcon />
                                                       </IconButton> */}
                                                                                                                                    </Box>
                                                                                                                                </Box>
                                                                                                                            </Paper>
                                                                                                                        </Grid>
                                                                                                                        {/* ))} */}
                                                                                                                    </Grid>
                                                                                                                </Box>

                                                                                                            </Paper>



                                                                                                        </CardMasterClose>
                }
            </Paper >
            {/* /////////////////////////////////////////////////////////////////////////////////// */}




        </Fragment >



    )
}
export default memo(Newdashboard)