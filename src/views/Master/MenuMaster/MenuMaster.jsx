import { Box, Grid } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import CardMaster from 'src/views/Components/CardMaster';
import { useNavigate } from 'react-router-dom';
import ModuleSelect from 'src/views/CommonSelectCode/ModuleSelect';
import SubModuleGroup from 'src/views/CommonSelectCode/SubModuleGroup';
import { axioslogin } from 'src/views/Axios/Axios';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import EditIcon from '@mui/icons-material/Edit';
import {
    succesNotify,
    warningNotify,
    errorNotify
} from 'src/views/Common/CommonCode';

import { useAllMenuDetailFetch } from '../MasterUseQuery/MasterUseQuery';
import CusAgeGridMenu from 'src/views/Components/CusAgeGridMenu';
import { useSelector } from 'react-redux';

const MenuMaster = () => {
    const navigate = useNavigate();
    /* ================= STATE ================= */
    const [modulename, setModule] = useState(0);
    const [subModule, setSubModule] = useState(0);

    const [menuname, setMenuName] = useState('');
    const [status, setStatus] = useState(true);

    const [isedit, setIsEdit] = useState(0);
    const [editRow, setEditRow] = useState(null);

    /* ================= FETCH ================= */
    const {
        data: allMenuDetail = [],
        refetch: fetchAllMenuDetails
    } = useAllMenuDetailFetch();

    const id = useSelector((state) => { return state.LoginUserData.empid });

    /* ================= GRID COLUMN ================= */
    const column = useMemo(() => [
        { headerName: 'Sl No', field: 'menu_slno', width: 100 },
        { headerName: 'Menu Name', field: 'menu_name', flex: 1 },
        { headerName: 'Module Name', field: 'module_name', flex: 1 },
        { headerName: 'Sub Module Name', field: 'sub_module_name', flex: 1 },
        {
            headerName: 'Action',
            width: 120,
            cellRenderer: (params) => (
                <EditIcon
                    sx={{ cursor: 'pointer' }}
                    color="primary"
                    onClick={() => handleEdit(params.data)}
                />
            )
        }
    ], []);

    /* ================= EDIT CLICK ================= */
    const handleEdit = useCallback((row) => {
        setIsEdit(1);
        setEditRow(row);
        setModule(row?.menu_module_slno);
        setSubModule(row?.sub_module_slno);
        setMenuName(row?.menu_name);
        setStatus(row?.menu_status === 1);
    }, []);


    /* ================= INSERT / UPDATE ================= */
    const handleMenuMaster = useCallback(async () => {
        try {
            if (!menuname) return warningNotify('Please enter Menu Name');
            if (modulename === 0 || subModule === 0) {
                return warningNotify('Please select Module and Sub Module');
            }

            const payload = {
                menu_module_slno: modulename,
                sub_module_slno: subModule,
                menu_name: menuname,
                menu_status: status ? 1 : 0,
                user: id,
                ...(isedit === 1 && { menu_slno: editRow?.menu_slno })
            };

            const api = isedit === 1
                ? '/menumaster/menu/updatemenu'
                : '/menumaster/menu/insertmenu';

            const method = isedit === 1 ? 'patch' : 'post';

            const result = await axioslogin[method](api, payload);
            const { success, message } = result.data;

            if (success === 1) {
                succesNotify(message);
                resetForm();
                fetchAllMenuDetails();
            } else {
                warningNotify(message);
            }
        } catch (error) {
            errorNotify('Error processing menu');
            console.error(error);
        }
    }, [isedit, modulename, subModule, menuname, status, editRow, fetchAllMenuDetails]);

    /* ================= RESET ================= */
    const resetForm = () => {
        setIsEdit(0);
        setEditRow(null);
        setMenuName('');
        setStatus(true);
        setModule(0);
        setSubModule(0);
    };

    /* ================= NAVIGATION ================= */
    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings');
    }, [navigate]);

    /* ================= UI ================= */
    return (
        <CardMaster
            title="Menu Master"
            submit={handleMenuMaster}
            close={backtoSetting}
            refresh={fetchAllMenuDetails}
        >
            <Box sx={{ pl: 2, pt: 2, pb: 1 }}>
                <Grid container spacing={1}>

                    <Grid item xl={3} lg={3}>
                        <ModuleSelect value={modulename} setValue={setModule} />
                    </Grid>

                    <Grid item xl={3} lg={3}>
                        <SubModuleGroup
                            value={subModule}
                            setValue={setSubModule}
                            module={modulename}
                        />
                    </Grid>

                    <Grid item xl={4} lg={4}>
                        <TextFieldCustom
                            placeholder="Menu Name"
                            size="sm"
                            value={menuname}
                            onchange={(e) => setMenuName(e.target.value)}
                        />
                    </Grid>

                    <Grid item xl={2} lg={2}>
                        <CusCheckBox
                            label="Status"
                            checked={status}
                            onCheked={(e) => setStatus(e.target.checked)}
                        />
                    </Grid>

                </Grid>
            </Box>

            <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
                <CusAgeGridMenu
                    columnDefs={column}
                    tableData={allMenuDetail}
                />
            </Box>
        </CardMaster>
    );
};

export default MenuMaster;
