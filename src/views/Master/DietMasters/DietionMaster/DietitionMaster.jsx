import { Box, Grid } from '@mui/material'
import React from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DietitionMasterTable from './DietitionMasterTable'
import { useHistory } from 'react-router-dom'
import { useCallback } from 'react'
// import DietitionMasterTable from './DietitionMasterTable'
const DietitionMaster = () => {
    const history = useHistory();
    const backToSetting = useCallback(() => {
        history.push(`/Home/Settings`)
    }, [history])
    return (

        <CardMaster
            title='Dietition Master'
            close={backToSetting}>
            <Box sx={{
                p: 1,

            }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Dietition Name"
                                    type="text"
                                    size="sm" />
                            </Grid>
                            <Grid item xl={2} lg={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={8} lg={8}>
                        <DietitionMasterTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default DietitionMaster