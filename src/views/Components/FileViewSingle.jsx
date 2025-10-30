import React, { memo } from 'react'
import CancelSharpIcon from '@mui/icons-material/CancelSharp'
import { Box, CssVarsProvider, Modal, ModalDialog, Typography } from '@mui/joy'
import PdfViewer from 'src/views/Components/PdfViewer '

const FileViewSingle = ({ imageShow, previewFile, CloseFile }) => {
  return (
    <CssVarsProvider>
      <Modal open={imageShow}>
        <ModalDialog
          sx={{
            width: '65vw',
            height: '95vh',
            p: 0
          }}
        >
          <Box>
            <Box sx={{ flex: 1, display: 'flex', p: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 18 }}>File Previews</Typography>
              </Box>
              <Box>
                <CancelSharpIcon onClick={CloseFile} sx={{ height: 35, width: 35, cursor: 'pointer' }} />
              </Box>
            </Box>
            <Box
              sx={{
                border: 1,
                borderColor: 'lightgrey',
                mx: 1.5,
                p: 1,
                height: '80vh',
                overflow: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ width: '100%', height: '100%' }}>
                {previewFile?.type === 'image' ? (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={previewFile.url}
                      alt="File Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '4px',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                ) : previewFile?.type === 'pdf' ? (
                  // <iframe
                  //   src={previewFile.url}
                  //   title="PDF Preview"
                  //   style={{
                  //     width: '100%',
                  //     height: '100%',
                  //     objectFit: 'contain'
                  //   }}
                  // />
                  <PdfViewer src={previewFile.url} />
                ) : (
                  <Typography>No preview available for this file type.</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(FileViewSingle)
