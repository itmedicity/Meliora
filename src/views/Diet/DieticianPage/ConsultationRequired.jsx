import React, { useCallback, useMemo, useState } from "react";
import {
    Box,
    Modal,
    ModalDialog,
} from "@mui/joy";
import MenuIcon from '@mui/icons-material/Menu'
import { useAllConsultation, useAllFetchTemplateFoodDetail, usePatientPlanFoodDetails } from "../CommonData/UseQuery";
import KotItemHeader from "../KotItemList/KotItemHeader";
import DietConsultationTab from "./DietConsultationTab";
import { useSelector } from "react-redux";
import DietConsultationCard from "./Component/DietConsultationCard";
import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
import { axioslogin } from "src/views/Axios/Axios";
import { groupByDayAndType } from "../CommonData/CommonFun";
import DietConsultationDetails from "./Component/DietConsultationDetails";
import TemplateFoodDetails from "./Component/TemplateFoodDetails";
import AssingDietician from "./AssingDietician";
import CanteenFilterComponent from '../CanteenOrderConfirmation/Components/CanteenFilterComponent'
import CanteenContextDrawer from '../CanteenOrderConfirmation/CanteenContextDrawer'
import { useCanteenFilter } from '../DietReducer/contextprovider/CanteenFilterContext'
import PizzaLoader from '../CanteenOrderConfirmation/Components/PizzaLoader'
import DietTextComponent from '../DietComponent/DietTextComponent'
import ConsultationApproval from './Component/ConsultationApproval'
import ConsultationRemarks from './Component/ConsultationRemarks'

const DRAWER_WIDTH = 280

