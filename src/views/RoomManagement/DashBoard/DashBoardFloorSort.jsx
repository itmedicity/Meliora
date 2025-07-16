import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { Paper } from '@mui/material'
import { memo } from 'react'
import { Box, Button } from '@mui/joy'

const DashBoardFloorSort = ({ blockno, data, setFloorNo, setFloorNAme, setRoomList, setbuildblockname }) => {
  const [floorArry, setFloorArry] = useState([])
  useEffect(() => {
    const all = data.filter(val => {
      return val.rm_floor_build_block_slno === blockno
    }, [])
    setFloorArry(all)
  }, [blockno, data])

  const ground = useCallback(
    data => {
      const { rm_floor_slno, rm_buildblock_name, rm_floor_name } = data
      setFloorNo(rm_floor_slno)
      setFloorNAme(rm_floor_name)
      setRoomList(1)
      setbuildblockname(rm_buildblock_name)
    },
    [setFloorNo, setFloorNAme, setRoomList, setbuildblockname]
  )

  return (
    <>
      <Box sx={{ py: 3, width: '100%' }}>
        <Box sx={{ margin: 'auto' }}>
          {floorArry &&
            floorArry.map(val => {
              return (
                <Paper
                  variant="outlined"
                  sx={{
                    textAlign: 'center',
                    border: 1,
                    height: 100,
                    borderColor: 'var(--royal-purple-300)',
                    borderRadius: 0
                  }}
                  key={val.floor_order}
                >
                  <Button
                    onClick={() => ground(val)}
                    value={val.rm_floor_name}
                    sx={{
                      color: 'var(--royal-purple-300)',
                      '&:hover': {
                        backgroundColor: 'var(--royal-purple-50)',
                      },
                      height: '100%'
                    }}
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
    </>
  )
}

export default memo(DashBoardFloorSort)
