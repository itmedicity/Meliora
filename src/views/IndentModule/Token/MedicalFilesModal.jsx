import { Box, Modal, Typography, IconButton, Button, Stack, Divider } from '@mui/joy'
import React, { memo, useState, useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import DivisionSelect from 'src/views/CommonSelectCode/DivisionSelect'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MedicalFilesMainModal from './MedicalFilesMainModal'
import { warningNotify } from 'src/views/Common/CommonCode';
import { useQuery } from '@tanstack/react-query';
import { getDeptTokenCount } from 'src/api/masterApi';

const MedicalFilesModal = ({ open, onClose, loginDetails, tokenCount, selectedDate, bookedTokenCount }) => {
  const [selectedDivision, setSelectedDivision] = useState(0)
  const [openMainModal, setOpenMainModal] = useState(false)

  const { data: deptTokenCount = 0 } = useQuery({
    queryKey: ['getDeptTokenCount', selectedDate, selectedDivision],
    queryFn: () => getDeptTokenCount(selectedDate, selectedDivision),
    enabled: !!selectedDate && selectedDivision > 0,
  })
  console.log(deptTokenCount, "deptTokenCount");

  const availableTokens = Math.max(0, 2 - deptTokenCount)

  const handleConfirm = useCallback(() => {
    if (selectedDivision > 0) {
      if (deptTokenCount >= 2) {
        warningNotify("token over")
        setOpenMainModal(false);

        return
      }
      setOpenMainModal(true);
    } else {
      warningNotify("Select Department")
      setOpenMainModal(false);
    }
  }, [selectedDivision, deptTokenCount])
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.body',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            outline: 'none',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography level="h4" sx={{ fontWeight: 700, color: '#1E293B' }}>
              Book Token
            </Typography>
            <IconButton size="sm" variant="plain" color="neutral" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Token Statistics */}
          <Stack direction="row" spacing={2}>
            <Box
              sx={{
                flex: 1,
                p: 1.5,
                borderRadius: '12px',
                bgcolor: '#EEF2FF',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              <ConfirmationNumberIcon sx={{ color: '#4F46E5' }} />
              <Box>
                <Typography level="body-xs" sx={{ color: '#64748B' }}>
                  Total Tokens
                </Typography>
                <Typography level="title-md" sx={{ fontWeight: 700 }}>
                  {tokenCount?.token_number}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                p: 1.5,
                borderRadius: '12px',
                bgcolor: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              <CheckCircleIcon sx={{ color: '#059669' }} />
              <Box>
                <Typography level="body-xs" sx={{ color: '#64748B' }}>
                  Booked Tokens
                </Typography>
                <Typography level="title-md" sx={{ fontWeight: 700 }}>
                  {bookedTokenCount}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            {selectedDivision > 0 && (
              <>
                <Box
                  sx={{
                    flex: 1,
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: '#FFF7ED',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <ConfirmationNumberIcon sx={{ color: '#EA580C' }} />
                  <Box>
                    <Typography level="body-xs">
                      Division Tokens
                    </Typography>
                    <Typography level="title-md" sx={{ fontWeight: 700 }}>
                      2
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: '#ECFDF5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <AccountBalanceWalletIcon sx={{ color: '#059669' }} />
                  <Box>
                    <Typography level="body-xs">
                      Available Division Tokens
                    </Typography>
                    <Typography level="title-md" sx={{ fontWeight: 700 }}>
                      {availableTokens}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Stack>
          <Divider sx={{ my: 0.5 }} />

          {/* Form Content */}
          <Box sx={{ py: 1 }}>
            <DivisionSelect value={selectedDivision} setValue={setSelectedDivision} />
          </Box>

          <Divider sx={{ my: 0.5 }} />

          {/* Footer Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={onClose}
              sx={{
                borderRadius: '10px',
                fontWeight: 600,
                px: 3
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={handleConfirm}
              sx={{
                borderRadius: '10px',
                fontWeight: 600,
                px: 3,
                background: 'linear-gradient(135deg, #7c51a1, #6d5391ff)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #875db5, #6e3f9e)',
                }
              }}
            >
              Confirm
            </Button>
          </Stack>
        </Box>


      </Modal>
      {openMainModal && (
        <MedicalFilesMainModal
          open={openMainModal}
          onClose={() => setOpenMainModal(false)}
          onSuccess={() => {
            setOpenMainModal(false)
            onClose()
          }}
          selectedDivision={selectedDivision}
          loginDetails={loginDetails}
          tokenCount={tokenCount}
          selectedDate={selectedDate}
        />
      )}
    </>

  )
}

export default memo(MedicalFilesModal)

