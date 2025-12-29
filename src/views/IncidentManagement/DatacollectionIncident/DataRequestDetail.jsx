import {
    Box, Tooltip, IconButton, ModalDialog,
    Modal, ModalClose
} from '@mui/joy'

import React, { lazy, memo, Suspense, useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5';
import { formatDateTime, handleImageUpload, useFileUpload, useIncidentFiles } from '../CommonComponent/CommonFun';
import { PiHouseLineDuotone } from "react-icons/pi";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { useQueryClient } from '@tanstack/react-query';
import { employeeNumber } from 'src/views/Constant/Constant';
import { useSelector } from 'react-redux';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import { allowedFileType } from '../CommonComponent/CommonCode';
import { IoAttachOutline, IoCloseCircle } from "react-icons/io5";
import { safeParse } from '../CommonComponent/Incidnethelper';
import {
    useEmployeeInvolvedDepartments,
    //  useInvolvedDepartments 
} from '../CommonComponent/useQuery';
import ExpandableSection from './ExpandableSection';
import FilepreviewModal from '../IncidentModals/FilepreviewModal';
// import { FaRegEye } from "react-icons/fa";
// import { PiEyeClosedDuotone } from "react-icons/pi";
import { MdCloseFullscreen } from "react-icons/md";
import { BsMailbox } from "react-icons/bs";
import { TbMailboxOff } from "react-icons/tb";

const IncidentTextComponent = lazy(() => import('../Components/IncidentTextComponent'));
const SectionHeader = lazy(() => import('../Components/SectionHeader'));
const ReviewInput = lazy(() => import('../Components/ReviewInput'));
const ApprovalButton = lazy(() => import('../ButtonComponent/ApprovalButton'));
const FishboneQuestionContainer = lazy(() => import('../FishBoneAnalysis/FishboneQuestionContainer'));
const FishboneQuestionPreview = lazy(() => import('../FishBoneAnalysis/FishboneQuestionPreview'));


const DataRequestDetail = ({
    items,
    setOpenModal,
    setFormValues,
    formValues,
    open,
    setOpen,
    setSaveDetail,
    savedetail
}) => {

    const queryClient = useQueryClient();

    const { empsecid, empid } = useSelector(state => {
        return state.LoginUserData
    });
    const { fetchIncidentFiles, loadingFiles } = useIncidentFiles();

    const [departmentrootcause, setDepartmentRootCause] = useState("");
    const [departmentpreventiveaction, setDepartmentPreventiveAction] = useState("");
    const [uploadfiles, setUploadFiles] = useState([])
    const [openimages, setIpenImages] = useState(false);
    const [expanded, setExpanded] = useState([]);
    const { MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT } = formValues;

    const parsedDetails = safeParse(items?.data_collection_details) || [];
    const { uploadedFiles, previewUrls, handleFileSelect, handleRemoveFile } = useFileUpload(allowedFileType);

    // const { data: involvedDepartment } = useInvolvedDepartments(items?.inc_register_slno);

    const { data: EmpinvolvedDepartment } = useEmployeeInvolvedDepartments(items?.inc_register_slno, empid);

    const validDetails = parsedDetails?.filter(d => d?.inc_dep_status !== null && d?.inc_dep_rca !== null && d?.inc_dep_status === 0);


    // Checking if any Department Not Responded
    const hasPending = EmpinvolvedDepartment
        ?.map(detail => {
            const match = validDetails?.find(
                d => d.inc_dep_status === 0 && detail.inc_dep_status === 0
            );
            // return enriched object
            return {
                ...detail,
                fba_status: match?.fba_status ?? null,
                hasPending: !!match
            };
        })
        ?.filter(item => item.hasPending);

    //Handle modal Close Fun
    const handleImageClose = () => { setIpenImages(false) };

    //  Collapse all open details
    const handleCollapseAll = () => {
        setExpanded([]);
    };

    // Toggle Expanding
    const toggleExpand = (index) => {
        if (expanded.includes(index)) {
            setExpanded(expanded.filter(i => i !== index));
        } else {
            setExpanded([...expanded, index]);
        }
    };

    // Fetch Data Collection Files
    const handleActionfileFetching = async (slno) => {
        const files = await fetchIncidentFiles(`/incidentMaster/getdatacollectionfiles/${slno}`);
        setUploadFiles(files);
        setIpenImages(true)
    }

    // Handling Department Data Collecion
    const handleDepartmentDataCollection = async () => {

        // Input validation
        if (!departmentrootcause?.trim())
            return warningNotify("Please Enter the RCA Before Submitting!");
        if (!departmentpreventiveaction?.trim())
            return warningNotify("Please Enter the Preventive Action!");
        if (![MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT].some(Boolean))
            return warningNotify("Please Enter Any of the Above Before Submitting!");

        //  Prepare payloads
        const payload = {
            inc_data_collection_slno: hasPending?.[0]?.inc_data_collection_slno,
            inc_dep_rca: departmentrootcause,
            inc_dep_preventive_action: departmentpreventiveaction,
            inc_dep_status: 1,
            inc_req_ack_user: employeeNumber(),
            inc_dep_fba_status: 1,
            inc_ddc_file_status: uploadedFiles?.length > 0 ? 1 : 0
        };

        const fishbonedetail = {
            inc_register_slno: items?.inc_register_slno,
            inc_data_collection_slno: hasPending?.[0]?.inc_data_collection_slno,
            dep_slno: empsecid,
            inc_material: MATERIAL,
            inc_machine: MACHINE,
            inc_man: MAN,
            inc_milieu: MILIEU,
            inc_method: METHOD,
            inc_measurement: MEASUREMENT,
            inc_fba_status: 1,
            create_user: employeeNumber(),
        };

        try {
            // Submit department data
            const { data: deptRes } = await axioslogin.post("/incidentMaster/departmentactionsubmit", payload);
            if (deptRes?.success !== 2) return warningNotify(deptRes?.message);
            succesNotify(deptRes.message);
            //  Submit fishbone analysis
            const { data: fishRes } = await axioslogin.post("/incidentMaster/insertfishbone", fishbonedetail);
            if (fishRes?.success === 2) {
                succesNotify(fishRes.message);
                setOpenModal(false)
            } else {
                warningNotify(fishRes?.message);
            }

            if (uploadedFiles?.length > 0) {
                try {
                    const formData = new FormData();
                    formData.append('id', hasPending?.[0]?.inc_data_collection_slno);

                    for (const file of uploadedFiles) {
                        if (file.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(file);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', file, file.name);
                        }
                    }
                    const uploadResult = await axioslogin.post('/incidentMaster/uploaddatacollectionFiles', formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                    //  If file upload failed, reset file status
                    if (uploadResult.data.success !== 1) {
                        warningNotify(uploadResult.data.message || "File upload failed");
                        // rollback the inc_file_status to 0
                        await axioslogin.post("/incidentMaster/updateddcfilestatus", {
                            id: items?.inc_data_collection_slno,
                            inc_ddc_file_status: 0
                        });

                        return; // stop further execution
                    }

                    succesNotify("Files uploaded successfully!");
                } catch (uploadErr) {
                    //  If upload API itself throws an error
                    warningNotify("File upload failed, updating file status...");
                    console.error(uploadErr);
                    // rollback the inc_file_status to 0
                    await axioslogin.post("/incidentMaster/updateddcfilestatus", {
                        id: items?.inc_data_collection_slno,
                        inc_ddc_file_status: 0
                    });

                    return; // stop further execution
                }
            }
            // Invalidate queries once (not multiple times)
            queryClient.invalidateQueries('allIncidents');
            queryClient.invalidateQueries('incidentDataCollect');
            queryClient.invalidateQueries('fbadetail');
            queryClient.invalidateQueries('allinvdep');
        } catch (error) {
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            // Cleanup inputs
            setDepartmentRootCause("");
            setDepartmentPreventiveAction("");
            setFormValues({})
            setSaveDetail(false)
        }
    };




    return (
        <Suspense fallback={
            <CustomeIncidentLoading
                text={"Fetching Files and Details"}
            />
        }>
            <Box sx={{ mt: 2 }}>
                <Box sx={{
                    width: '100%',
                    bgcolor: 'var(--royal-purple-400)',
                    py: 1,
                    px: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <IncidentTextComponent
                        text="DATA COLLECTION FROM"
                        size={15}
                        weight={600}
                        color="White"
                    />

                    {expanded?.length > 0 && (
                        <Tooltip title="Collapse All" variant="soft" size="sm">
                            <Box

                                onClick={handleCollapseAll}
                                sx={{
                                    color: "white",
                                    transition: "transform 0.2s ease-in-out",
                                    '&:hover': { transform: "scale(1.2)" },
                                    cursor: 'pointer'
                                }}
                            >
                                <MdCloseFullscreen size={20} />
                            </Box>
                        </Tooltip>
                    )}
                </Box>

                {
                    EmpinvolvedDepartment?.map((item, inx) => {
                        return (
                            <Box
                                key={inx}
                                sx={{
                                    mt: 1.5,
                                    p: 1,
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f6ff"
                                }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: 'relative' }}>
                                    <Tooltip title="Requested User">
                                        <span style={{ cursor: 'pointer' }}>
                                            <FaPersonCircleCheck style={{ color: item?.inc_dep_status === 0 ? 'var(--royal-purple-400)' : 'green', fontSize: 18 }} />
                                        </span>
                                    </Tooltip>
                                    {/* Only department name */}
                                    <IncidentTextComponent text={item?.Requested_user} size={14} weight={600} />
                                    <span style={{ position: 'absolute', right: 0, cursor: "pointer" }}>
                                        <Tooltip
                                            title={expanded.includes(inx) ? 'Hide Details' : 'View Details'}
                                            size="sm"
                                            variant="plain"
                                            onClick={() => toggleExpand(inx)}>
                                            <span>
                                                {expanded.includes(inx)
                                                    ? <BsMailbox size={18} />
                                                    : <TbMailboxOff size={18} />}
                                            </span>
                                        </Tooltip>
                                    </span>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Tooltip title="Department">
                                        <span style={{ cursor: 'pointer' }}>
                                            <PiHouseLineDuotone style={{ color: '#666', fontSize: 14 }} />
                                        </span>
                                    </Tooltip>
                                    {/* Only department name */}
                                    <IncidentTextComponent
                                        text={item?.requested_dep}
                                        size={13}
                                        weight={400}
                                        color="#555"
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', mb: 2 }}>
                                    <Tooltip title="Requested Date">
                                        <span style={{ cursor: 'pointer' }}>
                                            <IoCalendarOutline style={{ color: '#666', fontSize: 14 }} />
                                        </span>
                                    </Tooltip>
                                    <IncidentTextComponent
                                        text={formatDateTime(item?.Requested_date, "dd/MM/yyyy hh:mm:ss a")}
                                        size={12}
                                        weight={400}
                                        color="#555"
                                    />
                                </Box>

                                <SectionHeader text="REMARKS" />
                                <IncidentTextComponent
                                    text={`"${item?.inc_req_remark}"`}
                                    size={13}
                                    weight={400}
                                    color="#444"
                                />
                                {
                                    expanded.includes(inx) && item?.inc_dep_status === 1 &&
                                    <Box sx={{ mt: 2 }}>
                                        <SectionHeader text="DEPARTMENT ACKNOWLEDGEMENTS" />
                                        <ExpandableSection
                                            isOpen={true}
                                            rca={item?.inc_dep_rca}
                                            preventiveAction={item?.inc_dep_preventive_action}
                                            hasFile={item?.inc_ddc_file_status === 1}
                                            fileId={item?.inc_data_collection_slno}
                                            onFileClick={handleActionfileFetching}
                                        /></Box>
                                }

                            </Box>
                        )
                    })
                }

                {
                    hasPending?.[0]?.fba_status === 0 &&
                    <FishboneQuestionContainer
                        setFormValues={setFormValues}
                        formValues={formValues}
                        open={open}
                        setOpen={setOpen}
                        setSaveDetail={setSaveDetail}
                    />
                }


                {
                    hasPending?.[0]?.inc_dep_status === 0 &&
                    <Box >
                        <ReviewInput
                            title={'Root Cause Analysis'}
                            review={departmentrootcause}
                            setReview={setDepartmentRootCause}
                        // disabled={currentReview.disabled}
                        />

                        <ReviewInput
                            title={'Preventive Action'}
                            review={departmentpreventiveaction}
                            setReview={setDepartmentPreventiveAction}
                        // disabled={currentReview.disabled}
                        />

                        {
                            hasPending?.[0]?.fba_status === 0 && savedetail &&
                            <FishboneQuestionPreview
                                data={formValues}
                                action={true}
                                setOpen={setOpen}
                                setSaveDetail={setSaveDetail}
                            />
                        }

                        {/* DepartmentDataCollection */}

                        {/* File Upload Section */}
                        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <label htmlFor="file-upload">
                                <input
                                    type="file"
                                    id="file-upload"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                />
                                <IconButton
                                    component="span"
                                    color="primary"
                                    sx={{ bgcolor: '#ede7f6', '&:hover': { bgcolor: '#d1c4e9' } }}
                                >
                                    <IoAttachOutline size={20} />
                                </IconButton>
                            </label>
                            <IncidentTextComponent text="Attach Files" size={13} weight={500} color="#444" />
                        </Box>

                        {/* File Preview */}
                        {previewUrls.length > 0 && (
                            <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {previewUrls.map((file) => (
                                    <Box
                                        key={file.name}
                                        sx={{
                                            p: 1,
                                            border: '1px solid #ddd',
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            bgcolor: '#fafafa',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}>
                                        {file.type.startsWith('image') ? (
                                            <img src={file.url} alt={file.name} width={50} height={50} style={{ borderRadius: 4 }} />
                                        ) : (
                                            <IncidentTextComponent text={file.name} size={12} color="#333" />
                                        )}
                                        <IoCloseCircle
                                            size={25}
                                            color="red"
                                            style={{ cursor: 'pointer', position: 'absolute', right: -10, top: -10 }}
                                            onClick={() => handleRemoveFile(file.name)}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}


                        <Box sx={{ width: 100 }}>
                            <ApprovalButton
                                size={12}
                                iconSize={17}
                                text={"Add"}
                                icon={GrSend}
                                onClick={handleDepartmentDataCollection}
                            />
                        </Box>
                    </Box>
                }
            </Box>

            {
                !loadingFiles && uploadfiles?.length > 0 &&
                <Modal open={openimages} onClose={handleImageClose}>
                    <ModalDialog sx={{ borderRadius: 'lg' }}>
                        <ModalClose onClick={handleImageClose} />
                        <Suspense fallback={<CustomeIncidentLoading text={"Loading File Please Wait..."} />}>
                            <FilepreviewModal
                                IncidentFiles={uploadfiles}
                            />
                        </Suspense>
                    </ModalDialog>
                </Modal>

            }
        </Suspense>
    )
}

export default memo(DataRequestDetail);