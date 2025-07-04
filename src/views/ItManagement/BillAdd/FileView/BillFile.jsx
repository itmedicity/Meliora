import { Box, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { Paper } from '@mui/material'

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
              {filezUrls.map((Url, index) => (
                <Paper key={index} sx={{ bgcolor: '#EBEBE8', cursor: 'pointer', height: 800, width: 1000, mb: 0.5 }}>
                  <embed id="pdf-embed" src={Url} type="application/pdf" height={800} width={'100%'} />
                </Paper>
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
