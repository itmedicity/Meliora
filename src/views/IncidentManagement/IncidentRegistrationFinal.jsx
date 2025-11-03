import { Box, Card, CardCover, Chip, Skeleton, Tooltip, Typography } from '@mui/joy';
import React, { memo, useCallback, useEffect, useState, Suspense, lazy } from 'react';
import { employeeNumber, innerHeight } from '../Constant/Constant';
import { TbListDetails } from "react-icons/tb";
import { MdOutlineAssignment, MdOutlineReportProblem, MdLabel, MdDeleteOutline } from "react-icons/md";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MonochromePhotosTwoToneIcon from '@mui/icons-material/MonochromePhotosTwoTone';
import { infoNotify, succesNotify, warningNotify } from '../Common/CommonCode';
import {
    relatedOptions,
    staffDetail,
    symbolToLabel,
    textAreaStyle,
} from './CommonComponent/CommonCode';
import { axioslogin } from '../Axios/Axios';
import { getFamilyDetails, handleImageClick, handleImageUpload, normalizeIncidentData } from './CommonComponent/CommonFun';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { useQuery } from '@tanstack/react-query';
import { getDefaultDataCollectionDeparment, getEmployeeType } from '../Master/IncidentManagement/CommonCode/IncidentCommonCode';
// import AnimatedActionButton from './Components/AnimatedActionButton';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// Lazy loaded components
const IncidentTextComponent = lazy(() => import('./Components/IncidentTextComponent'));
const RelatedToCard = lazy(() => import('./Components/RelatedToCard'));
const IncidentStepper = lazy(() => import('./Components/IncidentStepper'));
const AddButton = lazy(() => import('./ButtonComponent/AddButton'));
const PatientFilter = lazy(() => import('./Components/PatientFilter'));
const IncidentDescriptionCard = lazy(() => import('./Components/IncidentDescriptionCard'));
const CardHeader = lazy(() => import('./Components/CardHeader'));
const StepCompletedCard = lazy(() => import('./Components/StepCompletedCard'));
const UndoComponent = lazy(() => import('./ButtonComponent/UndoComponent'));
const SelectNatureOfIncident = lazy(() => import('./Components/SelectNatureOfIncident'));
const IncidentCreatorTag = lazy(() => import('./Components/IncidentCreatorTag '));
const IpPatientCard = lazy(() => import('./Components/IpPatientCard'));
const DisplayVisitorDetail = lazy(() => import('./Components/DisplayVisitorDetail'));
const DisplayHospitalProperty = lazy(() => import('./Components/DisplayHospitalProperty'));
const IncidentFileUpload = lazy(() => import('./Components/IncidentFileUpload'));
const ImagePreviewModal = lazy(() => import('./IncidentModals/ImagePreviewModal'));
const StepTwoContent = lazy(() => import('./Components/StepTwoContent'));
const FloatingBackButton = lazy(() => import('./ButtonComponent/FloatingBackButton'));
const CustomeIncidentLoading = lazy(() => import('./Components/CustomeIncidentLoading'));
const AttachedFilesCard = lazy(() => import('./Components/AttachedFilesCard'));
const StaffCard = lazy(() => import('./StaffDetail/StaffCard'));
const DisplayStaffDetail = lazy(() => import('./StaffDetail/DisplayStaffDetail'));


