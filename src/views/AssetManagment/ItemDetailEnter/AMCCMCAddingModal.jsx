import React, { memo } from 'react'
import Table from '@mui/joy/Table'
import { Box } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const AMCCMCAddingModal = ({ AmcCmcArray, rowSelect }) => {
  return (
    <Box
      sx={{
        minHeight: 150,
        maxHeight: 200,
        overflow: 'auto',
        border: 1,
        borderColor: 'lightgrey',
      }}
    >
      <CssVarsProvider>
        <Table stickyHeader size="sm">
          <thead>
            <tr>
              <th style={{ width: '15%', align: 'center' }}>#</th>
              <th style={{ width: '50%', align: 'center' }}>Supplier</th>
              <th style={{ width: '15%', align: 'center' }}>From Date</th>
              <th style={{ width: '10%', align: 'center' }}>To Date</th>
              <th style={{ width: '10%', align: 'center' }}>Add</th>
            </tr>
          </thead>
          <tbody>
            {AmcCmcArray &&
              AmcCmcArray.map((val, index) => {
                return (
                  <tr
                    key={index}
                    // sx={{
                    //     '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                    //     minHeight: 5
                    // }}
                  >
                    <td> {index + 1}</td>
                    <td> {val.it_supplier_name}</td>
                    <td> {val.from_date}</td>
                    <td> {val.to_date}</td>
                    <td>
                      <AddCircleOutlineIcon
                        size={6}
                        color="primary"
                        onClick={() => rowSelect(val)}
                      />
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(AMCCMCAddingModal)
