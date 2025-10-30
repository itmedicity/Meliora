import React, { useState } from 'react'
import { Box, Sheet, Button, IconButton, Modal } from '@mui/joy'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { taskColor } from 'src/color/Color'

const ViewTaskImage = ({ open, handleClose, imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageUrls.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < imageUrls.length - 1 ? prev + 1 : 0))
  }

  const currentFile = imageUrls[currentIndex]

  return (
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
          width: '70vw',
          borderRadius: 'sm',
          p: 2,
          boxShadow: 'lg',
          height: window.innerHeight - 100,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ py: 1, fontWeight: 600, color: taskColor.darkPurple, textAlign: 'center' }}>
          Attachments ({currentIndex + 1}/{imageUrls.length})
        </Box>

        {/* Viewer Area */}
        <Box
          sx={{
            flexGrow: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            border: '0.5px solid #ccc',
            mx: 1,
            overflow: 'hidden'
          }}
        >
          {/* Left Arrow */}
          {imageUrls.length > 1 && (
            <IconButton
              variant="soft"
              color="neutral"
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: 10,
                zIndex: 10,
                bgcolor: 'white',
                '&:hover': { bgcolor: '#f0f0f0' }
              }}
            >
              <ChevronLeft />
            </IconButton>
          )}

          {/* File Display */}
          {currentFile ? (
            currentFile.imageName.endsWith('.pdf') ? (
              <embed
                src={currentFile.url}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ borderRadius: 8 }}
              />
            ) : (
              <img
                alt={currentFile.imageName}
                src={currentFile.url}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: 8,
                  objectFit: 'contain'
                }}
              />
            )
          ) : (
            <Box>No attachments found</Box>
          )}

          {/* Right Arrow */}
          {imageUrls.length > 1 && (
            <IconButton
              variant="soft"
              color="neutral"
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 10,
                zIndex: 10,
                bgcolor: 'white',
                '&:hover': { bgcolor: '#f0f0f0' }
              }}
            >
              <ChevronRight />
            </IconButton>
          )}
        </Box>

        {/* Footer Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="secondary" size="md" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Sheet>
    </Modal>
  )
}

export default ViewTaskImage
