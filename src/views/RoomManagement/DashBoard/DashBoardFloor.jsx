import { Box, Button, Paper } from '@mui/material'
import React from 'react'
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import DashBoardRoom from './DashBoardRoom'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { memo } from 'react'

const DashBoardFloor = ({ buildNo, setFoolrList }) => {
  const [roomList, setRoomList] = useState(0)
  const [floorNo, setFloorNo] = useState(0)

  const ground = useCallback((no) => {
    setFloorNo(no)
    setRoomList(1)
  }, [])

  const [floorArry, setFloorArry] = useState([])
  useEffect(() => {
    const getFloorDash = async (buildNo) => {
      const result = await axioslogin.get(`/getDashboardData/getfloorbsedoncampus/${buildNo}`)
      const { success, data } = result.data

      if (success === 2) {
        setFloorArry(data)
      } else {
        warningNotify('error occured')
      }
    }
    getFloorDash(buildNo)
  }, [buildNo])

  const ClosePage = useCallback(() => {
    setFoolrList(0)
  }, [setFoolrList])

  return (
    <Fragment>
      {roomList === 1 ? (
        <DashBoardRoom floorNo={floorNo} setRoomList={setRoomList} />
      ) : (
        <CardMasterClose title="Floor" close={ClosePage}>
          <Box>
            <Box sx={{ height: '50%', width: '100%' }}>
              <Box sx={{ width: '80%', margin: 'auto' }}>
                {floorArry &&
                  floorArry.map((val) => {
                    return (
                      <Paper
                        sx={{
                          backgroundColor: 'white',
                          textAlign: 'center',
                          border: '5px',
                          height: '55px',
                          borderColor: 'grey',
                        }}
                        key={val.rm_floor_slno}
                      >
                        <Button onClick={() => ground(val.rm_floor_slno)} value={val.rm_floor_name}>
                          {val.rm_floor_name}
                        </Button>
                      </Paper>
                    )
                  })}
              </Box>
            </Box>
          </Box>
        </CardMasterClose>
      )}
    </Fragment>
  )
}

export default memo(DashBoardFloor)
