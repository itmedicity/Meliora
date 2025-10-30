import React, { memo, useCallback, useEffect, useState } from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import { Box, Grid } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'

const ComplaintAttachFiles = ({ complaint_slno }) => {
  const [UploadedFiles, setUploadedFiles] = useState([])
  useEffect(() => {
    if (!complaint_slno) return
    const fetchComplaintFiles = async () => {
      try {
        const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`)
        const { success } = result.data
        if (success === 1) {
          const fileNames = result.data.data
          const fileUrls = fileNames.map(
            fileName => `ComplaintManagement/${complaint_slno}/${fileName}`
          )

          if (fileUrls.length > 0) {
            setUploadedFiles(fileUrls)
          } else {
            setUploadedFiles([])
          }
        } else {
          setUploadedFiles([])
        }
      } catch (error) {
        warningNotify('Error in fetching files:', error)
      }
    }

    fetchComplaintFiles()
  }, [complaint_slno])

  const [imageShowsingleFlag, setImagesingle] = useState(0)
  const [imageShowSingle, setImageShowSingle] = useState(false)
  const [uploadedFile, setUplodedFile] = useState({ url: '', type: '' })

  const SingleView = useCallback(file => {
    const fileType = file.url
      ? file.url.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type && file.type.includes('application/pdf')
        ? 'image'
        : 'pdf'

    const fileUrl = file.url || URL.createObjectURL(file)
    setUplodedFile({ url: fileUrl, type: fileType })
    setImageShowSingle(true)
    setImagesingle(1)

    const modalElement = document.querySelector('.MuiModal-root')
    if (
      modalElement &&
      modalElement.hasAttribute('aria-hidden') &&
      modalElement.getAttribute('aria-hidden') === 'true'
    ) {
      document.activeElement.blur()
    }
  }, [])

  const CloseSingleFile = useCallback(() => {
    setImagesingle(0)
    setImageShowSingle(false)
  }, [])
  return (
    <Box sx={{ flex: 1, mr: 1, my: 0.5, ml: 0.5 }}>
      {imageShowsingleFlag === 1 ? (
        <Box>
          <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
        </Box>
      ) : null}
      {UploadedFiles.length !== 0 && (
        <Grid container spacing={0.5}>
          {UploadedFiles.map((url, index) => {
            const isPdf = url.toLowerCase().endsWith('.pdf')
            const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url)

            return (
              <Grid xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    alignItems: 'center',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    p: 0.5,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    bgcolor: '#fff'
                  }}
                >
                  {isImage ? (
                    <img
                      src={url}
                      alt={`Complaint file ${index}`}
                      style={{
                        width: '70px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginRight: '8px',
                        cursor: 'pointer'
                      }}
                      onClick={() => SingleView({ url })}
                    />
                  ) : isPdf ? (
                    <PictureAsPdfIcon
                      sx={{
                        width: '50px',
                        height: '50px',
                        color: '#e53935',
                        marginRight: '8px',
                        cursor: 'pointer'
                      }}
                      onClick={() => SingleView({ url })}
                    />
                  ) : (
                    <InsertDriveFileIcon
                      sx={{
                        width: '60px',
                        height: '60px',
                        color: '#9e9e9e',
                        marginRight: '8px',
                        cursor: 'pointer'
                      }}
                      onClick={() => SingleView({ url })}
                    />
                  )}
                  <Box
                    sx={{
                      fontSize: 14,
                      cursor: 'pointer',
                      flexGrow: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {url.split('/').pop()}
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}

export default memo(ComplaintAttachFiles)
