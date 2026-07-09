import React, { memo, useEffect, useMemo, useState } from 'react';

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    IconButton,
    Input,
    Sheet,
    Stack
} from '@mui/joy';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

import IncidentTextComponent from '../Components/IncidentTextComponent';
import { useAllEmployeeFetch } from '../CommonComponent/useQuery';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';



const CreateDiscussionButton = ({
    open,
    setOpen,
    items,
    // firstAction,
    fetchDetail,
    conversations,
    chatState
}) => {

    const {
        actionType,
        module,
        actionDetailSlno
    } = chatState || {};


    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [chatType, setChatType] = useState('single');
    const [groupTitle, setGroupTitle] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const { data: AllEmployee = [] } = useAllEmployeeFetch();

    const PAGE_SIZE = 50;

    const employee = useMemo(() => {
        return Array.isArray(AllEmployee) ? AllEmployee : []
    }, [AllEmployee]);

    const { empdept, empsecid, empid } = useSelector(state => {
        return state.LoginUserData
    });


    const context = {
        module_name: module,
        entity_type: actionType,
        entity_id: actionDetailSlno,
        incident_id: items?.inc_register_slno,
        department_id: empdept,
        section_id: empsecid,
        created_by: empid
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchText]);


    const filteredEmployees = useMemo(() => {
        return employee.filter(emp =>
            emp.em_name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            emp.dept_name?.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [employee, debouncedSearch]);


    const handleSelect = (emp) => {
        const empId = emp?.em_id;

        const isSameUser = Number(empid) === Number(empId);

        if (isSameUser) return infoNotify("Your are Selecting Yourself!")

        if (chatType === 'single') {
            const existingConversation = conversations?.find(conv => {
                const ids = conv?.participant_ids
                    ?.split(',')
                    ?.map(id => Number(id));

                return ids?.includes(empId);
            });

            if (existingConversation) {
                // already exists → block selection
                warningNotify('Conversation already exists');
                return;
            }

            setSelectedEmployees([emp]);
            return;
        }

        const exists = selectedEmployees?.find(
            item => item?.em_id === emp?.em_id
        );


        if (exists) {
            setSelectedEmployees(prev =>
                prev.filter(item => item?.em_id !== emp?.em_id)
            );
        } else {
            setSelectedEmployees(prev => [...prev, emp]);
        }
    };

    const handleRemoveEmployee = (empId) => {
        setSelectedEmployees(prev =>
            prev.filter(
                item => item?.em_id !== empId
            )
        );
    };

    const paginatedEmployees = useMemo(() => {
        const start = 0;
        const end = page * PAGE_SIZE;
        return filteredEmployees.slice(start, end);
    }, [filteredEmployees, page]);


    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setPage(prev => prev + 1);
        }
    };

    const EmployeeRow = memo(({ emp, selected, onSelect, chatType }) => {
        return (
            <Sheet
                onClick={() => onSelect(emp)}
                sx={{
                    p: 1.5,
                    borderRadius: 18,
                    cursor: 'pointer',
                    border: selected
                        ? '2px solid #1976d2'
                        : '1px solid #e5e7eb',
                    bgcolor: selected ? '#eff6ff' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                }}
            >
                {chatType === 'group' && (
                    <Checkbox checked={!!selected} />
                )}

                <Avatar sx={{ width: 42, height: 42 }}>
                    {emp.em_name?.[0]}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                    <IncidentTextComponent text={emp?.em_name} size={12} weight={700} />
                    <IncidentTextComponent text={emp?.desg_name} size={10} />
                    <IncidentTextComponent
                        text={`${emp?.dept_name} - ${emp?.sec_name}`}
                        size={10}
                    />
                </Box>

                {selected && <Avatar sx={{ bgcolor: '#1976d2' }}>✓</Avatar>}
            </Sheet>
        );
    });

    const handleCreateChat = async () => {

        // VALIDATION
        if (selectedEmployees.length === 0) {
            return warningNotify("Please select at least one employee");
        }
        if (
            chatType === 'group' &&
            !groupTitle?.trim()
        ) {
            return warningNotify("Please enter group title");
        }
        const payload = {
            conversation: {
                module_name: context?.module_name,
                entity_type: context?.entity_type,
                entity_id: context?.entity_id,
                parent_entity_id: null,
                incident_id: context?.incident_id,
                department_id: context?.department_id,
                section_id: context?.section_id,
                created_by: context?.created_by,
                title:
                    chatType === 'group'
                        ? groupTitle.trim()
                        : null,
                is_group_chat:
                    chatType === 'group' ? 1 : 0
            },

            users: [
                {
                    emp_id: context?.created_by,
                    department_id: context?.department_id,
                    section_id: context?.section_id,
                    is_admin: 1
                },

                ...selectedEmployees.map(emp => ({
                    emp_id: emp?.em_id,
                    department_id: emp?.em_department,
                    section_id: emp?.em_dept_section,
                    is_admin: 0
                }))
            ]
        };

        try {
            const response = await axioslogin.post(
                '/incidentMaster/start-conversation',
                payload
            );
            const {
                success,
                message
            } = response?.data ?? {};

            if (success !== 1) {
                return warningNotify(
                    message || "Error in starting conversation"
                );
            }
            succesNotify(
                message || "Chat created successfully"
            );

            fetchDetail()

            // RESET
            setSelectedEmployees([]);
            setGroupTitle('');
            setSearchText('');
            setChatType('single');

            setOpen(false);
        } catch (error) {
            console.log(error);
            errorNotify(
                "Error in starting conversation"
            );
        }
    };



    if (!open) return null;

    return (
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 9999,
                bgcolor: 'rgba(15,23,42,0.45)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }} >

            <Sheet
                sx={{
                    width: 520,
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    borderRadius: 24,
                    bgcolor: '#ffffff',
                    boxShadow:
                        '0 20px 60px rgba(0,0,0,0.25)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >

                {/* HEADER */}

                <Box
                    sx={{
                        px: 2.5,
                        py: 2,
                        background:
                            'linear-gradient(135deg,#1976d2,#7b1fa2)',
                        color: '#ffffff',
                        position: 'relative'
                    }}
                >

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Stack spacing={0.5}>

                            <IncidentTextComponent
                                text="Create Discussion"
                                color="#ffffff"
                                size={18}
                                weight={800}
                            />

                            <IncidentTextComponent
                                text="Start a secure incident discussion"
                                color="#dbeafe"
                                size={10}
                                weight={600}
                            />

                        </Stack>

                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.18)',
                                color: '#ffffff',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.28)'
                                }
                            }}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </Stack>

                </Box>

                {/* CHAT TYPE */}

                <Box
                    sx={{
                        p: 2
                    }}>

                    <Stack
                        direction="row"
                        spacing={1.5}>
                        <Sheet
                            onClick={() => {
                                setChatType('single');
                                setSelectedEmployees([]);
                            }}
                            sx={{
                                flex: 1,
                                p: 2,
                                borderRadius: 18,
                                cursor: 'pointer',
                                transition: '0.25s',
                                border:
                                    chatType === 'single'
                                        ? '2px solid #1976d2'
                                        : '1px solid #e5e7eb',
                                bgcolor:
                                    chatType === 'single'
                                        ? '#eff6ff'
                                        : '#ffffff'
                            }}>

                            <Stack
                                spacing={1}
                                alignItems="center">

                                <Avatar
                                    sx={{
                                        bgcolor: '#1976d2'
                                    }}>
                                    <PersonAddAltRoundedIcon />
                                </Avatar>

                                <IncidentTextComponent
                                    text="Single Chat"
                                    color="#111827"
                                    size={12}
                                    weight={700}
                                />

                                <IncidentTextComponent
                                    text="One to one discussion"
                                    color="#6b7280"
                                    size={9}
                                    weight={500}
                                />
                            </Stack>
                        </Sheet>

                        <Sheet
                            onClick={() => {
                                setChatType('group');
                                setSelectedEmployees([]);
                            }}
                            sx={{
                                flex: 1,
                                p: 2,
                                borderRadius: 18,
                                cursor: 'pointer',
                                transition: '0.25s',
                                border:
                                    chatType === 'group'
                                        ? '2px solid #7b1fa2'
                                        : '1px solid #e5e7eb',
                                bgcolor:
                                    chatType === 'group'
                                        ? '#faf5ff'
                                        : '#ffffff'
                            }}>

                            <Stack
                                spacing={1}
                                alignItems="center" >

                                <Avatar
                                    sx={{
                                        bgcolor: '#7b1fa2'
                                    }}>
                                    <GroupAddRoundedIcon />
                                </Avatar>

                                <IncidentTextComponent
                                    text="Group Chat"
                                    color="#111827"
                                    size={12}
                                    weight={700}
                                />

                                <IncidentTextComponent
                                    text="Multi user discussion"
                                    color="#6b7280"
                                    size={9}
                                    weight={500}
                                />
                            </Stack>
                        </Sheet>
                    </Stack>
                </Box>

                {/* GROUP TITLE */}

                {
                    chatType === 'group' && (

                        <Box
                            sx={{
                                px: 2,
                                pb: 1
                            }}
                        >

                            <Input
                                value={groupTitle}
                                onChange={(e) =>
                                    setGroupTitle(e.target.value)
                                }
                                placeholder="Enter group title..."
                                startDecorator={
                                    <GroupsRoundedIcon />
                                }
                                variant="soft"
                                sx={{
                                    borderRadius: 14
                                }}
                            />

                        </Box>
                    )
                }


                <Box
                    sx={{
                        px: 2,
                        py: 1
                    }}>
                    <Input
                        value={searchText}
                        onChange={(e) =>
                            setSearchText(e.target.value)
                        }
                        startDecorator={
                            <SearchRoundedIcon />
                        }
                        placeholder="Search employee or department..."
                        variant="soft"
                        sx={{
                            borderRadius: 14
                        }}
                    />

                </Box>

                {/* SELECTED */}

                {
                    chatType !== 'single' &&
                    selectedEmployees.length > 0 && (
                        <Box
                            sx={{
                                px: 2,
                                pb: 1
                            }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                useFlexGap
                                flexWrap="wrap"
                            >

                                {
                                    selectedEmployees?.map(emp => (

                                        <Box
                                            key={emp.em_id}
                                            sx={{
                                                px: 1.5,
                                                py: 0.7,
                                                borderRadius: 20,
                                                bgcolor: '#e3f2fd',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1
                                            }}
                                        >

                                            <IncidentTextComponent
                                                text={emp.em_name}
                                                color="#1976d2"
                                                size={10}
                                                weight={700}
                                            />

                                            <IconButton
                                                size="sm"
                                                variant="plain"
                                                color="danger"
                                                onClick={() =>
                                                    handleRemoveEmployee(emp.em_id)
                                                }
                                                sx={{
                                                    minWidth: 18,
                                                    minHeight: 18
                                                }}
                                            >
                                                ×
                                            </IconButton>
                                        </Box>
                                    ))}
                            </Stack>
                        </Box>
                    )
                }

                <Divider />


                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: 2,
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }}
                    onScroll={handleScroll}>
                    <Stack spacing={1.2}>
                        {
                            paginatedEmployees?.map(emp => (
                                <EmployeeRow
                                    key={emp.em_id}
                                    emp={emp}
                                    selected={selectedEmployees.some(e => e.em_id === emp.em_id)}
                                    onSelect={handleSelect}
                                    chatType={chatType}
                                />
                            ))
                        }
                    </Stack>
                </Box>

                {/* FOOTER */}

                <Box
                    sx={{
                        p: 2,
                        borderTop: '1px solid',
                        borderColor: '#e5e7eb',
                        bgcolor: '#fafafa'
                    }}>

                    <Stack
                        direction="row"
                        spacing={1.5}>
                        <Button
                            variant="soft"
                            color="neutral"
                            fullWidth
                            onClick={() => setOpen(false)}
                            sx={{
                                borderRadius: 14
                            }}>
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleCreateChat}
                            disabled={selectedEmployees.length === 0}
                            sx={{
                                borderRadius: 14,
                                background: 'linear-gradient(135deg,#1976d2,#7b1fa2)',
                                color: "white"
                            }}>
                            {
                                chatType === 'group'
                                    ? 'Create Group'
                                    : 'Start Chat'
                            }

                        </Button>
                    </Stack>
                </Box>
            </Sheet>
        </Box>
    );
};

export default memo(CreateDiscussionButton);