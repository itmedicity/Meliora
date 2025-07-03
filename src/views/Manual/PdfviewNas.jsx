import React, { useCallback, useState } from 'react'
import { Fragment, memo } from 'react'
import { Box } from '@mui/material'
import { PUBLIC_NAS_FOLDER } from '../Constant/Static'
import ReqImageDisModal from '../CentralRequestManagement/ComonComponent/ImageUploadCmp/ReqImageDisModal'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { Typography } from '@mui/joy'

const PdfviewNas = ({ pdfDis, uploadedImages }) => {
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const [imageshowFlag, setImageShowFlag] = useState(0)
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
        <ReqImageDisModal
          open={imageshow}
          handleClose={handleCloseImageView}
          previewFile={previewFile}
        />
      ) : null}
      <Box
        sx={{
          width: { md: '100%', sm: '100%', xl: '100%', lg: '100%', xs: '100%' },
        }}
      >
        {pdfDis === 1 ? (
          <embed
            src={`${PUBLIC_NAS_FOLDER}/fileshows/GuideLine.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={820}
            width="100%"
          />
        ) : // pdfDis === 2 ?
        //     <embed
        //         id="pdf-embed"
        //         src={`${PUBLIC_NAS_FOLDER}/fileshows/LASA.pdf#toolbar=0&navpanes=0&view=FitH`}
        //         type="application/pdf"
        //         height={850}
        //         width="100%" />
        //     :
        pdfDis === 3 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/SRADHA.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 4 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/MSDS.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 5 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/2023_MEDEF.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 6 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/Abbreviation.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 7 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/Fridge Medicines.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 8 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/High Risk Drugs.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 9 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/Look Alike.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 10 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/Psychotropic Drugs.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 11 ? (
          <embed
            id="pdf-embed"
            src={`${PUBLIC_NAS_FOLDER}/fileshows/Sound Alike Drugs.pdf#toolbar=0&navpanes=0&view=FitH`}
            type="application/pdf"
            height={850}
            width="100%"
          />
        ) : pdfDis === 12 ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 5,
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
                  marginBottom: 2,
                }}
              >
                <PictureAsPdfIcon
                  sx={{
                    width: '40px',
                    height: '40px',
                    color: '#e53935',
                    cursor: 'pointer',
                  }}
                  onClick={() => viewUploadedFile(file)}
                />
                <Typography level="body-xs" sx={{ textAlign: 'center', mt: 1 }}>
                  {file?.imageName}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : pdfDis === 13 ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 5,
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
                  marginBottom: 2,
                }}
              >
                <PictureAsPdfIcon
                  sx={{
                    width: '40px',
                    height: '40px',
                    color: '#e53935',
                    cursor: 'pointer',
                  }}
                  onClick={() => viewUploadedFile(file)}
                />
                <Typography level="body-xs" sx={{ textAlign: 'center', mt: 1 }}>
                  {file?.imageName}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </Fragment>
  )
}

export default memo(PdfviewNas)
