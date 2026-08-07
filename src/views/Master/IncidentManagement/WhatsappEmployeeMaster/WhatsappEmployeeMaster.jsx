import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import React, {
    memo,
    useCallback,
    useMemo,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { axioslogin } from 'src/views/Axios/Axios';

import {
    infoNotify,
    succesNotify,
    warningNotify
} from 'src/views/Common/CommonCode';

import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';

import WhatsappNumberMasterTable from './WhatsappNumberMasterTable';
import SelectDepartmentSection from 'src/views/IncidentManagement/Components/SelectDepartmentSection';
import SelectDepartmentSectionEmployye from 'src/views/IncidentManagement/Components/SelectDepartmentSectionEmployye';
import { useAllWhatsappEmployeeMaster } from 'src/views/IncidentManagement/CommonComponent/useQuery';


const WhatsappEmployeeMaster = () => {

    const navigate = useNavigate();
    const { data: tableData = [], refetch } = useAllWhatsappEmployeeMaster
    ()
    const empid = useSelector(
        state => state.LoginUserData.empid
    );

    const [mode, setMode] = useState(0);

    const [incdep, setIncDep] = useState(null);
    const [emid, setEmpid] = useState(null);

    const [formData, setFormData] = useState({
        whatsapp_slno: 0,
        whatsapp_number: '',
        whatsapp_status: true
    });

    const {
        whatsapp_slno,
        whatsapp_number,
        whatsapp_status
    } = formData;

    const { sec_id } = incdep ?? {};
    const { em_id } = emid ?? {};



    const reset = useCallback(() => {

        setIncDep(null);
        setEmpid(null);

        setFormData({
            whatsapp_slno: 0,
            whatsapp_number: '',
            whatsapp_status: true
        });

        setMode(0);

    }, []);

    const RowSelect = useCallback((row) => {

        if (!row) {
            return infoNotify(
                'Please select a row'
            );
        }

        setMode(1);

        setIncDep({
            sec_id: row.sect_id,
            sec_name: row.sect_name
        });

        setEmpid({
            em_id: row.emp_id,
            em_name: row.em_name
        });

        setFormData({
            whatsapp_slno: row.whatsapp_slno,
            whatsapp_number: row.whatsapp_number,
            whatsapp_status:
                row.whatsapp_status === 1
        });

    }, []);

    const postData = useMemo(() => ({
        emp_id: em_id ?? 0,
        sect_id: sec_id ?? 0,
        whatsapp_number,
        whatsapp_status:
            whatsapp_status ? 1 : 0,
        create_user: empid
    }), [
        em_id,
        sec_id,
        whatsapp_number,
        whatsapp_status,
        empid
    ]);

    const patchData = useMemo(() => ({
        whatsapp_slno,
        emp_id: em_id ?? 0,
        sect_id: sec_id ?? 0,
        whatsapp_number,
        whatsapp_status:
            whatsapp_status ? 1 : 0,
        edit_user: empid
    }), [
        whatsapp_slno,
        em_id,
        sec_id,
        whatsapp_number,
        whatsapp_status,
        empid
    ]);

    const submitHandler = useCallback(async (e) => {

        e.preventDefault();

        if (!sec_id) {
            return warningNotify(
                'Please select Section'
            );
        }

        if (!em_id) {
            return warningNotify(
                'Please select Employee'
            );
        }
        if (!whatsapp_number?.trim()) {
            return warningNotify(
                'Please enter WhatsApp Number'
            );
        }

        if (!/^\d{10}$/.test(whatsapp_number)) {
            return warningNotify(
                'WhatsApp Number must be exactly 10 digits'
            );
        }

        try {

            const apiCall =
                mode === 0
                    ? axioslogin.post(
                        '/incidentMaster/insert-inc-whatsapp',
                        postData
                    )
                    : axioslogin.patch(
                        '/incidentMaster/update-inc-whatsapp',
                        patchData
                    );

            const { data } = await apiCall;

            const {
                success,
                message
            } = data;

            if (success === 1) {
                return infoNotify(message);
            }

            if (success === 2) {

                succesNotify(message);

                refetch();

                reset();

                return;
            }

            infoNotify(message);

        } catch (error) {

            infoNotify(
                'Something went wrong'
            );

        }

    }, [
        mode,
        sec_id,
        em_id,
        whatsapp_number,
        postData,
        patchData,
        refetch,
        reset
    ]);

    return (
        <CardMaster
            title="WhatsApp Employee Master"
            submit={submitHandler}
            close={() =>
                navigate('/Home/Settings')
            }
            refresh={reset}
        >

            <Box sx={{ p: 1 }}>

                <Grid
                    container
                    spacing={1}
                >

                    <Grid
                        item
                        xl={4}
                        lg={4}
                    >

                        <Grid
                            container
                            spacing={1}
                        >

                            <Grid
                                item
                                xl={12}
                                lg={12}
                            >
                                <SelectDepartmentSection
                                    departmentsec={
                                        incdep
                                    }
                                    setDepartmentSec={
                                        setIncDep
                                    }
                                />
                            </Grid>

                            <Grid
                                item
                                xl={12}
                                lg={12}
                            >
                                <SelectDepartmentSectionEmployye
                                    value={emid}
                                    setValue={setEmpid}
                                    departmentsection={
                                        incdep
                                    }
                                />
                            </Grid>

                            <Grid
                                item
                                xl={12}
                                lg={12}
                            >
                                <TextFieldCustom
                                    placeholder="WhatsApp Number"
                                    value={
                                        whatsapp_number
                                    }
                                    onchange={(e) =>
                                        setFormData(
                                            prev => ({
                                                ...prev,
                                                whatsapp_number: e.target.value.replace(/\D/g, '').slice(0, 10)
                                            })
                                        )
                                    }
                                />
                            </Grid>

                            <Grid
                                item
                                xl={12}
                                lg={12}
                            >
                                <CusCheckBox
                                    label="Status"
                                    checked={
                                        whatsapp_status
                                    }
                                    onCheked={(e) =>
                                        setFormData(
                                            prev => ({
                                                ...prev,
                                                whatsapp_status:
                                                    e.target.checked
                                            })
                                        )
                                    }
                                />
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid
                        item
                        xl={8}
                        lg={8}
                    >

                        <WhatsappNumberMasterTable
                            tableData={
                                tableData
                            }
                            rowSelect={
                                RowSelect
                            }
                        />

                    </Grid>

                </Grid>

            </Box>

        </CardMaster>
    );
};

export default memo(
    WhatsappEmployeeMaster
);