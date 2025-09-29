import { Box, CssVarsProvider, Table } from '@mui/joy'
import React, { Fragment, memo } from 'react'
import { useMemo } from 'react'
import dayjs from 'dayjs'

const ReportDailyCensus = ({ tableData, calculateTotal }) => {

    const { oraTotAdm, oraTotDis, oraTotDeath, oraTotal, oraDamaTot, oraLamaTot, totYesterday, totAdmission, totDischarge, totTransIn, totTransOut, totDeath, totalcensus } = calculateTotal

    const groupedMonthlyData = useMemo(() => {
        const group = {}
        tableData?.forEach(item => {
            const dayKey = dayjs(item.census_date).format('YYYY-MM-DD');

            if (!group[dayKey]) {
                group[dayKey] = {
                    rows: [],
                    totals: {
                        ora_admission: 0,
                        ora_discharge: 0,
                        ora_death: 0,
                        ora_dama: 0,
                        ora_lama: 0,
                        ora_census_total: 0,
                        census_total: 0,
                        total_admission: 0,
                        total_death: 0,
                        total_discharge: 0,
                        transfer_in: 0,
                        transfer_out: 0,
                        yesterday_census: 0
                    }
                };
            }

            group[dayKey].rows.push(item);

            // Update totals
            group[dayKey].totals.ora_admission += Number(item.ora_admission || 0);
            group[dayKey].totals.ora_discharge += Number(item.ora_discharge || 0);
            group[dayKey].totals.ora_death += Number(item.ora_death || 0);
            group[dayKey].totals.ora_dama += Number(item.ora_dama || 0);
            group[dayKey].totals.ora_lama += Number(item.ora_lama || 0);
            group[dayKey].totals.ora_census_total += Number(item.ora_census_total || 0);
            group[dayKey].totals.census_total += Number(item.census_total || 0);
            group[dayKey].totals.total_admission += Number(item.total_admission || 0);
            group[dayKey].totals.total_death += Number(item.total_death || 0);
            group[dayKey].totals.total_discharge += Number(item.total_discharge || 0);
            group[dayKey].totals.transfer_in += Number(item.transfer_in || 0);
            group[dayKey].totals.transfer_out += Number(item.transfer_out || 0);
            group[dayKey].totals.yesterday_census += Number(item.yesterday_census || 0);
        });

        return group;

    }, [tableData])


    return (
        <Fragment>
            <Box variant="outlined" sx={{ height: window.innerHeight - 220, overflow: 'auto', padding: 'none' }}>
                <CssVarsProvider>
                    <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                        <thead style={{ alignItems: 'center' }}>
                            <tr style={{ height: 0.5 }}>
                                <th size='sm' style={{ width: 50, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Sl.No</th>
                                <th size='sm' style={{ width: 190, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Nursing Station</th>
                                <th size='sm' style={{ width: 120, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Date</th>

                                <th size='sm' style={{ width: 150, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Yesterday Census</th>
                                <th size='sm' style={{ width: 95, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Admissions</th>
                                <th size='sm' style={{ width: 80, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Discharge</th>
                                <th size='sm' style={{ width: 100, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Transfer In</th>
                                <th size='sm' style={{ width: 100, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Transfer Out</th>
                                <th size='sm' style={{ width: 60, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Death</th>
                                <th size='sm' style={{ width: 60, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>Total</th>
                                <th size='sm' style={{ width: 120, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>HIS Admissions</th>
                                <th size='sm' style={{ width: 120, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>HIS Discharge</th>
                                <th size='sm' style={{ width: 90, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>HIS Death</th>
                                <th size='sm' style={{ width: 100, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>HIS DAMA</th>
                                <th size='sm' style={{ width: 100, borderRight: '1px solid white', textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>HIS LAMA</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', color: 'white', backgroundColor: '#757575', fontSize: 15 }}>HIS Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Object.entries(groupedMonthlyData).map(([month, { rows, totals }], groupIdx) => (
                                <Fragment key={month}>
                                    <tr>
                                        <td colSpan={16} style={{ backgroundColor: '#eeeeee', fontWeight: 'bold', textAlign: 'left' }}>
                                            {dayjs(month).format('D MMMM YYYY')}
                                        </td>
                                    </tr>
                                    {rows.map((val, index) => (
                                        <tr key={val.census_slno}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td>{val.census_ns_name}</td>
                                            <td style={{ textAlign: 'center' }}>{val.census_date}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.yesterday_census}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_admission}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_discharge}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.transfer_in}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.transfer_out}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.total_death}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.census_total}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_admission}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_discharge}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_death}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_dama}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_lama}</td>
                                            <td size='sm' style={{ textAlign: 'center', fontSize: 14, height: 15 }}>{val.ora_census_total}</td>
                                        </tr>
                                    ))}
                                    <tr style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                                        <td colSpan={3} style={{ textAlign: 'center' }}> Total</td>
                                        <td style={{ textAlign: 'center' }}>{totals.yesterday_census}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.total_admission}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.total_discharge}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.transfer_in}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.transfer_out}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.total_death}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.census_total}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.ora_admission}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.ora_discharge}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.ora_death}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.ora_dama}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.ora_lama}</td>
                                        <td style={{ textAlign: 'center' }}>{totals.ora_census_total}</td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0' }}></th>
                                <th style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }} scope="row">Total</th>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}></td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{totYesterday}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{totAdmission}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{totDischarge}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{totTransIn}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{totTransOut}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{totDeath}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{totalcensus}</td>

                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{oraTotAdm}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{oraTotDis}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{oraTotDeath}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{oraDamaTot}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{oraLamaTot}</td>
                                <td style={{ textAlign: 'center', fontSize: 15, color: '#424242', backgroundColor: '#e0e0e0', fontWeight: 'bold' }}>{oraTotal}</td>
                            </tr>
                        </tfoot>
                    </Table>
                </CssVarsProvider>
            </Box>
        </Fragment >)
}

export default memo(ReportDailyCensus)