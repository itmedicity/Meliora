import { Grid, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import React from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import DietMasterTable from './DietMasterTable'
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react'
const DietMaster = () => {
    const history = useHistory();
    const backToSetting = useCallback(() => {
        history.push(`/Home/settings`)
    }, [history])
    return (
        <CardMaster
            title='Diet Master'
            close={backToSetting}
        >
            <Paper sx={{ padding: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Diet name"
                                    type="text"
                                    size="sm"
                                />
                            </Grid>
                            <Grid item xl={2} lg={2}>
                                <CusCheckBox
                                    label="status"
                                    color="primary"
                                    size="md"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={8} lg={8}>
                        <DietMasterTable />
                    </Grid>
                </Grid>
            </Paper>
        </CardMaster>
    )
}
export default DietMaster