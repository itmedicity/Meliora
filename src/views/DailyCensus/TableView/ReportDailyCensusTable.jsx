import { Box, CssVarsProvider, Table } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const ReportDailyCensusTable = ({ tableData, calculateTotal }) => {

    const { totYesterday, totAdmission, totDischarge, totTransIn, totTransOut, totDeath, totalcensus,
        oraTotAdm, oraTotDis, oraTotDeath, oraTotal } = calculateTotal
    return (
        <Fragment>
            <Box variant="none" sx={{ height: 360, overflow: 'auto', padding: 'none' }}>
                <CssVarsProvider>
                    <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                        <thead>
                            <tr style={{ height: 0.5 }}>
                                <th size='sm' style={{ width: 50, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Sl.No</th>
                                <th size='sm' style={{ width: 150, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Nursing Station</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Yesterday Census</th>
                                <th size='sm' style={{ width: 90, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Admissions</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>HIS Admissions</th>
                                <th size='sm' style={{ width: 80, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Discharge</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>HIS Discharge</th>
                                <th size='sm' style={{ width: 90, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Transfer In</th>
                                <th size='sm' style={{ width: 90, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Transfer Out</th>
                                <th size='sm' style={{ width: 70, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Death</th>
                                <th size='sm' style={{ width: 80, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>HIS Death</th>
                                <th size='sm' style={{ width: 70, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>Total</th>
                                <th size='sm' style={{ width: 70, textAlign: 'center', color: 'darkgreen', fontSize: 15 }}>HIS Total</th>
                            </tr>
                        </thead>
                        <tbody size='small' style={{ maxHeight: 0.5 }}>
                            {tableData?.map((val, index) => {
                                return (
                                    < tr key={index} size='small'
                                        style={{
                                            maxHeight: 2, cursor: 'pointer'
                                        }}  >
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{index + 1}</td>
                                        <td size='sm' style={{ fontSize: 14, height: 15 }}>{val.census_ns_name}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.yesterday_census}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_admission}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_admission}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_discharge}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_discharge}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.transfer_in}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.transfer_out}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_death}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_death}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.census_total}</td>
                                        <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_census_total}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>

                                <th style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8' }}></th>
                                <th style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }} scope="row">Total</th>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{totYesterday}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{totAdmission}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{oraTotAdm}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{totDischarge}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{oraTotDis}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{totTransIn}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{totTransOut}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{totDeath}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{oraTotDeath}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{totalcensus}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: 'darkgreen', backgroundColor: '#DBE8D8', fontWeight: 'bold' }}>{oraTotal}</td>
                            </tr>
                        </tfoot>

                    </Table>
                </CssVarsProvider>
            </Box>
        </Fragment >
    )
}

export default memo(ReportDailyCensusTable)