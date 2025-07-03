import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { Fragment, memo } from 'react'

const TableOpPatientsDetails = ({ open, handleClose, patList, initdate }) => {
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
              maxWidth: '90%',
              maxHeight: '80%',
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
                height: 35,
                width: 35,
              }}
            />
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ pt: 0.5, pl: 2, flex: 1 }}>
                <Typography sx={{ fontWeight: 550, fontSize: 18 }}>
                  Initial Assessment Time Exceedence List
                </Typography>
              </Box>
              <Box sx={{ pt: 0.5, pr: 3, display: 'flex', justifyContent: 'flex-end', flex: 0.5 }}>
                <Typography sx={{ fontWeight: 550, fontSize: 17 }}>{initdate}</Typography>
              </Box>
            </Box>
            <Box>
              <Box
                variant="outlined"
                sx={{ overflow: 'auto', padding: 'none', '&::-webkit-scrollbar': { height: 7 } }}
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
                          style={{
                            width: 60,
                            borderRight: '1px solid white',
                            textAlign: 'center',
                            backgroundColor: '#cfd8dc',
                            fontSize: 15,
                          }}
                        >
                          Sl.No
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 120,
                            borderRight: '1px solid white',
                            textAlign: 'center',
                            backgroundColor: '#cfd8dc',
                            fontSize: 15,
                          }}
                        >
                          Patient ID
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 200,
                            borderRight: '1px solid white',
                            textAlign: 'center',
                            backgroundColor: '#cfd8dc',
                            fontSize: 15,
                          }}
                        >
                          Patient Name
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 250,
                            borderRight: '1px solid white',
                            textAlign: 'center',
                            backgroundColor: '#cfd8dc',
                            fontSize: 15,
                          }}
                        >
                          Doctor
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 200,
                            borderRight: '1px solid white',
                            textAlign: 'center',
                            backgroundColor: '#cfd8dc',
                            fontSize: 15,
                          }}
                        >
                          Arrived Time
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 200,
                            borderRight: '1px solid white',
                            textAlign: 'center',
                            backgroundColor: '#cfd8dc',
                            fontSize: 15,
                          }}
                        >
                          Assessment Start
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 200,
                            borderRight: '1px solid white',
                            textAlign: 'center',
                            backgroundColor: '#cfd8dc',
                            fontSize: 15,
                          }}
                        >
                          Assessment End
                        </th>
                        <th
                          size="sm"
                          style={{
                            width: 150,
                            borderRight: '1px solid white',
                            textAlign: 'center',
                            backgroundColor: '#cfd8dc',
                            fontSize: 15,
                          }}
                        >
                          Total Time Taken{' '}
                        </th>
                      </tr>
                    </thead>
                    <tbody size="small" style={{ maxHeight: 0.5 }}>
                      {patList?.map((val, index) => {
                        return (
                          <tr key={index} size="small" style={{ maxHeight: 2, cursor: 'pointer' }}>
                            <td size="sm" style={{ fontSize: 13, textAlign: 'center' }}>
                              {index + 1}
                            </td>
                            <td size="sm" style={{ fontSize: 13 }}>
                              &nbsp;{val.ptno}
                            </td>
                            <td size="sm" style={{ fontSize: 13 }}>
                              &nbsp;{val.ptname}
                            </td>
                            <td size="sm" style={{ fontSize: 13 }}>
                              &nbsp;{'Dr. ' + val.doctor_name}
                            </td>
                            <td size="sm" style={{ fontSize: 13 }}>
                              &nbsp;
                              {format(new Date(val.patient_arrived_date), 'dd-MM-yyyy hh:mm a')}
                            </td>
                            <td size="sm" style={{ fontSize: 13 }}>
                              &nbsp;{format(new Date(val.assessment_start), 'dd-MM-yyyy hh:mm a')}
                            </td>
                            <td size="sm" style={{ fontSize: 13 }}>
                              &nbsp;{format(new Date(val.assessment_end), 'dd-MM-yyyy hh:mm a')}
                            </td>
                            {val.sumof_service_time > 10 ? (
                              <td
                                size="sm"
                                style={{ textAlign: 'center', fontSize: 13, color: 'red' }}
                              >
                                {val.sumof_service_time}&nbsp;min
                              </td>
                            ) : (
                              <td size="sm" style={{ textAlign: 'center', fontSize: 13 }}>
                                {val.sumof_service_time}&nbsp;min
                              </td>
                            )}
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
                        <th style={{ backgroundColor: 'white', height: 20 }}></th>
                        <th style={{ backgroundColor: 'white', height: 20 }}></th>
                        <th style={{ backgroundColor: 'white', height: 20 }}></th>
                        <th style={{ backgroundColor: 'white', height: 20 }}></th>
                      </tr>
                    </tfoot>
                  </Table>
                </CssVarsProvider>
              </Box>
              <Box sx={{ pt: 1, display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
                <Typography sx={{ color: 'darkred', fontSize: 11 }}>
                  * Initial Assessment BenchMark Time is 10 min
                </Typography>
              </Box>
              <Box sx={{ height: 20 }}></Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(TableOpPatientsDetails)
