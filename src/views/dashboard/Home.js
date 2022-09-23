import { MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

import SelectDiet from '../CommonSelectCode/SelectDiet'

const Home = () => {

    const [value, setValue] = useState(0)
    const [selectName, setSelectName] = useState("");
    const onChangeValue = (e, { props }) => {
        setSelectName(props.children)
        setValue(e.target.value)
    }
    return (
        <Box>
            <Box>Home Page</Box>
            <Box sx={{ width: 300, pt: 2 }} >{selectName}
                <SelectDiet value={value} setValue={setValue} />
            </Box>

            <Box sx={{ minWidth: 50, p: 2 }}>
                <Select
                    fullWidth
                    value={value}
                    onChange={onChangeValue}
                >
                    <MenuItem value={0}>Zero</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </Box>

        </Box>
    )
}

export default Home

