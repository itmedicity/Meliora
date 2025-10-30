import React, { memo, useCallback, useState } from 'react'
import { Typography } from '@mui/material'
import CustomTextarea from 'src/views/Components/CustomTextarea'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, Button, CssVarsProvider, Modal, ModalDialog } from '@mui/joy'
import { format } from 'date-fns'
import _ from 'underscore'
import { useSelector } from 'react-redux'

const AcceptOrRejectAssistRequest = ({ open, setOpen, reqDetails, count, setCount, setAssistflag }) => {
  const {
    complaint_slno,
    complaint_desc,
    compalint_date,
    rm_roomtype_name,
    rm_room_name,
    rm_insidebuildblock_name,
    rm_floor_name,
    location,
    complaint_type_name,
    em_name,
    assist_assign_date
  } = reqDetails

  const [remark, setRemark] = useState('')
  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const [reason, setReason] = useState(0)

  const updateRemark = useCallback(
    e => {
      setRemark(e.target.value)
    },
    [setRemark]
  )

  const Close = useCallback(() => {
    setAssistflag(0)
    setOpen(false)
  }, [setAssistflag, setOpen])

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
  const AssistantAccepted = useCallback(() => {
    const postData = {
      assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      assist_receive: 1,
      complaint_slno: complaint_slno,
      assigned_emp: id
    }
    const assistant = async postData => {
      const result = await axioslogin.patch('/complaintassign/assistant/recieved', postData)
      const { message, success } = result.data
      if (success === 1) {
        succesNotify(message)
        setCount(count + 1)
        Close()
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    assistant(postData)
  }, [id, Close, complaint_slno, setCount, count])

  const Rjected = useCallback(() => {
    setReason(1)
  }, [])

  const AssistanceRjected = useCallback(() => {
    const postData = {
      assist_flag: 2,
      assist_req_reject_reason: remark,
      complaint_slno: complaint_slno,
      assigned_emp: id
    }
    const assistantReject = async postData => {
      const result = await axioslogin.patch('/complaintassign/assistant/reject', postData)
      const { message, success } = result.data
      if (success === 1) {
        succesNotify(message)
        setCount(count + 1)
        Close()
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    if (remark !== '') {
      assistantReject(postData)
    } else {
      infoNotify('Please Update Reason to Reject the Assist Request')
    }
  }, [id, complaint_slno, count, Close, setCount, remark])

  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10
        }}
      >
        <ModalDialog variant="outlined" sx={{ width: '50vw', p: 0, overflow: 'auto' }}>
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Typography sx={{ fontWeight: 600, pl: 0.8, pt: 1, color: 'grey' }}>
              Accept/Reject Assist Request
            </Typography>
          </Box>
          <Box sx={{ flex: 1, pl: 1, bgcolor: '#ECEDEF', display: 'flex' }}>
            <Box sx={{ flex: 2 }}>
              <Typography sx={{ pl: 0.5, fontWeight: 600, color: 'Black' }}>Ticket No.{complaint_slno}</Typography>
              <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black', py: 0.5 }}>Complaint Type:</Typography>
              <Typography sx={{ fontSize: 13, color: 'Black', pl: 0.5 }}>{complaint_type_name}</Typography>
            </Box>

            <Box sx={{ flex: 1, textAlign: 'right', pr: 1 }}>
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
              <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>
                {compalint_date ? format(new Date(compalint_date), 'dd MMM yyyy,  hh:mm a') : 'Invalid Date'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, pl: 2 }}>
            <Typography sx={{ pb: 0.3, fontWeight: 600, color: 'Black' }}>Description</Typography>
            <Typography sx={{ pl: 0.5, fontSize: 15, color: 'Black', pt: 0.3 }}>{complaint_desc}</Typography>
          </Box>

          <Box sx={{ flex: 1, pl: 2 }}>
            <Typography sx={{ pb: 0.3, fontWeight: 600, color: 'Black' }}>Request From,</Typography>
            <Typography sx={{ fontSize: 13, color: 'Black' }}>{em_name}</Typography>
            <Typography sx={{ fontSize: 13, color: 'Black' }}>
              {assist_assign_date ? format(new Date(assist_assign_date), 'dd MMM yyyy,  hh:mm a') : 'Invalid Date'}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: 1.5 }}>
            {reason !== 1 ? (
              <Button size="md" variant="solid" color="success" sx={{ mx: 1 }} onClick={AssistantAccepted}>
                Accept
              </Button>
            ) : null}
            {reason !== 1 ? (
              <Button size="md" variant="solid" color="danger" sx={{ mx: 1 }} onClick={Rjected}>
                Reject
              </Button>
            ) : null}
          </Box>

          {reason === 1 ? (
            <Box sx={{ flex: 1, textAlign: 'center', mx: 3 }}>
              <Typography sx={{ fontWeight: 600, pb: 0.3, textAlign: 'left' }}>Reason to Reject</Typography>
              <CustomTextarea
                style={{ width: '100%' }}
                minRows={2}
                placeholder="Remarks"
                name="remark"
                value={remark}
                onchange={updateRemark}
              />

              <Button size="md" variant="solid" color="danger" sx={{ mx: 1, width: 100 }} onClick={AssistanceRjected}>
                Reject
              </Button>
            </Box>
          ) : null}

          <Box sx={{ textAlign: 'right', pb: 1, mr: 1 }}>
            <Button variant="plain" sx={buttonStyle} onClick={Close}>
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  )
}

export default memo(AcceptOrRejectAssistRequest)
