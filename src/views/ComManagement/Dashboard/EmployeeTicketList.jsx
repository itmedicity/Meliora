import { Avatar, Box, Divider, Typography } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import CallReceivedOutlinedIcon from '@mui/icons-material/CallReceivedOutlined';
import TextComponent from 'src/views/Components/TextComponent';
import { useQuery } from 'react-query';
import { getAllemployeesUnderDepartment } from 'src/api/TicketApi';
import { format, startOfDay, subDays } from 'date-fns';

const EmployeeTicketList = ({ empdept }) => {

    const [sevenDaysbefore, setSevenDaysbefore] = useState("")
    const [currentDateAndTime, setCurrentDateAndTime] = useState('')

    const postdata = useMemo(() => {
        return {
            empdept,
            fromDate: sevenDaysbefore,
            toDate: currentDateAndTime
        }
    }, [empdept, sevenDaysbefore, currentDateAndTime])

    const { data: AllEmployees } = useQuery({
        queryKey: ['getAllemployee', postdata],
        queryFn: () => getAllemployeesUnderDepartment(postdata),
    });
    const employeeList = useMemo(() => AllEmployees, [AllEmployees])

    useEffect(() => {
        const updateDateTimes = () => {
            const now = new Date();
            const formattedNowForQuery = format(now, "yyyy-MM-dd HH:mm:ss")
            setCurrentDateAndTime(formattedNowForQuery)
            const sevenDaysAgo = subDays(now, 6)
            const startOfPrevious7thDay = startOfDay(sevenDaysAgo)
            const formattedStartTimeForQuery = format(startOfPrevious7thDay, "yyyy-MM-dd HH:mm:ss")
            setSevenDaysbefore(formattedStartTimeForQuery);
        };
        updateDateTimes()
        const intervalId = setInterval(updateDateTimes, 60 * 60 * 1000)
        return () => clearInterval(intervalId);
    }, [])

    return (
        <Box sx={{ width: 300, bgcolor: 'white', border: 1, borderColor: 'lightgrey', borderRadius: 5 }}>
            <Box sx={{ flex: 1, display: 'flex', p: 1 }}>
                <StarHalfIcon sx={{
                    color: '#5D6C89', height: 52, width: 52,
                }} />
                <Box sx={{ pl: .5 }}>
                    <TextComponent text={"Ticket Stat (Employee)"} sx={{ flex: 1, fontWeight: 500, fontSize: 18, color: '#5D6C89' }} />
                    <Typography sx={{ fontSize: 12, color: '#5D6C89', pl: .3 }}>
                        From the last 7 days
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                flex: 1,
                height: '90vh', overflow: 'auto',
                px: 1,
            }}>
                {employeeList?.map((val, index) => {
                    return (
                        <Box key={index} sx={{
                            display: 'flex', flex: 1, bgcolor: "#BFD7ED", borderRadius: 5, p: 0.3, m: 0.3, height: 50, overflow: 'hidden',
                            opacity: 0.9
                        }}>
                            <Box sx={{ minWidth: 45, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar size='sm' sx={{ bgcolor: 'white' }} />
                            </Box>

                            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', fontSize: 13, overflow: 'hidden' }}>
                                <Box sx={{ fontSize: 12, display: 'flex', flex: 1, alignItems: 'end' }}>
                                    <Typography sx={{ display: 'flex', fontWeight: 700, color: '#3B475F' }} level="title-sm">
                                        {val.em_name}
                                    </Typography>
                                </Box>
                                <Divider sx={{ color: 'red', backgroundColor: 'green', mr: 1 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ display: 'flex', fontWeight: 500, color: '#5D6C89', fontSize: 11, }} level="body-xs" noWrap  >
                                        {val.desg_name}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', width: 50, overflow: 'hidden', flexDirection: 'column' }} >
                                <Box sx={{
                                    display: 'flex', flex: 1, color: 'green', fontWeight: 750, fontSize: 15, opacity: 0.8,
                                    justifyContent: 'start', alignItems: 'center'
                                }}>
                                    <CallMadeOutlinedIcon sx={{ display: 'flex', fontSize: 14, color: 'green', opacity: 0.8, }} />
                                    <Box sx={{ display: 'flex', ml: 0.1 }} >
                                        {val.complaint_count}
                                    </Box>
                                </Box>
                                <Divider sx={{ backgroundColor: 'black', mr: 1 }} />
                                <Box sx={{
                                    display: 'flex', flex: 1, color: 'red', fontWeight: 750, fontSize: 15, opacity: 0.5, justifyContent: 'start', alignItems: 'center',
                                }}>
                                    <CallReceivedOutlinedIcon sx={{ display: 'flex', fontSize: 14, color: 'red', opacity: 0.8 }} />
                                    <Box sx={{ display: 'flex', color: 'red', opacity: 0.8 }} >
                                        {val.closed_count}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Box sx={{ height: 15 }}>
            </Box>
        </Box >
    )
}

export default memo(EmployeeTicketList)