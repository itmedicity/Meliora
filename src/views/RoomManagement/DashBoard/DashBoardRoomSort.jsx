import React from 'react'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { memo } from 'react'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'

const DashBoardRoomSort = ({ blockno, data }) => {
  const [room, setRoom] = useState([])
  useEffect(() => {
    const all = data.filter((val) => {
      return val.rm_insidebuilldblock_slno === blockno
    }, [])
    setRoom(all)
  }, [blockno, data])

  return (
    <>
      {room?.map((val, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              height: 60,
              width: { md: '12%', sm: '16%', xs: '16%', lg: '12%' },
              border: 0.5,
              backgroundColor: '#8486F3',
              m: 0.4,
              borderRadius: 2,
              borderColor: 'transparent',
              p: 0.5,
              alignContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: 3,
                fontSize: 12.5,
                fontSmooth: 10,
                fontWeight: 600,
              }}
            >
              {val.rm_room_name}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AccountTreeOutlinedIcon sx={{ fontSize: 30 }} />
            </Box>
          </Box>
        )
      })}
    </>
  )
}
export default memo(DashBoardRoomSort)
