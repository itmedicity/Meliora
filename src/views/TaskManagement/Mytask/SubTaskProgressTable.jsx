import { Box, CssVarsProvider, Table } from '@mui/joy'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import FormattedDate from 'src/views/Components/FormattedDate'
const SubTaskProgressTable = ({ tabledataProgress, rowSelectSubProgress }) => {
  return (
    <Box sx={{ p: 1 }}>
      {tabledataProgress.length !== 0 ? (
        <CssVarsProvider>
          <Table size='sm' borderAxis='both' stickyHeader >
            <thead>
              <tr>
                <th style={{ width: 30, textAlign: 'center' }}>#</th>
                <th style={{ width: 60, textAlign: 'center' }}>Action</th>
                <th style={{ width: 150 }}>Date</th>
                <th style={{ width: 230 }}>Assignee</th>
                <th style={{ width: 'auto' }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {tabledataProgress?.map((val, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: 30, textAlign: 'center' }}> {index + 1}</td>
                    <td style={{ width: 60, textAlign: 'center' }}>
                      <EditIcon sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelectSubProgress(val)} />
                    </td>
                    <td>
                      <FormattedDate date={val.tm_progres_date} />
                    </td>
                    <td> {val.em_name || 'not given'}</td>
                    <td> {val.tm_task_progress || 'not given'}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CssVarsProvider>
      ) : (
        <Box sx={{ textAlign: 'center', m: 2, fontWeight: 700, fontSize: 30, color: '#C7C8CB', border: 1, borderColor: 'lightgrey' }}>
          No Progress Under Task
        </Box>
      )}

    </Box>
  )
}

export default SubTaskProgressTable
