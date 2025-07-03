import { Box, Input } from '@mui/joy'
import { BarChart } from '@mui/x-charts'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getTicketcloseWithin } from 'src/api/TicketApi'
import TextComponent from 'src/views/Components/TextComponent'

const DeptClosedTicketProgressBar = ({ empdept }) => {
  const [CloseticketMonthAndYear, setCloseticketMonthAndYear] = useState(
    format(new Date(), 'yyyy-MM')
  )
  const monthChangeCloseTimeRange = useCallback(e => {
    const value = e.target.value
    setCloseticketMonthAndYear(value)
  }, [])

  const searchMonthlycloseTimeRange = useMemo(() => {
    return {
      from: format(startOfMonth(new Date(CloseticketMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
      to: format(endOfMonth(new Date(CloseticketMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
      empdept: empdept,
    }
  }, [CloseticketMonthAndYear, empdept])

  const { data: closeTickets } = useQuery({
    queryKey: ['getcloseWithin', searchMonthlycloseTimeRange],
    queryFn: () => getTicketcloseWithin(searchMonthlycloseTimeRange),
  })

  const groupTicketsClosed = tickets => {
    const groups = {
      '0 - 30 min': 0,
      '30 min - 1 hr': 0,
      '1 - 2hr': 0,
      '2 - 3hr': 0,
      '3 - 4hr': 0,
      '4 - 8hr': 0,
      '8 - 12hr': 0,
      '12 - 24hr': 0,
      'more than 1 day': 0,
    }

    if (!Array.isArray(tickets) || tickets.length === 0) return groups
    tickets.forEach(({ closed_with_in }) => {
      if (closed_with_in <= 1800) groups['0 - 30 min']++
      else if (closed_with_in <= 3600) groups['30 min - 1 hr']++
      else if (closed_with_in <= 7200) groups['1 - 2hr']++
      else if (closed_with_in <= 10800) groups['2 - 3hr']++
      else if (closed_with_in <= 14400) groups['3 - 4hr']++
      else if (closed_with_in <= 28800) groups['4 - 8hr']++
      else if (closed_with_in <= 43200) groups['8 - 12hr']++
      else if (closed_with_in <= 86400) groups['12 - 24hr']++
      else groups['more than 1 day']++
    })
    return groups
  }

  const groupedDataclose = useMemo(() => groupTicketsClosed(closeTickets), [closeTickets])
  const closetimeRangeLabels = Object.keys(groupedDataclose)
  const closetimeRangeData = Object.values(groupedDataclose)
  const xLabels = ['EmptyData']
  const EmptyData = [0]

  return (
    <Box
      sx={{ flex: 1, border: 1, borderColor: 'lightgrey', p: 1, bgcolor: 'white', borderRadius: 5 }}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <TextComponent
          text={'Closed Ticket TAT'}
          sx={{ flex: 1, fontWeight: 600, fontSize: 16, color: '#5D6C89' }}
        />
        <Box sx={{ width: 150 }}>
          <Input
            variant="soft"
            color="primary"
            sx={{ borderRadius: 20, pl: 2, cursor: 'pointer', color: '#41729F', fontWeight: 600 }}
            name="CloseticketMonthAndYear"
            type="month"
            size="sm"
            value={CloseticketMonthAndYear}
            onChange={monthChangeCloseTimeRange}
          />
        </Box>
      </Box>
      <Box sx={{ width: '100%', height: 233 }}>
        {closetimeRangeData.length > 0 ? (
          <BarChart
            series={[
              {
                data: closetimeRangeData,
                label: 'Closed Tickets',
                id: 'closeTickets',
                color: '#478C5C',
              },
            ]}
            xAxis={[{ data: closetimeRangeLabels, scaleType: 'band' }]}
            margin={{ left: 40, right: 20, top: 40, bottom: 35 }}
          />
        ) : (
          <BarChart
            series={[{ data: EmptyData, label: 'EmptyData', id: 'EmptyData', stack: 'total' }]}
            xAxis={[
              {
                data: xLabels,
                scaleType: 'band',
              },
            ]}
            margin={{ left: 40, right: 20, top: 40, bottom: 35 }}
          />
        )}
      </Box>
    </Box>
  )
}

export default memo(DeptClosedTicketProgressBar)
