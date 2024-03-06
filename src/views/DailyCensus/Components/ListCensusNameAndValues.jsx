
import { TableCell } from '@mui/material'
import { subDays } from 'date-fns'
import moment from 'moment'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const ListCensusNameAndValues = ({ tablevalue, dailyDate, count }) => {
    const [yesterday, setYesterday] = useState(0)
    const [total, settotal] = useState(0)
    const { census_ns_slno } = tablevalue
    const [dailySensusDetails, setDailySensusDetails] = useState({
        admission: 0,
        discharge: 0,
        transferIn: 0,
        transferOut: 0,
        death: 0,
    })
    const { admission, discharge, transferIn, transferOut, death } = dailySensusDetails
    useEffect(() => {
        const getYesterday = {
            census_ns_slno: census_ns_slno,
            census_date: moment(subDays(new Date(dailyDate), 1)).format('YYYY-MM-DD')
        }
        const getYesterdayData = async (getYesterday) => {
            const result = await axioslogin.post('/qidailycensus/yesterday', getYesterday);
            const { success, data } = result.data;
            if (success === 1) {
                const { census_total
                } = data[0]
                setYesterday(census_total)
            } else {
                setYesterday(0)
            }
        }
        const existSearch = {
            census_ns_slno: census_ns_slno,
            census_date: moment(new Date(dailyDate)).format('YYYY-MM-DD')
        }
        const GetTodayData = async (existSearch) => {
            const result = await axioslogin.post('/qidailycensus/exist', existSearch);
            const { success, data } = result.data;
            if (success === 1) {
                const { total_admission, total_discharge, transfer_in, transfer_out,
                    total_death, census_total } = data[0]
                const fromdata = {
                    admission: total_admission,
                    discharge: total_discharge,
                    transferIn: transfer_in,
                    transferOut: transfer_out,
                    death: total_death,
                }
                setDailySensusDetails(fromdata)
                settotal(census_total)
            }
        }
        getYesterdayData(getYesterday)
        GetTodayData(existSearch)
    }, [census_ns_slno, dailyDate, count])
    useEffect(() => {
        settotal((yesterday + (admission - discharge) + (transferIn - transferOut) - death))
    }, [yesterday, admission, discharge, transferIn, transferOut, death])

    return (
        <Fragment>
            <>
                <TableCell
                    padding={"none"}
                    sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                    {yesterday}</TableCell>
                <TableCell
                    sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                    {admission}</TableCell>
                <TableCell
                    sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                    {discharge}</TableCell>
                <TableCell
                    sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                    {transferIn}</TableCell>
                <TableCell
                    sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                    {transferOut}</TableCell>
                <TableCell
                    sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                    {death}</TableCell>
                <TableCell
                    sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                    {total}</TableCell>
            </>

        </Fragment>
    )
}
export default memo(ListCensusNameAndValues)