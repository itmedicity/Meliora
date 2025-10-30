import { Box, Typography } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { BarChart } from '@mui/x-charts'
import { getAllcomplaintDept } from 'src/api/TicketApi'
import { format, startOfDay, subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

const AllDeptTicketProgressList = () => {
  const [currentDateAndTime, setCurrentDateAndTime] = useState('')
  const [sevenDaysbefore, setSevenDaysbefore] = useState('')

  useEffect(() => {
    const updateDateTimes = () => {
      const now = new Date()
      const formattedNowForQuery = format(now, 'yyyy-MM-dd HH:mm:ss')
      setCurrentDateAndTime(formattedNowForQuery)
      const sevenDaysAgo = subDays(now, 6)
      const startOfPrevious7thDay = startOfDay(sevenDaysAgo)
      const formattedStartTimeForQuery = format(startOfPrevious7thDay, 'yyyy-MM-dd HH:mm:ss')
      setSevenDaysbefore(formattedStartTimeForQuery)
    }
    updateDateTimes()
    const intervalId = setInterval(updateDateTimes, 60 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  const postdata = useMemo(() => {
    return {
      fromDate: sevenDaysbefore,
      toDate: currentDateAndTime
    }
  }, [sevenDaysbefore, currentDateAndTime])

  const { data: AllcomplaintDept } = useQuery({
    queryKey: ['getAllcomplaintDept', postdata],
    enabled: sevenDaysbefore !== '' && !!currentDateAndTime !== '',
    queryFn: () => getAllcomplaintDept(postdata)
  })

  const ticketDeptList = useMemo(() => {
    if (AllcomplaintDept && Array.isArray(AllcomplaintDept)) {
      return AllcomplaintDept.map(item => ({
        TicketDepartment: item.complaint_dept_name || 'N/A',
        totalComplaints: item.total_complaint_count || 0,
        rectifiedComplaints: item.rectified_complaint_count || 0,
        unrectifiedComplaints: Math.max(item.total_complaint_count - item.rectified_complaint_count || 0, 0)
      }))
    }
    return []
  }, [AllcomplaintDept])

  const rectifiedComplaintsData = ticketDeptList.map(item => item.rectifiedComplaints ?? 0)
  const unrectifiedComplaintsData = ticketDeptList.map(item => item.unrectifiedComplaints ?? 0)
  const xLabels = ticketDeptList.map(item => item.TicketDepartment ?? 'N/A')
  const combinedData = xLabels.map((label, index) => {
    const rectified = rectifiedComplaintsData[index]
    const unrectified = unrectifiedComplaintsData[index]
    return {
      label,
      rectified: rectified || 0,
      unrectified: unrectified || 0
    }
  })
  const rectifiedData = combinedData.map(item => item.rectified)
  const unrectifiedData = combinedData.map(item => item.unrectified)

  return (
    <Box
      sx={{
        flex: 1,
        border: 1,
        borderColor: 'lightgrey',
        px: 1,
        py: 0.5,
        bgcolor: 'white',
        borderRadius: 5
      }}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <TextComponent
          text={'Ticket Status Across Departments'}
          sx={{ flex: 1, fontWeight: 600, fontSize: 16, color: '#5D6C89' }}
        />
        <Box sx={{ display: 'flex', pr: 1 }}>
          <DateRangeIcon sx={{ color: '#5D6C89', height: 20, width: 20 }} />
          <Typography sx={{ fontSize: 13, color: '#5D6C89', pt: 0.3 }}>From the last 7 days</Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ width: '100%', height: 205 }}>
          {ticketDeptList.length !== 0 ? (
            <BarChart
              series={[
                {
                  data: rectifiedData,
                  label: 'Rectified       ',
                  id: 'Rectified',
                  stack: 'total',
                  color: '#244E73'
                },
                {
                  data: unrectifiedData,
                  label: 'Pending',
                  id: 'Pending',
                  stack: 'total',
                  color: '#A7B8CF',
                  border: 1
                }
              ]}
              xAxis={[{ data: xLabels, scaleType: 'band' }]}
              margin={{ left: 40, right: 20, top: 40, bottom: 35 }}
            />
          ) : (
            <BarChart
              series={[{ data: [0], label: 'EmptyData', id: 'EmptyData', stack: 'total' }]}
              xAxis={[
                {
                  data: ['No Data'],
                  scaleType: 'band'
                }
              ]}
              margin={{ left: 40, right: 20, top: 40, bottom: 35 }}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(AllDeptTicketProgressList)
