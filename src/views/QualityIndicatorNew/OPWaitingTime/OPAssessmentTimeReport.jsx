import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify } from 'src/views/Common/CommonCode';
import TableOpPatientsDetails from './TableOpPatientsDetails';

const OPAssessmentTimeReport = ({ viewData, searchDate, qidept }) => {
    const [tableData, setTableData] = useState([])
    const [viewFlag, setViewFlag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [initdate, setInitdate] = useState('')
    const [patList, setPatList] = useState([])

    useEffect(() => {
        var dateList = eachDayOfInterval({ start: startOfMonth(new Date(searchDate)), end: endOfMonth(new Date(searchDate)) })
        if (viewData.length !== 0) {
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
                const count = (viewData?.filter(val => format(new Date(val.patient_arrived_date), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy')))
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
    }, [viewData, searchDate])

    const handleClose = useCallback(() => {
        setViewFlag(0)
        setModalOpen(false)
    }, [setModalOpen])

    const ViewDetails = useCallback((value) => {
        const { display_date } = value
        setInitdate(display_date)
        const searchData = {
            from: format(new Date(display_date), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(display_date), 'yyyy-MM-dd 23:59:59 '),
            dpt: qidept
        }
        const getOpData = async (searchData) => {
            const result = await axioslogin.post('/InitialAsessment/view', searchData);
            return result.data
        }
        getOpData(searchData).then((val) => {
            const { success, data, message } = val
            if (success === 1) {
                const newData = data?.filter((val) => val.sumof_service_time > 10)
                setPatList(newData)
                setViewFlag(1)
                setModalOpen(true)
            }
            else if (success === 2) {
                infoNotify(message)
                setViewFlag(0)
                setModalOpen(false)
            }
        })
    }, [qidept])
    return (
        <Fragment>
            {viewFlag === 1 ? <TableOpPatientsDetails open={modalopen} handleClose={handleClose} patList={patList}
                initdate={format(new Date(initdate), 'dd-MM-yyyy')} /> : null}
            <Box >
                {tableData.length !== 0 ?
                    <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 210, padding: 'none', '&::-webkit-scrollbar': { height: 8 } }}>
                        <CssVarsProvider>
                            <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                                <thead style={{ alignItems: 'center' }}>
                                    <tr style={{ height: 0.5 }}>
                                        <th size='sm' style={{ width: 120, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#e0e0e0', fontSize: 15 }}>Date</th>
                                        <th size='sm' style={{ width: 300, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#e0e0e0', fontSize: 15 }}>Sum Of Time in Min</th>
                                        <th size='sm' style={{ width: 300, borderRight: '1px solid white', textAlign: 'center', backgroundColor: '#e0e0e0', fontSize: 15 }}>Total No.Of Patients Reported</th>
                                        <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#e0e0e0', fontSize: 15 }}>Result</th>
                                        <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#e0e0e0', fontSize: 15 }}>View</th>
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
                                        <th style={{ backgroundColor: '#e0e0e0' }}></th>
                                        <th style={{ backgroundColor: '#e0e0e0' }}></th>
                                        <td style={{ backgroundColor: '#e0e0e0' }}></td>
                                        <td style={{ backgroundColor: '#e0e0e0' }}></td>
                                        <td style={{ backgroundColor: '#e0e0e0' }}></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </CssVarsProvider>
                    </Box >
                    : null}
            </Box >
        </Fragment >
    )
}

export default memo(OPAssessmentTimeReport)