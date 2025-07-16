import { Box, Button, CssVarsProvider, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import { format } from 'date-fns'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import { Virtuoso } from 'react-virtuoso'
import { Paper } from '@mui/material'
import ReqItemDisplay from '../../ComonComponent/ReqItemDisplay'
import ApprovedItemListDis from '../../ComonComponent/ApprovedItemListDis'
import { getStoreReceivedItemDetails, getUserAckDetails } from 'src/api/CommonApiCRF'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CustomToolTipForCRF from '../../ComonComponent/Components/CustomToolTipForCRF'
import StoreReceivedItemList from './StoreReceivedItemList'

const UserAckModal = ({ req_slno, handleClose, open, approveTableData, reqItems, company }) => {
  const queryClient = useQueryClient()
  const id = useSelector(state => state.LoginUserData.empid)

  const [acknowledgement, setAcknowledgement] = useState(true)
  const [Ackremark, setAckRemark] = useState('')
  const [expandedRow, setExpandedRow] = useState(null)
  const [expandedRowData, setExpandedRowData] = useState([])
  const [userAckReply, setUserAckReply] = useState('')

  const { company_name } = company
  const updateAckRemark = useCallback(e => {
    setAckRemark(e.target.value)
  }, [])
  const onchangeUserAckReply = useCallback(e => {
    setUserAckReply(e.target.value)
  }, [])
  const updateAcknowldge = useCallback(e => {
    if (e.target.checked === true) {
      setAcknowledgement(true)
    } else {
      setAcknowledgement(true)
    }
  }, [])

  const {
    data: userAck,
    isLoading: isUserAckLoading,
    error: userAckError
  } = useQuery({
    queryKey: ['getUserAckDetails', req_slno],
    queryFn: () => getUserAckDetails(req_slno),
    enabled: req_slno !== null,
    staleTime: Infinity
  })
  const ackdata = useMemo(() => userAck, [userAck])

  const {
    data: storeItems,
    isLoading: isStoreLoading,
    error: storeError
  } = useQuery({
    queryKey: ['getCrfItemDetails', req_slno],
    queryFn: () => getStoreReceivedItemDetails(req_slno),
    enabled: req_slno !== null,
    staleTime: Infinity
  })
  const storeReceived = useMemo(() => storeItems, [storeItems])

  const ResetDetails = useCallback(() => {
    setAckRemark('')
    setExpandedRow(null)
  }, [])

  const cancelData = useCallback(() => {
    handleClose()
  }, [handleClose])
  const userAckPatch = useMemo(() => {
    return {
      user_acknldge: acknowledgement === true ? 1 : null,
      user_acknldge_remarks: Ackremark,
      user_ack_user: id,
      user_ack_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      req_slno: req_slno,
      po_itm_slno: storeReceived?.map(val => {
        return {
          po_itm_slno: val.po_itm_slno
        }
      })
    }
  }, [acknowledgement, Ackremark, id, req_slno, storeReceived])

  const saveUserAck = useCallback(() => {
    if (acknowledgement === true) {
      const checkReturnItems = async req_slno => {
        try {
          const result = await axioslogin.get(`/newCRFRegister/check/${req_slno}`)
          const { success, message } = result.data
          if (success === 1) {
            infoNotify('All the requested items have not been received yet; Some items are returned')
          } else if (success === 2) {
            const getReceiveStatus = async req_slno => {
              try {
                const result = await axioslogin.get(`/CRFRegisterApproval/receiveStatus/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                  const storeReceiveIncomplete = data.some(
                    item => item.store_receive === 0 && item.sub_store_recieve === 1
                  )
                  if (storeReceiveIncomplete) {
                    infoNotify('All the requested items have not been received yet; you can use this afterwards')
                  } else {
                    if (Ackremark === '') {
                      infoNotify('Enter Remarks')
                      return
                    } else {
                      const updateuserAckPatch = async userAckPatch => {
                        try {
                          const result = await axioslogin.patch('/CRFRegisterApproval/userAck', userAckPatch)
                          const { success, message } = result.data
                          if (success === 1) {
                            succesNotify(message)
                            queryClient.invalidateQueries('getUserAckDetails')
                            queryClient.invalidateQueries('crfDetailsView')
                            setAcknowledgement(false)
                            setAckRemark('')
                            handleClose()
                          } else {
                            warningNotify(message)
                          }
                        } catch (error) {
                          warningNotify('Failed to update acknowledgment')
                        }
                      }
                      updateuserAckPatch(userAckPatch)
                    }
                  }
                } else {
                  //for useracknowledgement in internally arranged
                  const updateuserAckInternal = async userAckPatch => {
                    try {
                      const result = await axioslogin.patch('/CRFRegisterApproval/userAckInternally', userAckPatch)
                      const { success, message } = result.data
                      if (success === 1) {
                        succesNotify(message)
                        queryClient.invalidateQueries('getUserAckDetails')
                        queryClient.invalidateQueries('crfDetailsView')
                        setAcknowledgement(false)
                        setAckRemark('')
                        handleClose()
                      } else {
                        warningNotify(message)
                      }
                    } catch (error) {
                      warningNotify('Failed to update acknowledgment')
                    }
                  }
                  updateuserAckInternal(userAckPatch)
                }
              } catch (error) {
                warningNotify('Failed to fetch receive status')
              }
            }
            getReceiveStatus(req_slno)
          } else {
            warningNotify(message)
          }
        } catch (error) {
          warningNotify('Failed to fetch return status')
        }
      }
      checkReturnItems(req_slno)
    } else {
      infoNotify('Check the Acknowledgement Status')
    }
  }, [userAckPatch, acknowledgement, handleClose, req_slno, Ackremark, queryClient])

  const acknowAction = useCallback(
    (val, index) => {
      setExpandedRowData(val)
      setExpandedRow(expandedRow === index ? null : index)
      setUserAckReply('')
    },
    [expandedRow]
  )

  const UpdateUserAcknowlegeReply = useCallback(() => {
    if (userAckReply === '') {
      infoNotify('Enter Remarks')
    } else {
      const { collect_slno } = expandedRowData

      const patchdata = {
        received_user_remarks: userAckReply,
        received_user: id,
        received_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        collect_slno: collect_slno
      }
      const updateUserAck = async patchdata => {
        const result = await axioslogin.patch('/newCRFStore/userReply', patchdata)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify(message)
          queryClient.invalidateQueries('getUserAckDetails')
          queryClient.invalidateQueries('crfDetailsView')
          ResetDetails()
        } else {
          warningNotify(message)
        }
      }
      updateUserAck(patchdata)
    }
  }, [expandedRowData, id, userAckReply, ResetDetails, queryClient])

  const capitalizeWords = str =>
    str
      ? str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      : ''

  if (isUserAckLoading || isStoreLoading) return <p>Loading...</p>
  if (userAckError || storeError) return <p>Error occurred.</p>

  const buttonStyle = {
    fontSize: 15,
    color: '#455a64',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#455a64',
      transform: 'scale(1.1)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  }
  return (
    <Box>
      {/* <CssVarsProvider> */}
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
              m: 1,
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
              minWidth: '75vw',
              minHeight: '45vh',
              maxHeight: '85vh',
              overflowY: 'auto',
              px: 0.5
            }}
          >
            <Box sx={{ flex: 0.5, mx: 0.5 }}>
              <Typography
                sx={{
                  fontWeight: 550,
                  fontSize: 17,
                  color: '#145DA0',
                  fontFamily: 'system-ui',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                User Acknowledgement
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 550, fontSize: 14, fontFamily: 'system-ui', pl: 1 }}>
                CRF/{company_name}/{req_slno}
              </Typography>
              {reqItems.length !== 0 ? <ReqItemDisplay reqItems={reqItems} /> : null}
              {approveTableData.length !== 0 ? (
                <Box sx={{ mt: 0.3 }}>
                  <ApprovedItemListDis approveTableData={approveTableData} />
                </Box>
              ) : null}
              {storeReceived.length > 0 ? (
                <StoreReceivedItemList storeReceived={storeReceived} empId={id} req_slno={req_slno} />
              ) : null}
            </Box>
            {ackdata.length !== 0 ? (
              <Box sx={{ overflow: 'auto', flexWrap: 'wrap', px: 0.5 }}>
                <Typography sx={{ fontWeight: 'bold', mx: 1, py: 0.7, color: '#145DA0', fontSize: 15 }}>
                  Store Acknowledgement Details
                </Typography>

                <Paper variant="outlined" square sx={{ width: '100%' }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                      backgroundColor: '#e3f2fd',
                      flexWrap: 'nowrap',
                      py: 0.5,
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                      height: 30,
                      borderBottom: '1px solid lightgrey',
                      borderTop: '1px solid lightgrey'
                    }}
                  >
                    <Typography
                      sx={{
                        minWidth: 120,
                        textAlign: 'left',
                        fontWeight: 550,
                        fontSize: 12,
                        pl: 3
                      }}
                    >
                      CRF No.
                    </Typography>
                    <Typography
                      sx={{
                        minWidth: 150,
                        textAlign: 'left',
                        fontWeight: 550,
                        fontSize: 12,
                        pl: 1
                      }}
                    >
                      Date
                    </Typography>
                    <Typography sx={{ minWidth: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                      Store
                    </Typography>
                    <Typography sx={{ minWidth: 250, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                      Store Remarks
                    </Typography>
                    <Typography sx={{ minWidth: 110, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                      User
                    </Typography>
                    <Typography sx={{ minWidth: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                      Date
                    </Typography>
                    <Typography sx={{ minWidth: 110, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                      Received User
                    </Typography>
                    <Typography sx={{ minWidth: 250, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>
                      Remarks
                    </Typography>
                    <Typography sx={{ minWidth: 70, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>
                      Action
                    </Typography>
                  </Box>
                  <Virtuoso
                    style={{ height: 200, width: '100%' }}
                    data={ackdata}
                    itemContent={(index, val) => (
                      <React.Fragment key={val.collect_slno}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}
                        >
                          <Typography sx={{ minWidth: 120, textAlign: 'left', fontSize: 12, my: 1, pl: 1 }}>
                            {'CRF/TMC/' + val.req_slno}
                          </Typography>
                          <Typography sx={{ minWidth: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                            {format(new Date(val.substore_ack_date), 'dd-MM-yyyy hh:mm:ss a')}
                          </Typography>
                          <Typography sx={{ minWidth: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                            {val.sub_store_name}
                          </Typography>
                          <Typography sx={{ minWidth: 250, textAlign: 'left', fontSize: 12, my: 1 }}>
                            {val.substore_remarks}
                          </Typography>
                          <Typography sx={{ minWidth: 110, textAlign: 'left', fontSize: 12, my: 1 }}>
                            {capitalizeWords(val.store_user)}
                          </Typography>
                          <Typography sx={{ minWidth: 150, textAlign: 'left', fontSize: 12, my: 1 }}>
                            {val.received_status === 0
                              ? 'Not Updated'
                              : format(new Date(val.received_date), 'dd-MM-yyyy hh:mm:ss a')}
                          </Typography>
                          <Typography sx={{ minWidth: 110, textAlign: 'left', fontSize: 12, my: 1 }}>
                            {val.received_status === 0 ? 'Not Received' : capitalizeWords(val.receive_user)}
                          </Typography>
                          <Typography sx={{ minWidth: 250, textAlign: 'left', fontSize: 12, my: 1 }}>
                            {val.received_status === 0 ? 'Not Updated' : val.received_user_remarks}
                          </Typography>
                          <Box sx={{ minWidth: 70, textAlign: 'center', pt: 0.5, cursor: 'pointer' }}>
                            {val.received_status === 1 ? (
                              <CheckCircleTwoToneIcon
                                sx={{
                                  fontSize: 'lg',
                                  color: 'grey',
                                  height: 25,
                                  width: 30,
                                  borderRadius: 2,
                                  boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)'
                                }}
                              />
                            ) : (
                              <CustomToolTipForCRF title="Reply" placement="top">
                                <CheckCircleTwoToneIcon
                                  sx={{
                                    fontSize: 'lg',
                                    color: '#01579b',
                                    height: 25,
                                    width: 30,
                                    borderRadius: 2,
                                    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                      transform: 'scale(1.1)'
                                    }
                                  }}
                                  onClick={() => acknowAction(val, index)}
                                />
                              </CustomToolTipForCRF>
                            )}
                          </Box>
                        </Box>
                        {expandedRow === index && (
                          <Box sx={{ mx: 2, pt: 0.5, boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.16)' }}>
                            <Box display="flex" justifyContent="space-between" padding={0.5}>
                              <Box sx={{ flex: 1.5, py: 0.4, pl: 3 }}>
                                <CssVarsProvider>
                                  <Textarea
                                    required
                                    placeholder="User Acknowledgement Remarks"
                                    type="text"
                                    size="md"
                                    minRows={1}
                                    maxRows={2}
                                    value={userAckReply}
                                    onChange={onchangeUserAckReply}
                                  />
                                </CssVarsProvider>
                              </Box>
                              <Box sx={{ display: 'flex', flex: 0.5 }}>
                                <Box sx={{ pt: 0.4, pl: 2 }}>
                                  <Button variant="plain" sx={buttonStyle} onClick={UpdateUserAcknowlegeReply}>
                                    Save
                                  </Button>
                                </Box>
                                <Box sx={{ pr: 0.5, pt: 0.4 }}>
                                  <Button variant="plain" sx={buttonStyle} onClick={ResetDetails}>
                                    Cancel
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </React.Fragment>
                    )}
                  />
                </Paper>
              </Box>
            ) : null}
            <Box display="flex" justifyContent="space-between" padding={0.5}>
              <Box sx={{ m: 1, flex: 0.3, display: 'flex', pl: 2 }}>
                <CusCheckBox
                  color="primary"
                  size="md"
                  name="acknowledgement"
                  value={acknowledgement}
                  checked={acknowledgement}
                  onCheked={updateAcknowldge}
                />
                <Typography sx={{ fontSize: 13, fontWeight: 600, pl: 1 }}>All Item Received</Typography>
              </Box>
              <Box sx={{ flex: 2, py: 0.4 }}>
                <CssVarsProvider>
                  <Textarea
                    required
                    placeholder="Remarks"
                    type="text"
                    size="md"
                    minRows={1}
                    maxRows={2}
                    value={Ackremark}
                    onChange={updateAckRemark}
                  />
                </CssVarsProvider>
              </Box>
              <Box sx={{ display: 'flex', flex: 0.5 }}>
                <Box sx={{ pt: 0.4, pl: 2 }}>
                  <Button variant="plain" sx={buttonStyle} onClick={saveUserAck}>
                    Save
                  </Button>
                </Box>
                <Box sx={{ pr: 0.5, pt: 0.4 }}>
                  <Button variant="plain" sx={buttonStyle} onClick={cancelData}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
      {/* </CssVarsProvider> */}
    </Box>
  )
}

export default memo(UserAckModal)
