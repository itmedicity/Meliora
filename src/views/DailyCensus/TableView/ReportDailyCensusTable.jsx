import { Box, CssVarsProvider, Table } from '@mui/joy'
import React, { Fragment, memo, useEffect, useState } from 'react'

const ReportDailyCensusTable = ({ tableData }) => {
    const [calculateTotal, setCalculateTotal] = useState({
        totYesterday: 0,
        totAdmission: 0,
        totDischarge: 0,
        totTransIn: 0,
        totTransOut: 0,
        totDeath: 0,
        totalcensus: 0
    })
    const { totYesterday, totAdmission, totDischarge, totTransIn, totTransOut, totDeath, totalcensus } = calculateTotal
    useEffect(() => {
        if (tableData.length !== 0) {
            const totyes = tableData?.map(val => val.yesterday_census).reduce((prev, next) => Number(prev) + Number(next));
            const totad = tableData?.map(val => val.total_admission).reduce((prev, next) => Number(prev) + Number(next));
            const totdis = tableData?.map(val => val.total_discharge).reduce((prev, next) => Number(prev) + Number(next));
            const totin = tableData?.map(val => val.transfer_in).reduce((prev, next) => Number(prev) + Number(next));
            const totout = tableData?.map(val => val.transfer_out).reduce((prev, next) => Number(prev) + Number(next));
            const totdeath = tableData?.map(val => val.total_death).reduce((prev, next) => Number(prev) + Number(next));
            const tot = tableData?.map(val => val.census_total).reduce((prev, next) => Number(prev) + Number(next));
            const fromdata = {
                totYesterday: totyes,
                totAdmission: totad,
                totDischarge: totdis,
                totTransIn: totin,
                totTransOut: totout,
                totDeath: totdeath,
                totalcensus: tot
            }
            setCalculateTotal(fromdata)
        }
        else {
        }

    }, [tableData])
    return (
        <Fragment>
            <Box variant="none" sx={{ height: 330, overflow: 'auto', padding: 'none' }}>
                <CssVarsProvider>
                    <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                        <thead>
                            <tr style={{ height: 0.5 }}>
                                <th size='sm' style={{ width: 50, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Sl.No</th>
                                <th size='sm' style={{ width: 150, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Nursing Station</th>
                                <th size='sm' style={{ width: 150, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Yesterday Census</th>
                                <th size='sm' style={{ width: 150, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Admissions</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Discharge</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Transfer In</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Transfer Out</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Death</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Total</th>
                            </tr>
                        </thead>
                        <tbody size='small' style={{ maxHeight: 0.5 }}>
                            {tableData?.map((val, index) => {
                                return (
                                    < tr key={index} size='small'
                                        style={{
                                            maxHeight: 2,
                                        }}  >
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{index + 1}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.census_ns_name}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.yesterday_census}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_admission}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_discharge}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.transfer_in}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.transfer_out}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_death}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.census_total}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr >
                                <th style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }} scope="row">Total</th>
                                <th style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}></th>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totYesterday}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totAdmission}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totDischarge}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totTransIn}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totTransOut}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totDeath}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}>{totalcensus}</td>
                            </tr>
                        </tfoot>

                    </Table>
                </CssVarsProvider>
            </Box>
        </Fragment >
    )
}

export default memo(ReportDailyCensusTable)