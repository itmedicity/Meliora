import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo } from 'react'

const DeliveredPoDetails = ({ handleClose, open, poDetails }) => {
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
                PO Details
              </Typography>
            </Box>
            <Paper
              variant="outlined"
              sx={{ overflow: 'auto', maxHeight: window.innerHeight - 220, flexWrap: 'wrap' }}
            >
              {poDetails.length > 0 ? (
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
                        Sl.No
                      </th>
                      <th
                        size="sm"
                        style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        #Order
                      </th>
                      <th
                        size="sm"
                        style={{ width: 150, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        PO Date
                      </th>
                      <th
                        size="sm"
                        style={{ width: 150, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Store
                      </th>
                      <th
                        size="sm"
                        style={{ width: 150, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                      >
                        Expected Delivery
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {poDetails.map((item, ind) => (
                      <tr key={item.marking_po_slno}>
                        <td style={{ textAlign: 'center', fontSize: 13 }}>{ind + 1}</td>
                        <td style={{ fontSize: 13, textAlign: 'center' }}>{item.po_number}</td>
                        <td style={{ textAlign: 'center', fontSize: 13 }}>{item.po_date}</td>
                        <td style={{ textAlign: 'center', fontSize: 13 }}>{item.main_store}</td>
                        <td style={{ textAlign: 'center', fontSize: 13 }}>
                          {item.expected_delivery}
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

export default memo(DeliveredPoDetails)
