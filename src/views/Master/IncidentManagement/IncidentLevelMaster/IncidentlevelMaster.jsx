import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import EmployeeSelectJoyAutoComp from 'src/views/CommonSelectCode/EmployeeSelectJoyAutoComp';
import AmDeptSecLocationSelect from 'src/views/CommonSelectCode/AmDeptSecLocationSelect';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeptsection } from 'src/redux/actions/DeptSection.action';
import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import IncidentLevelMasterTable from './IncidentLevelMasterTable';
import { handleApi } from '../CommonCode/IncidentCommonCode';
import { useNavigate } from 'react-router-dom';
import { useIncidentLevels } from 'src/views/IncidentManagement/CommonComponent/useQuery';

const IncidentlevelMaster = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state
    const [deptSec, setDeptSec] = useState(0);
    const [employee, setEmployee] = useState(0);
    const [value, setValue] = useState(0);

    const id = useSelector((state) => state.LoginUserData.empid);

    // fetch incident levels
    const { data: incidentlevels, refetch: FetchAllIncidentLevel } = useIncidentLevels();
    // form data
    const [formData, setFormData] = useState({
        level_slno: '',
        levelNo: '',
        levelName: '',
        status: true,
    });

    const { level_slno, levelNo, levelName, status } = formData;

    // fetch all dept sections on mount
    useEffect(() => {
        dispatch(getDeptsection());
    }, [dispatch]);

    //  handle deptSec change → fetch employees
    useEffect(() => {
        if (deptSec) {
            // deptSec can be either object or ID, handle both
            const deptSecId = typeof deptSec === 'object' ? deptSec.dept_id || deptSec.value || 0 : deptSec;
            if (deptSecId !== 0) {
                dispatch(getDepartSecemployee(deptSecId));
                setEmployee(0);
            }
        } else {
            setEmployee(0);
        }
    }, [deptSec, dispatch]);

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
        const { level_no, level_name, emp_id, level_status, sec_id, level_slno } = val;
        setValue(1);
        const frmdata = {
            levelNo: level_no,
            levelName: level_name,
            status: level_status === 1 ? true : false,
            level_slno: level_slno,
        };
        setFormData(frmdata);
        setEmployee(emp_id);
        setDeptSec(sec_id);
    }, []);

    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings');
    }, [navigate]);

    const reset = useCallback(() => {
        setFormData({
            levelNo: '',
            levelName: '',
            status: true,
        });
        setValue(0);
        setDeptSec(0);
        setEmployee(0);
    }, []);

    // post data
    const postdata = useMemo(() => ({
        level_no: levelNo,
        level_name: levelName,
        sec_id: typeof deptSec === 'object' ? deptSec.dept_id || deptSec.value || 0 : deptSec,
        emp_id: employee,
        level_status: status ? 1 : 0,
        create_user: id
    }), [levelNo, levelName, employee, status, id, deptSec]);

    // patch data
    const patchdata = useMemo(() => ({
        level_no: levelNo,
        level_name: levelName,
        sec_id: typeof deptSec === 'object' ? deptSec.dept_id || deptSec.value || 0 : deptSec,
        emp_id: employee,
        level_status: status ? 1 : 0,
        level_slno: level_slno,
        edit_user: id
    }), [levelNo, levelName, employee, status, level_slno, id, deptSec]);

    // submit
    const IncidentLevelApproval = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                if (!levelNo) return warningNotify("Please enter the Level Number");
                if (levelName === "") return warningNotify("Please enter the Level Name");
                if (employee === 0) return warningNotify("Please select the Employee");
                if (value === 0) {
                    handleApi("post", "/incidentMaster/insertlevelapproval", postdata, 2, FetchAllIncidentLevel, reset);
                } else {
                    handleApi("patch", "/incidentMaster/updatelevelapproval", patchdata, 2, FetchAllIncidentLevel, reset);
                }
            } catch (error) {
                infoNotify("Something went wrong, please try again");
                console.error("IncidentLevelApproval error:", error);
            }
        },
        [value, postdata, patchdata, levelNo, levelName, employee, FetchAllIncidentLevel, reset]
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
                                <TextFieldCustom
                                    startDecorator={"Level No. "}
                                    type='number'
                                    size="sm"
                                    value={levelNo}
                                    name='levelNo'
                                    onchange={updateField}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Level Name"
                                    type="text"
                                    name="levelName"
                                    size="sm"
                                    value={levelName}
                                    onchange={updateField}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                {/*  Department/Section selector */}
                                <AmDeptSecLocationSelect location={deptSec} setLocation={setDeptSec} />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                {/*  Employee selector (auto-refresh on dept change) */}
                                <EmployeeSelectJoyAutoComp employee={employee} setEmployee={setEmployee} />
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
                        <IncidentLevelMasterTable tableData={incidentlevels} rowSelect={RowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    );
};

export default memo(IncidentlevelMaster);
