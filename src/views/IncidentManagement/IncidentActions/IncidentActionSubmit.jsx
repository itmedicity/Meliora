import { Box, Tooltip, IconButton } from '@mui/joy';
import React, { memo, useState } from 'react';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { IoCalendarOutline } from 'react-icons/io5';
import { formatDateTime, handleImageUpload, useFileUpload } from '../CommonComponent/CommonFun';
import { PiHouseLineDuotone } from "react-icons/pi";
import { FaPersonCircleCheck } from "react-icons/fa6";
import SectionHeader from '../Components/SectionHeader';
import ReviewInput from '../Components/ReviewInput';
import { GrSend } from "react-icons/gr";
import ApprovalButton from '../ButtonComponent/ApprovalButton';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { useQueryClient } from '@tanstack/react-query';
import { employeeNumber } from 'src/views/Constant/Constant';
import { useSelector } from 'react-redux';
import { IoAttachOutline, IoCloseCircle } from "react-icons/io5";
import { allowedFileType } from '../CommonComponent/CommonCode';
import { useDepartmentReqActions } from '../CommonComponent/useQuery';


const IncidentActionSubmit = ({ items, setOpenModal }) => {
    const queryClient = useQueryClient();
    const [action, setAction] = useState("");

    const { empdept } = useSelector(state => state.LoginUserData);

    const { data: departmentreqactions } = useDepartmentReqActions(items?.inc_register_slno, empdept);

    const firstAction = departmentreqactions && departmentreqactions[0];

    const { uploadedFiles, previewUrls, handleFileSelect, handleRemoveFile } = useFileUpload(allowedFileType);

    /**  Submit Department Action + File Upload */
    const handleDepartmentActionDetail = async () => {
        if (!action?.trim())
            return warningNotify("Please Enter the Appropriate Action Before Submitting!");

        const payload = {
            inc_dep_action_detail_slno: departmentreqactions[0]?.inc_dep_action_detail_slno,
            inc_action: action,
            inc_dep_action_status: 1,
            inc_action_ack_user: employeeNumber(),
            inc_file_status: uploadedFiles?.length > 0 ? 1 : 0
        };

        try {
            // Submit the main action
            const { data: depAction } = await axioslogin.post("/incidentMaster/depactionack", payload);
            if (depAction?.success !== 2) return warningNotify(depAction?.message);
            succesNotify(depAction.message);
            //  Handle file uploads (if any)
            if (uploadedFiles?.length > 0 && departmentreqactions[0]?.inc_dep_action_detail_slno) {

                try {
                    const formData = new FormData();
                    formData.append('id', departmentreqactions[0]?.inc_dep_action_detail_slno);

                    for (const file of uploadedFiles) {
                        if (file.type.startsWith('image')) {
                            const compressedFile = await handleImageUpload(file);
                            formData.append('files', compressedFile, compressedFile.name);
                        } else {
                            formData.append('files', file, file.name);
                        }
                    }
                    const uploadResult = await axioslogin.post('/incidentMaster/uploadActionFiles', formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });
                    //  If file upload failed, reset file status
                    if (uploadResult.data.success !== 1) {
                        warningNotify(uploadResult.data.message || "File upload failed");

                        // rollback the inc_file_status to 0
                        await axioslogin.post("/incidentMaster/updateFileStatus", {
                            id: departmentreqactions[0]?.inc_dep_action_detail_slno,
                            inc_file_status: 0
                        });

                        return; // stop further execution
                    }

                    succesNotify("Files uploaded successfully!");
                } catch (uploadErr) {
                    //  If upload API itself throws an error
                    warningNotify("File upload failed, updating file status...");
                    console.error(uploadErr);

                    // rollback the inc_file_status to 0
                    await axioslogin.post("/incidentMaster/updateFileStatus", {
                        id: departmentreqactions[0]?.inc_dep_action_detail_slno,
                        inc_file_status: 0
                    });

                    return; // stop further execution
                }
            }

            // Refresh only after all success
            queryClient.invalidateQueries('getdepactions');
        } catch (error) {
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            setAction("");
            setOpenModal(false)
        }
    };


    return (
        <Box sx={{ mt: 2 }}>
            {/* Header */}
            <Box sx={{ width: '100%', bgcolor: 'var(--royal-purple-400)', py: 1, px: 2 }}>
                <IncidentTextComponent text="ACTION REQUESTED FROM" size={15} weight={600} color="White" />
            </Box>

            {/* Details */}
            <Box sx={{ mt: 1.5, p: 1, borderRadius: "8px", backgroundColor: "#f9f6ff" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Requested User">
                        <FaPersonCircleCheck style={{ color: 'var(--royal-purple-400)', fontSize: 18 }} />
                    </Tooltip>
                    <IncidentTextComponent text={firstAction?.requested_employee} size={14} weight={600} />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Department">
                        <PiHouseLineDuotone style={{ color: '#666', fontSize: 14 }} />
                    </Tooltip>
                    <IncidentTextComponent text={firstAction?.requested_department} size={13} weight={400} color="#555" />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                    <Tooltip title="Requested Date">
                        <IoCalendarOutline style={{ color: '#666', fontSize: 14 }} />
                    </Tooltip>
                    <IncidentTextComponent
                        text={formatDateTime(firstAction?.create_date, "dd/MM/yyyy hh:mm:ss a")}
                        size={12}
                        weight={400}
                        color="#555"
                    />
                </Box>

                <SectionHeader text="REMARKS" />
                <IncidentTextComponent
                    text={`"${firstAction?.inc_dep_action_remark}"`}
                    size={13}
                    weight={400}
                    color="#444"
                />
            </Box>

            {/* Action Input & Upload */}
            {firstAction?.inc_dep_action_status === 0 && (
                <Box>
                    <ReviewInput title={'Department Action'} review={action} setReview={setAction} />

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

                    {/* Submit */}
                    <Box sx={{ width: 100, mt: 2 }}>
                        <ApprovalButton
                            size={12}
                            iconSize={17}
                            text={"Add"}
                            icon={GrSend}
                            onClick={handleDepartmentActionDetail}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default memo(IncidentActionSubmit);
