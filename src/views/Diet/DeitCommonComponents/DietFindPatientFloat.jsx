

import { Box, Input, IconButton } from '@mui/joy'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'


const DeitFindPatientFloat = ({ handleSearch, patientDietData, setPatientDietData, setIpNumber, ipNumber }) => {

    const handleChange = (e) => {
        const value = e.target.value
        setIpNumber(value)
    }


    return (
        <Box sx={{ flexGrow: 1, p: .5 }}>
            <Input
                placeholder="Enter IP Number"
                value={ipNumber}
                onChange={handleChange}
                sx={{ mb: 1, bgcolor: "#fff", borderRadius: 5 }}
                type="number"
                endDecorator={
                    <IconButton onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                }
            />
        </Box>
    )
}

export default DeitFindPatientFloat