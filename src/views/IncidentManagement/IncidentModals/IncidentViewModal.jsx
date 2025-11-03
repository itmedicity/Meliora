import { Box, Tooltip } from '@mui/joy';
import React, { memo, useCallback, useState, lazy, Suspense, useEffect } from 'react';
import { IoIosSave } from "react-icons/io";
import { MdOutlineFreeCancellation } from "react-icons/md";

const CustomeIncidentLoading = lazy(() => import('../Components/CustomeIncidentLoading'));
const IncidentTextComponent = lazy(() => import('../Components/IncidentTextComponent'));
const IpPatientCard = lazy(() => import('../Components/IpPatientCard'));
const DisplayStaffDetail = lazy(() => import('../StaffDetail/DisplayStaffDetail'));
const DisplayVisitorDetail = lazy(() => import('../Components/DisplayVisitorDetail'));
const DisplayHospitalProperty = lazy(() => import('../Components/DisplayHospitalProperty'));
const AttachedFilesCard = lazy(() => import('../Components/AttachedFilesCard'));
const InchargeApprovalDetail = lazy(() => import('../ApprovalComponent/InchargeApprovalDetail'));
const ApprovalPreview = lazy(() => import('../ApprovalComponent/ApprovalPreview'));

import { handleImageClick, normalizeIncidentData } from '../CommonComponent/CommonFun';
import ImagePreviewModal from './ImagePreviewModal';
import IncidentCategorySelect from '../QualityDepartment/IncidentCategorySelect';
import SACMatrixForm from '../QualityDepartment/SACMatrixForm';
import ReviewInput from '../Components/ReviewInput';
import IncidentReviewTable from '../ApprovalComponent/IncidentReviewTable';
import ApprovalButton from '../ButtonComponent/ApprovalButton';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import RegisterdUserCard from '../Components/RegisterdUserCard';
import IncidentDataCollection from '../DatacollectionIncident/IncidentDataCollection';
import SectionHeader from '../Components/SectionHeader';
import IncidentDataCollectionPreview from '../DatacollectionIncident/IncidentDataCollectionPreview';
import { useSelector } from 'react-redux';
import DataRequestDetail from '../DatacollectionIncident/DataRequestDetail';
import FishboneQuestionPreview from '../FishBoneAnalysis/FishboneQuestionPreview';
import { fetchAllInvolvedDep, getAllDeparmentActions, getFishBoneAnalysisData, incidentLevelApprovalFetch } from 'src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode';
import SACMatrixResult from '../QualityDepartment/SACMatrixResult';
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedDuotone } from "react-icons/pi";
import IncidentAction from '../IncidentActions/IncidentAction';
import DepartmentActionDetail from '../IncidentActions/DepartmentActionDetail';
import FishboneQuestionContainer from '../FishBoneAnalysis/FishboneQuestionContainer';
import IncidentActionSubmit from '../IncidentActions/IncidentActionSubmit';

