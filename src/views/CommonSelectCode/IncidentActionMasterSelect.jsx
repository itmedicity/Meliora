import { Box, Option, Select } from '@mui/joy'
import { FormControl } from '@mui/material'
import React, { memo } from 'react'
import { useIncidentActionsMaster } from '../IncidentManagement/CommonComponent/useQuery'


const IncidentActionMasterSelect = ({ value, setValue }) => {

    // use query to fetch the incident category details;
    const { data: incidentaction } = useIncidentActionsMaster();
    const ActiveActionMaster = (Array.isArray(incidentaction) && incidentaction?.length > 0)
        ? incidentaction?.filter(item => Number(item?.inc_action_status) === 1) :
        [];

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
                    {ActiveActionMaster &&
                        ActiveActionMaster?.map((val, index) => {
                            return (
                                <Option key={index} value={val.inc_action_slno}>
                                    {val.inc_action_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(IncidentActionMasterSelect)
