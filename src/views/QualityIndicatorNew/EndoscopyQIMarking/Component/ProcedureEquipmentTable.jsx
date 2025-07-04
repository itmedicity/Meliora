import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

const ProcedureEquipmentTable = ({ ProcedureArray, setProcedureArray, equipReport }) => {
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
    <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: 150, padding: 'none' }}>
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
              <th size="sm" style={{ width: 200, fontWeight: 650, fontSize: 14 }}>
                &nbsp;Equipment
              </th>
              <th size="sm" style={{ width: 200, fontWeight: 650, fontSize: 14 }}>
                &nbsp;Procedure Name
              </th>
              {equipReport === 0 ? <th size="sm" style={{ width: 60, fontWeight: 650, fontSize: 14 }}></th> : null}
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
                    &nbsp;{val.equip_name}
                  </td>
                  <td size="sm" style={{ fontSize: 12, height: 5 }}>
                    &nbsp;{val.PDC_DESC}
                  </td>
                  {equipReport === 0 ? (
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
                            onClick={e => DeleteProcedures(val)}
                          />
                        </Tooltip>
                      </CssVarsProvider>
                    </td>
                  ) : null}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th style={{ backgroundColor: 'white', height: 20 }}></th>
              <th style={{ backgroundColor: 'white', height: 20 }}></th>
              <th style={{ backgroundColor: 'white', height: 20 }}></th>
              {equipReport === 0 ? <th style={{ backgroundColor: 'white', height: 20 }}></th> : null}
            </tr>
          </tfoot>
        </Table>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(ProcedureEquipmentTable)
