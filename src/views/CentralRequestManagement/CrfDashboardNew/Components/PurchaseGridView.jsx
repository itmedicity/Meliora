import { Box, Grid, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback } from 'react'
import ImageViewComp from './ImageViewComp';

const PurchaseGridView = ({ val, viewPednigDetails }) => {
    const { imageView, imName, title, pending, id } = val;
    const getData = useCallback(() => {
        viewPednigDetails(id)
    }, [id, viewPednigDetails])
    return (
        <Fragment>
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} sx={{ width: "100%" }}>
                <Paper variant="outlined" square
                    sx={{ bgcolor: 'white', height: 160, border: '1px solid #bbdefb', borderRadius: 5 }}>
                    <Box sx={{ marginBottom: 1, display: 'flex', height: 'calc(100% - 40px)', }} >
                        <Box sx={{ flex: 0.4, display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, pt: 5 }}>
                            <ImageViewComp src={imageView} alt={imName} style={{ width: 100, height: 90 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    height: 70,
                                    pr: 1,
                                    pt: 1,
                                    overflow: 'hidden',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 20,
                                        fontWeight: 650,
                                        color: '#003371',
                                        textAlign: 'right',
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', }} >
                                <Tooltip
                                    title="Total Count"
                                    placement="bottom"
                                    sx={{
                                        fontSize: 14,
                                        color: 'white',
                                        bgcolor: '#60A3D9',
                                        fontWeight: 650,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            cursor: 'pointer', borderTopLeftRadius: 15, borderBottomLeftRadius: 15,
                                            fontSize: 40, display: 'flex', justifyContent: 'center',
                                            width: 100, fontWeight: 650, color: '#3f51b5', bgcolor: '#e3f2fd',
                                            '&:hover': {
                                                bgcolor: '#e3f2fd',
                                                color: '#3f51b5',
                                            },
                                        }}
                                        onClick={getData}
                                    >
                                        {pending}
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