
import { Box } from '@mui/material';
import { React, memo } from 'react'
import CusCheckBox from '../../Components/CusCheckBox';


const BasicRoomAmenties = ({ ameties, setamenties }) => {
    const { sofaa, chair, card, almirah, cup, arm, kit, bin, wood, tab, mat } = ameties

    const updateValue = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setamenties({ ...ameties, [e.target.name]: value })
    }
    return (
        <Box sx={{
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
                            color="primary"
                            size="md"
                            name="sofaa"
                            label="Sofa"
                            value={sofaa}
                            onCheked={updateValue}
                            checked={sofaa}


                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="chair"
                            label="Recycliner Chair"
                            value={chair}
                            onCheked={updateValue}
                            checked={chair}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="card"
                            label="Cardiac Table"
                            value={card}
                            onCheked={updateValue}
                            checked={card}
                        />
                    </Box>
                    <Box sx={{ width: "20%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="almirah"
                            label="Almirah"
                            value={almirah}
                            onCheked={updateValue}
                            checked={almirah}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="cup"
                            label="Cup Board"
                            value={cup}
                            onCheked={updateValue}
                            checked={cup}
                        />
                    </Box>
                    <Box sx={{ width: "25%", }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="arm"
                            label="Arm Chair"
                            value={arm}
                            onCheked={updateValue}
                            checked={arm}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="kit"
                            label="Welcome Kit"
                            value={kit}
                            onCheked={updateValue}
                            checked={kit}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="bin"
                            label="Waste bin"
                            value={bin}
                            onCheked={updateValue}
                            checked={bin}
                        />
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="wood"
                            label="Executive wooden chair"
                            value={wood}
                            onCheked={updateValue}
                            checked={wood}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="tab"
                            label="Table withount drawer"
                            value={tab}
                            onCheked={updateValue}
                            checked={tab}
                        />
                    </Box>
                    <Box sx={{ width: "25%" }}>
                        <CusCheckBox
                            variant="outlined"
                            color="primary"
                            size="md"
                            name="mat"
                            label="Bystander Bed with Matteres"
                            value={mat}
                            onCheked={updateValue}
                            checked={mat}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(BasicRoomAmenties)