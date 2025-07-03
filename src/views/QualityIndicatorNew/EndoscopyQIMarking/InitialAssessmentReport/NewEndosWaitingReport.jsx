import { Box, CssVarsProvider, Table } from '@mui/joy'
import { format, intervalToDuration } from 'date-fns'
import React, { memo, useEffect, useState } from 'react'

const NewEndosWaitingReport = ({ viewData, ipViewReport, opCheck, ipCheck }) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    if (opCheck === true) {
      if (viewData.length !== 0) {
        const formatTimeDifference = milliseconds => {
          if (milliseconds === null) return null
          const duration = intervalToDuration({ start: 0, end: milliseconds })
          return `${duration.minutes} min ${duration.seconds} sec`
        }

        const newArray = viewData?.map(val => {
          const patientArrivedDate = new Date(val.patient_arrived_date)
          const assessmentStartDate = new Date(val.endo_arrival_time)
          const assessmentEndDate = new Date(val.assessment_time)
          const procStartTime = new Date(val.proc_start_time)
          const procEndTime = new Date(val.proc_end_time)
          const reportGenTime = new Date(val.report_gene_time)
          const reportdespTime = new Date(val.report_desp_time)

          const startTimeDiff = assessmentStartDate.getTime() - patientArrivedDate.getTime()
          const assessTimeDiff = assessmentEndDate.getTime() - assessmentStartDate.getTime()
          const procTimeDiff = procEndTime.getTime() - procStartTime.getTime()
          const totalTimeDiff = reportdespTime.getTime() - assessmentStartDate.getTime()

          return {
            ptno: val.ptno,
            ptname: val.ptname,
            patient_arrived_date: format(patientArrivedDate, 'dd-MM-yyyy HH:mm:ss a'),
            assessment_start: format(assessmentStartDate, 'dd-MM-yyyy HH:mm:ss a'),
            assessment_end: format(assessmentEndDate, 'dd-MM-yyyy HH:mm:ss a'),
            proc_start_time: format(procStartTime, 'dd-MM-yyyy HH:mm:ss a'),
            proc_end_time: format(procEndTime, 'dd-MM-yyyy HH:mm:ss a'),
            report_gen_time: format(reportGenTime, 'dd-MM-yyyy HH:mm:ss a'),
            report_desp_time: format(reportdespTime, 'dd-MM-yyyy HH:mm:ss a'),
            start_time_diff: startTimeDiff !== null ? formatTimeDifference(startTimeDiff) : null,
            assess_time_diff: assessTimeDiff !== null ? formatTimeDifference(assessTimeDiff) : null,
            proc_time_diff: procTimeDiff !== null ? formatTimeDifference(procTimeDiff) : null,
            arrival_to_ReportTime:
              totalTimeDiff !== null ? formatTimeDifference(totalTimeDiff) : null,
          }
        })
        setTableData(newArray)
      }
    } else if (ipCheck === true) {
      if (ipViewReport.length !== 0) {
        const formatTimeDifference = milliseconds => {
          if (milliseconds === null) return null
          const duration = intervalToDuration({ start: 0, end: milliseconds })
          return `${duration.minutes} min ${duration.seconds} sec`
        }
        const newArray = ipViewReport?.map(val => {
          const patientArrivedDate = new Date(val.endo_arrival_time)
          const assessmentStartDate = new Date(val.endo_arrival_time)
          const assessmentEndDate = new Date(val.assessment_time)
          const procStartTime = new Date(val.proc_start_time)
          const procEndTime = new Date(val.proc_end_time)
          const reportGenTime = new Date(val.report_gene_time)
          const reportdespTime = new Date(val.report_desp_time)

          const startTimeDiff = assessmentStartDate.getTime() - patientArrivedDate.getTime()
          const assessTimeDiff = assessmentEndDate.getTime() - assessmentStartDate.getTime()
          const procTimeDiff = procEndTime.getTime() - procStartTime.getTime()
          const totalTimeDiff = reportdespTime.getTime() - assessmentStartDate.getTime()

          return {
            ptno: val.ptno,
            ptname: val.ptname,
            patient_arrived_date: format(patientArrivedDate, 'dd-MM-yyyy HH:mm:ss a'),
            assessment_start: format(assessmentStartDate, 'dd-MM-yyyy HH:mm:ss a'),
            assessment_end: format(assessmentEndDate, 'dd-MM-yyyy HH:mm:ss a'),
            proc_start_time: format(procStartTime, 'dd-MM-yyyy HH:mm:ss a'),
            proc_end_time: format(procEndTime, 'dd-MM-yyyy HH:mm:ss a'),
            report_gen_time: format(reportGenTime, 'dd-MM-yyyy HH:mm:ss a'),
            report_desp_time: format(reportdespTime, 'dd-MM-yyyy HH:mm:ss a'),
            start_time_diff: startTimeDiff !== null ? formatTimeDifference(startTimeDiff) : null,
            assess_time_diff: assessTimeDiff !== null ? formatTimeDifference(assessTimeDiff) : null,
            proc_time_diff: procTimeDiff !== null ? formatTimeDifference(procTimeDiff) : null,
            arrival_to_ReportTime:
              totalTimeDiff !== null ? formatTimeDifference(totalTimeDiff) : null,
          }
        })
        setTableData(newArray)
      }
    }
  }, [viewData, ipViewReport, opCheck, ipCheck])
  return (
    <Box sx={{ pt: 1 }}>
      {tableData.length !== 0 ? (
        <Box
          variant="plain"
          sx={{
            overflow: 'auto',
            maxHeight: window.innerHeight - 220,
            padding: 'none',
            '&::-webkit-scrollbar': { height: 8 },
          }}
        >
          <CssVarsProvider>
            <Table
              aria-label="table with sticky header"
              padding={'none'}
              borderAxis="none"
              stickyHeader
              size="sm"
              stickyFooter
              hoverRow
            >
              <thead style={{ alignItems: 'center' }}>
                <tr style={{ height: 0.5, borderRadius: 0 }}>
                  <th
                    size="sm"
                    style={{
                      width: 50,
                      backgroundColor: '#e0e0e0',
                      textAlign: 'center',
                      fontSize: 13,
                    }}
                  >
                    Sl.No
                  </th>
                  <th size="sm" style={{ width: 100, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Patient ID
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Patient Name
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Arrival Time
                  </th>
                  {opCheck === true ? (
                    <th size="sm" style={{ width: 170, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                      Assessment StartTime
                    </th>
                  ) : null}
                  <th size="sm" style={{ width: 170, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Assessment EndTime
                  </th>
                  <th size="sm" style={{ width: 170, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Procedure StartTime
                  </th>
                  <th size="sm" style={{ width: 170, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Procedure EndTime
                  </th>
                  {opCheck === true ? (
                    <th size="sm" style={{ width: 150, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                      Pre Assessment Time
                    </th>
                  ) : null}
                  <th size="sm" style={{ width: 130, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Assessment Time
                  </th>
                  <th size="sm" style={{ width: 130, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Procedure Time
                  </th>
                  <th size="sm" style={{ width: 120, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Total Time
                  </th>
                </tr>
              </thead>
              <tbody size="small" style={{ maxHeight: 0.5 }}>
                {tableData?.map((val, index) => {
                  return (
                    <tr key={index} size="small" style={{ maxHeight: 2, cursor: 'pointer' }}>
                      <td size="sm" style={{ textAlign: 'center', fontSize: 12 }}>
                        {index + 1}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.ptno}
                      </td>
                      <td size="sm" style={{ fontSize: 12, textTransform: 'capitalize' }}>
                        {val.ptname
                          .toLowerCase()
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.patient_arrived_date}
                      </td>
                      {opCheck === true ? (
                        <td size="sm" style={{ fontSize: 12 }}>
                          {val.assessment_start}
                        </td>
                      ) : null}
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.assessment_end}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.proc_start_time}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.proc_end_time}
                      </td>
                      {opCheck === true ? (
                        <td size="sm" style={{ fontSize: 12 }}>
                          {val.start_time_diff}
                        </td>
                      ) : null}
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.assess_time_diff}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.proc_time_diff}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.arrival_to_ReportTime}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Box>
      ) : null}
    </Box>
  )
}

export default memo(NewEndosWaitingReport)
