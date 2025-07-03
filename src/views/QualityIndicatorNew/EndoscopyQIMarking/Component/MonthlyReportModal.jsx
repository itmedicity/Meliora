import { Box, CssVarsProvider, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { Fragment, memo } from 'react'

const MonthlyReportModal = ({ open, handleClose, tableData, headerNames }) => {
  const { header1, header2 } = headerNames
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
              // width: '65vw',
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
                <Typography sx={{ fontWeight: 550, fontSize: 17 }}>QI Details</Typography>
              </Box>
            </Box>
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
                          width: 80,
                          borderRight: '1px solid white',
                          textAlign: 'center',
                          backgroundColor: '#cfd8dc',
                          fontSize: 15,
                        }}
                      >
                        Type
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
                        Date
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 100,
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
                          width: 160,
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
                          width: 70,
                          borderRight: '1px solid white',
                          textAlign: 'center',
                          backgroundColor: '#cfd8dc',
                          fontSize: 15,
                        }}
                      >
                        Gender
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 100,
                          borderRight: '1px solid white',
                          textAlign: 'center',
                          backgroundColor: '#cfd8dc',
                          fontSize: 15,
                        }}
                      >
                        Age
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 210,
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
                          width: 300,
                          borderRight: '1px solid white',
                          textAlign: 'center',
                          backgroundColor: '#cfd8dc',
                          fontSize: 15,
                        }}
                      >
                        {header1}{' '}
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 300,
                          borderRight: '1px solid white',
                          textAlign: 'center',
                          backgroundColor: '#cfd8dc',
                          fontSize: 15,
                        }}
                      >
                        {header2}{' '}
                      </th>
                      <th
                        size="sm"
                        style={{
                          width: 130,
                          textAlign: 'center',
                          backgroundColor: '#cfd8dc',
                          fontSize: 15,
                        }}
                      >
                        Incident Type
                      </th>
                    </tr>
                  </thead>
                  <tbody size="small" style={{ maxHeight: 0.5 }}>
                    {tableData?.map((val, index) => {
                      return (
                        <tr key={index} size="small" style={{ maxHeight: 2, cursor: 'pointer' }}>
                          <td size="sm" style={{ fontSize: 13, textAlign: 'center' }}>
                            {index + 1}
                          </td>
                          <td size="sm" style={{ fontSize: 13, textAlign: 'center' }}>
                            {val.type}
                          </td>
                          <td size="sm" style={{ fontSize: 13 }}>
                            &nbsp;{format(new Date(val.incident_date), 'dd-MM-yyyy hh:mm a')}
                          </td>
                          <td size="sm" style={{ fontSize: 13 }}>
                            &nbsp;{val.ptno}
                          </td>
                          <td size="sm" style={{ fontSize: 13 }}>
                            &nbsp;{val.ptname}
                          </td>
                          <td size="sm" style={{ fontSize: 13, textAlign: 'center' }}>
                            {val.ptsex}
                          </td>
                          <td size="sm" style={{ fontSize: 13 }}>
                            &nbsp;{val.ptage}
                          </td>
                          <td size="sm" style={{ fontSize: 13 }}>
                            &nbsp;{'Dr. ' + val.doctor_name}
                          </td>
                          <td size="sm" style={{ fontSize: 13 }}>
                            &nbsp;{val.details}
                          </td>
                          <td size="sm" style={{ fontSize: 13 }}>
                            &nbsp;{val.reason}
                          </td>
                          <td size="sm" style={{ fontSize: 13 }}>
                            &nbsp;
                            {val.inctype === 1
                              ? 'GENERAL'
                              : val.inctype === 2
                              ? 'NEAR MISSESS'
                              : val.inctype === 3
                              ? 'HARMFUL'
                              : val.inctype === 4
                              ? 'SENTINEL'
                              : 'Nil'}
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
            <Box sx={{ height: 20 }}></Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(MonthlyReportModal)
