import { Box, Grid } from '@mui/material'
import React from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import DietTypeMastTable from './DietTypeMastTable'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useHistory } from 'react-router-dom'
import { useCallback } from 'react'
const DietTypeMast = () => {
    const history = useHistory();
    const backToSettings = useCallback(() => {
        history.push(`/Home/Settings`)
    }, [history])
    return (

        <CardMaster title="Diet Type Master"
            close={backToSettings}>
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Diet Type"
                                    type="text"
                                    size="sm" />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Status"
                                    size="md"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={8} lg={8}>
                        <DietTypeMastTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default DietTypeMast