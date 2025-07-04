import {
  Box,
  CssVarsProvider,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Textarea,
  Tooltip,
  Typography
} from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay'
import CrfReqDetailViewCmp from '../ComonComponent/CrfReqDetailViewCmp'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import ItemsApprovalCompnt from '../CrfInchargeApproval/ItemsApprovalCompnt'
import CustomIconButtonCmp from '../ComonComponent/Components/CustomIconButtonCmp'
import AddMoreItemDtails from '../ComonComponent/AddMoreItemDtails'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { axioskmc, axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import imageCompression from 'browser-image-compression'
import { useQueryClient } from 'react-query'
import ModalButtomCmp from '../ComonComponent/Components/ModalButtomCmp'

import ClearIcon from '@mui/icons-material/Clear'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ReqImageDisModal from '../ComonComponent/ImageUploadCmp/ReqImageDisModal'

const DataCollectionActionModal = ({
  open,
  handleClose,
  reqItems,
  approveTableData,
  dcData,
  setApproveTableData,
  empdeptsec,
  imagearray,
  selectedCompany,
  depkmc
}) => {
  const { crf_req_remark, dc_req_date, requser, req_slno, crf_data_collect_slno } = dcData
  const queryClient = useQueryClient()
  const capitalizeWords = str =>
    str
      ? str
          .toLowerCase()
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : ''

  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const [editEnable, setEditEnable] = useState(0)
  const [addMoreItems, setMoreItem] = useState(0)
  const [remark, setRemark] = useState('')
  const [selectFile, setSelectFile] = useState([])
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imageshow, setImageShow] = useState(false)

  const updateRemark = useCallback(e => {
    setRemark(e.target.value)
  }, [])
  const AddItems = useCallback(() => {
    setMoreItem(1)
  }, [])
  const uploadFile = useCallback(
    e => {
      const files = Array.from(e.target.files)
      setSelectFile(prevFiles => {
        const duplicateFiles = []
        const validFiles = files?.filter(file => {
          if (
            file.type === 'application/pdf' ||
            file.type === 'image/png' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg'
          ) {
            if (file.size > 26214400) {
              warningNotify(`The file "${file.name}" exceeds the 25MB size limit`)
              return false
            }
            const isDuplicate = prevFiles.some(prevFile => prevFile.name === file.name && prevFile.size === file.size)
            if (isDuplicate) {
              duplicateFiles.push(file.name)
              return false
            }
            return true
          } else {
            warningNotify(`The file "${file.name}" is not a supported format! Only .png, .jpeg, and .pdf are allowed.`)
            return false
          }
        })
        if (duplicateFiles.length > 0) {
          warningNotify(`The following files are duplicates and were not added: ${duplicateFiles.join(', ')}`)
        }
        return [...prevFiles, ...validFiles]
      })
    },
    [setSelectFile]
  )
  const handleRemoveFile = index => {
    setSelectFile(prevFiles => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })
  }
  const isMounted = useRef(true)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const reset = useCallback(() => {
    if (isMounted.current) {
      handleClose()
      setApproveTableData([])
    }
  }, [handleClose, setApproveTableData])

  const handleImageUpload = useCallback(async imageFile => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, [])

  const patchdata = useMemo(() => {
    return {
      crf_dept_remarks: remark,
      save_user: id,
      crf_data_collect_slno: crf_data_collect_slno
    }
  }, [remark, crf_data_collect_slno, id])

  const patchdatakmc = useMemo(() => {
    return {
      crf_dept_remarks: remark,
      save_user: depkmc?.kmc_hod,
      crf_data_collect_slno: crf_data_collect_slno
    }
  }, [remark, crf_data_collect_slno, depkmc])
  const submit = useCallback(
    e => {
      e.preventDefault()
      const DataCollectnGiven = async patchdata => {
        const result = await axioslogin.patch('/CRFRegisterApproval/CrfDataCollactnSave', patchdata)
        return result.data
      }
      const DataCollectnKMCGiven = async patchdatakmc => {
        const result = await axioskmc.patch('/CRFRegisterApproval/CrfDataCollactnSave', patchdatakmc)
        return result.data
      }
      const FileInsert = async (crf_data_collect_slno, req_slno, selectFile) => {
        try {
          const formData = new FormData()
          formData.append('id', crf_data_collect_slno)
          formData.append('reqslno', req_slno)
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', file, file.name)
            }
          }
          // Use the Axios instance and endpoint that matches your server setup
          const result = await axioslogin.post('/newCRFRegisterImages/crf/DataCollection', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return result.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }
      const FileInsertkmc = async (crf_data_collect_slno, req_slno, selectFile) => {
        try {
          const formData = new FormData()
          formData.append('id', crf_data_collect_slno)
          formData.append('reqslno', req_slno)
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', file, file.name)
            }
          }
          // Use the Axios instance and endpoint that matches your server setup
          const result = await axioskmc.post('/newCRFRegisterImages/crf/DataCollection', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return result.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }

      if (remark !== '') {
        if (selectedCompany === '1') {
          DataCollectnGiven(patchdata).then(value => {
            const { success, message } = value
            if (success === 1) {
              if (selectFile?.length !== 0) {
                FileInsert(crf_data_collect_slno, req_slno, selectFile).then(val => {
                  const { success, message } = val
                  if (success === 1) {
                    succesNotify('Data Collection Details Updated')
                    queryClient.invalidateQueries(['dataCollection', empdeptsec])
                    reset()
                  } else {
                    warningNotify(message)
                  }
                })
              } else {
                succesNotify('Data Collection Details Updated')
                queryClient.invalidateQueries(['dataCollection', empdeptsec])
                reset()
              }
            } else {
              warningNotify(message)
            }
          })
        } else {
          DataCollectnKMCGiven(patchdatakmc).then(value => {
            const { success, message } = value
            if (success === 1) {
              if (selectFile?.length !== 0) {
                FileInsertkmc(crf_data_collect_slno, req_slno, selectFile).then(val => {
                  const { success, message } = val
                  if (success === 1) {
                    succesNotify('Data Collection Details Updated')
                    queryClient.invalidateQueries(['dataCollectionkmc', empdeptsec])
                    reset()
                  } else {
                    warningNotify(message)
                  }
                })
              } else {
                succesNotify('Data Collection Details Updated')
                queryClient.invalidateQueries(['dataCollectionkmc', empdeptsec])
                reset()
              }
            } else {
              warningNotify(message)
            }
          })
        }
      } else {
        warningNotify('Enter remarks Before Save')
      }
    },
    [
      patchdata,
      remark,
      crf_data_collect_slno,
      req_slno,
      selectFile,
      handleImageUpload,
      reset,
      empdeptsec,
      queryClient,
      selectedCompany,
      patchdatakmc
    ]
  )

  const closeModal = useCallback(() => {
    setRemark('')
    reset()
  }, [reset])

  const viewUploadedFile = useCallback(file => {
    const fileType = file.imageName
      ? file.imageName.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type.includes('application/pdf')
      ? 'pdf'
      : 'image'

    const fileUrl = file.url || URL.createObjectURL(file)
    setPreviewFile({ url: fileUrl, type: fileType })
    setImageShow(true)
    setImageShowFlag(1)
  }, [])
  const handleCloseImageView = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])
  return (
    <Fragment>
      {imageshowFlag === 1 ? (
        <ReqImageDisModal open={imageshow} handleClose={handleCloseImageView} previewFile={previewFile} />
      ) : null}
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
                m: 1,
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
                color: '#bf360c',
                height: 35,
                width: 35
              }}
            />
            <Box
              sx={{
                minWidth: '80vw',
                minHeight: '62vh',
                maxHeight: '85vh',
                overflowY: 'auto',
                px: 0.2
              }}
            >
              <CrfReqDetailViewCmp ApprovalData={dcData} imagearray={imagearray} />
              <Box sx={{ pt: 0.5 }}>
                {
                  reqItems.length !== 0 ? <ReqItemDisplay reqItems={reqItems} /> : null
                  // <Box sx={{
                  //     display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5, color: 'grey'
                  // }}>
                  //     No Item Requested
                  // </Box>
                }
              </Box>
              <Paper variant="outlined" sx={{ mt: 0.7, mx: 0.5 }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    py: 1,
                    color: '#145DA0',
                    fontSize: 14,
                    pl: 1,
                    borderBottom: '1px solid lightgrey'
                  }}
                >
                  Data Collection Request Details
                </Typography>
                <Box sx={{ display: 'flex', pt: 1 }}>
                  <Typography sx={{ pl: 1, fontSize: 15, flex: 0.4 }}>Requested Remarks</Typography>
                  <Typography sx={{ pl: 0.5 }}> :&nbsp;</Typography>
                  <Typography sx={{ height: 'auto', fontSize: 14, fontWeight: 550, flex: 1, pt: 0.2 }}>
                    {crf_req_remark}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', py: 1 }}>
                  <Typography sx={{ pl: 1, fontSize: 15, flex: 0.4 }}>Requested by</Typography>
                  <Box sx={{ display: 'flex', flex: 1 }}>
                    <Typography> :&nbsp;</Typography>
                    <Typography sx={{ height: 'auto', fontSize: 14, fontWeight: 550, pt: 0.3 }}>
                      {capitalizeWords(requser)}
                    </Typography>
                    <Typography sx={{ height: 'auto', fontSize: 14, fontWeight: 550, pl: 2, pt: 0.3 }}>
                      {format(new Date(dc_req_date), 'dd-MM-yyyy hh:mm:ss a')}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              <Box sx={{ mt: 0.5, pb: 1, flexWrap: 'wrap' }}>
                {approveTableData.length !== 0 ? (
                  <ItemsApprovalCompnt
                    req_slno={req_slno}
                    setMoreItem={setMoreItem}
                    editEnable={editEnable}
                    setEditEnable={setEditEnable}
                    setApproveTableData={setApproveTableData}
                    depkmc={depkmc}
                    approveTableData={approveTableData}
                    crf_data_collect_status={crf_data_collect_slno}
                    selectedCompany={selectedCompany}
                  />
                ) : null}
                <Box sx={{ pl: 0.5 }}>
                  <CustomIconButtonCmp handleChange={AddItems}>Add Items</CustomIconButtonCmp>
                </Box>
                {addMoreItems === 1 ? (
                  <AddMoreItemDtails
                    req_slno={req_slno}
                    setApproveTableData={setApproveTableData}
                    setMoreItem={setMoreItem}
                    selectedCompany={selectedCompany}
                    depkmc={depkmc}
                  />
                ) : null}
                <Box sx={{ pt: 0.4 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 600, flex: 1, pl: 1, pt: 0.5 }}>Remarks</Typography>
                  <Box sx={{ pt: 0.2, flex: 1, px: 0.5 }}>
                    <Textarea
                      required
                      type="text"
                      size="sm"
                      minRows={2}
                      maxRows={4}
                      placeholder="type here..."
                      value={remark}
                      onChange={updateRemark}
                    />
                  </Box>
                </Box>
                <Paper variant="outlined" square sx={{ p: 0.5, m: 0.5, display: 'flex', flexWrap: 'wrap' }}>
                  <Box sx={{}}>
                    <label htmlFor="file-input">
                      <Tooltip title="Upload File" placement="bottom" sx={{ bgcolor: '#e8eaf6', color: '#283593' }}>
                        <IconButton
                          aria-label="upload file"
                          variant="soft"
                          component="span"
                          sx={{
                            bgcolor: 'white',
                            '&:hover': {
                              bgcolor: 'white'
                            }
                          }}
                        >
                          <CloudUploadTwoToneIcon
                            fontSize="small"
                            sx={{
                              width: 35,
                              height: 25,
                              color: '#3949ab',
                              '&:hover': {
                                color: '#5c6bc0'
                              }
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: '#3949ab',
                              '&:hover': {
                                color: '#5c6bc0'
                              }
                            }}
                          >
                            Maximum Size 25MB
                          </Typography>
                        </IconButton>
                      </Tooltip>
                    </label>
                    <input
                      multiple
                      id="file-input"
                      type="file"
                      accept=".jpg, .jpeg, .png, .pdf"
                      style={{ display: 'none' }}
                      onChange={uploadFile}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2, width: '100%' }}>
                    {selectFile.length !== 0 &&
                      selectFile?.map((file, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            m: 1,
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            p: 0.5
                          }}
                        >
                          {file.type.includes('image') ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                marginRight: '8px',
                                cursor: 'pointer'
                              }}
                              onClick={() => viewUploadedFile(file)}
                            />
                          ) : file.type === 'application/pdf' ? (
                            <PictureAsPdfIcon
                              sx={{
                                width: '40px',
                                height: '40px',
                                color: '#e53935',
                                marginRight: '8px',
                                cursor: 'pointer'
                              }}
                              onClick={() => viewUploadedFile(file)}
                            />
                          ) : (
                            <InsertDriveFileIcon
                              sx={{
                                width: '40px',
                                height: '40px',
                                color: '#9e9e9e',
                                marginRight: '8px',
                                cursor: 'pointer'
                              }}
                              onClick={() => viewUploadedFile(file)}
                            />
                          )}
                          <Box sx={{ fontSize: 14, cursor: 'pointer', flexGrow: 1 }}>{file.name}</Box>
                          <ClearIcon
                            sx={{
                              height: '16px',
                              width: '16px',
                              cursor: 'pointer',
                              color: 'red',
                              marginLeft: '8px'
                            }}
                            onClick={() => handleRemoveFile(index)}
                          />
                        </Box>
                      ))}
                  </Box>
                </Paper>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ py: 0.5, pr: 0.5 }}>
                <ModalButtomCmp handleChange={submit}> Save</ModalButtomCmp>
              </Box>
              <Box sx={{ py: 0.5, pr: 2 }}>
                <ModalButtomCmp handleChange={closeModal}> Cancel</ModalButtomCmp>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(DataCollectionActionModal)
