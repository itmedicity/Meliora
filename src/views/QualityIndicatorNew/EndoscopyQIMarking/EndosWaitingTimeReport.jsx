import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useState, } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import AssessmntBenchmarkModal from './AssessmntBenchmarkModal';
import { infoNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';

const EndosWaitingTimeReport = ({ viewData, searchDate, qitype }) => {
    const [tableData, setTableData] = useState([])
    const [viewFlag, setViewFlag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [patList, setPatList] = useState([])
    const [initdate, setInitdate] = useState('')
    //monthflag for to differentiate month report(2) or initial assess day report(1) show in modal
    const [monthFlag, setMonthFlag] = useState(0)
    const handleClose = useCallback(() => {
        setViewFlag(0)
        setModalOpen(false)
        setMonthFlag(0)
    }, [setModalOpen])


    useEffect(() => {
        if (viewData.length !== 0) {
            var dateList = eachDayOfInterval({ start: startOfMonth(new Date(searchDate)), end: endOfMonth(new Date(searchDate)) })
            const newTimelist = dateList?.map((item) => {
                const time = (viewData?.filter(val => format(new Date(val.patient_arrived_date), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy'))
                    .reduce((acc, curr) => acc + (curr.sumof_service_time), 0))
                return {
                    day: format(new Date(item), 'dd-MM-yyyy'),
                    totTime: time,
                    display_date: item
                }
            })
            const newTotalPat = dateList?.map((item) => {
                const count = (viewData?.filter(val => format(new Date(val.patient_arrived_date), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy')
                    && val.qi_status === 1))

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
                    result: array.totpatient > 0 ? (val.totTime / array.totpatient).toFixed(2) : 0,
                }
            })
            setTableData(newArray)
        }
    }, [viewData, searchDate])

    const ViewDetails = useCallback((value) => {
        const { display_date } = value
        setInitdate(display_date)
        const searchData = {
            from: format(new Date(display_date), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(display_date), 'yyyy-MM-dd 23:59:59 ')
        }
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
    }, [])

    return (
        <Fragment>
            {viewFlag === 1 ? <AssessmntBenchmarkModal open={modalopen} handleClose={handleClose} patList={patList} initdate={format(new Date(initdate), 'dd-MM-yyyy')}
                monthFlag={monthFlag} /> : null}
            <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220, padding: 'none' }}>
                <CssVarsProvider>
                    <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                        <thead style={{ alignItems: 'center' }}>
                            <tr style={{ height: 0.5 }}>
                                <th size='sm' style={{ width: 120, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>Date</th>
                                {qitype === 1 ? <th size='sm' style={{ width: 300, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#BDC3CB', fontSize: 15 }}>Total Sum Of Time in Min</th> : null}
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
                                                    <td size='sm' style={{ textAlign: 'center', fontSize: 14, color: 'red' }}>{val.result}</td>
                                                </Tooltip>
                                            </CssVarsProvider>
                                            : <td size='sm' style={{ textAlign: 'center', fontSize: 14 }}>{val.result}</td>
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
        </Fragment >
    )
}

export default memo(EndosWaitingTimeReport)