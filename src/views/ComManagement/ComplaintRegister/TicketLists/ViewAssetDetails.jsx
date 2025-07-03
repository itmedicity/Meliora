import React, { memo, useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, Button, CssVarsProvider, Modal, ModalDialog } from '@mui/joy'
import CancelIcon from '@mui/icons-material/Cancel'

const ViewAssetDetails = ({ assetOpen, setAssetOpen, setAssetflag, valuee, count }) => {
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
  } = valuee

  const [assetDetl, setassetDetl] = useState([])

  useEffect(() => {
    const getAssetinComplaint = async complaint_slno => {
      const result = await axioslogin.get(`/complaintreg/getAssetinComplaint/${complaint_slno}`)
      const { success, data } = result.data
      if (success === 2) {
        setassetDetl(data)
      } else {
        setassetDetl([])
      }
    }
    getAssetinComplaint(complaint_slno)
  }, [complaint_slno, count])

  const Close = useCallback(() => {
    setAssetOpen(false)
    setAssetflag(0)
  }, [setAssetOpen, setAssetflag])

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
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  }
  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={assetOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 1,
          borderRadius: 10,
        }}
      >
        <ModalDialog
          variant="outlined"
          sx={{ width: '65vw', p: 0, overflow: 'auto', height: '80vh' }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1 }}>
              <Box sx={{ flex: 1, color: 'grey' }}>Asset Details Under Complaint</Box>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={Close} />
              </Box>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: 0.5 }}>
              <Box sx={{ flex: 1, pl: 0.5 }}>
                <Typography sx={{ pl: 0.5, fontWeight: 600, color: 'Black' }}>
                  Ticket No.{complaint_slno}
                </Typography>
                <Typography sx={{ pl: 0.5, fontSize: 14, color: 'Black' }}>
                  {complaint_desc}
                </Typography>
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
                <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>
                  {compalint_date}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, mx: 1.5, mt: 1.5, display: 'flex', bgcolor: '#F2ECE5' }}>
              <Box sx={{ flex: 1, textAlign: 'center' }}>#</Box>
              <Box sx={{ flex: 3 }}>Asset Number</Box>
              <Box sx={{ flex: 10 }}>Asset Name</Box>
            </Box>
            {assetDetl.map((val, index) => {
              const formattedSlno = val.item_asset_no_only.toString().padStart(6, '0')
              return (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    mx: 1.5,
                    display: 'flex',
                    borderBottom: 1,
                    borderColor: 'lightgrey',
                    pt: 0.8,
                  }}
                >
                  <Box sx={{ flex: 1, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                  <Box sx={{ flex: 3, fontSize: 13 }}>
                    {val.item_asset_no}/{formattedSlno}
                  </Box>
                  <Box sx={{ flex: 10, fontSize: 13 }}>{val.item_name}</Box>
                </Box>
              )
            })}
          </Box>
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

export default memo(ViewAssetDetails)
