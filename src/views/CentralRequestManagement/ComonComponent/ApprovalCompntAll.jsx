import React, { Fragment, memo, useCallback, useState } from 'react'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { Box, Textarea, Typography, IconButton } from '@mui/joy'
import { Paper } from '@mui/material'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import { warningNotify } from 'src/views/Common/CommonCode'
import ClearIcon from '@mui/icons-material/Clear'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ReqImageDisModal from './ImageUploadCmp/ReqImageDisModal'
import CustomToolTipForCRF from './Components/CustomToolTipForCRF'

const ApprovalCompntAll = ({
  heading,
  apprvlDetails,
  updateOnchangeState,
  updateApprovalState,
  imageCheck,
  selectFile,
  setSelectFile,
  uploadedImages
}) => {
  const { reject, pending, remark, detailAnalis, internallyArr } = apprvlDetails

  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imageshow, setImageShow] = useState(false)

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
  const remarkBox = useCallback(() => {
    if (reject) {
      return 'Detail Justification for Reject'
    } else if (pending) {
      return 'Detail Justification for On-Hold'
    } else if (internallyArr) {
      return 'Details Of Internally Arranged'
    }
    return 'Detail Justification/ Requirement Description'
  }, [reject, pending, internallyArr])

  return (
    <Fragment>
      {imageshowFlag === 1 ? (
        <ReqImageDisModal open={imageshow} handleClose={handleCloseImageView} previewFile={previewFile} />
      ) : null}

      <Paper variant="outlined" sx={{ flexWrap: 'wrap', my: 0.5, pb: 1, mx: 0.3 }}>
        <Typography sx={{ fontWeight: 'bold', m: 1, color: '#145DA0', fontSize: 14 }}>{heading}</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 550, pl: 1 }}>{remarkBox()}</Typography>
        <Box sx={{ flex: 1, m: 0.5, px: 0.5 }}>
          <Textarea
            required
            placeholder={reject ? 'Reject Remark' : pending ? 'On-Hold Remarks' : 'Remarks'}
            value={remark}
            autoComplete="off"
            name="remark"
            minRows={2}
            maxRows={3}
            onChange={updateOnchangeState}
            sx={{ fontSize: 14, borderRadius: 7 }}
          />
        </Box>
        {!reject && !pending && !internallyArr && (
          <>
            <Typography sx={{ fontSize: 14, fontWeight: 550, pl: 1 }}>Detailed Analysis of Requirement</Typography>
            <Box sx={{ flex: 1, m: 0.5, px: 0.5 }}>
              <Textarea
                required
                placeholder="Detail Analysis"
                value={detailAnalis}
                autoComplete="off"
                name="detailAnalis"
                minRows={2}
                maxRows={3}
                onChange={updateOnchangeState}
                sx={{ fontSize: 14, borderRadius: 7 }}
              />
            </Box>
          </>
        )}
        <Box sx={{ display: 'flex', flex: 1, pl: 10 }}>
          {['approve', 'reject', 'pending', 'internallyArr'].map(type => (
            <Box key={type} sx={{ m: 1 }}>
              <CusCheckBox
                label={
                  type === 'approve'
                    ? 'Approve'
                    : type === 'reject'
                    ? 'Reject'
                    : type === 'pending'
                    ? 'On-Hold'
                    : 'Internally Arranged'
                }
                color="primary"
                size="md"
                name={type}
                checked={apprvlDetails[type]}
                onCheked={() => updateApprovalState(type)}
              />
            </Box>
          ))}
        </Box>

        {/* file upload */}
        <Paper variant="outlined" square sx={{ p: 0.5, m: 0.5, display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{}}>
            <label htmlFor="file-input">
              <CustomToolTipForCRF title={'Upload File '} placement={'bottom'}>
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
              </CustomToolTipForCRF>
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
            {uploadedImages.length > 0 &&
              imageCheck === 1 &&
              uploadedImages?.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    p: 0.5,
                    pr: 1
                  }}
                >
                  {file.imageName.endsWith('.png') ||
                  file.imageName.endsWith('.jpg') ||
                  file.imageName.endsWith('.jpeg') ? (
                    <img
                      src={file.url}
                      alt={file.imageName}
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
                  ) : file.imageName.endsWith('.pdf') ? (
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
                  <Box sx={{ fontSize: 14, cursor: 'pointer', flexGrow: 1 }}>{file.imageName}</Box>
                </Box>
              ))}
            {selectFile.length !== 0 &&
              selectFile?.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 1,
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
      </Paper>
    </Fragment>
  )
}

export default memo(ApprovalCompntAll)