const ConsultationRequired = () => {
    const [activeStatus, setActiveStatus] = useState(null)
    const [activeTab, setActiveTab] = useState("REQUESTS")
    const [selectedPatientData, setSelectedPatientData] = useState({});
    const [selectedStations, setSelectedStations] = useState([])
    const [open, setOpen] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [dietName, setDietName] = useState("")
    const [dietType, setDietType] = useState("");
    const [approvalRemarks, setApprovalRemarks] = useState("");
    const [approvalStatus, setApprovalStatus] = useState(null);


    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'assign' | 'view'

    const [loadingtemplate, setLoadingTemplate] = useState(false);
    const [templatedetail, setTemplateDetail] = useState([]);
    const [assignstatus, setAssignStatus] = useState("")

    const empId = useSelector(state => {
        return state.LoginUserData.empid
    });

    const {
        data: DietPlanData = [],
        refetch: FetchAllConsultation,
        isLoading: loading
    } = useAllConsultation();

    const PlanId = selectedPatientData?.plan_id;

    const { data: TemplateFoodDetail } = useAllFetchTemplateFoodDetail(PlanId);
    const { data: FetchPlanFoodDetail = [] } = usePatientPlanFoodDetails(PlanId);

    const { state } = useCanteenFilter();

    const {
        bed,
        patient,
        search
    } = state;

    const groupedData = useMemo(() => groupByDayAndType(
        templatedetail, TemplateFoodDetail, FetchPlanFoodDetail, loadingtemplate
    ), [templatedetail, TemplateFoodDetail, FetchPlanFoodDetail, loadingtemplate]);

    // Wrap in useMemo
    const filteredData = useMemo(() => {
        return DietPlanData?.filter(item => {

            if (activeTab === "REQUESTS") {
                if (
                    item?.is_consultation !== 1 ||
                    item?.dietitian_id
                ) {
                    return false;
                }
            }

            if (activeTab === "MY_CONSULTATIONS") {
                if (item?.is_consultation !== 1) return false;

                if (Number(item?.dietitian_id) !== Number(empId)) {
                    return false;
                }

                if (
                    activeStatus &&
                    item?.assignment_status !== activeStatus
                ) {
                    return false;
                }
            }

            // BED FILTER
            if (

                bed &&
                String(item?.bed_code) !== String(bed)
            ) {
                return false;
            }


            if (
                dietName &&
                Number(item?.diet_id) !== Number(dietName)
            ) {
                return false;
            }


            // PATIENT FILTER
            if (
                patient &&
                item?.patient_id !== patient
            ) {
                return false;
            }

            // SEARCH FILTER
            if (search) {
                const searchText = search.toLowerCase().trim();

                const searchableFields = [
                    item?.patient_name,
                    item?.patient_id,
                    item?.bed_code,
                    item?.doctor_name,
                    item?.diet_name,
                    item?.fb_bdc_no
                ];

                const matchesSearch = searchableFields.some(value =>
                    String(value ?? "")
                        .toLowerCase()
                        .includes(searchText)
                );

                if (!matchesSearch) return false;
            }

            // SELECTED STATIONS FILTER
            if (
                selectedStations?.length > 0 &&
                !selectedStations.includes(item?.fb_ns_code)
            ) {
                return false;
            }

            return true;
        });
    }, [
        DietPlanData,
        activeTab,
        activeStatus,
        empId,
        bed,
        patient,
        search,
        dietName,
        selectedStations
    ]);



    const PatientDietDetail = useCallback(async (item) => {
        if (!item) return;

        setSelectedPatientData(item); // always set
        if (item?.diet_status === "ACTIVE") {
            if (!item?.template_id) {
                warningNotify("Template Id is Missing!");
                return;
            }
            try {
                setLoadingTemplate(true)
                const response = await axioslogin.post(
                    "/patientdietplan/gettemplatedtl",
                    { template_id: item.template_id }
                );
                const { data, success, message } = response.data;
                if (success === 0) {
                    errorNotify(message || "Error in Fetching Data");
                    return;
                }
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

        setModalType('view');
        setIsOpen(true);

    }, []);


    const handleAssign = useCallback((patient, status) => {
        setSelectedPatientData(patient);
        setDietType(patient?.diet_id)
        setAssignStatus(status);
        setModalType('assign');
        setIsOpen(true);
    }, []);



    const HanldeQuickAssign = useCallback(async (patient, status) => {
        const payload = { plan_id: patient?.plan_id, assigned_to: empId, assigned_by: empId, status };
        try {
            const response = await axioslogin.post("/patientdietplan/assign-dietician", payload);
            const { success, message } = response.data;
            if (success === 0) return errorNotify(message || "Error");
            succesNotify("Successfully assigned patient");
            setIsOpen(false);
            FetchAllConsultation();
        } catch (error) {
            errorNotify(error?.message || "Something went wrong");
        }
    }, [empId, FetchAllConsultation]);



    const handleOpenApproval = (patient, nextStatus) => {
        setSelectedPatientData(patient);
        setApprovalStatus(nextStatus);
        setApprovalRemarks("");
        setDietType(patient?.diet_id)
        setModalType("approval");
        setIsOpen(true);
    };

    const handleSubmitApproval = async () => {
        if (!selectedPatientData || !approvalStatus) return;

        await confirmAssign(
            selectedPatientData,
            approvalStatus,
            approvalRemarks
        );

        setIsOpen(false);
    };



    const handleUpdatePlanRemarks = useCallback(async (planId, remarks) => {


        if (!remarks?.trim()) {
            errorNotify("Please enter remarks");
            return;
        }

        if (!planId) {
            errorNotify("Please select diet type");
            return;
        };

        try {
            const response = await axioslogin.post(
                "/patientdietplan/update-remarks",
                {
                    plan_id: planId,
                    remarks,
                    dietType: dietType
                }
            );

            const { success, message } = response.data;

            if (success === 0) {
                errorNotify(message || "Unable to update remarks");
                return false;
            }

            // Update selected patient immediately
            setSelectedPatientData(prev => ({
                ...prev,
                remarks
            }));

            succesNotify(message || "Diet plan remarks updated");
            FetchAllConsultation();

            return true;
        } catch (error) {
            errorNotify(error?.message || "Something went wrong");
            return false;
        }
    }, [FetchAllConsultation, dietType]);


    const confirmAssign = useCallback(async (patient, status, approvalRemarks) => {
        const payload = { assignment_id: patient?.assignment_id, status, approvalRemarks };
        try {
            const response = await axioslogin.post("/patientdietplan/diet-status", payload);
            const { success, message } = response.data;
            if (success === 0) return errorNotify(message || "Error");
            succesNotify(message);
            setApprovalRemarks("")
            FetchAllConsultation();
        } catch (error) {
            errorNotify(error?.message || "Something went wrong");
        }
    }, [FetchAllConsultation]);


    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '90vh',

            overflowY: 'scroll',
            overflowX: 'hidden',
            scrollbarWidth: 'none',          // Firefox
            msOverflowStyle: 'none',          // IE & Edge
            '&::-webkit-scrollbar': {
                display: 'none',               // Chrome, Safari
            },
        }}>


            {
                loading && <PizzaLoader />
            }


            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    width: "100%",
                    bgcolor: "#fff",
                    pb: 1,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                }}>

                <KotItemHeader name={'DIET CONSULTATION QUEUE'} />

                <DietConsultationTab
                    dietPlans={DietPlanData}
                    activeStatus={activeStatus}
                    setActiveStatus={setActiveStatus}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    currentDietitianId={empId}
                    pdfdata={filteredData}
                />

                <CanteenFilterComponent
                    showdietype={false}
                    showordertype={false}
                    dietName={dietName}
                    setDietName={setDietName}
                    showdiet={true}
                    selectedStations={selectedStations} />


            </Box>


            <Box
                sx={{
                    width: "100%",
                    mt: 1,
                    gap: 1.5,
                    minHeight: '65vh',
                    maxHeight: '75vh',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 'md'
                }} >


                <Box
                    onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
                    sx={{
                        height: '100%',
                        px: 2,
                        pl: open ? `${DRAWER_WIDTH + 20}px` : '26px',
                        transition: 'padding-left 0.3s ease',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': { display: 'none' },
                        width: '100%'
                    }} >
                    {!open && (
                        <MenuIcon
                            onClick={() => setOpen(true)}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                                zIndex: 20,
                                fontSize: 18,
                                cursor: 'pointer'
                            }}
                        />
                    )}

                    {/* HEADER */}
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 22,
                            p: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            bgcolor: isScrolled ? '#fffffff2' : '#f6f6f6d9',
                            boxShadow: isScrolled ? 'md' : ''
                        }}>


                        <DietTextComponent
                            size={22}
                            value="DIET PLAN MANAGEMENT"
                        />

                    </Box>

                    {/* CONTENT */}
                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
                            mt: 1,
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                md: "1fr 1fr 1fr",
                                lg: "repeat(4, 1fr)"
                            },
                            gap: 1.5,

                        }} >

                        {filteredData?.map((patient) => (
                            <DietConsultationCard
                                key={patient.plan_id}
                                patient={patient}
                                onAssign={handleAssign}
                                onConfirm={handleOpenApproval}
                                onView={PatientDietDetail}
                                onQuick={HanldeQuickAssign}

                            />
                        ))}

                    </Box>
                </Box>


                <CanteenContextDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    width={DRAWER_WIDTH}
                    selectedStations={selectedStations}
                    setSelectedStations={setSelectedStations}
                />

            </Box>









            {/* MODAL */}
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <ModalDialog
                    sx={{
                        width: modalType === "view" ? '60vw' : 600,
                        maxHeight: "85vh",
                        overflow: "auto"
                    }}>
                    <>
                        {modalType === "assign" && (
                            <AssingDietician
                                FetchAllConsultation={FetchAllConsultation}
                                setOpen={setIsOpen}
                                consultation={selectedPatientData}
                                assignstatus={assignstatus}
                            />
                        )}

                        {modalType === "view" && (
                            <>
                                <DietConsultationDetails
                                    consultation={selectedPatientData}
                                />

                                <ConsultationRemarks
                                    consultation={selectedPatientData}
                                />

                                <TemplateFoodDetails
                                    templateData={groupedData}
                                />
                            </>

                        )}

                        {modalType === "approval" && (
                            <ConsultationApproval
                                patient={selectedPatientData}
                                approvalRemarks={approvalRemarks}
                                setApprovalRemarks={setApprovalRemarks}
                                onCancel={() => setIsOpen(false)}
                                onConfirm={handleSubmitApproval}
                                setDietType={setDietType}
                                dietType={dietType}
                                onUpdatePlanRemarks={handleUpdatePlanRemarks}

                            />
                        )}
                    </>
                </ModalDialog>
            </Modal>




        </Box>
    );
};

export default ConsultationRequired;