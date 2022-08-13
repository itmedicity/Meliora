import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import FloorTable from './FloorTable';
const FloorMaster = () => {
    const history = useHistory();
    //intializing
    const [floor, setFloor] = useState({
        name: '',
        status: false
    })
    //destructuring
    const { name, status } = floor
    const updateFloor = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFloor({ ...floor, [e.target.name]: value })
    }, [floor])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Floor Master"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Floor Name"
                                    type="text"
                                    size="sm"
                                    name="name"
                                    value={name}
                                    onchange={updateFloor}
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
                                    onCheked={updateFloor}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <FloorTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default FloorMaster