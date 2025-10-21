import React, { useCallback, useState } from 'react'
import { Fragment, memo } from 'react'
import { Box } from '@mui/material'
// import ReqImageDisModal from '../CentralRequestManagement/ComonComponent/ImageUploadCmp/ReqImageDisModal'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { Typography } from '@mui/joy'
import ReqImageDisModalHic from './ReqImageDisModalHic'

const PdfviewNas = ({ pdfDis, uploadedImages, setImageShowFlag, imageshowFlag }) => {
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  // const [imageshowFlag, setImageShowFlag] = useState(0)
  const [imageshow, setImageShow] = useState(false)
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
        <ReqImageDisModalHic open={imageshow} handleClose={handleCloseImageView} previewFile={previewFile} />
      ) : null}
      <Box
        sx={{
          width: { md: '100%', sm: '100%', xl: '100%', lg: '100%', xs: '100%' }
        }}
      >

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5
          }}
        >
          {uploadedImages.map((file, index) => (
            <Box
              key={index}
              sx={{
                width: '20%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 2
              }}
            >
              <PictureAsPdfIcon
                sx={{
                  width: '40px',
                  height: '40px',
                  color: '#e53935',
                  cursor: 'pointer'
                }}
                onClick={() => viewUploadedFile(file)}
              />
              <Typography level="body-xs" sx={{ textAlign: 'center', mt: 1 }}>
                {file?.imageName}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(PdfviewNas)
