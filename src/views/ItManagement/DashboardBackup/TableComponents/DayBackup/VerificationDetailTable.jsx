import { CssVarsProvider, Box, Button, Typography, Table } from '@mui/joy';
import { Paper } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react'
import { memo } from 'react';
import { useCallback } from 'react';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { infoNotify } from 'src/views/Common/CommonCode';
import CardMasterClose from 'src/views/Components/CardMasterClose';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { ExportToExcel } from '../../OtherComponents/ExportToExcel';
import { axioslogin } from 'src/views/Axios/Axios';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
const VerificationDetailTable = ({ setDayFlag }) => {
    const [fromdate, setFromdate] = useState('')
    const [todate, setTodate] = useState('')
    const [array, setArray] = useState([])
    const [excelflag, setExcelflag] = useState(0)
    // const [exceldata, setExceldata] = useState([])
    // const [verifieddata, setVerifieddata] = useState([])

    const fileName = "Backup Report(Day)";
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home/DashboardBackup')
        setDayFlag(0)
        setExcelflag(0)
    }, [history, setDayFlag])
    const fromdateOnChange = useCallback((e) => {
        setFromdate(e.target.value)
    }, [])
    const TodateOnChange = useCallback((e) => {
        setTodate(e.target.value)
    }, [])
    const empdept = useSelector((state) => {
        return state?.LoginUserData.empdept
    })
    const postdata = useMemo(() => {
        return {
            start_date: fromdate,
            end_date: todate,
            empdept: empdept
        }
    }, [fromdate, todate, empdept])

    const SearchDetails = useCallback(() => {
        if (fromdate !== '' && todate !== '') {
            const getdata = async () => {
                const result = await axioslogin.post('/backupdash/dayverified', postdata)
                const { success, data, message } = result.data
                if (success === 2) {
                    setArray(data)
                }
                else if (success === 1) {
                    infoNotify(message);
                    setArray([])
                }
                else {
                    infoNotify(message)
                    setArray([])
                }
            }
            getdata(postdata)
        } else {
            infoNotify("Select date to Search")
        }

    }, [postdata, fromdate, todate])
    const ExcelReportDetails = useCallback(() => {
        if (array.length !== 0) {
            const NewData = array?.map((val) => {
                return {
                    backup_daily_date: val.backup_daily_date,
                    backup_type: val.backup_type_name,
                    backup_name: val.backup_name,
                    dept_name: val.dept_name,
                    schedule_type_name: val.schedule_type_name,
                    schedule_time_name: val.schedule_time_name,
                    backup_date_time: moment(val.backup_date_time).format('YYYY-MM-DD hh:mm A'),
                    beforeSizeKB: (val.backup_size_before / 1024).toFixed(2) + ' KB',
                    afterSizeKB: (val.backup_size_after / 1024).toFixed(2) + ' KB',
                    em_name: val.em_name,
                    remarks: val.remarks === null ? 'Nil' : val.remarks
                }
            })
            setExcelflag(1)
            ExportToExcel(NewData, fileName, excelflag)
        }
        else {
            infoNotify("No Data Found")
        }

    }, [array, excelflag])
    return (
        <Fragment>
            <Box>
                <CardMasterClose
                    close={backtoHome}
                >
                    <Paper sx={{ display: 'flex', flexDirection: 'row', height: 40 }}>
                        <Box sx={{ flex: 1, pt: 0.5 }}>
                            <Typography sx={{ fontSize: 18 }}>Verification Details</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', flex: 3 }}>
                            <Box sx={{ pt: 1 }}>
                                <Typography sx={{ fontWeight: 10, fontSize: 15 }}>From</Typography>
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <TextFieldCustom
                                    style={{ width: 200 }}
                                    type='date'
                                    size="sm"
                                    name="fromdate"
                                    value={fromdate}
                                    onchange={fromdateOnChange}
                                />
                            </Box>
                            <Box sx={{ pl: 2, pt: 1 }}>
                                <Typography sx={{ fontWeight: 10, fontSize: 15 }}>To</Typography>
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <TextFieldCustom
                                    style={{ width: 200 }}
                                    type='date'
                                    size="sm"
                                    name="todate"
                                    value={todate}
                                    onchange={TodateOnChange}
                                />
                            </Box>
                            <Box sx={{ pl: 1, pt: 0.2 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        size='sm'
                                        style={{
                                            height: 30,
                                            width: 200,
                                            border: '1 solid',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            paddingBottom: 1,
                                            BorderAllRounded: 5,
                                            color: 'black'
                                        }}
                                        onClick={SearchDetails}
                                    >
                                        Search
                                    </Button>
                                </CssVarsProvider>

                            </Box>
                            <Box sx={{ pl: 1, pt: 0.2 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        size='sm'
                                        style={{
                                            height: 30,
                                            width: 200,
                                            border: '1 solid',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            paddingBottom: 1,
                                            BorderAllRounded: 5,
                                            color: 'black'
                                        }}
                                        onClick={ExcelReportDetails}
                                    >
                                        Excel Report
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>
                    <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220, mt: 0.5, }}>
                        <CssVarsProvider>
                            <Table borderAxis="both" padding={"none"} stickyHeader style={{ width: 2500 }}>
                                <thead>
                                    <tr style={{ height: 8 }}>
                                        <th style={{ width: 50 }}>Sl.No</th>
                                        <th style={{ width: 105 }}>Backup Date</th>
                                        <th style={{ width: 150, textAlign: 'center' }}>Backup Type</th>
                                        <th style={{ width: 100 }}>Backup Name</th>
                                        <th style={{ width: 150 }}>Backup Location</th>
                                        <th style={{ width: 150 }}>Backup Path</th>
                                        <th style={{ width: 100 }}>Schedule Type</th>
                                        <th style={{ width: 100 }}>Schedule Time</th>
                                        <th style={{ width: 180 }}>Backup Taken Date & Time</th>
                                        <th style={{ width: 130 }}>Backup Size Before</th>
                                        <th style={{ width: 130 }}>Backup Size After</th>
                                        <th style={{ width: 100 }}>Employee</th>
                                        <th style={{ width: 100 }}>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody size='small' style={{ height: 8 }}>
                                    {array?.map((val, index) => {
                                        const beforeSizeKB = (val.backup_size_before / 1024).toFixed(2)
                                        const afterSizeKB = (val.backup_size_after / 1024).toFixed(2)
                                        return (
                                            <tr key={val.daily_slno} style={{ height: 8 }} size='small' >
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td>{moment(val.backup_daily_date).format('DD-MM-YYYY')}</td>
                                                <td>{val.backup_type_name}</td>
                                                <td>{val.backup_name}</td>
                                                <td style={{ fontSize: 12 }}>{val.dept_name}</td>
                                                <td>{val.backup_path}</td>
                                                <td>{val.schedule_type_name}</td>
                                                <td>{val.schedule_time_name}</td>
                                                <td>{moment(val.backup_date_time).format('YYYY-MM-DD hh:mm A')}</td>
                                                <td>{beforeSizeKB} KB</td>
                                                <td>{afterSizeKB} KB</td>
                                                <td>{val.em_name}</td>
                                                <td>{(val.remarks === '') ? 'Nil' : val.remarks}</td>
                                            </tr >
                                        )
                                    })}
                                </tbody >
                            </Table >
                        </CssVarsProvider >
                    </Box >
                </CardMasterClose >
            </Box >
        </Fragment >
    )
}
export default memo(VerificationDetailTable)