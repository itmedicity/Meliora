import React, { memo } from 'react'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function Test({ value, setValue }) {
    return (
        <Box sx={{}} >
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
                    <MenuItem value={0} disabled  >Select Nursing Station</MenuItem>
                    <MenuItem value={"NS0A"}  >4 th A side</MenuItem>
                    <MenuItem value={"NS0B"}  > 4 th B side</MenuItem>
                    <MenuItem value={"NS0C"}  >$ th C side</MenuItem>
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(Test)