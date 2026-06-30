import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import {
    Box,
    Button,
    Drawer,
    Input,
    Sheet,
    Stack,
    IconButton
} from '@mui/joy';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import IncidentTextComponent from '../../Components/IncidentTextComponent';
import EmployeeRow from './EmployeeRow';


const AddMemberDrawer = ({
    open,
    onClose,
    employees = [],
    members = [],
    onAddMember
}) => {

    const [query, setQuery] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('');

    

    const PAGE_SIZE = 50;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const availableEmployees = useMemo(() => {
        return employees?.filter(emp =>
            !members?.some(
                member =>
                    Number(member.emp_id) === Number(emp.em_id)
            )
        );

    }, [employees, members]);

    const filteredEmployees = useMemo(() => {
        return availableEmployees?.filter(emp =>
            emp?.em_name
                ?.toLowerCase()
                ?.includes(debouncedSearch?.toLowerCase()) ||
            emp?.dept_name
                ?.toLowerCase()
                ?.includes(debouncedSearch?.toLowerCase()) ||
            emp?.desg_name
                ?.toLowerCase()
                ?.includes(debouncedSearch?.toLowerCase())
        );

    }, [availableEmployees, debouncedSearch]);

    const handleAdd = () => {

        if (!selectedEmployee) return;

        onAddMember(selectedEmployee);

        setSelectedEmployee([]);
        setQuery('');
        onClose();
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

    const handleSelect = useCallback((emp) => {
        const exists = selectedEmployee?.find(
            item => item?.em_id === emp?.em_id
        );

        if (exists) {
            setSelectedEmployee(prev =>
                prev.filter(item => item?.em_id !== emp?.em_id)
            );
        } else {
            setSelectedEmployee(prev => [...prev, emp]);
        }
    }, [members, selectedEmployee])

    return (

        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '--Drawer-horizontalSize': '420px'
            }}
        >

            <Sheet
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#f8fafc'
                }}
            >

                {/* HEADER */}

                <Box
                    sx={{
                        p: 3,
                        background:
                            'linear-gradient(135deg,#2563eb,#4f46e5)',
                        color: '#fff',
                        position: 'relative'
                    }}
                >

                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            color: '#fff',
                            bgcolor: 'rgba(255,255,255,.15)'
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>

                    <IncidentTextComponent
                        text="Add Group Member"
                        color="#fff"
                        size={18}
                        weight={800}
                    />

                    <IncidentTextComponent
                        text="Select an employee to add"
                        color="#dbeafe"
                        size={11}
                        weight={600}
                    />

                </Box>

                {/* SEARCH */}

                <Box sx={{ p: 2 }}>

                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        startDecorator={<SearchRoundedIcon />}
                        placeholder="Search employee..."
                        sx={{
                            borderRadius: 30
                        }}
                    />

                </Box>

                {/* EMPLOYEE LIST */}

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
                    onScroll={handleScroll}
                >

                    <Stack spacing={1.2}>

                        {paginatedEmployees?.map((emp) => {
                            const selected = selectedEmployee.some(e => e.em_id === emp.em_id)

                            return (
                                <EmployeeRow
                                    key={emp.em_id}
                                    selected={selected}
                                    onSelect={handleSelect}
                                    emp={emp} />
                            );
                        })}
                    </Stack>
                </Box>

                {/* FOOTER */}

                <Box
                    sx={{
                        p: 2,
                        borderTop: '1px solid #e5e7eb'
                    }}
                >

                    <Button
                        fullWidth
                        size="lg"
                        disabled={!selectedEmployee}
                        onClick={handleAdd}
                    >
                        Add Member
                    </Button>

                </Box>

            </Sheet>

        </Drawer>
    );
};

export default memo(AddMemberDrawer);