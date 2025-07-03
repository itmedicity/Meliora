import { Box } from '@mui/joy'
import React, { memo, useEffect, useMemo, useState } from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { useSelector } from 'react-redux'
import { format, startOfDay, subDays } from 'date-fns'
import { getEmployeeuserrightsMenu } from 'src/api/TicketApi'
import { useQuery } from 'react-query'
import { errorNotify } from 'src/views/Common/CommonCode'
const DeptTicketTile = React.lazy(() => import('./DeptTicketTile'))
const TicketTypeListProgressChart = React.lazy(() => import('./TicketTypeListProgressChart'))
const DepartmentPieChart = React.lazy(() => import('./DepartmentPieChart'))
const DeptOpenTicketProgressBar = React.lazy(() => import('./DeptOpenTicketProgressBar'))
const DeptClosedTicketProgressBar = React.lazy(() => import('./DeptClosedTicketProgressBar'))
const EmployeeTicketList = React.lazy(() => import('./EmployeeTicketList'))
const AllDeptTicketProgressList = React.lazy(() => import('./AllDeptTicketProgressList'))
const TopPerformerList = React.lazy(() => import('./TopPerformerList'))
const AllDeptticketTile = React.lazy(() => import('./AllDeptticketTile'))
const AllDeptPieChart = React.lazy(() => import('./AllDeptPieChart'))
const AllDeptOpenTicketProgressBar = React.lazy(() => import('./AllDeptOpenTicketProgressBar'))
const AllDeptClosedProgressBar = React.lazy(() => import('./AllDeptClosedProgressBar'))

