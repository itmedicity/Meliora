import { Box, Chip, Skeleton } from '@mui/joy';
import React, { memo, useCallback, useState } from 'react'
import { innerHeight } from '../Constant/Constant';
import IncidentTextComponent from './Components/IncidentTextComponent';
import RelatedToCard from './Components/RelatedToCard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import IncidentStepper from './Components/IncidentStepper';
import AddButton from './Components/AddButton';
import { TbListDetails } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import PatientDetailCard from './Components/PatientDetailCard';
import PatientFilter from './Components/PatientFilter';
import IncidentDescriptionCard from './Components/IncidentDescriptionCard';
import CardHeader from './Components/CardHeader';
import { infoNotify, succesNotify, warningNotify } from '../Common/CommonCode';
import StepCompletedCard from './Components/StepCompletedCard';
import PatientDetailLayoutSkeleton from './Components/PatientDetailLayoutSkeleton';
import ManualPatientForm from './Components/ManualPatientForm';
import UndoComponent from './Components/UndoComponent';
import NoDataFound from './Components/NoDataFound';
import SelectNatureOfIncident from './Components/SelectNatureOfIncident';
import { MdOutlineReportProblem } from "react-icons/md";
import { MdLabel } from 'react-icons/md';
import { BiSolidUserDetail } from "react-icons/bi";
import IncidentCreatorTag from './Components/IncidentCreatorTag ';
import IpPatientCard from './Components/IpPatientCard';
import { useNavigate } from 'react-router-dom';




// import female from '../../assets/images/female.jpg'
// import male from '../../assets/images/male.jpg'

