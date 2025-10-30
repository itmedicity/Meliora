import { Box } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import TicketDashTile from './TicketDashTile'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {
  getClosedTickets,
  getOpenTickets,
  getTodaysTickets,
  getClosedFromSixDays,
  getRegistrdFromSixDays,
  getDeptPending,
  getRegTodayInPend,
  getPevRegTodayAssing,
  getRegTodayAssignToday,
  getPevAssingTodayRect
} from 'src/api/TicketApi'
import { format, startOfDay, subDays } from 'date-fns'

const DeptTicketTile = () => {
  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })
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

  const PostDept = useMemo(() => {
    return {
      empdept
    }
  }, [empdept])

  const PostDataa = useMemo(() => {
    return {
      empdept: empdept,
      from: sevenDaysbefore,
      to: yesterdayEndTime
    }
  }, [empdept, sevenDaysbefore, yesterdayEndTime])

  const { data: todaysTickets } = useQuery({
    queryKey: ['getTodaysTickets', PostDept],
    enabled: empdept !== undefined,
    queryFn: () => getTodaysTickets(PostDept)
  })
  const { data: DeptPending } = useQuery({
    queryKey: ['getDeptPendinG', PostDept],
    enabled: empdept !== undefined,
    queryFn: () => getDeptPending(PostDept)
  })
  const { data: OpenTicketCount } = useQuery({
    queryKey: ['getDeptOpenTickets', PostDept],
    enabled: empdept !== undefined,
    queryFn: () => getOpenTickets(PostDept)
  })
  const { data: closedTicketCount } = useQuery({
    queryKey: ['getclosedTicketCount', PostDept],
    queryFn: () => getClosedTickets(PostDept)
  })
  const { data: getClosedFromSixDay } = useQuery({
    queryKey: ['ClosedFromSixDays', PostDataa],
    queryFn: () => getClosedFromSixDays(PostDataa),
    enabled: !!sevenDaysbefore && !!yesterdayEndTime
  })
  const { data: RegisterdFromSiXDays } = useQuery({
    queryKey: ['RegistrdFromSixDays', PostDataa],
    queryFn: () => getRegistrdFromSixDays(PostDataa),
    enabled: !!sevenDaysbefore && !!yesterdayEndTime
  })
  const { data: RegTodayInPend } = useQuery({
    queryKey: ['getRegTodayInPending', PostDept],
    queryFn: () => getRegTodayInPend(PostDept)
  })
  const { data: getPeVRegTodayAssing } = useQuery({
    queryKey: ['getPevRegTodayAssingd', PostDept],
    queryFn: () => getPevRegTodayAssing(PostDept)
  })
  const { data: RegTodayAssignToday } = useQuery({
    queryKey: ['getRegTodayAssigndToday', PostDept],
    queryFn: () => getRegTodayAssignToday(PostDept)
  })
  const { data: PevAssingTodayRect } = useQuery({
    queryKey: ['getPevAssingdTodayRect', PostDept],
    queryFn: () => getPevAssingTodayRect(PostDept)
  })

  const todaysTicketCount = useMemo(() => todaysTickets?.[0]?.today_reg_ticket_count ?? 0, [todaysTickets])
  const DeptPendingCount = useMemo(() => DeptPending?.[0]?.new_ticket_count ?? 0, [DeptPending])
  const DeptOpenCount = useMemo(() => OpenTicketCount?.[0]?.open_ticket_count ?? 0, [OpenTicketCount])
  const TodayclosedTicketCount = useMemo(
    () => closedTicketCount?.[0]?.today_closed_ticket_count ?? 0,
    [closedTicketCount]
  )
  const getClosedFromSixDayCount = useMemo(
    () => getClosedFromSixDay?.[0]?.closed_ticket_count_from_sixdays ?? 0,
    [getClosedFromSixDay]
  )
  const RegisterdFromSiXDaysCount = useMemo(
    () => RegisterdFromSiXDays?.[0]?.dept_ticket_reg_from_sixdays ?? 0,
    [RegisterdFromSiXDays]
  )
  const RegTodayInPendCount = useMemo(() => RegTodayInPend?.[0]?.today_reg_pending ?? 0, [RegTodayInPend])
  const PeVRegTodayAssingCount = useMemo(
    () => getPeVRegTodayAssing?.[0]?.prev_reg_today_assing_ticket_count ?? 0,
    [getPeVRegTodayAssing]
  )
  const RegTodayAssignTodayCount = useMemo(
    () => RegTodayAssignToday?.[0]?.reg_today_assing_today_ticket_count ?? 0,
    [RegTodayAssignToday]
  )
  const PevAssingTodayRectCount = useMemo(
    () => PevAssingTodayRect?.[0]?.prev_assing_today_rect_ticket_count ?? 0,
    [PevAssingTodayRect]
  )
  const ClosedFromSixDaysAvg = getClosedFromSixDayCount > 0 ? getClosedFromSixDayCount / 6 : 0
  const RegisterdFromSiXDaysListAvg = RegisterdFromSiXDaysCount > 0 ? RegisterdFromSiXDaysCount / 6 : 0
  const yesterdaysPending = DeptPendingCount - RegTodayInPendCount + PeVRegTodayAssingCount

  const PrevOpenCount = useMemo(() => {
    const isValid =
      DeptOpenCount !== undefined && RegTodayAssignTodayCount !== undefined && PevAssingTodayRectCount !== undefined

    return isValid ? DeptOpenCount - RegTodayAssignTodayCount + PevAssingTodayRectCount : 0
  }, [DeptOpenCount, RegTodayAssignTodayCount, PevAssingTodayRectCount])

  const Previouspending = useMemo(() => {
    const safePrev = yesterdaysPending || 0
    const safeToday = DeptPendingCount || 0
    if (safePrev === 0 && safeToday === 0) {
      return { status: 3, percentage: '0%' }
    }
    const difference = safePrev - safeToday
    const base = Math.max(safePrev, safeToday, 1)
    const rawPercentage = (Math.abs(difference) / base) * 100
    const percentageStr = rawPercentage % 1 === 0 ? `${rawPercentage.toFixed(0)}%` : `${rawPercentage.toFixed(1)}%`

    if (difference > 0) {
      return { status: 1, percentage: `-${percentageStr}` }
    } else if (difference < 0) {
      return { status: 2, percentage: `+${percentageStr}` }
    } else {
      return { status: 3, percentage: '0%' }
    }
  }, [yesterdaysPending, DeptPendingCount])

  const RegisterdCount = useMemo(() => {
    const safeAvg = RegisterdFromSiXDaysListAvg || 0
    const safeToday = todaysTicketCount || 0
    if (safeAvg === 0 && safeToday === 0) {
      return { status: 3, percentage: '0%' }
    }
    const difference = safeAvg - safeToday
    const base = Math.max(safeAvg, safeToday, 1)
    const rawPercentage = (Math.abs(difference) / base) * 100
    const percentageStr = rawPercentage % 1 === 0 ? `${rawPercentage.toFixed(0)}%` : `${rawPercentage.toFixed(1)}%`

    if (difference > 0) {
      return { status: 1, percentage: `-${percentageStr}` }
    } else if (difference < 0) {
      return { status: 2, percentage: `+${percentageStr}` }
    } else {
      return { status: 3, percentage: '0%' }
    }
  }, [RegisterdFromSiXDaysListAvg, todaysTicketCount])

  const OpenedWithoutTodayCount = useMemo(() => {
    const safePrevOpen = PrevOpenCount || 0
    const safeDeptOpen = DeptOpenCount || 0
    if (safePrevOpen === 0 && safeDeptOpen === 0) {
      return { status: 3, percentage: '0%' }
    }
    const difference = safePrevOpen - safeDeptOpen
    const base = Math.max(safePrevOpen, safeDeptOpen, 1)
    const rawPercentage = (Math.abs(difference) / base) * 100
    const percentageStr = rawPercentage % 1 === 0 ? `${rawPercentage.toFixed(0)}%` : `${rawPercentage.toFixed(1)}%`
    if (difference > 0) {
      return { status: 1, percentage: `+${percentageStr}` }
    } else if (difference < 0) {
      return { status: 2, percentage: `-${percentageStr}` }
    } else {
      return { status: 3, percentage: '0%' }
    }
  }, [DeptOpenCount, PrevOpenCount])

  const ClosedCount = useMemo(() => {
    const safeClosedAvg = ClosedFromSixDaysAvg || 0
    const safeTodayClosed = TodayclosedTicketCount || 0

    if (safeClosedAvg === 0 && safeTodayClosed === 0) {
      return { status: 3, percentage: '0%' }
    }
    const difference = safeClosedAvg - safeTodayClosed
    const base = Math.max(safeClosedAvg, safeTodayClosed, 1)
    const rawPercentage = (Math.abs(difference) / base) * 100

    const percentageStr = rawPercentage % 1 === 0 ? `${rawPercentage.toFixed(0)}%` : `${rawPercentage.toFixed(1)}%`

    if (difference > 0) {
      return { status: 1, percentage: `-${percentageStr}` }
    } else if (difference < 0) {
      return { status: 2, percentage: `+${percentageStr}` }
    } else {
      return { status: 3, percentage: '0%' }
    }
  }, [ClosedFromSixDaysAvg, TodayclosedTicketCount])

  return (
    <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
      <TicketDashTile
        name={'Total Pending Tickets'}
        count={DeptPendingCount}
        icon={
          Previouspending.status === 1 ? (
            <TrendingDownIcon sx={{ width: 35, height: 35, color: '#C85250' }} />
          ) : Previouspending.status === 2 ? (
            <TrendingUpIcon sx={{ width: 35, height: 35, color: '#478C5C' }} />
          ) : Previouspending.status === 3 ? (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          ) : (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          )
        }
        iconbgcolor={
          Previouspending.status === 2
            ? '#DBF5F0'
            : Previouspending.status === 1
              ? '#FEE7E6'
              : Previouspending.status === 3
                ? '#BFD7ED'
                : '#BFD7ED'
        }
        percentage={Previouspending.percentage}
      />
      <TicketDashTile
        name={"Today's Tickets"}
        count={todaysTicketCount}
        icon={
          RegisterdCount.status === 1 ? (
            <TrendingDownIcon sx={{ width: 35, height: 35, color: '#C85250' }} />
          ) : RegisterdCount.status === 2 ? (
            <TrendingUpIcon sx={{ width: 35, height: 35, color: '#478C5C' }} />
          ) : RegisterdCount.status === 3 ? (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          ) : (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          )
        }
        iconbgcolor={
          RegisterdCount.status === 1
            ? '#FEE7E6'
            : RegisterdCount.status === 2
              ? '#DBF5F0'
              : RegisterdCount.status === 3
                ? '#BFD7ED'
                : '#BFD7ED'
        }
        percentage={RegisterdCount.percentage}
      />
      <TicketDashTile
        name={'Open Tickets'}
        count={DeptOpenCount}
        icon={
          OpenedWithoutTodayCount.status === 2 ? (
            <TrendingDownIcon sx={{ width: 35, height: 35, color: '#C85250 ' }} />
          ) : OpenedWithoutTodayCount.status === 1 ? (
            <TrendingUpIcon sx={{ width: 35, height: 35, color: '#478C5C' }} />
          ) : OpenedWithoutTodayCount.status === 3 ? (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          ) : (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          )
        }
        iconbgcolor={
          OpenedWithoutTodayCount.status === 1
            ? '#DBF5F0'
            : OpenedWithoutTodayCount.status === 2
              ? '#FEE7E6'
              : OpenedWithoutTodayCount.status === 3
                ? '#BFD7ED'
                : '#BFD7ED'
        }
        percentage={OpenedWithoutTodayCount.percentage}
      />
      <TicketDashTile
        name={"Today's Closed Tickets "}
        count={TodayclosedTicketCount}
        icon={
          ClosedCount.status === 1 ? (
            <TrendingDownIcon sx={{ width: 35, height: 35, color: '#C85250' }} />
          ) : ClosedCount.status === 2 ? (
            <TrendingUpIcon sx={{ width: 35, height: 35, color: '#478C5C' }} />
          ) : ClosedCount.status === 3 ? (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          ) : (
            <TrendingFlatIcon sx={{ width: 35, height: 35, color: '#0074B7' }} />
          )
        }
        iconbgcolor={
          ClosedCount.status === 1
            ? '#FEE7E6'
            : ClosedCount.status === 2
              ? '#DBF5F0'
              : ClosedCount.status === 3
                ? '#BFD7ED'
                : '#BFD7ED'
        }
        percentage={ClosedCount.percentage}
      />
    </Box>
  )
}

export default memo(DeptTicketTile)
