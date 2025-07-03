import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table } from '@mui/joy'
import React, { memo } from 'react'
const ModalProcedure = ({ open, handleClose, viewProcedures }) => {
  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <ModalDialog
          variant="outlined"
          sx={{
            minWidth: '30vw',
            py: 4,
            // borderRadius: 'md',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
              color: '#bf360c',
              height: 25,
              width: 25,
            }}
          />
          <Box
            variant="outlined"
            sx={{ overflow: 'auto', maxHeight: window.innerHeight - 50, padding: 'none' }}
          >
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
                      style={{ width: 30, fontWeight: 650, fontSize: 14, textAlign: 'center' }}
                    >
                      &nbsp; Sl.No
                    </th>
                    <th size="sm" style={{ width: 40, fontWeight: 650, fontSize: 14 }}>
                      &nbsp;Proc Code
                    </th>
                    <th size="sm" style={{ width: 200, fontWeight: 650, fontSize: 14 }}>
                      &nbsp;Proc Name
                    </th>
                  </tr>
                </thead>
                <tbody size="small">
                  {viewProcedures?.map((val, index) => {
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
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </CssVarsProvider>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(ModalProcedure)
