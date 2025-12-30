import { Box } from '@mui/joy';
import React, { memo, useCallback, useMemo, useState } from 'react';
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

import SelectDepartmentSection from '../Components/SelectDepartmentSection';
import SelectDataCollectionEmployyee from '../Components/SelectDataCollectionEmployyee';

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
    levelNo,
    involvedDepartment
    // setSelectedDeps
}) => {

    const queryClient = useQueryClient();
    const { empsecid, empid } = useSelector(state => {
        return state.LoginUserData
    });
    const [emid, setEmpid] = useState({});
    const [loading, setLoading] = useState(false)
    // Department section and Employee Id
    const { sec_id } = department ?? {};
    const { em_id } = emid ?? {};

    const notAcknowledged = useMemo(() => {
        return involvedDepartment && involvedDepartment?.filter(item => item?.inc_dep_status !== 1);
    }, [involvedDepartment]);


    //Handle Datacollection
    const hanldeDataCollection = useCallback(async () => {
        try {
            setLoading(true)
            // 1. Validate department selection and Employee
            if (!sec_id) return warningNotify("Please Select Section!");
            if (!em_id) return warningNotify("Please Select Employee!");
            // 2. Validate remarks
            if (!datacollectionreamark?.length) {
                warningNotify("Please enter the Remarks");
                return
            }
            if (Number(em_id) === Number(empid)) {
                warningNotify("Cannot Sent to the Logged Person...")
                return
            }
            const foundMatch = notAcknowledged?.find((item) => item?.inc_req_collect_dep === sec_id && item?.inc_req_collect_emp === em_id);

            if (foundMatch) {
                warningNotify("Data Collection sent to this Employee have not been Acknowledged.Please try After That...!");
                return

            }

            //payload for data collection
            const payload = {
                slno: items?.inc_register_slno,
                departments: sec_id,
                status: 1,
                remark: datacollectionreamark,
                createUser: employeeNumber(),
                requested_department: empsecid,
                requested_employee: em_id,
                level_no: levelNo
            }


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
            setEmpid({})
            setDataCollectionRemark("");
            setIsMultipleDep(false);
            setLoading(false)
        }

    }, [datacollectionreamark, sec_id, items, empsecid, selectedDeps, em_id, notAcknowledged]);

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
                                <SectionHeader text="select Department Section" color={"Black"} fontSize={14} iconSize={18} />
                                <SelectDepartmentSection departmentsec={department} setDepartmentSec={setIncDep} />
                                <SectionHeader text="select Department Employee" color={"Black"} fontSize={14} iconSize={18} />
                                <SelectDataCollectionEmployyee value={emid} setValue={setEmpid} departmentsection={department} />
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
                                    disabled={loading}
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
