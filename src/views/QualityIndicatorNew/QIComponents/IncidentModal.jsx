import { Box, Dialog, DialogContent, Paper, TextField, Typography } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, CssVarsProvider, Textarea } from '@mui/joy';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const IncidentModal = ({ open, IncidentHandleClose, depName }) => {
    const [inciDateTime, setInciDateTime] = useState(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))

    const [incidentData, setIncidentData] = useState({
        incidentReason: '', incidentDetails: ''
    })
    const { incidentReason, incidentDetails } = incidentData
    const UpdateIncidents = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setIncidentData({ ...incidentData, [e.target.name]: value })
    }, [incidentData])
    const reset = useCallback(() => {
        IncidentHandleClose()
    }, [IncidentHandleClose])

    const ResetDetails = useCallback(() => {
        reset()
    }, [reset])
    const SaveIncidentDetails = useCallback(() => {

    }, [])
    return (
        <Fragment>
            <Dialog
                open={open}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
                maxWidth='50vw'
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: '40vw',
                        borderRadius: 'md',
                    }}
                >
                    <Paper variant='outlined' square sx={{ display: 'flex', height: 45, bgcolor: '#90a4ae' }}>
                        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', p: 1.5 }}>
                            <Typography sx={{ color: '#37474f', fontWeight: 'bold', fontSize: 17 }}>
                                INCIDENT REGISTRATION
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 0.1, justifyContent: 'flex-end', fontSize: 20, pt: 0.4, pr: 0.1 }}>
                            <HighlightOffIcon sx={{ cursor: 'pointer', height: 38, width: 38, color: 'White', opacity: 0.8 }} onClick={IncidentHandleClose} />
                        </Box>
                    </Paper>
                    <Box sx={{ py: 1 }}>
                        <Box sx={{ display: 'flex', pt: 1.5 }}>
                            <Box sx={{ flex: 0.5, pl: 1 }}>
                                <Typography>Department</Typography>
                            </Box>
                            <Box sx={{ pl: 0.2 }}>
                                <Typography>: </Typography>
                            </Box>
                            <Box sx={{ flex: 1.5, pl: 1.6 }}>
                                <Box sx={{ fontSize: 15 }}>{depName}</Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.8 }}>
                            <Box sx={{ flex: 0.5, pl: 1, pt: 1 }}>
                                <Typography>Date & Time</Typography>
                            </Box>
                            <Box sx={{ pt: 1, pl: 0.1 }}>
                                <Typography>: </Typography>
                            </Box>

                            <Box sx={{ flex: 1.5, pl: 1.5 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        sx={{ maxHeight: 15, borderRadius: 0 }}
                                        value={inciDateTime}
                                        valueType="date time"
                                        views={['year', 'month', 'day', 'hours', 'minutes']}
                                        size='sm'
                                        inputFormat='DD-MM-YYYY hh:mm:ss'
                                        onChange={(newValue) => {
                                            setInciDateTime(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size='small' fullWidth
                                                sx={{ bgcolor: 'white', m: 0, }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.2 }}>
                            <Box sx={{ flex: 0.5, pl: 1, pt: 1.4 }}>
                                <Typography>Reason</Typography>
                            </Box>
                            <Box sx={{ pl: 0.2, pt: 1.5 }}>
                                <Typography>: </Typography>
                            </Box>
                            <Box sx={{ flex: 1.5, pl: 1.5 }}>
                                <CssVarsProvider>
                                    <Textarea
                                        style={{ minHeight: 50 }}
                                        placeholder='Incident Reason'
                                        type="text"
                                        size="sm"
                                        name="incidentReason"
                                        value={incidentReason}
                                        onChange={UpdateIncidents}
                                    />
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', pt: 0.2 }}>
                            <Box sx={{ flex: 0.5, pl: 1, pt: 1.4 }}>
                                <Typography>Details</Typography>
                            </Box>
                            <Box sx={{ pl: 0.2, pt: 1.5 }}>
                                <Typography>: </Typography>
                            </Box>
                            <Box sx={{ flex: 1.5, pl: 1.5 }}>
                                <CssVarsProvider>
                                    <Textarea
                                        style={{ minHeight: 50 }}
                                        placeholder='Incident Details'
                                        type="text"
                                        size="sm"
                                        name="incidentDetails"
                                        value={incidentDetails}
                                        onChange={UpdateIncidents}
                                    />
                                </CssVarsProvider>
                            </Box>
                        </Box>



                    </Box>
                    <Paper variant='outlined' square sx={{ display: 'flex', justifyContent: 'flex-end', bgcolor: '#90a4ae', height: 45 }}>
                        <Box sx={{ pt: 0.5, pr: 0.5 }}>
                            <CssVarsProvider>
                                <Button variant='plain' sx={{
                                    color: 'white', width: 100, height: 30, bgcolor: '#546e7a', borderRadius: 0,
                                    border: '1px solid white',
                                    ":hover": {
                                        bgcolor: '#78909c',
                                        boxShadow: 2,
                                        color: 'white',
                                    }
                                }}
                                    onClick={SaveIncidentDetails}
                                >
                                    UPDATE
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ pr: 1, py: 0.4 }}>
                            <CssVarsProvider>
                                <Button variant='plain' sx={{
                                    color: 'white', width: 100, height: 30, bgcolor: '#546e7a', borderRadius: 0,
                                    border: '1px solid white',
                                    ":hover": {
                                        bgcolor: '#78909c',
                                        boxShadow: 2,
                                        color: 'white',
                                    }
                                }}
                                    onClick={ResetDetails}
                                >
                                    RESET
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default memo(IncidentModal)
