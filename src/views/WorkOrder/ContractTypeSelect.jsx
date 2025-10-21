import React, { memo, useMemo } from 'react'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'
import { getcontractItems } from 'src/api/CommonApi'
import { useQuery } from '@tanstack/react-query'

const ContractTypeSelect = ({ value, setValue }) => {

    const {
        data: compData,
        isLoading: isCompLoading,
        error: compError
    } = useQuery({
        queryKey: 'getcontractitems',
        queryFn: () => getcontractItems(),
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
                        Contract Type
                    </Option>
                    {companyData &&
                        companyData.map((val, index) => {
                            return (
                                <Option key={index} value={val.contract_id} sx={{}}>
                                    {val.contract_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(ContractTypeSelect)