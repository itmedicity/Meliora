import React, { useCallback, useEffect, useState, memo } from 'react'
import { Box } from '@mui/material'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'

const DashBoardRoomSort = ({ blockno, data, setRoomNo, setRoomName, setAssetList, setBlockName }) => {
  const [room, setRoom] = useState([])
  useEffect(() => {
    const all = data.filter(val => {
      return val.rm_insidebuilldblock_slno === blockno
    }, [])
    setRoom(all)
  }, [blockno, data])
  const asset = useCallback(
    data => {
      const { rm_room_slno, rm_room_name, rm_insidebuildblock_name } = data
      setRoomNo(rm_room_slno)
      setRoomName(rm_room_name)
      setAssetList(1)
      setBlockName(rm_insidebuildblock_name)
    },
    [setRoomNo, setRoomName, setAssetList, setBlockName]
  )

  return (
    <>
      {room?.map((val, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              margin: 'auto',
              minHeight: 60,
              maxHeight: 80,
              width: { md: '30%', sm: '25%', xs: '16%', lg: '12%' },
              border: 0.5,
              backgroundColor: '#8486F3',
              m: 0.4,
              borderRadius: 2,
              borderColor: 'transparent',
              p: 0.5,
              alignContent: 'space-between'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: 2,
                margin: 'auto',
                fontSize: 12.5,
                fontSmooth: 10,
                fontWeight: 600
              }}
            >
              {val.rm_room_name}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AccountTreeOutlinedIcon sx={{ fontSize: 30 }} onClick={() => asset(val)} value={val.rm_room_name} />
            </Box>
          </Box>
        )
      })}
    </>
  )
}
export default memo(DashBoardRoomSort)
