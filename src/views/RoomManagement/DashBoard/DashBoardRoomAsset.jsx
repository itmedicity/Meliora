import { Box, Paper } from '@mui/material'
import React, { useCallback, memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import DashRoomAssetList from './DashRoomAssetList'

const DashBoardRoomAsset = ({ campusName, buildblockname, floorName, roomName, setAssetList, blockName, RoomNo }) => {
  const [subroomArry, setSubroomarry] = useState([])
  const [RoomAssetList, setRoomAsset] = useState([])

  useEffect(() => {
    const getSubRoom = async RoomNo => {
      const result = await axioslogin.get(`/getDashboardData/getSubRoom/${RoomNo}`)
      const { success, data } = result.data
      if (success === 2) {
        setSubroomarry(data)
      } else {
        warningNotify('No Room under selected building')
      }
    }

    const getRoomAsset = async RoomNo => {
      const result = await axioslogin.get(`/getDashboardData/getRoomAsset/${RoomNo}`)
      const { success, data } = result.data
      if (success === 2) {
        const datas = data.map((val, index) => {
          const obj = {
            slno: index + 1,
            am_item_map_slno: val.am_item_map_slno,
            category_name: val.category_name,
            cus_primary: val.cus_primary,
            cus_second: val.cus_second,
            item_name: val.item_name,
            rm_room_name: val.rm_room_name,
            subroom_name: val.subroom_name,
            item_subroom_slno: val.item_subroom_slno
          }
          return obj
        })
        setRoomAsset(datas)
      } else {
        warningNotify('No Room under selected building')
      }
    }
    getSubRoom(RoomNo)
    getRoomAsset(RoomNo)
  }, [RoomNo])

  const CloseRoom = useCallback(() => {
    setAssetList(0)
  }, [setAssetList])

  return (
    <CardMasterClose
      title={
        campusName +
        '/' +
        buildblockname?.toLowerCase() +
        '/' +
        floorName?.toLowerCase() +
        '/' +
        blockName?.toLowerCase() +
        '/' +
        roomName?.toLowerCase()
      }
      close={CloseRoom}
    >
      <Box sx={{ width: '100%', margin: 'auto' }}>
        <Paper sx={{ overflow: 'hidden', p: 0.5 }} variant="outlined">
          <Box
            sx={{
              backgroundColor: 'ButtonFace',
              textTransform: 'capitalize',
              fontFamily: 'cursive',
              fontSize: 15,
              textAlign: 'left',
              pl: 2,
              border: 0.2,
              borderColor: 'transparent',
              borderBottomColor: 'lightgrey'
            }}
          >
            Sub Rooms
          </Box>
          {subroomArry &&
            subroomArry.map(val => {
              return (
                <Box
                  key={val.subroom_slno}
                  sx={{
                    display: 'flex',
                    margin: 'auto',
                    minHeight: 60,
                    maxHeight: 80,
                    width: { md: '30%', sm: '25%', xs: '16%', lg: '12%' },
                    border: 0.5,
                    backgroundColor: 'var(--royal-purple-200)',
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
                      fontWeight: 600,
                      justifyContent: 'center'
                    }}
                  >
                    {val.subroom_name?.toUpperCase()}
                  </Box>
                </Box>
              )
            })}
        </Paper>

        <Paper sx={{ overflow: 'hidden', pt: 1 }} variant="outlined">
          <Box
            sx={{
              backgroundColor: 'ButtonFace',
              textTransform: 'capitalize',
              fontFamily: 'cursive',
              fontSize: 15,
              textAlign: 'left',
              pl: 2,
              border: 0.2,
              borderColor: 'transparent',
              borderBottomColor: 'lightgrey'
            }}
          >
            Asset Details
          </Box>
          <DashRoomAssetList RoomAssetList={RoomAssetList} />
        </Paper>
      </Box>
    </CardMasterClose>
  )
}
export default memo(DashBoardRoomAsset)
