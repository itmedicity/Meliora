import { Box, Grid } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import CardMaster from 'src/views/Components/CardMaster';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CusIconButton from '../../Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import UserGroupSelect from 'src/views/CommonSelectCode/UserGroupSelect';
import ModuleSelect from 'src/views/CommonSelectCode/ModuleSelect';
import SubModuleGroup from 'src/views/CommonSelectCode/SubModuleGroup';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import {
  succesNotify,
  warningNotify,
  errorNotify
} from 'src/views/Common/CommonCode';

const UserGroupRight = () => {
  const history = useNavigate();

  const [usergp, setUsergrp] = useState(0);
  const [modulename, setModule] = useState(0);
  const [subModule, setSubModule] = useState(0);
  const [tabledata, setTabledata] = useState([]);

  /* ================= COLUMN DEFINITIONS ================= */
  const column = useMemo(() => [
    { headerName: 'Sl No', field: 'menu_slno' },
    { headerName: 'Menu Name', field: 'menu_name' },
    {
      headerName: 'Action',
      width: 120,
      cellRenderer: (params) => (
        <CheckCircleOutlinedIcon
          sx={{ cursor: 'pointer' }}
          color={params.data.menu_view === 1 ? 'primary' : 'secondary'}
          onClick={() => HanldeMenuRight(params.data)}
        />
      )
    }
  ], []);

  /* ================= PATCH MENU RIGHT ================= */
  const HanldeMenuRight = useCallback(async (row) => {
    try {
      const patchdata = {
        group_right_slno: row.group_right_slno ?? null,
        menu_view: row.menu_view === 1 ? 0 : 1,
        user_group_slno: row.user_group_slno,
        module_slno: row.module_slno,
        sub_module_slno: row.sub_module_slno,
        menu_slno: row.menu_slno
      };

      const result = await axioslogin.patch('/usergroup/rights', patchdata);
      const { success, message } = result.data;

      if (success === 1) {
        succesNotify(message);

        // OPTIMISTIC UI UPDATE
        setTabledata(prev =>
          prev.map(item =>
            item.menu_slno === row.menu_slno
              ? { ...item, menu_view: patchdata.menu_view }
              : item
          )
        );
      } else {
        warningNotify(message);
      }
    } catch (error) {
      errorNotify('Error updating menu rights');
      console.error(error);
    }
  }, []);

  /* ================= SEARCH ================= */
  const postdata = useMemo(() => ({
    user_group_slno: usergp,
    module_slno: modulename,
    sub_module_slno: subModule
  }), [usergp, modulename, subModule]);

  const search = useCallback(async () => {
    if (usergp === 0 || modulename === 0 || subModule === 0) {
      return warningNotify('Please select User Group, Module and Sub Module');
    }

    const result = await axioslogin.post('/usergroup/rights/getMenu', postdata);
    const { success, data, message } = result.data;

    if (success === 1) {
      succesNotify(message);
      setTabledata(data);
    } else {
      warningNotify(message);
      setTabledata([]);
    }
  }, [postdata]);

  /* ================= NAVIGATION ================= */
  const backtoSetting = useCallback(() => {
    history('/Home/Settings');
  }, [history]);

  /* ================= UI ================= */
  return (
    <CardMaster title="User Group Rights" close={backtoSetting}>
      <Box sx={{ pl: 2, pt: 2, pb: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <UserGroupSelect value={usergp} setValue={setUsergrp} />
          </Grid>

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

          <Box sx={{ pt: 0.4, pl: 2 }}>
            <Grid container spacing={2}>
              <Grid item>
                <CustomeToolTip title="Search">
                  <CusIconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    onClick={search}
                  >
                    <SearchOffIcon fontSize="small" />
                  </CusIconButton>
                </CustomeToolTip>
              </Grid>

              <Grid item>
                <CustomeToolTip title="Close">
                  <CusIconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    onClick={backtoSetting}
                  >
                    <CloseIcon fontSize="small" />
                  </CusIconButton>
                </CustomeToolTip>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>

      <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
        <CusAgGridForMain
          columnDefs={column}
          tableData={tabledata}
        />
      </Box>
    </CardMaster>
  );
};

export default UserGroupRight;
