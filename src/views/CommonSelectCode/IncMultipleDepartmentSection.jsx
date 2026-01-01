import React, { memo } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { useQuery } from '@tanstack/react-query'
import { getDepartmentSection } from '../Master/IncidentManagement/CommonCode/IncidentCommonCode'

const IncMultipleDepartmentSection = ({ departmentsec, setDepartmentSec }) => {

    const handleChange = (event, value) => {
        setDepartmentSec(value)
    }

    // fetch Active Department Secitons
    const { data: getallactivedepSeciton } = useQuery({
        queryKey: ['getallactivedepsec'],
        queryFn: () => getDepartmentSection(),
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
            value={departmentsec || []}
            placeholder="Select Departments"
            isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
            getOptionLabel={(option) => option?.sec_name || ''}
            options={getallactivedepSeciton ?? []}
            onChange={handleChange}
        />

    )
}

export default memo(IncMultipleDepartmentSection)
