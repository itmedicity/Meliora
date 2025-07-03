import { Box, CssVarsProvider, Table } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const ReportDailyCensusTable = ({ tableData, calculateTotal }) => {
  const {
    totYesterday,
    totAdmission,
    totDischarge,
    totTransIn,
    totTransOut,
    totDeath,
    totalcensus,
    oraYesttotal,
    oraTotAdm,
    oraTotDis,
    oraTotDeath,
    oraTotal,
    oraDamaTot,
    oraLamaTot,
  } = calculateTotal
  return (
    <Fragment>
      <Box variant="outlined" sx={{ height: 360, overflow: 'auto', padding: 'none' }}>
        <CssVarsProvider>
          <Table
            aria-label="table with sticky header"
            borderAxis="both"
            padding={'none'}
            stickyHeader
            size="sm"
            stickyFooter
            hoverRow
          >
            <thead style={{ alignItems: 'center' }}>
              <tr style={{ height: 0.5 }}>
                <th
                  size="sm"
                  style={{
                    width: 50,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Sl.No
                </th>
                <th
                  size="sm"
                  style={{
                    width: 190,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Nursing Station
                </th>
                <th
                  size="sm"
                  style={{
                    width: 150,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Yesterday Census
                </th>
                <th
                  size="sm"
                  style={{
                    width: 95,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Admissions
                </th>
                <th
                  size="sm"
                  style={{
                    width: 80,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Discharge
                </th>
                <th
                  size="sm"
                  style={{
                    width: 100,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Transfer In
                </th>
                <th
                  size="sm"
                  style={{
                    width: 100,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Transfer Out
                </th>
                <th
                  size="sm"
                  style={{
                    width: 60,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Death
                </th>
                <th
                  size="sm"
                  style={{
                    width: 60,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  Total
                </th>
                <th
                  size="sm"
                  style={{
                    width: 120,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  HIS Yesterday
                </th>
                <th
                  size="sm"
                  style={{
                    width: 120,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  HIS Admissions
                </th>
                <th
                  size="sm"
                  style={{
                    width: 120,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  HIS Discharge
                </th>
                <th
                  size="sm"
                  style={{
                    width: 90,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  HIS Death
                </th>
                <th
                  size="sm"
                  style={{
                    width: 100,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  HIS DAMA
                </th>
                <th
                  size="sm"
                  style={{
                    width: 100,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  HIS LAMA
                </th>
                <th
                  size="sm"
                  style={{
                    width: 100,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#757575',
                    fontSize: 15,
                  }}
                >
                  HIS Total
                </th>
              </tr>
            </thead>
            <tbody size="small" style={{ maxHeight: 0.5 }}>
              {tableData?.map((val, index) => {
                return (
                  <tr
                    key={index}
                    size="small"
                    style={{
                      maxHeight: 2,
                      cursor: 'pointer',
                    }}
                  >
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {index + 1}
                    </td>
                    <td size="sm" style={{ fontSize: 14, height: 15 }}>
                      {val.census_ns_name}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.yesterday_census}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.total_admission}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.total_discharge}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.transfer_in}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.transfer_out}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.total_death}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.census_total}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.ora_yesterday}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.ora_admission}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.ora_discharge}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.ora_death}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.ora_dama}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.ora_lama}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14, height: 15 }}>
                      {val.ora_census_total}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <th
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                  }}
                ></th>
                <th
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                  scope="row"
                >
                  Total
                </th>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {totYesterday}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {totAdmission}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {totDischarge}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {totTransIn}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {totTransOut}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {totDeath}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {totalcensus}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {oraYesttotal}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {oraTotAdm}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {oraTotDis}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {oraTotDeath}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {oraDamaTot}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {oraLamaTot}
                </td>
                <td
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#424242',
                    backgroundColor: '#e0e0e0',
                    fontWeight: 'bold',
                  }}
                >
                  {oraTotal}
                </td>
              </tr>
            </tfoot>
          </Table>
        </CssVarsProvider>
      </Box>
    </Fragment>
  )
}

export default memo(ReportDailyCensusTable)
