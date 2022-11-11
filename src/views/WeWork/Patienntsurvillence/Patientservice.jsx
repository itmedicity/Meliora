
import { Box } from '@mui/material'
import React, { memo } from 'react'
import CusCheckBox from '../../Components/CusCheckBox'

const Patientservice = ({ service, setservice }) => {
    const { bedmake, gen, initial, visit } = service
    const updateService = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setservice({ ...service, [e.target.name]: value })
    }

    return (

        <Box sx={{
            display: "flex",
            flexDirection: "row",
            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }

        }}>
            <Box sx={{ width: "25%" }}>
                <CusCheckBox
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="bedmake"
                    label="Bed Making"
                    value={bedmake}
                    onCheked={updateService}
                    checked={bedmake}
                />
            </Box>

            <Box sx={{ width: "25%" }}>
                <CusCheckBox
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="gen"
                    label="General cleaning"
                    value={gen}
                    onCheked={updateService}
                    checked={gen}
                />
            </Box>
            <Box sx={{ width: "25%" }}>
                <CusCheckBox
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="initial"
                    label="Initial Diet Order"
                    value={initial}
                    onCheked={updateService}
                    checked={initial}
                />
            </Box>
            <Box sx={{ width: "25%" }}>
                <CusCheckBox
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="visit"
                    label="Executive visit"
                    value={visit}
                    onCheked={updateService}
                    checked={visit}
                />
            </Box>
        </Box>
    )
}

export default memo(Patientservice)