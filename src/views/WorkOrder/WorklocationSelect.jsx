import React, { memo, useMemo } from 'react'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'
import { getlocationItems } from 'src/api/CommonApi'
import { useQuery } from '@tanstack/react-query'

const WorklocationSelect = ({ value, setValue }) => {
    const {
        data: compData,
        isLoading: isCompLoading,
        error: compError
    } = useQuery({
        queryKey: 'getlocationItems',
        queryFn: () => getlocationItems(),
        // staleTime: Infinity
    })
    const companyData = useMemo(() => compData, [compData])

    if (isCompLoading) return <p>Loading...</p>
    if (compError) return <p>Error Occurred.</p>

    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    id="demo-simple-select"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    size="sm"
                    variant="outlined"
                    sx={{ m: 0, color: '#9c9fa3' }}
                >
                    <Option value={0} disabled sx={{ color: 'lightgray' }}>
                        Work Location
                    </Option>
                    {companyData &&
                        companyData.map((val, index) => {
                            return (
                                <Option key={index} value={val.work_location_Id} sx={{}}>
                                    {val.work_location_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>)
}

export default memo(WorklocationSelect)