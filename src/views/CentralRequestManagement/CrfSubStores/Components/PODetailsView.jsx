import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo } from 'react'

const PODetailsView = ({ open, handleClose, poItems, poDetails }) => {
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
              minHeight: 400,
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
              {poDetails?.map(poDetail => {
                const disData = poItems?.filter(
                  item => item.po_detail_slno === poDetail.po_detail_slno
                )

                return (
                  <Box
                    key={poDetail.po_detail_slno}
                    sx={{
                      p: 0.5,
                      // marginBottom: 4,
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', marginBottom: 1, color: '#1976d2', pl: 1 }}
                    >
                      #Order : {poDetail.po_number}
                    </Typography>
                    <Box sx={{ display: 'flex', pl: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ marginBottom: 0.2, fontSize: 13, fontWeight: 650 }}
                      >
                        PO Date :
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 0.2, fontSize: 14, pl: 1 }}>
                        {format(new Date(poDetail.po_date), 'dd-MM-yyyy hh:mm:ss a')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', pl: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ marginBottom: 0.2, fontSize: 13, fontWeight: 650 }}
                      >
                        Supplier :
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 0.2, fontSize: 14, pl: 1 }}>
                        {poDetail.supplier_name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', pl: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ marginBottom: 1, fontSize: 13, fontWeight: 650 }}
                      >
                        Expected Delivery :
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 1, fontSize: 14, pl: 1 }}>
                        {format(new Date(poDetail.expected_delivery), 'dd-MM-yyyy')}
                      </Typography>
                    </Box>
                    {disData.length > 0 ? (
                      <Table
                        aria-label="table with sticky header"
                        borderAxis="both"
                        stickyHeader
                        size="sm"
                      >
                        <thead>
                          <tr>
                            <th
                              size="sm"
                              style={{
                                borderRadius: 0,
                                width: 50,
                                textAlign: 'center',
                                backgroundColor: '#e3f2fd',
                              }}
                            >
                              Item Code
                            </th>
                            <th
                              size="sm"
                              style={{
                                width: 150,
                                textAlign: 'center',
                                backgroundColor: '#e3f2fd',
                              }}
                            >
                              Item
                            </th>
                            <th
                              size="sm"
                              style={{ width: 40, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                            >
                              Qnty
                            </th>
                            <th
                              size="sm"
                              style={{ width: 50, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                            >
                              Received Qnty
                            </th>
                            <th
                              size="sm"
                              style={{ width: 50, textAlign: 'center', backgroundColor: '#e3f2fd' }}
                            >
                              GRN Qnty
                            </th>
                            <th
                              size="sm"
                              style={{
                                width: 50,
                                textAlign: 'center',
                                backgroundColor: '#e3f2fd',
                                borderRadius: 0,
                              }}
                            >
                              Receive Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {disData.map(item => (
                            <tr key={item.po_itm_slno}>
                              <td style={{ textAlign: 'center' }}>{item.item_code}</td>
                              <td style={{ fontSize: 12 }}>{item.item_name}</td>
                              <td style={{ textAlign: 'center', fontSize: 13, fontWeight: 650 }}>
                                {item.item_qty}
                              </td>
                              <td
                                style={{
                                  textAlign: 'center',
                                  color:
                                    item.received_qnty === item.item_qty ? '#59981A' : '#e65100',
                                  fontWeight: 650,
                                }}
                              >
                                {item.received_qnty}
                              </td>
                              <td style={{ textAlign: 'center' }}>{item.grn_qnty}</td>
                              <td
                                style={{
                                  textAlign: 'center',
                                  color:
                                    item.item_receive_status === 1
                                      ? '#59981A'
                                      : item.item_receive_status === 0
                                      ? '#e65100'
                                      : 'transparent',
                                }}
                              >
                                {item.item_receive_status === 1
                                  ? 'Received'
                                  : item.item_receive_status === 0
                                  ? 'Partially'
                                  : 'Pending'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          fontSize: 25,
                          opacity: 0.5,
                          pt: 10,
                          color: 'grey',
                        }}
                      >
                        No items found for this purchase order.
                      </Box>
                    )}
                  </Box>
                )
              })}
            </Paper>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(PODetailsView)
