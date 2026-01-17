import { Box, Option, Select } from '@mui/joy'
import { FormControl } from '@mui/material'
import React, { memo, useMemo } from 'react'
import { useIncidentCommonApprovalLevelMaster } from '../IncidentManagement/CommonComponent/useQuery'
import { TransforIncidentLevels } from '../IncidentManagement/CommonComponent/CommonFun'


const IncidentLevelMasterSelect = ({ value, setValue, empdept, empsecid }) => {


    const { data: CommonIncidentLevels } = useIncidentCommonApprovalLevelMaster(empdept, empsecid);

    const incidentlevels = useMemo(() => {
        return TransforIncidentLevels(CommonIncidentLevels);
    }, [CommonIncidentLevels]);


    const levelsForIncident = incidentlevels.find(
        lvl => lvl.dep_id === empdept && lvl.sec_id === empsecid
    )?.levels || [];


    const ActiveLevels = (Array.isArray(levelsForIncident) && levelsForIncident?.length > 0) ?
        levelsForIncident
            ?.sort((a, b) => a.level_no - b.level_no)
            ?.filter(item => Number(item.level_status) === 1) :
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
                        Select Level
                    </Option>
                    {ActiveLevels &&
                        ActiveLevels?.map((val, index) => {
                            return (
                                <Option key={index} value={val.detail_slno}>
                                    {val.level_name}
                                </Option>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(IncidentLevelMasterSelect)
