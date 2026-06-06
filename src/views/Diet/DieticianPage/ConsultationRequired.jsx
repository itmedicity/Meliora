import React, { useCallback, useMemo, useState } from "react";
import {
    Box,
    Modal,
    ModalDialog
} from "@mui/joy";

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



const ConsultationRequired = () => {
    const [activeStatus, setActiveStatus] = useState(null)
    const [activeTab, setActiveTab] = useState("REQUESTS")
    const [selectedPatientData, setSelectedPatientData] = useState({})
    // const [open, setOpen] = useState(null);

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
        // isLoading: isLoadingPlan,
        // isError: isPlanError,
        // error: erroplan,
        refetch: FetchAllConsultation
    } = useAllConsultation();

    const PlanId = selectedPatientData?.plan_id;

    const { data: TemplateFoodDetail } = useAllFetchTemplateFoodDetail(PlanId);
    const { data: FetchPlanFoodDetail = [] } = usePatientPlanFoodDetails(PlanId);


    const groupedData = useMemo(() => groupByDayAndType(
        templatedetail, TemplateFoodDetail, FetchPlanFoodDetail, loadingtemplate
    ), [templatedetail, TemplateFoodDetail, FetchPlanFoodDetail, loadingtemplate]);


    // Wrap in useMemo
    const filteredData = useMemo(() => {
        return DietPlanData?.filter(item => {

            // CONSULTATION REQUESTS
            if (activeTab === "REQUESTS") {
                return (
                    item?.is_consultation === 1 &&
                    !item?.dietitian_id
                );
            }

            // MY CONSULTATIONS
            if (activeTab === "MY_CONSULTATIONS") {

                if (item?.is_consultation !== 1) return false;
                if (Number(item?.dietitian_id) !== Number(empId)) {
                    return false;
                }
                // No status filter selected
                if (!activeStatus) {
                    return true;
                }
                // Status filter selected
                return item?.assignment_status === activeStatus;
            }
            return true;
        });
    }, [
        DietPlanData,
        activeTab,
        activeStatus,
        empId
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



    const confirmAssign = useCallback(async (patient, status) => {
        const payload = { assignment_id: patient?.assignment_id, status };
        try {
            const response = await axioslogin.post("/patientdietplan/diet-status", payload);
            const { success, message } = response.data;
            if (success === 0) return errorNotify(message || "Error");
            succesNotify(message);
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
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    mt: 1,
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "1fr 1fr 1fr",
                        lg: "repeat(5, 1fr)"
                    },
                    gap: 1.5,
                    minHeight: '25vh',
                }}
            >
                {filteredData?.map((patient) => (
                    <DietConsultationCard
                        key={patient.plan_id}
                        patient={patient}
                        onAssign={handleAssign}
                        onConfirm={confirmAssign}
                        onView={PatientDietDetail}
                        onQuick={HanldeQuickAssign}
                    />
                ))}
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

                                <TemplateFoodDetails
                                    templateData={groupedData}
                                />
                            </>

                        )}
                    </>
                </ModalDialog>
            </Modal>

        </Box>
    );
};

export default ConsultationRequired;