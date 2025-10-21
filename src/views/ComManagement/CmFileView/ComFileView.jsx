import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Modal, ModalDialog, Typography, IconButton, Button } from '@mui/joy'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import FormattedDate from 'src/views/Components/FormattedDate'

const ComFileView = ({ imageUrls = [], imageViewOpen, fileDetails, setimageViewOpen, setimage }) => {
  const {
    complaint_slno,
    complaint_desc,
    compalint_date,
    rm_roomtype_name,
    rm_room_name,
    rm_insidebuildblock_name,
    rm_floor_name,
    location,
    complaint_type_name
  } = fileDetails || {}

  const [files, setFiles] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  /** Prepare file list */
  useEffect(() => {
    if (imageUrls.length > 0) {
      const formatted = imageUrls.map(file => ({
        ...file,
        type: file.imageName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image'
      }))
      setFiles(formatted)
      setCurrentIndex(0)
    } else {
      setFiles([])
    }
  }, [imageUrls])

  /** Close modal */
  const handleClose = useCallback(() => {
    setimageViewOpen(false)
    setimage(0)
  }, [setimageViewOpen, setimage])

  /** Navigation */
  const handlePrev = () => setCurrentIndex(prev => (prev > 0 ? prev - 1 : files.length - 1))
  const handleNext = () => setCurrentIndex(prev => (prev < files.length - 1 ? prev + 1 : 0))
  const currentFile = files[currentIndex]

  return (
    <Modal open={imageViewOpen} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ModalDialog
        sx={{
          overflow: 'hidden',
          width: '80vw',
          height: '90vh',
          p: 0,
          borderRadius: 'md',
          boxShadow: 'lg',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd'
          }}
        >
          {/* Top header with title + close */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1
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

          {/* Ticket details below title */}
          <Box sx={{ px: 2, py: 1, borderTop: '1px solid #ddd' }}>
            <Typography level="body-md" fontWeight={600}>
              Ticket No: {complaint_slno || 'N/A'}
            </Typography>
            <Typography>{complaint_desc}</Typography>
            <Typography fontSize={13}>
              Type: {complaint_type_name} | Location: {location || 'N/A'}
            </Typography>
            {rm_room_name && (
              <Typography fontSize={13}>
                {rm_room_name}
                {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name
                  ? ` (${rm_roomtype_name || ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''
                  }${rm_insidebuildblock_name || ''}${rm_insidebuildblock_name && rm_floor_name ? ' - ' : ''
                  }${rm_floor_name || ''})`
                  : ''}
              </Typography>
            )}
            <Box>
              <FormattedDate date={compalint_date} />
            </Box>


          </Box>
        </Box>

        {/* ===== File Viewer (flexible, large) ===== */}
        <Box sx={{ flexGrow: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', m: 1, }}>
          {files.length > 1 && (
            <IconButton
              onClick={handlePrev}
              sx={{ position: 'absolute', left: 10, zIndex: 10, bgcolor: 'white', '&:hover': { bgcolor: '#f0f0f0' } }}
            >
              <ChevronLeft />
            </IconButton>
          )}

          {currentFile ? (
            currentFile.type === 'application/pdf' ? (
              <embed
                src={currentFile.url}
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ borderRadius: 8 }}
              />
            ) : (
              <img
                src={currentFile.url}
                alt={currentFile.imageName}
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }}
              />
            )
          ) : (
            <Typography>No files found</Typography>
          )}

          {files.length > 1 && (
            <IconButton
              onClick={handleNext}
              sx={{ position: 'absolute', right: 10, zIndex: 10, bgcolor: 'white', '&:hover': { bgcolor: '#f0f0f0' } }}
            >
              <ChevronRight />
            </IconButton>
          )}
        </Box>

        {/* ===== Footer ===== */}
        <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderTop: '1px solid #ccc' }}>
          <Typography>
            Attachments ({files.length > 0 ? currentIndex + 1 : 0}/{files.length})
          </Typography>
          <Button variant="outlined" color="neutral" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

export default memo(ComFileView)








