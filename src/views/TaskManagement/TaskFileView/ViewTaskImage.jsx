import React, { Fragment, memo } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Paper } from '@mui/material'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'

const ViewTaskImage = ({ open, handleClose, imageUrls }) => {
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent
          sx={{
            width: '100%',
            height: '60%',
            bgcolor: '#05445E'
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                flex: 1,
                fontWeight: 'bold',
                height: '50px',
                color: 'white',
                fontSize: 20
              }}
            >
              Task
            </Box>
            <Box
              sx={{
                marginLeft: 'auto'
              }}
            >
              <HighlightOffTwoToneIcon
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: '#F7BEC0' }
                }}
                onClick={handleClose}
              />
            </Box>
          </Box>
          <Box sx={{ gap: 5 }}>
            {imageUrls.map((imageUrl, index) => (
              <Paper key={index} sx={{ bgcolor: '#EBEBE8', cursor: 'pointer', height: 700, width: 1000, mb: 1 }}>
                <embed id="pdf-embed" src={imageUrl} type="application/pdf" height={650} width={'100%'} />
              </Paper>
            ))}
          </Box>
          <DialogActions>
            <CssVarsProvider>
              <Button sx={{ color: 'white', fontWeight: 'bold', bgcolor: '#0C2D48' }} onClick={handleClose}>
                Cancel
              </Button>
            </CssVarsProvider>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default memo(ViewTaskImage)
