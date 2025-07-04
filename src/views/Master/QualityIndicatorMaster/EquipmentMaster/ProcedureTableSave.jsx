import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

const ProcedureTableSave = ({ ProcedureArray, setProcedureArray }) => {
  const DeleteProcedures = useCallback(
    val => {
      if (ProcedureArray.length !== 0) {
        const array = ProcedureArray?.filter(value => value.PD_CODE !== val.PD_CODE)
        setProcedureArray(array)
      }
    },
    [setProcedureArray, ProcedureArray]
  )
  return (
    <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: 200, padding: 'none' }}>
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
              <th size="sm" style={{ width: 50, fontWeight: 650, fontSize: 14, textAlign: 'center' }}>
                &nbsp; Sl.No
              </th>
              <th size="sm" style={{ width: 80, fontWeight: 650, fontSize: 14 }}>
                &nbsp;Proc Code
              </th>
              <th size="sm" style={{ width: 200, fontWeight: 650, fontSize: 14 }}>
                &nbsp;Proc Name
              </th>
              <th size="sm" style={{ width: 33, fontWeight: 650, fontSize: 14 }}></th>
            </tr>
          </thead>
          <tbody size="small">
            {ProcedureArray?.map((val, index) => {
              return (
                <tr key={index} size="small" style={{ maxHeight: 2, cursor: 'pointer' }}>
                  <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                    {index + 1}
                  </td>
                  <td size="sm" style={{ fontSize: 12, height: 5 }}>
                    &nbsp;{val.PD_CODE}
                  </td>
                  <td size="sm" style={{ fontSize: 12, height: 5 }}>
                    &nbsp;{val.PDC_DESC}
                  </td>
                  <td size="sm" style={{ textAlign: 'center', height: 5 }}>
                    <CssVarsProvider>
                      <Tooltip title="Delete" placement="right">
                        <DeleteIcon
                          sx={{
                            color: '#B95C50',
                            ':hover': {
                              color: '#DC4731'
                            }
                          }}
                          onClick={() => DeleteProcedures(val)}
                        />
                      </Tooltip>
                    </CssVarsProvider>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th style={{ backgroundColor: 'white', height: 20 }}></th>
              <th style={{ backgroundColor: 'white', height: 20 }}></th>
              <th style={{ backgroundColor: 'white', height: 20 }}></th>
              <th style={{ backgroundColor: 'white', height: 20 }}></th>
            </tr>
          </tfoot>
        </Table>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(ProcedureTableSave)
