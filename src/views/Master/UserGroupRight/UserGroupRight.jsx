import { Box, Grid } from '@mui/material'
import React from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CusIconButton from '../../Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import { tableIcons } from 'src/views/Common/MaterialiCon';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import UserGroupSelect from 'src/views/CommonSelectCode/UserGroupSelect';
import ModuleSelect from 'src/views/CommonSelectCode/ModuleSelect';


const UserGroupRight = () => {
    const history = useHistory();

    // const [tableData, setTabledata] = useState([])
    const colums = [
        {
            title: "SlNo", field: "user_grp_slno",
        },
        {
            title: "Menu Name", field: "user_grp_name",
        }

    ]

    //back to home
    const backtoSetting = () => {
        history.push('/Home/Settings')
    }


    const groupRightUpdateDetl = async (data) => {

    }

    const groupRightUpdateDetls = async (data) => {

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








            {/* <Box>
                <Grid container spacing={2}  >
                    <Grid item xl={12} lg={12}>
                        <Grid container spacing={3}  >
                            <Grid item xl={4} lg={4}  >
                                <UserGroupSelect />
                            </Grid>
                            <Grid item xl={4} lg={4}  >
                                <ModuleSelect />
                            </Grid>
                        </Grid>
                        <Grid item xl={4} lg={4}  >
                            <Box>
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
            </Box> */}



            <Box>
                <Grid container spacing={2}  >
                    <Grid item lg={12} xl={12} >
                        <MaterialTable
                            // data={tableData}
                            columns={colums}
                            icons={tableIcons}
                            actions={[
                                {
                                    icon: () => <CheckCircleOutlinedIcon color="disabled" />,
                                    tooltip: "Click here to Update Rights",
                                },
                                row => {
                                    if (row.menu_view === 0) {
                                        return {
                                            icon: () => <CheckCircleOutlinedIcon color="disabled" />,
                                            tooltip: "Click here to Update Rights",
                                            onClick: (e, data) => groupRightUpdateDetl(data)
                                        }
                                    } else {
                                        return {
                                            icon: () => <CheckCircleOutlinedIcon color="secondary" />,
                                            tooltip: "Click here to Update Rights",
                                            onClick: (e, data) => groupRightUpdateDetls(data)
                                        }
                                    }
                                }
                            ]}
                            options={{
                                paging: false,
                                showFirstLastPageButtons: false,
                                padding: "dense",
                                actionsColumnIndex: -1,
                                toolbar: false,
                                tableLayout: "auto",
                                // selection: true
                            }}
                        />

                    </Grid>
                </Grid>
            </Box>

        </CardMaster >
    )
}

export default UserGroupRight