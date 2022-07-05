import { Box, Grid } from '@mui/material'
import React from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CusIconButton from '../../Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom'
import UserGroupSelect from 'src/views/CommonSelectCode/UserGroupSelect';
import ModuleSelect from 'src/views/CommonSelectCode/ModuleSelect';


const UserGroupRight = () => {
    const history = useHistory();

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
            <Box >
                <Grid item xl={12} lg={12}>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xl={4} lg={4}>
                            <UserGroupSelect />
                        </Grid>
                        <Grid item xl={4} lg={4} >
                            <ModuleSelect />

                        </Grid>
                        <Grid item xl={4} lg={4}  >
                            <Box mb={2} >
                                <Grid container spacing={3} >
                                    <Grid item lg={1} xl={1} >
                                        <CustomeToolTip title="Search" placement="left" >
                                            <Box>
                                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true">
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
                    </Grid>
                </Grid>
            </Box>
        </CardMaster >
    )
}

export default UserGroupRight