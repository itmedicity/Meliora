import React, { memo, } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const TarrifDropDown = ({ value, setValue }) => {

    const types = [
        { slno: 1, name: "Monthly" },
        { slno: 2, name: "Quarterly" },
        { slno: 3, name: "Yearly" }
    ]
    return (
        <Box  >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 22, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Tariff</MenuItem>
                    {
                        types && types.map((val, index) => {
                            return <MenuItem key={index} value={val.slno}>{val.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(TarrifDropDown)

