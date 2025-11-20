import { Box, Input, Typography } from '@mui/joy'
import React, { memo } from 'react'
import AllEmpSelect from 'src/views/CommonSelectCode/AllEmpSelect'

const AddDetails = ({ Empid, setEmpId, levels, setLevels }) => {

    // Handle field change for each level
    const handleLevelChange = (index, field, value) => {
        const updated = [...levels]
        updated[index][field] = value
        setLevels(updated)
    }
    return (

        <Box sx={{ mt: 1, width: '50%' }}>
            {levels.map((lvl, index) => (
                <Box
                    key={lvl.id}
                    sx={{
                        // border: '1px solid #ccc',
                        borderRadius: 8,
                        // p: 2,
                        mb: 1.5,
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center'
                    }}
                >
                    <Typography level="title-sm" sx={{ width: 80 }}>
                        Level {lvl.id}
                    </Typography>
                    <Box sx={{ width: '50%' }}>
                        <Input
                            placeholder=""
                            value={lvl.name}
                            onChange={(e) => handleLevelChange(index, 'name', e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <AllEmpSelect value={Empid} setValue={setEmpId} />
                    </Box>

                </Box>
            ))}
        </Box >

    )
}

export default memo(AddDetails)