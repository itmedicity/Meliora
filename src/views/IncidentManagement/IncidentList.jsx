
import { Box, Paper, TextField, Typography } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import IncidentListTableView from './Components/IncidentListTableView';
import { axioslogin } from '../Axios/Axios';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { CssVarsProvider, Tooltip } from '@mui/joy';
import { infoNotify } from '../Common/CommonCode';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';

const IncidentList = () => {
    const [tableData, setTableData] = useState([])
    const [tabFlag, setTabFlag] = useState(0)
    const [fromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])

    const SearchReport = useCallback(() => {
        const searchData = {
            from: format(new Date(fromDate), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(toDate), 'yyyy-MM-dd 23:59:59 ')
        }
        const searchDetails = async () => {
            const result = await axioslogin.post('/incidentMaster/search', searchData)
            return result.data
        }
        searchDetails().then((value) => {
            const { success, data, message } = value
            if (success === 1) {
                setTableData(data)
                setTabFlag(1)
            }
            else {
                infoNotify(message)
                setTableData([])
                setTabFlag(0)
            }
        })
    }, [fromDate, toDate])
    return (
        <Box sx={{ maxHeight: window.innerHeight - 70 }}>
            <Paper variant='outlined' square sx={{ display: 'flex', flex: 1, height: 40 }}>
                <Box sx={{ pl: 0.7, pt: 0.5 }} >
                    <WarningRoundedIcon sx={{ color: '#bf360c', height: 28, width: 28, opacity: 0.8 }} />
                </Box>
                <Box sx={{ flex: 1, pt: 1, pl: 1 }}>
                    <Typography sx={{ color: '#37474f', fontFamily: 'Arial', fontSize: 17 }}>
                        Pre Incident List
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.4, px: 0.4 }}>
                    <CssVarsProvider>
                        <Tooltip title="Close" placement="bottom" >
                            <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.6, color: 'darkred' }}
                                onClick={backtoHome} />
                        </Tooltip>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Paper variant='outlined' square sx={{ display: 'flex', pr: 1, pb: 0.5 }}>
                <Box sx={{ flex: 0.5 }} ></Box>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ pt: 1, pl: 2 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>From</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5, pl: 0.5 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={fromDate}
                                views={['year', 'month', 'day']}
                                size="sm"
                                inputFormat='dd-MM-yyyy'
                                onChange={(newValue) => {
                                    setFromDate(newValue);
                                    setTabFlag(0)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={null} size='small' fullWidth
                                        sx={{ bgcolor: 'white', borderRadius: 0, pt: 0.5 }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ pt: 1, pl: 2 }}>
                        <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>To</Typography>
                    </Box>
                    <Box sx={{ pt: 0.5, pl: 0.5 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={toDate}
                                views={['year', 'month', 'day']}
                                size="sm"
                                inputFormat='dd-MM-yyyy'
                                onChange={(newValue) => {
                                    setToDate(newValue);
                                    setTabFlag(0)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={null} size='small' fullWidth
                                        sx={{ bgcolor: 'white', borderRadius: 0, pt: 0.5 }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box sx={{ flex: 0.5, pt: 4.5, pl: 1 }}>
                    <CssVarsProvider>
                        <Tooltip title="Search" placement='right'>
                            <SearchIcon sx={{ color: '#555830', cursor: 'pointer', height: 35, width: 35 }}
                                onClick={SearchReport}
                            />
                        </Tooltip>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ flex: 0.5 }} ></Box>
            </Paper>
            <Box>
                {tabFlag === 1 ?
                    <IncidentListTableView tableData={tableData} SearchReport={SearchReport} />
                    : <Box></Box>
                }
            </Box>
        </Box>
    )
}

export default memo(IncidentList)