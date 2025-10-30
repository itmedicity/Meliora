import { Box, Typography } from '@mui/joy'
import { BarChart } from '@mui/x-charts'
import { format, startOfDay, subDays } from 'date-fns'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { allTicketTypes } from 'src/api/TicketApi'
import TextComponent from 'src/views/Components/TextComponent'
import DateRangeIcon from '@mui/icons-material/DateRange'

const TicketTypeListProgressChart = ({ empdept }) => {
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
      empdept,
      fromDate: sevenDaysbefore,
      toDate: currentDateAndTime
    }
  }, [empdept, sevenDaysbefore, currentDateAndTime])

  const {
    data: AllTicketType,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getAllTicketTypes', postdata],
    queryFn: () => allTicketTypes(postdata),
    enabled: !!postdata
  })

  const ticketTypeList = useMemo(() => {
    if (AllTicketType && Array.isArray(AllTicketType)) {
      return AllTicketType.map(item => ({
        complaintType: item.complaint_type_name || 'N/A',
        totalComplaints: item.total_complaint_count || 0,
        rectifiedComplaints: item.rectified_complaint_count || 0,
        unrectifiedComplaints: Math.max(item.total_complaint_count - item.rectified_complaint_count || 0, 0)
      }))
    }
    return []
  }, [AllTicketType])

  const rectifiedComplaintsData = ticketTypeList.map(item => item.rectifiedComplaints ?? 0)
  const unrectifiedComplaintsData = ticketTypeList.map(item => item.unrectifiedComplaints ?? 0)
  const xLabels = ticketTypeList.map(item => item.complaintType ?? 'N/A')
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
  if (isLoading) return <div>Loading ticket types...</div>;
  if (isError) return <div>Error.</div>;
  return (
    <Box
      sx={{
        flex: 1,
        border: 1,
        borderColor: 'lightgrey',
        px: 1,
        py: 0.5,
        my: 0.5,
        bgcolor: 'white',
        borderRadius: 5
      }}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <TextComponent
          text={'Ticket Type Progress Bar'}
          sx={{ flex: 1, fontWeight: 600, fontSize: 16, color: '#5D6C89' }}
        />
        <Box sx={{ display: 'flex', pr: 1 }}>
          <DateRangeIcon sx={{ color: '#5D6C89', height: 20, width: 20 }} />
          <Typography sx={{ fontSize: 13, color: '#5D6C89', pt: 0.3 }}>From the last 7 days</Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ width: '100%', height: 206 }}>
          {ticketTypeList.length !== 0 ? (
            <BarChart
              series={[
                {
                  data: rectifiedData,
                  label: 'Rectified       ',
                  id: 'Rectified',
                  stack: 'total',
                  color: '#5D6C89'
                },
                {
                  data: unrectifiedData,
                  label: 'Pending',
                  id: 'Pending',
                  stack: 'total',
                  color: '#CBD2DF  '
                }
              ]}
              xAxis={[{ data: xLabels, scaleType: 'band' }]}
              margin={{ left: 40, right: 20, top: 60, bottom: 35 }}
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

export default memo(TicketTypeListProgressChart)