const IncidentRegistrationFinal = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const incidentData = location.state?.incidentData;
    const Files = location.state?.files || [];
    const IncidentEditing = location.state?.isEdit;


    // Department and Department Section of Loggin User
    const { empdept, empsecid } = useSelector(state => {
        return state.LoginUserData
    });

    // fetch current employee type (Clinical and Non Clinical)
    const { data: empDeptType } = useQuery({
        queryKey: ['emptype', empdept],
        queryFn: () => getEmployeeType(empdept),
        enabled: !!empdept,
        select: (data) => data?.[0]?.dept_type, // just pick what you need
    });

    const { data: getemployeedepartmenttype } = useQuery({
        queryKey: ['empdeptype', empDeptType],
        queryFn: () => getDefaultDataCollectionDeparment(empDeptType),
        enabled: !!empDeptType,
    });

    const { patientDetail, staffDetails, visitorDetail, propertyDetail } = normalizeIncidentData(incidentData);


    // const FinalDepartmentDataCollection = getemployeedepartmenttype && [
    //     ...getemployeedepartmenttype,
    //     { dept_id: empdept }
    // ];


    const [relatedto, setRelatedTo] = useState(false);
    const [ispatientdetail, setIsPatientDetail] = useState(false);
    const [isdescadded, setIsDescAdded] = useState(false);
    const [currentstep, setCurrentStep] = useState(0);
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [incidentdescription, setIncidentDescription] = useState("");
    const [searchkeyword, setSearchKeyword] = useState("");
    const [isincidentnature, setIsIncidentNature] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isfileuploadexist, setIsFileUploadExist] = useState(false)
    const [isloadingdetail, setIsLoadingDetail] = useState(false);
    const [formData, setFormData] = useState({});
    const [getDetail, setGetDetail] = useState(false);
    const [formsubmitting, setFormSubmitting] = useState(false)

    // visitor data
    const [visitordata, setVisitorData] = useState([]);
    const [isvistoredit, setIsVisitorEdit] = useState(false);

    //hospital preoperyht
    const [ishpedit, setIsHpedit] = useState(false);
    const [hpdetail, setHpDetail] = useState([]);

    //Patient data
    const [ptdetail, setPtDetail] = useState([]);
    const [iseditdata, setIsEditData] = useState(false);

    //staff data
    const [selectstaff, setSelectStaff] = useState('');
    const [staffdetail, setStaffDetail] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // image data
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [tempFiles, setTempFiles] = useState([]);


    const InitiatorName = incidentData?.inc_initiator_slno === 1 ?
        'P' : incidentData?.inc_initiator_slno === 2 ?
            'S' : incidentData?.inc_initiator_slno === 3 ?
                'V' : 'HP';


    // For conditionally loading the skeleton component if no data is present
    const isLoading = selectedSymbol === null || !relatedto;
    /* for TracKing if the  Steps of Incident Registration Has Completed */
    const isCompletedFirstStep = selectedSymbol != null && !isLoading && relatedto && currentstep >= 1;
    const isCompletedSecondStep = ispatientdetail && currentstep >= 2;
    const isCompletedThirdStep = isincidentnature && currentstep >= 3;
    const isCompletedFourthStep = isdescadded && incidentdescription && currentstep >= 4;
    const isFileuploadCompleted = isfileuploadexist && currentstep >= 5 && uploadedFiles?.length > 0;


    useEffect(() => {
        if (!incidentData) return; //  do nothing if undefined

        if (incidentData?.file_status === 0) {
            setCurrentStep(4)
        } else {
            setCurrentStep(5)
            setUploadedFiles(Files)
        }
        if (incidentData?.inc_initiator_slno === 1) {
            setPtDetail([patientDetail])
        } else if (incidentData?.inc_initiator_slno === 2) {
            setStaffDetail([staffDetails])
        } else if (incidentData?.inc_initiator_slno === 3) {
            setVisitorData([visitorDetail])
        } else {
            setHpDetail(propertyDetail)
        }
        setIncidentDescription(incidentData?.inc_describtion);
        setIsIncidentNature(true)
        setSelectedCategories(incidentData?.nature_of_inc);
        setSelectedSymbol(InitiatorName);
        setRelatedTo(true)
        setIsDescAdded(true)
        setIsPatientDetail(true)
    }, [incidentData, Files])

    const isImage = (file) => {
        return file?.type?.startsWith("image/") || file?.blob?.type?.startsWith("image/");
    };


    const handleMultiSelect = (symbol) => {
        setSelectedCategories((prev) =>
            prev.includes(symbol)
                ? prev.filter((s) => s !== symbol)
                : [...prev, symbol]
        );
    };

    // Image Preview
    const handleImagePreview = useCallback((file) => {
        handleImageClick(file, setSelectedImage, setOpenModal); // common export for image viewing
    }, []);

    const AddPatientDetailAdding = useCallback(() => {
        setIsPatientDetail(prev => !prev);
        if (!ispatientdetail) {
            setCurrentStep((prev) => prev + 1)
        }
    }, [ispatientdetail]);

    // Function to remove the selected images
    const hanldeRemoveFiles = useCallback((index) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles?.splice(index, 1);
        setUploadedFiles(updatedFiles);
    }, [uploadedFiles]);

    const AddNatureOfIncident = useCallback(() => {
        if (selectedCategories?.length === 0) return warningNotify("Select Nature of Incident")
        setCurrentStep((prev) => prev + 1)
        setIsIncidentNature(true)
    }, [selectedCategories]);

    // Creating Incident Descriptions
    const AddIncidentDescription = useCallback(() => {
        if (incidentdescription?.length === 0) return warningNotify("Please enter the Description");
        if (incidentdescription?.length < 5) return infoNotify("Atlease 6 charcter Needed");
        setIsDescAdded(true);
        if (!isdescadded && incidentdescription?.length > 0) {
            setCurrentStep((prev) => prev + 1)
        }
    }, [isdescadded, incidentdescription]);


    // File Attachments
    const AttachFile = useCallback(() => {
        setIsFileUploadExist(true)
        setCurrentStep((prev) => prev + 1)
        setUploadedFiles(prev => [...prev, ...tempFiles]);
        setTempFiles([]);
    }, [tempFiles]);

    //Handle Edit in the PatientData
    const HanldePatientDetailEdit = useCallback(() => {
        setIsEditData(false)
    }, [])

    const HandleVisitorEdit = useCallback(() => {
        setVisitorData([])
        setIsVisitorEdit(false)
    }, [])

    const HandleHpEdit = useCallback(() => {
        setIsHpedit(false)
    }, [])

    // Handle Employee Type Select
    const handleSelect = useCallback((value) => {
        setSelectStaff(prev => (prev === value ? '' : value));
        if (selectstaff === '') {
            setStaffDetail([])
        };
    }, [selectstaff, setStaffDetail, setIsEditData]);


    // back button functionatility
    const hanldeBackFun = useCallback(() => {
        if (IncidentEditing) {
            navigate("/Home/IncidentList");
        } else {
            setCurrentStep((prev) => prev - 1);
            if (currentstep === 1) {
                setRelatedTo(false);
                resetAllDetails();
                setSelectedSymbol(null);
            }
        }
    }, [currentstep, IncidentEditing, navigate]);

    const getSetState = () => {
        const label = symbolToLabel[selectedSymbol];
        if (label === "Visitors") return setIsVisitorEdit;
        if (label === "Hospital Properties") return setIsHpedit;
        return setIsEditData;
    };

    // reseting all fields
    const resetAllDetails = () => {
        setIsHpedit(false)
        setIsEditData(false);
        setIsVisitorEdit(false)
        setPtDetail([]);
        setStaffDetail([]);
        setHpDetail([]);
        setVisitorData([]);
        setSearchKeyword("")
        setUploadedFiles([])
        setIncidentDescription("")
        setSelectedCategories([]) // nature of incident
        setRelatedTo(false)
    }

    // Hanlde Searching Detail
    const HandleSearchDetail = useCallback(async () => {
        if (searchkeyword === "") return warningNotify("Please enter the id");
        const type = symbolToLabel[selectedSymbol];
        setGetDetail(false);
        setPtDetail([])
        setStaffDetail([])
        setIsLoadingDetail(true);
        setFormData({})

        // Helper Function for Api calls Based on the corresponding EndPoints
        const fetchAndSetData = async (url, payload, setData, emptyMsg) => {
            const { data, success } = (await axioslogin.post(url, payload)).data;
            if (success === 2 && data?.length) {
                setData([data[0]]);
            } else {
                setData([]);
                warningNotify(emptyMsg);
            }
        };
        try {
            if (type === "Staff") {
                const staffApiMap = {
                    PG: "/incidentMaster/gethspgstaff",
                    HS: "/incidentMaster/gethspgstaff",
                    "Hospital Staff": "/hrmdataGet/getStaffdetail",
                    default: "/incidentMaster/getpssstaff"
                };
                const apiEndpoint = staffApiMap[selectstaff] || staffApiMap.default;
                await fetchAndSetData(apiEndpoint, { em_no: searchkeyword }, setStaffDetail, "No Staff Record Found");
            } else {
                const result = await getFamilyDetails(searchkeyword);
                if (result?.length > 0) {
                    setPtDetail(result)
                    setFormData(result?.[0])
                } else {
                    setPtDetail([])
                    setFormData({})
                }
            }
        } catch (error) {
            warningNotify("Error in fetching Patinet Data...!")
        } finally {
            setIsLoadingDetail(false);
        }
    }, [setIsLoadingDetail, iseditdata, setStaffDetail, staffDetail, symbolToLabel, searchkeyword, selectstaff]);


    // hanlde who Caused the Incident
    const HanldeIncidentInitiatorSelect = (newSymbol) => {
        const isUnselecting = selectedSymbol === newSymbol;
        const updatedSymbol = isUnselecting ? null : newSymbol;
        setSelectedSymbol(updatedSymbol);
        if (!isUnselecting) {
            resetAllDetails();      // called when selecting
            setGetDetail(false);    // update flag
            if (!relatedto && updatedSymbol !== null) {
                setRelatedTo(prev => !prev);
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const incidentInitiator = symbolToLabel[selectedSymbol];

    // for testing puprose remove this after that 
    const InitiatorSlno = incidentInitiator === "Patient" ? 1 : incidentInitiator === "Staff" ? 2 : incidentInitiator === "Visitors" ? 3 : 4;
    const staffSlno = selectstaff === "HS" ? 1 : selectstaff === "PG" ? 2 : selectstaff === "Hospital Staff" ? 3 : 4;
    const InitiatorDtl = incidentInitiator === "Patient" ? ptdetail : incidentInitiator === "Staff" ? staffdetail : incidentInitiator === "Visitors" ? visitordata : hpdetail;




    // Hanlde Registartions
    const HanldeIncidentRegistration = useCallback(async () => {
        setFormSubmitting(true)
        try {
            // Step 1: Register incident (no files yet)
            const incidentPostdata = {
                inc_initiator_slno: InitiatorSlno,
                inc_staff_type_slno: incidentInitiator === "Staff" ? staffSlno : null,
                nature_of_inc: selectedCategories,
                inc_describtion: incidentdescription,
                file_status: uploadedFiles.length > 0 ? 1 : 0,
                inc_status: 1,
                create_user: employeeNumber(),
                inc_initiator_dtl: InitiatorDtl,
                dep_slno: empdept,
                sec_slno: empsecid,
                inc_incharge_approval: 0,
                inc_hod_approval: 0,
                departments: getemployeedepartmenttype,
                status: 1,
                remark: "Default Registration Remarks",
                createUser: employeeNumber(),
                requested_department: empsecid,
                inc_data_collection_req: 1
            };

            const registerResult = await axioslogin.post('/incidentMaster/incregistration', incidentPostdata);
            const { success, message, insertId } = registerResult.data;

            if (success !== 2) {
                warningNotify(message || "Incident registration failed");
                return;
            }

            // Step 2: If there are files, upload them separately
            if (uploadedFiles?.length > 0) {
                const formData = new FormData()
                formData.append('id', insertId)
                for (const file of uploadedFiles) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file)
                        formData.append('files', compressedFile, compressedFile.name)
                    } else {
                        formData.append('files', file, file.name)
                    }
                }
                const uploadResult = await axioslogin.post('/incidentMaster/uploadFiles', formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (uploadResult.data.success !== 1) {
                    warningNotify(uploadResult.data.message || "File upload failed");
                    return;
                }
            }
            // Success — move to next step
            succesNotify(message);
            setCurrentStep(0);
            resetAllDetails();
            setSelectedSymbol(null);
        } catch (error) {
            warningNotify("Error during incident registration");
        } finally {
            setFormSubmitting(false)
        }
    }, [InitiatorSlno, incidentInitiator, staffSlno, selectedCategories, incidentdescription, uploadedFiles, handleImageUpload, resetAllDetails, empdept, empsecid, getemployeedepartmenttype]);


    // Hanlde Updation
    const HandleIncidentUpdation = useCallback(async () => {
        setFormSubmitting(true)
        try {
            // Step 1: Upadte incident (no files yet)
            const incidentPostdata = {
                nature_of_inc: selectedCategories,
                inc_describtion: incidentdescription,
                file_status: uploadedFiles.length > 0 ? 1 : 0,
                inc_status: 1,
                edit_user: employeeNumber(),
                inc_register_slno: incidentData?.inc_register_slno
            };

            const registerResult = await axioslogin.post('/incidentMaster/incidentupdation', incidentPostdata);
            const { success, message } = registerResult.data;

            if (success !== 2) {
                warningNotify(message || "Incident registration failed");
                return;
            }

            // Step 2: If there are files, upload them separately
            if (uploadedFiles?.length > 0) {
                const formData = new FormData();
                formData.append("id", incidentData?.inc_register_slno);

                // final kept file names (only strings)
                const keptFileNames = uploadedFiles
                    .filter(f => f?.imageName) // only objects with imageName
                    .map(f => f?.imageName);

                formData.append("keptFiles", JSON.stringify(keptFileNames));

                // add new files (still under "files")
                for (const file of uploadedFiles) {
                    if (file instanceof File) {
                        if (file.type.startsWith("image")) {
                            const compressedFile = await handleImageUpload(file);
                            formData.append("files", compressedFile, compressedFile.name);
                        } else {
                            formData.append("files", file, file.name);
                        }
                    }
                }
                const updatedFiles = await axioslogin.post("/incidentMaster/uploadFiles", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (updatedFiles.data.success !== 1) {
                    warningNotify(updatedFiles.data.message || "File upload failed");
                    return;
                }
            }
            // Success — move to next step
            succesNotify(message);
            navigate("/Home/IncidentList");
        } catch (error) {
            warningNotify("Error during incident registration");
        } finally {
            setFormSubmitting(false)
        }
    }, [selectedCategories, incidentdescription, uploadedFiles, handleImageUpload, resetAllDetails])

    return (
        <Box sx={{
            width: '100%',
            minHeight: innerHeight * 85 / 100,
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'space-between',

        }}>
            {formsubmitting && <CustomeIncidentLoading text={"Submitting Form Please Wait...!"} />}

            <Box sx={{
                width: '30%',
                height: '100%',
                position: 'relative'
            }}>
                <Box sx={{
                    p: 2,
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                    border: '1px solid #e0e0e0',
                    position: 'relative'
                }}>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                        <AppRegistrationIcon color={'#403d3dff'} />
                        <IncidentTextComponent text={"INCIDENT REGISTRATION"} color={'#403d3dff'} size={18} weight={600} />

                        {
                            currentstep >= 1 && (
                                <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                    <FloatingBackButton
                                        onClick={hanldeBackFun}
                                    />
                                </Suspense>
                            )}

                    </Box>
                    {
                        (relatedto && isCompletedFirstStep) ? <StepCompletedCard
                            step={1}
                            text={"Registerd Incident Initiator"}
                            subtext={"Selecting the Individual Who created the Incident"}
                        /> : (
                            <>
                                <IncidentTextComponent text={"1.Incident Related to"} color={'#403d3dff'} size={18} weight={600} />
                                {
                                    !relatedto && !isCompletedFirstStep &&
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                                        {relatedOptions?.map(({ label, symbol }) => (
                                            <Suspense key={symbol} fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                                <RelatedToCard
                                                    clearfunction={resetAllDetails}
                                                    label={label}
                                                    symbol={symbol}
                                                    selected={selectedSymbol === symbol}
                                                    onSelect={HanldeIncidentInitiatorSelect}
                                                    multiple={false}
                                                    setGetDetail={setGetDetail}
                                                />
                                            </Suspense>
                                        ))}
                                    </Box>
                                }
                            </>
                        )
                    }
                    {/* search the detail of Target (patient ,visitor or staff) */}
                    {
                        currentstep >= 1 &&
                        <Box sx={{ position: 'relative' }}>
                            {
                                isCompletedSecondStep ?
                                    <StepCompletedCard
                                        step={2}
                                        text={"Added Detail of the Initiator "}
                                        subtext={"Include identifying or contextual details about the person who raised the incident"} />
                                    :
                                    (
                                        <Box sx={{ p: 2, position: 'relative' }}>
                                            <IncidentTextComponent
                                                text={`2. Add ${symbolToLabel[selectedSymbol]} Information`}
                                                color="#403d3dff"
                                                size={18}
                                                weight={600}
                                            />
                                            {
                                                symbolToLabel[selectedSymbol] === "Staff"
                                                &&
                                                <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                                    <StaffCard selected={selectstaff} onSelect={handleSelect} />
                                                </Suspense>
                                            }

                                            {/* search input (if needed) */}
                                            {(symbolToLabel[selectedSymbol] === "Staff" && selectstaff !== "") ||
                                                symbolToLabel[selectedSymbol] === "Patient" && !iseditdata ? (
                                                <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                                    <PatientFilter
                                                        onChange={setSearchKeyword}
                                                        onClick={HandleSearchDetail}
                                                        value={searchkeyword}
                                                        placeholder={symbolToLabel[selectedSymbol] === "Staff" ? "Enter Staff Id" : "Enter MRD Number'"}
                                                    />
                                                </Suspense>
                                            ) : null}

                                            <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                                <StepTwoContent
                                                    isloadingdetail={isloadingdetail}
                                                    symbolToLabel={symbolToLabel}
                                                    selectedSymbol={selectedSymbol}
                                                    iseditdata={iseditdata}
                                                    isvistoredit={isvistoredit}
                                                    ishpedit={ishpedit}
                                                    ptdetail={ptdetail}
                                                    staffdetail={staffdetail}
                                                    visitordata={visitordata}
                                                    hpdetail={hpdetail}
                                                    formData={formData}
                                                    setFormData={setFormData}
                                                    setPtDetail={setPtDetail}
                                                    setIsEditData={setIsEditData}
                                                    setVisitorData={setVisitorData}
                                                    setIsVisitorEdit={setIsVisitorEdit}
                                                    setHpDetail={setHpDetail}
                                                    setIsHpedit={setIsHpedit}
                                                    selectstaff={selectstaff}
                                                    getDetail={getDetail}
                                                    HanldePatientDetailEdit={HanldePatientDetailEdit}
                                                    HandleVisitorEdit={HandleVisitorEdit}
                                                    HandleHpEdit={HandleHpEdit}
                                                />
                                            </Suspense>
                                            {
                                                (
                                                    (ptdetail?.length > 0 && iseditdata) ||
                                                    (staffdetail?.length > 0) ||
                                                    (visitordata?.length > 0 && isvistoredit) ||
                                                    (hpdetail?.length > 0 && ishpedit)
                                                ) && (
                                                    <AddButton
                                                        onClick={AddPatientDetailAdding}
                                                        label="Add"
                                                        disable={currentstep > 2}
                                                    />
                                                )
                                            }
                                        </Box>
                                    )}
                        </Box>
                    }

                    {/* Add Nature of the Incident */}
                    {
                        currentstep >= 2 &&
                        <Box sx={{ mt: 2, position: 'relative' }}>
                            {
                                isCompletedThirdStep ? <StepCompletedCard
                                    step={3}
                                    text={"Selected Nature of the Incident "}
                                    subtext={"The category or categories chosen that best describe the type of incident."} /> : (
                                    <>
                                        <IncidentTextComponent
                                            text={`3.Select Nature of the Incident`}
                                            color={'#403d3dff'}
                                            size={16}
                                            weight={600}
                                        />
                                        <SelectNatureOfIncident handleMultiSelect={handleMultiSelect} selectedCategories={selectedCategories} />
                                        <AddButton onClick={AddNatureOfIncident} label={"Add"} />
                                    </>
                                )
                            }
                        </Box>
                    }



                    {/* Add Incident Description */}
                    {
                        currentstep >= 3 &&
                        <Box sx={{ mt: 1, position: 'relative' }}>
                            {
                                isCompletedFourthStep ? <StepCompletedCard
                                    step={4}
                                    text={"Added Description About the Incident "}
                                    subtext={"Describe the incident thoroughly, including relevant facts, timeline, and circumstances."} /> :
                                    (
                                        <>
                                            <IncidentTextComponent text={"4.Add Incident Description"} color={'#403d3dff'} size={18} weight={600} />
                                            <textarea
                                                placeholder="Enter text here"
                                                value={incidentdescription}
                                                onChange={(e) => setIncidentDescription(e.target.value)}
                                                rows={4}
                                                style={textAreaStyle}
                                                onFocus={(e) => {
                                                    e.target.style.outline = 'none';
                                                    e.target.style.boxShadow = 'none';
                                                    e.target.style.border = '1.5px solid #d8dde2ff';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.border = '1.5px solid #d8dde2ff';
                                                }}
                                            />
                                            <AddButton onClick={AddIncidentDescription} label="Add" disable={!incidentData && currentstep > 3} />
                                        </>
                                    )}
                        </Box>
                    }

                    {/* Upload Files */}
                    {currentstep >= 4 && (
                        <Box sx={{ width: '100%', position: 'relative' }}>
                            {
                                isFileuploadCompleted ? <StepCompletedCard
                                    step={4}
                                    text={"Added Images Related to Incident "}
                                    subtext={"Images uploaded for reference and context."} /> :
                                    <>
                                        <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                            <IncidentFileUpload files={tempFiles} setFiles={setTempFiles} />
                                        </Suspense>
                                        {tempFiles?.length > 0 && <AddButton onClick={AttachFile} label={"Add"} />}
                                    </>
                            }
                        </Box>
                    )}
                </Box>
            </Box>

            {/* This part for the detail confirmation part */}
            <Box sx={{
                width: '69%',
                bgcolor: 'white',
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 5,
                position: 'relative'
            }}>


                {/*1. The stepper component track the Progess of the Form Submission */}
                <IncidentStepper currentstep={currentstep} Images={uploadedFiles} IncidentEditing={IncidentEditing} />
                {/* ends stepper */}

                {/*2.Describe who made the Incident */}
                <Box sx={{
                    width: '100%',
                    gap: 1,
                    p: 1,
                    borderRadius: 5,
                    mt: 5,
                    border: '1.5px solid #d8dde2ff',
                    position: 'relative',
                    animation: 'fadeIn 0.5s ease-in'
                }}>
                    {isLoading ? (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Skeleton variant="circular" width={18} height={18} />
                                <Skeleton variant="text" width="30%" height={20} />
                            </Box>
                            <Skeleton variant="text" width="50%" height={26} />
                        </>
                    ) : (
                        <>
                            {
                                IncidentEditing && currentstep === 1 &&
                                <UndoComponent
                                    reset={true}
                                    resetAllDetails={resetAllDetails}
                                    condition={true}
                                    setState={setIsEditData}
                                    setValue={setRelatedTo}
                                />
                            }
                            <CardHeader icon={MdOutlineAssignment} text="The Incident Related to" />
                            <IncidentCreatorTag creatorType={symbolToLabel[selectedSymbol] || 'Not Selected'} />
                        </>
                    )}
                </Box>
                {/*2.ends Here */}

                {/* 3. The Detail of the Indivdual who Cause the Incident May be Patient Staff or Visitor */}
                {
                    currentstep >= 2 &&
                    <Box sx={{
                        width: '100%',
                        border: '1.5px solid #d8dde2ff',
                        borderRadius: 5,
                        gap: 1,
                        mt: 1,
                        p: 1,
                        position: 'relative',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        {
                            IncidentEditing && currentstep === 2 && <UndoComponent condition={true} setState={getSetState()} setValue={setIsPatientDetail} />
                        }
                        <CardHeader icon={TbListDetails} text={
                            symbolToLabel[selectedSymbol] === "Patient" ? "In-Patient Overview" : symbolToLabel[selectedSymbol] === "Staff" ? "Staff Overview" : symbolToLabel[selectedSymbol] === "Visitors" ? 'Visitor Overview' : 'Property Overview'
                        } />
                        <Box
                            sx={{
                                width: '100%',
                                minHeight: 160,
                                p: 1,
                                display: 'flex'
                            }}>
                            {
                                (symbolToLabel[selectedSymbol] === "Patient" || incidentData?.inc_initiator_slno === 1) ? (
                                    <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                        <IpPatientCard data={ptdetail?.[0]} />
                                    </Suspense>
                                ) : (symbolToLabel[selectedSymbol] === "Staff" || incidentData?.inc_initiator_slno === 2) ? (
                                    <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                        <DisplayStaffDetail data={staffdetail?.[0]} />
                                    </Suspense>
                                ) : (symbolToLabel[selectedSymbol] === "Visitors" || incidentData?.inc_initiator_slno === 3) ? (
                                    <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                        <DisplayVisitorDetail visitorDetail={visitordata?.[0]} />
                                    </Suspense>
                                ) : (
                                    <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                        <DisplayHospitalProperty propertyDetail={hpdetail} />
                                    </Suspense>
                                )
                            }
                            <Box>
                            </Box>
                        </Box>
                    </Box>
                }
                {/*3.ends Here */}


                {/*4. Nature of the Incident */}
                {
                    currentstep >= 3 &&
                    <Box sx={{
                        width: '100%',
                        gap: 1,
                        p: 1,
                        borderRadius: 5,
                        mt: 1,
                        border: '1.5px solid #d8dde2ff',
                        position: 'relative'
                    }}>
                        {IncidentEditing && <UndoComponent condition={false} setValue={setIsIncidentNature} />}

                        <CardHeader icon={MdOutlineReportProblem} text="The Nature of the Incident" />
                        {
                            selectedCategories?.length > 0 ? (
                                <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    gap={1.2}
                                    mt={1}
                                    sx={{ animation: 'fadeIn 0.5s ease-in' }}
                                >
                                    {selectedCategories?.map((item, idx) => (
                                        <Chip
                                            key={idx}
                                            variant="soft"
                                            color="primary"
                                            startDecorator={<MdLabel size={16} />}
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                backgroundColor: 'var(--royal-purple-50)',
                                                color: '#7c3aed',
                                                px: 1.8,
                                                py: 0.25,
                                                borderRadius: 'lg',
                                                boxShadow: '0 2px 6px rgba(124, 81, 161, 0.2)',
                                                border: '1px solid #7c3aed',
                                                transition: 'transform 0.2s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    boxShadow: '0 0 10px 2px rgba(142, 104, 255, 0.4)',
                                                    cursor: 'pointer',
                                                },
                                            }}>
                                            {item}
                                        </Chip>
                                    ))}
                                </Box>
                            ) : (<IncidentTextComponent text="No categories selected." color="#403d3dff" size={16} weight={600} />)
                        }
                    </Box>
                }
                {/*4.ends Here */}

                {/*4. Incident Description Detail */}
                {
                    currentstep >= 4 &&
                    <Box sx={{
                        width: '100%', border: '1.5px solid #d8dde2ff', borderRadius: 5, gap: 1, mt: 1,
                        position: 'relative', animation: 'fadeIn 0.5s ease-in'
                    }}>
                        {IncidentEditing && <UndoComponent condition={false} setValue={setIsDescAdded} />}
                        <IncidentDescriptionCard description={incidentdescription} />
                    </Box>
                }
                {/*4.ends Here */}

                {/* Image upload comes Here */}
                <>
                    {
                        currentstep >= 5 && uploadedFiles?.length > 0 && <Box sx={{
                            width: '100%',
                            gap: 1,
                            p: 1,
                            borderRadius: 5,
                            mt: 1,
                            border: '1.5px solid #d8dde2ff',
                            position: 'relative'
                        }}>
                            <CardHeader icon={MonochromePhotosTwoToneIcon} text="Image Related to Incident" />
                            {
                                IncidentEditing && uploadedFiles?.length > 0 ?
                                    <>
                                        {
                                            IncidentEditing &&
                                            <UndoComponent condition={false} reset={true} resetAllDetails={() => setUploadedFiles([])} setValue={setIsFileUploadExist} />
                                        }
                                        <Suspense fallback={<CustomeIncidentLoading text={"Loading...!"} />}>
                                            <AttachedFilesCard
                                                incidentFiles={uploadedFiles}
                                                registerSlno={incidentData?.inc_register_slno}
                                                publicNasFolder={PUBLIC_NAS_FOLDER}
                                                onFileClick={handleImagePreview}
                                                setFiles={setUploadedFiles}
                                                setCurrentStep={setCurrentStep}
                                                isShowDelete={true}

                                            />
                                        </Suspense>
                                    </>
                                    : (
                                        uploadedFiles?.length > 0 && (currentstep === 5 || currentstep > 5) &&
                                        <>
                                            {
                                                currentstep === 5 &&
                                                <UndoComponent
                                                    condition={false}
                                                    reset={true}
                                                    resetAllDetails={() => { }}
                                                    setValue={setIsFileUploadExist}
                                                    CurrentStep={setCurrentStep}
                                                />
                                            }

                                            <Box sx={{ mt: 1 }}>
                                                <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap', position: 'relative' }}>
                                                    {uploadedFiles?.filter((file) => file instanceof File)?.map((file, index) => (
                                                        <Card
                                                            key={index}
                                                            variant="outlined"
                                                            sx={{
                                                                width: 90,
                                                                height: 90,
                                                                position: 'relative',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                border: '1px solid #ddd',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => handleImagePreview(file)}>
                                                            <Box sx={{ position: 'absolute', right: -10, top: 0, zIndex: 999 }} onClick={(e) => {
                                                                e.stopPropagation(); // Prevents card click
                                                                hanldeRemoveFiles(index);
                                                            }}>
                                                                <Tooltip title="Delete File">
                                                                    <Box
                                                                        sx={{
                                                                            p: 0.5,
                                                                            bgcolor: '#ced4da',
                                                                            borderRadius: '50%',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            cursor: 'pointer',
                                                                        }}>
                                                                        <MdDeleteOutline fontSize={22} style={{ color: 'var(--royal-purple-400)' }} />
                                                                    </Box>
                                                                </Tooltip>
                                                            </Box>
                                                            {isImage(file) ? (
                                                                <CardCover sx={{ bgcolor: 'blue' }}>
                                                                    <img
                                                                        // src={file?.url}
                                                                        src={file?.url ? file?.url : URL.createObjectURL(file)}
                                                                        alt={`${file.name}`}
                                                                        style={{
                                                                            objectFit: 'cover',
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            borderRadius: 4
                                                                        }}
                                                                    />
                                                                </CardCover>
                                                            ) : (
                                                                <Typography sx={{ textAlign: 'center', px: 1, fontSize: 12 }}>
                                                                    {file.name}
                                                                </Typography>
                                                            )}

                                                        </Card>
                                                    ))}
                                                </Box>


                                            </Box>
                                        </>
                                    )}

                            {/* Modal component For image Preview*/}
                            <ImagePreviewModal
                                open={openModal}
                                handleClose={() => setOpenModal(false)}
                                imageSrc={selectedImage}
                            />
                        </Box>
                    }

                </>

                {/*4.ends Here */}

                {/* 5. The Register Button to Handle the Final Registration */}
                {
                    currentstep >= 4 &&
                    <Box sx={{ mt: 1 }}>
                        <AddButton
                            onClick={IncidentEditing ? HandleIncidentUpdation : HanldeIncidentRegistration}
                            label={IncidentEditing ? "Update Changes" : "Register Incident"} disable={formsubmitting} />
                    </Box>
                }
                {/*5.ends Here */}
            </Box>

        </Box>
    )
}

export default memo(IncidentRegistrationFinal);