import { addDays } from 'date-fns';
import { Box, Typography } from '@mui/joy';
import DietButton from '../DietComponent/DietButton';
import DietTypeTimeSelect from './DietTypeTimeSelect';
import DIetNameProcessing from './DIetNameProcessing';
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Person4TwoToneIcon from '@mui/icons-material/Person4TwoTone';
import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone';
import CustomeIncidentLoading from 'src/views/IncidentManagement/Components/CustomeIncidentLoading';
import SmartRealtimeCounter from '../DietComponent/SmartRealtimeCounter';
import '../../Master/DietMasters/DietStyle/DietStyle.css';
import { getSafeFormattedDate, groupByDiet, summarizePatients } from '../CommonData/CommonFun';
import { useAllActivePatientTypeDetail, useAllDietProcessList, useFetchAllScheduledDiet } from '../CommonData/UseQuery';
import { socket } from 'src/ws/socket'
import { succesNotify } from 'src/views/Common/CommonCode';

const DatePickerComponent = lazy(() => import('../DietComponent/DatePickerComponent'));

const DietWiseProcessing = ({
    selectedDiets,
    setSelectedDiets,
    handleProcessing,
    setSelectedDietTimes,
    selectedDietTimes,
    handleNewPatientOrder,
    isAllSelected,
    setToDate,
    todate
}) => {


    // const [todate, setToDate] = useState(new Date());
    const [blink, setBlink] = useState(false); // default color

    const formattedDate = getSafeFormattedDate(todate, 'dd-MM-yyyy');

    const apiDate = getSafeFormattedDate(todate, "yyyy-MM-dd");

    const {
        data: ActivePatientTypeDetail = [],
        isLoading: isLoadingPatientType,
        isError: isErrorPatientType,
        error: errorPatientType,
    } = useAllActivePatientTypeDetail(todate);



    const {
        data: ScheduledPatientDiet = [],
        isLoading: isLoadingScheduledPlan,
        isError: isErrorScheduledPatientPlan,
        error: errorScheduledPatientPlan,
        refetch: FetchScheduledDietPlan
    } = useFetchAllScheduledDiet(apiDate);

    const { data: ProcessedList = [] } = useAllDietProcessList(formattedDate);

    const FormatedProcessedList = groupByDiet(ProcessedList);

    const {
        totalPatients,
        patientsPerDiet,
        newPatientCount,
        // newPatients
    } = summarizePatients(
        ActivePatientTypeDetail, ScheduledPatientDiet
    );

    const today = new Date();

    useEffect(() => {
        socket.on("newDietPlanCreated", (data) => {
            console.log("New Diet Plan:", data);
            succesNotify("New Diet Plan Added")
            //  trigger blink ONLY on realtime event
            setBlink(true);
            //  refetch latest data
            FetchScheduledDietPlan();
            //  stop blink after animation
            setTimeout(() => {
                setBlink(false);
            }, 800);
        });

        return () => socket.off("newDietPlanCreated");
    }, []);


    const isLoadingAll =
        isLoadingScheduledPlan ||
        isLoadingPatientType;

    const isErrorAll =
        isErrorScheduledPatientPlan ||
        isErrorPatientType;

    const errorMessage =
        errorScheduledPatientPlan ||
        errorPatientType?.message;

    if (isLoadingAll) {
        return <div>Loading...</div>;
    }

    if (isErrorAll) {
        return <div>Error: {errorMessage}</div>;
    }


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
                                label="Processing Date"
                                value={todate}
                                setValue={setToDate}
                                minDate={today}
                                maxDate={addDays(today, 1)}
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
                                    New Patient
                                </Typography>
                            </Box>

                            <SmartRealtimeCounter value={Number(newPatientCount) || 0} />
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
                                {totalPatients ?? 0}
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
                            todate={todate}
                            selectedDietTimes={selectedDietTimes}
                            FormatedProcessedList={FormatedProcessedList}
                            setSelectedDietTimes={setSelectedDietTimes}
                            patientsPerDiet={patientsPerDiet}
                        />
                    </Box>

                    <Box sx={{ width: '60%', minHeight: 400, p: 1, border: '1px solid #e9e5e576', borderRadius: 5 }}>
                        <DietTypeTimeSelect
                            selectedDiets={selectedDiets}
                            selectedDietTimes={selectedDietTimes}
                            setSelectedDietTimes={setSelectedDietTimes}
                            isAllSelected={isAllSelected}
                            setSelectedDiets={setSelectedDiets}
                            FormatedProcessedList={FormatedProcessedList}
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