const IncidentRegistrationFinal = () => {

    const [relatedto, setRelatedTo] = useState(false);
    const [ispatientdetail, setIsPatientDetail] = useState(false);
    const [isdescadded, setIsDescAdded] = useState(false);
    const [currentstep, setCurrentStep] = useState(0);
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [incidentdescription, setIncidentDescription] = useState("");
    const [searchkeyword, setSearchKeyword] = useState("");
    const [isincidentnature, setIsIncidentNature] = useState(false);

    const [getDetail, setGetDetail] = useState(false);
    const [isloadingdetail, setIsLoadingDetail] = useState(false);
    const [formData, setFormData] = useState({});
    const [iseditdata, setIsEditData] = useState(false);
    const [ptdetail, setPtDetail] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const navigate = useNavigate();

    const handleMultiSelect = (symbol) => {
        setSelectedCategories((prev) =>
            prev.includes(symbol)
                ? prev.filter((s) => s !== symbol)
                : [...prev, symbol]
        );
    };


    // For conditionally loading the skeleton component if no data is present
    const isLoading = selectedSymbol === null || !relatedto;

    /* for TracKing if the  Steps of Incident Registration Has Completed */
    //1.
    const isCompletedFirstStep = selectedSymbol != null && !isLoading && relatedto && (currentstep === 1 || currentstep > 1);
    //2.
    const isCompletedSecondStep = ispatientdetail && (currentstep === 2 || currentstep > 2);
    //3.
    const isCompletedThirdStep = ispatientdetail && (currentstep === 3 || currentstep > 3);
    //4.
    const isCompletedFourthStep = ispatientdetail && (currentstep === 4 || currentstep > 4);




    const AddPatientDetailAdding = useCallback(() => {
        setIsPatientDetail(prev => !prev);
        if (!ispatientdetail) {
            setCurrentStep((prev) => prev + 1)
        }
    }, [ispatientdetail]);

    const AddNatureOfIncident = useCallback(() => {
        if (selectedCategories?.length === 0) return warningNotify("Select Nature of Incident")
        setCurrentStep((prev) => prev + 1)
    }, [selectedCategories]);

    // Creating Incident Descriptions
    const AddIncidentDescription = useCallback(() => {
        if (incidentdescription?.length === 0) return warningNotify("Please enter the Description ")
        if (incidentdescription?.length < 5) return infoNotify("Atlease 6 charcter Needed");

        setIsDescAdded(prev => !prev);
        if (!isdescadded && incidentdescription?.length > 0) {
            setCurrentStep((prev) => prev + 1)
        }

    }, [isdescadded, incidentdescription])



    const HanldeIncidentRegistration = useCallback(() => {
        setCurrentStep((prev) => prev + 1)
        succesNotify("Incident Registerd Sucessfully")
        navigate('/Home/IncidentList')
    }, [])

    // button Funcitonality
    const AddButtonFunctionality = useCallback(() => {
        if (selectedSymbol === null) return warningNotify("Please select the Who created Incident")
        setRelatedTo(prev => !prev);
        if (!relatedto && selectedSymbol !== null) {
            setCurrentStep((prev) => prev + 1)
        }
    }, [relatedto, selectedSymbol]);

    //Handle Edit in the PatientData
    const HanldePatientDetailEdit = useCallback(() => {
        setIsEditData(true)
    }, [])


    const InPatientDetail = {
        fb_ipad_slno: '6984',
        fb_ip_no: '2500037466',
        fb_ipd_date: '2025-07-19 15:15:39',
        fb_ipd_date_new: null,
        fb_pt_no: 'P-00039074',
        fb_ptc_name: 'SANJU K VARGHESE',
        fb_ptc_sex: 'M',
        fb_ptd_dob: '1982-09-11 00:00:00',
        fb_ptd_dob_new: null,
        fb_ptn_dayage: '8',
        fb_ptn_monthage: '10',
        fb_ptn_yearage: '42',
        fb_ptc_loadd1: 'KARINGOTTU V V PUTHEN VEEDU',
        fb_ptc_loadd2: 'VALIYELA',
        fb_ptc_loadd3: 'KULATHUPUZHA PO',
        fb_ptc_loadd4: 'KOLLAM',
        fb_ptc_lopin: null,
        fb_rc_code: 'B001',
        fb_bd_code: '7712',
        fb_do_code: '0012',
        fb_rs_code: 'G001',
        fb_ipd_disc: null,
        fb_ipd_disc_new: null,
        fb_ipc_status: null,
        fb_dmc_slno: null,
        fb_dmd_date: null,
        fb_dmd_date_new: null,
        fb_ptc_mobile: '9048984512',
        fb_ipc_mhcode: '00',
        fb_doc_name: 'AFFIN A REG.39586',
        create_date: '2025-07-19 15:30:01',
        edit_date: '2025-07-19 15:30:01',
        fb_ipc_curstatus: 'ADM',
        fb_dep_desc: 'GENERAL SURGERY'
    };


    // Hanlde Searching Detail
    const HandleSearchDetail = useCallback(() => {
        if (iseditdata) return warningNotify("Complete the Insertion Process");
        setGetDetail(false);
        setPtDetail([])
        setIsLoadingDetail(true);
        try {
            setTimeout(() => {
                setGetDetail(true);
                setPtDetail([]) //InPatientDetail
                setIsLoadingDetail(false); // move this here
            }, 3000);
        } catch (error) {
            warningNotify(error);
            setIsLoadingDetail(false); // in case error occurs before timeout
        }
    }, [setIsLoadingDetail, iseditdata]);




    const relatedOptions = [
        { label: 'Patient', symbol: 'P' },
        { label: 'Staff', symbol: 'S' },
        { label: 'Visitors', symbol: 'V' },
        { label: 'Hospital Properties', symbol: 'HP' },
    ];

    const symbolToLabel = {
        P: 'Patient',
        S: 'Staff',
        V: 'Visitors',
        HP: 'Hospital Properties'
    };



    return (

        <Box sx={{
            width: '100%',
            minHeight: innerHeight * 85 / 100,
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'space-between',

        }}>
            <Box sx={{
                width: '30%',
                height: '100%',
            }}>
                <Box sx={{
                    p: 2,
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                    border: '1px solid #e0e0e0'
                }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                        <AppRegistrationIcon color={'#403d3dff'} />
                        <IncidentTextComponent text={"INCIDENT REGISTRATION"} color={'#403d3dff'} size={18} weight={600} />
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
                                            <RelatedToCard
                                                key={symbol}
                                                label={label}
                                                symbol={symbol}
                                                selected={selectedSymbol === symbol}
                                                onSelect={(newSymbol) => setSelectedSymbol(newSymbol)}
                                                multiple={false}
                                            />
                                        ))}
                                    </Box>
                                }
                                <AddButton onClick={AddButtonFunctionality} label={"Add"} />
                            </>
                        )
                    }
                    {/* search the detail of Target (patient ,visitor or staff) */}

                    {
                        (currentstep === 1 || currentstep > 1) && <Box>
                            {
                                isCompletedSecondStep ?
                                    <StepCompletedCard
                                        step={2}
                                        text={"Added Detail of the Initiator "}
                                        subtext={"Include identifying or contextual details about the person who raised the incident"} />
                                    :
                                    (
                                        <Box sx={{ mt: 2 }}>
                                            <IncidentTextComponent
                                                text={`2.Add ${symbolToLabel[selectedSymbol]} Information`}
                                                color={'#403d3dff'}
                                                size={18}
                                                weight={600}
                                            />
                                            <PatientFilter onChange={setSearchKeyword} onClick={HandleSearchDetail} value={searchkeyword} />

                                            {isloadingdetail &&
                                                < PatientDetailLayoutSkeleton />
                                            }

                                            {
                                                iseditdata &&
                                                <ManualPatientForm
                                                    goBack={setIsEditData}
                                                    formData={Object.keys(formData || {})?.length > 0 ? formData : InPatientDetail}
                                                    setFormData={setFormData}
                                                    setPatientDetail={setPtDetail}
                                                />
                                            }

                                            {!iseditdata && ptdetail?.length > 0 && (
                                                // <Box
                                                //     sx={{
                                                //         width: '100%',
                                                //         minHeight: 160,
                                                //         px: 1,
                                                //         display: 'flex',
                                                //         gap: 2,
                                                //         bgcolor: 'white',
                                                //         my: 2,
                                                //         borderRadius: 5,
                                                //         py: 1,
                                                //         border: '1.5px solid #d8dde2ff',
                                                //     }}>
                                                //     <Avatar
                                                //         sx={{
                                                //             height: 60,
                                                //             width: 60,
                                                //             display: 'flex',
                                                //             alignItems: 'center',
                                                //             justifyContent: 'center',
                                                //             objectFit: 'contain'
                                                //         }}>
                                                //         {InPatientDetail?.fb_ptc_sex === "M" ? (
                                                //             <img src={male} alt="Male" width="100%" height="100%" />
                                                //         ) : (
                                                //             <img src={female} alt="Female" width="100%" height="100%" />
                                                //         )}
                                                //     </Avatar>
                                                //     <Box sx={{ flex: 1, mt: 1, position: 'relative' }}>
                                                //         <CiEdit
                                                //             fontSize={26}
                                                //             style={{ position: 'absolute', right: 0, cursor: 'pointer', zIndex: 9999 }}
                                                //             onClick={HanldePatientDetailEdit}
                                                //         />
                                                //         <PatientDetailCard InPatientDetail={ptdetail ? ptdetail?.[0] : InPatientDetail} />
                                                //     </Box>
                                                // </Box>
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        minHeight: 180,
                                                        px: 2,
                                                        py: 2,
                                                        my: 2,
                                                        border: '1.5px solid #ece6f1',
                                                        // display: 'flex',
                                                        bgcolor: '#fdfbff',
                                                        borderRadius: 4,
                                                        gap: 3,
                                                        alignItems: 'flex-start',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                                                        position: 'relative',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                                                        },
                                                    }}
                                                >
                                                    {/* <Avatar
                                                        variant="soft"
                                                        sx={{
                                                            height: 64,
                                                            width: 64,
                                                            borderRadius: '50%',
                                                            overflow: 'hidden',
                                                            border: '2px solid #dc6aaf',
                                                        }}
                                                    >
                                                        <img
                                                            src={InPatientDetail?.fb_ptc_sex === 'M' ? male : female}
                                                            alt="Gender"
                                                            width="100%"
                                                            height="100%"
                                                        />
                                                    </Avatar> */}
                                                    <Box sx={{ flex: 1, position: 'relative' }}>
                                                        <CardHeader icon={BiSolidUserDetail} text="Patient Details" size={24} />
                                                        <CiEdit
                                                            fontSize={26}
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                right: 0,
                                                                cursor: 'pointer',
                                                                zIndex: 10,
                                                                color: '#7c3aed'
                                                            }}
                                                            onClick={HanldePatientDetailEdit}
                                                        />
                                                    </Box>
                                                    <PatientDetailCard InPatientDetail={ptdetail ? ptdetail?.[0] : InPatientDetail} />
                                                </Box>
                                            )}

                                            {
                                                getDetail && !iseditdata && ptdetail?.length === 0 &&
                                                <NoDataFound
                                                    onClick={HanldePatientDetailEdit}
                                                    text="No Records Available"
                                                    color="#474444ff"
                                                />
                                            }

                                            {
                                                !iseditdata &&
                                                ptdetail?.length > 0 &&
                                                <AddButton
                                                    onClick={AddPatientDetailAdding}
                                                    label={"Add"}
                                                    disable={currentstep > 2}
                                                />
                                            }
                                        </Box>
                                    )}
                        </Box>
                    }

                    {/* Add Nature of the Incident */}
                    {
                        (currentstep === 2 || currentstep > 2) &&
                        <Box sx={{ mt: 2 }}>
                            {
                                (!isincidentnature && isCompletedThirdStep) ? <StepCompletedCard
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
                                        <SelectNatureOfIncident
                                            handleMultiSelect={handleMultiSelect}
                                            selectedCategories={selectedCategories}
                                        />
                                        <AddButton
                                            onClick={AddNatureOfIncident}
                                            label={"Add"}
                                        />
                                    </>
                                )
                            }

                        </Box>
                    }



                    {/* Add Incident Description */}
                    {
                        (currentstep === 3 || currentstep > 3) &&
                        <Box sx={{ mt: 1 }}>
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
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '600px',
                                                    height: '160px',
                                                    padding: '8px',
                                                    fontFamily: 'var(--roboto-font)',
                                                    border: '1.5px solid #d8dde2ff',
                                                    borderRadius: '4px',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                    resize: 'none',
                                                    fontSize: '15px',
                                                    fontWeight: '400',
                                                    // Hide scrollbar for WebKit (Chrome, Safari, Edge)
                                                    scrollbarWidth: 'none', // Firefox
                                                    overflow: 'scroll',
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.outline = 'none';
                                                    e.target.style.boxShadow = 'none';
                                                    e.target.style.border = '1.5px solid #d8dde2ff';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.border = '1.5px solid #d8dde2ff';
                                                }}
                                            />
                                            <AddButton
                                                onClick={AddIncidentDescription}
                                                label={"Add"}
                                                disable={currentstep > 3}
                                            />
                                        </>
                                    )}
                        </Box>
                    }
                </Box>
            </Box>

            {/* This part for the detail confirmation part */}
            <Box sx={{
                width: '69%',
                bgcolor: 'white',
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 5
            }}>

                {/*1. The stepper component track the Progess of the Form Submission */}
                <IncidentStepper currentstep={currentstep} />
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
                                currentstep === 1 && <UndoComponent setValue={setRelatedTo} CurrentStep={setCurrentStep} />
                            }
                            <CardHeader icon={MdOutlineAssignment} text="The Incident Related to" />
                            <IncidentCreatorTag creatorType={symbolToLabel[selectedSymbol] || 'Not Selected'} />
                        </>
                    )}
                </Box>
                {/*2.ends Here */}

                {/* 3. The Detail of the Indivdual who Cause the Incident May be Patient Staff or Visitor */}
                {
                    (currentstep === 2 || currentstep > 2) &&
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
                            currentstep === 2 &&
                            <UndoComponent
                                setValue={setIsPatientDetail}
                                CurrentStep={setCurrentStep}
                            />
                        }
                        <CardHeader icon={TbListDetails} text={"In-Patient Overview"} />
                        <Box
                            sx={{
                                width: '100%',
                                minHeight: 160,
                                p: 1,
                                display: 'flex'
                            }}>
                            <IpPatientCard data={InPatientDetail} />
                            <Box>
                            </Box>
                        </Box>
                    </Box>
                }
                {/*3.ends Here */}


                {/*4. Nature of the Incident */}
                {
                    (currentstep === 3 || currentstep > 3) &&
                    <Box sx={{
                        width: '100%',
                        gap: 1,
                        p: 1,
                        borderRadius: 5,
                        mt: 1,
                        border: '1.5px solid #d8dde2ff',
                        position: 'relative'
                    }}>
                        {
                            currentstep === 3 &&
                            <UndoComponent
                                setValue={setIsIncidentNature}
                                CurrentStep={setCurrentStep}
                            />
                        }
                        <CardHeader
                            icon={MdOutlineReportProblem}
                            text="The Nature of the Incident"
                        />
                        {
                            selectedCategories?.length > 0 ? (
                                <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    gap={1.2}
                                    mt={1}
                                    sx={{ animation: 'fadeIn 0.5s ease-in' }}
                                >
                                    {selectedCategories.map((item, idx) => (
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
                            ) : (
                                <IncidentTextComponent
                                    text="No categories selected."
                                    color="#403d3dff"
                                    size={16}
                                    weight={600}
                                />
                            )
                        }


                    </Box>
                }
                {/*4.ends Here */}


                {/*4. Incident Description Detail */}
                {
                    (currentstep === 4 || currentstep > 4) &&
                    <Box sx={{
                        width: '100%', border: '1.5px solid #d8dde2ff', borderRadius: 5, gap: 1, mt: 1,
                        position: 'relative', animation: 'fadeIn 0.5s ease-in'
                    }}>
                        {
                            currentstep === 4 &&
                            <UndoComponent
                                setValue={setIsDescAdded}
                                CurrentStep={setCurrentStep}
                            />
                        }
                        <IncidentDescriptionCard
                            description={incidentdescription} />
                    </Box>
                }
                {/*4.ends Here */}

                {/* 5. The Register Button to Handle the Final Registration */}
                {
                    (currentstep === 4 || currentstep > 4) &&
                    <Box sx={{ mt: 1 }}>
                        <AddButton onClick={HanldeIncidentRegistration} label={"Register Incident"} />
                    </Box>
                }
                {/*5.ends Here */}
            </Box>

        </Box>
    )
}

export default memo(IncidentRegistrationFinal);