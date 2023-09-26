import { Typography } from '@mui/material'
import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardMasterClose from 'src/views/Components/CardMasterClose'
import ModalCommunicationDevice from './ModalCommunicationDevice';
import { useState } from 'react';
import { useCallback } from 'react';
// import CommunicationDeviceTable from './CommunicationDeviceTable'

const CommunicationDevice = () => {
  const iconStyle = {
    color: '#0492C2', // Change this to the desired color
  };
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)
  
  const addModal = () => {
    setAddModalFlag(1)
    setaddModalOpen(true)
  }
  const handleClose = useCallback(() => {
    setAddModalFlag(0)
    setaddModalOpen(false)
  },[setAddModalFlag,setaddModalOpen])
  return (
    <CardMasterClose
      // close={backtoSetting}
    >
        {AddModalFlag === 1 ? <ModalCommunicationDevice open={addModalOpen} handleClose={handleClose} /> : null}
      <Typography sx={{ fontWeight: 10, fontSize: 28, fontFamily: 'Anton' }}>Communication Device Details</Typography>
      <Typography sx={{ fontWeight: 5, fontSize: 20, fontFamily: 'Anton' }}>Add&nbsp;
      <AddCircleOutlineIcon style={iconStyle} onClick={() => addModal()}/>
      </Typography>
    {/* <CommunicationDeviceTable/> */}
      </CardMasterClose>
  )
}

export default CommunicationDevice