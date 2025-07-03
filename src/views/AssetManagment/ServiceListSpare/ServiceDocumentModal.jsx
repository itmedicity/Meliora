import React, { memo, useCallback } from 'react'
import { Box, CssVarsProvider, Modal, ModalDialog } from '@mui/joy'
import CancelIcon from '@mui/icons-material/Cancel'

const ServiceDocumentModal = ({ setopenDocuments, open, setdocumetOpenCheck, DocumentView }) => {
  const Close = useCallback(() => {
    setdocumetOpenCheck(prev => ({ ...prev, documetOpenCheck: false }))
    setopenDocuments(prev => ({ ...prev, openDocuments: 0 }))
  }, [setdocumetOpenCheck, setopenDocuments])

  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10,
        }}
      >
        <ModalDialog variant="outlined" sx={{ p: 0, width: '85%', height: '98%' }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Sticky Header Section */}
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                display: 'flex',
                mt: 1,
                p: 1,
                bgcolor: '#fff',
                borderBottom: '1px solid #ccc',
              }}
            >
              <Box sx={{ flex: 1, color: 'grey', fontWeight: 600, pl: 1 }}>Document View</Box>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={Close} />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                overflow: 'auto',
                px: 1,
                height: '75vh',
              }}
            >
              {DocumentView.map((imageUrl, index) => (
                <Box
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    width: '49%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    p: 1,
                    borderColor: 'lightgrey',
                  }}
                >
                  <embed
                    id="pdf-embed"
                    src={imageUrl}
                    type="application/pdf"
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(ServiceDocumentModal)
