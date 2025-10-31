import React, { memo, useCallback, useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, Button, CssVarsProvider, Modal, ModalDialog, Textarea } from '@mui/joy'
import CancelIcon from '@mui/icons-material/Cancel'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CmHoldReasonList from '../../CmComponent/CmHoldReasonList'
import { useQueryClient } from '@tanstack/react-query'

const MarkAsHoldModal = ({ holdOpen, setHoldOpen, setHoldflag, holdData, count, setCount }) => {
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
  } = holdData

  const [hold, sethold] = useState(true)
  const [pendholdreason, setPendhold] = useState('')
  const [holdReason, setHoldReason] = useState(0)

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const queryClient = useQueryClient()
  const updatePendhold = useCallback(e => {
    setPendhold(e.target.value)
  }, [])

  const Close = useCallback(() => {
    setHoldOpen(false)
    setHoldflag(0)
  }, [setHoldOpen, setHoldflag])

  const updateOnhold = useCallback(e => {
    if (e.target.checked === true) {
      sethold(true)
    } else {
      sethold(false)
    }
  }, [])

  const patchData = useMemo(() => {
    return {
      compalint_status: 1,
      cm_rectify_status: hold === true ? 'O' : null,
      rectify_pending_hold_remarks: pendholdreason,
      pending_onhold_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      pending_onhold_user: id,
      complaint_slno: complaint_slno,
      cm_hold_reason_slno: holdReason
    }
  }, [pendholdreason, complaint_slno, holdReason, hold, id])

  const submit = useCallback(
    e => {
      e.preventDefault()
      const statusUpdate = async patchData => {
        const result = await axioslogin.patch(`/Rectifycomplit/updateHoldProgress`, patchData)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          queryClient.invalidateQueries('getAllPendingEmployeeTickets');
          Close()
        } else if (success === 0) {
          infoNotify(message)
          Close()
        } else {
          infoNotify(message)
          Close()
        }
      }
      if ((hold === true) & (pendholdreason !== '')) {
        statusUpdate(patchData)
      } else {
        infoNotify(' Please Mark your Hold Reason/Remarks')
      }
    },
    [patchData, Close, count, setCount, pendholdreason, hold, queryClient]
  )

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
        open={holdOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10
        }}
      >
        <ModalDialog variant="outlined" sx={{ width: '43vw', p: 0, overflow: 'auto' }}>
          <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1 }}>
            <Box sx={{ flex: 1, color: 'grey' }}>Keep In hold/Mark as progress</Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={Close} />
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: 0.5 }}>
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
                    ? ` (${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''
                    }${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${rm_insidebuildblock_name && rm_floor_name ? ' - ' : ''
                    }${rm_floor_name ? rm_floor_name : ''})`
                    : 'Not Updated'}
                </Typography>
              ) : null}
              <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>{compalint_date}</Typography>
            </Box>
          </Box>

          <Box>
            <Box sx={{ pt: 3, pl: 2.5 }}>
              <CusCheckBox
                label="On Hold"
                color="neutral"
                size="md"
                name="hold"
                value={hold}
                checked={hold}
                onCheked={updateOnhold}
              />
            </Box>
            <Box sx={{ px: 2 }}>
              <CmHoldReasonList holdReason={holdReason} setHoldReason={setHoldReason} />
            </Box>
            <Box sx={{ mx: 2, mt: 0.8 }}>
              <Textarea
                style={{ width: '100%' }}
                minRows={3}
                placeholder="Hold Remarks"
                onChange={updatePendhold}
                value={pendholdreason === null ? '' : pendholdreason}
              />
            </Box>
          </Box>

          <Box sx={{ textAlign: 'right', pb: 1, mr: 1 }}>
            <Button variant="plain" sx={buttonStyle} onClick={submit}>
              Save
            </Button>
            <Button variant="plain" sx={buttonStyle} onClick={Close}>
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(MarkAsHoldModal)
