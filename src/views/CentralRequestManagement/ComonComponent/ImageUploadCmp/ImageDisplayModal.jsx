import React, { memo, } from 'react'
import Modal from '@mui/joy/Modal'
import { CssVarsProvider, ModalClose, ModalDialog } from '@mui/joy'
import { Box } from '@mui/material'
import Button from '@mui/joy/Button'

const ImageDisplayModal = ({ open, handleClose, images }) => {
  // const [disArry, setDissArry] = useState([])
  // useEffect(() => {
  //   if (images.length !== 0) {
  //     const disimage = images.map(val => {
  //       const parts = val.split('/')
  //       const fileNamePart = parts[parts.length - 1]
  //       const obj = {
  //         imageName: fileNamePart,
  //         url: val
  //       }
  //       return obj
  //     })
  //     setDissArry(disimage)
  //   }
  // }, [images])
  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: window.innerHeight - 80,
          pt: 10
        }}
      >
        <ModalDialog
          variant="outlined"
          sx={{
            width: '70vw',
            borderRadius: 'sm',
            p: 4,
            boxShadow: 'lg',
            maxHeight: window.innerHeight - 100
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
          <Box
            sx={{
              width: '100%',
              flex: 1,
              borderRadius: 1,
              border: '0.1px solid grey',
              margin: 'auto',
              maxHeight: window.innerHeight - 180,
              overflow: 'auto'
            }}
          >
            {images &&
              images.map((value, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                  {value.imageName.endsWith('.pdf') ? (
                    <embed
                      // src={value.url}
                      src={`${value.url}#toolbar=0&navpanes=0&view=FitH`}
                      type="application/pdf"
                      height={820}
                      width="100%" />
                    // <PdfViewer src={value.url} />

                  ) : (
                    <img alt="" src={value.url} height={820} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  )}
                </Box>
              ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" size="md" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(ImageDisplayModal)
