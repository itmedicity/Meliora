import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, CardContent, Checkbox, Chip, CircularProgress, Divider, Input, Modal, ModalDialog, Table, Textarea, Typography } from '@mui/joy';
import CancelIcon from '@mui/icons-material/Cancel';
import TextFieldCustom from '../Components/TextFieldCustom';
import { axioslogin } from '../Axios/Axios';
import { errorNotify, infoNotify, succesNotify } from '../Common/CommonCode';
import { useQuery, useQueryClient } from 'react-query';
import { getPatientAllAntibioticList, getPatientMicrobiologyResult } from 'src/api/AntibioticApi';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SwitchDesign from './SwitchDesign';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const AmsAddPatientDetailsModal = ({ setaddDetailsFlag, addDetailsOpen, setaddDetailsOpen, patientDetail, setPatientDetail }) => {

    const { ams_patient_detail_slno, mrd_no, patient_ip_no, patient_name, patient_age, patient_gender, patient_location, bed_code, consultant_department,
        doc_name, } = patientDetail

    const empid = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [priorityList, setPriorityList] = useState([]);
    const targetDate = new Date();
    const currentDate = format(targetDate, 'yyyy-MM-dd HH:mm:ss');

    const [details, setDetails] = useState({
        clinicalAssesment: '',
        sampleID: '',
        dateOfCollection: '',
        dateOfIssueOfReport: '',
        abstCultureReport: '',
        empricalAntibiotic: '',
        empricalAntibioDateOfStart: '',
        escalDescalIVOralSwitich: '',
        empricalAntibioComplaincePolicy: '',
        compliancePathogenDirectedTherapy: '',
        physicianAmsComments: '',
        patientOutcome: '',
        labNo: '',
        Specimen: '',
        FluidType: '',
        SampleType: '',
        ResultVerifyDate: '',
        Investigation: '',
        Growth: '',
        growthRemarkOne: '',
        growthRemarkTwo: '',
        growthRemarkThree: '',
        cultureDetailsRemarks: '',
        cultureDetailsAddedDate: '',
        organismOne: '',
        organismTwo: '',
        report_updated: '',
        ams_patient_detail_slno: ''
    });

    const { clinicalAssesment, sampleID, dateOfCollection, dateOfIssueOfReport, abstCultureReport, empricalAntibiotic, empricalAntibioDateOfStart,
        escalDescalIVOralSwitich, physicianAmsComments, patientOutcome, labNo, Specimen, FluidType, SampleType, ResultVerifyDate, Investigation, Growth, growthRemarkOne,
        growthRemarkTwo, growthRemarkThree, cultureDetailsRemarks, cultureDetailsAddedDate, organismOne, organismTwo } = details

    const [formState, setFormState] = useState({
        sampleCollected: false,
        empiricalPolicy: false,
        pathogenDirectedTherapy: false,
    });

    const { sampleCollected, empiricalPolicy, pathogenDirectedTherapy } = formState


    useEffect(() => {
        if (patientDetail && Object.keys(patientDetail).length > 0) {
            const {
                clinical_assesment, sample_id, date_of_collection, date_of_issue_of_report,
                abst_culture_report, emprical_antibiotic, emprical_antibio_date_of_start,
                escal_descal_iv_oral_switich, emprical_antibio_complaince_policy,
                compliance_pathogen_directed_therapy, physician_ams_comments, patient_outcome,
                lab_no, specimen, fluid_type, sample_type, investigation, growth,
                growth_remark_one, growth_remark_two, growth_remark_three, culture_details_remarks,
                samp_collect_for_antibiotic, result_verified_date,
                culture_details_added_date, organism_one, organism_two, ams_patient_detail_slno,
            } = patientDetail;

            setDetails({
                clinicalAssesment: clinical_assesment || '',
                sampleID: sample_id || '',
                dateOfCollection: date_of_collection || '',
                dateOfIssueOfReport: date_of_issue_of_report || '',
                abstCultureReport: abst_culture_report || '',
                empricalAntibiotic: emprical_antibiotic || "",
                empricalAntibioDateOfStart: emprical_antibio_date_of_start || '',
                escalDescalIVOralSwitich: escal_descal_iv_oral_switich || '',
                physicianAmsComments: physician_ams_comments || '',
                patientOutcome: patient_outcome || '',
                labNo: lab_no || '',
                Specimen: specimen || '',
                FluidType: fluid_type || '',
                SampleType: sample_type || '',
                ResultVerifyDate: result_verified_date || '',
                Investigation: investigation || '',
                Growth: growth || '',
                growthRemarkOne: growth_remark_one || '',
                growthRemarkTwo: growth_remark_two || '',
                growthRemarkThree: growth_remark_three || '',
                cultureDetailsRemarks: culture_details_remarks || '',
                cultureDetailsAddedDate: culture_details_added_date || '',
                organismOne: organism_one || '',
                organismTwo: organism_two || '',
                report_updated: '',
                ams_patient_detail_slno: ams_patient_detail_slno || ''
            })
            setFormState({
                sampleCollected: samp_collect_for_antibiotic === 1 ? true : false,
                empiricalPolicy: emprical_antibio_complaince_policy === 1 ? true : false,
                pathogenDirectedTherapy: compliance_pathogen_directed_therapy === 1 ? true : false,
            })

        }
    }, [patientDetail])

    const queryClient = useQueryClient()
    const [reportSubmitted, setReportSubmitted] = useState(0);

    const { data: MicroBiologyResult = [], isLoading } = useQuery({
        queryKey: ['getPatientMicrobiologyResult'],
        enabled: mrd_no !== undefined,
        queryFn: () => getPatientMicrobiologyResult(mrd_no),
    });


    const MicroBiologyResultData = useMemo(() =>
        MicroBiologyResult, [MicroBiologyResult]);

    const handlePriorityToggle = (checked, index) => {
        const updated = [...priorityList];
        updated[index].item_priority = checked ? 1 : 0;
        setPriorityList(updated);
    };

    const {
        data: AllAntibioticListOfPatient = [],
        isLoading: Loadingantibiotics,
        isSuccess: isSuccessAntibiotics
    } = useQuery({
        queryKey: ['getAllAntibioticListOfPatient', ams_patient_detail_slno, patient_ip_no],
        queryFn: () => getPatientAllAntibioticList({ ams_patient_detail_slno, patient_ip_no }),
        enabled: !!ams_patient_detail_slno && !!patient_ip_no
    });

    useEffect(() => {
        if (isSuccessAntibiotics) {
            const clonedList = AllAntibioticListOfPatient.map(item => ({ ...item }));
            setPriorityList(clonedList);
        }
    }, [isSuccessAntibiotics, AllAntibioticListOfPatient,]);

    const handleCheckboxChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value === 'yes'
        }));
    }, []);

    const AddCultureDetails = useCallback((val) => {
        if (!val) return;

        const { FLUIDTYPE, GROWTH, GROWTH_REMARKS_1, GROWTH_REMARKS_2, GROWTH_REMARKS_3, INVESTIGATION,
            LABNO, ORGANISM_1, ORGANISM_2, REMARKS, SAMPLE_TYPE, SPECIMEN, VERIFY_DATE } = val

        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const istDate = new Date(
                new Date(dateStr).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
            );
            const pad = (n) => n.toString().padStart(2, '0');
            const year = istDate.getFullYear();
            const month = pad(istDate.getMonth() + 1);
            const day = pad(istDate.getDate());
            const hours = pad(istDate.getHours());
            const minutes = pad(istDate.getMinutes());
            const seconds = pad(istDate.getSeconds());
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        };

        setDetails(prev => ({
            ...prev,
            labNo: LABNO || '',
            Specimen: SPECIMEN || '',
            FluidType: FLUIDTYPE || '',
            SampleType: SAMPLE_TYPE || '',
            Investigation: INVESTIGATION || '',
            ResultVerifyDate: formatDate(VERIFY_DATE) || '',
            organismOne: ORGANISM_1 || '',
            organismTwo: ORGANISM_2 || '',
            Growth: GROWTH || '',
            growthRemarkOne: GROWTH_REMARKS_1 || '',
            growthRemarkTwo: GROWTH_REMARKS_2 || '',
            growthRemarkThree: GROWTH_REMARKS_3 || '',
            cultureDetailsRemarks: REMARKS || '',
            cultureDetailsAddedDate: currentDate || null,
        }));
    }, [currentDate])



    const Reset = useCallback(() => {
        setDetails({
            clinicalAssesment: '',
            sampleID: '',
            dateOfCollection: '',
            dateOfIssueOfReport: '',
            abstCultureReport: '',
            empricalAntibiotic: "",
            empricalAntibioDateOfStart: '',
            escalDescalIVOralSwitich: '',
            empricalAntibioComplaincePolicy: '',
            compliancePathogenDirectedTherapy: '',
            physicianAmsComments: '',
            patientOutcome: '',
            labNo: '',
            Specimen: '',
            FluidType: '',
            SampleType: '',
            ResultVerifyDate: '',
            Investigation: '',
            Growth: '',
            growthRemarkOne: '',
            growthRemarkTwo: '',
            growthRemarkThree: '',
            cultureDetailsRemarks: '',
            cultureDetailsAddedDate: '',
            organismOne: '',
            organismTwo: '',
            report_updated: '',
            ams_patient_detail_slno: ''
        })
        setFormState({
            sampleCollected: false,
            empiricalPolicy: false,
            pathogenDirectedTherapy: false,
        })
        setReportSubmitted(0)
        // Clear and refetch cached query
        queryClient.setQueryData(['getPatientMicrobiologyResult'], [])
        queryClient.invalidateQueries(['getPatientMicrobiologyResult'])
        queryClient.setQueryData(['getAllAntibioticListOfPatient'], [])
        queryClient.invalidateQueries(['getAllAntibioticListOfPatient'])
    }, [queryClient])

    const CloseModal = useCallback(() => {
        Reset()
        setaddDetailsFlag(1)
        setaddDetailsOpen(false)
        setPatientDetail([])
    }, [Reset, setPatientDetail, setaddDetailsFlag, setaddDetailsOpen])

    const updatePatientDetails = useCallback((e) => {
        const { name, value } = e.target
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }, []);

    const updateData = useMemo(() => {
        return {
            clinicalAssesment: clinicalAssesment || null,
            sampleID: sampleID || null,
            dateOfCollection: dateOfCollection || null,
            sampleCollected: sampleCollected === true ? 1 : 0,
            dateOfIssueOfReport: dateOfIssueOfReport || null,
            abstCultureReport: abstCultureReport || null,
            empricalAntibiotic: empricalAntibiotic || null,
            empricalAntibioDateOfStart: empricalAntibioDateOfStart || null,
            escalDescalIVOralSwitich: escalDescalIVOralSwitich || null,
            emprical_antibio_complaince_policy: empiricalPolicy === true ? 1 : 0,
            compliance_pathogen_directed_therapy: pathogenDirectedTherapy === true ? 1 : 0,
            physicianAmsComments: physicianAmsComments || null,
            patientOutcome: patientOutcome || null,
            labNo: labNo || null,
            Specimen: Specimen || null,
            FluidType: FluidType || null,
            SampleType: SampleType || null,
            Investigation: Investigation || null,
            ResultVerifyDate: ResultVerifyDate || null,
            Growth: Growth || null,
            growthRemarkOne: growthRemarkOne || null,
            growthRemarkTwo: growthRemarkTwo || null,
            growthRemarkThree: growthRemarkThree || null,
            cultureDetailsRemarks: cultureDetailsRemarks || null,
            cultureDetailsAddedDate: cultureDetailsAddedDate || null,
            organismOne: organismOne || null,
            organismTwo: organismTwo || null,
            report_updated: reportSubmitted ? 1 : 0,
            report_submitted_date: reportSubmitted === 1 ? currentDate : null,
            ams_patient_detail_slno: ams_patient_detail_slno,
            report_submitted_user: reportSubmitted === 1 ? empid : null,
        }
    }, [ams_patient_detail_slno, clinicalAssesment, sampleID, dateOfCollection, dateOfIssueOfReport, abstCultureReport, empricalAntibiotic,
        empricalAntibioDateOfStart, escalDescalIVOralSwitich, physicianAmsComments, patientOutcome, sampleCollected, empiricalPolicy, pathogenDirectedTherapy,
        reportSubmitted, organismOne, organismTwo, labNo, Specimen, FluidType, SampleType, Investigation, Growth, growthRemarkOne, growthRemarkTwo, growthRemarkThree,
        cultureDetailsRemarks, cultureDetailsAddedDate, currentDate, empid, ResultVerifyDate
    ])


    const SubmitPatientDetails = useCallback(async () => {
        try {
            // 1. Update patient clinical details
            const response = await axioslogin.patch('/amsAntibiotic/updatePatientDetails', updateData);
            const { success: updateSuccess, message: updateMsg } = response?.data || {};

            if (updateSuccess !== 2) {
                errorNotify(updateMsg || "Failed to update patient clinical details.");
                return;
            }

            // 2. Prepare priority list
            const priorityPayload = priorityList.map(({ item_code, patient_ip_no, item_priority }) => ({
                item_code,
                patient_ip_no,
                item_priority
            }));

            // Ensure at least one item has priority set to 1
            const hasPriority = priorityPayload.some(item => item.item_priority === 1);
            if (!hasPriority) {
                infoNotify("Please mark at least one antibiotic with priority before submitting.");
                return;
            }

            // 3. Update antibiotic priorities in bulk
            const priorityUpdateRes = await axioslogin.patch(
                '/amsAntibiotic/updatePatientAntibioticsPriority',
                { priorityList: priorityPayload }
            );

            const { success: prioritySuccess, message: priorityMsg } = priorityUpdateRes?.data || {};

            if (prioritySuccess === 2) {
                succesNotify("Patient details and priorities updated successfully.");
                CloseModal();
                queryClient.invalidateQueries('getAntibioticPatients');
            } else {
                errorNotify(priorityMsg || "Failed to update antibiotic priorities.");
            }

        } catch (error) {
            errorNotify("Something went wrong during submission.");
        }
    }, [updateData, priorityList, CloseModal, queryClient]);


    return (
        <Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={addDetailsOpen}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
                <ModalDialog
                    variant="outlined"
                    sx={{
                        width: '80vw',
                        p: 1,
                        bgcolor: '#f9fafe',
                        border: reportSubmitted === 1 ? 3 : 0,
                        borderColor: reportSubmitted === 1 ? '#196eb6' : 'white'
                    }}>
                    <Box sx={{ bgcolor: '#f9fafe', overflow: 'auto', maxHeight: '95vh', }}>

                        <Box sx={{ px: 2 }} >
                            <Box sx={{
                                top: 0,
                                zIndex: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                px: 1,
                            }}>
                                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Patient Details</Typography>
                                <CancelIcon sx={{ cursor: 'pointer', width: 28, height: 28 }} onClick={CloseModal} />
                            </Box>
                            <Box sx={{ flex: 1, bgcolor: 'white', mt: .5, p: 2, borderRadius: 5, }}>
                                <Box sx={{ flex: 1, display: 'flex' }}>
                                    <PersonIcon sx={{ p: .1 }} />
                                    <Typography sx={{ fontSize: 17, flex: 1, fontWeight: 600, pl: .3 }}>{patient_name}</Typography>
                                    <SwitchDesign reportSubmitted={reportSubmitted} setReportSubmitted={setReportSubmitted} />
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1, pt: 1, }}>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ fontSize: 13, fontWeight: 700, }}>
                                            Age
                                        </Box>
                                        <Box sx={{ fontSize: 13, }}>
                                            {patient_age} years
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ fontSize: 13, fontWeight: 700, }}>
                                            Gender
                                        </Box>
                                        <Box sx={{ fontSize: 13, }}>
                                            {patient_gender}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ fontSize: 13, fontWeight: 700, }}>
                                            Mrd No.
                                        </Box>
                                        <Box sx={{ fontSize: 13, }}>
                                            {mrd_no}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ fontSize: 13, fontWeight: 700, }}>
                                            IP No.
                                        </Box>
                                        <Box sx={{ fontSize: 13, }}>
                                            {patient_ip_no}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex', pl: 1, pt: 1.5 }}>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ fontSize: 13, fontWeight: 700, }}>
                                            Consultant Department
                                        </Box>
                                        <Box sx={{ fontSize: 13, }}>
                                            {consultant_department}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ fontSize: 13, fontWeight: 700, }}>
                                            Consultant Doctor
                                        </Box>
                                        <Box sx={{ fontSize: 13, }}>
                                            {doc_name}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ fontSize: 13, fontWeight: 700, }}>
                                            Location
                                        </Box>
                                        <Box sx={{ fontSize: 13, }}>
                                            {patient_location}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, }}>
                                        <Box sx={{ fontSize: 13, fontWeight: 700, }}>
                                            Bed Code
                                        </Box>
                                        <Box sx={{ fontSize: 13, }}>
                                            {bed_code}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Card variant="outlined" sx={{ mx: 2, mt: 1 }}>
                            <Typography sx={{ color: '#14344bff', }}>
                                Prescribed Antibiotics
                            </Typography>
                            <Box sx={{ flex: 1 }}>
                                {Loadingantibiotics ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                                        <CircularProgress
                                            sx={{
                                                "--CircularProgress-size": "47px",
                                                "--CircularProgress-trackThickness": "2px",
                                                "--CircularProgress-progressThickness": "3px"
                                            }}
                                        />
                                    </Box>
                                ) : (

                                    <Table stickyHeader size="sm" sx={{ mb: .5, }} borderAxis='both' >
                                        <thead >
                                            <tr>
                                                <th style={{ width: 80, backgroundColor: 'white', fontSize: 13, fontWeight: 700, }}>Item code</th>
                                                <th style={{ width: 110, backgroundColor: 'white', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>Antibiotic</th>
                                                <th style={{ width: 'auto', backgroundColor: 'white', fontSize: 13, fontWeight: 700, }}> Item Describtion</th>
                                                <th style={{ width: 120, backgroundColor: 'white', fontSize: 13, fontWeight: 700, }}> VED Analysis</th>
                                                <th style={{ width: 'auto', backgroundColor: 'white', fontSize: 13, fontWeight: 700, }}>Composition/Volume</th>
                                                <th style={{ width: 150, backgroundColor: 'white', fontSize: 13, fontWeight: 700, }}>Bill Date</th>
                                                <th style={{ width: 60, backgroundColor: 'white', fontSize: 13, fontWeight: 700, }}>Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {priorityList.map((val, index) => (
                                                <tr key={index}>
                                                    <td >{val.item_code}</td>
                                                    <td >
                                                        <Chip
                                                            sx={{
                                                                bgcolor: val.restricted === 1 ? "darkred" : "#c1c8e4",
                                                                color: val.restricted === 1 ? "white" : "black",
                                                                fontWeight: 500,
                                                            }}                      >
                                                            {val.restricted === 1 ? "Restricted" : "Unrestricted"}
                                                        </Chip>
                                                    </td>
                                                    <td >{val.itc_desc}</td>
                                                    <td >{val.vital_essential}</td>
                                                    <td >{val.composition_volume}</td>
                                                    <td >
                                                        {val.bill_date
                                                            ? format(new Date(val.bill_date), 'dd MMM yyyy,  hh:mm a')
                                                            : 'Invalid Date'}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Checkbox
                                                            variant="outlined"
                                                            checked={val.item_priority === 1}
                                                            onChange={(e) => handlePriorityToggle(e.target.checked, index)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Box>
                        </Card>
                        <Box sx={{
                            px: 1
                        }}>
                            <Card variant="outlined" sx={{ m: 1 }}>
                                <Typography sx={{ color: '#14344bff', pl: 1 }}>
                                    Antibiotic Assessment
                                </Typography>
                                <Box sx={{ flex: 1, display: 'flex', gap: 2, }}>
                                    <Box sx={{ width: 585, pl: 1 }} >
                                        <Box sx={{ flex: 1, display: 'flex', gap: 1, mt: .5 }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3, }}>
                                                    Whether Sample Collected For Antibiotic
                                                </Typography>
                                                <Box sx={{ pt: .2, pl: 1, gap: 2 }}>
                                                    <Checkbox
                                                        label="Yes"
                                                        size="sm"
                                                        name="sampleCollected"
                                                        value="yes"
                                                        checked={formState.sampleCollected === true}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <Checkbox
                                                        label="No"
                                                        size="sm"
                                                        name="sampleCollected"
                                                        value="no"
                                                        checked={formState.sampleCollected === false}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                                    Sample Id
                                                </Typography>
                                                <TextFieldCustom
                                                    type="text"
                                                    size="sm"
                                                    name="sampleID"
                                                    value={sampleID}
                                                    onchange={updatePatientDetails}
                                                ></TextFieldCustom>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex', gap: 1, pt: 1, mt: .5 }}>
                                            <Box sx={{ flex: 1, }}>
                                                <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                                    Date Of Collection
                                                </Typography>
                                                <TextFieldCustom
                                                    type="date"
                                                    size="sm"
                                                    name="dateOfCollection"
                                                    value={dateOfCollection}
                                                    onchange={updatePatientDetails}
                                                ></TextFieldCustom>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                                    Date Of Issue of Report
                                                </Typography>
                                                <TextFieldCustom
                                                    type="date"
                                                    size="sm"
                                                    name="dateOfIssueOfReport"
                                                    value={dateOfIssueOfReport}
                                                    onchange={updatePatientDetails}
                                                ></TextFieldCustom>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex', gap: 1, pt: 1, mt: .5 }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                                    Empirical antibiotic
                                                </Typography>
                                                <TextFieldCustom
                                                    type="text"
                                                    size="sm"
                                                    name="empricalAntibiotic"
                                                    value={empricalAntibiotic}
                                                    onchange={updatePatientDetails}
                                                ></TextFieldCustom>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                                    Empirical antibiotic Date of Start
                                                </Typography>
                                                <TextFieldCustom
                                                    type="date"
                                                    size="sm"
                                                    name="empricalAntibioDateOfStart"
                                                    value={empricalAntibioDateOfStart}
                                                    onchange={updatePatientDetails}
                                                ></TextFieldCustom>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, display: 'flex', gap: 1, pt: 1.5, mt: .5 }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3, }}>
                                                    Empirical Antibiotic Compliance to policy
                                                </Typography>
                                                <Box sx={{ pt: 0.5, pl: 1 }}>
                                                    <Checkbox
                                                        label="Yes"
                                                        size="sm"
                                                        name="empiricalPolicy"
                                                        value="yes"
                                                        checked={formState.empiricalPolicy === true}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <Checkbox
                                                        label="No"
                                                        size="sm"
                                                        name="empiricalPolicy"
                                                        value="no"
                                                        checked={formState.empiricalPolicy === false}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{ flex: 1, }}>
                                                <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                                    Compliance to Pathogen Directed Therapy
                                                </Typography>
                                                <Box sx={{ pt: .5, pl: 1 }}>
                                                    <Checkbox
                                                        label="Yes"
                                                        size="sm"
                                                        name="pathogenDirectedTherapy"
                                                        value="yes"
                                                        checked={formState.pathogenDirectedTherapy === true}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <Checkbox
                                                        label="No"
                                                        size="sm"
                                                        name="pathogenDirectedTherapy"
                                                        value="no"
                                                        checked={formState.pathogenDirectedTherapy === false}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, }} >
                                        <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                            Clinical Assessment
                                        </Typography>
                                        <Textarea
                                            type="text"
                                            size="sm"
                                            minRows={2}
                                            name="clinicalAssesment"
                                            value={clinicalAssesment}
                                            onChange={updatePatientDetails}
                                        ></Textarea>

                                        <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3, pt: 1 }}>
                                            ABST Culture Report
                                        </Typography>
                                        <Textarea
                                            type="text"
                                            size="sm"
                                            minRows={3}
                                            name="abstCultureReport"
                                            value={abstCultureReport}
                                            onChange={updatePatientDetails}
                                        ></Textarea>
                                        <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3, pt: 1 }}>
                                            Escalation/De-escalation IV to Oral Switch
                                        </Typography>
                                        <Textarea
                                            type="text"
                                            size="sm"
                                            minRows={2}
                                            name="escalDescalIVOralSwitich"
                                            value={escalDescalIVOralSwitich}
                                            onChange={updatePatientDetails}
                                        ></Textarea>
                                    </Box>
                                </Box>
                            </Card>
                            <Box sx={{ m: 1 }}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography sx={{ color: '#14344bff', pl: 1 }} >
                                            Patient Culture Details
                                        </Typography>

                                        <Divider sx={{ mb: 1 }} />

                                        {/* Loading State */}
                                        {isLoading ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                                                <CircularProgress
                                                    sx={{
                                                        "--CircularProgress-size": "47px",
                                                        "--CircularProgress-trackThickness": "2px",
                                                        "--CircularProgress-progressThickness": "3px"
                                                    }}
                                                />
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    m: 1,
                                                    overflow: 'auto',
                                                    border: 1,
                                                    borderColor: 'lightgrey',
                                                    '&::-webkit-scrollbar': {
                                                        height: '6px',
                                                        width: '5px',
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        backgroundColor: '#256192ff',
                                                        borderRadius: '4px',
                                                    },
                                                    '&::-webkit-scrollbar-thumb:hover': {
                                                        backgroundColor: '#48667cff',
                                                    },
                                                    '&::-webkit-scrollbar-track': {
                                                        backgroundColor: '#ffffffff',
                                                    },
                                                }}
                                            >
                                                <Table
                                                    borderAxis="bothBetween"
                                                    sx={{
                                                        '& thead th': {
                                                            position: 'sticky',
                                                            top: 0,
                                                            zIndex: 3,
                                                            backgroundColor: 'background.surface',
                                                        },
                                                        '& thead th:last-of-type': {
                                                            position: 'sticky',
                                                            right: 0,
                                                            zIndex: 4,
                                                            backgroundColor: 'background.surface',
                                                            boxShadow: '-1px 0 var(--TableCell-borderColor)',
                                                        },
                                                        '& tbody td:last-of-type': {
                                                            position: 'sticky',
                                                            right: 0,
                                                            zIndex: 2,
                                                            backgroundColor: 'background.surface',
                                                            boxShadow: '-1px 0 var(--TableCell-borderColor)',
                                                        },
                                                        '& tr.selected': {
                                                            backgroundColor: '#eff3f6',
                                                        },
                                                    }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th style={{ textAlign: 'center', width: 30 }}>#</th>
                                                            <th style={{ textAlign: 'center', width: 80 }}>Lab No.</th>
                                                            <th style={{ textAlign: 'center', width: 200 }}>Specimen</th>
                                                            <th style={{ textAlign: 'center', width: 200 }}>Fluid Type</th>
                                                            <th style={{ textAlign: 'center', width: 200 }}>Sample Type</th>
                                                            <th style={{ textAlign: 'center', width: 250 }}>Investigation</th>
                                                            <th style={{ textAlign: 'center', width: 200 }}>Result Verified Date</th>
                                                            <th style={{ textAlign: 'center', width: 350 }}>Growth</th>
                                                            <th style={{ textAlign: 'center', width: 350 }}>Growth Remark 1</th>
                                                            <th style={{ textAlign: 'center', width: 350 }}>Growth Remark 2</th>
                                                            <th style={{ textAlign: 'center', width: 350 }}>Growth Remark 3</th>
                                                            <th style={{ textAlign: 'center', width: 350 }}>Remarks</th>
                                                            <th style={{ textAlign: 'center', width: 80 }}>Add</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {MicroBiologyResultData.length === 0 ? (
                                                            <tr>
                                                                <td colSpan={5} style={{ textAlign: 'center', padding: 16 }}>
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            MicroBiologyResultData?.map((val, index) => (
                                                                <tr key={index}>
                                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.LABNO}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.SPECIMEN}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.FLUIDTYPE}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.SAMPLE_TYPE}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.INVESTIGATION}</td>

                                                                    {val.VERIFY_DATE === null ?
                                                                        <td style={{ textAlign: 'center' }}>

                                                                        </td> :
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {new Date(val.VERIFY_DATE).toLocaleString('en-GB', {
                                                                                timeZone: 'Asia/Kolkata',
                                                                                day: '2-digit',
                                                                                month: 'short',
                                                                                year: 'numeric',
                                                                                hour: 'numeric',
                                                                                minute: '2-digit',
                                                                                hour12: true,
                                                                            }).replace(',', '')}
                                                                        </td>}


                                                                    <td style={{ textAlign: 'center' }}>{val.GROWTH}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.GROWTH_REMARKS_1}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.GROWTH_REMARKS_2}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.GROWTH_REMARKS_3}</td>
                                                                    <td style={{ textAlign: 'center' }}>{val.REMARKS}</td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <AddCircleOutlineIcon
                                                                            sx={{ color: '#1167bc', cursor: 'pointer' }}
                                                                            onClick={() => AddCultureDetails(val)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Box>
                                        )}

                                        <Box sx={{ mt: 3 }}>
                                            <Divider sx={{ mb: 2 }}>Selected Culture Record</Divider>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                                {/* Column 1: Basic Info */}
                                                <Box sx={{ flex: 1, minWidth: 240 }}>
                                                    {[
                                                        { label: "Lab No.", value: labNo },
                                                        { label: "Specimen", value: Specimen },
                                                        { label: "Fluid Type", value: FluidType },
                                                        { label: "Sample Type", value: SampleType },
                                                        { label: "Result Verified Date", value: ResultVerifyDate },
                                                    ].map((field, i) => (
                                                        <Box key={i} sx={{ mb: 1.5 }}>
                                                            <Typography level="body-sm" fontWeight={500} sx={{ pl: .3 }}>{field.label}</Typography>
                                                            <Input size="sm" variant="outlined" value={field.value} readOnly />
                                                        </Box>
                                                    ))}
                                                </Box>

                                                {/* Column 2: Organisms & Growth */}
                                                <Box sx={{ flex: 1, minWidth: 240 }}>
                                                    {[
                                                        { label: "Investigation", value: Investigation },
                                                        { label: "Organism 1", value: organismOne },
                                                        { label: "Organism 2", value: organismTwo },
                                                        { label: "Growth", value: Growth },
                                                    ].map((field, i) => (
                                                        <Box key={i} sx={{ mb: 1 }}>
                                                            <Typography level="body-sm" fontWeight={500} sx={{ pl: .3 }}>{field.label}</Typography>
                                                            <Textarea size="sm" minRows={2} variant="outlined" value={field.value} readOnly />
                                                        </Box>
                                                    ))}
                                                </Box>

                                                {/* Column 3: Growth Remarks */}
                                                <Box sx={{ flex: 1, minWidth: 240, }}>
                                                    {[
                                                        { label: "Growth Remark 1", value: growthRemarkOne },
                                                        { label: "Growth Remark 2", value: growthRemarkTwo },
                                                        { label: "Growth Remark 3", value: growthRemarkThree },
                                                        { label: "Remarks", value: cultureDetailsRemarks },
                                                    ].map((field, i) => (
                                                        <Box key={i} sx={{ mb: 1 }}>
                                                            <Typography level="body-sm" fontWeight={500} sx={{ pl: .3 }}>{field.label}</Typography>
                                                            <Textarea size="sm" minRows={2} variant="outlined" value={field.value} readOnly />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                            {/* 
                                            <Box sx={{ flex: 1, display: 'flex', }}>
                                                <Box sx={{ flex: 1, minWidth: 230, pr: 1 }}>
                                                    <Typography level="body-sm" fontWeight={500} sx={{ pl: .3 }}>Investigation</Typography>
                                                    <Textarea
                                                        size="sm"
                                                        minRows={2}
                                                        variant="outlined"
                                                        value={Investigation}
                                                        readOnly
                                                        sx={{ width: '97%' }}
                                                    />
                                                </Box>

                                                <Box sx={{ flex: 2, }}>
                                                    <Typography level="body-sm" fontWeight={500} sx={{ pl: .3 }}>Remarks</Typography>
                                                    <Textarea
                                                        size="sm"
                                                        minRows={2}
                                                        variant="outlined"
                                                        value={cultureDetailsRemarks}
                                                        readOnly
                                                        sx={{ width: '100%' }}
                                                    />
                                                </Box>
                                            </Box> */}
                                        </Box>

                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{ flex: 1, gap: 1, px: 1, display: 'flex' }}>
                                <Box sx={{ flex: 1, }}>
                                    <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                        Patient Out Come
                                    </Typography>
                                    <Textarea
                                        type="text"
                                        size="sm"
                                        minRows={4}
                                        name="patientOutcome"
                                        value={patientOutcome}
                                        onChange={updatePatientDetails}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, }}>

                                    <Typography level="body-sm" fontWeight={500} sx={{ ml: 0.3 }}>
                                        Physician And Ams Comments
                                    </Typography>
                                    <Textarea
                                        type="text"
                                        size="sm"
                                        minRows={4}
                                        name="physicianAmsComments"
                                        value={physicianAmsComments}
                                        onChange={updatePatientDetails}
                                    ></Textarea>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, my: 2, mr: 2.5 }}>
                                <Button variant="outlined" size='sm' onClick={SubmitPatientDetails}> Save </Button>
                                <Button variant="outlined" size='sm' onClick={CloseModal}>Cancel</Button>
                            </Box>
                        </Box>
                    </Box>
                </ModalDialog >
            </Modal>
        </Box >
    )
}

export default memo(AmsAddPatientDetailsModal)

