import React from 'react'
import { useDietNames } from '../CommonData/UseQuery'
import { Box, Checkbox, Tooltip, Typography } from '@mui/joy'
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { DietNameTimes } from '../CommonData/Common';
import PersonIcon from '@mui/icons-material/Person';

const DIetNameProcessing = ({ selectedDiets, setSelectedDiets, selectedDietTimes }) => {
    const { data: DietName = [] } = useDietNames()

    const allDietNames = DietName?.map(d => d.diet_name)
    const isAllSelected =
        allDietNames.length > 0 &&
        selectedDiets.length === allDietNames.length

    const toggleDiet = dietName => {
        setSelectedDiets(prev =>
            prev.includes(dietName)
                ? prev.filter(d => d !== dietName)
                : [...prev, dietName]
        )
    }

    const toggleSelectAll = () => {
        setSelectedDiets(isAllSelected ? [] : allDietNames)
    }

    return (
        <>
            {/* SELECT ALL */}
            <Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                    gap: 1
                }}>
                    <MenuBookTwoToneIcon sx={{
                        color: '#7c51a1'
                    }} />
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 500,
                            color: 'var(--royal-purple-400)',
                            fontFamily: 'Bahnschrift',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        DIET TYPES
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex', alignItems: 'center', gap: 1, mb: 1,
                    boxShadow: 'md',
                    p: 1
                }}>
                    <Checkbox
                        variant="outlined"
                        size="sm"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        sx={{
                            '--Checkbox-radius': '4px',
                            '--Checkbox-gap': '6px',
                            '--Checkbox-size': '20px',
                            '--joy-palette-primary': '#7c51a1',
                            '& .MuiCheckbox-root': {
                                borderColor: '#7c51a1',
                            },
                            '& .Mui-checked': {
                                color: '#7c51a1',
                            }
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            color: 'black',
                            fontFamily: 'Bahnschrift',
                            whiteSpace: 'nowrap',

                        }}>SELECT ALL</Typography>
                </Box>

            </Box>

            {/* INDIVIDUAL DIETS */}
            {DietName?.map((val, index) => {

                const Match = DietNameTimes?.find(v => v?.name?.toUpperCase() === val.diet_name);
                const TotalType = Match?.times?.length;
                console.log({
                    selectedDietTimes
                });
                const Count = selectedDietTimes[val?.diet_name]?.length;
                return (
                    <Box key={index} sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: 'md',
                        p: 1
                        , justifyContent: 'space-between'
                    }}>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '70%' }}>
                            <Checkbox
                                variant="outlined"
                                size="sm"
                                checked={selectedDiets.includes(val.diet_name)}
                                onChange={() => toggleDiet(val.diet_name)}
                                sx={{
                                    '--Checkbox-radius': '4px',
                                    '--Checkbox-gap': '6px',
                                    '--Checkbox-size': '20px',
                                    '--joy-palette-primary': '#7c51a1',
                                    '& .MuiCheckbox-root': {
                                        borderColor: '#7c51a1',
                                    },
                                    '& .Mui-checked': {
                                        color: '#7c51a1',
                                    }
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: { xs: 10, sm: 10, md: 10, lg: 10, xl: 16 },
                                    fontWeight: 500,
                                    color: 'black',
                                    fontFamily: 'Bahnschrift',
                                    whiteSpace: 'nowrap'
                                }}>
                                {val.diet_name}
                            </Typography>


                        </Box>
                        <Box sx={{
                            width: '20%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: Number(Count) > 0 ? 'space-around' : 'center'
                        }}>
                            {
                                Number(Count) > 0 && <Typography
                                    sx={{
                                        fontSize: { xs: 8, sm: 8, md: 8, lg: 8, xl: 12 },
                                        fontWeight: 400,
                                        color: 'black',
                                        fontFamily: 'Bahnschrift',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'end'
                                    }}>
                                    <span style={{ color: 'red', fontSize: '18px' }}> • </span>{Count}
                                </Typography>
                            }

                            <Typography
                                sx={{
                                    fontSize: { xs: 8, sm: 8, md: 8, lg: 8, xl: 12 },
                                    fontWeight: 400,
                                    color: 'black',
                                    fontFamily: 'Bahnschrift',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'end'
                                }}>
                                <span style={{ color: 'green', fontSize: '18px' }}>  • </span>  {TotalType}
                            </Typography>

                        </Box>

                        <Box sx={{
                            width: '10%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end'
                        }}>
                            <Tooltip size='sm' title="Patient"
                                placement="top"
                                arrow>
                                <span>
                                    <PersonIcon sx={{ fontSize: 10 }} />
                                </span>
                            </Tooltip>


                            <Typography
                                sx={{
                                    fontSize: { xs: 8, sm: 8, md: 8, lg: 8, xl: 12 },
                                    fontWeight: 400,
                                    color: 'black',
                                    fontFamily: 'Bahnschrift',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'end'
                                }}>
                                88
                            </Typography>
                        </Box>
                    </Box>
                )
            })}

        </>
    )
}

export default DIetNameProcessing
