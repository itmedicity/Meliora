import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import React, { memo, useCallback, useMemo, useState } from 'react';
import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useQuery } from '@tanstack/react-query';
import { incidentDataCollectionMapFetch } from '../CommonCode/IncidentCommonCode';
import { useNavigate } from 'react-router-dom';
import DeptSectionSelect from 'src/views/CommonSelectCode/DeptSectionSelect';
import { useSelector } from 'react-redux';
import IncidentDataCollectionMapMasterTable from './IncidentDataCollectionMapMasterTable';
import DepartmentTypeSelect from 'src/views/CommonSelectCode/DepartmentTypeSelect';
// import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect';


const IncidentDataCollectionMapMaster = () => {

    const navigate = useNavigate()
    const [value, setValue] = useState(0)

    const id = useSelector((state) => { return state.LoginUserData.empid });

    const {
        data: datacollectiondepdetail,
        refetch: fetchallDataCollectionDetail
    } = useQuery({
        queryKey: ['getalldcmm'],
        queryFn: () => incidentDataCollectionMapFetch(),
        staleTime: Infinity
    });

    const [formData, setFormData] = useState({
        slno: 0,
        incdep: 0,
        category: 0,
        status: false,
    });

    const { incdep, category, status, slno } = formData;


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
        const { inc_data_map_slno, inc_category, inc_category_dep, inc_data_map_status } = val
        setValue(1)
        const frmdata = {
            slno: inc_data_map_slno,
            incdep: inc_category_dep,
            category: inc_category,
            status: inc_data_map_status === 1 ? true : false,
        }
        setFormData(frmdata)
    }, [])


    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings')
    }, [navigate])

    const reset = useCallback(() => {
        const frmdata = {
            slno: 0,
            incdep: 0,
            category: 0,
            status: true
        }
        setFormData(frmdata)
        setValue(0)
    }, [])

    // POSTDATA
    const postdata = useMemo(() => ({
        inc_category: category,
        inc_category_dep: incdep,
        inc_data_map_status: status === true ? 1 : 0,
        create_user: id
    }), [incdep, category, status, id]);

    // PATCH DATA
    const patchdata = useMemo(() => ({
        inc_data_map_slno: slno,
        inc_category: category,
        inc_category_dep: incdep,
        inc_data_map_status: status === true ? 1 : 0,
        edit_user: id
    }), [slno, incdep, category, status, id]);


    // incident registration and updation handling
    const IncidentLevelApproval = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                // validations
                if (category === 0) return warningNotify("Please Select the Category");
                if (incdep === 0) return warningNotify("Please select the Department");

                // API call function common for insert/update
                const handleApi = async (method, url, data, successCode) => {
                    try {
                        const result = await axioslogin[method](url, data);
                        const { message, success } = result.data;

                        if (success === successCode) {
                            succesNotify(message);
                            fetchallDataCollectionDetail();
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
                    await handleApi("post", "/incidentMaster/insertdcmm", postdata, 2);
                } else {
                    await handleApi("patch", "/incidentMaster/updatedcmm", patchdata, 2);
                }
            } catch (error) {
                infoNotify("Something went wrong, please try again");
                console.error("IncidentLevelApproval error:", error);
            }
        },
        [value, postdata, patchdata, category, incdep]
    );



    return (

        <CardMaster
            title="Incident Date Collection Map Master"
            submit={IncidentLevelApproval}
            close={backtoSetting}
            refresh={reset}>
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                {/* <Select
                                    value={formData.category}   // <-- keep in formData for consistency
                                    onChange={(event, newValue) =>
                                        setFormData((prev) => ({ ...prev, category: newValue }))
                                    }
                                    placeholder="Select the Category"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                        [`& .${selectClasses.indicator}`]: {
                                            transition: '0.2s',
                                            [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Option value={1}>Clinical</Option>
                                    <Option value={2}>Non-Clinical</Option>
                                    <Option value={3}>Academic</Option>
                                </Select> */}
                                <DepartmentTypeSelect
                                    value={formData.category}
                                    setValue={(val) =>
                                        setFormData((prev) => ({ ...prev, category: val }))
                                    }
                                />

                            </Grid>
                            <Grid item xl={12} lg={12}>

                                {/* <DepartmentSelect
                                    value={formData.incdep}
                                    setValue={(val) =>
                                        setFormData((prev) => ({ ...prev, incdep: val }))
                                    }
                                /> */}

                                <DeptSectionSelect
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
                        <IncidentDataCollectionMapMasterTable tableData={datacollectiondepdetail} rowSelect={RowSelect} />
                    </Grid>
                </Grid>
            </Box>

        </CardMaster>

    )
}

export default memo(IncidentDataCollectionMapMaster)
