import { addDays } from 'date-fns';
import { Box, Typography } from '@mui/joy';
import DietButton from '../DietComponent/DietButton';
import DietTypeTimeSelect from './DietTypeTimeSelect';
import DIetNameProcessing from './DIetNameProcessing';
import React, { useState, Suspense, lazy, useEffect, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Person4TwoToneIcon from '@mui/icons-material/Person4TwoTone';
import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone';
import CustomeIncidentLoading from 'src/views/IncidentManagement/Components/CustomeIncidentLoading';
import SmartRealtimeCounter from '../DietComponent/SmartRealtimeCounter';
import '../../Master/DietMasters/DietStyle/DietStyle.css';
const DatePickerComponent = lazy(() => import('../DietComponent/DatePickerComponent'));

const DietWiseProcessing = ({
    selectedDiets,
    setSelectedDiets,
    handleProcessing,
    setSelectedDietTimes,
    selectedDietTimes,
    handleNewPatientOrder,
    newpatientcount,
    isAllSelected,
    allDietNames
}) => {


    const [todate, setToDate] = useState(new Date());
    const [blink, setBlink] = useState(false); // default color
    const prevPatientCount = useRef(newpatientcount);


    // work for new Diet patient
    useEffect(() => {
        if (newpatientcount !== prevPatientCount.current) {
            setBlink(true); // trigger blink
            const timeout = setTimeout(() => setBlink(false), 500); // blink duration
            prevPatientCount.current = newpatientcount;
            return () => clearTimeout(timeout);
        }
    }, [newpatientcount]);


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pb: 0.5,
                        borderBottom: '4px solid #7c51a1',
                        m: 1,
                        borderRadius: 10
                    }}>
                        <Suspense fallback={<CustomeIncidentLoading text="Loading Component" />}>
                            <DatePickerComponent
                                label="Processing Data"
                                value={todate}
                                setValue={setToDate}
                                minDate={todate}
                                maxDate={addDays(todate, 1)}
                            />
                        </Suspense>
                    </Box>

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        gap: 1
                    }}>
                        <Box onClick={handleNewPatientOrder} sx={{
                            m: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            borderBottom: '4px solid #7c51a1',
                            borderRadius: 10,
                            cursor: 'pointer',
                            animation: blink ? 'blink-animation 0.5s ease-in-out' : 'none'
                        }}>
                            <Box

                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',


                                }}>
                                <Person4TwoToneIcon sx={{
                                    color: '#7c51a1'
                                }} />
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 500,
                                        color: 'var(--royal-purple-400)',
                                        fontFamily: 'Bahnschrift',
                                        whiteSpace: 'nowrap'
                                    }}>
                                    New Orders
                                </Typography>
                            </Box>

                            <SmartRealtimeCounter value={Number(newpatientcount) || 0} />
                        </Box>

                        <Box sx={{
                            m: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            borderBottom: '4px solid #7c51a1',
                            borderRadius: 10
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <Person4TwoToneIcon sx={{
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
                                    Total Patient
                                </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: 28,
                                    fontWeight: 500,
                                    color: 'black',
                                    fontFamily: 'Bahnschrift',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center'
                                }}
                            >
                                125
                            </Typography>
                        </Box>

                    </Box>

                </Box>

                <Box
                    sx={{
                        width: '100%',
                        minHeight: 400,
                        display: 'flex',
                        p: 2,
                        gap: 1
                    }}>
                    <Box sx={{ width: '40%', height: 400, border: '1px solid #e9e5e576', p: 1, borderRadius: 5 }}>
                        <DIetNameProcessing
                            selectedDiets={selectedDiets}
                            setSelectedDiets={setSelectedDiets}
                            isAllSelected={isAllSelected}
                            allDietNames={allDietNames}
                            selectedDietTimes={selectedDietTimes}
                        />
                    </Box>

                    <Box sx={{ width: '60%', minHeight: 400, p: 1, border: '1px solid #e9e5e576', borderRadius: 5 }}>
                        <DietTypeTimeSelect
                            selectedDiets={selectedDiets}
                            selectedDietTimes={selectedDietTimes}
                            setSelectedDietTimes={setSelectedDietTimes}
                            isAllSelected={isAllSelected}

                        />
                    </Box>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DietButton width={'60%'} onClick={handleProcessing} icon={BookmarkAddedTwoToneIcon} name='Process Diet List' />
                </Box>
            </Box>
        </LocalizationProvider>
    )
}

export default DietWiseProcessing
