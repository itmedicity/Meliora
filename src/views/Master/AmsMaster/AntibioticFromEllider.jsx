import { Box, CssVarsProvider, Table } from '@mui/joy'
import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const AntibioticFromEllider = ({ antibioticList, antibioticData }) => {
  return (
    <CssVarsProvider>
      <Box sx={{ maxHeight: 230, overflow: 'auto' }}>
        <Table stickyHeader borderAxis="both" size="sm">
          <thead>
            <tr>
              <th style={{ width: 80, textAlign: 'center' }}>Item Code</th>
              <th style={{ width: 'auto', textAlign: 'center' }}>Item Describtion</th>
              <th style={{ width: 60, textAlign: 'center' }}>Add</th>
            </tr>
          </thead>
          <tbody>
            {antibioticList.map((val, index) => (
              <tr key={index}>
                <td style={{ width: 80, textAlign: 'center' }}>{val.IT_CODE}</td>
                <td style={{ width: 'auto', textAlign: 'center' }}>{val.ITC_DESC}</td>
                <td style={{ width: 60, textAlign: 'center' }}>
                  <AddCircleOutlineIcon
                    sx={{ color: '#255a94', cursor: 'pointer' }}
                    onClick={() => antibioticData(val)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </CssVarsProvider>
  )
}

export default AntibioticFromEllider
