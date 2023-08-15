import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import { memo } from 'react'

const DashBoardRoomSort = ({ blockno, data }) => {
  const [room, setRoom] = useState([])
  useEffect(() => {
    const all = data.filter((val) => {
      return val.rm_insidebuilldblock_slno === blockno
    }, [])
    setRoom(all)
  }, [blockno, data])

  return (
    <Paper
      sx={{
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        width: '95%',
      }}
    >
      {room &&
        room.map((val) => {
          return (
            <Box
              key={val.rm_room_slno}
              sx={{
                height: '50px',
                width: '100%',
                border: '2px',
                marginTop: '10px',
                pt: 2,
                pl: 4,
              }}
            >
              {val.rm_room_name}
            </Box>
          )
        })}
    </Paper>
  )
}
export default memo(DashBoardRoomSort)
