import { Box, CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo } from 'react'

const OPConsultationWaitingReport = ({ tableData }) => {
  return (
    <Paper variant="outlined" square sx={{ pt: 1, px: 1 }}>
      {tableData.length !== 0 ? (
        <Box
          variant="plain"
          sx={{
            overflow: 'auto',
            maxHeight: window.innerHeight - 210,
            padding: 'none',
            '&::-webkit-scrollbar': { height: 8 },
          }}
        >
          <CssVarsProvider>
            <Table
              aria-label="table with sticky header"
              padding={'none'}
              borderAxis="xBetween"
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
                  <th size="sm" style={{ width: 90, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Patient ID
                  </th>
                  <th size="sm" style={{ width: 170, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Patient Name
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Arrival Time
                  </th>
                  <th size="sm" style={{ width: 160, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Assessment StartTime
                  </th>
                  <th size="sm" style={{ width: 160, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Assessment EndTime
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Consultaion StartTime
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Consultaion EndTime
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Pre Assessment Time
                  </th>
                  <th size="sm" style={{ width: 130, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Assessment Time
                  </th>
                  <th size="sm" style={{ width: 130, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Consultation Time
                  </th>
                  <th size="sm" style={{ width: 150, backgroundColor: '#e0e0e0', fontSize: 13 }}>
                    Arrival to Consultation
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
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.assessment_start}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.assessment_end}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.consult_start_date}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.consult_end_date}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.start_time_diff}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.assess_time_diff}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.consult_max_diff}
                      </td>
                      <td size="sm" style={{ fontSize: 12 }}>
                        {val.tot_timeto_consult}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Box>
      ) : null}
    </Paper>
  )
}

export default memo(OPConsultationWaitingReport)
