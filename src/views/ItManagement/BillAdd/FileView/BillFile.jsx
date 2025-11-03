import { Box, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'

const BillFile = ({ billViewmodalOpen, setBillViewModalOpen, setBillViewModalFlag, filezUrls }) => {
  const handleCloseBill = useCallback(() => {
    setBillViewModalFlag(0)
    setBillViewModalOpen(false)
  }, [setBillViewModalFlag, setBillViewModalOpen])

  return (
    <Box>
      <Modal aria-labelledby="modal-title" aria-describedby="modal-desc" open={billViewmodalOpen}>
        <ModalDialog
          sx={{
            overflow: 'auto',
            minWidth: '30vw',
            minHeight: '15vw',
            bgcolor: '#4C5270'
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ flex: 1, display: 'flex' }}>
              <Typography sx={{ flex: 1, color: 'white', fontSize: 20, fontWeight: 600 }}>Bills</Typography>
              <Tooltip title="Close">
                <HighlightOffSharpIcon
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    height: 25,
                    width: 25,
                    '&:hover': {
                      color: '#5C97B8'
                    }
                  }}
                  onClick={handleCloseBill}
                />
              </Tooltip>
            </Box>
            <Box sx={{ gap: 2 }}>
              {filezUrls.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#EBEBE8',
                    cursor: 'pointer',
                    height: 800,
                    width: 1000,
                    mb: 0.5,
                  }}
                >
                  {item.blob.type.startsWith('image') ? (
                    <img
                      src={item.url}
                      alt={`Preview-${index}`}
                      style={{
                        width: '100%',
                        height: '80%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : item.blob.type === 'application/pdf' ? (
                    <embed
                      id={`pdf-embed-${index}`}
                      src={`${item.url}#toolbar=0&navpanes=0&view=FitH`}
                      type="application/pdf"
                      height={850}
                      width="100%"
                    />
                  ) : (
                    <Typography variant="h6" color="text.secondary">
                      Unsupported file type.
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Box
                sx={{
                  m: 0.5,
                  borderRadius: 5,
                  width: 134,
                  py: 0.5,
                  fontSize: 18,
                  bgcolor: '#151B25',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'center',
                  '&:hover': {
                    bgcolor: '#444444',
                    color: 'white'
                  }
                }}
                onClick={handleCloseBill}
              >
                &nbsp; cancel
              </Box>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  )
}

export default memo(BillFile)
