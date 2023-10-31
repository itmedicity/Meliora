import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
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
import { memo } from 'react'
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
import { addDays, eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import format from 'date-fns/format'
import NextDayBackupTable from './TableComponents/DayBackup/NextDayBackupTable'
import SelectDaysUpcoming from './TableComponents/AlternativeDays/SelectDaysUpcoming'
const DashboradBackup = () => {
  const dispatch = useDispatch()
  const [backtodash, setBacktodash] = useState(1)
  const [count, setCount] = useState(0);
  const [dayscount, setDayscount] = useState(0)
  const [daysNow, setdaysNow] = useState([])
  const [daysflag, setdaysflag] = useState(0)
  const [daysdue, setdaysdue] = useState([])
  const [dayserror, setDayserror] = useState([])
  const [daysnext, setDaysnext] = useState([])
  const [daysverified, setDaysverified] = useState([])
  const [daysList, setDaysList] = useState([])
  const [weeklydata, setWeeklydata] = useState([])
  const [weekflag, setWeekflag] = useState(0)
  const [weekduedata, setWeekduedata] = useState([])
  const [weekerrordata, setWeekerrordata] = useState([])
  const [weekverified, setweekverified] = useState([])
  const [dayflag, setDayFlag] = useState(0)
  const [daydata, setDayData] = useState([])
  const [dueData, setDueData] = useState([])
  const [errorData, setErrorData] = useState([])
  const [verifieddata, setVerifieddata] = useState([])
  const [monthflag, setMonthflag] = useState(0)
  const [monthdata, setMonthdata] = useState([])
  const [dueMonthdata, setDueMonthdata] = useState([])
  const [ErrorMonthdata, setErrorMonthdata] = useState([])
  const [monthReport, setMonthReport] = useState([])
  const [yearflag, setYearflag] = useState(0)
  const [yeardata, setYeardata] = useState([])
  const [dueYearData, setdueYearData] = useState([])
  const [errorYearData, setErrorYearData] = useState([])
  const [yearreport, setYearreport] = useState([])
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
    setBacktodash(0)
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
  const yearlycount = useSelector((state) => state?.getYearlyBackup?.YearlyInitial)
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
  useEffect(() => {
    const getdata = async () => {
      const result = await axioslogin.get('/backupdash/dayverified')
      const { success, data } = result.data
      if (success === 2) {
        setVerifieddata(data)
        setCount(count + 1);
      }
      else {
        setVerifieddata([])
      }
    }
    getdata()
  }, [count])

  const ViewVerificationReport = useCallback(() => {

    if (verifieddata.length === 0) {
      infoNotify("No Data Found")
    } else {
      setDayFlag(5)
    }
  }, [verifieddata])
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

  useEffect(() => {
    const getdata = async () => {
      const result = await axioslogin.get('/backupdash/weekverified')
      const { success, data } = result.data
      if (success === 2) {
        setweekverified(data)
        setCount(count + 1);
      }
      else {
        setweekverified([])
      }
    }
    getdata()
  }, [count])

  const WeekVerificationReport = useCallback(() => {
    if (weekverified.length === 0) {
      infoNotify("No Data Found")
    } else {
      setWeekflag(5)
    }
  }, [weekverified])
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
  useEffect(() => {
    const getdata = async () => {
      const result = await axioslogin.get('/backupdash/altdaysverified')
      const { success, data } = result.data
      if (success === 2) {
        setDaysverified(data)
        setCount(count + 1);
      }
      else {
        setDaysverified([])
      }
    }
    getdata()
  }, [count])

  const getVerificationReport = useCallback(() => {
    if (daysverified.length === 0) {
      infoNotify("No Data Found")
      setdaysflag(0)
    }
    else {
      setdaysflag(5)
    }
  }, [daysverified])
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
    if (yearlycount.length !== 0) {
      const postdata = yearlycount?.map((val) => {
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
  }, [yearlycount, id, count])
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
  useEffect(() => {
    const getdata = async () => {
      const result = await axioslogin.get('/backupdash/monthverified')
      const { success, data } = result.data
      if (success === 2) {
        setMonthReport(data)
        setCount(count + 1);
      }
      else {
        setMonthReport([])
      }
    }
    getdata()
  }, [count])
  const MonthVerificationReport = useCallback(() => {
    if (monthReport.length === 0) {
      infoNotify("No Data Found")
    } else {
      setMonthflag(5)
    }
  }, [monthReport])
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
  }, [yeardetails, yearlycount])
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
    if (yearlycount.length === 0) {
      infoNotify("No Data Found")
    }
    else {
      setYearflag(4)
    }
  }, [yearlycount])
  useEffect(() => {
    const getdata = async () => {
      const result = await axioslogin.get('/backupdash/yearverified')
      const { success, data } = result.data
      if (success === 2) {
        setYearreport(data)
        setCount(count + 1);
      }
      else {
        setYearreport([])
      }
    }
    getdata()
  }, [count])
  const YearlyVerificationReport = useCallback(() => {
    if (yearreport.length === 0) {
      infoNotify("No Data Found")
    }
    else {
      setYearflag(5)
    }
  }, [yearreport])
  return (
    <Fragment>
      <Paper>
        {
          // alternativedays
          altflag === 1 ? <SelectedDaysTable alternativedata={daysflag === 1 ? daysNow : daysflag === 2 ? daysdue : daysflag === 3 ? dayserror : []}
            daysflag={daysflag} setAltflag={setAltflag} count={count} setCount={setCount} /> :
            daysflag === 4 ? <SelectDaysUpcoming daysnext={daysnext} setdaysflag={setdaysflag} /> :
              daysflag === 5 ? <VerificationDaysTable daysverified={daysverified} setdaysflag={setdaysflag} /> :
                // daily
                daytabflag === 1 ? <DayCountTable dayTabledata={dayflag === 1 ? daydata : dayflag === 2 ? dueData : dayflag === 3 ? errorData : []}
                  setDaytabflag={setDaytabflag} dayflag={dayflag} count={count} setCount={setCount} /> :
                  dayflag === 4 ? <NextDayBackupTable dailycount={dailycount} setDayFlag={setDayFlag} /> :
                    dayflag === 5 ? <VerificationDetailTable verifieddata={verifieddata} setDayFlag={setDayFlag} /> :
                      weektabflag === 1 ? <WeekCountTable weektableData={weekflag === 1 ? weeklydata : weekflag === 2 ? weekduedata : weekflag === 3 ? weekerrordata : []}
                        setWeektabflag={setWeektabflag} weekflag={weekflag} count={count} setCount={setCount} /> :
                        weekflag === 4 ? <NextWeekTable weeklycount={weeklycount} setWeekflag={setWeekflag} /> :
                          weekflag === 5 ? <WeekVerificationTable weekverified={weekverified} setWeekflag={setWeekflag} /> :
                            monthtabflag === 1 ? <CurrentMonthTable monthtabdata={monthflag === 1 ? monthdata : monthflag === 2 ? dueMonthdata : monthflag === 3 ? ErrorMonthdata : []}
                              setMonthtabflag={setMonthtabflag} monthflag={monthflag} count={count} setCount={setCount} /> :
                              monthflag === 4 ? <NextMonthTable nextmonthdata={monthlycount} setMonthflag={setMonthflag} /> :
                                monthflag === 5 ? <MonthVerificationTAble monthReport={monthReport} setMonthflag={setMonthflag} /> :
                                  yeartabflag === 1 ? <CurrentYearTable yeartabData={yearflag === 1 ? yeardata : yearflag === 2 ? dueYearData : yearflag === 3 ? errorYearData : []}
                                    setYeartabflag={setYeartabflag} yearflag={yearflag} count={count} setCount={setCount} /> :
                                    yearflag === 4 ? <NexrYearTable nextyeardata={yearlycount} setYearflag={setYearflag} /> :
                                      yearflag === 5 ? <YearlyVerificationTable yearreport={yearreport} setYearflag={setYearflag} /> :
                                        backtodash === 1 ?
                                          <CardMasterClose
                                            close={backtoHome}
                                          >
                                            <Box sx={{ p: 1 }}>
                                              <Typography sx={{ fontSize: 18, pl: 1 }}> Backup Checks & Monitoring</Typography>
                                            </Box>
                                            <Paper variant="outlined" sx={{ py: 0.5 }}>
                                              <Box >
                                                <Typography sx={{ fontSize: 15, pl: 1 }}>Daily</Typography>
                                              </Box>
                                              <Box sx={{ p: 0.5, mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}   >
                                                <Box>
                                                  <Paper variant="outlined" sx={{
                                                    width: 300,
                                                    height: 60,
                                                    display: "flex",
                                                    p: 1,
                                                    borderRadius: 2,
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                  }}
                                                  >
                                                    <Box sx={{ pl: 1, pt: 1, display: 'flex', flexDirection: 'row' }}>
                                                      <Typography>Daily Backup</Typography>
                                                    </Box>
                                                    <Box sx={{ pl: 12.5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                      <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                        onClick={DailyCountDetails}
                                                      >
                                                        {dayscount.length}</Button>
                                                    </Box>
                                                  </Paper>
                                                </Box>
                                                <Box sx={{ pl: 2 }}>
                                                  <Paper variant="outlined" sx={{
                                                    width: 300,
                                                    height: 60,
                                                    display: "flex",
                                                    p: 1,
                                                    borderRadius: 2,
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                  }}
                                                  >
                                                    <Box sx={{ pl: 1, pt: 1 }}>
                                                      <Typography>Backup Dues</Typography>
                                                    </Box>
                                                    <Box sx={{ pl: 12, display: 'flex', justifyContent: 'flex-end' }}>
                                                      <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                        onClick={DueCountDetails}
                                                      >
                                                        {dueData.length}
                                                      </Button>
                                                    </Box>
                                                  </Paper>
                                                </Box>
                                                <Box sx={{ pl: 2 }}>
                                                  <Paper variant="outlined" sx={{
                                                    width: 300,
                                                    height: 60,
                                                    display: "flex",
                                                    p: 1,
                                                    borderRadius: 2,
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                  }}
                                                  >
                                                    <Box sx={{ pl: 1, pt: 1, }}>
                                                      <Typography>Backup Error</Typography>
                                                    </Box>
                                                    <Box sx={{ pl: 12, }}>
                                                      <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                        onClick={BackupError}
                                                      >
                                                        {errorData.length}
                                                      </Button>
                                                    </Box>
                                                  </Paper>
                                                </Box>
                                                <Box sx={{ pl: 2 }}>
                                                  <Paper variant="outlined" sx={{
                                                    width: 300,
                                                    height: 60,
                                                    display: "flex",
                                                    p: 1,
                                                    borderRadius: 2,
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                  }}
                                                  >
                                                    <Box sx={{ pl: 1, pt: 1 }}>
                                                      <Typography>Upcoming Backup</Typography>
                                                    </Box>
                                                    <Box sx={{ pl: 8, display: 'flex', justifyContent: 'flex-end' }}>
                                                      <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                        onClick={BackupTomorrow}
                                                      >
                                                        {dailycount.length}
                                                      </Button>
                                                    </Box>
                                                  </Paper>
                                                </Box>
                                                <Box sx={{ pl: 2 }}>
                                                  <Paper variant="outlined" sx={{
                                                    width: 300,
                                                    height: 60,
                                                    display: "flex",
                                                    p: 1,
                                                    borderRadius: 2,
                                                    justifyContent: 'center',
                                                    flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                  }}
                                                  >
                                                    <Box >
                                                      <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 2, fontSize: 11, color: 'black' }}
                                                        onClick={ViewVerificationReport}

                                                      >Verification Report</Button>
                                                    </Box>
                                                  </Paper>
                                                </Box>
                                              </Box>
                                            </Paper>
                                            {/* Weekly */}
                                            <Box>
                                              <Paper variant="outlined" sx={{ py: 0.5 }}>
                                                <Box >
                                                  <Typography sx={{ fontSize: 15, pl: 1 }}>Weekly</Typography>
                                                </Box>
                                                <Box sx={{ p: 0.5, mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}   >
                                                  <Box>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1, display: 'flex', flexDirection: 'row' }}>
                                                        <Typography>Current Week</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={WeeklyCountDetails}
                                                        >
                                                          {weekcount.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1 }}>
                                                        <Typography>Backup Dues</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={DueWeekDetails}
                                                        >
                                                          {weekduedata.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1, }}>
                                                        <Typography>Backup Error</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={WeekBackupError}
                                                        >
                                                          {weekerrordata.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1 }}>
                                                        <Typography>Upcoming Backup</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 8, display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={BackupWeekTomorrow}
                                                        >
                                                          {weeklycount.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      justifyContent: 'center',
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box >
                                                        <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 2, fontSize: 11, color: 'black' }}
                                                          onClick={WeekVerificationReport}
                                                        >Verification Report</Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                </Box>
                                              </Paper>
                                            </Box>
                                            {/* Monthly backup */}
                                            <Box>
                                              <Paper variant="outlined" sx={{ py: 0.5 }}>
                                                <Box >
                                                  <Typography sx={{ fontSize: 15, pl: 1 }}>Monthly</Typography>
                                                </Box>
                                                <Box sx={{ p: 0.5, mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}   >
                                                  <Box>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1, display: 'flex', flexDirection: 'row' }}>
                                                        <Typography>Current Month</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 11.5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={MonthlyDetails}
                                                        >
                                                          {monthcount.length}</Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1 }}>
                                                        <Typography>Backup Dues</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={DueMonthDetails}
                                                        >
                                                          {dueMonthdata.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1, }}>
                                                        <Typography>Backup Error</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={MonthBackupError}
                                                        >
                                                          {ErrorMonthdata.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1 }}>
                                                        <Typography>Upcoming Backup</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 8, display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={NextMonthBackupDetails}
                                                        >
                                                          {monthlycount.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      justifyContent: 'center',
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box >
                                                        <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 2, fontSize: 11, color: 'black' }}
                                                          onClick={MonthVerificationReport}
                                                        >Verification Report</Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                </Box>
                                              </Paper>
                                            </Box>
                                            {/* YearlyCount */}
                                            <Box>
                                              <Paper variant="outlined" sx={{ py: 0.5 }}>
                                                <Box >
                                                  <Typography sx={{ fontSize: 15, pl: 1 }}>Yearly</Typography>
                                                </Box>
                                                <Box sx={{ p: 0.5, mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}   >
                                                  <Box>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1, display: 'flex', flexDirection: 'row' }}>
                                                        <Typography>Current Year</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 13, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={YearlyDetails}
                                                        >
                                                          {yearcount.length}</Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1 }}>
                                                        <Typography>Backup Dues</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={DueYearDetails}
                                                        >
                                                          {dueYearData.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1, }}>
                                                        <Typography>Backup Error</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={YearBackupErrorDetails}
                                                        >
                                                          {errorYearData.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1 }}>
                                                        <Typography>Upcoming Backup</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 8, display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={NextYearBackupDetails}
                                                        >
                                                          {yearlycount.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      justifyContent: 'center',
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box >
                                                        <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 2, fontSize: 11, color: 'black' }}
                                                          onClick={YearlyVerificationReport}
                                                        >Verification Report</Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                </Box>
                                              </Paper>
                                            </Box>
                                            {/* SELECTED DAYS */}
                                            <Box>
                                              <Paper variant="outlined" sx={{ py: 0.5 }}>
                                                <Box >
                                                  <Typography sx={{ fontSize: 15, pl: 1 }}>Alternative Days</Typography>
                                                </Box>
                                                <Box sx={{ p: 0.5, mb: 2, display: 'flex', flexDirection: 'row' }}   >
                                                  <Box>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1, display: 'flex', flexDirection: 'row' }}>
                                                        <Typography>Today&apos;s Backup</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 10.5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={SelectedDaysDetails}
                                                        >
                                                          {altcount.length}</Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1 }}>
                                                        <Typography>Backup Dues</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={DueSelectedDays}
                                                        >
                                                          {daysdue.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1, }}>
                                                        <Typography>Backup Error</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 12, }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={ErrorSelectedDays}
                                                        >
                                                          {dayserror.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box sx={{ pl: 1, pt: 1 }}>
                                                        <Typography>Upcoming Backup</Typography>
                                                      </Box>
                                                      <Box sx={{ pl: 8, display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Button variant="outlined" sx={{ width: 30, height: 40, borderRadius: 2, fontSize: 20 }}
                                                          onClick={NextSelectedDays}
                                                        >
                                                          {daysnext.length}
                                                        </Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                  <Box sx={{ pl: 2 }}>
                                                    <Paper variant="outlined" sx={{
                                                      width: 300,
                                                      height: 60,
                                                      display: "flex",
                                                      p: 1,
                                                      borderRadius: 2,
                                                      justifyContent: 'center',
                                                      flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
                                                    }}
                                                    >
                                                      <Box >
                                                        <Button variant="outlined" sx={{ width: 200, height: 40, borderRadius: 2, fontSize: 11, color: 'black' }}
                                                          onClick={getVerificationReport}

                                                        >Verification Report</Button>
                                                      </Box>
                                                    </Paper>
                                                  </Box>
                                                </Box>
                                              </Paper>
                                            </Box>
                                          </CardMasterClose >
                                          : null
        }
      </Paper >
    </Fragment >
  )
}

export default memo(DashboradBackup)