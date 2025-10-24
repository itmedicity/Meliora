import { Box, IconButton, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import { warningNotify } from 'src/views/Common/CommonCode'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ClearIcon from '@mui/icons-material/Clear'
import ReqImageDisModal from '../../ComonComponent/ImageUploadCmp/ReqImageDisModal'

const PurchaseWoImg = ({ selectFile, setSelectFile }) => {
  const [imagearray, setImageArry] = useState([])
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const [crfRegister, setCrfRegister] = useState({
    imageshowFlag: 0,
    imageshow: false
  })

  const { imageshowFlag, imageshow } = crfRegister
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
            // const duplicates = prevFiles?.filter(
            //     (prevFile) => prevFile.name === file.name && prevFile.size === file.size
            // );
            // if (duplicates.length > 0) {
            //     duplicateFiles.push(file.name);
            //     return false;
            // }

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

  const ViewImage = useCallback(file => {
    const fileType = file.imageName
      ? file.imageName.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type.includes('application/pdf')
        ? 'pdf'
        : 'image'

    const fileUrl = file.url || URL.createObjectURL(file)
    setPreviewFile({ url: fileUrl, type: fileType })
    setCrfRegister(prev => ({
      ...prev,
      imageshow: true,
      imageshowFlag: 1
    }))
  }, [])

  const handleClose = useCallback(() => {
    setCrfRegister(prev => ({
      ...prev,
      imageshow: false,
      imageshowFlag: 0
    }))
  }, [])

  return (
    <Box>
      {imageshowFlag === 1 ? (
        <ReqImageDisModal open={imageshow} handleClose={handleClose} previewFile={previewFile} />
      ) : null}
      <Paper variant="outlined" square sx={{ p: 0.5, m: 0.5, display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{ p: 0.5 }}>
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
          {imagearray.length > 0 &&
            imagearray?.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  m: 0.3,
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  p: 0.5
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
                    onClick={() => ViewImage(file)}
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
                    onClick={() => ViewImage(file)}
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
                    onClick={() => ViewImage(file)}
                  />
                )}
                <Box sx={{ fontSize: 14, cursor: 'pointer', flexGrow: 1 }}>{file.imageName}</Box>
                {/* <ClearIcon
                                            sx={{
                                                height: "16px",
                                                width: "16px",
                                                cursor: "pointer",
                                                color: "red",
                                                marginLeft: "8px",
                                            }}
                                            onClick={() => handleRemoveSavedFile(index)}
                                        /> */}
              </Box>
            ))}
          {selectFile?.length !== 0 &&
            selectFile.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  m: 0.3,
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
                    // onClick={() => ViewImage(URL.createObjectURL(file))}
                    onClick={() => ViewImage(file)}
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
                    onClick={() => ViewImage(file)}
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
                    onClick={() => ViewImage(file)}
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
  )
}

export default PurchaseWoImg
