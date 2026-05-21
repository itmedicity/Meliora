import { Box, } from '@mui/joy';
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DietMasterHeader from 'src/views/Master/DietMasters/DietComponent/DietMasterHeader'
import DietWiseProcessing from './DietWiseProcessing';
import ProcessCompletedList from './ProcessCompletedList';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import {
    useAllActivePatientTypeDetail,
    useAllDietProcessList,
    useAllPatientDietMaster,
    useFetchAllScheduledDiet,
} from '../CommonData/UseQuery';
import {
    getDietProductionItems,
    filterUnprocessedItemsByType,
    getSafeFormattedDate,
    groupByDiet,
    groupByPlanId
} from '../CommonData/CommonFun';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import PatientSelectionDrawer from './PatientSelectionDrawer';


const ProcessList = () => {

    const navigate = useNavigate();
    const id = useSelector(state => { return state.LoginUserData.empid })
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedPlans, setSelectedPlans] = useState([]);

    const [todate, setToDate] = useState(new Date());
    const [selectedDiets, setSelectedDiets] = useState([]);
    // const [processing, setProcessing] = useState(false);
    const [selectedDietTimes, setSelectedDietTimes] = useState({});

    const formattedDate = getSafeFormattedDate(todate, 'dd-MM-yyyy');

    const mysqlInsertDate = getSafeFormattedDate(todate, 'yyyy-MM-dd HH:mm:ss');
    const apiDate = getSafeFormattedDate(todate, "yyyy-MM-dd");

    const {
        data: FormatedProcessedList = [],
        isLoading: isLoadingProcess,
        isError: isErrorProcess,
        error: errorProcess
    } = useAllDietProcessList(formattedDate);


    const {
        data: FinalDietNames = [],
        isLoading: isLoadingDiet,
        isError: isErrorDiet,
        error: errorDiet
    } = useAllPatientDietMaster();


    const {
        data: ActivePatientTypeDetail = [],
        isLoading: isLoadingPatientType,
        isError: isErrorPatientType,
        error: errorPatientType,
        refetch: FetchActivePatients
    } = useAllActivePatientTypeDetail(todate);



    const {
        data: ScheduledPatientDiet = [],
        isLoading: isLoadingScheduledPlan,
        isError: isErrorScheduledPatientPlan,
        error: errorScheduledPatientPlan,
        refetch: FetchScheduledDietPlan
    } = useFetchAllScheduledDiet(apiDate);


    // const {
    //     data: BatchDetail = [],
    //     isLoading: isLoadingBatch,
    //     isError: isErrorBatch,
    //     error: errorBatch,
    //     // refetch: FetchAllBatchDetail
    // } = useAllProductionBatchDetail(todate);


    const DietName = FinalDietNames?.filter((diet) => ScheduledPatientDiet?.some((patient) => patient.diet_id === diet.diet_id));




    const itemDetail = getDietProductionItems(ActivePatientTypeDetail, selectedDiets);

    const ProcessedList = useMemo(() => groupByDiet(FormatedProcessedList), [FormatedProcessedList]);


    const allDietNames = DietName?.map(d => d.diet_name);

    const isAllSelected = allDietNames.length > 0 && selectedDiets.length === allDietNames.length;

    // const processedMap = getProcessedPlanIdsByType(BatchDetail);

    const filteredItemDetail = useMemo(() => {
        return filterUnprocessedItemsByType(
            itemDetail,
            ScheduledPatientDiet,
            selectedDietTimes
        );
    }, [itemDetail, selectedDietTimes]);


    const groupedPlans = useMemo(() => {
        return groupByPlanId(filteredItemDetail);
    }, [filteredItemDetail]);


    const FinalFilterdItemDetail =
        selectedPlans?.length === 0
            ? filteredItemDetail
            : filteredItemDetail.filter(item =>
                selectedPlans.includes(item.plan_id)
            );



    // Function to GoBack
    const hanldeGoBack = useCallback(() => {
        navigate('/Home/InpatientList')
    }, [navigate]);

    // example: '2026-03-24'
    /* Function used for tracking which time have already processed only 
        use
    */

    const HandleDIetProcessing = useCallback(async () => {
        // Check object exists
        if (!selectedDietTimes || Object.keys(selectedDietTimes).length === 0) {
            return warningNotify("Select Diet Before Processing");
        }

        // Remove empty selections
        const validSelections = Object.fromEntries(
            Object.entries(selectedDietTimes).filter(
                ([, times]) => Array.isArray(times) && times.length > 0
            )
        );

        if (Object.keys(validSelections).length === 0) return warningNotify("Select Diet Time!");

        // Date validation
        if (!todate) return warningNotify("Select Production Date");

        if (filteredItemDetail?.length === 0) return warningNotify("No new Patinet For the Next Batch");

        try {
            // const payload = { batch: validBatch, itemDetail: filteredItemDetail };
            const payload = {
                itemDetail: FinalFilterdItemDetail,
                process_date: mysqlInsertDate,
                status: 'PENDING',
                created_by: id
            };

            console.log({
                payload
            });


            const result = await axioslogin.post('/dietschedule/schedule/list', payload);
            const { success, message } = result?.data || {};

            if (success !== 2) {
                return warningNotify(message || "Processing Failed");
            }
            succesNotify(message);

            // // Refresh data and reset selections
            FetchActivePatients();
            FetchScheduledDietPlan();
            setSelectedDiets([]);
            setSelectedDietTimes([]);
        } catch (error) {
            console.log({
                error
            });

            warningNotify("Processing Failed");
        }
    }, [selectedDietTimes, mysqlInsertDate, FinalFilterdItemDetail, DietName, isAllSelected,
        // BatchDetail
    ]);

    /**
     * function to handle New patient Orders fo diet
     * 
     * Using of Set for Unique 
     * Set is used to avoid duplicate diet names when the same diet appears in multiple rows.
     * 
     */
    const handleNewPatientOrder = useCallback(() => {
        // Store selected diet IDs
        const dietIds = []
        // Store type_ids per diet_id
        // Format: { diet_id: [type_id, type_id] }
        const timeMap = {}
        // Loop through each diet
        ProcessedList?.forEach(diet => {
            const dietId = diet.diet_id
            // Add diet_id to list
            dietIds.push(dietId)
            // Extract all type_ids for that diet
            timeMap[dietId] = [...new Set(diet.types.map(t => t.type_id))]
        })
        // Set diets (example: [1, 2])
        setSelectedDiets(dietIds)
        // Set times (example: {1: [1,3,5], 2: [1,3,4]})
        setSelectedDietTimes(timeMap)
        // Optional reset

    }, [ProcessedList])


    const isLoadingAll =
        isLoadingProcess ||
        isLoadingDiet ||
        isLoadingScheduledPlan ||
        isLoadingPatientType;

    const isErrorAll =
        isErrorProcess ||
        isErrorDiet ||
        isErrorScheduledPatientPlan ||
        // isErrorBatch ||
        isErrorPatientType;

    const errorMessage =
        errorProcess?.message ||
        errorDiet?.message ||
        errorScheduledPatientPlan ||
        // errorBatch?.message ||
        errorPatientType?.message;

    if (isLoadingAll) {
        return <div>Loading...</div>;
    }

    if (isErrorAll) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <Box sx={{
            width: '100%',
            minHeight: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                width: '100%',
                minHeight: '80%',
                borderRadius: 5,
                border: '1px solid #9822c365',
            }}>

                {/* HEADER */}
                <DietMasterHeader
                    onClose={hanldeGoBack}
                    name="DIET PROCESS LIST"
                />

                <Box sx={{ p: 1 }}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 2
                    }}>
                        <Box sx={{ width: '45%', boxShadow: "md" }}>
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DietWiseProcessing
                                    handleProcessing={HandleDIetProcessing}
                                    setSelectedDiets={setSelectedDiets}
                                    selectedDiets={selectedDiets}
                                    selectedDietTimes={selectedDietTimes}
                                    setSelectedDietTimes={setSelectedDietTimes}
                                    handleNewPatientOrder={handleNewPatientOrder}
                                    isAllSelected={isAllSelected}
                                    allDietNames={allDietNames}
                                    todate={todate}
                                    setToDate={setToDate}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: '55%', boxShadow: "md", position: "relative", overflow: "hidden" }}>

                            {/* TOGGLE BUTTON */}
                            <Box
                                onClick={() => setDrawerOpen(prev => !prev)}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: drawerOpen ? 320 : 0,
                                    transform: 'translateY(-50%)',
                                    zIndex: 25,
                                    width: 24,
                                    height: 60,
                                    backgroundColor: '#1976d2',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopRightRadius: 6,
                                    borderBottomRightRadius: 6,
                                    cursor: 'pointer',
                                    transition: 'left 0.3s ease'
                                }}
                            >
                                {drawerOpen ? '◀' : '▶'}
                            </Box>

                            {/* DRAWER OVERLAY */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    zIndex: 15,
                                    transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
                                    transition: "transform 0.3s ease"
                                }}
                            >
                                <PatientSelectionDrawer
                                    open={true} // always true (animation handled outside)
                                    data={groupedPlans}
                                    selectedPlans={selectedPlans}
                                    setSelectedPlans={setSelectedPlans}
                                />
                            </Box>

                            {/* MAIN CONTENT */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ProcessCompletedList
                                    fetchscheduled={FetchScheduledDietPlan}
                                    fetchactive={FetchActivePatients}
                                    processedRows={ScheduledPatientDiet ?? []}
                                />
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ProcessList