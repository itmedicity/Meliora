import React, { useEffect, memo, useState } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { axioslogin } from '../Axios/Axios';

const CrmEmergencySelect = ({ value, setValue }) => {
    const [crmEmerList, setCrmEmrList] = useState([])

    useEffect(() => {
        const getCrmEmergncyLIst = async () => {
            const result = await axioslogin.get('/crmEmergncyType/CrmEmerListSelect');
            const { success, data } = result.data
            if (success === 2) {
                setCrmEmrList(data)
            }
            else {
                setCrmEmrList([])
            }
        }
        getCrmEmergncyLIst()
    }, [])

    return (
        <Box >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled >Select Emergency Type</MenuItem>
                    {
                        crmEmerList && crmEmerList.map((val, index) => {
                            return <MenuItem key={index} value={val.emergency_slno}>{val.emer_type_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(CrmEmergencySelect)