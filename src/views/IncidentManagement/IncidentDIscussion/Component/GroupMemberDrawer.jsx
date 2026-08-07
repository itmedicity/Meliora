import React, { memo, useCallback, useMemo, useState } from 'react';

import {
    Avatar,
    Box,
    Chip,
    Divider,
    Drawer,
    IconButton,
    Sheet,
    Stack,
    Input
} from '@mui/joy';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import IncidentTextComponent from '../../Components/IncidentTextComponent';
import AddMemberDrawer from './AddMemberDrawer';
import { useAllEmployeeFetch, useConverstaionLasteMessage } from '../../CommonComponent/useQuery';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';


const GroupMemberDrawer = ({
    open,
    onClose,
    members = [],
    groupName = '',
    onRemoveMember,
    loggedEmp,
    ConversationId,
    refetchGroupMembers,
    onlineInGroup
}) => {


 
    const loggedUserAdmin = members?.find(item => Number(item.emp_id) === Number(loggedEmp))?.is_admin === 1;
    const [query, setQuery] = useState("")
    const [openAddMember, setOpenAddMember] = useState(false);

    const FilterdMember = Array.isArray(members)
        ? members.filter((item) =>
            item?.em_name?.toLowerCase()?.includes(query?.toLowerCase()) ||
            item?.sec_name?.toLowerCase()?.includes(query?.toLowerCase())
        )
        : [];


    const { data: AllEmployee = [] } = useAllEmployeeFetch();
    const { data: LastConversationMessage = [] } = useConverstaionLasteMessage(ConversationId);


    const employee = useMemo(() => {
        return Array.isArray(AllEmployee) ? AllEmployee : []
    }, [AllEmployee]);

    const handleAddMember = useCallback(async (emp) => {
        if (!ConversationId) return warningNotify('Conversation not found');

        if (emp?.length === 0) return warningNotify('Select Employee');

        try {
            const response = await axioslogin.post(`/incidentMaster/conversation-member/addmember`, {
                coverstation_id: ConversationId,
                Employee: emp,
                JoinMessageId: LastConversationMessage?.last_message_id
            });
            const {
                success,
                message
            } = response?.data || {};

            if (success !== 1) {
                return warningNotify(
                    message || 'Failed to remove member'
                );
            }
            succesNotify(message);
            refetchGroupMembers();
        } catch (error) {
            console.error(error);
            errorNotify('Failed to remove member');
        }

    }, [
        ConversationId,
        refetchGroupMembers,
        LastConversationMessage
    ]);


    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '--Drawer-horizontalSize': '420px',
            }}>
            <Sheet
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >

                {/* HEADER */}

                <Box
                    sx={{
                        p: 3,
                        background:
                            'linear-gradient(135deg,#6d28d9,#9333ea)',
                        color: '#fff',
                        position: 'relative'
                    }}
                >

                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 12,
                            top: 12,
                            bgcolor: 'rgba(255,255,255,0.15)',
                            color: '#fff'
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>

                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                            mb: 2,
                            bgcolor: '#fff',
                            color: '#6d28d9',
                            fontSize: 28,
                            fontWeight: 800
                        }}
                    >
                        G
                    </Avatar>

                    <IncidentTextComponent
                        text={groupName}
                        color="#ffffff"
                        size={18}
                        weight={800}
                    />

                    <IncidentTextComponent
                        text={`${members?.length || 0} Participants`}
                        color="#f3e8ff"
                        size={11}
                        weight={600}
                    />

                </Box>

                {/* SEARCH */}

                <Box sx={{ p: 2 }}>
                    <Input
                        startDecorator={<SearchRoundedIcon />}
                        placeholder="Search members..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        sx={{
                            borderRadius: 30
                        }}
                    />
                </Box>

                <Divider />

                {/* MEMBER LIST */}

                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: 2
                    }}
                >

                    <Stack spacing={1.5}>

                        {FilterdMember?.map((emp) => {
                            const isOnline = onlineInGroup?.some((employee) => Number(employee) === Number(emp.emp_id));
                            const IsOnlineEmployee = isOnline || (Number(emp.emp_id) === Number(loggedEmp))
                            return (
                                <Sheet
                                    key={emp.emp_id}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: 18,
                                        bgcolor: '#fff',
                                        boxShadow: 'sm',
                                        transition: '0.2s',
                                        '&:hover': {
                                            transform:
                                                'translateY(-2px)',
                                            boxShadow: 'md'
                                        }
                                    }}  >

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center">

                                        <Stack
                                            direction="row"
                                            spacing={1.5}
                                            alignItems="center" >

                                            <Avatar
                                                sx={{
                                                    bgcolor:
                                                        emp.is_admin
                                                            ? '#7c3aed'
                                                            : '#1976d2'
                                                }}
                                            >
                                                {emp.em_name?.charAt(0)}
                                            </Avatar>

                                            <Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    gap: 1
                                                }}>
                                                    <IncidentTextComponent
                                                        text={emp.em_name}
                                                        color="#111827"
                                                        size={13}
                                                        weight={700}
                                                    />
                                                    <IncidentTextComponent
                                                        text={IsOnlineEmployee ? 'Online' : 'Offline'}
                                                        color={IsOnlineEmployee ? '#05ad08' : '#5b615b'}
                                                        size={9}
                                                        weight={700}
                                                    />

                                                </Box>


                                                <IncidentTextComponent
                                                    text={emp.desg_name}
                                                    color="#6b7280"
                                                    size={10}
                                                    weight={600}
                                                />

                                                <IncidentTextComponent
                                                    text={`${emp.dept_name} • ${emp.sec_name}`}
                                                    color="#9ca3af"
                                                    size={9}
                                                    weight={500}
                                                />

                                            </Box>

                                        </Stack>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >

                                            {emp.is_admin === 1 && (

                                                <Chip
                                                    size="sm"
                                                    startDecorator={
                                                        <AdminPanelSettingsRoundedIcon />
                                                    }
                                                    color="primary"
                                                    variant="soft">
                                                    Admin
                                                </Chip>
                                            )}
                                            {loggedUserAdmin &&
                                                Number(emp.emp_id) !== Number(loggedEmp) && (
                                                    <IconButton
                                                        size="sm"
                                                        color="danger"
                                                        onClick={() => onRemoveMember(emp)}
                                                    >
                                                        <DeleteRoundedIcon />
                                                    </IconButton>
                                                )}

                                        </Stack>

                                    </Stack>

                                </Sheet>


                            )
                        })}

                    </Stack>

                </Box>

                {/* FOOTER */}
                {
                    loggedUserAdmin &&
                    <Box
                        sx={{
                            p: 2,
                            borderTop: '1px solid #e5e7eb'
                        }}
                    >

                        <Sheet

                            onClick={() => setOpenAddMember(true)}
                            sx={{
                                cursor: 'pointer',
                                p: 1.5,
                                borderRadius: 14,
                                bgcolor: '#7c3aed',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                '&:hover': {
                                    bgcolor: '#6d28d9'
                                }
                            }}
                        >

                            <PersonAddAlt1RoundedIcon />

                            <IncidentTextComponent
                                text="Add New Member"
                                color="#fff"
                                size={12}
                                weight={700}
                            />

                        </Sheet>

                    </Box>
                }
            </Sheet>
            <AddMemberDrawer
                open={openAddMember}
                onClose={() => setOpenAddMember(false)}
                employees={employee}
                members={members}
                onAddMember={handleAddMember}
            />

        </Drawer>
    );
};

export default memo(GroupMemberDrawer);