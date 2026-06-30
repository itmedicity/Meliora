import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import IncidentNotificationConfigTable from './IncidentNotificationConfigTable';
import SelectDepartmentSection from 'src/views/IncidentManagement/Components/SelectDepartmentSection';
import SelectDepartmentSectionEmployye from 'src/views/IncidentManagement/Components/SelectDepartmentSectionEmployye';
import { useAllIncidentNotificationEventsConfig } from 'src/views/IncidentManagement/CommonComponent/useQuery';
import SelectEventMaster from 'src/views/IncidentManagement/Components/SelectEventMaster';


const IncidentNotificationConfigMaster = () => {
    const navigate = useNavigate();
    const { data: tableData = [], refetch } = useAllIncidentNotificationEventsConfig();
    const empid = useSelector(state => state.LoginUserData.empid);

    const [mode, setMode] = useState(0);
    const [incdep, setIncDep] = useState(null);
    const [emid, setEmpid] = useState(null);
    const [event, setEvent] = useState(null);

    const [formData, setFormData] = useState({
        config_slno: 0,
        status: true
    });

    const {
        config_slno,
        status
    } = formData;

    const { sec_id } = incdep ?? {};
    const { em_id } = emid ?? {};
    const { event_slno } = event ?? {};

    const reset = useCallback(() => {
        setIncDep(null);
        setEmpid(null);
        setEvent(null);
        setFormData({
            config_slno: 0,
            status: true
        });
        setMode(0);
    }, []);

    const RowSelect = useCallback((row) => {
        if (!row) return infoNotify('Please select a row');
        setMode(1);
        setIncDep({
            sec_id: row.section_id,
            sec_name: row.sec_name
        });
        setEvent({
            event_slno: row.event_slno,
            event_name: row.event_name
        });
        setEmpid({
            em_id: row.emp_id,
            em_name: row.em_name
        });
        setFormData({
            config_slno: row.config_slno,
            status: row.status === 1
        });
    }, []);

    const postData = useMemo(() => ({
        section_id: sec_id ?? 0,
        event_slno: event_slno ?? 0,
        dept_slno: incdep?.dept_slno ?? null,
        emp_id: em_id ?? 0,
        status: status ? 1 : 0,
        create_user: empid
    }), [sec_id, event_slno, incdep, em_id, status, empid]);

    const patchData = useMemo(() => ({
        config_slno,
        section_id: sec_id ?? 0,
        event_slno: event_slno ?? 0,
        dept_slno: incdep?.dept_slno ?? null,
        emp_id: em_id ?? 0,
        status: status ? 1 : 0,
        edit_user: empid
    }), [config_slno, sec_id, event_slno, incdep, em_id, status, empid]);

    const submitHandler = useCallback(async (e) => {
        e.preventDefault();

        if (!sec_id) return warningNotify('Please select Section');
        if (!event_slno) return warningNotify('Please select Event');
        if (!em_id) return warningNotify('Please select Employee');

        try {
            const apiCall =
                mode === 0
                    ? axioslogin.post('/incidentMaster/insert-inc-notification-config', postData)
                    : axioslogin.patch('/incidentMaster/update-inc-notification-config', patchData);

            const { data } = await apiCall;
            const { success, message } = data;

            if (success === 2) {
                succesNotify(message);
                refetch();
                reset();
                return;
            }

            warningNotify(message || 'Something went wrong');
        } catch (error) {
            warningNotify('Something went wrong');
        }
    }, [mode, sec_id, event_slno, em_id, postData, patchData, refetch, reset]);

    return (
        <CardMaster
            title="Incident Notification Config Master"
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
                                <SelectEventMaster
                                    eventsection={event}
                                    setEventSection={setEvent}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Status"
                                    checked={status}
                                    onCheked={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            status: e.target.checked
                                        }))
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xl={8} lg={8}>
                        <IncidentNotificationConfigTable
                            tableData={tableData}
                            rowSelect={RowSelect}
                        />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    );
};

export default memo(IncidentNotificationConfigMaster);