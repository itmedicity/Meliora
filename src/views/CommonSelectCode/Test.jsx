import React, { memo } from 'react'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function Test() {
    return (
        <Box sx={{ mt: 1 }} >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={value}
                    // onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select</MenuItem>
                    <MenuItem value={1}  >One</MenuItem>
                    <MenuItem value={2}  >Two</MenuItem>
                    <MenuItem value={3}  >three</MenuItem>
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(Test)