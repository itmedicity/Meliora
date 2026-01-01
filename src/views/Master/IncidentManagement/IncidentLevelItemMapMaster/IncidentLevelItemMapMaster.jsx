import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import React, { memo, useCallback, useMemo, useState } from 'react';
import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { handleApi } from '../CommonCode/IncidentCommonCode';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IncidentActionMasterSelect from 'src/views/CommonSelectCode/IncidentActionMasterSelect';
import IncidentLevelMasterSelect from 'src/views/CommonSelectCode/IncidentLevelMasterSelect';
import { useIncidentLevelItemMap } from 'src/views/IncidentManagement/CommonComponent/useQuery';
import IncidentLevelItemMapMasterTabel from './IncidentLevelItemMapMasterTabel';
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect';
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept';

const IncidentLevelItemMapMaster = () => {

    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [dept, setDept] = useState(0)
    const [deptsec, setDeptsec] = useState(0)
    const id = useSelector((state) => state.LoginUserData.empid);
    const { data: levelitemmapdetail, refetch: fetchAllLevelItemMap } = useIncidentLevelItemMap()

    // form data
    const [formData, setFormData] = useState({
        level_item_slno: 0,
        level_slno: 0,
        inc_action_slno: 0,
        status: true,
    });

    const { level_item_slno, level_slno, inc_action_slno, status } = formData;

    // handle field change
    const updateField = useCallback(
        (e) => {
            let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            if (e.target.type === 'text') {
                value = value.toUpperCase();
            }
            setFormData({ ...formData, [e.target.name]: value });
        },
        [formData]
    );


    // select row from table
    const RowSelect = useCallback((val) => {
        const { inc_level_item_slno, level_slno, inc_action_slno, inc_level_item_status, dep_id, sec_id } = val;
        setValue(1);
        setDeptsec(sec_id)
        setDept(dep_id)
        const frmdata = {
            level_item_slno: inc_level_item_slno,
            level_slno: level_slno,
            inc_action_slno: inc_action_slno,
            status: inc_level_item_status === 1 ? true : false
        };
        setFormData(frmdata);
    }, []);

    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings');
    }, [navigate]);

    const reset = useCallback(() => {
        setFormData({
            level_item_slno: 0,
            level_slno: 0,
            inc_action_slno: 0,
            status: true,
        });
        setValue(0);
    }, []);


    // post data
    const postdata = useMemo(() => ({
        level_slno: level_slno,
        inc_action_slno: inc_action_slno,
        inc_level_item_status: status ? 1 : 0,
        create_user: id,
        dep_id: dept,
        sec_id: deptsec
    }), [inc_action_slno, level_slno, status, id, dept, deptsec]);


    // patch data
    const patchdata = useMemo(() => ({
        level_slno: level_slno,
        inc_action_slno: inc_action_slno,
        inc_level_item_status: status ? 1 : 0,
        edit_user: id,
        dep_id: dept,
        sec_id: deptsec,
        inc_level_item_slno: level_item_slno
    }), [inc_action_slno, level_slno, status, level_slno, id, level_item_slno]);


    // submit
    const IncidentLevelApproval = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                if (!level_slno) return warningNotify("Please enter the Level Number");
                if (inc_action_slno === "") return warningNotify("Please enter the Level Name");

                if (value === 0) {
                    handleApi("post", "/incidentMaster/insertinclevelitemmap", postdata, 2, fetchAllLevelItemMap, reset);
                } else {
                    handleApi("patch", "/incidentMaster/updateinclevelitemmap", patchdata, 2, fetchAllLevelItemMap, reset);
                }
            } catch (error) {
                infoNotify("Something went wrong, please try again");
                console.error("IncidentLevelApproval error:", error);
            }
        },
        [value, postdata, patchdata, reset]
    );

    return (
        <CardMaster
            title="Incident Level Approval"
            submit={IncidentLevelApproval}
            close={backtoSetting}
            refresh={reset}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <Box sx={{}}>
                                    <DepartmentSelect value={dept} setValue={setDept} />
                                </Box>
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <Box sx={{ mt: 1.5 }}>
                                    <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
                                </Box>
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <Box sx={{}}>
                                    <IncidentLevelMasterSelect
                                        empdept={dept}
                                        empsecid={deptsec}
                                        value={level_slno}
                                        setValue={(newVal) => setFormData(prev => ({ ...prev, level_slno: newVal }))}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <Box sx={{}}>
                                    <IncidentActionMasterSelect
                                        value={inc_action_slno}
                                        setValue={(newVal) => setFormData(prev => ({ ...prev, inc_action_slno: newVal }))}
                                    />
                                </Box>
                            </Grid>
                            <Grid item lg={12} xl={12}>
                                <CusCheckBox
                                    label="Level Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updateField}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8}>
                        <IncidentLevelItemMapMasterTabel tableData={levelitemmapdetail} rowSelect={RowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    );
};

export default memo(IncidentLevelItemMapMaster);
