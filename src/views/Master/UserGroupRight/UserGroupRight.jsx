import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
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
import EditButton from 'src/views/Components/EditButton';

const UserGroupRight = () => {
    const history = useHistory();
    const [usergp, setUsergrp] = useState(0)
    const [modulename, setModule] = useState(0)
    const [tabledis, setTabledis] = useState(0)
    const [tabledata, setTabledata] = useState(0)
    const [column] = useState([
        { headerName: 'slno', field: 'menu_slno' },
        { headerName: 'Menu Name', field: 'menu_name' },
        { headerName: 'Action', cellRenderer: EditButton },

    ])

    const search = useCallback(() => {
        setTabledis(1)
        const getmeus = async (modulename) => {
            const result = await axioslogin.get(`/menumaster/${modulename}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }

        }
        getmeus(modulename)
    }, [modulename])


    // const [gcg, setss] = useState([])
    // const [mnslno, setMnslno] = useState(0)
    // const getdata = (event) => {
    //     setss(event.api.getSelectedRows())
    // }
    // useEffect(() => {
    //     const slno = gcg && gcg.map((val, index) => {
    //         return val.menu_slno
    //     })
    //     setMnslno(slno)
    // }, [gcg])

    //back to home
    const backtoSetting = () => {
        history.push('/Home/Settings')
    }

    return (
        <CardMaster
            title="User Group Master"
            //submit={submitUserGroup}
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
                    //  onSelectionChanged={getdata}
                    /> : null}
            </Box>
        </CardMaster >
    )
}

export default UserGroupRight