import { Box, Option, Select, selectClasses } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { axioslogin } from '../Axios/Axios';

const ComplaintDepartmentWithAll = ({ ticketDept, setTicketDept }) => {

    const [custodianDepartmentList, setCustodianDepartmentList] = useState([])

    const { data: custodianArray = [] } = useQuery(
        ['getCustodianDept'],
        async () => {
            const result = await axioslogin.get('/complaintdept/status');
            return result.data?.data || [];
        },

    );

    useEffect(() => {
        setCustodianDepartmentList(custodianArray);
    }, [custodianArray]);

    return (
        <Box sx={{ mr: .5 }}>
            <Select
                value={ticketDept ?? 0}
                onChange={(e, value) => setTicketDept(value)}
                placeholder="Select a department…"
                indicator={<KeyboardArrowDown />}
                sx={{
                    width: 280,
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                }}
            >
                <Option value={0}>All</Option>
                {custodianDepartmentList.map((dept) => (
                    <Option key={dept.complaint_dept_slno} value={dept.complaint_dept_slno}>
                        {dept.complaint_dept_name}
                    </Option>
                ))}
            </Select>
        </Box>
    )
}

export default memo(ComplaintDepartmentWithAll)




