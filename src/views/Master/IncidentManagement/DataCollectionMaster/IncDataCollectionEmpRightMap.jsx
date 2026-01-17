import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';

import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';

import IncDataCollectionEmpRightMapTable from './IncDataCollectionEmpRightMapTable';

import { getAllIncDcEmpMap } from '../CommonCode/IncidentCommonCode';
import SelectDepartmentSection from 'src/views/IncidentManagement/Components/SelectDepartmentSection';
import SelectDepartmentSectionEmployye from 'src/views/IncidentManagement/Components/SelectDepartmentSectionEmployye';

const IncDataCollectionEmpRightMap = () => {

    const navigate = useNavigate();
    const empid = useSelector(state => state.LoginUserData.empid);

    // SELECT VALUES (OBJECTS)
    const [incdep, setIncDep] = useState(null);
    const [emid, setEmpid] = useState(null);

    //MODE
    const [mode, setMode] = useState(0); // 0 = insert, 1 = update

    // FORM DATA
    const [formData, setFormData] = useState({
        inc_dc_emp_slno: 0,
        inc_dc_emp_status: true
    });

    const { inc_dc_emp_slno, inc_dc_emp_status } = formData;

    //  DESTRUCTURE IDS (AS REQUESTED)
    const { sec_id } = incdep ?? {};
    const { em_id } = emid ?? {};

    //  TABLE DATA
    const {
        data: tableData = [],
        refetch
    } = useQuery({
        queryKey: ['getIncDcEmpMap'],
        queryFn: getAllIncDcEmpMap,
        staleTime: Infinity
    });

    //  RESET
    const reset = useCallback(() => {
        setIncDep(null);
        setEmpid(null);
        setFormData({
            inc_dc_emp_slno: 0,
            inc_dc_emp_status: true
        });
        setMode(0);
    }, []);

    // ROW SELECT
    const RowSelect = useCallback((row) => {
        if (!row) return infoNotify("Please select a row");

        setMode(1);
        setFormData({
            inc_dc_emp_slno: row.inc_dc_emp_slno,
            inc_dc_emp_status: row.inc_dc_emp_status === 1
        });

        // // OPTIONAL: set selected objects if table provides them
        setIncDep({ sec_id: row.inc_sec_id, sec_name: row.sec_name });
        setEmpid({ em_id: row.inc_emp_id, em_name: row.em_name });

    }, []);

    //  POST DATA
    const postData = useMemo(() => ({
        inc_sec_id: sec_id ?? 0,
        inc_emp_id: em_id ?? 0,
        inc_dc_emp_status: inc_dc_emp_status ? 1 : 0
    }), [sec_id, em_id, inc_dc_emp_status, empid]);

    //PATCH DATA
    const patchData = useMemo(() => ({
        inc_dc_emp_slno,
        inc_sec_id: sec_id ?? 0,
        inc_emp_id: em_id ?? 0,
        inc_dc_emp_status: inc_dc_emp_status ? 1 : 0,
    }), [inc_dc_emp_slno, sec_id, em_id, inc_dc_emp_status, empid]);

    // SUBMIT
    const submitHandler = useCallback(async (e) => {
        e.preventDefault();

        if (!sec_id) return warningNotify("Please select Section");
        if (!em_id) return warningNotify("Please select Employee");

        try {
            const apiCall =
                mode === 0
                    ? axioslogin.post('/incidentMaster/insertDcEmpMap', postData)
                    : axioslogin.patch('/incidentMaster/updateDcEmpMap', patchData);

            const { success, message } = (await apiCall).data;
            if (success === 1) return infoNotify(message);
            if (success === 2) {
                succesNotify(message);
                refetch();
                reset();
            } else {
                infoNotify(message);
            }
        } catch (error) {
            infoNotify("Something went wrong");
        }
    }, [mode, sec_id, em_id, postData, patchData, refetch, reset]);

    return (
        <CardMaster
            title="Incident Data Collection – Employee Rights"
            submit={submitHandler}
            close={() => navigate('/Home/Settings')}
            refresh={reset}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>

                            <Grid item xl={12} lg={12}>
                                <SelectDepartmentSection
                                    departmentsec={incdep}
                                    setDepartmentSec={setIncDep}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <SelectDepartmentSectionEmployye
                                    value={emid}
                                    setValue={setEmpid}
                                    departmentsection={incdep}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Data Collection Status"
                                    checked={inc_dc_emp_status}
                                    onCheked={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            inc_dc_emp_status: e.target.checked
                                        }))
                                    }
                                />
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xl={8} lg={8}>
                        <IncDataCollectionEmpRightMapTable
                            tableData={tableData}
                            rowSelect={RowSelect}
                        />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    );
};

export default memo(IncDataCollectionEmpRightMap);
