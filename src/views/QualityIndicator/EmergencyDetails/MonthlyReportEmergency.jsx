import { Box, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CusIconButton from 'src/views/Components/CusIconButton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import moment from 'moment';
import { endOfMonth, startOfMonth } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';

const MonthlyReportEmergency = ({ setMonthlyViewFlag, processDate }) => {
    const [emergencyTotal, setEmergencyTotal] = useState({
        totpatients: 0,
        totaltime: 0,
        totalreturn: 0
    })
    const { totpatients, totaltime, totalreturn } = emergencyTotal


    const history = useHistory()
    const backtoHome = useCallback(() => {
        setMonthlyViewFlag(0)
        history.push('/Home/QIMonthlyReport')

    }, [history, setMonthlyViewFlag])

    var startDate = moment(startOfMonth(new Date(processDate))).format('YYYY-MM-DD')
    var endDate = moment(endOfMonth(new Date(processDate))).format('YYYY-MM-DD')

    const searchdata = useMemo(() => {
        return {
            from: startDate,
            to: endDate
        }
    }, [startDate, endDate])

    useEffect(() => {
        const getEmergencyReport = async (searchdata) => {
            const result = await axioslogin.post('/qiemergency/monthlyReport', searchdata)
            const { success, data } = result.data
            if (success === 1) {
                const { totpatients, totaltime, totreturn } = data[0]
                const frmdata = {
                    totpatients: totpatients,
                    totaltime: totaltime,
                    totalreturn: totreturn
                }
                setEmergencyTotal(frmdata)
            }
        }
        getEmergencyReport(searchdata)
    }, [searchdata])

    return (
        <Fragment>
            <Box sx={{ width: "100%", height: "100%" }}>
                <Paper sx={{ display: 'flex', bgcolor: '#DBE8D8', flex: 1, height: 40 }}>
                    <Box sx={{ pt: 0.8, pl: 0.5 }} >
                        <AnalyticsOutlinedIcon sx={{ color: 'darkgreen' }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 17, pt: 0.8, pl: 1 }}>
                        <Typography sx={{ color: 'darkgreen', fontWeight: 550 }}>
                            Emergency Monthly Report
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 2, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary"  >
                                <Tooltip title="Close" placement="bottom" >
                                    <CloseIcon sx={{ fontSize: 22 }} onClick={backtoHome} />
                                </Tooltip>
                            </CusIconButton>
                        </Box>
                    </Box>
                </Paper>

                <Box sx={{ pt: 0.5, height: window.innerHeight - 140, overflow: 'auto' }}>
                    <Paper sx={{ border: '0.2px solid #eceff1' }}>
                        <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Time Taken for Initial assessment of patients attending emergency services
                            </Typography>
                        </Paper>
                        <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography sx={{ textTransform: 'capitalize' }}>Total Sum Of Time taken for assessment </Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totaltime"
                                        value={totaltime}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography sx={{ textTransform: 'capitalize' }}>Total No.Of patients in indoor/emergency</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totpatients"
                                        value={totpatients}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.5, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="resultpatient"
                                        value={(totaltime / totpatients).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ border: '0.2px solid #eceff1', pt: 0.5 }}>
                        <Paper sx={{ bgcolor: '#eceff1', py: 0.7, pl: 2 }}>
                            <Typography sx={{ textTransform: 'capitalize', fontSize: 17 }}>
                                Return to Emergency Department within 72 hrs with similar presenting complaints
                            </Typography>
                        </Paper>
                        <Box sx={{ display: 'flex', py: 1, bgcolor: '#F7F8F8', pl: 2 }}>
                            <Box sx={{ flex: 1.5, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography sx={{ textTransform: 'capitalize' }}>
                                        Total No.Of returns to emergency within 72 hrs with similar presenting complaints  </Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totalreturn"
                                        value={totalreturn}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography sx={{ textTransform: 'capitalize' }}>Total No.Of patients who have come to the emergency</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="totpatients"
                                        value={totpatients}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.5, pl: 1 }} >
                                <Box sx={{ pl: 1 }}>
                                    <Typography>Result</Typography>
                                </Box>
                                <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                    <TextFieldCustom
                                        disabled
                                        size="md"
                                        type="text"
                                        name="resultreturn"
                                        value={(totalreturn / totpatients).toFixed(3)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.1, pl: 1 }} ></Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ height: 50, pt: 0.5, border: '0.2px solid #D9E4EC', bgcolor: '#eceff1', display: "flex" }}>
                    </Paper>
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(MonthlyReportEmergency)