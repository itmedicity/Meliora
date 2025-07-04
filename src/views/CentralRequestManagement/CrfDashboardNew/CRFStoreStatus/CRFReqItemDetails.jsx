import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo } from 'react'

const CRFReqItemDetails = ({ handleClose, open, reqItems }) => {
  return (
    <Fragment>
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
              minWidth: '50vw',
              minHeight: 200,
              overflow: 'auto',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                m: 1,
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
                color: '#bf360c',
                height: 35,
                width: 35,
              }}
            />
            <Box sx={{ mx: 0.5 }}>
              <Typography
                sx={{ fontWeight: 550, fontSize: 18, color: '#1565c0', fontFamily: 'system-ui' }}
              >
                Item Details
              </Typography>
            </Box>
            <Paper
              variant="outlined"
              sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220, flexWrap: 'wrap' }}
            >
              {reqItems.length > 0 ? (
                <Table
                  aria-label="table with sticky header"
                  borderAxis="both"
                  padding={'none'}
                  stickyHeader
                  size="sm"
                >
                  <thead style={{ height: 4 }} size="small">
                    <tr style={{ height: 4 }} size="small">
                      <th
                        size="sm"
                        style={{ width: 50, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Item Code
                      </th>
                      <th
                        size="sm"
                        style={{ width: 150, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Item
                      </th>
                      <th
                        size="sm"
                        style={{ width: 40, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Qty
                      </th>
                      <th
                        size="sm"
                        style={{ width: 50, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Received Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reqItems.map((item,) => (
                      <tr key={item.po_itm_slno}>
                        <td style={{ textAlign: 'center' }}>{item.item_code}</td>
                        <td style={{ fontSize: 12 }}>{item.item_name}</td>
                        <td style={{ textAlign: 'center', fontSize: 13, fontWeight: 650 }}>
                          {item.item_qty}
                        </td>
                        <td
                          style={{
                            textAlign: 'center',
                            color: item.received_qnty === item.item_qty ? '#59981A' : '#e65100',
                            fontWeight: 650,
                          }}
                        >
                          {item.received_qnty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : null}
            </Paper>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(CRFReqItemDetails)
