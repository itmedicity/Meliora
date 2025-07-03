import React, { memo, useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal'
import { Box, CssVarsProvider } from '@mui/joy'
import IconButton from '@mui/joy/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const FileView = ({ open, handleClose, images }) => {
  const [disArry, setDissArry] = useState([])
  useEffect(() => {
    if (images.length !== 0) {
      const disimage = images.map(val => {
        const parts = val.split('/')
        const fileNamePart = parts[parts.length - 1]
        const obj = {
          imageName: fileNamePart,
          url: val,
        }
        return obj
      })
      setDissArry(disimage)
    }
  }, [images])
  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            background: 'linear-gradient(135deg, #f0f0f0 30%, #ffffff 100%)',
            borderRadius: 5,
            px: 2,
            py: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
            width: '70vw',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#555',
              backgroundColor: '#ffffff',
              border: '1px solid #ccc',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '50%',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                color: '#000',
              },
              p: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ height: '80vh', overflow: 'auto' }}>
            {disArry &&
              disArry.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 2,
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fafafa',
                    width: '68vw',
                  }}
                >
                  {value.imageName.endsWith('.pdf') ? (
                    <embed
                      src={value.url}
                      type="application/pdf"
                      style={{
                        width: '100%',
                        height: '690px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                      }}
                    />
                  ) : (
                    <img
                      alt=""
                      src={value.url}
                      style={{
                        width: '100%',
                        height: '500px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                      }}
                    />
                  )}
                </Box>
              ))}
          </Box>
        </Box>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(FileView)
