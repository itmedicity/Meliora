import React, { useState, useMemo, memo, useCallback } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Box, CssVarsProvider, Input, Button } from '@mui/joy';
import Table from '@mui/joy/Table';
import {
    eachDayOfInterval,
    format,
    startOfMonth,
    getDay,
    differenceInMinutes,
    addMinutes,
    isValid,    
    parseISO
} from 'date-fns';
import { warningNotify } from 'src/views/Common/CommonCode';
import VerifiedIcon from '@mui/icons-material/Verified';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { employeeNumber } from 'src/views/Constant/Constant';
import { Paper } from '@mui/material';

const DoctorAttendance = () => {

    const EMPNUMBER = employeeNumber()
    const [fromDate, setFromDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [shiftIn, setShiftIn] = useState('09:00');
    const [shiftOut, setShiftOut] = useState('17:00');
    const [empid, setEmpId] = useState(EMPNUMBER ? EMPNUMBER : null)
    const [punchdata, setPucnchDate] = useState([])

    console.log(empid);

    const generateDateRange = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const result = eachDayOfInterval({
            start: startDate,
            end: endDate
        })
        return result?.map(date => format(date, 'yyyy-MM-dd'))
    };


    const getRandomTime = (start, end) => {
        const diff = differenceInMinutes(end, start);
        const randomOffset = Math.floor(Math.random() * diff);
        const randomDate = addMinutes(start, randomOffset);
        return format(randomDate, 'dd/MM/yyyy HH:mm');
    };

    const generatePunchData = () => {
        const dates = generateDateRange(fromDate, toDate);
        return dates?.map((date) => {
            const dateStr = format(new Date(date), 'dd-MM-yyyy');
            const result = getDay(new Date(date))
            if (result === 0) {
                return {
                    date: dateStr,
                    empId: empid,
                    shiftIn: 'WOFF',
                    shiftOut: 'WOFF',
                    punchIn: 'WOFF',
                    punchOut: 'WOFF',
                };
            }

            const [shiftInHour, shiftInMin] = shiftIn.split(':').map(Number);
            const [shiftOutHour, shiftOutMin] = shiftOut.split(':').map(Number);

            const shiftInMoment = new Date(date)
            shiftInMoment.setHours(shiftInHour, shiftInMin)

            const shiftOutMoment = new Date(date)
            shiftOutMoment.setHours(shiftOutHour, shiftOutMin)

            const punchInStart = new Date(shiftInMoment)
            punchInStart.setHours(shiftInMoment.getHours() - 2) // taking 2 hour befor the default shiftIn time

            const punchInEnd = shiftInMoment; //given in time

            const punchOutStart = new Date(shiftOutMoment)
            punchOutStart.setHours(shiftOutMoment.getHours() - 2) // 2 hour earlier than the puch out time

            const punchOutEnd = new Date(shiftOutMoment)
            punchOutEnd.setHours(shiftOutMoment.getHours() + 1) // i hour after than the punch out time


            return {
                date: dateStr,
                empId: empid,
                shiftIn: `${dateStr} ${shiftIn}`,
                shiftOut: `${dateStr} ${shiftOut}`,
                punchIn: getRandomTime(punchInStart, punchInEnd),
                punchOut: getRandomTime(punchOutStart, punchOutEnd),
            };
        });
    };


    const exportToExcel = () => {
        const fileName = `Doctor_Attendance_${fromDate}_to_${toDate}_of${empid}`;
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(punchdata);
        const wb = { Sheets: { 'Attendance': ws }, SheetNames: ['Attendance'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };


    const hanldPunchProcess = useCallback(() => {
        // date-fns methond to conver string date to Date insted of new Date use this for consistency across browsr
        const from = parseISO(fromDate);
        const to = parseISO(toDate);
        if (!isValid(from) || !isValid(to)) {
            warningNotify("Select a valid Date");
            return [];
        };
        if (from > to) {
            warningNotify("Start date cannot be after end date");
            return [];
        };
        if (empid === null) return warningNotify("please Enter the Employee Number")

        if (fromDate && toDate && shiftIn && shiftOut && empid) {
            const result = generatePunchData()
            setPucnchDate(result)
        };

    }, [fromDate, toDate, shiftIn, shiftOut, setPucnchDate, empid])


    return (
        <CssVarsProvider>
            <Box sx={{
                width: '100%',
                minHeight: '90vh',
                pb: 3
            }}>
                <Paper sx={{
                    width: '100%',
                    py: 1,
                    px: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 1,
                    boxShadow: 10,
                    backgroundColor: 'white', // add this temporarily to test
                    mb: 1
                }}>
                    <Input
                        type="text"
                        size="md"
                        variant="outlined"
                        value={empid}
                        onChange={(e) => setEmpId(e.target.value)}
                        placeholder="Enter EmpId"
                    />
                    <Input
                        type="date"
                        size="md"
                        variant="outlined"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        placeholder="From Date"
                    />
                    <Input
                        type="date"
                        size="md"
                        variant="outlined"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        placeholder="To Date"
                    />
                    <Input
                        type="time"
                        size="md"
                        variant="outlined"
                        value={shiftIn}
                        onChange={(e) => setShiftIn(e.target.value)}
                        placeholder="Shift In"
                    />
                    <Input
                        type="time"
                        size="md"
                        variant="outlined"
                        value={shiftOut}
                        onChange={(e) => setShiftOut(e.target.value)}
                        placeholder="Shift Out"
                    />
                    <Button onClick={hanldPunchProcess} color="neutral" variant="outlined" startDecorator={<VerifiedIcon />}>
                        Process
                    </Button>
                    <Button color="neutral" onClick={exportToExcel} variant="outlined" startDecorator={<FileDownloadIcon />}>
                        Download Excel
                    </Button>
                </Paper>



                <Box sx={{ width: '100%', position: 'relative', height: '100%' }}>
                    <Table
                        hoverRow
                        variant="outlined"
                        borderAxis="both"
                        stickyHeader
                        sx={{ minWidth: 700, borderRadius: 5, fontSize: 14, textAlign: 'center', fontWeight: 600, fontFamily: 'sans-serif' }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: 'red' }}>
                                <th style={{ textAlign: 'center' }}>Slno</th>
                                <th style={{ textAlign: 'center' }}>Date</th>
                                <th style={{ textAlign: 'center' }}>Emp ID</th>
                                <th style={{ textAlign: 'center' }}>Shift In</th>
                                <th style={{ textAlign: 'center' }}>Shift Out</th>
                                <th style={{ textAlign: 'center' }}>Punch In</th>
                                <th style={{ textAlign: 'center' }}>Punch Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {punchdata.map((entry, index) => {
                                const isWoff = entry.shiftIn === 'WOFF';
                                return (
                                    <tr
                                        key={index}
                                        style={{
                                            backgroundColor: isWoff ? '#ff85a1' : ''
                                        }}>
                                        <td>{index + 1}</td>
                                        <td>{entry.date}</td>
                                        <td>{entry.empId}</td>
                                        <td>{entry.shiftIn}</td>
                                        <td>{entry.shiftOut}</td>
                                        <td>{entry.punchIn}</td>
                                        <td>{entry.punchOut}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Box>


            </Box>
        </CssVarsProvider >
    );
};

export default memo(DoctorAttendance);
