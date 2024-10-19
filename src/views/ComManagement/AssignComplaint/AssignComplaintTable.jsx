import { Badge, Box, CssVarsProvider, Tab, tabClasses, TabList, TabPanel, Tabs, tabsClasses, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { memo, useEffect, useMemo, useState } from 'react'
import PendingTickets from './PendingTickets';
import AllTicketList from './AllTicketList/AllTicketList';
import MyTicketMain from './MyTicketList/MyTicketMain';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import PendingTicketsSuperwiser from '../CmSuperVisorList/PendingTicketsSuperwiser';
import AllTicketsSuperwiser from '../CmSuperVisorList/AllTicketsSuperwiser';

const AssignComplaintTable = () => {

    const [index, setIndex] = useState(0)
    const [authorization, setAuthorization] = useState([])
    const [allPendingCompl, setAllPendingCompl] = useState([])
    const [pendinglength, setpendinglength] = useState(0)
    const [count, setCount] = useState(0)
    const [assistReq, setAssistReq] = useState([])
    const [assistreqLength, setassistreqLength] = useState(0)
    const [forVerifyList, setforVerifyList] = useState([])
    const [forverifyLength, setforverifyLength] = useState(0)
    const [onholdCompl, setOnholdCompl] = useState([])
    const [holdLength, setholdLength] = useState(0)

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })

    useEffect(() => {
        const checkAuthorisation = async (id) => {
            const result = await axioslogin.get(`/Rectifycomplit/getAuthorization/${id}`);
            const { success, data } = result.data;
            if (success === 1) {
                if (data.length !== 0) {
                    setAuthorization(data)
                }
                else {
                    setAuthorization([])
                }

            } else {
                setAuthorization([])
            }
        }
        checkAuthorisation(id)
    }, [id])

    useEffect(() => {
        const getAllPendingCompalints = async (empdept) => {
            const result = await axioslogin.get(`/complaintassign/${empdept}`);
            const { success, data } = result.data;
            if (success === 1) {
                if (data.length === 0) {
                    setAllPendingCompl([])
                }
                else {
                    if (success === 1) {
                        setAllPendingCompl(data)
                        setpendinglength(data.length)
                    } else {
                        setAllPendingCompl([])
                        setpendinglength(0)
                    }
                }

            }
            else {
                setAllPendingCompl([])
                setpendinglength(0)
            }
        }
        getAllPendingCompalints(empdept)
    }, [empdept, count])


    useEffect(() => {
        const getAllAssistReq = async (id) => {
            const result = await axioslogin.get(`/complaintassign/individual/assist/${id}`);
            const { success, data } = result.data;
            if (success === 1) {
                if (data.length === 0) {
                    setAssistReq([])
                    setassistreqLength(0)
                }
                else {
                    if (success === 1) {
                        setAssistReq(data)
                        setassistreqLength(data.length)
                    } else {
                        setAssistReq([])
                        setassistreqLength(0)
                    }
                }
            }
            else {
                setAssistReq([])
                setassistreqLength(0)
            }
        }
        getAllAssistReq(id)
    }, [id, count])
    useEffect(() => {
        const getPendingVerifyList = async (empdept) => {
            const result = await axioslogin.get(`/complaintassign/SupervsrVerifyPending/${empdept}`);
            const { success, data } = result.data
            if (success === 1) {
                setforVerifyList(data)
                setforverifyLength(data.length)
            }
            else {
                setforVerifyList([])
                setforverifyLength(0)
            }
        }
        getPendingVerifyList(empdept)
    }, [empdept, count])

    const searchDate = useMemo(() => {
        return {
            complaint_deptslno: empdept,
        };
    }, [empdept]);

    useEffect(() => {
        const getAllHoldCompalints = async () => {
            const result = await axioslogin.post('/Rectifycomplit/getDepartmentPendingList', searchDate);
            const { success, data } = result.data;
            if (success === 2) {

                const OnholdCompl = data.filter(complaint =>
                    complaint.complaint_status !== 2 &&
                    complaint.complaint_status !== 3 &&
                    complaint.cm_rectify_status === 'O'
                );

                setOnholdCompl(OnholdCompl)
                setholdLength(OnholdCompl.length === 0 ? 0 : OnholdCompl.length)

            }
            else {
                setOnholdCompl([])
                setholdLength(0)
            }
        };

        getAllHoldCompalints(searchDate)
    }, [searchDate, count]);



    return (
        <Paper sx={{ flexGrow: 1, }} >
            <CssVarsProvider>
                <Box sx={{ flex: 1, height: 35, borderBottom: 1, borderColor: 'lightgrey', display: 'flex', }}>
                    <Box sx={{ flex: 1, fontWeight: 600, pl: .8, color: '#C7C8CB' }}>Ticket Details</Box>
                </Box>

                <Tabs
                    aria-label="Bottom Navigation"
                    value={index}
                    onChange={(event, value) => setIndex(value)}
                    sx={(theme) => ({
                        p: 0.5,
                        boxShadow: theme.shadow.sm,
                        [`& .${tabsClasses.root}`]: {
                            py: 1,
                            flex: 1,
                            transition: '0.3s',
                            fontWeight: 'md',
                            fontSize: 'md',
                            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                                opacity: 1,
                            },
                        },
                    })}
                >
                    <TabList
                        variant="plain"
                        size="sm"
                        disableUnderline
                        sx={{ p: 0, flex: 1, }}
                    >
                        {authorization.length === 0 ?
                            <Tab
                                disableIndicator
                                // orientation="vertical"
                                color={index === 0 ? 'primary' : 'none'}
                                sx={{
                                    width: 250,
                                    height: 45,
                                    ...(index === 0 && {
                                        boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)',
                                        bgcolor: '#F5F5F5',
                                        border: '2px solid #E7F2F8',
                                        transform: 'translateY(-1px)',
                                    }),
                                }}
                            >
                                <Badge badgeContent={pendinglength} color="danger" badgeInset="1%">
                                    <Typography sx={{ fontWeight: 600, px: 1.5 }}>Tickets</Typography>
                                </Badge>
                            </Tab> :
                            <Tab
                                disableIndicator
                                orientation="vertical"
                                color={index === 0 ? 'primary' : 'none'}
                                sx={{
                                    width: 250,
                                    height: 45,
                                    ...(index === 0 && {
                                        boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)',
                                        bgcolor: '#F5F5F5',
                                        border: '2px solid #E7F2F8',
                                        transform: 'translateY(-1px)',
                                    }),
                                }}
                            >
                                <Badge badgeContent={pendinglength} color="danger" badgeInset="1%">
                                    <Typography sx={{ fontWeight: 600, px: 1.5 }}>Pending Tickets</Typography>
                                </Badge>
                            </Tab>}

                        <Tab
                            disableIndicator
                            orientation="vertical"
                            color={index === 1 ? 'primary' : 'none'}
                            sx={{
                                width: 250,
                                height: 45,
                                ...(index === 1 && {
                                    boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)',
                                    bgcolor: '#F5F5F5',
                                    border: '2px solid #E7F2F8',
                                    transform: 'translateY(-1px)',
                                }),
                            }}
                        >
                            <Badge badgeContent={assistreqLength} color="warning" badgeInset="1%">
                                <Typography sx={{ fontWeight: 600, px: 1.5 }}>My Ticket List</Typography>
                            </Badge>
                        </Tab>
                        {authorization.length === 0 ?
                            <Tab
                                disableIndicator
                                orientation="vertical"
                                color={index === 2 ? 'primary' : 'none'}
                                sx={{
                                    width: 250,
                                    height: 45,
                                    ...(index === 2 && {
                                        boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)',
                                        bgcolor: '#F5F5F5',
                                        border: '2px solid #E7F2F8',
                                        transform: 'translateY(-1px)',
                                    }),
                                }}
                            >
                                <Badge badgeContent={holdLength} color="neutral" badgeInset="1%">
                                    <Typography sx={{ fontWeight: 600, px: 1.5 }}>Department Tickets</Typography>
                                </Badge>
                            </Tab> : <Tab
                                disableIndicator
                                orientation="vertical"
                                color={index === 2 ? 'primary' : 'none'}
                                sx={{
                                    width: 250,
                                    height: 45,
                                    ...(index === 2 && {
                                        boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)',
                                        bgcolor: '#F5F5F5',
                                        border: '2px solid #E7F2F8',
                                        transform: 'translateY(-1px)',
                                    }),
                                }}
                            >
                                <Badge badgeContent={forverifyLength} color="primary" badgeInset="1%">
                                    <Typography sx={{ fontWeight: 600, px: 1.5 }}>Supervisor Control</Typography>
                                </Badge>
                            </Tab>}
                    </TabList>
                    <TabPanel value={0} sx={{ p: 0 }}>
                        {authorization.length === 0 ?
                            <PendingTickets allPendingCompl={allPendingCompl} count={count} setCount={setCount} /> :
                            <PendingTicketsSuperwiser allPendingCompl={allPendingCompl} count={count} setCount={setCount} />}
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <MyTicketMain assistReq={assistReq} count={count} setCount={setCount} />
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: 0 }}>
                        {authorization.length === 0 ?
                            <AllTicketList onholdCompl={onholdCompl} holdLength={holdLength} count={count} setCount={setCount} /> :
                            <AllTicketsSuperwiser forVerifyList={forVerifyList} count={count} setCount={setCount} forverifyLength={forverifyLength} />}

                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Paper >

    )
}
export default memo(AssignComplaintTable)
