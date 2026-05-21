import React, { } from 'react'
import { useAllActivePatientDietPlan, useAllPatientDietMaster } from '../CommonData/UseQuery'
import { Box, Checkbox, Tooltip, Typography } from '@mui/joy'
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';

import PersonIcon from '@mui/icons-material/Person';

const DIetNameProcessing = ({
    selectedDiets,
    setSelectedDiets,
    selectedDietTimes,
    FormatedProcessedList,
    setSelectedDietTimes,
    patientsPerDiet,
    todate
}) => {



    const { data: DietName = [] } = useAllPatientDietMaster();
    const { data: ActivePatient = [] } = useAllActivePatientDietPlan(todate);

    const FinalDietNames = DietName?.filter((diet) =>
        ActivePatient?.some((patient) => patient.diet_id === diet.diet_id)
    );

   
    const allDietNames = FinalDietNames?.map(d => d.diet_id);

    const isAllSelected =
        allDietNames.length > 0 &&
        selectedDiets.length === allDietNames.length &&
        Object.values(selectedDietTimes).every(times => times.length > 0);


    const toggleDiet = (diet_id) => {
        const diet = FormatedProcessedList.find(d => d.diet_id === diet_id);
        if (!diet?.types?.length) return;

        setSelectedDietTimes(prevTimes => {
            const currentTimes = prevTimes[diet_id] || [];
            const updatedTimes = { ...prevTimes };

            if (currentTimes.length === diet.types.length) {
                // Uncheck diet -> remove all times
                delete updatedTimes[diet_id];
            } else {
                // Check diet -> select all times
                updatedTimes[diet_id] = diet.types.map(t => t.type_id);
            }

            // Update selectedDiets based on actual times
            const newSelectedDiets = Object.keys(updatedTimes).filter(d => updatedTimes[d]?.length > 0);
            setSelectedDiets(newSelectedDiets);

            return updatedTimes;
        });
    };


    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedDiets([]);
            setSelectedDietTimes({});
        } else {
            setSelectedDiets(allDietNames);

            // Immediately select all times for these diets
            const allTimes = {};
            allDietNames?.forEach(dietId => {
                const diet = FormatedProcessedList.find(d => d.diet_id === dietId);
                if (!diet?.types?.length) return;
                allTimes[dietId] = diet.types.map(t => t.type_id);
            });
            setSelectedDietTimes(allTimes);
        }
    };

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
                        onChange={toggleSelectAll}
                        checked={isAllSelected}
                        variant="outlined"
                        size="sm"
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
            {FinalDietNames?.map((val, index) => {

                const Match = FormatedProcessedList?.find(v => v?.diet_id === val?.diet_id);
                const TotalType = Match?.types?.length;
                const Count = selectedDietTimes[val?.diet_id]?.length;
                const TotalPatineCountPerDiet = patientsPerDiet[val?.diet_id]
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
                                checked={Number(selectedDietTimes[val.diet_id]?.length) > 0}
                                onChange={() => toggleDiet(val.diet_id)}
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
                                {TotalPatineCountPerDiet}
                            </Typography>
                        </Box>
                    </Box>
                )
            })}

        </>
    )
}

export default DIetNameProcessing
