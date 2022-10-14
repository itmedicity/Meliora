
import { Box } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import CusCheckBox from '../Components/CusCheckBox'

const Patientservice = () => {
    const [bedmake, setbedmake] = useState(false)
    const [gen, setgen] = useState(false)
    const [initial, setinitial] = useState(false)
    const [visit, setvist] = useState(false)


    const getbedmaking = useCallback((e) => {
        if (e.target.checked === true) {
            setbedmake(true)
        }
        else {
            setbedmake(false)
        }
    }, [])
    const getgeneral = useCallback((e) => {
        if (e.target.checked === true) {
            setgen(true)
        }
        else {
            setgen(false)
        }
    }, [])
    const getinitail = useCallback((e) => {
        if (e.target.checked === true) {
            setinitial(true)
        }
        else {
            setinitial(false)
        }
    }, [])
    const getvisit = useCallback((e) => {
        if (e.target.checked === true) {
            setvist(true)
        }
        else {
            setvist(false)
        }
    }, [])


    return (


        <Box sx={{
            display: "flex",
            flexDirection: "row",
            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }

        }}>
            <Box sx={{ width: "25%" }}>
                <CusCheckBox
                    variant="outlined"
                    color="success"
                    size="md"
                    name="bedmake"
                    label="Bed Making"
                    value={bedmake}
                    onCheked={getbedmaking}
                    checked={bedmake}
                />
            </Box>

            <Box sx={{ width: "25%" }}>
                <CusCheckBox
                    variant="outlined"
                    color="success"
                    size="md"
                    name="gen"
                    label="General cleaning"
                    value={gen}
                    onCheked={getgeneral}
                    checked={gen}
                />
            </Box>
            <Box sx={{ width: "25%" }}>
                <CusCheckBox
                    variant="outlined"
                    color="success"
                    size="md"
                    name="initial"
                    label="General cleaning"
                    value={initial}
                    onCheked={getinitail}
                    checked={initial}
                />
            </Box>
            <Box sx={{ width: "25%" }}>
                <CusCheckBox
                    variant="outlined"
                    color="success"
                    size="md"
                    name="visit"
                    label="Executive visit"
                    value={visit}
                    onCheked={getvisit}
                    checked={visit}
                />
            </Box>

        </Box>

        // </Paper >
    )
}

export default Patientservice