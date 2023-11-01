import { Box, Paper } from '@mui/material'
import React, { useEffect, useState, memo, useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import DashBoardRoomSort from './DashBoardRoomSort'
import DashBoardRoomAsset from './DashBoardRoomAsset'

const DashBoardRoom = ({ floorNo, setRoomList, campusName, floorName, buildblockname }) => {
  const [roomArry, setRoomArry] = useState([])
  const [assetList, setAssetList] = useState(0)
  const [roomNo, setRoomNo] = useState(0)
  const [roomMain, setRoomMain] = useState([])
  const [roomName, setRoomName] = useState('')
  const [blockName, setBlockName] = useState('')
  useEffect(() => {
    const getRoomDash = async (floorNo) => {
      const result = await axioslogin.get(`/getDashboardData/frbyid/${floorNo}`)
      const { success, data } = result.data
      if (success === 2) {
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
        setRoomMain(insideBuild)
      } else {
        warningNotify('No Room under selected building')
      }
    }
    getRoomDash(floorNo)
  }, [floorNo])

  const CloseRoom = useCallback(() => {
    setRoomList(0)
  }, [setRoomList])
  return (
    <>
      {assetList === 1 ? (
        <DashBoardRoomAsset
          RoomNo={roomNo}
          setAssetList={setAssetList}
          campusName={campusName}
          floorName={floorName}
          buildblockname={buildblockname}
          roomName={roomName}
          blockName={blockName}
        />
      ) : (
        <CardMasterClose
          title={campusName + '/' + buildblockname.toLowerCase() + '/' + floorName.toLowerCase()}
          close={CloseRoom}
        >
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
            }}
          >
            <Paper sx={{ overflow: 'hidden', px: 1 }} variant="outlined">
              {roomMain &&
                roomMain.map((val) => {
                  return (
                    <Paper
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
                          width: "100%",
                          flexDirection: 'row',
                          overflow: 'hidden',
                          flexWrap: 'wrap',
                        }}
                      >
                        <DashBoardRoomSort blockno={val.blockno}
                          data={roomArry}
                          campusName={campusName}
                          setRoomNo={setRoomNo}
                          setRoomName={setRoomName}
                          setAssetList={setAssetList}
                          setBlockName={setBlockName}
                          buildblockname={buildblockname}
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
export default memo(DashBoardRoom)
