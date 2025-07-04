import { Box, Input, styled } from '@mui/joy'
import { PieChart, useDrawingArea } from '@mui/x-charts'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllDeptPieTicketchart } from 'src/api/TicketApi'
import TextComponent from 'src/views/Components/TextComponent'
import SquareIcon from '@mui/icons-material/Square'

const AllDeptPieChart = () => {
  const [searchMonthAndYear, setSearchMonthAndYear] = useState(format(new Date(), 'yyyy-MM'))
  const searchmonthly = useMemo(() => {
    return {
      from: format(startOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 00:00:00'),
      to: format(endOfMonth(new Date(searchMonthAndYear)), 'yyyy-MM-dd 23:59:59')
    }
  }, [searchMonthAndYear])

  const monthChange = useCallback(e => {
    const value = e.target.value
    setSearchMonthAndYear(value)
  }, [])

  const { data: AllDeptPieChart } = useQuery({
    queryKey: ['getAllDeptPiechart', searchmonthly],
    queryFn: () => getAllDeptPieTicketchart(searchmonthly)
  })

  const [totalTickets, setTotalTickets] = useState(0)
  const pieChartData = useMemo(() => {
    if (!AllDeptPieChart || AllDeptPieChart.length === 0) return []
    const chartData = AllDeptPieChart[0]
    setTotalTickets(chartData.total_tickets || 0)
    return [
      { id: 0, label: 'Closed Tickets', value: chartData.closed_ticket, color: '#478C5C' },
      { id: 1, label: 'Hold Tickets', value: chartData.hold_ticket, color: '#636B74' },
      { id: 2, label: 'Open Tickets', value: chartData.open_ticket, color: '#9A5B13' },
      { id: 3, label: 'Verified Tickets', value: chartData.verified_ticket, color: '#0D75B1' }
    ]
  }, [AllDeptPieChart])

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 15
  }))

  const StyledCenterText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 18
  }))

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea()
    return (
      <StyledText x={left + width / 1} y={top + height / 1.8}>
        {children}
      </StyledText>
    )
  }
  function CenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea()
    return (
      <StyledCenterText x={left + width / 1.1} y={top + height / 2.3}>
        {children}
      </StyledCenterText>
    )
  }

  return (
    <Box
      sx={{
        width: 370,
        border: 1,
        borderColor: 'lightgrey',
        p: 1,
        bgcolor: 'white',
        borderRadius: 5
      }}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <TextComponent text={'Ticket List Chart'} sx={{ flex: 1, fontWeight: 600, fontSize: 16, color: '#5D6C89' }} />
        <Box sx={{ width: 150 }}>
          <Input
            variant="soft"
            color="primary"
            sx={{ borderRadius: 20, pl: 2, cursor: 'pointer', color: '#41729F', fontWeight: 600 }}
            name="searchMonthAndYear"
            type="month"
            size="sm"
            value={searchMonthAndYear}
            onChange={monthChange}
          />
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Box sx={{ width: 205, pt: 1.1 }}>
          <PieChart
            height={180}
            sx={{}}
            series={[
              {
                data: pieChartData,
                innerRadius: 70,
                outerRadius: 85,
                paddingAngle: -2,
                cornerRadius: 0,
                startAngle: -47,
                endAngle: 314,
                cx: 95
              }
            ]}
            slotProps={{
              legend: { hidden: true }
            }}
          >
            <PieCenterLabel>Registered Tickets</PieCenterLabel>
            <CenterLabel>{totalTickets}</CenterLabel>
          </PieChart>
        </Box>
        <Box sx={{ pl: 1, pt: 2.5 }}>
          <Box sx={{ flex: 1, pt: 3, pl: 2, display: 'flex', gap: 1 }}>
            <SquareIcon sx={{ color: '#9A5B13' }} />
            <TextComponent text={'Open'} sx={{ fontSize: 15 }} />
          </Box>
          <Box sx={{ flex: 1, pt: 0.5, pl: 2, display: 'flex', gap: 1 }}>
            <SquareIcon sx={{ color: '#478C5C' }} />
            <TextComponent text={'Closed'} sx={{ fontSize: 15 }} />
          </Box>
          <Box sx={{ flex: 1, pt: 0.5, pl: 2, display: 'flex', gap: 1 }}>
            <SquareIcon sx={{ color: '#636B74' }} />
            <TextComponent text={'Hold'} sx={{ fontSize: 15 }} />
          </Box>
          <Box sx={{ flex: 1, pt: 0.5, pl: 2, display: 'flex', gap: 1 }}>
            <SquareIcon sx={{ color: '#0D75B1' }} />
            <TextComponent text={'verifeid'} sx={{ fontSize: 15 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(AllDeptPieChart)
