import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import BuildingTable from './BuildingTable';
const BuildingMaster = () => {
    const history = useHistory();
    //intializing
    const [build, setBuild] = useState({
        buildname: '',
        status: false
    })
    //destructuring 
    const { buildname, status } = build
    const updateBuilding = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setBuild({ ...build, [e.target.name]: value })
    }, [build])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Building Master"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Building Name"
                                    type="text"
                                    size="sm"
                                    name="buildname"
                                    value={buildname}
                                    onchange={updateBuilding}
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
                                    onCheked={updateBuilding}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <BuildingTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default BuildingMaster