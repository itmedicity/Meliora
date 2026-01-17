import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import React, { memo, useCallback, useMemo, useState } from 'react';
import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useQuery } from '@tanstack/react-query';
import { getallCommonSettingMaster } from '../CommonCode/IncidentCommonCode';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CommonSettingMasterTable from './CommonSettingMasterTable';


const CommonSetting = () => {

    const navigate = useNavigate()
    const [value, setValue] = useState(0)

    const id = useSelector((state) => { return state.LoginUserData.empid });

    const {
        data: getallCommonSettingData,
        refetch: fetchallCommonSettingData
    } = useQuery({
        queryKey: ['getallcommonsetting'],
        queryFn: () => getallCommonSettingMaster(),
        staleTime: Infinity
    });

    const [formData, setFormData] = useState({
        slno: 0,
        settingName: "",
        settingLabel: "",
        status: false,
    });

    const { settingLabel, settingName, status, slno } = formData;

    const updateField = useCallback((e) => {
        const { name, type, checked, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);


    const RowSelect = useCallback((val) => {
        const { inc_cs_slno, inc_setting_key, inc_setting_label, inc_cs_status } = val
        setValue(1)
        const frmdata = {
            slno: inc_cs_slno,
            settingName: inc_setting_key,
            settingLabel: inc_setting_label,
            status: inc_cs_status === 1 ? true : false,
        }
        setFormData(frmdata)
    }, [])


    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate])

    const reset = useCallback(() => {
        const frmdata = {
            slno: 0,
            settingName: "",
            settingLabel: "",
            status: true
        }
        setFormData(frmdata)
        setValue(0)
    }, [])

    // POSTDATA
    const postdata = useMemo(() => ({
        inc_setting_key: settingName,
        inc_setting_label: settingLabel,
        inc_cs_status: status === true ? 1 : 0,
        create_user: id
    }), [settingLabel, status, id]);

    // PATCH DATA
    const patchdata = useMemo(() => ({
        inc_cs_slno: slno,
        inc_setting_key: settingName,
        inc_setting_label: settingLabel,
        inc_cs_status: status === true ? 1 : 0,
        edit_user: id
    }), [slno, settingLabel, status, id]);


    // incident registration and updation handling
    const IncidentLevelApproval = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                // validations
                if (settingName === 0) return warningNotify("Please Enter the Setting Name");
                if (settingLabel === 0) return warningNotify("Please Enter the Setting Label");

                // API call function common for insert/update
                const handleApi = async (method, url, data, successCode) => {
                    try {
                        const result = await axioslogin[method](url, data);
                        const { message, success } = result.data;

                        if (success === successCode) {
                            succesNotify(message);
                            fetchallCommonSettingData();
                            reset()
                        } else {
                            infoNotify(message);
                        }
                    } catch (error) {
                        infoNotify("Error while processing request");
                        console.error(error);
                    }
                };

                // choose insert or update
                if (value === 0) {
                    await handleApi("post", "/incidentMaster/insertcommonsetting", postdata, 2);
                } else {
                    await handleApi("patch", "/incidentMaster/updatecommonsetting", patchdata, 2);
                }
            } catch (error) {
                infoNotify("Something went wrong, please try again");
                console.error("IncidentLevelApproval error:", error);
            }
        },
        [value, postdata, patchdata, settingLabel]
    );



    return (

        <CardMaster
            title="Incident Common Settings"
            submit={IncidentLevelApproval}
            close={backtoSetting}
            refresh={reset}>
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Setting Name"
                                    type="text"
                                    size="sm"
                                    name="settingName"
                                    value={settingName}
                                    onchange={updateField}
                                />

                            </Grid>
                            <Grid item xl={12} lg={12}>

                                <TextFieldCustom
                                    placeholder="Setting Name"
                                    type="text"
                                    size="sm"
                                    name="settingLabel"
                                    value={settingLabel}
                                    onchange={updateField}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12}>
                                <CusCheckBox
                                    label="Data Collection Status"
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
                        <CommonSettingMasterTable
                            tableData={getallCommonSettingData}
                            rowSelect={RowSelect}
                        />
                    </Grid>
                </Grid>
            </Box>

        </CardMaster>

    )
}

export default memo(CommonSetting)
