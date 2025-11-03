import { Box, Table, Typography } from '@mui/joy'
import React, { memo } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import FormattedDate from 'src/views/Components/FormattedDate'
import { taskColor } from 'src/color/Color'

const EmpProgressTable = ({ progresstabledata, rowSelect }) => {
  return (
    <Box sx={{ mx: 2, border: 1, borderStyle: 'dashed', borderColor: taskColor.darkPurple }}>
      <Typography sx={{ color: 'black', fontFamily: 'Georgia', p: 1 }}>
        Task Progress
      </Typography>
      {progresstabledata.length !== 0 ? (

        <Table size='sm' padding={'none'} stickyHeader borderAxis='both' sx={{ mx: 1, mb: 1, width: '98%' }} >
          <thead>
            <tr>
              <th style={{ width: 10, textAlign: 'center' }}>#</th>
              <th style={{ width: 20 }}>Action</th>
              <th style={{ width: 50 }}>Date</th>
              <th style={{ width: 50 }}>Assignee</th>
              <th style={{ width: 100 }}>Progress</th>
            </tr>
          </thead>
          <tbody>
            {progresstabledata?.map((val, index) => {
              return (
                <tr key={index}>
                  <td style={{ width: 10, textAlign: 'center' }}>{index + 1}</td>
                  <td>
                    <EditIcon
                      sx={{ cursor: 'pointer', color: '#3E004A' }}
                      size={6}
                      onClick={() => rowSelect(val)}
                    />
                  </td>
                  <td>
                    <FormattedDate date={val.tm_progres_date} /></td>
                  <td> {val.em_name || 'not given'}</td>
                  <td> {val.tm_task_progress || 'not given'}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

      ) : (
        <Box sx={{ textAlign: 'center', mb: 3, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
          No Progress Added Under Task
        </Box>
      )}
    </Box>
  )
}

export default memo(EmpProgressTable)
