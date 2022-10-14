import { Box, Paper } from '@mui/material'
import { React, memo } from 'react'
import CusCheckBox from '../Components/CusCheckBox';
import { useState } from 'react';
import { useCallback } from 'react';

const BasicRoomAmenties = () => {
    const [sofa, setsofa] = useState(false)
    const [chair, setchair] = useState(false)
    const [card, setcard] = useState(false)
    const [almirah, setalmirah] = useState(false)
    const [cup, setcup] = useState(false)
    const [arm, setarm] = useState(false)
    const [kit, setkit] = useState(false)
    const [bin, setbin] = useState(false)
    const [wood, setwood] = useState(false)
    const [tab, settab] = useState(false)
    const [mat, setmat] = useState(false)

    const getsofa = useCallback((e) => {
        if (e.target.checked === true) {
            setsofa(true)
        }
        else {
            setsofa(false)
        }
    }, [])
    const getchair = useCallback((e) => {
        if (e.target.checked === true) {
            setchair(true)
        }
        else {
            setchair(false)
        }
    }, [])
    const getcard = useCallback((e) => {
        if (e.target.checked === true) {
            setcard(true)
        }
        else {
            setcard(false)
        }
    }, [])
    const getalmirah = useCallback((e) => {
        if (e.target.checked === true) {
            setalmirah(true)
        }
        else {
            setalmirah(false)
        }
    }, [])
    const getcup = useCallback((e) => {
        if (e.target.checked === true) {
            setcup(true)
        }
        else {
            setcup(false)
        }
    }, [])
    const getArm = useCallback((e) => {
        if (e.target.checked === true) {
            setarm(true)
        }
        else {
            setarm(false)
        }
    }, [])
    const getKit = useCallback((e) => {
        if (e.target.checked === true) {
            setkit(true)
        }
        else {
            setkit(false)
        }
    }, [])
    const getbin = useCallback((e) => {
        if (e.target.checked === true) {
            setbin(true)
        }
        else {
            setbin(false)
        }
    }, [])
    const getWood = useCallback((e) => {
        if (e.target.checked === true) {
            setwood(true)
        }
        else {
            setwood(false)
        }
    }, [])
    const gettab = useCallback((e) => {
        if (e.target.checked === true) {
            settab(true)
        }
        else {
            settab(false)
        }
    }, [])
    const getmat = useCallback((e) => {
        if (e.target.checked === true) {
            setmat(true)
        }
        else {
            setmat(false)
        }
    }, [])
    return (
        <Paper square elevation={3} sx={{
            p: 2, display: "flex", flexDirection: "column",
            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
        }} >

            <Box sx={{
                display: "flex",
                textTransform: 'capitalize',
                flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                justifyContent: "space-between",
                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }

            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%"
                }}>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="sofa"
                            label="Sofa"
                            value={sofa}
                            onCheked={getsofa}
                            checked={sofa}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="chair"
                            label="Recycliner Chair"
                            value={chair}
                            onCheked={getchair}
                            checked={chair}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="card"
                            label="Cardiac Table"
                            value={card}
                            onCheked={getcard}
                            checked={card}
                        />
                    </Box>
                    <Box sx={{ width: "20%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="almirah"
                            label="Almirah"
                            value={almirah}
                            onCheked={getalmirah}
                            checked={almirah}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="cup"
                            label="Cup Board"
                            value={cup}
                            onCheked={getcup}
                            checked={cup}
                        />
                    </Box>
                    <Box sx={{ width: "25%", }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="arm"
                            label="Arm Chair"
                            value={arm}
                            onCheked={getArm}
                            checked={arm}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="kit"
                            label="Welcome Kit"
                            value={kit}
                            onCheked={getKit}
                            checked={kit}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="bin"
                            label="Waste bin"
                            value={bin}
                            onCheked={getbin}
                            checked={bin}
                        />
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="wood"
                            label="Executive wooden chair"
                            value={wood}
                            onCheked={getWood}
                            checked={wood}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="tab"
                            label="Table withount drawer"
                            value={tab}
                            onCheked={gettab}
                            checked={tab}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="mat"
                            label="Bystander Bed with Matteres"
                            value={mat}
                            onCheked={getmat}
                            checked={mat}
                        />
                    </Box>
                </Box>

            </Box>




        </Paper>
    )
}

export default memo(BasicRoomAmenties)