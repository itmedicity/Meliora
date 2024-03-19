
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import ModalForDailyCensusEntry from './ModalForDailyCensusEntry';

const ListNursingStations = ({ dailyDate, censusData, count, setCount }) => {
    const [modalFlag, setModalFlag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [nsName, setNsName] = useState('')
    const [nsNo, setnsNo] = useState(0)
    const [yestTotal, setYestTotal] = useState(0)

    const Reportview = useCallback((census_ns_slno, census_ns_name, yesterday_census) => {
        setModalFlag(1)
        setModalOpen(true)
        setNsName(census_ns_name)
        setnsNo(census_ns_slno)
        setYestTotal(yesterday_census)
    }, [])
    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModalFlag(0)
    }, [setModalOpen])
    return (
        <Fragment>
            {modalFlag === 1 ? <ModalForDailyCensusEntry open={modalopen} handleClose={handleClose} dailyDate={dailyDate}
                nsNo={nsNo} nsName={nsName} yest={yestTotal} count={count} setCount={setCount}
            /> : null}
            <Box sx={{ flex: 1 }}>
                <Box overflow='hidden'  >
                    <TableContainer sx={{ maxHeight: window.innerHeight - 240 }}>
                        <Table size='md' stickyHeader padding={"none"}  >

                            <TableHead sx={{}}>
                                <TableRow sx={{ height: 30 }} >
                                    <TableCell rowSpan={2} sx={{ width: 60, border: '0.5px solid lightgrey', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>Sl.No</TableCell>
                                    <TableCell rowSpan={2} sx={{ width: 300, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>Nursing Station</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>HIS Yesterday Census</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>Yesterday Census</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>HIS Admission</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>Admission</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>HIS Discharge</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>Discharge</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>Transfer In</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>Transfer Out</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>HIS Death</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>HIS DAMA</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>HIS LAMA</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>Death</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white' }}>HIS Total</TableCell>
                                    <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', textAlign: 'center', bgcolor: '#424242', color: 'white', borderRight: '1px solid grey' }}>Total</TableCell>
                                </TableRow >
                            </TableHead >
                            <TableBody hover >
                                {censusData?.map((val, index) => {
                                    return <TableRow key={val.census_ns_slno} style={{ cursor: 'pointer', background: (val.update_status === 1) ? '#bdbdbd' : 'transparent' }}>
                                        <TableCell sx={{ borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>{index + 1}</TableCell>
                                        <TableCell sx={{
                                            borderRight: '1px solid lightgrey', pl: 1, height: 25,
                                            cursor: 'pointer',
                                            ":hover": {
                                                color: 'black',
                                                boxShadow: 2,
                                            }
                                        }}
                                            onClick={() => Reportview(val.census_ns_slno, val.census_ns_name, val.yesterday_census)}>
                                            {val.census_ns_name}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25, bgcolor: '#757575', color: 'white' }}>
                                            {val.ora_yesterday}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                                            {val.yesterday_census}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25, bgcolor: '#757575', color: 'white' }}>
                                            {val.ora_admission}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                                            {val.total_admission}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25, bgcolor: '#757575', color: 'white' }}>
                                            {val.ora_discharge}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                                            {val.total_discharge}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                                            {val.transfer_in}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                                            {val.transfer_out}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25, bgcolor: '#757575', color: 'white' }}>
                                            {val.ora_death}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25, bgcolor: '#757575', color: 'white' }}>
                                            {val.ora_dama}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25, bgcolor: '#757575', color: 'white' }}>
                                            {val.ora_lama}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25 }}>
                                            {val.total_death}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid lightgrey', textAlign: 'center', height: 25, bgcolor: '#757575', color: 'white' }}>
                                            {val.ora_census_total}</TableCell>
                                        <TableCell padding={"none"} sx={{ borderRight: '1px solid grey', textAlign: 'center', height: 25 }}>
                                            {val.census_total}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                            {/* <ListCensusNameAndValues tablevalue={val} dailyDate={dailyDate} count={count} nursList={nursList} /> */}
                        </Table >
                    </TableContainer >
                </Box >
            </Box >
        </Fragment >
    )
}

export default memo(ListNursingStations)