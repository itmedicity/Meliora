import { Box, Tooltip } from '@mui/joy';
import React, { memo, useCallback, useState, lazy, Suspense, useEffect, useMemo } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedDuotone } from "react-icons/pi";

import {
    formatDateTime,
    handleImageClick,
    normalizeIncidentData
} from '../CommonComponent/CommonFun';

import {
    useDepartmentActions,
    useIncidentActionsMaster,
    useInvolvedDepartments
} from '../CommonComponent/useQuery';

import {
    checkActionRequestExist,
    checkDataCollection,
    checkFileUplod,
    checkFishboneForLevel,
    checkSacMatrix,
    checkUpperLevelApprovedForDDC,
    getFinalLevelActions,
    getInitiatorName,
    safeParse
} from '../CommonComponent/Incidnethelper';
import IncidentFlag from '../Components/IncidentFlag';
import RcaDetailCard from '../Components/RcaDetailCard';
import ComonApprovalPreview from '../IncidentCommonView/ComonApprovalPreview';


const CustomeIncidentLoading = lazy(() => import('../Components/CustomeIncidentLoading'));
const IncidentTextComponent = lazy(() => import('../Components/IncidentTextComponent'));
const IpPatientCard = lazy(() => import('../Components/IpPatientCard'));
const DisplayStaffDetail = lazy(() => import('../StaffDetail/DisplayStaffDetail'));
const DisplayVisitorDetail = lazy(() => import('../Components/DisplayVisitorDetail'));
const DisplayHospitalProperty = lazy(() => import('../Components/DisplayHospitalProperty'));
const AttachedFilesCard = lazy(() => import('../Components/AttachedFilesCard'));
const InchargeApprovalDetail = lazy(() => import('../ApprovalComponent/InchargeApprovalDetail'));
const ApprovalPreview = lazy(() => import('../ApprovalComponent/ApprovalPreview'));
const ImagePreviewModal = lazy(() => import('./ImagePreviewModal'));
const IncidentCategorySelect = lazy(() => import('../QualityDepartment/IncidentCategorySelect'));
const SACMatrixForm = lazy(() => import('../QualityDepartment/SACMatrixForm'));
const ReviewInput = lazy(() => import('../Components/ReviewInput'));
const IncidentReviewTable = lazy(() => import('../ApprovalComponent/IncidentReviewTable'));
const RegisterdUserCard = lazy(() => import('../Components/RegisterdUserCard'));
const IncidentDataCollection = lazy(() => import('../DatacollectionIncident/IncidentDataCollection'));
const IncidentDataCollectionPreview = lazy(() => import('../DatacollectionIncident/IncidentDataCollectionPreview'));
const SectionHeader = lazy(() => import('../Components/SectionHeader'));
const IncidentAction = lazy(() => import('../IncidentActions/IncidentAction'));
const DepartmentActionDetail = lazy(() => import('../IncidentActions/DepartmentActionDetail'));
const FishboneQuestionContainer = lazy(() => import('../FishBoneAnalysis/FishboneQuestionContainer'));
const IncidentActionSubmit = lazy(() => import('../IncidentActions/IncidentActionSubmit'));
const DataRequestDetail = lazy(() => import('../DatacollectionIncident/DataRequestDetail'));
const FishboneQuestionPreview = lazy(() => import('../FishBoneAnalysis/FishboneQuestionPreview'));
const SACMatrixResult = lazy(() => import('../QualityDepartment/SACMatrixResult'));
const NatureofIncidentInfoTag = lazy(() => import('../Components/NatureofIncidentInfoTag'));



