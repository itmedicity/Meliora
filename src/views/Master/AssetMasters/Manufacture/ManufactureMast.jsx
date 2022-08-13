import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import ManufactureTable from './ManufactureTable';
const ManufactureMast = () => {
    const history = useHistory();
    //intializing
    const [manf, setManf] = useState({
        manfname: '',
        status: false
    })
    //destructuring
    const { manfname, status } = manf
    const updateManufacture = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setManf({ ...manf, [e.target.name]: value })
    }, [manf])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Manufacture Master"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Manufacture Name"
                                    type="text"
                                    size="sm"
                                    name="manfname"
                                    value={manfname}
                                    onchange={updateManufacture}
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
                                    onCheked={updateManufacture}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <ManufactureTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default ManufactureMast