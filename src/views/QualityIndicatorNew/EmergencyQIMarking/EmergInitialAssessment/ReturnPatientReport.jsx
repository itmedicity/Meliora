import { Box, CssVarsProvider, Table } from '@mui/joy'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'
import React, { Fragment, memo, useEffect, useState } from 'react'

const ReturnPatientReport = ({ viewData, searchDate }) => {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    if (viewData.length !== 0) {
      var dateList = eachDayOfInterval({
        start: startOfMonth(new Date(searchDate)),
        end: endOfMonth(new Date(searchDate))
      })
      const returnTotPat = dateList?.map(item => {
        const count = viewData?.filter(
          val =>
            format(new Date(val.patient_arrived_date), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy') &&
            val.return_status === 1
        )
        return {
          day: format(new Date(item), 'dd-MM-yyyy'),
          returnTot: count.length
        }
      })
      const newTotalPat = dateList?.map(item => {
        const count = viewData?.filter(
          val =>
            format(new Date(val.patient_arrived_date), 'dd-MM-yyyy') === format(new Date(item), 'dd-MM-yyyy') &&
            val.qi_status === 1
        )
        return {
          day: format(new Date(item), 'dd-MM-yyyy'),
          totpatient: count.length
        }
      })
      const newArray = returnTotPat?.map(val => {
        const array = newTotalPat?.find(value => val.day === value.day)
        return {
          ...val,
          totpatient: array ? array.totpatient : 0,
          result: array.totpatient > 0 ? (val.returnTot / array.totpatient).toFixed(2) : 0
        }
      })
      setTableData(newArray)
    }
  }, [viewData, searchDate])
  return (
    <Fragment>
      <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220, padding: 'none' }}>
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
                    width: 120,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    backgroundColor: '#B9B7BD',
                    fontSize: 15
                  }}
                >
                  Date
                </th>
                <th
                  size="sm"
                  style={{
                    width: 600,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    backgroundColor: '#B9B7BD',
                    fontSize: 15
                  }}
                >
                  Return To Emergency Dept Within 72 Hrs With Similar Presenting Complaints
                </th>
                <th
                  size="sm"
                  style={{
                    width: 400,
                    borderRight: '1px solid white',
                    textAlign: 'center',
                    backgroundColor: '#B9B7BD',
                    fontSize: 15
                  }}
                >
                  Total No.Of Patients Who Have Come To Emergency
                </th>
                <th
                  size="sm"
                  style={{
                    width: 100,
                    textAlign: 'center',
                    backgroundColor: '#B9B7BD',
                    fontSize: 15
                  }}
                >
                  Result
                </th>
              </tr>
            </thead>
            <tbody size="small" style={{ maxHeight: 0.5 }}>
              {tableData?.map((val, index) => {
                return (
                  <tr key={index} size="small" style={{ maxHeight: 2, cursor: 'pointer' }}>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14 }}>
                      {val.day}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14 }}>
                      {val.returnTot}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14 }}>
                      {val.totpatient}
                    </td>
                    <td size="sm" style={{ textAlign: 'center', fontSize: 14 }}>
                      {val.result}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <th style={{ backgroundColor: '#B9B7BD' }}></th>
                <th style={{ backgroundColor: '#B9B7BD' }}></th>
                <td style={{ backgroundColor: '#B9B7BD' }}></td>
                <td style={{ backgroundColor: '#B9B7BD' }}></td>
              </tr>
            </tfoot>
          </Table>
        </CssVarsProvider>
      </Box>
    </Fragment>
  )
}

export default memo(ReturnPatientReport)
