import React from 'react'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectBasic = () => {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                    size="small"
                    sx={{ height: 25, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem sx={{ height: 30 }} defaultValue >Ten</MenuItem>
                    <MenuItem value={10} sx={{ height: 30 }}>Ten</MenuItem>
                    <MenuItem value={20} sx={{ height: 30 }}>Twenty</MenuItem>
                    <MenuItem value={30} sx={{ height: 30 }}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectBasic