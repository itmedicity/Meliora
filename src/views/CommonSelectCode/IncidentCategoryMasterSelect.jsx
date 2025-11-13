import { Box, Option, Select } from '@mui/joy'
import { FormControl } from '@mui/material'
import React, { memo } from 'react'
import { getAllIncidentCategory } from '../Master/IncidentManagement/CommonCode/IncidentCommonCode'
import { useQuery } from '@tanstack/react-query'




const IncidentCategoryMasterSelect = ({ value, setValue }) => {

    // use query to fetch the incident category details;

    const {
        data: incidentcategory,
        // isLoading: isLoadingIncident,
        // error: categoryerr
    } = useQuery({
        queryKey: 'getincidentcategory',
        queryFn: () => getAllIncidentCategory(),
        staleTime: Infinity
    })



    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    id="demo-simple-select"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    size="small"
                    variant="outlined"
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}>
                    <Option value={0} disabled>
                        Select Category
                    </Option>
                    {incidentcategory &&
                        incidentcategory?.map((val, index) => {
                            return (
                                <Option key={index} value={val.inc_category_slno}>
                                    {val.inc_category_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(IncidentCategoryMasterSelect)
