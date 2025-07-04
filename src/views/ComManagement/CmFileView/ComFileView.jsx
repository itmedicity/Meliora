import React, { memo, useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { Box, Button, CssVarsProvider, Modal, ModalDialog } from '@mui/joy'
import CancelIcon from '@mui/icons-material/Cancel'

const ComFileView = ({ imageUrls, imageViewOpen, fileDetails, setimageViewOpen, setimage }) => {
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
  } = fileDetails

  const [uplodedFile, setUplodedFile] = useState([])

  useEffect(() => {
    if (imageUrls.length > 0) {
      const files = imageUrls.map(file => ({
        url: file,
        type: file.endsWith('.pdf') ? 'pdf' : 'image'
      }))
      setUplodedFile(files)
    } else {
    }
  }, [imageUrls])

  const Close = useCallback(() => {
    setimageViewOpen(false)
    setimage(0)
  }, [setimageViewOpen, setimage])

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
        open={imageViewOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10
        }}
      >
        <ModalDialog variant="outlined" sx={{ p: 0, width: '98%' }}>
          <Box sx={{ flex: 1, display: 'flex', mt: 1, px: 1 }}>
            <Box sx={{ flex: 1, color: 'grey' }}>File View</Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={Close} />
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: 0.5, px: 1 }}>
            <Box sx={{ flex: 1, pl: 0.5 }}>
              <Typography sx={{ pl: 0.5, fontWeight: 600, color: 'Black' }}>Ticket No.{complaint_slno}</Typography>
              <Typography sx={{ pl: 0.5, fontSize: 14, color: 'Black' }}>{complaint_desc}</Typography>
              <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black', py: 0.5 }}>
                Complaint Type: {complaint_type_name}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'right', pr: 1.5 }}>
              <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>{location}</Typography>
              {rm_room_name !== null ? (
                <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>
                  {rm_room_name}
                  {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name
                    ? ` (${rm_roomtype_name ? rm_roomtype_name : ''}${
                        rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''
                      }${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${
                        rm_insidebuildblock_name && rm_floor_name ? ' - ' : ''
                      }${rm_floor_name ? rm_floor_name : ''})`
                    : 'Not Updated'}
                </Typography>
              ) : null}
              <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>{compalint_date}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              overflow: 'auto',
              px: 1,
              height: '70vh'
            }}
          >
            {uplodedFile.map((file, index) => (
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
                onClick={() => setimage(file.url)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '99%'
                  }}
                >
                  {file.type === 'image' ? (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        src={file.url}
                        alt={`Uploaded File ${index}`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          borderRadius: '4px',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                  ) : (
                    <iframe
                      src={file.url}
                      title={`PDF ${index}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '4px'
                      }}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ textAlign: 'right', pb: 2, mr: 2 }}>
            <Button variant="plain" sx={buttonStyle} onClick={Close}>
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(ComFileView)
