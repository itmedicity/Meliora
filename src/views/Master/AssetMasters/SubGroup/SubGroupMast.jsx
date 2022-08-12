import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import SubGroupTable from './SubGroupTable';
const SubGroupMast = () => {
    const history = useHistory();
    //intializing
    const [subgroup, setSubgroup] = useState({
        subname: '',
        status: false
    })
    //destructuring
    const { subname, status } = subgroup
    const updatesubGroup = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setSubgroup({ ...subgroup, [e.target.name]: value })
    }, [subgroup])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    return (
        <CardMaster
            title="Sub Group Name"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Sub Group Name"
                                    type="text"
                                    size="sm"
                                    name="subname"
                                    value={subname}
                                    onchange={updatesubGroup}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updatesubGroup}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <SubGroupTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default SubGroupMast