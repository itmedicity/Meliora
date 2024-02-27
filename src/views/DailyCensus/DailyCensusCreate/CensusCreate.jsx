import { Box, Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton'
import ListNursingStations from '../Components/ListNursingStations'
import moment from 'moment'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { addDays, subDays } from 'date-fns'

const CensusCreate = () => {

    const [nursList, setNursList] = useState([])
    const [dailyDate, setDailyDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [searchFlag, setsearchFlag] = useState(0)
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])

    const QIDateChange = useCallback((e) => {
        setDailyDate(e.target.value)
        setsearchFlag(0)
    }, [])

    useEffect(() => {
        const getNursingStation = async () => {
            const result = await axioslogin.get('/censusNursingStat/active')
            const { success, data } = result.data
            if (success === 2) {
                setNursList(data)
            }
            else {
                setNursList([])
            }
        }
        getNursingStation();
    }, [])

    const SearchDetails = useCallback((e) => {
        setsearchFlag(1)
    }, [])
    return (
        <Fragment>
            <Box>
                <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 42 }}>
                    <Box sx={{ pt: 0.5, pl: 0.7 }} >
                        <RecentActorsIcon fontSize='large' sx={{ color: '#2C5E1A' }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 18, pt: 0.9, pl: 1 }}>
                        <Typography sx={{ color: '#2C5E1A', fontWeight: 550 }}>
                            Daily Census
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.4, pr: 0.2 }}>
                            <CusIconButton size="md" variant="outlined" style={{ borderRadius: 12, bgcolor: '#F7F8F8', height: 35, width: 35 }}>
                                <Tooltip title="Close" placement="bottom" >
                                    <CloseIcon sx={{ cursor: 'pointer', size: 'lg', fontSize: 25, color: 'darkgreen', }} onClick={backtoHome} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>
                    </Box>
                </Paper>
                <Box sx={{ pt: 0.3 }}>
                    <Paper sx={{ display: 'flex', bgcolor: '#F7F8F8', pr: 1, border: '0.2px solid #F7F8F8', py: 2 }}>
                        <Box sx={{ flex: 1 }} ></Box>
                        <Box sx={{ flex: 1 }} >
                            {/* <Box sx={{ pl: 1 }}>
                                <Typography sx={{ color: '#2C5E1A' }}>Date</Typography>
                            </Box> */}
                            <TextFieldCustom
                                slotProps={{
                                    input: {
                                        min: moment(subDays(new Date(), 1)).format('YYYY-MM-DD'),
                                        max: moment(addDays(new Date(), 1)).format('YYYY-MM-DD')
                                    },
                                }}
                                size="md"
                                type="date"
                                name="dailyDate"
                                value={dailyDate}
                                onchange={QIDateChange}
                            />
                            <Box sx={{ pt: 0.2 }}>

                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, pl: 1 }} >
                            <CssVarsProvider>
                                <Button variant="outlined" sx={{
                                    fontSize: 16, color: '#2C5E1A', width: 150, cursor: 'pointer',
                                    borderRadius: 20, bgcolor: '#F7F8F8'
                                }}
                                    onClick={SearchDetails}
                                >
                                    Search
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1 }} ></Box>
                    </Paper>
                </Box>
                <Box sx={{ pt: 0.7, display: 'flex', overflow: 'auto' }}>
                    {searchFlag === 1 ? <ListNursingStations nursList={nursList} dailyDate={dailyDate} />
                        :
                        <Box> </Box>
                    }
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(CensusCreate)