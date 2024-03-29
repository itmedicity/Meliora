import { Box, Tooltip } from '@mui/material'
import { Typography } from '@mui/joy'
import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardMasterClose from 'src/views/Components/CardMasterClose'
import ModalCommunicationDevice from './ModalCommunicationDevice';
import { useState } from 'react';
import { useCallback } from 'react';
import CommunicationDeviceTable from './CommunicationDeviceTable'
import { CssVarsProvider } from '@mui/joy';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { memo } from 'react';
import CommunicationModalEdit from './CommunicationModalEdit';

const CommunicationDevice = () => {
  const iconStyle = {
    color: '#0492C2',
  };
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)
  const [editModalOpen, seteditModalOpen] = useState(false)
  const [editModalFlag, seteditModalFlag] = useState(0)
  const [getarry, setgetarry] = useState([])
  const [editFlag, setEditFalg] = useState(0)
  const [count, setCount] = useState(0)
  const history = useHistory()

  const addModal = () => {
    setAddModalFlag(1)
    setaddModalOpen(true)

  }
  const handleClose = useCallback(() => {
    setAddModalFlag(0)
    seteditModalFlag(0)
    seteditModalOpen(false)
    setaddModalOpen(false)
  }, [setAddModalFlag, setaddModalOpen, seteditModalFlag, seteditModalOpen])

  const rowSelect = useCallback((value) => {
    setgetarry(value)
    setEditFalg(1)
    seteditModalFlag(1)
    seteditModalOpen(true)
  }, [setgetarry])
  const backtoSetting = useCallback(() => {
    history.push('/Home/DashboardBackup')
  }, [history])

  return (
    <Box  >
      <CardMasterClose
        close={backtoSetting}
      >
        {AddModalFlag === 1 ? <ModalCommunicationDevice open={addModalOpen} handleClose={handleClose} setCount={setCount}
          count={count}
          editFlag={editFlag} /> : null}
        {editModalFlag === 1 ? <CommunicationModalEdit open={editModalOpen} handleClose={handleClose}
          setCount={setCount}
          count={count}
          getarry={getarry}
          editFlag={editFlag} /> : null}
        <Typography sx={{ fontWeight: 520, fontSize: 30, fontFamily: 'Georgia', color: '#003060' }}>Communication Device Details</Typography>
        <Typography sx={{ fontWeight: 5, fontSize: 21, fontFamily: 'Georgia', color: '#0492C2' }}>Add&nbsp;
          <Tooltip title="Add " placement="top">
            <AddCircleOutlineIcon sx={{ cursor: 'pointer' }} style={iconStyle} onClick={() => addModal()} />
          </Tooltip>
        </Typography>&nbsp;
        <CssVarsProvider>
          <CommunicationDeviceTable
            rowSelect={rowSelect}
            count={count}
          />
        </CssVarsProvider>
      </CardMasterClose>
    </Box>
  )
}
export default memo(CommunicationDevice)