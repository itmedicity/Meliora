import { CssVarsProvider, Input, Table } from '@mui/joy';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { memo } from 'react';
import { useCallback } from 'react';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { infoNotify } from 'src/views/Common/CommonCode';
import CardMasterClose from 'src/views/Components/CardMasterClose';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { startOfYear } from 'date-fns';
import { ExportToExcel } from '../../OtherComponents/ExportToExcel';
const YearlyVerificationTable = ({ yearreport, setYearflag }) => {
    const [fromdate, setFromdate] = useState(moment(new Date()))
    const [todate, setTodate] = useState(moment(new Date()))
    const [array, setArray] = useState([])
    const [allSelect, setallSelect] = useState(false)
    const [excelflag, setExcelflag] = useState(0)
    const [exceldata, setExceldata] = useState([])
    const fileName = "Backup Report(Year)";
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home/DashboardBackup')
        setYearflag(0)
        setExcelflag(0)
    }, [history, setYearflag])
    const AllSelectDetails = useCallback((e) => {
        if (e.target.checked === true) {
            setallSelect(true)
            setArray(yearreport)
        } else {
            setallSelect(false)
        }
    }, [yearreport])
    useEffect(() => {
        if (yearreport.length !== 0) {
            setArray(yearreport)
        }
        else {
            setArray([])
        }
    }, [yearreport])
    const SearchDetails = useCallback(() => {
        setallSelect(false)
        if (fromdate !== '' && todate !== '') {
            const result = startOfYear(new Date(fromdate))
            const toresult = startOfYear(new Date(todate))
            const arr = yearreport?.filter((val) => val.backup_yearly_date >= moment(result).format('YYYY-MM-DD')
                && val.backup_yearly_date <= moment(toresult).format('YYYY-MM-DD'))
            if (arr.length === 0) {
                infoNotify("No Data Found")
                setArray([])
            }
            else {
                setArray(arr)
            }
        } else {
            infoNotify("Select date to Search")
        }
    }, [yearreport, fromdate, todate])
    useEffect(() => {
        if (array.length !== 0) {
            const NewData = array?.map((val) => {
                return {
                    backup_yearly_date: moment(val.backup_yearly_date).format('YYYY'),
                    backup_type: (val.backup_type === 1) ? 'IIS Backup' : (val.backup_type === 2) ? 'Database Backup' : (val.backup_type === 3) ? 'Share Folder Backup' : 'Scanned File Backup',
                    backup_name: val.backup_name,
                    backup_location: val.backup_location,
                    schedule_type_name: val.schedule_type_name,
                    backup_date_time: moment(val.backup_date_time).format('YYYY-MM-DD hh:mm A'),
                    beforeSizeKB: (val.backup_size_before / 1024).toFixed(2) + ' KB',
                    afterSizeKB: (val.backup_size_after / 1024).toFixed(2) + ' KB',
                    em_name: val.em_name,
                    remarks: val.remarks === null ? 'Nil' : val.remarks
                }
            })
            setExceldata(NewData)
        }
    }, [array])
    const ExcelReportDetails = useCallback(() => {
        setExcelflag(4)
        ExportToExcel(exceldata, fileName, excelflag)
    }, [exceldata, excelflag])
    return (
        <Fragment>
            <Paper>
                <CardMasterClose
                    close={backtoHome}
                >
                    <Paper sx={{ display: 'flex', flexDirection: 'row', height: 40 }}>
                        <Box sx={{ flex: 1, pt: 0.5 }}>
                            <Typography sx={{ fontWeight: 10, fontSize: 18 }}>Verification Details</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', flex: 3 }}>
                            <Box sx={{ pt: 1 }}>
                                <Typography sx={{ fontWeight: 10, fontSize: 15 }}>From</Typography>
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['year']}
                                        value={fromdate}
                                        onChange={(newValue) => {
                                            setFromdate(newValue);
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                <CssVarsProvider>
                                                    <Input ref={inputRef} {...inputProps} style={{ width: 150 }} disabled={true} />
                                                </CssVarsProvider>
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ pl: 2, pt: 1 }}>
                                <Typography sx={{ fontWeight: 10, fontSize: 15 }}>To</Typography>
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['year']}
                                        value={todate}
                                        onChange={(newValue) => {
                                            setTodate(newValue);
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                <CssVarsProvider>
                                                    <Input ref={inputRef} {...inputProps} style={{ width: 150 }} disabled={true} />
                                                </CssVarsProvider>
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ pl: 1, pt: 0.2 }}>
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
                            </Box>
                            <Box sx={{ pl: 2, pt: 1 }}>
                                <CusCheckBox
                                    label="All Select"
                                    color="primary"
                                    size="md"
                                    name="allSelect"
                                    value={allSelect}
                                    checked={allSelect}
                                    onCheked={AllSelectDetails}
                                />
                            </Box>
                            <Box sx={{ pl: 1, pt: 0.2 }}>
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
                            </Box>
                        </Box>
                    </Paper>
                    <Paper variant="outlined" sx={{ maxHeight: 780, overflow: 'auto' }}>
                        <CssVarsProvider>
                            <Table borderAxis="both" padding={"none"} stickyHeader >
                                <thead>
                                    <tr style={{ height: 8 }}>
                                        <th style={{ width: 50 }}>Sl.No</th>
                                        <th style={{ width: 80 }}>Backup Year</th>
                                        <th style={{ width: 150, textAlign: 'center' }}>Backup Type</th>
                                        <th style={{ width: 100 }}>Backup Name</th>
                                        <th style={{ width: 150 }}>Backup Location</th>
                                        <th style={{ width: 100 }}>Schedule Type</th>
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
                                            <tr key={val.yearly_slno} style={{ height: 8 }} size='small' >
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td>{moment(val.backup_yearly_date).format('YYYY')}</td>
                                                <td>{(val.backup_type === 1) ? 'IIS Backup' : (val.backup_type === 2) ? 'Database Backup' : (val.backup_type === 3) ? 'Share Folder Backup' : 'Scanned File Backup'}</td>
                                                <td>{val.backup_name}</td>
                                                <td>{val.backup_location}</td>
                                                <td>{val.schedule_type_name}</td>
                                                <td>{moment(val.backup_date_time).format('YYYY-MM-DD hh:mm A')}</td>
                                                <td>{beforeSizeKB} KB</td>
                                                <td>{afterSizeKB} KB</td>
                                                <td>{val.em_name}</td>
                                                <td>{(val.remarks === '') ? 'Nil' : val.remarks}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </CardMasterClose>
            </Paper>
        </Fragment>
    )
}
export default memo(YearlyVerificationTable)