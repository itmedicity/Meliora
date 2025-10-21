import React, { memo } from 'react'
// import Dialog from '@mui/material/Dialog'
import { Box, Button, CssVarsProvider, Modal, Sheet, } from '@mui/joy'
import PdfViewer from 'src/views/Components/PdfViewer '

const ViewTaskImage = ({ open, handleClose, imageUrls }) => {

  return (
    // <Fragment>
    //   <Dialog open={open} onClose={handleClose} maxWidth="lg">
    //     <DialogContent
    //       sx={{
    //         width: '100%',
    //         height: '60%',
    //         bgcolor: '#05445E'
    //       }}
    //     >
    //       <Box sx={{ display: 'flex' }}>
    //         <Box
    //           sx={{
    //             flex: 1,
    //             fontWeight: 'bold',
    //             height: '50px',
    //             color: 'white',
    //             fontSize: 20
    //           }}
    //         >
    //           Task
    //         </Box>
    //         <Box
    //           sx={{
    //             marginLeft: 'auto'
    //           }}
    //         >
    //           <HighlightOffTwoToneIcon
    //             sx={{
    //               color: 'white',
    //               cursor: 'pointer',
    //               '&:hover': { color: '#F7BEC0' }
    //             }}
    //             onClick={handleClose}
    //           />
    //         </Box>
    //       </Box>
    //       <Box sx={{ gap: 5 }}>
    //         {/* {imageUrls.map((imageUrl, index) => (
    //           <Paper key={index} sx={{ bgcolor: '#EBEBE8', cursor: 'pointer', height: 700, width: 1000, mb: 1 }}>
    //             <embed id="pdf-embed" src={imageUrl} type="application/pdf" height={650} width={'100%'} />
    //           </Paper>
    //         ))} */}

    //         {imageUrls.type === 'image' ? (
    //           <img
    //             src={imageUrls.url}
    //             alt="Preview"
    //             style={{
    //               width: '100%',
    //               height: '100%',
    //               objectFit: 'contain'
    //             }}
    //           />
    //         ) : imageUrls.type === 'pdf' ? (
    //           <PdfViewer src={imageUrls.url} />
    //           // <iframe
    //           //   src={previewFile.url}
    //           //   title="PDF Preview"
    //           //   style={{
    //           //     width: '100%',
    //           //     height: '100%',
    //           //     border: 'none'
    //           //   }}
    //           // />
    //         ) : (
    //           <Typography variant="h6" color="text.secondary">
    //             Unsupported file type.
    //           </Typography>
    //         )}
    //       </Box>
    //       <DialogActions>
    //         <CssVarsProvider>
    //           <Button sx={{ color: 'white', fontWeight: 'bold', bgcolor: '#0C2D48' }} onClick={handleClose}>
    //             Cancel
    //           </Button>
    //         </CssVarsProvider>
    //       </DialogActions>
    //     </DialogContent>
    //   </Dialog>
    // </Fragment>
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: window.innerHeight - 80
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: '50%',
            borderRadius: 'sm',
            p: 2,
            boxShadow: 'lg',
            height: window.innerHeight - 100
          }}
        >
          <Box
            sx={{
              width: '100%',
              flex: 1,
              borderRadius: 1,
              border: '0.1px solid grey',
              margin: 'auto',
              height: window.innerHeight - 180,
              overflowX: 'auto',
              '::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {imageUrls &&
              imageUrls.map((value, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                  {value.imageName.endsWith('.pdf') ? (
                    // <embed src={value.url} type="application/pdf" height={820} width="100%" />
                    <PdfViewer src={value.url} />

                  ) : (
                    <img alt="" src={value.url} height={820} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  )}
                </Box>
              ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
            <Button variant="outlined" color="secondary" size="md" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </CssVarsProvider>

  )
}

export default memo(ViewTaskImage)
