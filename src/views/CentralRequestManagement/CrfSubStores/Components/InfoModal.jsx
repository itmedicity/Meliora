import {
  Box,
  Button,
  CssVarsProvider,
  Modal,
  ModalClose,
  ModalDialog,
  Table,
  Textarea,
  Tooltip,
  Typography
} from '@mui/joy'
import { format } from 'date-fns'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useQueryClient } from '@tanstack/react-query'

const InfoModal = ({ handleClose, open, selectedRadio, storeName, infoData }) => {
  const queryClient = useQueryClient()
  const { req_slno, po_detail_slno } = infoData
  const [remarks, setRemarks] = useState('')
  const [userInfo, setUserInfo] = useState([])
  const [exist, setExist] = useState(0)
  const [collectSlno, setCollectSlno] = useState(0)
  const [edit, setEdit] = useState(0)

  const id = useSelector(state => state.LoginUserData.empid)

  const buttonStyle = {
    fontSize: 15,
    color: '#607d8b',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#607d8b',
      transform: 'scale(1.1)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  }
  useEffect(() => {
    if (infoData.length !== 0) {
      const postdata = {
        req_slno: req_slno,
        substore_slno: selectedRadio
      }
      const getUserInfo = async postdata => {
        const result = await axioslogin.post('/newCRFStore/getAckSave', postdata)
        return result.data
      }
      getUserInfo(postdata).then(val => {
        const { success, data } = val
        if (success === 1) {
          setUserInfo(data)
          setExist(1)
        } else {
          setUserInfo([])
          setExist(0)
        }
      })
    }
  }, [infoData, req_slno, selectedRadio])

  const EditData = useCallback(val => {
    const { collect_slno, substore_remarks } = val
    setCollectSlno(collect_slno)
    setRemarks(substore_remarks)
    setEdit(1)
  }, [])
  const ResetDetails = useCallback(() => {
    setUserInfo([])
    setExist(0)
    setRemarks('')
    handleClose()
  }, [handleClose])
  const postdata = useMemo(() => {
    return {
      req_slno: req_slno,
      po_detail_slno: po_detail_slno,
      substore_slno: selectedRadio,
      substore_remarks: remarks,
      substore_user: id,
      substore_ack_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      create_user: id
    }
  }, [id, selectedRadio, remarks, req_slno, po_detail_slno])

  const patchdata = useMemo(() => {
    return {
      substore_slno: selectedRadio,
      substore_remarks: remarks,
      edit_user: id,
      collect_slno: collectSlno
    }
  }, [id, selectedRadio, remarks, collectSlno])
  const SaveRemarks = useCallback(() => {
    if (remarks === '') {
      infoNotify('Enter Remarks')
    } else {
      const insertUserAck = async postdata => {
        const result = await axioslogin.post('/newCRFStore/insert', postdata)
        const { success, message } = result.data
        if (success === 1) {
          const patchData = {
            po_detail_slno: po_detail_slno,
            req_slno: req_slno
          }
          const updateStoreReceive = async patchData => {
            const result = await axioslogin.patch('/newCRFStore/updateReceive', patchData)
            return result.data
          }
          updateStoreReceive(patchData).then(val => {
            const { success, message } = val
            if (success === 1) {
              succesNotify(message)
              queryClient.invalidateQueries('sustoreCRFView')
              queryClient.invalidateQueries('returnDetailsView')
              ResetDetails()
              handleClose()
            } else {
              warningNotify(message)
              queryClient.invalidateQueries('sustoreCRFView')
              queryClient.invalidateQueries('returnDetailsView')
            }
          })
        } else {
          warningNotify(message)
        }
      }
      const updateUserAck = async patchdata => {
        const result = await axioslogin.patch('/newCRFStore/update', patchdata)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify(message)
          queryClient.invalidateQueries('sustoreCRFView')
          queryClient.invalidateQueries('returnDetailsView')
          ResetDetails()
          handleClose()
        } else {
          warningNotify(message)
          queryClient.invalidateQueries('sustoreCRFView')
          queryClient.invalidateQueries('returnDetailsView')
        }
      }
      if (edit === 1) {
        updateUserAck(patchdata)
      } else {
        insertUserAck(postdata)
      }
    }
  }, [postdata, handleClose, remarks, edit, patchdata, po_detail_slno, req_slno, ResetDetails, queryClient])
  const capitalizeWords = str =>
    str
      ? str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      : ''
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
          <ModalDialog
            variant="outlined"
            sx={{
              minWidth: '50vw',
              minHeight: 150,
              overflow: 'auto'
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
                height: 25,
                width: 25
              }}
            />
            <Box sx={{ flexWrap: 'wrap' }}>
              <Box sx={{}}>
                <Typography sx={{ fontWeight: 550, fontSize: 15, fontFamily: 'system-ui' }}>
                  User Acknowledgement
                </Typography>
              </Box>
              {exist === 1 ? (
                <Box sx={{ flexWrap: 'wrap', '&::-webkit-scrollbar': { height: 8 }, overflow: 'auto' }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      color: '#145DA0',
                      fontSize: 14,
                      marginBottom: 0.5,
                      pl: 0.5
                    }}
                  >
                    Previous User Acknowledgement Details
                  </Typography>
                  <Table
                    aria-label="table with sticky header"
                    borderAxis="both"
                    padding={'none'}
                    stickyHeader
                    size="sm"
                  >
                    <thead>
                      <tr>
                        <th size="sm" style={{ borderRadius: 0, width: 40, backgroundColor: '#e3f2fd' }}></th>
                        <th size="sm" style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
                          CRF No.
                        </th>
                        <th size="sm" style={{ width: 150, backgroundColor: '#e3f2fd' }}>
                          Date
                        </th>
                        <th size="sm" style={{ width: 200, backgroundColor: '#e3f2fd' }}>
                          Store
                        </th>
                        <th size="sm" style={{ width: 250, backgroundColor: '#e3f2fd' }}>
                          Store Remarks
                        </th>
                        <th size="sm" style={{ width: 110, backgroundColor: '#e3f2fd' }}>
                          User
                        </th>
                        <th size="sm" style={{ width: 150, backgroundColor: '#e3f2fd' }}>
                          Date
                        </th>
                        <th size="sm" style={{ width: 110, backgroundColor: '#e3f2fd' }}>
                          Received User
                        </th>
                        <th size="sm" style={{ borderRadius: 0, width: 250, backgroundColor: '#e3f2fd' }}>
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userInfo.map(val => (
                        <tr key={val.collect_slno}>
                          <td>
                            {val.received_status === 1 ? (
                              <EditOutlinedIcon
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
                              <Tooltip title="Edit" placement="left">
                                <EditOutlinedIcon
                                  sx={{
                                    fontSize: 'lg',
                                    color: '#3e2723',
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
                                  onClick={() => EditData(val)}
                                />
                              </Tooltip>
                            )}
                          </td>
                          <td style={{ fontSize: 12 }}>CRF/TMC/{val.req_slno}</td>
                          <td style={{ fontSize: 12 }}>
                            {format(new Date(val.substore_ack_date), 'dd-MM-yyyy hh:mm:ss a')}
                          </td>
                          <td style={{ fontSize: 12 }}>{val.sub_store_name}</td>
                          <td style={{ fontSize: 12 }}>{val.substore_remarks}</td>
                          <td style={{ fontSize: 12 }}>{capitalizeWords(val.store_user)}</td>
                          <td style={{ fontSize: 12 }}>
                            {val.received_status === 0
                              ? 'Not Updated'
                              : format(new Date(val.received_date), 'dd-MM-yyyy hh:mm:ss a')}
                          </td>
                          <td style={{ fontSize: 12 }}>
                            {val.received_status === 0 ? 'Not Received' : capitalizeWords(val.receive_user)}
                          </td>
                          <td style={{ fontSize: 12 }}>
                            {val.received_status === 0 ? 'Not Updated' : val.received_user_remarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              ) : null}

              <Box sx={{}}>
                <Typography sx={{ fontSize: 13, fontWeight: 650 }}>Store</Typography>
                <Box sx={{ pt: 0.5, fontSize: 15 }}>{storeName}</Box>
              </Box>
              <Box sx={{}}>
                <Typography sx={{ fontSize: 13, fontWeight: 650 }}>Remarks</Typography>
                <Box sx={{ pt: 0.5 }}>
                  <CssVarsProvider>
                    <Textarea
                      minRows={2}
                      maxRows={2}
                      placeholder="type here ..."
                      type="text"
                      size="sm"
                      name={remarks}
                      value={remarks}
                      onChange={e => setRemarks(e.target.value)}
                    />
                  </CssVarsProvider>
                </Box>
              </Box>
              {/* {substore_user !== null ?
                            <Box sx={{ display: 'flex' }}>
                                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Last Informed User :&nbsp;</Typography>
                                <Typography sx={{ fontSize: 11, fontWeight: 600, textTransform: 'capitalize', pt: 0.3 }}>&nbsp;&nbsp;{substore_user}</Typography>
                            </Box>
                            : null
                        } */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ pt: 0.4 }}>
                  <Button variant="plain" sx={buttonStyle} onClick={SaveRemarks}>
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
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(InfoModal)
