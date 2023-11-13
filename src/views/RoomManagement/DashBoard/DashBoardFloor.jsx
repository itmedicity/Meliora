import { Box, Paper } from '@mui/material'
import React, { useCallback, useState, useEffect, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import DashBoardFloorSort from './DashBoardFloorSort'
import DashBoardRoom from './DashBoardRoom'

const DashBoardFloor = ({ buildNo, setFoolrList, campusName }) => {
  const [roomList, setRoomList] = useState(0)
  const [floorNo, setFloorNo] = useState(0)
  const [floorName, setFloorNAme] = useState('')
  const [buildblockname, setbuildblockname] = useState('')
  const [floormain, setFloor] = useState([])
  const [floorArry, setFloorArry] = useState([])
  useEffect(() => {
    const getFloorDash = async (buildNo) => {
      const result = await axioslogin.get(`/getDashboardData/getfloorbsedoncampus/${buildNo}`)
      const { success, data } = result.data
      if (success === 2) {
        setFloorArry(data)
        const a = data.map((val) => {
          const obj = {
            blockno: val.rm_floor_build_block_slno,
            blockname: val.rm_buildblock_name,
          }
          return obj
        })
        const insideBuild = Object.values(
          a.reduce((acc, cur) => Object.assign(acc, { [cur.blockno]: cur }), {}),
        )
        setFloor(insideBuild)
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
    <>
      {roomList === 1 ? (
        <DashBoardRoom
          floorNo={floorNo}
          setRoomList={setRoomList}
          campusName={campusName}
          floorName={floorName}
          buildblockname={buildblockname}
        />
      ) : (
        <CardMasterClose title={campusName} close={ClosePage}>
          <Box
            sx={{
              width: '95%',
              margin: 'auto',
            }}
          >
            <Paper sx={{ overflow: 'hidden', px: 1 }} variant="outlined">
              {floormain &&
                floormain.map((val) => {
                  return (
                    <Paper
                      variant="outlined"
                      key={val.blockno}
                      sx={{
                        minHeight: 50,
                        margin: 'auto',
                        textAlign: 'center',
                        my: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: 'ButtonFace',
                          textTransform: 'capitalize',
                          fontFamily: 'cursive',
                          fontSize: 13,
                          textAlign: 'left',
                          pl: 2,
                          border: 0.2,
                          borderColor: 'transparent',
                          borderBottomColor: 'lightgrey',
                        }}
                      >
                        {val?.blockname?.toLowerCase()}
                      </Box>
                      <Box
                        padding={0.5}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          overflow: 'hidden',
                          flexWrap: 'wrap',
                        }}
                      >
                        <DashBoardFloorSort
                          blockno={val.blockno}
                          data={floorArry}
                          campusName={campusName}
                          setFloorNo={setFloorNo}
                          setFloorNAme={setFloorNAme}
                          setRoomList={setRoomList}
                          setbuildblockname={setbuildblockname}
                        />
                      </Box>
                    </Paper>
                  )
                })}
            </Paper>
          </Box>
        </CardMasterClose>
      )}
    </>
  )
}

export default memo(DashBoardFloor)