const IncidentViewModal = ({
    loading,
    items,
    IncidentFiles,
    fetchAgain,
    setOpenModal,
    level,
    levelNo,
    highlevelapprovals,
    levelitems,
    levelactionreview,
    FinalIncidentLevels,
    CompanyName,
    CurrentYear
}) => {

    const { patientDetail, staffDetails, visitorDetail, propertyDetail } = normalizeIncidentData(items);
    const [approvalprocessing, setApprovalProcessing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openModal, setOpenViewModalModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [incdep, setIncDep] = useState([]);
    const [ismultipledep, setIsMultipleDep] = useState(false);
    const [selectedDeps, setSelectedDeps] = useState([]);
    const [datacollectionreamark, setDataCollectionRemark] = useState("");
    const [sasdetial, setSaxDetail] = useState({});
    const [incidentcategory, setIncidentCategory] = useState(null);
    const [incidentsubcategory, setIncidentSubCategory] = useState(null);
    const [actionReviews, setActionReviews] = useState({});
    // corrective Actions
    const [highLevelComments, setHighLevelComments] = useState({});
    const [expanded, setExpanded] = useState(true);
    const [open, setOpen] = useState(false);
    const [savedetail, setSaveDetail] = useState(false)
    const [expandaction, setExpandAction] = useState(true)


    const [formValues, setFormValues] = useState({
        MATERIAL: '',
        MACHINE: '',
        MAN: '',
        MILIEU: '',
        METHOD: '',
        MEASUREMENT: ''
    });

    // open modadl
    const onImageClick = useCallback((file) => {
        handleImageClick(file, setSelectedImage, setOpenViewModalModal)
    }, []); // common export for image viewing

    const {
        data: departmentreqactions,
        isLoading: loadingDepartmentaction
    } = useDepartmentActions(items?.inc_register_slno);

    const {
        data: involvedDepartment,
        isLoading: loadinginvolveddepartment
    } = useInvolvedDepartments(items?.inc_register_slno);


    const { data: incidentaction } = useIncidentActionsMaster();

    // Memoizing the Array Before Passing to Avoid Re rendering
    //1.Action
    const stableDepActions = useMemo(
        () => departmentreqactions || [],
        [departmentreqactions]
    );

    const stableHighLevelApprovals = useMemo(
        () => highlevelapprovals || [],
        [highlevelapprovals]
    );

    const InitiatorName = getInitiatorName(items?.inc_initiator_slno);
    const isFishBoneForthisLevel = checkFishboneForLevel(levelitems);
    const isDataCollectionRequest = checkDataCollection(levelitems);
    const isActionRequestExist = checkActionRequestExist(levelitems);
    const IsSacMatrixExist = checkSacMatrix(levelitems);
    const isFileUploadExist = checkFileUplod(levelitems);
    const FinalLevelAction = getFinalLevelActions(levelitems, level, levelactionreview);
    const CheckIsUpperLevelApprovedForDDC = checkUpperLevelApprovedForDDC(stableHighLevelApprovals, levelNo);



    const ActiveActions = useMemo(() => {
        return Array.isArray(incidentaction) ? incidentaction
            ?.filter(item => Number(item?.inc_action_item_stauts) === 1)
            : []
    }, [incidentaction]);

    // Checking is Rca Present
    const IsRcaPresent = Array.isArray(levelactionreview) && levelactionreview?.some(
        review =>
            review?.inc_action_name === "RCA"
    );

    // Handle RiskAnalysis Matrix Change
    const handleSACChange = useCallback((data) => {
        setSaxDetail(prev => {
            // prevent useless state updates
            if (JSON.stringify(prev) === JSON.stringify(data)) {
                return prev;
            }
            return data;
        });
    }, []);

    // Initialize dynamic review states once incidentlevels are fetched
    useEffect(() => {
        if (Array.isArray(FinalIncidentLevels) && FinalIncidentLevels?.length > 0) {
            const initialComments = FinalIncidentLevels?.reduce((acc, lvl) => {
                acc[lvl?.level_name] = "";
                return acc;
            }, {});
            setHighLevelComments(initialComments);
        }
    }, [FinalIncidentLevels]);

    // Dynamic setter
    const setHighLevelReview = (levelName, value) => {
        setHighLevelComments(prev => ({
            ...prev,
            [levelName]: value
        }));
    };

    // for selecting review dynamically
    const reviewProps = (() => {
        const currentLevelObj = FinalIncidentLevels?.find(
            lvl => lvl.level_name === level
        );
        if (!currentLevelObj) return null;
        // 1. Find actions for this level (may be 0)
        const levelActions = levelitems?.filter(
            item => item.level_name === level
        ) || [];

        // If edit = true → load item.review instead of highLevelComments[level]
        const reviewValue = edit && editItem
            ? editItem.review
            : highLevelComments[level];

        return {

            review: reviewValue,
            setReview: (val) => {
                // Update the main level review
                setHighLevelReview(level, val);
                // Update editItem only if editing
                if (edit) {
                    setEditItem(prev => ({
                        ...prev,
                        review: val
                    }));
                }
            },
            // 2. Actions array can be empty 
            actions: levelActions.length > 0
                ? levelActions.map(a => a.inc_action_name)
                : []
        };
    })();

    // Used for handle the Review for each levels
    const handleActionReviewChange = (slno, value) => {
        setActionReviews(prev => ({
            ...prev,
            [slno]: value
        }));
    };

    // Handle Approval Edits
    const handleapprovalEdit = useCallback((item) => {
        setEditItem(item)// store the review text to edit
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

    //Department Data Collection Requested
    const parsedDetails = safeParse(items?.data_collection_details);
    const IsCurrentLevelDataCollectionRequesetedAccepted =
        parsedDetails
            ?.filter(item =>
                Number(item?.level_no) === Number(levelNo) &&
                item.inc_dep_status === 0 &&
                item.inc_dep_status !== null &&
                item.section !== null)
            ?.every(item => Number(item.inc_dep_status) === 1)

    // For checking if Action requested already exist and also check if it was completed
    const IsCurrentLevelActionRequestAccepted =
        stableDepActions
            ?.filter(item =>
                item.inc_dep_action_status === 0 &&
                item.inc_dep_action_status !== null)
            ?.every(item => Number(item.inc_dep_action_status) === 1)

    return (

        <>
            <IncidentFlag
                code={`${CompanyName}${CurrentYear}/${items?.inc_register_slno}`}
                date={formatDateTime(items?.create_date, "dd/MM/yyyy hh:mm:ss a")}
            />
            {approvalprocessing && <CustomeIncidentLoading text={"Submitting Please Wait...!"} />}
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
                        }}>
                        {
                            // expanded &&
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
                                    <IncidentTextComponent
                                        text={items?.inc_describtion || "No description provided"}
                                        size={14}
                                        weight={400}
                                    />
                                </Box>

                                {/* CORRECTIVE ACTION */}
                                <Box sx={{ mt: 1 }}>
                                    <SectionHeader text="CORRECTIVE ACTION" />
                                    <IncidentTextComponent
                                        text={items?.inc_reg_corrective || "No Corrective provided"}
                                        size={14}
                                        weight={400}
                                    />
                                </Box>

                                {/* NATURE */}
                                <Box sx={{ mt: 1 }}>
                                    <SectionHeader text="NATURE OF INCIDENT" />
                                    <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                                        {(items?.nature_of_inc || [])?.map((nature, idx) => (
                                            <NatureofIncidentInfoTag key={idx} label={nature} />
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
                        // changed to dynaimic based on the action master
                        <>
                            <Box sx={{
                                width: '100%',
                                bgcolor: 'var(--royal-purple-400)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                py: 0.5,
                                px: 1,
                                mt: 2
                            }}>
                                <IncidentTextComponent text={`ACTIONS`}
                                    size={14} weight={600} color={"white"} />


                                <Tooltip title={expandaction ? 'Hide' : 'View'} variant="plain" size='sm'>
                                    <span onClick={() => setExpandAction((prev) => !prev)} style={{ cursor: 'pointer' }}>
                                        {expandaction ? (
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
                                    // border: '4px solid var(--rose-pink-400)',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderTop: 'none',
                                    borderBottomWidth: '4px',
                                    borderRadius: '20px / 15px',
                                    overflow: 'hidden',
                                    maxHeight: expandaction ? '1000px' : 0, // big enough to fit content
                                    transition: 'max-height 0.4s ease, opacity 0.4s ease',
                                    // opacity: expanded ? 1 : 0,
                                }}>

                                <IncidentReviewTable
                                    ActiveActions={ActiveActions}
                                    // involvedDepartment={involvedDepartment}
                                    LevelActionReveiw={levelactionreview || []}
                                />
                            </Box>
                        </>
                    }

                    {/* RCA DETAILS */}

                    {
                        IsRcaPresent &&
                        <RcaDetailCard
                            ActiveActions={ActiveActions}
                            LevelActionReveiw={levelactionreview || []}
                        />

                    }

                    {/* INCIDENT DATA COLLECTION */}

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

                    {
                        (
                            !CheckIsUpperLevelApprovedForDDC &&
                            level !== 'DDC' && isDataCollectionRequest) &&
                        (items?.inc_current_level < levelNo &&
                            (items?.inc_current_level_review_state === 'A' ||
                                items?.inc_current_level_review_state === null))
                        &&
                        <Box>
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
                                levelNo={levelNo}
                                involvedDepartment={involvedDepartment}
                            />
                        </Box>
                    }
                    {
                        level !== 'DDC' &&
                        items
                        && items?.inc_data_collection_req === 1
                        && involvedDepartment?.length > 0 &&
                        <Box>
                            <IncidentDataCollectionPreview
                                involvedDepartment={involvedDepartment}
                                loading={loadinginvolveddepartment}
                            />
                        </Box>
                    }

                    {/* INCIDENT ACTION REQUIRED DETAIL */}
                    {
                        level === 'DAC' &&
                        <IncidentActionSubmit
                            items={items}
                            setOpenModal={setOpenModal}
                        />
                    }

                    {
                        isActionRequestExist &&
                        items?.inc_current_level <= levelNo &&
                        <Box>
                            <IncidentAction
                                levelNo={levelNo}
                                item={items}
                                DeparmentAction={stableDepActions}
                            />
                        </Box>
                    }

                    {
                        !(level === 'REGISTERD USER') &&
                        stableDepActions?.length > 0 &&
                        <DepartmentActionDetail
                            isLoading={loadingDepartmentaction}
                            departmentAction={stableDepActions}
                        />
                    }

                    {/* Review Section */}
                    {
                        !(['DDC', 'DAC', 'REGISTERD USER', 'COMMON'].includes(level)) &&
                        stableHighLevelApprovals?.length > 0 &&
                        <ApprovalPreview
                            incidentlevels={FinalIncidentLevels}
                            levelNo={levelNo}
                            items={items}
                            onEdit={handleapprovalEdit}
                            levels={level}
                            isEdit={edit}
                            highlevelapprovals={stableHighLevelApprovals}
                        />
                    }
                    {
                        level === 'COMMON' &&
                        <ComonApprovalPreview
                            levels={level}
                            highlevelapprovals={stableHighLevelApprovals} />
                    }
                    {/* Approval Preview */}
                    {
                        IsCurrentLevelActionRequestAccepted &&
                        IsCurrentLevelDataCollectionRequesetedAccepted &&
                        !(['REGISTERED USER', 'DDC', 'DAC'].includes(level)) &&
                        (items?.inc_current_level < levelNo &&
                            (items?.inc_current_level_review_state === 'A' ||
                                items?.inc_current_level_review_state === null))
                        &&
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
                                    text={`${level} REVIEW`}
                                    size={14}
                                    weight={600}
                                    color={"white"} />
                            </Box>
                            {
                                isFishBoneForthisLevel &&
                                (
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
                                )}



                            {
                                IsSacMatrixExist &&
                                !(items?.inc_sacmatrix_detail) &&
                                <Box sx={{ position: 'relative', mt: 2 }}>
                                    <IncidentCategorySelect
                                        selectedCategory={incidentcategory}
                                        setSelectedCategory={setIncidentCategory}
                                        selectedSubCategory={incidentsubcategory}
                                        setSelectedSubCategory={setIncidentSubCategory}
                                    />
                                    <SACMatrixForm
                                        setSelectedItems={handleSACChange}
                                    // setSelectedItems={setSaxDetail}
                                    />
                                </Box>
                            }

                            {/* New */}
                            {
                                (items?.inc_current_level < levelNo &&
                                    (items?.inc_current_level_review_state === 'A' ||
                                        items?.inc_current_level_review_state === null)) &&
                                IsCurrentLevelDataCollectionRequesetedAccepted &&
                                IsCurrentLevelActionRequestAccepted &&
                                FinalLevelAction?.map(action => (
                                    <ReviewInput
                                        key={action?.inc_level_item_slno}
                                        title={action?.inc_action_name}
                                        review={actionReviews[action?.inc_action_slno] || ""}
                                        setReview={(val) => handleActionReviewChange(action?.inc_action_slno, val)}
                                    />
                                ))
                            }
                            {/* custome File upload */}



                        </>
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
                                    text={`RISK MATRIX VISUALIZATION`}
                                    size={14}
                                    weight={600}
                                    color={"white"} />
                            </Box>
                            <SACMatrixResult
                                sacData={items?.inc_sacmatrix_detail}
                            />
                        </>
                    }


                    <Box sx={{ position: 'relative' }}>
                        {
                            IsCurrentLevelActionRequestAccepted &&
                            IsCurrentLevelDataCollectionRequesetedAccepted && (
                                edit || (
                                    (items?.inc_current_level < levelNo &&
                                        (items?.inc_current_level_review_state === 'A' ||
                                            items?.inc_current_level_review_state === null)) &&
                                    reviewProps
                                )
                            )
                            &&

                            (
                                <InchargeApprovalDetail
                                    incidentlevels={FinalIncidentLevels}
                                    fetchAgain={fetchAgain}
                                    setOpenModal={setOpenModal}
                                    {...reviewProps}
                                    item={items}
                                    setEdit={setEdit}
                                    isEdit={edit}
                                    level={level}
                                    setApprovalLoading={setApprovalProcessing}
                                    processing={approvalprocessing}
                                    sasdetial={sasdetial}
                                    incidentcategory={incidentcategory}
                                    incidentsubcat={incidentsubcategory}
                                    formValues={formValues}
                                    //new
                                    actionReviews={actionReviews}
                                    isFishBoneForthisLevel={isFishBoneForthisLevel}
                                    currentLevelActions={FinalLevelAction}
                                    IsSacMatrixExist={IsSacMatrixExist}
                                    levelNo={levelNo}
                                    reviewEdit={editItem}
                                    isFileUploadExist={isFileUploadExist}
                                    IncidentFiles={IncidentFiles}
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
        </>

    );
};

export default memo(IncidentViewModal);
