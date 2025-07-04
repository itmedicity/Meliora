import { Box, Input } from '@mui/joy'
import { BarChart } from '@mui/x-charts'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getTicketOpenWithin } from 'src/api/TicketApi'
import TextComponent from 'src/views/Components/TextComponent'

const DeptOpenTicketProgressBar = ({ empdept }) => {
  const [openticketMonthAndYear, setOpenticketMonthAndYear] = useState(format(new Date(), 'yyyy-MM'))

  const monthChangeOpenTimeRange = useCallback(e => {
    const value = e.target.value
    setOpenticketMonthAndYear(value)
  }, [])

  const searchMonthlyOpenTimeRange = useMemo(() => {
    return {
      from: format(startOfMonth(new Date(openticketMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
      to: format(endOfMonth(new Date(openticketMonthAndYear)), 'yyyy-MM-dd 23:59:59'),
      empdept: empdept
    }
  }, [openticketMonthAndYear, empdept])

  const groupTickets = tickets => {
    const groups = {
      '0 - 5 min': 0,
      '6 - 10 min': 0,
      '11 - 20 min': 0,
      '21 - 30 min': 0,
      '31 min - 1 hr': 0,
      'More than 1 hr': 0
    }
    if (!Array.isArray(tickets) || tickets.length === 0) return groups
    tickets.forEach(({ open_with_in }) => {
      if (open_with_in <= 300) groups['0 - 5 min']++
      else if (open_with_in <= 600) groups['6 - 10 min']++
      else if (open_with_in <= 1200) groups['11 - 20 min']++
      else if (open_with_in <= 1800) groups['21 - 30 min']++
      else if (open_with_in <= 3600) groups['31 min - 1 hr']++
      else groups['More than 1 hr']++
    })
    return groups
  }

  const { data: openTickets } = useQuery({
    queryKey: ['getOpenTickets', searchMonthlyOpenTimeRange],
    queryFn: () => getTicketOpenWithin(searchMonthlyOpenTimeRange)
  })

  const groupedData = useMemo(() => groupTickets(openTickets), [openTickets])
  const opentimeRangeLabels = Object.keys(groupedData)
  const opentimeRangeData = Object.values(groupedData)
  const EmptyData = [0]
  const xLabels = ['EmptyData']

  return (
    <Box sx={{ flex: 1, border: 1, borderColor: 'lightgrey', p: 1, bgcolor: 'white', borderRadius: 5 }}>
      <Box sx={{ flex: 1, display: 'flex' }}>
        <TextComponent
          text={'Tickets Response TAT'}
          sx={{ flex: 1, fontWeight: 600, fontSize: 16, color: '#5D6C89' }}
        />
        <Box sx={{ width: 150 }}>
          <Input
            variant="soft"
            color="primary"
            sx={{ borderRadius: 20, pl: 2, cursor: 'pointer', color: '#41729F', fontWeight: 600 }}
            name="openticketMonthAndYear"
            type="month"
            size="sm"
            value={openticketMonthAndYear}
            onChange={monthChangeOpenTimeRange}
          />
        </Box>
      </Box>
      <Box sx={{ width: '100%', height: 233 }}>
        {opentimeRangeData.length > 0 ? (
          <BarChart
            series={[
              {
                data: opentimeRangeData,
                label: 'Opened Tickets',
                id: 'OpenTickets',
                stack: 'total',
                color: '#9A5B13'
              }
            ]}
            xAxis={[
              {
                data: opentimeRangeLabels,
                scaleType: 'band'
              }
            ]}
            margin={{ left: 40, right: 20, top: 40, bottom: 35 }}
          />
        ) : (
          <BarChart
            series={[{ data: EmptyData, label: 'EmptyData', id: 'EmptyData', stack: 'total' }]}
            xAxis={[
              {
                data: xLabels,
                scaleType: 'band'
              }
            ]}
            margin={{ left: 40, right: 20, top: 40, bottom: 35 }}
          />
        )}
      </Box>
    </Box>
  )
}

export default memo(DeptOpenTicketProgressBar)
