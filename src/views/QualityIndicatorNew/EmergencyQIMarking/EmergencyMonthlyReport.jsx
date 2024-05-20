import { Box, Chip, CssVarsProvider, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'

const EmergencyMonthlyReport = ({ viewData }) => {
    const [searchFlag, setSearchFlag] = useState()
    const [monthReport, setMonthReport] = useState({
        totalTime: 0,
        totalPatients: 0,
        totalReturn: 0
    })
    const { totalTime, totalPatients, totalReturn } = monthReport
    useEffect(() => {
        if (viewData.length !== 0) {
            const patienttot = viewData.length
            const timetot = viewData?.map(val => val.sumof_service_time).reduce((prev, next) => Number(prev) + Number(next));
            const returnTot = viewData?.filter(val => val.return_status === 1)

            const formData = {
                totalPatients: patienttot,
                totalTime: timetot,
                totalReturn: returnTot.length
            }
            setMonthReport(formData)
            setSearchFlag(1)
        }
    }, [viewData])
    return (
        <Box>
            {searchFlag === 1 ?
                <Box sx={{}}>
                    <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                        <Box sx={{
                            fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 550, bgcolor: '#ECF3DD', mx: 1,
                            color: '#05445E'
                        }}>
                            Time Taken for initial assessment of patients attending emergency services
                        </Box>
                        <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5 }}>
                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Box sx={{ flex: 1.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                        Total Sum of Time Taken For Assessment
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 550, display: 'flex', justifyContent: 'flex-end' }}>
                                    :
                                </Box>
                                <Box sx={{ flex: 0.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalTime}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 1.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                        Total Number Of Patients in Indoor/Emergency
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 550, display: 'flex', justifyContent: 'flex-end' }}>
                                    :
                                </Box>
                                <Box sx={{ flex: 0.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalPatients}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 1.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                        Result
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 550, display: 'flex', justifyContent: 'flex-end' }}>
                                    :
                                </Box>
                                <Box sx={{ flex: 0.5, p: 0.5 }}>
                                    <CssVarsProvider>
                                        <Chip size="md"
                                            variant="outlined"
                                            sx={{ color: '#bf360c' }}
                                        >
                                            {(totalPatients > 0 ? (totalTime / totalPatients).toFixed(2) : 0)}
                                        </Chip>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper variant='outlined' square sx={{ pt: 0.7, flex: 1 }}>
                        <Box sx={{
                            fontSize: 12, textTransform: 'uppercase', pl: 2, py: 0.5, fontWeight: 550, bgcolor: '#ECF3DD', mx: 1,
                            color: '#05445E'
                        }}>
                            Return To Emergency Department Within 72 Hrs With Similar Presenting Complaints
                        </Box>
                        <Box sx={{ border: '1px solid lightgrey', mx: 1, mb: 0.5 }}>
                            <Box sx={{ display: 'flex', pt: 0.5 }}>
                                <Box sx={{ flex: 1.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                        Total Number Of Returns To Emergency Within 72 Hrs With Similar Presenting Complaints
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 550, display: 'flex', justifyContent: 'flex-end' }}>
                                    :
                                </Box>
                                <Box sx={{ flex: 0.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalReturn}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 1.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                        Total Number Of Patients Who Have Come To The Emergency
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 550, display: 'flex', justifyContent: 'flex-end' }}>
                                    :
                                </Box>
                                <Box sx={{ flex: 0.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pt: 0.1 }}>{totalPatients}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 1.5, p: 0.5 }}>
                                    <Typography sx={{ fontSize: 15, pl: 0.4 }}>
                                        Result
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 0.1, p: 0.5, fontWeight: 550, display: 'flex', justifyContent: 'flex-end' }}>
                                    :
                                </Box>
                                <Box sx={{ flex: 0.5, p: 0.5 }}>
                                    <CssVarsProvider>
                                        <Chip size="md"
                                            variant="outlined"
                                            sx={{ color: '#bf360c' }}
                                        >
                                            {(totalPatients > 0 ? (totalReturn / totalPatients).toFixed(2) : 0)}
                                        </Chip>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                : <Box></Box>
            }
        </Box>
    )
}

export default memo(EmergencyMonthlyReport)