import { Box } from '@mui/joy';
import React, { memo, useCallback } from 'react';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import SectionHeader from '../Components/SectionHeader';
import { textAreaStyle } from '../CommonComponent/CommonCode';
import ApprovalButton from '../ButtonComponent/ApprovalButton';
import { GrSend } from "react-icons/gr";
import { employeeNumber } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQueryClient } from '@tanstack/react-query';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';

import IncMultipleDepartment from 'src/views/CommonSelectCode/IncMultipleDepartment';
// import { useInvolvedDepartments } from '../CommonComponent/useQuery';


const IncidentDataCollection = ({
    ismultipledep,
    updateMultipleSelect,
    setIncDep,
    datacollectionreamark,
    setDataCollectionRemark,
    items,
    department,
    setIsMultipleDep,
    selectedDeps,
    levelNo
    // setSelectedDeps
}) => {

    const queryClient = useQueryClient();

    const { empsecid, } = useSelector(state => {
        return state.LoginUserData
    });

    // const { data: involvedDepartment } = useInvolvedDepartments(items?.inc_register_slno);

    const hanldeDataCollection = useCallback(async () => {

        //if department doesnt have then return
        // if (!department?.length && !selectedDeps?.length) return warningNotify("Please Select department!");

        // 1. Validate department selection
        if (!department?.length && !selectedDeps?.length) {
            return warningNotify("Please Select Department!");
        }

        // 2. Validate remarks
        if (!datacollectionreamark?.length) {
            return warningNotify("Please enter the Remarks");
        }

        // const existingIds = involvedDepartment?.map(item => item?.inc_req_collect_dep);
        // const finalIds = selectedDeps?.map(item => item?.inc_dep_id);
        // const departmentId = department?.map(item => item?.dept_id);
        // const CombinedIds = [...new Set([...departmentId, ...finalIds])];

        // // Split departments into new and existing
        // const newDepartments = CombinedIds?.filter(depId => !existingIds.includes(depId)) || [];
        // const existingDepartments = CombinedIds?.filter(depId => existingIds.includes(depId)) || [];
        // // Map existing departments to their sec_name for display
        // const existingSecNames = involvedDepartment
        //     ?.filter(item => existingDepartments?.includes(item?.inc_req_collect_dep))
        //     ?.map(item => item?.dept_name);

        // if (existingSecNames.length > 0) {
        //     // Notify user which sections already exist
        //     warningNotify(`Data collection already exists for ${existingSecNames.join(", ")}`);
        // }

        // if (!newDepartments?.length) return;


        // 3. Get department IDs from both lists
        const selectedIds = [
            ...(department?.map(d => d?.dept_id) || []),
            ...(selectedDeps?.map(d => d?.inc_dep_id) || []),
        ];

        // 4. Remove duplicates
        const uniqueDeptIds = [...new Set(selectedIds)];

        //payload for data collection
        const payload = {
            slno: items?.inc_register_slno,
            departments: uniqueDeptIds,
            status: 1,
            remark: datacollectionreamark,
            createUser: employeeNumber(),
            requested_department: empsecid,
            level_no: levelNo
        }

    
        try {
            const { data } = await axioslogin.post("/incidentMaster/reqdatacollection", payload);
            const { success, message } = data ?? {};
            if (success === 2) {
                succesNotify(message);
                queryClient.invalidateQueries('allIncidents');
                queryClient.invalidateQueries('allinvdep');
            } else {
                warningNotify(message);
            }
        } catch (error) {
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            setIncDep(0);
            setDataCollectionRemark("");
            setIsMultipleDep(false);
        }

    }, [datacollectionreamark, department, items, empsecid, selectedDeps]);

    return (
        <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            {/* Header */}
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'var(--royal-purple-400)',
                    py: 1,
                    px: 2,
                }}
            >
                <IncidentTextComponent
                    text="INCIDENT DATA COLLECTION"
                    size={15}
                    weight={600}
                    color="White"
                />
            </Box>

            {/* Body */}
            <Box
                sx={{
                    bgcolor: 'white',
                    px: 2,
                    py: 2,
                    border: '1px solid #e0e0e0',
                    borderTop: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {/* Checkbox */}
                <CusCheckBox
                    className={{ color: '#145DA0', fontSize: 14, fontWeight: 'bold' }}
                    variant="outlined"
                    color="primary"
                    size="md"
                    name="datacollFlag"
                    label="Data Collection Required"
                    value={ismultipledep}
                    onCheked={updateMultipleSelect}
                    checked={ismultipledep}
                />

                {/* Conditionally show department select + remarks */}

                {
                    ismultipledep && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2,
                            }}>
                            {/* Department Select */}
                            <Box >
                                <SectionHeader text="select Department" color={"Black"} fontSize={14} iconSize={18} />

                                {/* <DepartmentSelect value={department} setValue={setDepartment} /> */}

                                <IncMultipleDepartment department={department} setDepartment={setIncDep} />

                                {/* <DataCollectDepSecSelect SetDeptSec={setIncDep} width={'100%'} /> */}
                                <SectionHeader text="Remarks:" color={"Black"} fontSize={14} iconSize={18} />
                                <textarea
                                    placeholder="Enter text here"
                                    value={datacollectionreamark}
                                    onChange={(e) => setDataCollectionRemark(e.target.value)}
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
                            </Box>

                            <Box sx={{ width: 100 }}>
                                <ApprovalButton
                                    size={12}
                                    iconSize={17}
                                    text={"Add"}
                                    icon={GrSend}
                                    onClick={hanldeDataCollection}
                                />
                            </Box>
                        </Box>
                    )}
            </Box>
        </Box>
    );
};

export default memo(IncidentDataCollection);