const IncidentViewModal = ({
    loading,
    items,
    IncidentFiles,
    fetchAgain,
    setOpenModal,
    level,
    publicNasFolder,
    levelNo,
    highlevelapprovals
}) => {

    const queryClient = useQueryClient();

    const { empdept, empsecid } = useSelector(state => {
        return state.LoginUserData
    });

    const { patientDetail, staffDetails, visitorDetail, propertyDetail } = normalizeIncidentData(items);

    const [inchargereview, setInchargeReview] = useState("");
    const [approvalprocessing, setApprovalProcessing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openModal, setOpenViewModalModal] = useState(false);
    const [hodreview, setHodReview] = useState("");
    const [qadreview, setQadReview] = useState("");
    const [evaluationstatus, setEvaluationStatus] = useState("");
    const [edit, setEdit] = useState(false);
    const [correctiveaction, setCorrectiveAction] = useState("");
    const [preventiveaction, setPreventiveAction] = useState("");
    const [rootcauseanalysis, setRootCauseAnalysis] = useState("");
    const [correctiveedit, setCorrectiveEdit] = useState(false);
    const [preventiveedit, setPreventiveEdit] = useState(false);
    const [evalutionedit, setEvalutaionEdit] = useState(false);
    const [rootcauseedit, setRootCauseEdit] = useState(false)
    const [edititem, setEditItem] = useState("");
    const [selectedDeps, setSelectedDeps] = useState([]);
    const [incdep, setIncDep] = useState([])
    const [ismultipledep, setIsMultipleDep] = useState(false);
    const [datacollectionreamark, setDataCollectionRemark] = useState("");
    const [sasdetial, setSaxDetail] = useState({});
    const [incidentcategory, setIncidentCategory] = useState("");
    const [incidentsubcategory, setIncidentSubCategory] = useState(null)

    // corrective Actions
    const [hodcorrectiveaction, setHodCorrectiveAction] = useState("");
    // high level approval
    // const [dmscomment, setDMSComment] = useState("");
    // const [mscomment, setMSComment] = useState("");
    // const [mdcomment, setMDComment] = useState("");

    const [highLevelComments, setHighLevelComments] = useState({});
    const [expanded, setExpanded] = useState(true);


    const [formValues, setFormValues] = useState({
        MATERIAL: '',
        MACHINE: '',
        MAN: '',
        MILIEU: '',
        METHOD: '',
        MEASUREMENT: ''
    });

    const [open, setOpen] = useState(false);
    const [savedetail, setSaveDetail] = useState(false)

    // open modadl
    const onImageClick = useCallback((file) => {
        handleImageClick(file, setSelectedImage, setOpenViewModalModal); // common export for image viewing
    }, [publicNasFolder]);


    // fetch fishbone analysis details
    const { data: fishboneanalysisdata } = useQuery({
        queryKey: ['fbadetail', empsecid, items?.inc_register_slno],
        queryFn: () => getFishBoneAnalysisData(empsecid, items?.inc_register_slno),
        enabled: !!empsecid && !!items?.inc_register_slno
    });

    //fetch all department action details
    const { data: departmentreqactions, isLoading: loadingDepartmentaction } = useQuery({
        queryKey: ['getalldepactions', items?.inc_register_slno],
        queryFn: () => getAllDeparmentActions(items?.inc_register_slno),
        enabled: !!items?.inc_register_slno
    });

    //fetching involved department from inc data collection 

    const {
        data: involvedDepartment,
        isLoading: loadinginvolveddepartment,
    } = useQuery({
        queryKey: ['allinvdep', items?.inc_register_slno],
        queryFn: () => fetchAllInvolvedDep(items?.inc_register_slno),
        enabled: !!items?.inc_register_slno,
    });


    const { data: incidentlevels } = useQuery({
        queryKey: ["getalllevels"],
        queryFn: () => incidentLevelApprovalFetch(),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });


    // Initialize dynamic review states once incidentlevels are fetched
    useEffect(() => {
        if (Array.isArray(incidentlevels) && incidentlevels?.length > 0) {
            const initialComments = incidentlevels?.reduce((acc, lvl) => {
                acc[lvl?.level_name] = "";
                return acc;
            }, {});
            setHighLevelComments(initialComments);
        }
    }, [incidentlevels]);

    // Dynamic setter
    const setHighLevelReview = (levelName, value) => {
        setHighLevelComments(prev => ({
            ...prev,
            [levelName]: value
        }));
    };


    // Department action detail counts
    const acknowledgedActionCount = departmentreqactions?.filter(
        item => item?.inc_dep_action_status === 1
    )?.length || 0;

    const notAcknowledgedActionCount = departmentreqactions?.filter(
        item => item?.inc_dep_action_status !== 1
    )?.length || 0;

    // RCA department counts
    const acknowledgedRcaCount = involvedDepartment?.filter(
        item => item?.inc_dep_status === 1
    )?.length || 0;

    const notAcknowledgedRcaCount = involvedDepartment?.filter(
        item => item?.inc_dep_status !== 1
    )?.length || 0;


    const isRcaAllDepartmentComplete = acknowledgedRcaCount === notAcknowledgedRcaCount;
    const isActionCompleted = acknowledgedActionCount === notAcknowledgedActionCount;

    console.log(`${isRcaAllDepartmentComplete}:isRcaAllDepartmentComplete =>${isActionCompleted}:isActionCompleted`);


    const InitiatorName = items?.inc_initiator_slno === 1
        ? "Patient"
        : items?.inc_initiator_slno === 2
            ? "Staff"
            : items?.inc_initiator_slno === 3
                ? "Visitors"
                : "Hospital Property";


    // for selecting review dynamically
    // const reviewProps =
    //     (level === 'INCHARGE' && (edit || items?.inc_incharge_ack === 0) && items?.inc_hod_ack === 0 && items?.inc_incharge_reivew_state !== 'R')
    //         ? { review: inchargereview, setReview: setInchargeReview, action: correctiveaction }
    //         : (level === 'HOD' && (edit || items?.inc_hod_ack === 0))
    //             ? { review: hodreview, setReview: setHodReview, action: preventiveaction }
    //             : (level === 'QUALITY' && (edit || items?.inc_qad_ack === 0))
    //                 ? { review: qadreview, setReview: setQadReview, action: evaluationstatus } :
    //                 (level === 'DMS' && (edit || items?.inc_current_level === 0)) ?
    //                     { review: dmscomment, setReview: setDMSComment, action: '' } :
    //                     (level === 'MEDICAL SUPERINTENDENT' && (edit || items?.inc_current_level === 1)) ?
    //                         { review: mscomment, setReview: setMSComment, action: '' } :
    //                         (level === 'MANAGING DIRECTOR' && (edit || items?.inc_current_level === 2)) ?
    //                             { review: mdcomment, setReview: setMDComment, action: '' } :
    //                             null;

    // for selecting review dynamically
    const reviewProps = (() => {
        if (level === 'INCHARGE' && (edit || items?.inc_incharge_ack === 0) && items?.inc_hod_ack === 0 && items?.inc_incharge_reivew_state !== 'R') {
            return { review: inchargereview, setReview: setInchargeReview, action: correctiveaction };
        }
        if (level === 'HOD' && (edit || items?.inc_hod_ack === 0) && items?.inc_hod_ack === 0 && items?.inc_hod_reivew_state !== 'R') {
            return { review: hodreview, setReview: setHodReview, action: preventiveaction };
        }
        if (level === 'QUALITY' && (edit || items?.inc_qad_ack === 0)) {
            return { review: qadreview, setReview: setQadReview, action: evaluationstatus };
        }
        //  dynamic part for any high-level approver (like DMS, MS, MD)
        const currentLevelObj = incidentlevels?.find(lvl => lvl.level_name === level);
        if (currentLevelObj && (edit || items?.inc_current_level === currentLevelObj?.level_no - 1)) {
            return {
                review: highLevelComments[level],
                setReview: (val) => setHighLevelReview(level, val),
                action: false
            };
        }

        return null;
    })();


    // for selection the actions of relevant levels
    const reviewConfig = {
        INCHARGE: {
            title: 'Corrective Action',
            review: correctiveaction,
            setReview: setCorrectiveAction,
            disabled: !(correctiveedit || items?.inc_corrective_action),
            state: setCorrectiveEdit,
            view: !(items?.inc_incharge_reivew_state === 'R')
        },
        HOD: {
            title: 'Preventive Action',
            review: preventiveaction,
            setReview: setPreventiveAction,
            disabled: !(preventiveedit || items?.inc_preventive_action),
            state: setPreventiveEdit,
            view: !(items?.inc_hod_reivew_state === 'R')
            // || !(items?.inc_current_level >= 0 && items?.inc_current_level_review_state === 'A')
        },
        QUALITY: {
            title: 'Evaluation Status',
            review: evaluationstatus,
            setReview: setEvaluationStatus,
            disabled: !(evalutionedit || items?.inc_evaluation_status),
            state: setEvalutaionEdit
        },
    };

    const reviewEdit = {
        Corrective: {
            title: 'Corrective Action',
            review: correctiveaction,
            setReview: setCorrectiveAction,
            disabled: !(correctiveedit || items?.inc_corrective_action),
            state: setCorrectiveEdit
        },
        Preventive: {
            title: 'Preventive Action',
            review: preventiveaction,
            setReview: setPreventiveAction,
            disabled: !(preventiveedit || items?.inc_preventive_action),
            state: setPreventiveEdit
        },
        Evaluation: {
            title: 'Evaluation Status',
            review: evaluationstatus,
            setReview: setEvaluationStatus,
            disabled: !(evalutionedit || items?.inc_evaluation_status),
            state: setEvalutaionEdit
        },
    };

    const currentReview = reviewConfig[level];
    const currentEditItem = reviewEdit[edititem];

    const isEditExits = evalutionedit || preventiveedit || correctiveedit;

    const handleapprovalEdit = useCallback((item) => {
        setInchargeReview(item?.inc_incharge_review);
        setHodReview(item?.inc_hod_review)
        setEdit(true);
    }, []);


    // check box functionallity for Data collection
    const updateMultipleSelect = useCallback((event) => {
        const checked = event.target.checked;
        setIsMultipleDep(checked);
        setIncDep(checked ? incdep : []);
        if (!checked) {
            setSelectedDeps([]);
        }
    }, [incdep]);


    // hanlde rca editing for all level // this will be optionla based on the new requirement
    const handleEdits = useCallback(async () => {
        const hodPayload = correctiveedit ? {
            inc_corrective_action: correctiveaction,
            inc_register_slno: items?.inc_register_slno
        } : preventiveedit ? {
            inc_preventive_action: preventiveaction,
            inc_register_slno: items?.inc_register_slno
        } : {
            inc_rca: rootcauseanalysis,
            inc_register_slno: items?.inc_register_slno
        };

        const qadPayload = preventiveaction ? {
            inc_preventive_action: preventiveaction,
            inc_register_slno: items?.inc_register_slno
        } : evalutionedit ? {
            inc_evaluation_status: evaluationstatus,
            inc_register_slno: items?.inc_register_slno
        } : {
            inc_rca: rootcauseanalysis,
            inc_register_slno: items?.inc_register_slno
        };

        const inchargepayload = correctiveedit ? {
            inc_corrective_action: correctiveaction,
            inc_register_slno: items?.inc_register_slno
        } : {
            inc_rca: rootcauseanalysis,
            inc_register_slno: items?.inc_register_slno
        };


        const setStates = correctiveedit ? setCorrectiveEdit : preventiveedit ? setPreventiveEdit : setEvalutaionEdit;

        const config = {
            HOD: {
                url: correctiveedit ?
                    "/incidentMaster/hodcorrectiveupdate"
                    : preventiveedit ?
                        "/incidentMaster/hodpreventiveupdate" :
                        "/incidentMaster/rcaupdation",
                payload: hodPayload,
                qkey: 'allIncidents',
                setState: setStates
            },
            QUALITY: {
                url: preventiveaction ?
                    "/incidentMaster/hodpreventiveupdate"
                    : evalutionedit ?
                        "/incidentMaster/qadevaluationupdate" :
                        "/incidentMaster/rcaupdation",
                payload: qadPayload,
                qkey: 'qadincident',
                setState: setStates
            },
            INCHARGE: {
                url: correctiveedit ?
                    "/incidentMaster/hodcorrectiveupdate" : "/incidentMaster/rcaupdation",
                payload: inchargepayload,
                qkey: 'allIncidents',
                setState: setStates
            }
        }[level];


        if (!config) {
            warningNotify("Invalid approval level");
            return;
        }

        try {
            const { data } = await axioslogin.patch(config.url, config.payload);
            const { success, message } = data ?? {};
            if (success === 2) {
                succesNotify(message);
                queryClient.invalidateQueries(config.qkey);
            } else {
                warningNotify(message);
            }
        } catch (error) {
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            setEvalutaionEdit(false)
            setCorrectiveEdit(false)
            setPreventiveEdit(false)
            setRootCauseEdit(false)
        }
    }, [level, preventiveaction, items, correctiveaction, correctiveedit, currentEditItem, evaluationstatus, rootcauseanalysis])


    console.log(items?.inc_incharge_reivew_state, level, "items?.inc_incharge_reivew_state");


    return (
        <Box
            sx={{
                width: '60vw',
                minHeight: '60vh',
                maxHeight: '95vh',
                position: 'relative',
                p: 2,
                bgcolor: '#ffffffff',
                borderRadius: '12px',
                overflowY: 'auto',
                /* Hide scrollbar */
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}>

            {/* Wrap all lazy components inside Suspense */}
            <Suspense fallback={<CustomeIncidentLoading text={"Loading Components"} />}>
                {loading && <CustomeIncidentLoading text={"Fetching Files and Details"} />}

                {/* HEADER */}
                <Box sx={{ mb: 2, overflow: "hidden" }}>
                    <RegisterdUserCard
                        employeeName={items?.em_name}
                        departmentName={items?.dept_name}
                        sectionName={items?.sec_name}
                        designation={items?.desg_name}
                        createDate={items?.create_date}
                        items={items}
                    />
                </Box>

                {/* Incident Details */}
                <Box sx={{
                    width: '100%',
                    bgcolor: ' var(--rose-pink-300)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 0.5, px: 1
                }}>
                    <IncidentTextComponent
                        text={"INCIDENT DETAILS"}
                        size={14}
                        weight={600}
                        color={"white"}
                    />

                    <Tooltip title={expanded ? 'Hide' : 'View'} variant="plain" size='sm'>
                        <span onClick={() => setExpanded((prev) => !prev)} style={{ cursor: 'pointer' }}>
                            {expanded ? (
                                <FaRegEye size={18} color="black" />
                            ) : (
                                <PiEyeClosedDuotone size={18} color="black" />
                            )}
                        </span>
                    </Tooltip>
                </Box>


                <Box
                    sx={{
                        p: 2,
                        border: '4px solid var(--rose-pink-400)',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderTop: 'none',
                        borderBottomWidth: '4px',
                        borderRadius: '20px / 15px',
                        overflow: 'hidden',
                        maxHeight: expanded ? '1000px' : 0, // big enough to fit content
                        transition: 'max-height 0.4s ease, opacity 0.4s ease',
                        // opacity: expanded ? 1 : 0,
                    }}
                >
                    {
                        expanded &&
                        <>

                            {/* INITIATOR */}
                            < Box >
                                <SectionHeader text="INITIATOR" />
                                <IncidentTextComponent text={InitiatorName?.toUpperCase()} size={16} weight={600} />
                            </Box>

                            {/* DETAILS */}
                            <SectionHeader text="DETAILS" />

                            {items?.inc_initiator_slno === 1 ? (
                                <IpPatientCard data={patientDetail} />
                            ) : items?.inc_initiator_slno === 2 ? (
                                <DisplayStaffDetail data={staffDetails} />
                            ) : items?.inc_initiator_slno === 3 ? (
                                <DisplayVisitorDetail visitorDetail={visitorDetail} />
                            ) : (
                                <DisplayHospitalProperty propertyDetail={propertyDetail} size={12} />
                            )}

                            {/* DESCRIPTION */}
                            <Box sx={{ mt: 1 }}>
                                <SectionHeader text="DESCRIPTION" />
                                <IncidentTextComponent text={items?.inc_describtion || "No description provided"} size={14} weight={400} />
                            </Box>

                            {/* NATURE */}
                            <Box sx={{ mt: 1 }}>
                                <SectionHeader text="NATURE OF INCIDENT" />

                                <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                                    {(items?.nature_of_inc || [])?.map((nature, idx) => (
                                        <Box key={idx} sx={{
                                            px: 1.4, py: 0.3, background: '#ede5f9', border: '1px solid #c6b6e9',
                                            borderRadius: '20px', fontSize: 11, fontWeight: 600, color: '#5d3a9c'
                                        }}>
                                            {nature}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            {/* FILES */}
                            {IncidentFiles?.length > 0 && (
                                <AttachedFilesCard
                                    onFileClick={onImageClick}
                                    incidentFiles={IncidentFiles}
                                    isShowDelete={false}
                                />
                            )}
                        </>
                    }
                </Box>


                {/* Action Detail */}
                {
                    (currentReview?.view === true || currentReview?.view === undefined) &&
                    // (currentEditItem || currentReview || level === "DMS") &&
                    <>
                        <Box sx={{
                            width: '100%',
                            bgcolor: 'var(--royal-purple-400)',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            py: 0.5,
                            px: 1,
                            mt: 2
                        }}>
                            <IncidentTextComponent text={`ACTIONS`} size={14} weight={600} color={"white"} />
                        </Box>

                        <IncidentReviewTable
                            data={items}
                            currentLevel={level}
                            setCorrectiveEdit={setCorrectiveEdit}
                            setPreventiveEdit={setPreventiveEdit}
                            setEvalutaionEdit={setEvalutaionEdit}
                            setRootCause={setRootCauseAnalysis}
                            setEdit={setRootCauseEdit}
                            setReview={isEditExits ? currentEditItem?.setReview : currentReview?.setReview}
                            setEditItem={setEditItem}
                            title={currentEditItem && currentEditItem?.title}
                            involvedDepartment={involvedDepartment}
                        />
                    </>
                }

                {/* INCIDENT DATA COLLECTION */}

                {
                    (currentReview?.view === true || currentReview?.view === undefined) &&
                    items?.dep_slno === empdept && level !== 'DDC' &&
                    ((level === 'INCHARGE' && items?.inc_incharge_reivew_state !== 'A') || (level === 'HOD' && items?.inc_hod_reivew_state !== 'A')) &&
                    < Box >
                        <IncidentDataCollection
                            items={items}
                            ismultipledep={ismultipledep}
                            updateMultipleSelect={updateMultipleSelect}
                            setIncDep={setIncDep}
                            datacollectionreamark={datacollectionreamark}
                            setDataCollectionRemark={setDataCollectionRemark}
                            department={incdep}
                            setIsMultipleDep={setIsMultipleDep}
                            selectedDeps={selectedDeps}
                            setSelectedDeps={setSelectedDeps}
                        />
                    </Box>
                }

                {
                    (currentReview?.view === true || currentReview?.view === undefined) &&
                    items && items?.inc_data_collection_req === 1 &&
                    <Box>
                        <IncidentDataCollectionPreview
                            involvedDepartment={involvedDepartment}
                            loading={loadinginvolveddepartment}
                        />
                    </Box>
                }

                {/* INCIDENT ACTION REQUIRED DETAIL */}
                {level === 'DAC' && <Box> <IncidentActionSubmit items={items} /></Box>}
                {
                    level === 'DMS' && items?.inc_current_level <= levelNo &&
                    <Box>
                        <IncidentAction
                            item={items}
                            DeparmentAction={departmentreqactions}
                        />
                    </Box>
                }

                {
                    departmentreqactions &&
                    departmentreqactions?.length !== 0 &&
                    <DepartmentActionDetail
                        isLoading={loadingDepartmentaction}
                        departmentAction={departmentreqactions} />
                }


                {
                    level === 'DDC' &&
                    <DataRequestDetail
                        setOpenModal={setOpenModal}
                        items={items}
                        setFormValues={setFormValues}
                        formValues={formValues}
                        open={open}
                        setOpen={setOpen}
                        setSaveDetail={setSaveDetail}
                        savedetail={savedetail}
                    />
                }
                <>
                    {level === 'DDC' &&
                        fishboneanalysisdata &&
                        fishboneanalysisdata?.length !== 0 &&
                        <FishboneQuestionPreview
                            data={fishboneanalysisdata}
                        />
                    }
                </>


                <Box>
                    {
                        isEditExits && currentEditItem && !currentEditItem?.disabled && (
                            <ReviewInput
                                title={currentEditItem?.title}
                                review={currentEditItem?.review}
                                setReview={currentEditItem?.setReview}
                            // level={level}
                            // disabled={currentEditItem?.disabled}
                            />
                        )}
                </Box>

                <Box>
                    {
                        rootcauseedit && (
                            <ReviewInput
                                title={'Root Cause Analysis'}
                                review={rootcauseanalysis}
                                setReview={setRootCauseAnalysis}
                            // level={level}
                            // disabled={currentReview?.disabled}
                            />
                        )}
                </Box>

                {
                    (rootcauseedit || (isEditExits && currentEditItem && !currentEditItem.disabled)) &&
                    <Box sx={{
                        display: 'flex', gap: 1
                    }}>
                        <ApprovalButton
                            size={12}
                            iconSize={17}
                            text={"Update changes"}
                            icon={IoIosSave}
                            onClick={handleEdits}
                        />

                        <ApprovalButton
                            size={12}
                            iconSize={17}
                            text={"Cancel"}
                            icon={MdOutlineFreeCancellation}
                            onClick={rootcauseedit ? () => setRootCauseEdit(false) : () => currentEditItem.state(false)}
                        />
                    </Box>
                }

                {/* Review Section */}
                {
                    !(items?.inc_incharge_reivew_state === null
                        && items?.inc_hod_reivew_state === null) &&
                    <>
                        <Box sx={{
                            width: '100%',
                            bgcolor: 'var(--royal-purple-400)',
                            py: 0.5,
                            px: 1,
                            mt: 2
                        }}>
                            <IncidentTextComponent text={"REVIEW DETAIL"} size={14} weight={600} color={"white"} />
                        </Box>
                        <ApprovalPreview
                            items={items}
                            onEdit={handleapprovalEdit}
                            levels={level}
                            isEdit={edit}
                            highlevelapprovals={highlevelapprovals}
                        />
                    </>
                }

                {/* Approval Preview */}
                {
                    reviewProps && currentReview &&
                    // currentReview?.disabled &&
                    <>

                        <Box sx={{
                            width: '100%',
                            bgcolor: 'var(--royal-purple-400)',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            py: 0.5, px: 1,
                            mt: 2
                        }}>
                            <IncidentTextComponent
                                text={`${level} LEVEL REVIEW`}
                                size={14}
                                weight={600}
                                color={"white"} />
                        </Box>
                        {
                            ((level === 'INCHARGE' && items?.inc_incharge_reivew_state !== "R") ||
                                (level === 'HOD' && items?.inc_hod_reivew_state !== 'R'))
                            &&
                            <>
                                < FishboneQuestionContainer
                                    setFormValues={setFormValues}
                                    formValues={formValues}
                                    open={open}
                                    setOpen={setOpen}
                                    setSaveDetail={setSaveDetail}
                                />

                                <FishboneQuestionPreview
                                    data={formValues}
                                    action={true}
                                    setOpen={setOpen}
                                    setSaveDetail={setSaveDetail}
                                />
                            </>
                        }
                    </>
                }

                {
                    level === "QUALITY" && items?.inc_qad_ack !== 1 &&
                    <Box sx={{ position: 'relative', mt: 2 }}>
                        <IncidentCategorySelect
                            selectedCategory={incidentcategory}
                            setSelectedCategory={setIncidentCategory}
                            selectedSubCategory={incidentsubcategory}
                            setSelectedSubCategory={setIncidentSubCategory}
                        />
                        <SACMatrixForm setSelectedItems={setSaxDetail} />
                    </Box>
                }
                {
                    items?.inc_sacmatrix_detail &&
                    <>
                        {/* SAC Matrix Visualization */}
                        <Box sx={{
                            width: '100%',
                            bgcolor: 'var(--royal-purple-400)',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            py: 0.5, px: 1,
                            mt: 2
                        }}>
                            <IncidentTextComponent
                                text={`SAC MATRIX VISUALIZATION`}
                                size={14}
                                weight={600}
                                color={"white"} />
                        </Box>
                        <SACMatrixResult
                            sacData={items?.inc_sacmatrix_detail}
                        />
                    </>
                }

                <Box>
                    {
                        currentReview && currentReview?.disabled && (
                            <ReviewInput
                                title={currentReview.title}
                                review={currentReview.review}
                                setReview={currentReview.setReview}
                            // level={level}
                            // disabled={currentReview?.disabled}
                            />
                        )}
                </Box>


                <Box>
                    {
                        (level === 'INCHARGE' || level === 'HOD')
                        && !items?.inc_rca && (items?.inc_incharge_ack === 0 && items?.inc_incharge_reivew_state !== 'A')
                        && (
                            <>
                                <ReviewInput
                                    title={'Root Cause Analysis'}
                                    review={rootcauseanalysis}
                                    setReview={setRootCauseAnalysis}
                                // level={level}
                                // disabled={currentReview?.disabled}
                                />

                            </>
                        )
                    }
                </Box>
                <Box>
                    {
                        level === 'HOD' &&
                        items?.inc_incharge_ack === 0 &&
                        items?.inc_hod_reivew_state !== 'R'
                        && (
                            <>
                                <ReviewInput
                                    title={'Corrective Action'}
                                    review={hodcorrectiveaction}
                                    setReview={setHodCorrectiveAction}
                                    level={level}
                                />

                            </>
                        )
                    }
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {approvalprocessing && <CustomeIncidentLoading text={`Submitting ${level} Review`} />}
                    {reviewProps && (
                        <InchargeApprovalDetail
                            incidentlevels={incidentlevels}
                            fetchAgain={fetchAgain}
                            setOpenModal={setOpenModal}
                            {...reviewProps}
                            item={items}
                            setEdit={setEdit}
                            isEdit={edit}
                            level={level}
                            title={currentReview?.title}
                            setApprovalLoading={setApprovalProcessing}
                            rca={rootcauseanalysis}
                            sasdetial={sasdetial}
                            incidentcategory={incidentcategory}
                            incidentsubcat={incidentsubcategory}
                            levelNo={levelNo}
                            formValues={formValues}
                            hodcorrectiveaction={hodcorrectiveaction}
                        />
                    )}
                </Box>

                {/* Modal component For image Preview*/}
                <ImagePreviewModal
                    open={openModal}
                    handleClose={() => setOpenViewModalModal(false)}
                    imageSrc={selectedImage}
                />
            </Suspense >
        </Box >
    );
};

export default memo(IncidentViewModal);
