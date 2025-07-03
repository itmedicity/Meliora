import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
const ModalVerifiedDetails = ({ open, handleClose, rowSelect }) => {
  const [viewdata, setViewdata] = useState({
    backup_date_time: '',
    backup_size_before: '',
    backup_size_after: '',
    em_name: '',
    remarks: '',
  })
  const { backup_date_time, backup_size_before, backup_size_after, em_name, remarks } = viewdata
  useEffect(() => {
    if (Object.keys(rowSelect).length !== 0) {
      const formatDateToAMPM = dateString => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = date.getMonth() + 1 // Months are 0-based, so add 1
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
        const formattedDateTime = `${year}-${month}-${day} ${formattedHours}:${formattedMinutes} ${ampm}`
        return formattedDateTime
      }
      const formattedDateTime = formatDateToAMPM(rowSelect.backup_date_time)
      const { backup_size_before, backup_size_after, em_name, remarks } = rowSelect
      const frmdata = {
        backup_date_time: formattedDateTime,
        backup_size_before: (backup_size_before / 1024).toFixed(2),
        backup_size_after: (backup_size_after / 1024).toFixed(2),
        em_name: em_name,
        remarks: remarks === null ? 'Nil' : remarks,
      }
      setViewdata(frmdata)
    } else {
      setViewdata([])
    }
  }, [rowSelect])
  return (
    <Fragment>
      <ToastContainer />
      <Dialog
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-descriptiona"
        maxWidth="lg"
        overflow="hidden"
      >
        <DialogContent id="alert-dialog-slide-descriptiona" overflow="hidden">
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: 1,
              border: '0.1px solid #454545',
              overflow: 'hidden',
            }}
          >
            <Box
              id="alert-dialog-slide-descriptiona"
              sx={{ textAlign: 'center', height: 40, pt: 1 }}
            >
              <Typography style={{ textDecorationLine: 'underline', fontSize: 17 }}>
                {' '}
                Verified Details
              </Typography>
            </Box>
            <Box
              sx={{
                width: 670,
                height: 120,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1, pl: 1 }}>
                    <Typography sx={{ fontSize: 15, color: '#274472' }}>Backup Date </Typography>
                  </Box>
                  <Box sx={{ flex: 3.5 }}>
                    <Typography sx={{ fontSize: 15, color: '#274472' }}>
                      :&nbsp; {backup_date_time}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1, pl: 1 }}>
                    <Typography sx={{ fontSize: 15, color: '#274472' }}> Backup Size </Typography>
                  </Box>
                  <Box sx={{ flex: 3.5, display: 'flex', flexDirection: 'row' }}>
                    <Typography style={{ fontSize: 15, color: '#274472' }}>
                      :&nbsp; Before Compression-&nbsp; {backup_size_before} KB
                    </Typography>
                    <Typography style={{ fontSize: 15, color: '#274472' }}>
                      ,&nbsp; After Compression-&nbsp; {backup_size_after} KB
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1, pl: 1 }}>
                    <Typography sx={{ fontSize: 15, color: '#274472' }}>
                      Verified Employee{' '}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 3.5 }}>
                    <Typography sx={{ fontSize: 15, color: '#274472' }}>
                      :&nbsp; {em_name}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1, pl: 1 }}>
                    <Typography sx={{ fontSize: 15, color: '#274472' }}>Remarks </Typography>
                  </Box>
                  <Box sx={{ flex: 3.5 }}>
                    <Typography sx={{ fontSize: 15, color: '#274472' }}>
                      :&nbsp; {remarks}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
export default memo(ModalVerifiedDetails)
