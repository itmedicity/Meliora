
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import ListCensusNameAndValues from './ListCensusNameAndValues';
import ModalForDailyCensusEntry from './ModalForDailyCensusEntry';
import { subDays } from 'date-fns';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify } from 'src/views/Common/CommonCode';

const ListNursingStations = ({ nursList, dailyDate }) => {

    const [modalFlag, setModalFlag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [nsName, setNsName] = useState('')
    const [nsNo, setnsNo] = useState(0)
    const [yestCount, setYestCount] = useState(0)
    const [count, setCount] = useState(0)
    const Reportview = useCallback((census_ns_slno, census_ns_name) => {
        if (moment(new Date(dailyDate)).format('YYYY-MM-DD') > (moment(new Date()).format('YYYY-MM-DD'))) {
            infoNotify("The Day Is Not Yet Ended")
        } else {
            setModalFlag(1)
            setModalOpen(true)
            setNsName(census_ns_name)
            setnsNo(census_ns_slno)
        }
    }, [dailyDate])
    useEffect(() => {
        const getYesterday = {
            census_ns_slno: nsNo,
            census_date: moment(subDays(new Date(dailyDate), 1)).format('YYYY-MM-DD')
        }
        const getYesterdayData = async (getYesterday) => {
            const result = await axioslogin.post('/qidailycensus/yesterday', getYesterday);
            const { success, data } = result.data;
            if (success === 1) {
                const { census_total
                } = data[0]
                setYestCount(census_total)
            } else {
                setYestCount(0)
            }
        }
        getYesterdayData(getYesterday)
    }, [nsNo, dailyDate])
    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModalFlag(0)
    }, [setModalOpen])
    return (
        <Fragment>
            {modalFlag === 1 ? <ModalForDailyCensusEntry open={modalopen} handleClose={handleClose} dailyDate={dailyDate}
                nsNo={nsNo} nsName={nsName} yestCount={yestCount} count={count} setCount={setCount}
            /> : null}
            <Box sx={{ pl: 0.5, flex: 1 }}>
                <Box variant='elevation' overflow='hidden'  >
                    <TableContainer sx={{ maxHeight: window.innerHeight - 240 }}>
                        <Table size='md' stickyHeader aria-label="sticky table" padding={"none"} >
                            <TableHead sx={{ height: 40 }}>
                                <TableRow sx={{}}  >
                                    <TableCell sx={{ width: 50, border: '0.5px solid lightgrey', textAlign: 'center' }}>Sl.No</TableCell>
                                    <TableCell sx={{ width: 200, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center' }}>Nursing Station</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center' }}>Yesterday Census</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center' }}>Admission</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center' }}>Discharge</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center' }}>Transfer In</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center' }}>Transfer Out</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center' }}>Death</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center' }}>Total</TableCell>
                                </TableRow >
                            </TableHead >
                            <TableBody >
                                {nursList?.map((val, index) => {
                                    return <TableRow key={val.census_ns_slno}>
                                        <TableCell sx={{ borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>{index + 1}</TableCell>
                                        <TableCell sx={{
                                            borderRight: '1px solid lightgrey', pl: 1, height: 25, textAlign: 'center',
                                            cursor: 'pointer',
                                            ":hover": {
                                                color: 'black',
                                                boxShadow: 2,
                                            }
                                        }}
                                            onClick={() => Reportview(val.census_ns_slno, val.census_ns_name)}
                                        >{val.census_ns_name}
                                        </TableCell>
                                        <ListCensusNameAndValues tablevalue={val} dailyDate={dailyDate} count={count} />
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table >
                    </TableContainer >
                </Box >
            </Box >
        </Fragment >
    )
}

export default memo(ListNursingStations)