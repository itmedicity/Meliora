import { CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { memo } from 'react'
const PswdDetailMastTable = ({ arry, selectForEdit }) => {
  return (
    <Fragment>
      <Paper variant="outlined" sx={{ maxHeight: '100%', maxWidth: '100%', overflow: 'auto' }}>
        <CssVarsProvider>
          <Table padding={'none'} stickyHeader hoverRow>
            <thead>
              <tr>
                <th style={{ width: 60 }}>Action</th>
                <th style={{ width: 50 }}>SlNo</th>
                <th style={{ width: 150 }}>Credential Type</th>
                <th style={{ width: 150 }}>Description</th>
                <th style={{ width: 150 }}>User Name</th>
                <th style={{ width: 150 }}>Password</th>
                <th style={{ width: 150 }}>Port</th>
                <th style={{ width: 150 }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {arry?.map((val, index) => {
                return (
                  <tr
                    key={index}
                    // sx={{
                    //     '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                    //     minHeight: 5
                    // }}
                  >
                    <td>
                      <EditIcon sx={{ cursor: 'pointer' }} size={6} onClick={() => selectForEdit(val)} />
                    </td>
                    <td> {index + 1}</td>
                    <td> {val.credentialName || 'not given'}</td>
                    <td> {val.description || 'not given'}</td>
                    <td> {val.user_name || 'not given'}</td>
                    <td> {val.password || 'not given'}</td>
                    <td> {val.port || 'not given'}</td>
                    <td> {val.remarks || 'not given'}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CssVarsProvider>
      </Paper>
    </Fragment>
  )
}

export default memo(PswdDetailMastTable)
