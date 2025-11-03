import React, { memo, useCallback, useState } from 'react'
import { Typography } from '@mui/material'
import { Box, Chip, CssVarsProvider, Modal, ModalDialog, IconButton } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const ServiceFileAttach = ({
  imageServiceUrls = [],
  serviceimageViewOpen,
  servicefileDetails,
  setimageServiceFlag,
  setServiceimageViewOpen,
  item_name,
  category_name
}) => {



  const { service_asset_spare, service_item_slno } = servicefileDetails
  const [currentIndex, setCurrentIndex] = useState(0)

  const Close = useCallback(() => {
    setServiceimageViewOpen(false);
    setimageServiceFlag(0);
  }, [setServiceimageViewOpen, setimageServiceFlag]);


  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageServiceUrls.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageServiceUrls.length - 1 ? 0 : prev + 1))
  }



  const currentFile = imageServiceUrls[currentIndex]

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
        <ModalDialog variant="outlined" sx={{ p: 0, overflow: 'hidden', width: '90%', height: '90vh' }}>
          {/* --- Header --- */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd',
              px: 2,
              py: 1
            }}
          >
            <Typography level="title-md" fontWeight={600}>
              File Attachments
            </Typography>
            <IconButton
              onClick={Close}
              sx={{
                color: '#555',
                backgroundColor: '#ffffff',
                border: '1px solid #ccc',
                boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color: '#000'
                },
                p: 1
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* --- Item Details Section --- */}
          <Box
            sx={{
              bgcolor: '#FBFCFE',
              borderBottom: '1px solid #EFEFEF',
              px: 2,
              py: 1
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 17, pb: 0.5 }}>Item Under Service</Typography>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ width: '25%', fontSize: 14 }}>Item Number</Typography>
              <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500, fontSize: 15 }}>
                {service_asset_spare}/{service_item_slno?.toString().padStart(6, '0')}
              </Chip>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
              <Typography sx={{ width: '25%', fontSize: 14 }}>Category</Typography>
              <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500 }}>{category_name}</Chip>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography sx={{ width: '25%', fontSize: 14 }}>Item Name</Typography>
              <Chip sx={{ bgcolor: '#EBEFFB', fontWeight: 500 }}>{item_name}</Chip>
            </Box>
          </Box>

          {/* --- File Viewer --- */}
          <Box
            sx={{
              position: 'relative',
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#fafafa',
              overflow: 'hidden'
            }}
          >
            {imageServiceUrls.length > 0 && currentFile ? (
              <>
                {currentFile.imageName.toLowerCase().endsWith('.pdf') ? (
                  <embed
                    src={currentFile.url}
                    type="application/pdf"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: 8
                    }}
                  />
                ) : (
                  <img
                    src={currentFile.url}
                    alt={currentFile.imageName}
                    style={{
                      maxWidth: '90%',
                      maxHeight: '90%',
                      objectFit: 'contain',
                      borderRadius: 8
                    }}
                  />
                )}

                {/* Swipe Arrows */}
                {imageServiceUrls.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrev}
                      sx={{
                        position: 'absolute',
                        left: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'white',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        '&:hover': { bgcolor: '#f0f0f0' }
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>

                    <IconButton
                      onClick={handleNext}
                      sx={{
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'white',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        '&:hover': { bgcolor: '#f0f0f0' }
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </>
                )}
              </>
            ) : (
              <Typography level="body-md" color="neutral">
                No files attached
              </Typography>
            )}
          </Box>


          <Box
            sx={{
              width: '100%',
              textAlign: 'right',
              pr: 3,
              py: 1,
              borderTop: '1px solid #ddd',
              backgroundColor: '#f5f5f5'
            }}
          >
            <Typography fontSize="sm" color="neutral">
              {imageServiceUrls.length > 0
                ? `Attachment (${currentIndex + 1}/${imageServiceUrls.length})`
                : 'No Attachments'}
            </Typography>
          </Box>

        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(ServiceFileAttach)
