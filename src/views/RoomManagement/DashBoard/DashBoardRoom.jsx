import { Box, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import DashBoardRoomSort from './DashBoardRoomSort'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { useCallback } from 'react'
import { memo } from 'react'

const DashBoardRoom = ({ floorNo, setRoomList }) => {
  const [roomArry, setRoomArry] = useState([])

  const [xx, setxx] = useState([])
  useEffect(() => {
    const getRoomDash = async (floorNo) => {
      const result = await axioslogin.get(`/getDashboardData/frbyid/${floorNo}`)
      const { success, data } = result.data
      setRoomArry(data)

      const a = data.map((val) => {
        const obj = {
          blockno: val.rm_insidebuilldblock_slno,
          blockname: val.rm_insidebuildblock_name,
        }
        return obj
      })

      const insideBuild = Object.values(
        a.reduce((acc, cur) => Object.assign(acc, { [cur.blockno]: cur }), {}),
      )
      setxx(insideBuild)
      if (success === 2) {
        setRoomArry(data)
      } else {
        warningNotify('error occured')
      }
    }
    getRoomDash(floorNo)
  }, [floorNo])

  const CloseRoom = useCallback(() => {
    setRoomList(0)
  }, [setRoomList])
  return (
    <CardMasterClose title="Room details" close={CloseRoom}>
      <Box>
        <Box sx={{ height: '100%', width: '100%' }}>
          <Box
            sx={{
              width: '80%',
              margin: 'auto',
            }}
          >
            <Paper sx={{ backgroundColor: '#F3F2F2' }}>
              {xx &&
                xx.map((val) => {
                  return (
                    <Box
                      key={val.blockno}
                      sx={{
                        height: '150px',
                        width: '100%',
                        border: '2px',
                        margin: 'auto',
                        textAlign: 'center',
                        pt: 2,
                        pl: 4,
                      }}
                    >
                      {val.blockname}

                      <DashBoardRoomSort blockno={val.blockno} data={roomArry} />
                    </Box>
                  )
                })}
            </Paper>
          </Box>
        </Box>
      </Box>
    </CardMasterClose>
  )
}
export default memo(DashBoardRoom)
