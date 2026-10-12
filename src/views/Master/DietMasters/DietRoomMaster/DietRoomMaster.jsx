import React, { memo, useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/joy';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CardMaster from 'src/views/Components/CardMaster';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import MultipleRoomCategroySelect from 'src/views/CommonSelectCode/MultipleRoomCategroySelect';
import DietRoomMasterTable from './DietRoomMasterTable';

import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { UseRoomCategoryDetail } from 'src/views/Diet/CommonData/UseQuery';

const DietRoomMaster = () => {

    const navigate = useNavigate();
    const empid = useSelector(state => state.LoginUserData.empid);

    const { data: RoomCategoryDetil = [], refetch } = UseRoomCategoryDetail();

    const [editMode, setEditMode] = useState(false);
    const [roomCategories, setRoomCategories] = useState([]);

    const [formData, setFormData] = useState({
        slno: 0,
        roomName: '',
        status: true,
    });

    const { slno, roomName, status } = formData;

    const updateField = useCallback((e) => {
        const { name, type, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value.toUpperCase(),
        }));
    }, []);

    const reset = useCallback(() => {
        setFormData({ slno: 0, roomName: '', status: true });
        setRoomCategories([]);
        setEditMode(false);
    }, []);

    const backtoSetting = useCallback(() => {
        navigate('/Home/Settings');
    }, [navigate]);

    //  EDIT FIX (STRING → ARRAY)
    const RowSelect = useCallback((row) => {
        setFormData({
            slno: row.diet_rm_category_slno,
            roomName: row.diet_rm_name,
            status: row.diet_rm_status === 1,
        });

        const parsedCategories = row.diet_rm_categories
            ? JSON.parse(row.diet_rm_categories)
            : [];

        setRoomCategories(parsedCategories);
        setEditMode(true);
    }, []);

    const postData = useMemo(() => ({
        diet_rm_name: roomName,
        diet_rm_categories: roomCategories,
        diet_rm_status: status ? 1 : 0,
        create_user: empid,
    }), [roomName, roomCategories, status, empid]);

    const patchData = useMemo(() => ({
        diet_rm_category_slno: slno,
        diet_rm_name: roomName,
        diet_rm_categories: roomCategories,
        diet_rm_status: status ? 1 : 0,
        edit_user: empid,
    }), [slno, roomName, roomCategories, status, empid]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!roomName) return warningNotify('Please enter Room Name');
        if (roomCategories.length === 0)
            return warningNotify('Please select Room Category');

        try {
            const result = editMode
                ? await axioslogin.patch('/kotitem/updatedietroom', patchData)
                : await axioslogin.post('/kotitem/insertdietroom', postData);

            const { success, message } = result.data;

            if (success === 1 || success === 2) {
                succesNotify(message);
                refetch();
                reset();
            } else {
                infoNotify(message);
            }
        } catch (error) {
            console.error(error);
            infoNotify('Error while saving data');
        }
    }, [editMode, postData, patchData, roomName, roomCategories, refetch, reset]);

    return (
        <CardMaster
            title="Diet Room Master"
            submit={handleSubmit}
            close={backtoSetting}
            refresh={reset}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>

                            <Grid item xl={12}>
                                <TextFieldCustom
                                    placeholder="Room Name"
                                    name="roomName"
                                    value={roomName}
                                    onchange={updateField}
                                />
                            </Grid>

                            <Grid item xl={12}>
                                <MultipleRoomCategroySelect
                                    categoryDetail={RoomCategoryDetil}
                                    value={roomCategories}
                                    setValue={setRoomCategories}
                                />
                            </Grid>

                            <Grid item xl={12}>
                                <CusCheckBox
                                    label="Status"
                                    name="status"
                                    checked={status}
                                    onCheked={updateField}
                                />
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xl={8} lg={8}>
                        <DietRoomMasterTable
                            tableData={RoomCategoryDetil}
                            rowSelect={RowSelect}
                        />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    );
};

export default memo(DietRoomMaster);
