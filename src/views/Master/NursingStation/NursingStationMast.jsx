import { Box, Grid } from '@mui/material'
import React from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import NursingStationMastTable from './NursingStationMastTable'
import { useHistory } from 'react-router-dom'
import { useCallback } from 'react'
const NursingStationMast = () => {
    const history = useHistory();
    const backToSettings = useCallback(() => {
        history.push(`/Home/Settings`)
    }, [history])
    return (
        <CardMaster title='Nursing station Master'
            close={backToSettings}>
            <Box sx={{ p: 1 }} elevation={5}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>

                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Description"
                                    type="text"
                                    size="sm"
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Short Name"
                                    type="text"
                                    size="sm"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={8} lg={8}>
                        <NursingStationMastTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default NursingStationMast