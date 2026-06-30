import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import EventMasterTable from './EventMasterTable';
import { useAllIncidentNotificationEvents } from 'src/views/IncidentManagement/CommonComponent/useQuery';


const IncidentNotificationEventMaster = () => {
    const navigate = useNavigate();
    const { data: tableData = [], refetch } = useAllIncidentNotificationEvents();

    const [mode, setMode] = useState(0);
    const [formData, setFormData] = useState({
        event_slno: 0,
        event_code: '',
        event_name: '',
        status: true
    });

    const {
        event_slno,
        event_code,
        event_name,
        status
    } = formData;

    const reset = useCallback(() => {
        setFormData({
            event_slno: 0,
            event_code: '',
            event_name: '',
            status: true
        });
        setMode(0);
    }, []);

    const RowSelect = useCallback((row) => {
        if (!row) return infoNotify('Please select a row');
        setMode(1);
        setFormData({
            event_slno: row.event_slno,
            event_code: row.event_code,
            event_name: row.event_name,
            status: row.status === 1
        });
    }, []);

    const postData = useMemo(() => ({
        event_code,
        event_name,
        status: status ? 1 : 0
    }), [event_code, event_name, status]);

    const patchData = useMemo(() => ({
        event_slno,
        event_code,
        event_name,
        status: status ? 1 : 0
    }), [event_slno, event_code, event_name, status]);

    const submitHandler = useCallback(async (e) => {
        e.preventDefault();

        if (!event_code?.trim()) return warningNotify('Please enter Event Code');
        if (!event_name?.trim()) return warningNotify('Please enter Event Name');

        try {
            const apiCall =
                mode === 0
                    ? axioslogin.post('/incidentMaster/insert-inc-event', postData)
                    : axioslogin.patch('/incidentMaster/update-inc-event', patchData);

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
    }, [mode, event_code, event_name, postData, patchData, refetch, reset]);

    return (
        <CardMaster
            title="Incident Notification Event Master"
            submit={submitHandler}
            close={() => navigate('/Home/Settings')}
            refresh={reset}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Event Code"
                                    value={event_code}
                                    onchange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            event_code: e.target.value.toUpperCase().replace(/\s/g, '')
                                        }))
                                    }
                                />
                            </Grid>

                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Event Name"
                                    value={event_name}
                                    onchange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            event_name: e.target.value
                                        }))
                                    }
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
                        <EventMasterTable
                            tableData={tableData}
                            rowSelect={RowSelect}
                        />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    );
};

export default memo(IncidentNotificationEventMaster);