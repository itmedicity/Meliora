import React, { memo, } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ProviderDropDown = ({ value, setValue }) => {

    const types = [{ slno: 1, name: "Vodafone Idea" }, { slno: 2, name: "Airtel" }, { slno: 3, name: "Jio" },
    { slno: 4, name: "Bsnl" }, { slno: 5, name: "Reliance Communications" }, { slno: 6, name: "Aircel" },
    { slno: 7, name: "Tata Docomo" }, { slno: 8, name: "BSNL Mobile" }, { slno: 9, name: "MNTL" },
    { slno: 10, name: "Tata Teleservices" }, { slno: 11, name: "Telenor India" }, { slno: 12, name: "MTS India" },
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
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200, }}
                >
                    <MenuItem value={0} disabled  >Sim operator</MenuItem>
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
export default memo(ProviderDropDown)