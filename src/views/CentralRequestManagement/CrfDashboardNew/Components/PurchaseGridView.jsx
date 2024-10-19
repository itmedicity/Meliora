import { Box, Tooltip, Typography } from '@mui/joy'
import { Grid, Paper } from '@mui/material'
import React, { Fragment, memo } from 'react'

const PurchaseGridView = ({ title, imageView, imName, viewDataClick, allCount }) => {
    return (
        <Fragment>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} style={{ width: 500 }} >
                <Paper variant='outlined' square sx={{
                    bgcolor: 'white', height: 160, border: '1px solid #bbdefb', borderRadius: 5
                }}>
                    <Box sx={{ marginBottom: 1, display: 'flex', }}>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, py: 1 }}>
                            <img src={imageView} alt={imName} style={{ width: "100%", height: "90%" }} loading="lazy" />
                        </Box>
                        <Box sx={{ flex: 2, }}>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pr: 2, py: 2, width: '100%' }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 650, color: '#003371' }}>
                                    {title}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5 }} >
                                <Tooltip title="Total Count" placement="bottom" sx={{ fontSize: 14, color: 'white', bgcolor: '#60A3D9', fontWeight: 650 }}>
                                    <Box sx={{
                                        cursor: 'pointer', borderTopLeftRadius: 15, borderBottomLeftRadius: 15,
                                        fontSize: 40, display: 'flex', justifyContent: 'center', width: 100,
                                        fontWeight: 650, color: '#3f51b5', bgcolor: '#e3f2fd',
                                        '&:hover': {
                                            bgcolor: '#e3f2fd', color: '#3f51b5'
                                        },
                                    }} onClick={viewDataClick}
                                    >
                                        {allCount}
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Fragment>
    )
}

export default memo(PurchaseGridView)