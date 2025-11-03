import { Box, Tooltip } from '@mui/joy'
import React, { memo, useState } from 'react'
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { IoCalendarOutline } from 'react-icons/io5';
import { formatDateTime } from '../CommonComponent/CommonFun';
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
import FishboneQuestionContainer from '../FishBoneAnalysis/FishboneQuestionContainer';
import { useSelector } from 'react-redux';
import FishboneQuestionPreview from '../FishBoneAnalysis/FishboneQuestionPreview';


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

    const { empsecid } = useSelector(state => {
        return state.LoginUserData
    });
    const [departmentrootcause, setDepartmentRootCause] = useState("");
    const [departmentpreventiveaction, setDepartmentPreventiveAction] = useState("");
    const { MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT } = formValues;

    const parsedDetails = items?.data_collection_details
        ? JSON.parse(items?.data_collection_details)
        : [];


    console.log(parsedDetails, "parsedDetails");


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
            inc_data_collection_slno: items?.inc_data_collection_slno,
            inc_dep_rca: departmentrootcause,
            inc_dep_preventive_action: departmentpreventiveaction,
            inc_dep_status: 1,
            inc_req_ack_user: employeeNumber(),
            inc_dep_fba_status: 1
        };

        const fishbonedetail = {
            inc_register_slno: items?.inc_register_slno,
            inc_data_collection_slno: items?.inc_data_collection_slno,
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
        <Box sx={{ mt: 2 }}>

            <Box sx={{
                width: '100%',
                bgcolor: 'var(--royal-purple-400)',
                py: 1,
                px: 2,
            }}>
                <IncidentTextComponent
                    text="DATA COLLECTION FROM"
                    size={15}
                    weight={600}
                    color="White"
                />
            </Box>

            <Box
                sx={{
                    mt: 1.5,
                    p: 1,
                    borderRadius: "8px",
                    backgroundColor: "#f9f6ff"
                }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Requested User">
                        <span style={{ cursor: 'pointer' }}>
                            <FaPersonCircleCheck style={{ color: 'var(--royal-purple-400)', fontSize: 18 }} />
                        </span>
                    </Tooltip>
                    {/* Only department name */}
                    <IncidentTextComponent
                        text={items?.Requested_user}
                        size={14}
                        weight={600}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Department">
                        <span style={{ cursor: 'pointer' }}>
                            <PiHouseLineDuotone style={{ color: '#666', fontSize: 14 }} />
                        </span>
                    </Tooltip>
                    {/* Only department name */}
                    <IncidentTextComponent
                        text={items?.requested_user_dep}
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
                        text={formatDateTime(items?.Requested_date, "dd/MM/yyyy hh:mm:ss a")}
                        size={12}
                        weight={400}
                        color="#555"
                    />
                </Box>

                <SectionHeader text="REMARKS" />
                <IncidentTextComponent
                    text={`"${items?.inc_req_remark}"`}
                    size={13}
                    weight={400}
                    color="#444"
                />
            </Box>
            {
                parsedDetails[0]?.fba_status === 0 &&
                <FishboneQuestionContainer
                    setFormValues={setFormValues}
                    formValues={formValues}
                    open={open}
                    setOpen={setOpen}
                    setSaveDetail={setSaveDetail}
                />
            }


            {
                items?.inc_dep_status === 0 &&
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
                        parsedDetails[0]?.fba_status === 0 && savedetail &&
                        <FishboneQuestionPreview
                            data={formValues}
                            action={true}
                            setOpen={setOpen}
                            setSaveDetail={setSaveDetail}
                        />
                    }


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
    )
}

export default memo(DataRequestDetail);