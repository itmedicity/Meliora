import { Box, ThemeProvider, Tooltip } from '@mui/joy'
import { createTheme, Paper } from '@mui/material';
import React, { memo, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent';
import GridViewIcon from '@mui/icons-material/GridView';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import {
    getAllAntibioticCount, getRestrictedAntibioticCount, getRestrictedAntibiotics, getTotRestrictedAntibioticCount,
    getTotUnRestrictedAntibioticCount
} from 'src/api/AntibioticApi';
import { BarChart, } from '@mui/x-charts';
import AntibioticPieChart from './AntibioticPieChart';
import FilterSelector from './FilterSelector';
import { endOfMonth, endOfYear, format, startOfMonth, startOfYear } from 'date-fns';
import AmsDashboardTile from './AmsDashboardTile';
import { useQuery } from '@tanstack/react-query';


const DashboardMain = () => {


    const { data: restrictedList = [] } = useQuery({
        queryKey: ['getRestrictedAntibioticList'],
        queryFn: () => getRestrictedAntibiotics(),
    });

    const restrictedAntibioticData = useMemo(() => restrictedList, [restrictedList]);

    const [dataset, setDataset] = useState([]);
    const [resAntidataset, setresAntiDataset] = useState([]);

    const [totResAntibiotic, setTotResAntibiotic] = useState(0)
    const [totUnResAntibiotic, setTotUnResAntibiotic] = useState(0)

    const [allAntibioticStartDate, setallAntibioticStartDate] = useState('');
    const [allAntibioticEndDate, setallAntibioticEndDate] = useState('');

    const [restrictedAntibioticStartDate, setRestrictedAntibioticStartDate] = useState('');
    const [restrictedAntibioticEndDate, setRestrictedAntibioticEndDate] = useState('');

    const [ResAndUnresAntibioticStartDate, setResAndUnresAntibioticStartDate] = useState('')
    const [ResAndUnresAntibioticEndDate, setResAndUnresAntibioticEndDate] = useState('')


    const handleDateRangeChange = (start, end) => {
        setallAntibioticStartDate(start);
        setallAntibioticEndDate(end);
    };

    const handleRestrictedantibioticChange = (start, end) => {
        setRestrictedAntibioticStartDate(start);
        setRestrictedAntibioticEndDate(end);
    };

    const handleResAndUnresAntibioticChange = (start, end) => {
        setResAndUnresAntibioticStartDate(start);
        setResAndUnresAntibioticEndDate(end);
    };

    const searchallAntibiotic = useMemo(() => {
        if (!allAntibioticStartDate || !allAntibioticEndDate) return null;
        const start = new Date(allAntibioticStartDate);
        const end = new Date(allAntibioticEndDate);
        try {
            const isSameDay = start.toDateString() === end.toDateString();
            const isFullYear = start.getFullYear() === end.getFullYear() &&
                start.getMonth() === 0 &&
                end.getMonth() === 11;

            if (isSameDay) {
                // For "today"
                return {
                    from: format(start, 'yyyy-MM-dd 00:00:00'),
                    to: format(end, 'yyyy-MM-dd 23:59:59'),
                };
            }

            if (isFullYear) {
                // Full year selected
                return {
                    from: format(startOfYear(start), 'yyyy-MM-dd 00:00:00'),
                    to: format(endOfYear(end), 'yyyy-MM-dd 23:59:59'),
                };
            }

            // Default: month range
            return {
                from: format(startOfMonth(start), 'yyyy-MM-dd 00:00:00'),
                to: format(endOfMonth(end), 'yyyy-MM-dd 23:59:59'),
            };

        } catch (e) {
            return null;
        }
    }, [allAntibioticStartDate, allAntibioticEndDate]);


    const searchRestrictedAntibiotic = useMemo(() => {
        if (!restrictedAntibioticStartDate || !restrictedAntibioticEndDate) return null;
        const start = new Date(restrictedAntibioticStartDate);
        const end = new Date(restrictedAntibioticEndDate);
        try {
            const isSameDay = start.toDateString() === end.toDateString();
            const isFullYear = start.getFullYear() === end.getFullYear() &&
                start.getMonth() === 0 &&
                end.getMonth() === 11;

            if (isSameDay) {
                // For "today"
                return {
                    from: format(start, 'yyyy-MM-dd 00:00:00'),
                    to: format(end, 'yyyy-MM-dd 23:59:59'),
                };
            }

            if (isFullYear) {
                // Full year selected
                return {
                    from: format(startOfYear(start), 'yyyy-MM-dd 00:00:00'),
                    to: format(endOfYear(end), 'yyyy-MM-dd 23:59:59'),
                };
            }

            // Default: month range
            return {
                from: format(startOfMonth(start), 'yyyy-MM-dd 00:00:00'),
                to: format(endOfMonth(end), 'yyyy-MM-dd 23:59:59'),
            };

        } catch (e) {
            return null;
        }
    }, [restrictedAntibioticStartDate, restrictedAntibioticEndDate]);


    const searchResAndUnresAntibiotic = useMemo(() => {
        if (!ResAndUnresAntibioticStartDate || !ResAndUnresAntibioticEndDate) return null;
        const start = new Date(ResAndUnresAntibioticStartDate);
        const end = new Date(ResAndUnresAntibioticEndDate);
        try {
            const isSameDay = start.toDateString() === end.toDateString();
            const isFullYear = start.getFullYear() === end.getFullYear() &&
                start.getMonth() === 0 &&
                end.getMonth() === 11;

            if (isSameDay) {
                // For "today"
                return {
                    from: format(start, 'yyyy-MM-dd 00:00:00'),
                    to: format(end, 'yyyy-MM-dd 23:59:59'),
                };
            }

            if (isFullYear) {
                // Full year selected
                return {
                    from: format(startOfYear(start), 'yyyy-MM-dd 00:00:00'),
                    to: format(endOfYear(end), 'yyyy-MM-dd 23:59:59'),
                };
            }

            // Default: month range
            return {
                from: format(startOfMonth(start), 'yyyy-MM-dd 00:00:00'),
                to: format(endOfMonth(end), 'yyyy-MM-dd 23:59:59'),
            };

        } catch (e) {
            return null;
        }
    }, [ResAndUnresAntibioticStartDate, ResAndUnresAntibioticEndDate]);



    const { data: AllAntibioticCount, isSuccess } = useQuery({
        queryKey: ['getAllAntibioticCountz', searchallAntibiotic],
        queryFn: () => getAllAntibioticCount(searchallAntibiotic),
        enabled: !!allAntibioticStartDate && !!allAntibioticEndDate,
    });
    useEffect(() => {
        if (isSuccess && Array.isArray(AllAntibioticCount)) {
            setDataset(AllAntibioticCount);
        }
        else {
            setDataset([])
        }
    }, [isSuccess, AllAntibioticCount]);



    const { data: RestrictedAntibioticCount, isSuccess: sucess } = useQuery({
        queryKey: ['getRestrictedAntibioticz', searchRestrictedAntibiotic],
        queryFn: () => getRestrictedAntibioticCount(searchRestrictedAntibiotic),
        enabled: !!allAntibioticStartDate && !!allAntibioticEndDate,
    });
    useEffect(() => {
        if (sucess && Array.isArray(RestrictedAntibioticCount)) {
            setresAntiDataset(RestrictedAntibioticCount);
        }
        else {
            setresAntiDataset([])
        }
    }, [sucess, RestrictedAntibioticCount]);


    const { data: totRestrictedAntibioticCount, isSuccess: ResSucess } = useQuery({
        queryKey: ['getTotRestrictedAntibiotic', searchResAndUnresAntibiotic],
        queryFn: () => getTotRestrictedAntibioticCount(searchResAndUnresAntibiotic),
        enabled: !!ResAndUnresAntibioticStartDate && !!ResAndUnresAntibioticEndDate,
    });



    useEffect(() => {
        if (ResSucess && Array.isArray(totRestrictedAntibioticCount) && totRestrictedAntibioticCount.length > 0) {
            const { antibiotic_count } = totRestrictedAntibioticCount[0];
            setTotResAntibiotic(antibiotic_count);
        } else {
            setTotResAntibiotic(0);
        }
    }, [ResSucess, totRestrictedAntibioticCount]);


    const { data: UnRestrictedAntibioticCount, isSuccess: unResSuccess } = useQuery({
        queryKey: ['getTotUnRestrictedAntibiotic', searchResAndUnresAntibiotic],
        queryFn: () => getTotUnRestrictedAntibioticCount(searchResAndUnresAntibiotic),
        enabled: !!ResAndUnresAntibioticStartDate && !!ResAndUnresAntibioticEndDate,
    });

    useEffect(() => {
        if (unResSuccess && Array.isArray(UnRestrictedAntibioticCount) && UnRestrictedAntibioticCount.length > 0) {
            const { antibiotic_count } = UnRestrictedAntibioticCount[0];
            setTotUnResAntibiotic(antibiotic_count);
        } else {
            setTotUnResAntibiotic(0);
        }
    }, [unResSuccess, UnRestrictedAntibioticCount]);
    const theme = createTheme();
    return (
        <Paper sx={{ flexGrow: 1, borderRadius: 0, height: '91vh' }}>
            <ThemeProvider theme={theme}>
                <Box sx={{
                    flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0',
                    p: 1, gap: .5
                }}>
                    <GridViewIcon sx={{ color: '#4C5270' }} />
                    <TextComponent
                        sx={{
                            fontWeight: 500,
                            flex: 1,
                            fontFamily: 'Arial',
                            color: '#4C5270'
                        }}
                        text="Antibiotic Dashboard"
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', p: .5, gap: .5, bgcolor: '#f8f9fd' }}>
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{
                            flex: 1,
                            border: 1, borderColor: '#d0d6e5',
                            p: 1
                        }}>

                            <AmsDashboardTile />
                            <Box sx={{ pt: 1.5, border: 1, borderColor: '#d0d6e5', mt: .5, height: 280, bgcolor: 'white' }}>
                                <Box sx={{ flex: 1, display: 'flex', }}>
                                    <TextComponent
                                        sx={{
                                            fontWeight: 700,
                                            flex: 1,
                                            fontFamily: 'Arial',
                                            color: '#4C5270',
                                            fontSize: 13,
                                            pl: 1
                                        }}
                                        text="Antibiotic Chart"
                                    />

                                    <Box sx={{ display: 'flex' }}>
                                        <FilterSelector onDateRangeChange={handleDateRangeChange} />
                                    </Box>
                                </Box>

                                {dataset.length > 0 ? (
                                    <BarChart
                                        series={[
                                            {
                                                data: dataset.length !== 0 ? dataset.map((item) => item.antibiotic_count) : [0],
                                                label: dataset.length !== 0 ? 'Frequency of Antibiotic Prescriptions ' : 'No Data',
                                                id: dataset.length !== 0 ? 'Rectified' : 'EmptyData',
                                                stack: 'total',
                                                color: dataset.length !== 0 ? '#90ADC6' : '#D3D3D3',

                                            },
                                        ]}
                                        xAxis={[
                                            {
                                                data: dataset.length !== 0 ? dataset.map((item) => item.itc_desc) : ['No Data'],
                                                scaleType: 'band',
                                            },
                                        ]}
                                        height={230}

                                        margin={{ left: 45, right: 10, }}
                                    />
                                )
                                    : (
                                        <BarChart
                                            series={[
                                                { data: [0], label: 'EmptyData', id: 'EmptyData', stack: 'total', color: '#90ADC6', },
                                            ]}
                                            xAxis={[{
                                                data: ['No Data'], scaleType: 'band',
                                            }]}
                                            height={230}
                                            margin={{ left: 45, right: 10, }}
                                        />
                                    )}

                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', gap: .5 }}>
                                <Box sx={{ pt: 1.5, border: 1, borderColor: '#d0d6e5', mt: .5, height: 280, width: 305, bgcolor: 'white', }}>
                                    <Box sx={{ flex: 1, display: 'flex', }}>
                                        <TextComponent
                                            sx={{
                                                fontWeight: 700,
                                                flex: 1,
                                                fontFamily: 'Arial',
                                                color: '#4C5270',
                                                fontSize: 13,
                                                pt: .5, pl: 1
                                            }}
                                            text="Res. & Unres. Antibiotic"
                                        />
                                    </Box>
                                    <FilterSelector onDateRangeChange={handleResAndUnresAntibioticChange} />
                                    <AntibioticPieChart totResAntibiotic={totResAntibiotic} totUnResAntibiotic={totUnResAntibiotic} />
                                </Box>
                                <Box sx={{ pt: 1.5, border: 1, borderColor: '#d0d6e5', mt: .5, height: 280, flex: 1, bgcolor: 'white' }}>
                                    <Box sx={{ flex: 1, display: 'flex', }}>
                                        <TextComponent
                                            sx={{
                                                fontWeight: 700,
                                                flex: 1,
                                                fontFamily: 'Arial',
                                                color: '#4C5270',
                                                fontSize: 13,
                                                pl: 1
                                            }}
                                            text="Antibiotic Chart"
                                        />
                                        <Box sx={{ display: 'flex' }}>
                                            <FilterSelector onDateRangeChange={handleRestrictedantibioticChange} />

                                        </Box>
                                    </Box>
                                    {resAntidataset.length > 0 ? (
                                        <BarChart
                                            series={[
                                                {
                                                    data: resAntidataset.length !== 0 ? resAntidataset.map((item) => item.antibiotic_count) : [0],
                                                    label: resAntidataset.length !== 0 ? 'Antibiotic Prescribed' : 'No Data',
                                                    id: resAntidataset.length !== 0 ? 'Rectified' : 'EmptyData',
                                                    stack: 'total',
                                                    color: resAntidataset.length !== 0 ? '#90C6B6' : '#D3D3D3',

                                                },
                                            ]}
                                            xAxis={[
                                                {
                                                    data: resAntidataset.length !== 0 ? resAntidataset.map((item) => item.itc_desc) : ['No Data'],
                                                    scaleType: 'band',
                                                },
                                            ]}
                                            height={245}

                                            margin={{ left: 45, right: 10, }}
                                        />
                                    )
                                        : (
                                            <BarChart
                                                series={[
                                                    { data: [0], label: 'EmptyData', id: 'EmptyData', stack: 'total', color: '#90C6B6', },
                                                ]}
                                                xAxis={[{
                                                    data: ['No Data'], scaleType: 'band',
                                                }]}
                                                height={230}
                                                margin={{ left: 45, right: 10, }}
                                            />
                                        )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: 300, border: 1, borderColor: '#d0d6e5', maxHeight: '83vh', overflow: 'auto' }}>
                        <Box
                            sx={{
                                flex: 1,
                                bgcolor: 'white',
                                p: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: .5,
                            }}
                        >
                            <ErrorOutlineRoundedIcon sx={{ color: '#4C5270' }} />
                            <TextComponent
                                sx={{
                                    fontWeight: 500,
                                    fontFamily: 'Arial',
                                    color: '#4C5270',
                                    fontSize: 14,
                                }}
                                text="Restricted Antibiotics"
                            />
                        </Box>
                        {restrictedAntibioticData?.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: 1,
                                    height: 49,
                                    bgcolor: 'white',
                                    borderTop: 1,
                                    borderColor: '#d0d6e5',
                                    pl: 1.5, pt: 1
                                }}
                            >
                                <TextComponent
                                    sx={{
                                        fontWeight: 700,
                                        flex: 1,
                                        fontFamily: 'Arial',
                                        color: '#4C5270',
                                        fontSize: 13,

                                    }}
                                    text={`item Code : ${item.item_code}`}
                                />
                                <Tooltip title={item.itc_desc} arrow placement="top">
                                    <Box
                                        sx={{
                                            fontWeight: 400,
                                            flex: 1,
                                            fontFamily: 'Arial',
                                            color: '#4C5270',
                                            fontSize: 12,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            cursor: 'default'
                                        }}
                                    >
                                        {item.itc_desc}
                                    </Box>
                                </Tooltip>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </ThemeProvider>
        </Paper>
    )
}

export default memo(DashboardMain)