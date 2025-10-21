import React, { memo, useMemo } from 'react'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'
import { getDepartmentMaster } from 'src/api/CommonApi'
import { useQuery } from '@tanstack/react-query'

const MelioraDepartmentSelect = ({ value, setValue }) => {


    const {
        data: compData,
        // isLoading: isCompLoading,
        // error: compError
    } = useQuery({
        queryKey: ['getMelioradepartment'],
        queryFn: () => getDepartmentMaster(),
        // staleTime: Infinity
    })
    const companyData = useMemo(() => compData, [compData])

    // if (isCompLoading) return <p>Loading...</p>
    // if (compError) return <p>Error Occurred.</p>
    return (
        <Box>
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
                        Meliora Department
                    </Option>
                    {companyData &&
                        companyData.map((val, index) => {
                            return (
                                <Option key={index} value={val.mel_DepId}>
                                    {val.mel_DeptName}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(MelioraDepartmentSelect)