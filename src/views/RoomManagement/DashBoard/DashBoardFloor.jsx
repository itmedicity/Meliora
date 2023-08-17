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

const DashBoardFloor = ({ buildNo, setFoolrList, campusName }) => {
  const [roomList, setRoomList] = useState(0)
  const [floorNo, setFloorNo] = useState(0)
  const [floorName, setFloorNAme] = useState('')
  const ground = useCallback((data) => {
    const { rm_floor_slno, rm_floor_name } = data
    setFloorNo(rm_floor_slno)
    setFloorNAme(rm_floor_name)
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
        warningNotify('no floor under selected building')
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
        <DashBoardRoom
          floorNo={floorNo}
          setRoomList={setRoomList}
          campusName={campusName}
          floorName={floorName}
        />
      ) : (
        <CardMasterClose title={campusName} close={ClosePage}>
          <Box sx={{ py: 3 }}>
            <Box sx={{ width: '90%', margin: 'auto' }}>
              {floorArry &&
                floorArry.map((val) => {
                  return (
                    <Paper
                      variant="outlined"
                      sx={{
                        // backgroundColor: 'white',
                        textAlign: 'center',
                        border: 1,
                        height: 100,
                        borderColor: 'white',
                        borderRadius: 0,
                      }}
                      key={val.rm_floor_slno}
                    >
                      <Button
                        onClick={() => ground(val)}
                        value={val.rm_floor_name}
                        sx={{ height: '100%' }}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                      >
                        {val.rm_floor_name}
                      </Button>
                    </Paper>
                  )
                })}
            </Box>
          </Box>
        </CardMasterClose>
      )}
    </Fragment>
  )
}

export default memo(DashBoardFloor)
