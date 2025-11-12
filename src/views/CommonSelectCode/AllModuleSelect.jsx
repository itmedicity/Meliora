import React, { memo } from 'react'
import { Box, FormControl, Option, Select } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { getAllModuleList } from 'src/api/CommonApiCRF'

const AllModuleSelect = ({ value, setValue }) => {

    const {
        data: ModuleData,
        isLoading: isCompLoading,
        error: compError
    } = useQuery({
        queryKey: 'getModuleList',
        queryFn: () => getAllModuleList(),
        staleTime: Infinity
    })


    return (
        <Box>
            <FormControl size="small">
                <Select
                    id="demo-simple-select"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    size="sm"
                    variant="outlined"
                    sx={{ m: 0, }}
                >
                    <Option value={0} disabled>
                        Select Module
                    </Option>
                    {ModuleData &&
                        ModuleData.map((val, index) => {
                            return (
                                <Option key={index} value={val.module_slno}>
                                    {val.module_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>)
}

export default memo(AllModuleSelect)