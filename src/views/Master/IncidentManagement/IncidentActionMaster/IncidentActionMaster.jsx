import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { handleApi } from '../CommonCode/IncidentCommonCode';
import { useNavigate } from 'react-router-dom';
import IncidentActionMasterTable from './IncidentActionMasterTable';
import { useIncidentActionsMaster } from 'src/views/IncidentManagement/CommonComponent/useQuery';

const IncidentActionMaster = () => {

    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const id = useSelector((state) => state.LoginUserData.empid);

    // fetch incident Action Mast Details
    const { data: incidentaction, refetch: fetchAllDepartmentActionMastDetail } = useIncidentActionsMaster();

    // form data
    const [formData, setFormData] = useState({
        inc_action_slno: '',
        actionname: '',
        status: true,
    });

    const { inc_action_slno, actionname, status } = formData;

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
        const { inc_action_slno, inc_action_name, inc_action_status } = val;
        setValue(1);
        const frmdata = {
            inc_action_slno: inc_action_slno,
            actionname: inc_action_name,
            status: inc_action_status === 1 ? true : false
        };
        setFormData(frmdata);
    }, []);

    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings');
    }, [navigate]);

    const reset = useCallback(() => {
        setFormData({
            inc_action_slno: '',
            actionname: '',
            status: true,
        });
        setValue(0);
    }, []);

    // post data
    const postdata = useMemo(() => ({
        inc_action_name: actionname,
        inc_action_status: status ? 1 : 0,
        create_user: id
    }), [inc_action_slno, actionname, status, id]);

    // patch data
    const patchdata = useMemo(() => ({
        inc_action_slno: inc_action_slno,
        inc_action_name: actionname,
        inc_action_status: status ? 1 : 0,
        edit_user: id
    }), [inc_action_slno, actionname, status, id]);

    // submit
    const HanldeApproval = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                if (actionname.trim() === "") return warningNotify("Please enter the Action Name");
                if (value === 0) {
                    handleApi("post", "/incidentMaster/insertincactionmast", postdata, 2, fetchAllDepartmentActionMastDetail, reset);
                } else {
                    handleApi("patch", "/incidentMaster/updateinctactionmast", patchdata, 2, fetchAllDepartmentActionMastDetail, reset);
                }
            } catch (error) {
                infoNotify("Something went wrong, please try again");
                console.error("IncidentLevelApproval error:", error);
            }
        },
        [value, postdata, patchdata, fetchAllDepartmentActionMastDetail, reset]
    );

    return (
        <CardMaster
            title="Incident Action Master"
            submit={HanldeApproval}
            close={backtoSetting}
            refresh={reset}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Action name"
                                    type="text"
                                    name="actionname"
                                    size="sm"
                                    value={actionname}
                                    onchange={updateField}
                                />
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
                        <IncidentActionMasterTable tableData={incidentaction} rowSelect={RowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    );
};

export default memo(IncidentActionMaster);



