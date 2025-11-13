import React, { memo } from 'react'
import { Box, FormControl, Option, Select, } from '@mui/joy'
import { useQuery } from '@tanstack/react-query';
import { getAllCommonSetting } from '../Master/IncidentManagement/CommonCode/IncidentCommonCode';

const CommonSettingSelect = ({ value, setValue }) => {

    const {
        data: getallCommonsettings,
    } = useQuery({
        queryKey: ['getallcs'],
        queryFn: () => getAllCommonSetting(),
        staleTime: Infinity
    });

    return (
        <Box>
            <FormControl size="small">
                <Select

                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }} size="md"
                    variant="outlined"
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
                >
                    <Option value={0} disabled>
                        Select Common Setting
                    </Option>
                    {/* {deptsectiondata &&
            deptsectiondata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.sec_id}>
                  {val.sec_name}
                </MenuItem>
              )
            })} */}
                    {getallCommonsettings?.map((val, i) => (
                        <Option
                            key={i}
                            value={val?.inc_cs_slno}
                        >
                            {val?.inc_setting_key}
                        </Option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(CommonSettingSelect)
