import React, { memo, useCallback } from 'react'
import { Typography } from '@mui/material'
import { Box, Button, Chip, CssVarsProvider, Modal, ModalDialog } from '@mui/joy'
import CancelIcon from '@mui/icons-material/Cancel'

const ServiceFileAttach = ({
  imageServiceUrls,
  serviceimageViewOpen,
  servicefileDetails,
  setimageServiceFlag,
  setServiceimageViewOpen,
  item_name,
  category_name
}) => {
  const { service_asset_spare, service_item_slno } = servicefileDetails

  const Close = useCallback(() => {
    setServiceimageViewOpen(false)
    setimageServiceFlag(0)
  }, [setServiceimageViewOpen, setimageServiceFlag])

  const buttonStyle = {
    fontSize: 16,
    color: '#523A28',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#523A28',
      transform: 'scale(1.1)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  }

  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={serviceimageViewOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10
        }}
      >
        <ModalDialog variant="outlined" sx={{ p: 0, overflow: 'auto', width: '90%' }}>
          <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1 }}>
            <Box sx={{ flex: 1, color: 'grey', fontWeight: 600, pl: 1 }}>File View</Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={Close} />
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              bgcolor: '#FBFCFE',
              border: 1,
              mx: 1.5,
              borderRadius: 5,
              py: 0.5,
              borderColor: '#EFEFEF'
            }}
          >
            <Typography
              sx={{
                pl: 2,
                fontWeight: 600,
                fontSize: 18,
                pb: 0.5
              }}
            >
              Item Under Service
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', mt: 0.5 }}>
              <Typography sx={{ flex: 0.4, pl: 2, pt: 0.4, fontWeight: 400, fontSize: 14 }}>Item Number</Typography>
              <Box sx={{ flex: 3 }}>
                <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 15 }}>
                  {service_asset_spare}/{service_item_slno.toString().padStart(6, '0')}
                </Chip>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', mt: 0.5 }}>
              <Typography sx={{ flex: 0.4, pl: 2, fontWeight: 400, pt: 0.4, fontSize: 14 }}>Category</Typography>
              <Box sx={{ flex: 3, fontWeight: 500 }}>
                <Chip sx={{ bgcolor: '#EBEFFB' }}>{category_name}</Chip>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', mt: 0.5 }}>
              <Typography sx={{ flex: 0.4, pl: 2, fontWeight: 400, pt: 0.4, fontSize: 14 }}>Item Name</Typography>
              <Box sx={{ flex: 3, fontWeight: 500 }}>
                <Chip sx={{ bgcolor: '#EBEFFB' }}>{item_name}</Chip>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              overflow: 'auto',
              px: 1,
              height: '75vh'
            }}
          >
            {imageServiceUrls.map((imageUrl, index) => (
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
                  borderColor: 'lightgrey'
                }}
              >
                <embed
                  id="pdf-embed"
                  src={imageUrl}
                  type="application/pdf"
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ textAlign: 'right', pb: 1, mr: 1 }}>
            <Button variant="plain" sx={buttonStyle} onClick={Close}>
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(ServiceFileAttach)
