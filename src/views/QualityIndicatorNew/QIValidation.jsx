import { Box, Paper, Tooltip, TextField } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useDispatch } from 'react-redux';
import { getQltyDept } from 'src/redux/actions/QualityIndicatorDept.action';
import { Typography } from '@mui/joy';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { infoNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { format } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import DepartmentSelectForQuality from '../CommonSelectCode/DepartmentSelectForQuality';

const QIValidation = () => {
    const [qidept, setQidept] = useState(0)
    const [searchDate, setSearchDate] = useState(format(new Date(), "yyyy-MM-dd"));
    // const [qiList, setQiList] = useState([])
    // const [searchFlag, setSearchFlag] = useState(0)

    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getQltyDept())
    }, [dispatch])

    const SearchQiValidation = useCallback(() => {
        if (qidept === 0) {
            infoNotify('Select Department')
        } else if (qidept === 1) {
            const getqiList = async (qidept) => {
                const result = await axioslogin.get(`/qualityindicator/getqi/${qidept}`)
                return result.data
            }
            getqiList(qidept).then((val) => {
                const { success, message } = val
                if (success === 1) {
                    // setQiList(data)
                    // setSearchFlag(1)
                }
                else if (success === 2) {
                    infoNotify(message)
                    // setSearchFlag(0)
                }
            })
        }
    }, [qidept])
    return (
        <Fragment>
            <Box>
                <Box sx={{ display: 'flex', pt: 1, px: 1 }}>
                    {/* <Box sx={{ flex: 0.1 }}></Box> */}
                    <Paper variant='outlined' square sx={{ display: 'flex', flex: 1, height: 40 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1, py: 1.2 }}>
                            <Typography sx={{ fontSize: 14, textTransform: 'uppercase' }}>
                                Monthly Data For Quality Indicator Validation</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 0.1 }}>
                            <CloseTwoToneIcon sx={{ cursor: 'pointer', height: 35, width: 35, pt: 0.5, opacity: 0.8, color: '#bf360c' }}
                                onClick={backtoHome} />
                        </Box>
                    </Paper>
                    {/* <Box sx={{ flex: 0.1 }}></Box> */}
                </Box>
                <Box sx={{ px: 1, }}>
                    <Box sx={{ border: '1px solid lightgrey', display: 'flex', borderTop: 'none', pb: 1 }}>
                        <Box sx={{ flex: 0.5 }}></Box>
                        <Box sx={{ flex: 1, }}>
                            <Box sx={{ pt: 1, pl: 2 }}>
                                <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Department</Typography>
                            </Box>
                            <Box sx={{ mx: 1, pt: 0.5 }}>
                                <DepartmentSelectForQuality qidept={qidept} setQidept={setQidept} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ pt: 1, pl: 1 }}>
                                <Typography sx={{ fontSize: 13, textTransform: 'uppercase' }}>Month</Typography>
                            </Box>
                            <Box sx={{ pt: 0.5 }} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={searchDate}
                                        views={['year', 'month']}
                                        size="sm"
                                        inputFormat='MMM-yyyy'
                                        onChange={(newValue) => {
                                            setSearchDate(newValue);
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
                        <Box sx={{ flex: 0.2 }}>
                            <Box sx={{ pt: 4.5, pl: 1 }}>
                                <Tooltip title="Search" placement='bottom' >
                                    <SearchTwoToneIcon sx={{ cursor: 'pointer' }} fontSize='large' onClick={SearchQiValidation} />
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 0.5 }}></Box>
                    </Box>
                </Box>

                <Box>
                    {/* {searchFlag === 1 ?
                        <EndoscopyQIValidation />
                        : null} */}
                </Box>

            </Box>
        </Fragment >
    )
}

export default memo(QIValidation)