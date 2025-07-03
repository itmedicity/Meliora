import React, { memo } from 'react'
import Modal from '@mui/joy/Modal'
import Sheet from '@mui/joy/Sheet'
import { Box, Paper } from '@mui/material'
import Button from '@mui/joy/Button'
import { useCallback } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'

const CloseDetailsModal = ({ open, setOpen, setCloseModalFlag, closeData, setCloseData }) => {
  const { crf_close_remark, crf_closed_one, close_user, close_date } = closeData[0]

  const handleClose = useCallback(() => {
    setOpen(false)
    setCloseModalFlag(0)
    setCloseData([])
  }, [setOpen, setCloseModalFlag, setCloseData])
  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: 700,
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: '30%',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            minHeight: 200,
            maxWidth: 300,
            maxHeight: 700,
          }}
        >
          <Box
            sx={{
              width: '100%',
              flex: 1,
              borderRadius: 1,
              border: '0.1px solid #454545',
              minHeight: 200,
              margin: 'auto',
              height: window.innerHeight - 500,
              overflowX: 'auto',
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <Box sx={{ pt: 0.5 }}>
              <CssVarsProvider>
                <Typography sx={{ fontSize: 16, fontWeight: 700, textAlign: 'center' }}>
                  Closed CRF Details{' '}
                </Typography>
              </CssVarsProvider>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'column',
                  md: 'column',
                  lg: 'column',
                  xl: 'column',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  p: 0.5,
                  flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                }}
              >
                <Box sx={{ width: '25%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Close Remarks:</Typography>
                  </CssVarsProvider>
                </Box>
                <Paper
                  sx={{
                    width: '75%',
                    minHeight: 10,
                    maxHeight: 70,
                    pl: 0.5,
                    fontSize: 15,
                    textTransform: 'capitalize',
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: 'none' },
                  }}
                  variant="none"
                >
                  {crf_close_remark}
                </Paper>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  p: 0.5,
                  flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                }}
              >
                <Box sx={{ width: '25%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Close By:</Typography>
                  </CssVarsProvider>
                </Box>
                <Paper
                  sx={{
                    width: '75%',
                    minHeight: 10,
                    maxHeight: 70,
                    pl: 0.5,
                    fontSize: 15,
                    textTransform: 'capitalize',
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: 'none' },
                  }}
                  variant="none"
                >
                  {crf_closed_one}
                </Paper>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  p: 0.5,
                  flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                }}
              >
                <Box sx={{ width: '25%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Close User:</Typography>
                  </CssVarsProvider>
                </Box>
                <Paper
                  sx={{
                    width: '75%',
                    minHeight: 10,
                    maxHeight: 70,
                    pl: 0.5,
                    fontSize: 15,
                    textTransform: 'capitalize',
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: 'none' },
                  }}
                  variant="none"
                >
                  {close_user}
                </Paper>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  p: 0.5,
                  flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                }}
              >
                <Box sx={{ width: '25%' }}>
                  <CssVarsProvider>
                    <Typography sx={{ fontSize: 15 }}>Close Date:</Typography>
                  </CssVarsProvider>
                </Box>
                <Paper
                  sx={{
                    width: '75%',
                    minHeight: 10,
                    maxHeight: 70,
                    pl: 0.5,
                    fontSize: 15,
                    textTransform: 'capitalize',
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: 'none' },
                  }}
                  variant="none"
                >
                  {close_date}
                </Paper>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" size="md" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(CloseDetailsModal)
