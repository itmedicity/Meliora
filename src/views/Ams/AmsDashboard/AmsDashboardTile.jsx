import { Box } from '@mui/joy'
import React, { useEffect, useMemo, useState } from 'react'
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import { getTotAntibioticMonth, getTotAntibioticToday, getTotAntibioticWeek, getTotAntibioticYear } from 'src/api/AntibioticApi';
import { endOfDay, endOfMonth, endOfWeek, endOfYear, format, startOfDay, startOfMonth, startOfWeek, startOfYear } from 'date-fns';
import { useQuery } from 'react-query';

const AmsDashboardTile = () => {


    const today = new Date();
    const [todayCount, setTodayCount] = useState(0)
    const [weekCount, setweekCount] = useState(0)
    const [monthCount, setmonthCount] = useState(0)
    const [yearCount, setyearCount] = useState(0)

    const formatRange = (start, end) => ({
        from: format(start, 'yyyy-MM-dd HH:mm:ss'),
        to: format(end, 'yyyy-MM-dd HH:mm:ss')
    });

    // TODAY
    const todayRange = useMemo(() =>
        formatRange(startOfDay(today), endOfDay(today)), [today]);

    const { data: todayData, isSuccess: todaySuccess } = useQuery({
        queryKey: ['getTotAntibToday', todayRange],
        queryFn: () => getTotAntibioticToday(todayRange),
        enabled: !!todayRange,
    });
    useEffect(() => {
        if (todaySuccess && todayData?.length > 0) {
            setTodayCount(todayData[0].antibiotic_count || 0);
        }
    }, [todayData, todaySuccess]);

    //  THIS WEEK
    const weekRange = useMemo(() =>
        formatRange(startOfWeek(today, { weekStartsOn: 1 }), endOfWeek(today, { weekStartsOn: 1 })), [today]);

    const { data: weekData, isSuccess: weekSuccess } = useQuery({
        queryKey: ['getTotAntibWeek', weekRange],
        queryFn: () => getTotAntibioticWeek(weekRange),
        enabled: !!weekRange,
    });

    useEffect(() => {
        if (weekSuccess && weekData?.length > 0) {
            setweekCount(weekData[0].antibiotic_count || 0);
        }
    }, [weekData, weekSuccess]);

    //  THIS MONTH
    const monthRange = useMemo(() =>
        formatRange(startOfMonth(today), endOfMonth(today)), [today]);

    const { data: monthData, isSuccess: monthSuccess } = useQuery({
        queryKey: ['getTotAntibMonth', monthRange],
        queryFn: () => getTotAntibioticMonth(monthRange),
        enabled: !!monthRange,
    });

    useEffect(() => {
        if (monthSuccess && monthData?.length > 0) {
            setmonthCount(monthData[0].antibiotic_count || 0);
        }
    }, [monthData, monthSuccess]);

    //  THIS YEAR
    const yearRange = useMemo(() =>
        formatRange(startOfYear(today), endOfYear(today)), []);

    const { data: yearData, isSuccess: yearSuccess } = useQuery({
        queryKey: ['getTotAntibYear', yearRange],
        queryFn: () => getTotAntibioticYear(yearRange),
        enabled: !!yearRange,
    });

    useEffect(() => {
        if (yearSuccess && yearData?.length > 0) {
            setyearCount(yearData[0].antibiotic_count || 0);
        }
    }, [yearData, yearSuccess]);

    return (
        <Box sx={{ flex: 1, display: 'flex', height: 60, gap: 1 }}>
            <Box sx={{
                display: 'flex',
                border: 1, borderColor: '#d0d6e5',
                flex: 1, bgcolor: 'white', borderRadius: 5
            }}>
                <Box sx={{
                    width: 50, m: .5, display: 'flex', justifyContent: 'center',
                    alignItems: 'center', border: 1, borderColor: '#d0d6e5', bgcolor: '#fafcfe',
                    borderRadius: 50
                }}>
                    <TodayTwoToneIcon />
                </Box>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: .8, pt: .5 }}>
                        Today
                    </Box>
                    <Box sx={{ fontSize: 20, fontWeight: 600, color: '#4C5270', pt: .1, pl: .8 }}>
                        {todayCount}
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                border: 1, borderColor: '#d0d6e5',
                flex: 1, bgcolor: 'white', borderRadius: 5
            }}>
                <Box sx={{
                    width: 50, m: .5, display: 'flex', justifyContent: 'center',
                    alignItems: 'center', border: 1, borderColor: '#d0d6e5', bgcolor: '#fafcfe',
                    borderRadius: 50
                }}>
                    <DateRangeTwoToneIcon />
                </Box>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: .8, pt: .5 }}>
                        week
                    </Box>
                    <Box sx={{ fontSize: 20, fontWeight: 600, color: '#4C5270', pt: .1, pl: .8 }} >
                        {weekCount}
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                border: 1, borderColor: 'lightgrey',
                flex: 1, bgcolor: 'white', borderRadius: 5
            }}>
                <Box sx={{
                    width: 50, m: .5, display: 'flex', justifyContent: 'center',
                    alignItems: 'center', border: 1, borderColor: '#d0d6e5', bgcolor: '#fafcfe',
                    borderRadius: 50
                }}>
                    <CalendarMonthTwoToneIcon />
                </Box>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: .8, pt: .5 }}>
                        Month
                    </Box>
                    <Box sx={{ fontSize: 20, fontWeight: 600, color: '#4C5270', pt: .1, pl: .8 }} >
                        {monthCount}
                    </Box>
                </Box>
            </Box >
            <Box sx={{
                display: 'flex',
                border: 1, borderColor: '#d0d6e5',
                flex: 1, bgcolor: 'white', borderRadius: 5
            }}>
                <Box sx={{
                    width: 50, m: .5, display: 'flex', justifyContent: 'center',
                    alignItems: 'center', border: 1, borderColor: '#d0d6e5', bgcolor: '#fafcfe',
                    borderRadius: 50
                }}>
                    <EventNoteTwoToneIcon />
                </Box>
                <Box sx={{ flex: 1, }}>
                    <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: .8, pt: .5 }}>
                        Year
                    </Box>
                    <Box sx={{ fontSize: 20, fontWeight: 600, color: '#4C5270', pt: .1, pl: .8 }} >
                        {yearCount}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AmsDashboardTile