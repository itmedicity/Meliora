import React, { memo, useEffect, useState, useCallback } from 'react'
import Modal from '@mui/joy/Modal'
import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const FileView = ({ open, handleClose, images = [] }) => {

  const [disArry, setDissArry] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)


  useEffect(() => {
    if (images && images.length > 0) {
      const formatted = images.map(val => {
        const url =
          val?.url || (val?.blob ? URL.createObjectURL(val.blob) : null)
        if (!url) return null
        return {
          imageName: val.imageName || 'Untitled',
          url,
          type: val?.blob?.type || ''
        }
      }).filter(Boolean)

      setDissArry(formatted)
      setCurrentIndex(0)
    } else {
      setDissArry([])
    }
  }, [images])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? disArry.length - 1 : prev - 1))
  }, [disArry])

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === disArry.length - 1 ? 0 : prev + 1))
  }, [disArry])

  const currentFile = disArry[currentIndex]

  return (
    <CssVarsProvider>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(5px)'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            background: 'white',
            borderRadius: 4,
            p: 0,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            width: '85vw',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* ===== Header ===== */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #ddd',
              px: 2, py: 1

            }}
          >
            <Typography level="title-md" fontWeight={600}>
              File Attachments
            </Typography>
            <IconButton
              onClick={handleClose}
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
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              backgroundColor: '#fafafa'
            }}
          >
            {/* Prev Button */}
            {disArry.length > 1 && (
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 15,
                  zIndex: 10,
                  bgcolor: '#eaeaea',
                  '&:hover': { bgcolor: '#ddd' }
                }}
              >
                <ChevronLeft />
              </IconButton>
            )}

            {/* Next Button */}
            {disArry.length > 1 && (
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 15,
                  zIndex: 10,
                  bgcolor: '#eaeaea',
                  '&:hover': { bgcolor: '#ddd' }
                }}
              >
                <ChevronRight />
              </IconButton>
            )}

            {/* File Display */}
            {currentFile && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #ccc',
                  background: '#fff',
                  m: 3,
                  height: 'calc(100% - 40px)'
                }}
              >
                {currentFile.type === 'application/pdf' ? (
                  <iframe
                    src={`${currentFile.url}#view=FitH`}
                    title={currentFile.imageName}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                  />
                ) : (
                  <img
                    alt={currentFile.imageName}
                    src={currentFile.url}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                )}
              </Box>
            )}
          </Box>

          {/* ===== Footer ===== */}
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
              {disArry.length > 0
                ? `Attachment (${currentIndex + 1}/${disArry.length})`
                : 'No Attachments'}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(FileView)

