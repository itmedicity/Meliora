import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, Typography, } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import TextFieldCustom from '../Components/TextFieldCustom'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import CusCheckBox from '../Components/CusCheckBox'


const Dailyactivity = () => {
    const [daily, setdaily] = useState(0)
    const [time, settime] = useState(0)
    const [tea, settea] = useState(false)
    const [fast, setfast] = useState(false)
    const [brunch, setbrunch] = useState(false)
    const [lupper, setlupper] = useState(false)
    const [lunch, setlunch] = useState(false)
    const [dinner, setdinner] = useState(false)
    const [clean, setclean] = useState(false)
    const [sheet, setsheet] = useState(false)
    const [dietion, setdietion] = useState(false)
    const [bill, setbill] = useState(false)
    const [round, setround] = useState(false)

    const getdate = useCallback((e) => {
        setdaily(e.target.value)
    }, [])
    const getTime = useCallback((e) => {
        settime(e.target.value)
    }, [])
    const getTea = useCallback((e) => {
        if (e.target.checked === true) {
            settea(true)
        }
        else {
            settea(false)
        }
    }, [])
    const getbreak = useCallback((e) => {
        if (e.target.checked === true) {
            setfast(true)
        }
        else {
            setfast(false)
        }
    }, [])
    const getbrunch = useCallback((e) => {
        if (e.target.checked === true) {
            setbrunch(true)
        }
        else {
            setbrunch(false)
        }
    }, [])
    const getLupper = useCallback((e) => {
        if (e.target.checked === true) {
            setlupper(true)
        }
        else {
            setlupper(false)
        }
    }, [])
    const getLunch = useCallback((e) => {
        if (e.target.checked === true) {
            setlunch(true)
        }
        else {
            setlunch(false)
        }
    }, [])
    const getdinner = useCallback((e) => {
        if (e.target.checked === true) {
            setdinner(true)
        }
        else {
            setdinner(false)
        }
    }, [])
    const getCleaning = useCallback((e) => {
        if (e.target.checked === true) {
            setclean(true)
        }
        else {
            setclean(false)
        }
    }, [])
    const getSheet = useCallback((e) => {
        if (e.target.checked === true) {
            setsheet(true)
        }
        else {
            setsheet(false)
        }
    }, [])
    const getdietion = useCallback((e) => {
        if (e.target.checked === true) {
            setdietion(true)
        }
        else {
            setdietion(false)
        }
    }, [])
    const getbill = useCallback((e) => {
        if (e.target.checked === true) {
            setbill(true)
        }
        else {
            setbill(false)
        }
    }, [])
    const getRound = useCallback((e) => {
        if (e.target.checked === true) {
            setround(true)
        }
        else {
            setround(false)
        }
    }, [])


    return (
        <Paper square elevation={3} sx={{ dispaly: "flex", justifyContent: "column" }}>
            <Box sx={{ width: { xl: "20%", lg: "30%", md: "40%", sm: "50%" }, height: 40, pb: 2, p: 2 }}>
                <TextFieldCustom
                    size="sm"
                    type="date"
                    placeholder="date of discharge"
                    name="daily"
                    value={daily}
                    onchange={getdate}
                />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", p: 2 }}>
                <Box sx={{ width: { xl: "10%", lg: "15%", md: "15%", sm: "20%" } }}  >
                    <CssVarsProvider>
                        <Typography >
                            Room visit time</Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "80%" }}>
                    <Box sx={{ width: { xl: "20%", lg: "20%", md: "20%", sm: "20%" } }}>
                        <TextFieldCustom
                            size="sm"
                            type="time"
                            name="time"
                            value={time}
                            onchange={getTime}
                        />
                    </Box>
                </Box>
            </Box>

            <Paper square elevation={3} sx={{ p: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 1 }}>
                    <Box sx={{ width: { xl: "10%", lg: "15%", md: "15%", sm: "20%" } }}  >
                        <CssVarsProvider>
                            <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startdecorator={<ArrowRightOutlinedIcon />}>
                                Patient Diet</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>

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
                            name="tea"
                            label="Bed Tea"
                            value={tea}
                            onCheked={getTea}
                            checked={tea}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="fast"
                            label="Breakfast"
                            value={fast}
                            onCheked={getbreak}
                            checked={fast}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="brunch"
                            label="Brunch"
                            value={brunch}
                            onCheked={getbrunch}
                            checked={brunch}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="lunch"
                            label="Lunch"
                            value={lunch}
                            onCheked={getLunch}
                            checked={lunch}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="lupper"
                            label="Lupper"
                            value={lupper}
                            onCheked={getLupper}
                            checked={lupper}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="success"
                            size="md"
                            name="dinner"
                            label="Dinner"
                            value={dinner}
                            onCheked={getdinner}
                            checked={dinner}
                        />
                    </Box>

                </Box>
            </Paper>
            <Paper square elevation={3} sx={{
                display: "flex", flexDirection: "column", p: 2,
                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
            }}> <Box sx={{
                display: "flex",
                textTransform: 'capitalize',
                flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                justifyContent: "space-between",
                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }

            }}>
                    <Box sx={{ dispaly: "flex", flexDirection: "row", width: "100%" }}>
                        <Box sx={{ width: "25%" }}>
                            <CusCheckBox
                                variant="outlined"
                                color="success"
                                size="md"
                                name="clean"
                                label="Room cleaning"
                                value={clean}
                                onCheked={getCleaning}
                                checked={clean}
                            />
                        </Box>
                        <Box sx={{ width: "25%" }}>
                            <CusCheckBox
                                variant="outlined"
                                color="success"
                                size="md"
                                name="sheet"
                                label="Bed sheet change"
                                value={sheet}
                                onCheked={getSheet}
                                checked={sheet}
                            />
                        </Box>
                        <Box sx={{ width: "25%" }}>
                            <CusCheckBox
                                variant="outlined"
                                color="success"
                                size="md"
                                name="dietion"
                                label="Dietition round"
                                value={dietion}
                                onCheked={getdietion}
                                checked={dietion}
                            />
                        </Box>
                        <Box sx={{ width: "25%" }}>
                            <CusCheckBox
                                variant="outlined"
                                color="success"
                                size="md"
                                name="bill"
                                label="Bill Audit"
                                value={bill}
                                onCheked={getbill}
                                checked={bill}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ dispaly: "flex", justifyContent: "row" }}>
                        <Box sx={{ width: "25%" }}>
                            <CusCheckBox
                                variant="outlined"
                                color="success"
                                size="md"
                                name="round"
                                label="Doctors Round"
                                value={round}
                                onCheked={getRound}
                                checked={round}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', width: "40%", }}>
                            <TextFieldCustom
                                size="sm"
                                type="text"
                                placeholder={"importatnt notes"}
                            // name="cr"
                            // value={cr}
                            // onchange={getcredit}
                            />
                        </Box>
                    </Box>

                </Box>
            </Paper>


        </Paper>
    )
}

export default Dailyactivity