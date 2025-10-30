import { Box } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import TicketDashTile from './TicketDashTile'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import { useQuery } from '@tanstack/react-query'
import {
  getallDeptPending,
  getAllDepttodaysTickets,
  getAllDeptopenTicketsCount,
  getallDeptclosedTodayTicket,
  getallDeptRegTodayInPend,
  getallDeptPevRegTodayAssing,
  getallDeptRegistrdFromSixDays,
  getallDeptClosedFromSixDays,
  getallDepttRegTodayAssignToday,
  getallDeptPevAssingTodayRect
} from 'src/api/TicketApi'
import { format, startOfDay, subDays } from 'date-fns'

const AllDeptticketTile = () => {
  const [sevenDaysbefore, setSevenDaysbefore] = useState('')
  const [yesterdayEndTime, setYesterdayEndTime] = useState('')

  useEffect(() => {
    const updateDateTimes = () => {
      const now = new Date()

      const yesterday = subDays(now, 1)
      const endOfPrevious = startOfDay(yesterday)
      const formattedEndTimeForQuery = format(endOfPrevious, 'yyyy-MM-dd 23:59:59')
      setYesterdayEndTime(formattedEndTimeForQuery)
      const sevenDaysAgo = subDays(now, 6)
      const startOfPrevious7thDay = startOfDay(sevenDaysAgo)
      const formattedStartTimeForQuery = format(startOfPrevious7thDay, 'yyyy-MM-dd HH:mm:ss')
      setSevenDaysbefore(formattedStartTimeForQuery)
    }
    updateDateTimes()
    const intervalId = setInterval(updateDateTimes, 60 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  const PostDatee = useMemo(() => {
    return {
      from: sevenDaysbefore,
      to: yesterdayEndTime
    }
  }, [sevenDaysbefore, yesterdayEndTime])

  const { data: AllDeptPending } = useQuery({
    queryKey: ['getAllDeptPending'],
    queryFn: () => getallDeptPending()
  })
  const { data: AllDeptTodaysTickets } = useQuery({
    queryKey: ['getAllDeptTodaysTickets'],
    queryFn: () => getAllDepttodaysTickets()
  })
  const { data: AllDeptOpenTicketsCount } = useQuery({
    queryKey: ['getAllDeptOpenTicketsCount'],
    queryFn: () => getAllDeptopenTicketsCount()
  })
  const { data: AllDeptClosedTodayTicket } = useQuery({
    queryKey: ['getallDeptClosedTodayTicket'],
    queryFn: () => getallDeptclosedTodayTicket()
  })
  const { data: AllDeptRegTodayInPend } = useQuery({
    queryKey: ['getAllDeptRegTodayInPend'],
    queryFn: () => getallDeptRegTodayInPend()
  })
  const { data: AllDeptPevRegTodayAssing } = useQuery({
    queryKey: ['getAllDeptPevRegTodayAssing'],
    queryFn: () => getallDeptPevRegTodayAssing()
  })
  const { data: AllDeptRegistrdFromSixDays } = useQuery({
    queryKey: ['getAllDeptRegistrdFromSixDays', PostDatee],
    queryFn: () => getallDeptRegistrdFromSixDays(PostDatee),
    enabled: !!sevenDaysbefore && !!yesterdayEndTime
  })
  const { data: AllDeptClosedFromSixDays } = useQuery({
    queryKey: ['getAllDeptClosedFromSixDays', PostDatee],
    queryFn: () => getallDeptClosedFromSixDays(PostDatee),
    enabled: !!sevenDaysbefore && !!yesterdayEndTime
  })
  const { data: AllDepttRegTodayAssignToday } = useQuery({
    queryKey: ['getAllDepttRegTodayAssignToday'],
    queryFn: () => getallDepttRegTodayAssignToday()
  })
  const { data: AllDeptPevAssingTodayRect } = useQuery({
    queryKey: ['getAllDeptPevAssingTodayRect'],
    queryFn: () => getallDeptPevAssingTodayRect()
  })

  const AllDeptPendingCount = useMemo(() => AllDeptPending?.[0]?.alldept_new_ticket_count ?? 0, [AllDeptPending])
  const AllDeptTodaysTicketsCount = useMemo(
    () => AllDeptTodaysTickets?.[0]?.alldept_today_reg_ticket_count ?? 0,
    [AllDeptTodaysTickets]
  )
  const AllDeptOpenTicketCount = useMemo(
    () => AllDeptOpenTicketsCount?.[0]?.alldept_open_ticket_count ?? 0,
    [AllDeptOpenTicketsCount]
  )
  const AllDeptClosedTodayTicketCount = useMemo(
    () => AllDeptClosedTodayTicket?.[0]?.alldept_today_closed_ticket_count ?? 0,
    [AllDeptClosedTodayTicket]
  )
  const AllDeptRegTodayInPendCount = useMemo(
    () => AllDeptRegTodayInPend?.[0]?.alldept_reg_today_inpend_ticket_count ?? 0,
    [AllDeptRegTodayInPend]
  )
  const AllDeptPevRegTodayAssingCount = useMemo(
    () => AllDeptPevRegTodayAssing?.[0]?.alldept_prev_reg_today_assing_ticket_count ?? 0,
    [AllDeptPevRegTodayAssing]
  )
  const AllDeptRegistrdFromSixDaysCount = useMemo(
    () => AllDeptRegistrdFromSixDays?.[0]?.alldept_reg_from_six_days_ticket_count ?? 0,
    [AllDeptRegistrdFromSixDays]
  )
  const AllDeptClosedFromSixDaysCount = useMemo(
    () => AllDeptClosedFromSixDays?.[0]?.alldept_closed_from_sixdays_ticket_count ?? 0,
    [AllDeptClosedFromSixDays]
  )
  const AllDepttRegTodayAssignTodayCount = useMemo(
    () => AllDepttRegTodayAssignToday?.[0]?.alldept_regtoday_assingtoday_ticket_count ?? 0,
    [AllDepttRegTodayAssignToday]
  )
  const AllDeptPevAssingTodayRectCount = useMemo(
    () => AllDeptPevAssingTodayRect?.[0]?.alldept_prevassing_recttoday_ticket_count ?? 0,
    [AllDeptPevAssingTodayRect]
  )
  const AllDeptRegistrdFromSixDaysAvg = AllDeptRegistrdFromSixDaysCount > 0 ? AllDeptRegistrdFromSixDaysCount / 6 : 0
  const AllPendingPrev = AllDeptPendingCount - AllDeptRegTodayInPendCount + AllDeptPevRegTodayAssingCount
  const AllDeptClosedFromSixDaysCountAvg = AllDeptClosedFromSixDaysCount > 0 ? AllDeptClosedFromSixDaysCount / 6 : 0

  const AllPrevOpenCount = useMemo(() => {
    const isValid =
      AllDeptOpenTicketCount !== undefined &&
      AllDepttRegTodayAssignTodayCount !== undefined &&
      AllDeptPevAssingTodayRectCount !== undefined

    return isValid ? AllDeptOpenTicketCount - AllDepttRegTodayAssignTodayCount + AllDeptPevAssingTodayRectCount : 0
  }, [AllDeptOpenTicketCount, AllDepttRegTodayAssignTodayCount, AllDeptPevAssingTodayRectCount])

  const AllPendingPrevCount = useMemo(() => {
    const safePrev = AllPendingPrev || 0
    const safeCurrent = AllDeptPendingCount || 0
    if (safePrev === 0 && safeCurrent === 0) {
      return { status: 3, percentage: '0%' }
    }
    const difference = safePrev - safeCurrent
    const base = Math.max(safePrev, safeCurrent, 1)
    const rawPercentage = (Math.abs(difference) / base) * 100
    const percentageStr = rawPercentage % 1 === 0 ? `${rawPercentage.toFixed(0)}%` : `${rawPercentage.toFixed(1)}%`
    if (difference > 0) {
      return { status: 1, percentage: `-${percentageStr}` }
    } else if (difference < 0) {
      return { status: 2, percentage: `+${percentageStr}` }
    } else {
      return { status: 3, percentage: '0%' }
    }
  }, [AllPendingPrev, AllDeptPendingCount])

  const AllDeptRegisterdCount = useMemo(() => {
    const safeAvg = AllDeptRegistrdFromSixDaysAvg || 0
    const safeToday = AllDeptTodaysTicketsCount || 0
    if (safeAvg === 0 && safeToday === 0) {
      return { status: 3, percentage: '0%' }
    }
    const difference = safeAvg - safeToday
    const base = Math.max(safeAvg, safeToday, 1) // avoid division by 0
    const rawPercentage = (Math.abs(difference) / base) * 100
    const percentageStr = rawPercentage % 1 === 0 ? `${rawPercentage.toFixed(0)}%` : `${rawPercentage.toFixed(1)}%`

    if (difference > 0) {
      return { status: 1, percentage: `-${percentageStr}` }
    } else if (difference < 0) {
      return { status: 2, percentage: `+${percentageStr}` }
    } else {
      return { status: 3, percentage: '0%' }
    }
  }, [AllDeptRegistrdFromSixDaysAvg, AllDeptTodaysTicketsCount])

  const AllDeptClosedCount = useMemo(() => {
    const safeAvg = AllDeptClosedFromSixDaysCountAvg || 0
    const safeToday = AllDeptClosedTodayTicketCount || 0
    if (safeAvg === 0 && safeToday === 0) {
      return { status: 3, percentage: '0%' }
    }
    const difference = safeAvg - safeToday
    const base = Math.max(safeAvg, safeToday, 1) // prevent division by 0
    const rawPercentage = (Math.abs(difference) / base) * 100
    const percentageStr = rawPercentage % 1 === 0 ? `${rawPercentage.toFixed(0)}%` : `${rawPercentage.toFixed(1)}%`

    if (difference > 0) {
      return { status: 1, percentage: `-${percentageStr}` }
    } else if (difference < 0) {
      return { status: 2, percentage: `+${percentageStr}` }
    } else {
      return { status: 3, percentage: '0%' }
    }
  }, [AllDeptClosedFromSixDaysCountAvg, AllDeptClosedTodayTicketCount])

  const AllDeptOpenedCount = useMemo(() => {
    const safePrev = AllPrevOpenCount || 0
    const safeToday = AllDeptOpenTicketCount || 0
    if (safePrev === 0 && safeToday === 0) {
      return { status: 3, percentage: '0%' }
    }
    const difference = safePrev - safeToday
    const base = Math.max(safePrev, safeToday, 1) // Prevent divide-by-zero
    const rawPercentage = (Math.abs(difference) / base) * 100
    const percentageStr = rawPercentage % 1 === 0 ? `${rawPercentage.toFixed(0)}%` : `${rawPercentage.toFixed(1)}%`
    if (difference > 0) {
      return { status: 1, percentage: `+${percentageStr}` }
    } else if (difference < 0) {
      return { status: 2, percentage: `-${percentageStr}` }
    } else {
      return { status: 3, percentage: '0%' }
    }
  }, [AllDeptOpenTicketCount, AllPrevOpenCount])

  return (
    <Box sx={{ flex: 1, display: 'flex', gap: 0.5, my: 0.5 }}>
      <TicketDashTile
        name={'Total Pending Tickets'}
        count={AllDeptPendingCount}
        icon={
          AllPendingPrevCount.status === 1 ? (
            <TrendingDownIcon sx={{ width: 35, height: 35, color: '#C85250' }} />
          ) : AllPendingPrevCount.status === 2 ? (
            <TrendingUpIcon sx={{ width: 35, height: 35, color: '#478C5C' }} />
          ) : AllPendingPrevCount.status === 3 ? (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          ) : (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          )
        }
        iconbgcolor={
          AllPendingPrevCount.status === 2
            ? '#DBF5F0'
            : AllPendingPrevCount.status === 1
              ? '#FEE7E6'
              : AllPendingPrevCount.status === 3
                ? '#BFD7ED'
                : '#BFD7ED'
        }
        percentage={AllPendingPrevCount.percentage}
      />
      <TicketDashTile
        name={"Today's Tickets"}
        count={AllDeptTodaysTicketsCount}
        icon={
          AllDeptRegisterdCount.status === 1 ? (
            <TrendingDownIcon sx={{ width: 35, height: 35, color: '#C85250' }} />
          ) : AllDeptRegisterdCount.status === 2 ? (
            <TrendingUpIcon sx={{ width: 35, height: 35, color: '#478C5C' }} />
          ) : AllDeptRegisterdCount.status === 3 ? (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          ) : (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          )
        }
        iconbgcolor={
          AllDeptRegisterdCount.status === 1
            ? '#FEE7E6'
            : AllDeptRegisterdCount.status === 2
              ? '#DBF5F0'
              : AllDeptRegisterdCount.status === 3
                ? '#BFD7ED'
                : '#BFD7ED'
        }
        percentage={AllDeptRegisterdCount.percentage}
      />
      <TicketDashTile
        name={'Open Tickets'}
        count={AllDeptOpenTicketCount}
        icon={
          AllDeptOpenedCount.status === 2 ? (
            <TrendingDownIcon sx={{ width: 35, height: 35, color: '#C85250 ' }} />
          ) : AllDeptOpenedCount.status === 1 ? (
            <TrendingUpIcon sx={{ width: 35, height: 35, color: '#478C5C' }} />
          ) : AllDeptOpenedCount.status === 3 ? (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          ) : (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          )
        }
        iconbgcolor={
          AllDeptOpenedCount.status === 1
            ? '#DBF5F0'
            : AllDeptOpenedCount.status === 2
              ? '#FEE7E6'
              : AllDeptOpenedCount.status === 3
                ? '#BFD7ED'
                : '#BFD7ED'
        }
        percentage={AllDeptOpenedCount.percentage}
      />
      <TicketDashTile
        name={"Today's Closed Tickets "}
        count={AllDeptClosedTodayTicketCount}
        icon={
          AllDeptClosedCount.status === 1 ? (
            <TrendingDownIcon sx={{ width: 35, height: 35, color: '#C85250' }} />
          ) : AllDeptClosedCount.status === 2 ? (
            <TrendingUpIcon sx={{ width: 35, height: 35, color: '#478C5C' }} />
          ) : AllDeptClosedCount.status === 3 ? (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          ) : (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          )
        }
        iconbgcolor={
          AllDeptClosedCount.status === 1
            ? '#FEE7E6'
            : AllDeptClosedCount.status === 2
              ? '#DBF5F0'
              : AllDeptClosedCount.status === 3
                ? '#BFD7ED'
                : '#BFD7ED'
        }
        percentage={AllDeptClosedCount.percentage}
      />
    </Box>
  )
}

export default memo(AllDeptticketTile)
