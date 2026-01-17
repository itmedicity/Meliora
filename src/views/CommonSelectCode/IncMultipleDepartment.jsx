import React, { memo } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { useQuery } from '@tanstack/react-query'
import { getAllActiveDepartments } from '../Master/IncidentManagement/CommonCode/IncidentCommonCode'

const IncMultipleDepartment = ({ department, setDepartment }) => {

    const handleChange = (event, value) => {
        setDepartment(value)
    }

    // fetch fishbone analysis detail
    const { data: getallactivedepartmens } = useQuery({
        queryKey: ['getallactivedep'],
        queryFn: () => getAllActiveDepartments(),
    });

    return (
        <Autocomplete
            multiple
            sx={{
                width: '100%',
                minHeight: 40,
                bgcolor: 'transparent',
                '--Input-radius': '0px',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderBottom: '2px solid',
                borderColor: 'neutral.outlinedBorder',
                '&:hover': {
                    borderColor: 'neutral.outlinedHoverBorder'
                },
                '&::before': {
                    border: '1px solid var(--Input-focusedHighlight)',
                    transform: 'scaleX(0)',
                    left: 0,
                    right: 0,
                    bottom: '-2px',
                    top: 'unset',
                    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                    borderRadius: 0
                },
                '&:focus-within::before': {
                    transform: 'scaleX(1)'
                }
            }}
            value={department || []}
            placeholder="Select Departments"
            isOptionEqualToValue={(option, value) => option.dept_name === value.dept_name}
            getOptionLabel={(option) => option?.dept_name || ''}
            options={getallactivedepartmens ?? []}
            onChange={handleChange}
        />

    )
}

export default memo(IncMultipleDepartment)