const TicketManagementCmDeptMain = () => {
  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })
  const empid = useSelector(state => {
    return state.LoginUserData.empid
  })

  console.log(empid)
  const [sevenDaysbefore, setSevenDaysbefore] = useState('')
  const [currentDateAndTime, setCurrentDateAndTime] = useState('')
  const [yesterdayEndTime, setYesterdayEndTime] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateDateTimes = async () => {
      setLoading(true)
      try {
        const now = new Date()
        const formattedNowForQuery = format(now, 'yyyy-MM-dd HH:mm:ss')
        setCurrentDateAndTime(formattedNowForQuery)
        const yesterday = subDays(now, 1)
        const endOfPrevious = startOfDay(yesterday)
        const formattedEndTimeForQuery = format(endOfPrevious, 'yyyy-MM-dd 23:59:59')
        setYesterdayEndTime(formattedEndTimeForQuery)
        const sevenDaysAgo = subDays(now, 6)
        const startOfPrevious7thDay = startOfDay(sevenDaysAgo)
        const formattedStartTimeForQuery = format(startOfPrevious7thDay, 'yyyy-MM-dd HH:mm:ss')
        setSevenDaysbefore(formattedStartTimeForQuery)
      } catch (error) {
        errorNotify(error)
      } finally {
        setLoading(false)
      }
    }
    updateDateTimes()
    const intervalId = setInterval(updateDateTimes, 60 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  const PostDataa = useMemo(() => {
    return {
      empdept: empdept,
      from: sevenDaysbefore,
      to: yesterdayEndTime,
    }
  }, [empdept, sevenDaysbefore, yesterdayEndTime])

  const PostDate = useMemo(() => {
    return {
      from: sevenDaysbefore,
      to: currentDateAndTime,
    }
  }, [sevenDaysbefore, currentDateAndTime])

  const [menurights, setMenurights] = useState([])
  const menuList = useMemo(() => {
    if (loading) return []
    return [
      {
        slno: 235,
        name: 'Ticket Dashboard All Dept Ticket Tile',
        component: <AllDeptticketTile />,
      },
      { slno: 236, name: 'Ticket Dashboard Dept Ticket Tile', component: <DeptTicketTile /> },
      {
        slno: 237,
        name: 'Ticket Dashboard Dept Ticket Type Progress Bar',
        component: <TicketTypeListProgressChart empdept={empdept} />,
      },
      {
        slno: 238,
        name: 'Ticket Dashboard Dept Pie Chart',
        component: <DepartmentPieChart empdept={empdept} />,
      },
      {
        slno: 239,
        name: 'Ticket Dashboard Dept Response Tat',
        component: <DeptOpenTicketProgressBar empdept={empdept} />,
      },
      {
        slno: 240,
        name: 'Ticket Dashboard Dept Closed Tat',
        component: <DeptClosedTicketProgressBar empdept={empdept} />,
      },
      {
        slno: 241,
        name: 'Ticket Dashboard Status Across Dept',
        component: <AllDeptTicketProgressList PostDataa={PostDataa} />,
      },
      { slno: 242, name: 'Ticket Dashboard All  Dept Pie Chart', component: <AllDeptPieChart /> },
      {
        slno: 244,
        name: 'Ticket Dashboard All  Dept Response Tat',
        component: <AllDeptOpenTicketProgressBar />,
      },
      {
        slno: 245,
        name: 'Ticket Dashboard All  Dept Closed Tat',
        component: <AllDeptClosedProgressBar />,
      },
      {
        slno: 246,
        name: 'Ticket Dashboard All  Dept Top contributors',
        component: <TopPerformerList PostDate={PostDate} />,
      },
      {
        slno: 247,
        name: 'Ticket Dashboard  Dept Employee Stat',
        component: <EmployeeTicketList empdept={empdept} />,
      },
    ]
  }, [loading, empdept, PostDataa, PostDate])

  const postEmp = useMemo(() => ({ empid }), [empid])

  const { data: menuRightsEmployee = [], isSuccess } = useQuery({
    queryKey: ['getEmployeeuserrightsMenu', postEmp],
    queryFn: () => getEmployeeuserrightsMenu(postEmp),
  })
  const employeeMenuRights = useMemo(() => menuRightsEmployee, [menuRightsEmployee])
  useEffect(() => {
    console.log(menuList)
    console.log(employeeMenuRights)

    if (isSuccess && employeeMenuRights?.length > 0) {
      let array = menuList.filter(value =>
        employeeMenuRights.find(val => value.slno === val.menu_slno)
      )
      setMenurights(array)
    }
  }, [menuList, employeeMenuRights])

  return (
    <Box
      sx={{
        minHeight: '90vh',
        borderRadius: 1,
        boxShadow: 2,
        bgcolor: '#F8F9FD',
      }}
    >
      {/* <CssVarsProvider> */}
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'white',
        }}
      >
        <Box sx={{ m: 1 }}>
          <DashboardOutlinedIcon sx={{ color: '#262065', fontSize: 20 }} />
        </Box>
        <Box sx={{ mt: 1.3, color: '#262065' }}>DashBoard</Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', p: 0.5, gap: 0.5 }}>
        <Box sx={{ flex: 1 }}>
          {menurights.find(menu => menu.slno === 236)?.component || null}
          <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
            <Box sx={{ flex: 1 }}>
              {menurights.find(menu => menu.slno === 237)?.component || null}
            </Box>
            <Box>{menurights.find(menu => menu.slno === 238)?.component || null}</Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
            <Box sx={{ flex: 1 }}>
              {menurights.find(menu => menu.slno === 239)?.component || null}
            </Box>
            <Box sx={{ flex: 1 }}>
              {menurights.find(menu => menu.slno === 240)?.component || null}
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            {menurights.find(menu => menu.slno === 235)?.component || null}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
            <Box sx={{ flex: 1 }}>
              {menurights.find(menu => menu.slno === 241)?.component || null}
            </Box>
            <Box>{menurights.find(menu => menu.slno === 242)?.component || null}</Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', gap: 0.5 }}>
            <Box sx={{ flex: 1 }}>
              {menurights.find(menu => menu.slno === 244)?.component || null}
            </Box>
            <Box sx={{ flex: 1 }}>
              {menurights.find(menu => menu.slno === 245)?.component || null}
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            {menurights.find(menu => menu.slno === 246)?.component || null}
          </Box>
        </Box>
        <Box>{menurights.find(menu => menu.slno === 247)?.component || null}</Box>
      </Box>
      {/* </CssVarsProvider> */}
    </Box>
  )
}
export default memo(TicketManagementCmDeptMain)
