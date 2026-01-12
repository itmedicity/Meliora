import React, { memo } from 'react'
import { Box, FormControl, Option, Select, } from '@mui/joy'
import { getAllDepartmentType } from '../Master/IncidentManagement/CommonCode/IncidentCommonCode';
import { useQuery } from '@tanstack/react-query';

const DepartmentTypeSelect = ({ value, setValue }) => {

    const {
        data: getalldepartmenttype,
    } = useQuery({
        queryKey: ['getdeptype'],
        queryFn: () => getAllDepartmentType(),
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
                        Select Department Type
                    </Option>
                    {/* {deptsectiondata &&
            deptsectiondata.map((val, index) => {
              return (
                <MenuItem key={index} value={val.sec_id}>
                  {val.sec_name}
                </MenuItem>
              )
            })} */}
                    {getalldepartmenttype?.map((val, i) => (
                        <Option
                            key={i}
                            value={val.inc_dep_type_slno}
                        >
                            {val.inc_dep_type_name}
                        </Option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(DepartmentTypeSelect)
