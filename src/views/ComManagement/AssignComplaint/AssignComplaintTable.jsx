import {
  Badge,
  Box,
  CssVarsProvider,
  Tab,
  tabClasses,
  TabList,
  TabPanel,
  Tabs,
  tabsClasses,
  Typography
} from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import PendingTickets from './PendingTickets'
import AllTicketList from './AllTicketList/AllTicketList'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import PendingTicketsSuperwiser from '../CmSuperVisorList/PendingTicketsSuperwiser'
import AllTicketsSuperwiser from '../CmSuperVisorList/AllTicketsSuperwiser'
import MyAllTickets from './MyTicketList/MyAllTickets'
import { getEmployeeuserrightsMenu } from 'src/api/TicketApi'
import { useQuery } from '@tanstack/react-query'
import { errorNotify, succesNotify } from 'src/views/Common/CommonCode'
import { socket } from 'src/ws/socket'


const AssignComplaintTable = () => {
  const [index, setIndex] = useState(0)
  const [pendinglength, setpendinglength] = useState(0)
  const [count, setCount] = useState(0)
  const [assistReq, setAssistReq] = useState([])
  const [assistreqLength, setassistreqLength] = useState(0)
  const [forVerifyList, setforVerifyList] = useState([])
  const [forverifyLength, setforverifyLength] = useState(0)
  const [onholdCompl, setOnholdCompl] = useState([])
  const [holdLength, setholdLength] = useState(0)
  const [socketcount, setSocketCount] = useState(0)

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  useEffect(() => {
    const getAllAssistReq = async id => {
      const result = await axioslogin.get(`/complaintassign/individual/assist/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        if (data.length === 0) {
          setAssistReq([])
          setassistreqLength(0)
        } else {
          if (success === 1) {
            setAssistReq(data)
            setassistreqLength(data.length)
          } else {
            setAssistReq([])
            setassistreqLength(0)
          }
        }
      } else {
        setAssistReq([])
        setassistreqLength(0)
      }
    }
    getAllAssistReq(id)
  }, [id, count])

  useEffect(() => {
    const getPendingVerifyList = async empdept => {
      const result = await axioslogin.get(`/complaintassign/SupervsrVerifyPending/${empdept}`)
      const { success, data } = result.data
      if (success === 1) {
        setforVerifyList(data)
        setforverifyLength(data.length)
      } else {
        setforVerifyList([])
        setforverifyLength(0)
      }
    }
    getPendingVerifyList(empdept)
  }, [empdept, count])

  const searchEmpDept = useMemo(() => {
    return {
      complaint_deptslno: empdept
    }
  }, [empdept])

  useEffect(() => {
    const getAllHoldCompalints = async () => {
      const result = await axioslogin.post('/Rectifycomplit/getDepartmentPendingList', searchEmpDept)
      const { success, data } = result.data
      if (success === 2) {
        const OnholdCompl = data.filter(
          complaint =>
            complaint.complaint_status !== 2 && complaint.complaint_status !== 3 && complaint.cm_rectify_status === 'O'
        )
        setOnholdCompl(OnholdCompl)
        setholdLength(OnholdCompl.length === 0 ? 0 : OnholdCompl.length)
      } else {
        setOnholdCompl([])
        setholdLength(0)
      }
    }
    getAllHoldCompalints(searchEmpDept)
  }, [searchEmpDept, count])

  const [loading, setLoading] = useState(true)
  const [allPendingCompl, setAllPendingCompl] = useState([])
  const [menurights, setMenurights] = useState([])

  useEffect(() => {
    const getAllPendingCompalints = async empdept => {
      setLoading(true)
      try {
        const result = await axioslogin.get(`/complaintassign/${empdept}`)
        const { success, data } = result.data
        if (success === 1) {
          setAllPendingCompl(data)
          setpendinglength(data.length)
          setSocketCount(0)
        } else {
          setAllPendingCompl([])
          setpendinglength(0)
        }
      } catch (error) {
        errorNotify('Error fetching complaints:', error)
      } finally {
        setLoading(false)
      }
    }
    getAllPendingCompalints(empdept)
  }, [empdept, count, socketcount])

  const menuList = useMemo(() => {
    if (loading) return []
    return [
      {
        slno: 248,
        name: 'Ticket List',
        component: <PendingTickets allPendingCompl={allPendingCompl} count={count} setCount={setCount} />
      },
      {
        slno: 249,
        name: 'Ticket List Supervisor',
        component: <PendingTicketsSuperwiser allPendingCompl={allPendingCompl} count={count} setCount={setCount} />
      },
      {
        slno: 250,
        name: 'Dept Ticket List Employee View',
        component: (
          <AllTicketList
            onholdCompl={onholdCompl}
            holdLength={holdLength}
            count={count}
            setCount={setCount}
            menurights={menurights}
          />
        )
      },
      {
        slno: 251,
        name: 'Dept Ticket List Supervisor View',
        component: (
          <AllTicketsSuperwiser
            forVerifyList={forVerifyList}
            count={count}
            setCount={setCount}
            forverifyLength={forverifyLength}
            menurights={menurights}
          />
        )
      }
    ]
  }, [loading, allPendingCompl, count, onholdCompl, forVerifyList, forverifyLength, holdLength])

  const postEmp = useMemo(() => ({ empid: id }), [id])
  const { data: menuRightsEmployee = [] } = useQuery({
    queryKey: ['getEmployeeUserRightsMenu', postEmp],
    queryFn: () => getEmployeeuserrightsMenu(postEmp)
  })

  const employeeMenuRight = useMemo(() => menuRightsEmployee, [menuRightsEmployee])

  useEffect(() => {
    let array = menuList.filter(value => employeeMenuRight.find(val => value.slno === val.menu_slno))
    setMenurights(array)
  }, [menuList, employeeMenuRight]);




  // websocket
  useEffect(() => {
    socket.on("new_complaint_submitted", (data) => {
      setSocketCount(1)
      succesNotify(`New complaint received: ${data.complaint_slno}`);
    });
    // ? Clean up listeners on unmount
    return () => {
      socket.off("new_complaint_submitted");
    };
  }, []);

  return (
    <Paper sx={{ flexGrow: 1 }}>
      <CssVarsProvider>
        <Box sx={{ flex: 1, height: 35, borderBottom: 1, borderColor: 'lightgrey', display: 'flex' }}>
          <Box sx={{ flex: 1, fontWeight: 600, pl: 0.8, color: '#C7C8CB' }}>Ticket Details</Box>
        </Box>
        <Tabs
          aria-label="Bottom Navigation"
          value={index}
          onChange={(event, value) => setIndex(value)}
          sx={theme => ({
            p: 0.5,
            boxShadow: theme.shadow.sm,
            [`& .${tabsClasses.root}`]: {
              py: 1,
              flex: 1,
              transition: '0.3s',
              fontWeight: 'md',
              fontSize: 'md',
              [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                opacity: 1
              }
            }
          })}
        >
          <TabList variant="plain" size="sm" disableUnderline sx={{ p: 0, flex: 1 }}>
            {menurights.find(menu => menu.slno === 248) ? (
              <Tab
                key="tab-248"
                value={0}
                disableIndicator
                color={index === 0 ? 'primary' : 'none'}
                sx={{
                  width: 250,
                  height: 46,
                  mt: 0.2,
                  ...(index === 0 && {
                    bgcolor: '#F5F5F5',
                    border: '2px solid #E7F2F8',
                    transform: 'translateY(-1px)'
                  })
                }}
              >
                <Badge badgeContent={pendinglength} color="danger" badgeInset="1%">
                  <Typography sx={{ fontWeight: 600, px: 1.5 }}>Pending Tickets</Typography>
                </Badge>
              </Tab>
            ) : null}
            {menurights.find(menu => menu.slno === 249) ? (
              <Tab
                key="tab-249"
                value={0}
                disableIndicator
                color={index === 0 ? 'primary' : 'none'}
                sx={{
                  width: 250,
                  height: 46,
                  mt: 0.2,
                  ...(index === 0 && {
                    bgcolor: '#F5F5F5',
                    border: '2px solid #E7F2F8',
                    transform: 'translateY(-1px)'
                  })
                }}
              >
                <Badge badgeContent={pendinglength} color="danger" badgeInset="1%">
                  <Typography sx={{ fontWeight: 600, px: 1.5 }}>Pending Tickets</Typography>
                </Badge>
              </Tab>
            ) : null}

            <Tab
              disableIndicator
              value={1}
              color={index === 1 ? 'primary' : 'none'}
              sx={{
                width: 250,
                height: 46,
                mt: 0.2,
                ...(index === 1 && {
                  bgcolor: '#F5F5F5',
                  border: '2px solid #E7F2F8',
                  transform: 'translateY(-1px)'
                })
              }}
            >
              <Badge badgeContent={assistreqLength} color="warning" badgeInset="1%">
                <Typography sx={{ fontWeight: 600, px: 1.5 }}>My Ticket List</Typography>
              </Badge>
            </Tab>

            {menurights.find(menu => menu.slno === 250) ? (
              <Tab
                key="tab-250"
                value={2}
                disableIndicator
                color={index === 2 ? 'primary' : 'none'}
                sx={{
                  width: 250,
                  height: 46,
                  mt: 0.2,
                  ...(index === 2 && {
                    bgcolor: '#F5F5F5',
                    border: '2px solid #E7F2F8',
                    transform: 'translateY(-1px)'
                  })
                }}
              >
                <Badge badgeContent={holdLength} color="neutral" badgeInset="1%">
                  <Typography sx={{ fontWeight: 600, px: 1.5 }}>Department Tickets</Typography>
                </Badge>
              </Tab>
            ) : null}
            {menurights.find(menu => menu.slno === 251) ? (
              <Tab
                key="tab-251"
                value={2}
                disableIndicator
                color={index === 2 ? 'primary' : 'none'}
                sx={{
                  width: 251,
                  height: 46,
                  mt: 0.2,
                  ...(index === 2 && {
                    bgcolor: '#F5F5F5',
                    border: '2px solid #E7F2F8',
                    transform: 'translateY(-1px)'
                  })
                }}
              >
                <Badge badgeContent={forverifyLength} color="primary" badgeInset="1%">
                  <Typography sx={{ fontWeight: 600, px: 1.5 }}>Supervisor Control</Typography>
                </Badge>
              </Tab>
            ) : null}
          </TabList>

          <TabPanel value={0} sx={{ p: 0 }}>
            <Box>
              {menurights.find(menu => menu.slno === 248)?.component || null}
              {menurights.find(menu => menu.slno === 249)?.component || null}
            </Box>
          </TabPanel>
          <TabPanel value={1} sx={{ p: 0 }}>
            <Box
              sx={{
                flex: 1,
                bgcolor: '#E3E7F1',
                mt: 0.3,
                px: 0.3,
                pt: 0.3,
                pb: 0.5
              }}
            >
              <MyAllTickets assistReq={assistReq} count={count} setCount={setCount} />
            </Box>
          </TabPanel>
          <TabPanel value={2} sx={{ p: 0 }}>
            <Box>
              {menurights.find(menu => menu.slno === 250)?.component || null}
              {menurights.find(menu => menu.slno === 251)?.component || null}
            </Box>
          </TabPanel>
        </Tabs>
      </CssVarsProvider>
    </Paper>
  )
}
export default memo(AssignComplaintTable)
