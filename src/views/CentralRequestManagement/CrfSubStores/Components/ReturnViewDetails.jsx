import { Box, Button, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const ReturnViewDetails = ({ setReturnModalData, returnModalData, handleClose, open }) => {
  const queryClient = useQueryClient()
  const { req_slno } = returnModalData[0]
  const empid = useSelector(state => state.LoginUserData.empid)
  const [virtuosoHeight, setVirtuosoHeight] = useState(100)
  const [receivedStatus, setReceivedStatus] = useState(null)

  useEffect(() => {
    const xx = returnModalData.some(item => item.received_status_return === 1)
    setReceivedStatus(xx)
  }, [returnModalData])

  const changeRemarks = useCallback(
    (itemSlno, value) => {
      setReturnModalData(prevData =>
        prevData.map(item => (item.item_return_slno === itemSlno ? { ...item, storeRemarks: value } : item))
      )
    },
    [setReturnModalData]
  )
  // store_return_received_remarks, received_user, received_date
  const returnReplyUpdate = useCallback(() => {
    const patchData = returnModalData?.map(val => {
      return {
        store_issue_remarks: val.received_status_return === 1 ? val.storeRemarks : null,
        store_user: val.received_status_return === 1 ? empid : null,
        issued_date: val.received_status_return === 1 ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
        store_return_received_remarks:
          val.received_status_return === 0 ? val.storeRemarks : val.store_return_received_remarks,
        received_user: val.received_status_return === 0 ? empid : val.received_user,
        received_date:
          val.received_status_return === 0
            ? format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            : format(new Date(val.received_date), 'yyyy-MM-dd HH:mm:ss'),
        return_status: val.received_status_return === 0 ? 1 : 0,
        item_return_slno: val.item_return_slno
      }
    })
    const replyUpdate = async patchData => {
      const result = await axioslogin.post('/newCRFRegister/returnReply', patchData)
      return result.data
    }
    replyUpdate(patchData).then(val => {
      const { success, message } = val
      if (success === 1) {
        succesNotify(message)
        queryClient.invalidateQueries('sustoreCRFView')
        queryClient.invalidateQueries('returnDetailsView')
        handleClose()
      } else {
        warningNotify(message)
        queryClient.invalidateQueries('sustoreCRFView')
        queryClient.invalidateQueries('returnDetailsView')
        handleClose()
      }
    })
  }, [empid, returnModalData, handleClose, queryClient])

  useEffect(() => {
    const rowHeight = 50
    const maxHeight = window.innerHeight - 270
    const totalHeight = returnModalData.length * rowHeight
    setVirtuosoHeight(Math.min(totalHeight, maxHeight))
  }, [returnModalData])

  const buttonStyle = {
    m: 1,
    width: 80,
    fontSize: 13,
    height: '30px',
    minHeight: '30px',
    lineHeight: '1.2',
    color: '#0d47a1',
    bgcolor: 'white',
    border: '1px solid #bbdefb',
    '&:hover': {
      color: '#1e88e5',
      bgcolor: 'white'
    },
    borderRadius: 5
  }
  return (
    <Box>
      <CssVarsProvider>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleClose}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ModalDialog variant="outlined">
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
                width: 25
              }}
            />
            <Box
              sx={{
                width: '85vw',
                minHeight: 200,
                overflow: 'auto'
              }}
            >
              <Typography level="body-sm" sx={{ color: '#0074B7', fontWeight: 650, pl: 1 }}>
                CRF/TMC/{req_slno}
              </Typography>
              <Box sx={{ width: '100%', pt: 0.5, overflow: 'auto' }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{
                    bgcolor: '#e3f2fd',
                    flexWrap: 'nowrap',
                    py: 0.5,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    borderBottom: '1px solid lightgrey'
                  }}
                >
                  <Typography
                    sx={{
                      width: 70,
                      textAlign: 'center',
                      fontWeight: 550,
                      fontSize: 13,
                      my: 0.5,
                      pl: 1
                    }}
                  >
                    Sl.No
                  </Typography>
                  <Typography sx={{ width: 250, fontWeight: 550, fontSize: 13, my: 0.5, textAlign: 'left' }}>
                    Item Description
                  </Typography>
                  <Typography sx={{ width: 250, fontWeight: 550, fontSize: 13, my: 0.5, textAlign: 'left' }}>
                    Reason
                  </Typography>
                  <Typography sx={{ width: 170, fontWeight: 550, fontSize: 13, my: 0.5, textAlign: 'left' }}>
                    User
                  </Typography>
                  <Typography sx={{ width: 200, fontWeight: 550, fontSize: 13, my: 0.5, textAlign: 'left' }}>
                    Return Date
                  </Typography>

                  {receivedStatus === true ? (
                    <>
                      <Typography
                        sx={{
                          width: 170,
                          fontWeight: 550,
                          fontSize: 13,
                          my: 0.5,
                          textAlign: 'left'
                        }}
                      >
                        Received User
                      </Typography>
                      <Typography
                        sx={{
                          width: 200,
                          fontWeight: 550,
                          fontSize: 13,
                          my: 0.5,
                          textAlign: 'left'
                        }}
                      >
                        Received Date
                      </Typography>
                      <Typography
                        sx={{
                          width: 250,
                          fontWeight: 550,
                          fontSize: 13,
                          my: 0.5,
                          textAlign: 'lrft'
                        }}
                      >
                        Received Remarks
                      </Typography>
                    </>
                  ) : null}
                  {receivedStatus === true > 0 ? (
                    <Typography
                      sx={{
                        width: 300,
                        fontWeight: 550,
                        fontSize: 13,
                        my: 0.5,
                        textAlign: 'center'
                      }}
                    >
                      Replaced Remarks
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        width: 300,
                        fontWeight: 550,
                        fontSize: 13,
                        my: 0.5,
                        textAlign: 'center'
                      }}
                    >
                      Received Remarks
                    </Typography>
                  )}
                </Box>
                <Virtuoso
                  style={{
                    minHeight: 150,
                    width: '100%',
                    height: virtuosoHeight
                  }}
                  data={returnModalData}
                  itemContent={(index, val) => (
                    <React.Fragment key={val.item_return_slno}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        sx={{
                          borderBottom: '1px solid lightgrey',
                          flexWrap: 'nowrap',
                          cursor: 'pointer'
                        }}
                      >
                        <Typography sx={{ width: 70, textAlign: 'center', fontSize: 12, pt: 1.2 }}>
                          {index + 1}
                        </Typography>
                        <Typography sx={{ width: 250, fontSize: 12, pt: 1.2, textAlign: 'left' }}>
                          {val.item_name}
                        </Typography>
                        <Typography sx={{ width: 250, fontSize: 12, pt: 1.2, textAlign: 'left' }}>
                          {val.return_remarks}
                        </Typography>
                        <Typography sx={{ width: 170, fontSize: 12, pt: 1.2, textAlign: 'left' }}>
                          {val.return_user}{' '}
                        </Typography>
                        <Typography sx={{ width: 200, fontSize: 12, pt: 1.2, textAlign: 'left' }}>
                          {format(new Date(val.return_date), 'dd-MM-yyyy hh:mm a')}{' '}
                        </Typography>
                        {val.received_status_return === 1 ? (
                          <>
                            <Typography sx={{ width: 170, fontSize: 12, pt: 1.2, textAlign: 'left' }}>
                              {val.item_received_user}{' '}
                            </Typography>
                            <Typography sx={{ width: 200, fontSize: 12, pt: 1.2, textAlign: 'left' }}>
                              {format(new Date(val.received_date), 'dd-MM-yyyy hh:mm a')}{' '}
                            </Typography>
                            <Typography sx={{ width: 250, fontSize: 12, pt: 1.2, textAlign: 'left' }}>
                              {val.store_return_received_remarks}
                            </Typography>
                          </>
                        ) : null}
                        <Box
                          sx={{
                            width: 300,
                            fontSize: 12,
                            m: 0.5,
                            display: 'flex'
                          }}
                        >
                          {val.received_status_return === 0 ? (
                            <Textarea
                              placeholder="Enter Received Remarks"
                              autoComplete="off"
                              value={val.storeRemarks}
                              minRows={1}
                              maxRows={3}
                              disabled={!val.return_status === 0}
                              onChange={e => {
                                changeRemarks(val.item_return_slno, e.target.value)
                              }}
                              sx={{
                                border: '1px solid #bbdefb',
                                fontSize: 14,
                                borderRadius: 5,
                                width: '100%'
                              }}
                            />
                          ) : (
                            <Textarea
                              placeholder="Enter Replaced Remarks"
                              autoComplete="off"
                              value={val.storeRemarks}
                              minRows={1}
                              maxRows={3}
                              disabled={!val.return_status === 0}
                              onChange={e => {
                                changeRemarks(val.item_return_slno, e.target.value)
                              }}
                              sx={{
                                border: '1px solid #bbdefb',
                                fontSize: 14,
                                borderRadius: 5,
                                width: '100%'
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </React.Fragment>
                  )}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, pr: 2 }}>
                <Button variant="outlined" sx={buttonStyle} onClick={returnReplyUpdate}>
                  Save
                </Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(ReturnViewDetails)
