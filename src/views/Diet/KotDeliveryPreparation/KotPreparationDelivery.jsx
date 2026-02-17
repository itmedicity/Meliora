import React, { useState, useMemo } from 'react'
import { Box } from '@mui/joy'
import KotItemHeader from '../KotItemList/KotItemHeader'
import CustomeTab from './CustomeTab'
import { useKotFilter } from '../DietReducer/contextprovider/KotFilterContext'
import DietMainPreperation from './NewDesignKotDelivery/DietMainPreperation'
import PreparationStatusFilter from './NewDesignKotDelivery/PreparationStatusFilter'
import {
    useDietNames,
    useDietTimes,
    useNursingStationMaster,
    useAllEmployeeFetch
} from '../CommonData/UseQuery'
import {
    generatePatientDietOrders,
    getFoodStatus
} from '../CommonData/CommonFun'

const KotPreparationDelivery = () => {

    const [status, setStatus] = useState('');
    const [selectedStations, setSelectedStations] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [activeStatus, setActiveStatus] = useState(null);

    const { data: DIETS = [] } = useDietNames();
    const { data: NURSING_STATIONS = [] } = useNursingStationMaster();
    const { data: DietTime = [] } = useDietTimes();
    const { data: AllEmployee = [] } = useAllEmployeeFetch();

    const { state } = useKotFilter();

    const {
        ptsearch,
        dietName,
        dietPatient,
        diettype,
        assignee
    } = state;



    /**
     * This given below piece of code just generate random Patients
     * Only for the development puporse once real-time data comes this can be removed 
     * 
     */
    const patientDietOrdersSample = useMemo(() => {
        if (!DIETS.length || !NURSING_STATIONS.length) return [];

        return generatePatientDietOrders({
            count: 100,
            diets: DIETS,
            nursingStations: NURSING_STATIONS,
            includeBystander: true
        });
    }, [DIETS, NURSING_STATIONS]);

    /**
     * Getting Already Assined Detail from the Local Storge
     * This is Doing Because current it only Design so Storing in the Local stoarge
     * Also be removed 
     * 
     */
    const storedData = JSON.parse(
        localStorage.getItem("assignedPatients")
    ) || [];

    const deliveryMergedPatients = useMemo(() => {
        /*
            Create a lookup map for employees.
            This converts the employee array into an object like:
            {
                1: "Ravi",
                2: "Suresh"
            }
            So we can quickly get employee name using assignee id.
        */
        const employeeMap = AllEmployee.reduce((acc, emp) => {
            acc[emp.em_id] = emp.em_name;
            return acc;
        }, {});

        /*
            Merge localStorage assignment data with patient data.
            storedData structure:
            [
                {
                    assignee: 3,
                    assignedAt: "...",
                    patients: [ {...}, {...} ]
                }
            ]
            For each assignment:
            - Loop through its patients
            - Attach:
                assignee id
                assignee name (from employeeMap)
                assigned date/time
        */
        return storedData.flatMap((assignment) =>
            (assignment.patients || []).map((patient) => ({
                // Keep original patient data
                ...patient,
                // Attach assignee id (if exists)
                assignee: assignment.assignee || null,
                // Attach assignee name using lookup map
                assigneeName: employeeMap[assignment.assignee] || null,
                // Attach assignment timestamp
                assignedAt: assignment.assignedAt || null
            }))
        );

    }, [storedData, AllEmployee]);


    /* MATCH SELECTED DIET & TIME*/
    const DietNameMatch = useMemo(() => {
        if (!dietName) return null;
        return DIETS.find(
            v => Number(v.diet_slno) === Number(dietName)
        ) || null;
    }, [DIETS, dietName]);

    const DietTypeMatch = useMemo(() => {
        if (!diettype) return null;
        return DietTime.find(
            v => Number(v.type_slno) === Number(diettype)
        ) || null;
    }, [DietTime, diettype]);



    /* SELECT SOURCE BASED ON TAB */
    const sourcePatients = useMemo(() => {
        return activeTab === '2'
            ? deliveryMergedPatients
            : patientDietOrdersSample;
    }, [activeTab, deliveryMergedPatients, patientDietOrdersSample]);

    /* BASE FILTER */
    const baseFilteredPatients = useMemo(() => {

        /*
            If there is no data in the selected source
            (Preparation or Delivery), return empty array.
        */
        if (!sourcePatients?.length) return [];
        /*
            Normalize filter values for comparison.
            - searchValue: lowercase trimmed text search
            - selectedDietSlno: selected diet identifier
            - selectedTime: selected meal type
        */
        const searchValue = ptsearch?.trim().toLowerCase();
        const selectedDietSlno = DietNameMatch?.diet_name;
        const selectedTime = DietTypeMatch?.type_desc;

        /*
            Apply all filters to the selected data source.
            Every condition must return true for the patient
            to be included in the final result.
        */
        return sourcePatients.filter((pt) => {

            /*
                Search filter:
                Matches patient name or patient number.
                If no search text is entered, allow all.
            */
            const searchMatch =
                !searchValue ||
                pt.ptc_ptname?.toLowerCase().includes(searchValue) ||
                pt.pt_no?.toLowerCase().includes(searchValue);

            /*
                Patient status filter:
                If no status selected, allow all.
            */
            const statusMatch =
                !status || pt.patient_status_code === status;

            /*
                Nursing station filter:
                If no station selected, allow all.
            */
            const stationMatch =
                !selectedStations.length ||
                selectedStations.includes(pt.ns_code);

            /*
                Diet name filter:
                Compare selected diet with patient diet.
                If none selected, allow all.
            */
            const dietMatch =
                !selectedDietSlno ||
                String(pt.diet_name) === String(selectedDietSlno);

            /*
                Diet time (meal) filter:
                Compare selected meal type with patient meal.
                If none selected, allow all.
            */
            const dietTimeMatch =
                !selectedTime ||
                String(pt.meal?.trim().toUpperCase()) === String(selectedTime);

            /*
                Assignee filter:
                This is applied only in Delivery tab (activeTab === '2').
                In Preparation tab, this condition is ignored.
            */
            const assigneeMatch =
                activeTab === '2'
                    ? (!assignee || Number(pt.assignee) === Number(assignee))
                    : true;

            /*
                Return patient only if all filter conditions pass.
            */
            return (
                searchMatch &&
                statusMatch &&
                stationMatch &&
                dietMatch &&
                dietTimeMatch &&
                assigneeMatch
            );
        });

    }, [
        sourcePatients,
        ptsearch,
        status,
        selectedStations,
        DietNameMatch,
        DietTypeMatch,
        assignee,
        activeTab
    ]);


    /* FINAL FILTER + FOOD STATUS */
    const filteredPatients = useMemo(() => {

        /*
            Step 1: If a specific patient is selected (dietPatient),
            filter the base list to include only that patient.
            Otherwise, use the full baseFilteredPatients list.
        */
        const baseData = dietPatient
            ? baseFilteredPatients.filter(pt => pt.pt_no === dietPatient)
            : baseFilteredPatients;

        /*
            Step 2: Extract all assigned patients from localStorage.
            This flattens the stored assignment structure so we can
            easily check if a patient + meal combination is assigned.
        */
        const allPatients = storedData.flatMap(
            item => item.patients || []
        );

        /*
            Step 3: Enhance each patient with:
            - Food preparation status
            - UI-related status flags
            - Assignee details (if available)
        */
        const mappedData = baseData.map(pt => {

            /*
                Check whether the current patient (for a specific meal)
                exists in the assigned patients list.
            */
            const isAssigned = allPatients.some(
                sp => sp.pt_no === pt.pt_no && sp.meal === pt.meal
            );

            /*
                Determine food status and related UI values
                using the helper function.
            */
            const { foodStatus, checkStatus, color, bgcolor } =
                getFoodStatus(pt, isAssigned);

            /*
                Return the updated patient object.
                Assignee fields will exist only in Delivery tab.
            */
            return {
                ...pt,
                assignee: pt.assignee || null,
                assigneeName: pt.assigneeName || null,
                assignedAt: pt.assignedAt || null,
                foodStatus,
                checkStatus,
                color,
                bgcolor
            };
        });

        /*
            Step 4: Apply status-based filtering (from top status tabs).
    
            - If no activeStatus is selected, return all mapped data.
            - If "Bystander" is selected, filter by bystander flag.
            - Otherwise, filter by foodStatus.
        */
        if (!activeStatus) return mappedData;

        if (activeStatus === "Bystander") {
            return mappedData.filter(
                pt => pt.is_bystander === true
            );
        }

        return mappedData.filter(
            pt => pt.foodStatus === activeStatus
        );

    }, [
        baseFilteredPatients,
        dietPatient,
        storedData,
        activeStatus
    ]);


    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>

            <KotItemHeader
                name={'DIET PREPERATION & DELIVERY'}
                goBackPath={''}
            />

            <CustomeTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setActiveStatus={setActiveStatus}
                activeStatus={activeStatus}
                FilteredPatientDetail={filteredPatients}
            />

            <PreparationStatusFilter
                selectedStations={selectedStations}
                value={status}
                onChange={setStatus}
                FilteredPatientDetail={baseFilteredPatients}
            />

            <DietMainPreperation
                activeTab={activeTab}
                FilteredPatientDetail={filteredPatients}
                status={status}
                selectedStations={selectedStations}
                setSelectedStations={setSelectedStations}
            />

        </Box>
    )
}

export default KotPreparationDelivery
