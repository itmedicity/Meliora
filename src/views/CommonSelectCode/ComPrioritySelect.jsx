import React, { useEffect, memo, useState } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { axioslogin } from "src/views/Axios/Axios"

const ComPrioritySelect = ({ value, setValue, disabled }) => {

    const [pririty, setpriority] = useState([])
    useEffect(() => {
        const gerPriority = async () => {
            const result = await axioslogin.get('/compriority/select');
            const { success, data } = result.data
            if (success === 1) {
                setpriority(data)
            } else {
                setpriority([])
            }
        }
        gerPriority()
    }, [])

    return (
        <Box sx={{ mt: 1 }} >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled={disabled}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Priority</MenuItem>
                    {
                        pririty && pririty.map((val, index) => {
                            return <MenuItem key={index} value={val.cm_priority_slno}>{val.cm_priority_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(ComPrioritySelect)