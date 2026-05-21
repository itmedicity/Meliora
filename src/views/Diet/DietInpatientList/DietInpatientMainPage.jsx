import React, { useCallback, useMemo, useState } from 'react'
import { useAllPatientDietPlan } from '../CommonData/UseQuery'
import { Box } from '@mui/joy'

import KotItemHeader from '../KotItemList/KotItemHeader'
import InpatientFilter from './InpateintFilter.jsx/InpatientFilter'
import {
    FaUserInjured,
    FaHospitalUser,
    FaProcedures
} from "react-icons/fa";
import PatientCard from './DietInpatientComponents/PatientCard'
import DietPlan from '../DietPlan'
import CustomeIncidentLoading from 'src/views/IncidentManagement/Components/CustomeIncidentLoading'
import { errorNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { formatPatientDietData } from '../CommonData/CommonFun'
import InpatientDietTab from './DietInpatientComponents/InpatientDietTab'

const DietInpatientMainPage = () => {

    const {
        data: allPatientDiet = [],
        refetch: FetchPatientDietPlan
    } = useAllPatientDietPlan("W005");


    const formattedPatients = formatPatientDietData(allPatientDiet);

    const [search, setSearch] = useState('')
    const [nursingBed, setNursingBed] = useState(null)
    const [dietPatient, setDietPatient] = useState(null)
    const [dietName, setDietName] = useState(null);


    const [deitPlanOpen, setDeitPlanOpen] = useState(false);
    const [templatedetail, setTemplateDetail] = useState([]);
    const [loadingtemplate, setLoadingTemplate] = useState(false);
    const [selectedPatientData, setSelectedPatientData] = useState([])
    const [activeStatus, setActiveStatus] = useState('PLANNED')

    const filteredPatients = useMemo(() => {

        return formattedPatients?.filter((patient) => {
            // SEARCH ----------------
            const searchValue = search?.toLowerCase()?.trim()

            const matchesSearch =
                !searchValue ||
                patient?.ptc_ptname?.toLowerCase()?.includes(searchValue) ||
                patient?.ip_no?.toLowerCase()?.includes(searchValue) ||
                patient?.pt_no?.toLowerCase()?.includes(searchValue) ||
                patient?.fb_bdc_no?.toLowerCase()?.includes(searchValue)


            // DIET NAME ----------------
            const matchesDietName =
                !dietName ||
                patient?.diet_history?.some(
                    (diet) => diet?.diet_id === dietName
                )

            // NURSING BED ----------------
            const matchesBed =
                !nursingBed ||
                Number(patient?.fb_bd_code) === Number(nursingBed)

            // PATIENT --------
            const matchPatient =
                !dietPatient ||
                patient?.ip_no === dietPatient

            //  STATUS ----------------
            const dietHistory = patient?.diet_history || []

            const hasPlanned = dietHistory.some(
                (val) =>
                    val?.diet_status &&
                    val?.diet_status !== "STOPPED"
            )

            const hasStopped = dietHistory.some(
                (val) => val?.diet_status === "STOPPED"
            )

            let matchesStatus = true
            switch (activeStatus) {
                case "PLANNED":
                    matchesStatus = hasPlanned
                    break
                case "STOPPED":
                    matchesStatus =
                        !hasPlanned && hasStopped
                    break
                case "NOTPLANNED":
                    matchesStatus =
                        !hasPlanned && !hasStopped
                    break
                default:
                    matchesStatus = true
                    break
            }
            return (
                matchesSearch &&
                matchesDietName &&
                matchesBed &&
                matchesStatus &&
                matchPatient
            )

        })

    }, [
        formattedPatients,
        search,
        // dietType,
        dietName,
        nursingBed,
        activeStatus
    ]);




    const onTileClick = useCallback(async (item) => {
        if (!item) return;

        const DietDetail = item?.diet_history?.find(
            (diet) => diet?.diet_status === "ACTIVE"
        );
        setSelectedPatientData(item); // always set
        if (DietDetail?.diet_status === "ACTIVE") {
            if (!DietDetail?.template_id) {
                warningNotify("Template Id is Missing!");
                return;
            }
            try {
                setLoadingTemplate(true)
                const response = await axioslogin.post(
                    "/patientdietplan/gettemplatedtl",
                    { template_id: DietDetail.template_id }
                );
                const { data, success, message } = response.data;
                if (success === 0) {
                    errorNotify(message || "Error in Fetching Data");
                    return;
                }
                console.log({ data });
                setTemplateDetail(data ?? []);
            } catch (error) {
                errorNotify(error?.message || "Something went wrong");
            } finally {
                setLoadingTemplate(false)
            }
        } else {
            // optional: clear old data
            setTemplateDetail([]);
        }

        // setDeitPlanFlag(1);
        setDeitPlanOpen(true);

    }, [warningNotify, errorNotify]);


    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            {
                loadingtemplate
                &&
                <CustomeIncidentLoading
                    text={"Fetching Diet Detail Please Wait!"}
                />
            }
            {/* Sticky Header Section */}
            <Box
                sx={{
                    width: '100%',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    bgcolor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pb: 1
                }}
            >
                <KotItemHeader
                    name={'PATIENT MANAGEMENT'}
                    goBackPath={''}
                    headerIcons={[
                        FaUserInjured,
                        FaHospitalUser,
                        FaProcedures
                    ]}
                />

                <InpatientFilter
                    search={search}
                    setSearch={setSearch}
                    nursingBed={nursingBed}
                    setNursingBed={setNursingBed}
                    dietPatient={dietPatient}
                    setDietPatient={setDietPatient}
                    dietName={dietName}
                    setDietName={setDietName}
                    selectedStations={"W005"}
                    FilteredPatientDetail={formattedPatients}
                />
                <InpatientDietTab
                    patientList={formattedPatients}
                    activeStatus={activeStatus}
                    setActiveStatus={setActiveStatus}
                />
            </Box>

            {/* Scrollable Patient List */}
            <Box
                sx={{
                    flex: 1,
                    width: '100%',
                    overflowY: 'auto',
                    p: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    alignContent: 'flex-start',
                    // Hide Scrollbar
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE and Edge
                    '&::-webkit-scrollbar': {
                        display: 'none' // Chrome, Safari
                    }
                }}
            >
                {
                    filteredPatients?.map((patient) => (
                        <PatientCard
                            key={patient.dietpt_slno}
                            patient={patient}
                            onClick={onTileClick}
                        />
                    ))
                }
            </Box>


            <DietPlan
                open={deitPlanOpen}
                template={templatedetail}
                setOpen={setDeitPlanOpen}
                selectedPatientData={selectedPatientData}
                FetchPatientDietPlan={FetchPatientDietPlan}
            />
        </Box>
    )
}

export default DietInpatientMainPage