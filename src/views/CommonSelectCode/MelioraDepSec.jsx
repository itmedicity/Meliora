import React, { memo, useMemo } from 'react'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'
import { getDepSecIDMaster } from 'src/api/CommonApi'
import { useQuery } from '@tanstack/react-query'



const MelioraDepSec = ({ value, setValue, dept }) => {
    const {
        data: compData,
        isLoading: isCompLoading,
        error: compError
    } = useQuery({
        queryKey: ['getMeldepSecID', dept],
        queryFn: () => getDepSecIDMaster(dept),
        staleTime: Infinity
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
                    sx={{ m: 0, }}
                >
                    <Option value={0} disabled>
                        Meliora Department Section
                    </Option>
                    {companyData &&
                        companyData.map((val, index) => {
                            return (
                                <Option key={index} value={val.mel_sec_id}>
                                    {val.mel_DeptName}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(MelioraDepSec) 