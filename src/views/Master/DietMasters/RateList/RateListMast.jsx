import { Box, Grid } from '@mui/material'
import React from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RateListMastTable from './RateListMastTable'
import { useHistory } from 'react-router-dom'
import { useCallback } from 'react'
const RateListMast = () => {
    const history = useHistory();
    const backToSettings = useCallback(() => {
        history.push(`/Home/Settings`);
    }, [history])
    return (
        <CardMaster title="Rate List master"
            close={backToSettings}>
            <Box sx={{ padding: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Item Name"
                                    type="text"
                                    size="sm"
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Price"
                                    type="text"
                                    size="sm"
                                />
                            </Grid>
                            <Grid item xl={2} lg={2}>
                                <CusCheckBox
                                    label="Status"
                                    size="md"
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xl={8} lg={8}>
                        <RateListMastTable />
                    </Grid>
                </Grid>

            </Box>
        </CardMaster>
    )
}
export default RateListMast