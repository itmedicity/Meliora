import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { axioslogin } from '../Axios/Axios';
import { useQuery } from 'react-query';
import { Autocomplete, Box, Chip } from '@mui/joy';

const TmMultEmpSelectUnderDeptSec = ({ value = [], setValue }) => {

    const sortEmployeesBySection = (employees = []) => {
        return [...employees].sort((a, b) => {
            if (a.sec_id === b.sec_id) {
                return a.em_name.localeCompare(b.em_name);
            }
            return a.sec_id - b.sec_id;
        });
    };


    const empDept = useSelector((state) => state.LoginUserData.empdept);
    const { data: getAllEmpUnderdept = [] } = useQuery(
        ['getAllEmployeesUnderDepartment', empDept],
        async () => {
            const result = await axioslogin.get(
                `/taskManagement/getAllEmpUnderdept/${empDept}`
            );
            return result.data?.data || [];
        },
        { enabled: !!empDept }
    );

    const sortedOptions = sortEmployeesBySection(getAllEmpUnderdept);


    let safeValue = [];
    if (Array.isArray(value)) {
        safeValue = value.map(Number);
    } else if (typeof value === "string" && value.trim() !== "") {
        try {
            safeValue = JSON.parse(value);
        } catch {
            safeValue = value.split(",").map((id) => Number(id.trim()));
        }
    }

    const selectedObjects = sortedOptions.filter((emp) =>
        safeValue.includes(Number(emp.em_id))
    );

    return (
        <Box>
            <Autocomplete
                multiple
                options={sortedOptions}


                value={selectedObjects}
                onChange={(event, newValue) => {
                    setValue(newValue.map((emp) => emp.em_id));
                }}
                getOptionLabel={(option) => option.em_name}
                isOptionEqualToValue={(option, val) => option.em_id === val.em_id}
                groupBy={(option) => option.sec_id?.toString() || '0'}
                placeholder="Select Employees"
                slotProps={{
                    input: {
                        placeholder: 'Search…',
                    },
                }}
                sx={{ minHeight: 55 }}
                renderTags={(selected, getTagProps) =>
                    selected.map((option, index) => (
                        <Chip
                            {...getTagProps({ index })}
                            key={option.em_id}
                            variant="soft"
                            color="primary"
                        >
                            {option.em_name}
                        </Chip>
                    ))
                }
                renderGroup={(params) => {
                    const sample = sortedOptions.find(
                        (emp) => emp.sec_id?.toString() === params.group
                    );
                    const sectionName = sample?.sec_name || 'OTHERS';
                    return (
                        <Box key={params.key}>
                            <Box
                                sx={{
                                    pl: 2.5,
                                    py: 0.5,
                                    color: '#3270adff',
                                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.8px',
                                }}
                            >
                                {sectionName}
                            </Box>
                            <Box sx={{ paddingLeft: 1 }}>{params.children}</Box>
                        </Box>
                    );
                }}
            />
        </Box>
    );
};

export default memo(TmMultEmpSelectUnderDeptSec);
