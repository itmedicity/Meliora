import React, { memo } from 'react'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { getMelDepSecEmp } from 'src/api/CommonApi'


const MelEmpNameDeptSecSelect = ({ value, setValue, deptsec }) => {

    const {
        data: compData,
        isLoading: isCompLoading,
        error: compError
    } = useQuery({
        queryKey: ['getMelioradepsecEmp', deptsec],
        queryFn: () => getMelDepSecEmp(deptsec),
        staleTime: Infinity
    })
    if (isCompLoading) return <p>Loading...</p>
    if (compError) return <p>Error Occurred.</p>


    return (
        <Box sx={{}}>
            <FormControl fullWidth size="small">
                <Select
                    id="demo-simple-select"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    size="sm"
                    variant="outlined"
                    sx={{ m: 0, }}
                >
                    <Option value={0} disabled>
                        Select Employee
                    </Option>
                    {compData &&
                        compData.map((val, index) => {
                            return (
                                <Option key={index} value={val.em_id}>
                                    {val.em_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>)
}

export default memo(MelEmpNameDeptSecSelect)