import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useState, } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import { infoNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import AssessmntBenchmarkModal from './AssessmntBenchmarkModal';

const EndosWaitingTimeReport = ({ viewData, searchDate, qitype, ipViewReport, opCheck, ipCheck, searchFlag, OracleAsessData }) => {
    const [tableData, setTableData] = useState([])
    const [viewFlag, setViewFlag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [patList, setPatList] = useState([])
    const [initdate, setInitdate] = useState('')
    //monthflag for to differentiate month report(2) or initial assess day report(1) show in modal
    const [monthFlag, setMonthFlag] = useState(0)
    // const [OpEndoscpyList, setOpEndoscpyList] = useState([])

    const handleClose = useCallback(() => {
        setViewFlag(0)
        setModalOpen(false)
        setMonthFlag(0)
    }, [setModalOpen])


    useEffect(() => {
        var dateList = eachDayOfInterval({ start: startOfMonth(new Date(searchDate)), end: endOfMonth(new Date(searchDate)) })
        if (opCheck === true) {
            if (viewData.length !== 0) {
                let insertArray = OracleAsessData?.filter(value => {
                    return viewData?.find(val => {
                        return val.ptno === value.PT_NO && val.qi_save_status === 1
                    })
                })
                // setOpEndoscpyList(insertArray)
                const newTimelist = dateList?.map((item) => {
                    const time = (insertArray?.filter(val => format(new Date(val.VSD_DATE), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy'))
                        .reduce((acc, curr) => acc + (curr.SERVICE_TIME), 0))

                    return {
                        day: format(new Date(item), 'dd-MM-yyyy'),
                        totTime: time,
                        display_date: item,
                    }
                })
                const newTotalPat = dateList?.map((item) => {
                    const count = (viewData?.filter(val => format(new Date(val.patient_arrived_date), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy')
                        && val.qi_save_status === 1))

                    return {
                        day: format(new Date(item), 'dd-MM-yyyy'),
                        totpatient: count.length,
                    }
                })
                const newArray = newTimelist?.map((val) => {
                    const array = newTotalPat?.find(value => val.day === value.day)
                    return {
                        ...val,
                        totpatient: array ? array.totpatient : 0,
                        result: array.totpatient > 0 ? (val.totTime / array.totpatient) : 0,
                    }
                })
                setTableData(newArray)
            }
        } else if (ipCheck === true) {
            if (ipViewReport.length !== 0) {

                const newTimelist = dateList?.map((item) => {
                    const time = (ipViewReport?.filter(val => format(new Date(val.endo_arrival_time), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy'))
                        .reduce((acc, curr) => acc + (curr.sumof_service_time), 0))
                    return {
                        day: format(new Date(item), 'dd-MM-yyyy'),
                        totTime: time,
                        display_date: item
                    }
                })
                const newTotalPat = dateList?.map((item) => {
                    const count = (ipViewReport?.filter(val => format(new Date(val.endo_arrival_time), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy')
                        && val.qi_save_status === 1))
                    return {
                        day: format(new Date(item), 'dd-MM-yyyy'),
                        totpatient: count.length,
                    }
                })
                const newArray = newTimelist?.map((val) => {
                    const array = newTotalPat?.find(value => val.day === value.day)
                    return {
                        ...val,
                        totpatient: array ? array.totpatient : 0,
                        result: array.totpatient > 0 ? (val.totTime / array.totpatient) : 0,
                    }
                })
                setTableData(newArray)
            }
        }
    }, [viewData, ipViewReport, searchDate, opCheck, ipCheck, OracleAsessData])

    const ViewDetails = useCallback((value) => {
        const { display_date } = value
        setInitdate(display_date)
        const searchData = {
            from: format(new Date(display_date), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(display_date), 'yyyy-MM-dd 23:59:59 ')
        }
        if (opCheck === true) {
            const getInitialAssessmentList = async (searchData) => {
                const result = await axioslogin.post('/qiendoscopy/viewAssess', searchData);
                return result.data
            }
            getInitialAssessmentList(searchData).then((val) => {
                const { success, data, message } = val
                if (success === 1) {
                    setPatList(data)
                    setViewFlag(1)
                    setMonthFlag(1)
                    setModalOpen(true)
                }
                else if (success === 2) {
                    infoNotify(message)
                    setViewFlag(0)
                    setMonthFlag(0)
                    setModalOpen(false)
                }
            })

            // if (OpEndoscpyList.length !== 0) {
            //     const newData = OpEndoscpyList?.map((val) => {
            //         return {
            //             ptno: val.PT_NO,
            //             ptname: val.PTC_PTNAME,
            //             ptsex: val.PTC_SEX,
            //             ptage: val.PTN_YEARAGE + 'Y ' + val.PTN_MONTHAGE + 'M ' + val.PTN_DAYAGE + 'D',
            //             doctor_name: val.DOC_NAME,
            //             sumof_service_time: val.SERVICE_TIME,
            //             initial_assessment_reason: 'Nil'
            //         }
            //     })
            //     setPatList(newData)
            //     setViewFlag(1)
            //     setMonthFlag(1)
            //     setModalOpen(true)
            // } else {
            //     infoNotify("No Report Found")
            //     setViewFlag(0)
            //     setMonthFlag(0)
            //     setModalOpen(false)
            // }

        }
        else if (ipCheck === true) {
            const getInitialAssessmentList = async (searchData) => {
                const result = await axioslogin.post('/qiendoscopy/IPviewAssess', searchData);
                return result.data
            }
            getInitialAssessmentList(searchData).then((val) => {
                const { success, data, message } = val
                if (success === 1) {
                    setPatList(data)
                    setViewFlag(1)
                    setMonthFlag(1)
                    setModalOpen(true)
                }
                else if (success === 2) {
                    infoNotify(message)
                    setViewFlag(0)
                    setMonthFlag(0)
                    setModalOpen(false)
                }
            })
        }
    }, [opCheck, ipCheck])

    return (
        <Fragment>
            {viewFlag === 1 ? <AssessmntBenchmarkModal open={modalopen} handleClose={handleClose} patList={patList} initdate={format(new Date(initdate), 'dd-MM-yyyy')}
                monthFlag={monthFlag} /> : null}
            {searchFlag === 1 ?
                <>
                    {tableData.length !== 0 ?
                        <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220, padding: 'none' }}>
                            <CssVarsProvider>
                                <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                                    <thead style={{ alignItems: 'center' }}>
                                        <tr style={{ height: 0.5 }}>
                                            <th size='sm' style={{ width: 120, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>Date</th>
                                            {qitype === 1 ? <th size='sm' style={{ width: 300, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>Sum Of Time in Min</th> : null}
                                            {qitype === 1 ? <th size='sm' style={{ width: 300, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>Total No.Of Patients Reported</th> : null}
                                            {qitype === 2 ? <th size='sm' style={{ width: 400, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>Total Sum Of Time Taken for Initial Assessment</th> : null}
                                            {qitype === 2 ? <th size='sm' style={{ width: 300, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>Total No.Of Patients In Emergency</th> : null}
                                            <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>Result</th>
                                            <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>View</th>
                                        </tr>
                                    </thead>
                                    <tbody size='small' style={{ maxHeight: 0.5 }}>
                                        {tableData?.map((val, index) => {
                                            return (
                                                < tr key={index} size='small' style={{ maxHeight: 2, cursor: 'pointer' }}>
                                                    <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.day}</td>
                                                    <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.totTime}</td>
                                                    <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.totpatient}</td>
                                                    {val.result > 10 ?
                                                        <CssVarsProvider>
                                                            <Tooltip title="BenchMark Value is 10 min" placement='bottom'>
                                                                <td size='sm' style={{ textAlign: 'center', fontSize: 14, color: 'red' }}>{val.result.toFixed(2)}</td>
                                                            </Tooltip>
                                                        </CssVarsProvider>
                                                        : <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.result.toFixed(2)}</td>
                                                    }
                                                    <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                                        <CssVarsProvider>
                                                            {val.result > 10 ?
                                                                <Tooltip title="Assessment Time Exceeded List" placement='bottom'>
                                                                    <GroupIcon sx={{
                                                                        padding: 'none',
                                                                        color: '#055CB4',
                                                                        ":hover": {
                                                                            color: '#1E8AD3'
                                                                        }
                                                                    }}
                                                                        onClick={(e) => ViewDetails(val)}
                                                                    />
                                                                </Tooltip>
                                                                : <Tooltip title="No List" placement='right'>
                                                                    <GroupIcon disabled sx={{
                                                                        padding: 'none',
                                                                        color: '#b0bec5',
                                                                        ":hover": {
                                                                            color: '#b0bec5',
                                                                        }
                                                                    }}
                                                                    />
                                                                </Tooltip>
                                                            }
                                                        </CssVarsProvider>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr >
                                            <th style={{ backgroundColor: '#BDC3CB' }}></th>
                                            <th style={{ backgroundColor: '#BDC3CB' }}></th>
                                            <td style={{ backgroundColor: '#BDC3CB' }}></td>
                                            <td style={{ backgroundColor: '#BDC3CB' }}></td>
                                            <td style={{ backgroundColor: '#BDC3CB' }}></td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </CssVarsProvider>
                        </Box >
                        : null}
                </>
                : null}
        </Fragment >
    )
}

export default memo(EndosWaitingTimeReport)














// const newArray = data?.map((val) => {
//     // Parse dates, defaulting to null if the value is not provided
//     const patientArrivedDate = val.patient_arrived_date ? new Date(val.patient_arrived_date) : null;
//     const assessmentStartDate = val.assessment_start ? new Date(val.assessment_start) : null;
//     const assessmentEndDate = val.assessment_end ? new Date(val.assessment_end) : null;
//     const consultStartDate = val.consult_start_date ? new Date(val.consult_start_date) : null;
//     const complaintEntryDate = val.complaint_entry_date ? new Date(val.complaint_entry_date) : null;
//     const investigationReqDate = val.investigation_req_date ? new Date(val.investigation_req_date) : null;
//     const prescriptionReqDate = val.prescription_req_date ? new Date(val.prescription_req_date) : null;
//     const referenceReqDate = val.reference_req_date ? new Date(val.reference_req_date) : null;

//     // Calculate time differences in milliseconds
//     const startTimeDiff = (assessmentStartDate && patientArrivedDate) ? (assessmentStartDate.getTime() - patientArrivedDate.getTime()) : null;
//     const assessTimeDiff = (assessmentEndDate && assessmentStartDate) ? (assessmentEndDate.getTime() - assessmentStartDate.getTime()) : null;

//     // Find the maximum date among the specified dates, defaulting to null if all are null
//     const endTimeofConsult = [complaintEntryDate, investigationReqDate, prescriptionReqDate, referenceReqDate]
//         .filter(date => date !== null)
//         .reduce((max, date) => (date > max ? date : max), new Date(0)); // Set to a very early date to ensure proper comparison

//     const consultMaxDiff = (endTimeofConsult && consultStartDate && endTimeofConsult.getTime() !== 0) ? (endTimeofConsult.getTime() - consultStartDate.getTime()) : null;
//     // const totTimetoConsult = (consultMaxDiff && patientArrivedDate) ? (consultMaxDiff.getTime() - patientArrivedDate.getTime()) : null;
//     return {
//         ptno: val.ptno,
//         ptname: val.ptname,
//         patient_arrived_date: patientArrivedDate ? format(patientArrivedDate, 'dd-MM-yyyy HH:mm:ss') : null,
//         assessment_start: val.assessment_start !== null ? format(val.assessment_start, 'dd-MM-yyyy HH:mm:ss') : null,
//         assessment_end: val.assessment_end !== null ? format(val.assessment_end, 'dd-MM-yyyy HH:mm:ss') : null,
//         consult_start_date: val.consult_start_date !== null ? format(val.consult_start_date, 'dd-MM-yyyy HH:mm:ss') : null,
//         consult_end_date: endTimeofConsult !== null ? format(endTimeofConsult, 'dd-MM-yyyy HH:mm:ss') : null,
//         start_time_diff: startTimeDiff !== null ? startTimeDiff / 1000 / 60 : null,
//         sumof_service_time: val.sumof_service_time,
//         assess_time_diff: assessTimeDiff !== null ? assessTimeDiff / 1000 / 60 : null,
//         consult_max_diff: consultMaxDiff !== null ? consultMaxDiff / 1000 / 60 : null,
//         // tot_timeto_consult: totTimetoConsult !== null ? totTimetoConsult / 1000 / 60 : null,

//     };
// });