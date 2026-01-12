import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import React, { memo, useCallback, useMemo, useState } from 'react';
import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useQuery } from '@tanstack/react-query';
import { getallCommonSettingMapMaster } from '../CommonCode/IncidentCommonCode';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommonSettingSelect from 'src/views/CommonSelectCode/CommonSettingSelect';
import CommonSettingMapMasterTable from './CommonSettingMapMasterTable';
// import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect';
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect';


const CommonSettingMapMaster = () => {

    const navigate = useNavigate()
    const [value, setValue] = useState(0)

    const id = useSelector((state) => { return state.LoginUserData.empid });

    const {
        data: getallCommonsettingMapMaster,
        refetch: fetchallCommonsettingMapMaster
    } = useQuery({
        queryKey: ['getallcsmm'],
        queryFn: () => getallCommonSettingMapMaster(),
        staleTime: Infinity
    });

    const [formData, setFormData] = useState({
        slno: 0,
        csslno: 0,
        incdep: 0,
        status: false,
    });

    const { incdep, csslno, status, slno } = formData;

    const updateField = useCallback(
        (e) => {
            let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            if (e.target.type === 'text') {
                value = value.toUpperCase();
            }
            setFormData({ ...formData, [e.target.name]: value });
        },
        [formData],
    );

    const RowSelect = useCallback((val) => {
        if (!val) return infoNotify("Please select the Row Properlly!");

        const { inc_cs_dep_map_slno, inc_cs_slno, inc_dep_id, inc_dep_map_status } = val
        setValue(1)
        const frmdata = {
            slno: inc_cs_dep_map_slno,
            csslno: inc_cs_slno,
            incdep: inc_dep_id,
            status: inc_dep_map_status === 1 ? true : false,
        }
        setFormData(frmdata)
    }, [])


    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate])

    const reset = useCallback(() => {
        const frmdata = {
            slno: 0,
            csslno: 0,
            incdep: 0,
            status: true
        }
        setFormData(frmdata)
        setValue(0)
    }, [])

    // POSTDATA
    const postdata = useMemo(() => ({
        inc_cs_slno: csslno,
        inc_dep_id: incdep,
        inc_dep_map_status: status === true ? 1 : 0,
        create_user: id
    }), [incdep, status, id, csslno]);

    // PATCH DATA
    const patchdata = useMemo(() => ({
        inc_cs_dep_map_slno: slno,
        inc_cs_slno: csslno,
        inc_dep_id: incdep,
        inc_dep_map_status: status === true ? 1 : 0,
        edit_user: id
    }), [slno, incdep, status, id, csslno]);


    // incident registration and updation handling
    const IncidentLevelApproval = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                // validations
                if (csslno === 0) return warningNotify("Please Select the Setting Name");
                if (incdep === 0) return warningNotify("Please Select the Department");

                // API call function common for insert/update
                const handleApi = async (method, url, data, successCode) => {
                    try {
                        const result = await axioslogin[method](url, data);
                        const { message, success } = result.data;

                        if (success === successCode) {
                            succesNotify(message);
                            fetchallCommonsettingMapMaster();
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
                    await handleApi("post", "/incidentMaster/insertcsmapmaster", postdata, 2);
                } else {
                    await handleApi("patch", "/incidentMaster/updatecsmapmaster", patchdata, 2);
                }
            } catch (error) {
                infoNotify("Something went wrong, please try again");
                console.error("IncidentLevelApproval error:", error);
            }
        },
        [value, postdata, patchdata, incdep]
    );



    return (

        <CardMaster
            title="Incident Common  Setting Map Master"
            submit={IncidentLevelApproval}
            close={backtoSetting}
            refresh={reset}>
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>

                                <CommonSettingSelect
                                    value={formData.csslno}
                                    setValue={(val) =>
                                        setFormData((prev) => ({ ...prev, csslno: val }))
                                    }
                                />

                            </Grid>
                            <Grid item xl={12} lg={12}>

                                <DepartmentSelect
                                    value={formData.incdep}
                                    setValue={(val) =>
                                        setFormData((prev) => ({ ...prev, incdep: val }))
                                    }
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
                        <CommonSettingMapMasterTable
                            tableData={getallCommonsettingMapMaster}
                            rowSelect={RowSelect}
                        />
                    </Grid>
                </Grid>
            </Box>

        </CardMaster>

    )
}

export default memo(CommonSettingMapMaster)
