import { Box, Grid } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CusIconButton from '../../Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom'
import UserGroupSelect from 'src/views/CommonSelectCode/UserGroupSelect';
import ModuleSelect from 'src/views/CommonSelectCode/ModuleSelect';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import CheckIcon from 'src/views/Components/CheckIcon';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const UserGroupRight = () => {
    //Initializing
    const history = useHistory();
    const [count, setCount] = useState(0)
    const [usergp, setUsergrp] = useState(0)
    const [modulename, setModule] = useState(0)
    const [tabledis, setTabledis] = useState(0)
    const [tabledata, setTabledata] = useState(0)
    const [column] = useState([
        { headerName: 'slno', field: 'menu_slno' },
        { headerName: 'Menu Name', field: 'menu_name' },
        { headerName: 'Action', cellRenderer: CheckIcon, width: 2 }
    ])
    const columnTypes = {
        nonEditableColumn: { editable: false },

    };
    /*** get menus from table its under selected module */
    const search = useCallback(() => {
        setTabledis(1)
        const getmeus = async (modulename) => {
            const result = await axioslogin.get(`/menumaster/${modulename}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                setTabledata(data)
                warningNotify("No Menus are under selected module")
            }
        }
        getmeus(modulename)
    }, [modulename])

    const [menudata, setMenudata] = useState([])
    const [mnslno, setMnslno] = useState(0)
    useEffect(() => {
        if (menudata.length !== 0) {
            const { menu_slno } = menudata[0]
            setMnslno(menu_slno)
        }

    }, [menudata])
    /*** when proceess button click data insert to user right table */
    const getdata = async (event) => {
        setMenudata(event.api.getSelectedRows())
        const result = await axioslogin.post('/usergrouprights', postdata)
        const { message, success } = result.data;
        if (success === 1) {
            succesNotify(message)
            setCount(count + 1);
        } else if (success === 0) {
            infoNotify(message.sqlMessage);
        } else {
            infoNotify(message)
        }
    }
    /*** Insertdata */
    const postdata = useMemo(() => {
        return {
            user_group_slno: usergp,
            module_slno: modulename,
            menu_slno: mnslno,
            menu_view: 1
        }
    }, [usergp, modulename, mnslno])

    //back to home
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    return (
        <CardMaster
            title="User Group Master"
            close={backtoSetting}
        >
            <Box sx={{ pl: 2, pt: 2, pb: 1 }}>
                <Grid container spacing={1}  >
                    <Grid item xl={3} lg={3}  >
                        <UserGroupSelect value={usergp} setValue={setUsergrp} />
                    </Grid>
                    <Grid item xl={3} lg={3} >
                        <ModuleSelect value={modulename} setValue={setModule} />
                    </Grid>
                    <Box sx={{ pt: 0, pl: 2 }}  >
                        <Grid container spacing={5} >
                            <Grid item lg={1} xl={1} >
                                <CustomeToolTip title="Search" placement="left" >
                                    <Box>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search}>
                                            <SearchOffIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>
                            </Grid>
                            <Grid item lg={1} xl={1} >
                                <CustomeToolTip title="Close" placement="left" >
                                    <Box>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={backtoSetting}>
                                            <CloseIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>

                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
            <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
                {tabledis === 1 ?
                    <CusAgGridMast
                        columnDefs={column}
                        tableData={tabledata}
                        onSelectionChanged={getdata}
                        columnTypes={columnTypes}
                    /> : null}
            </Box>
        </CardMaster >
    )
}

export default UserGroupRight