import React, { useEffect, memo, useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'

const ExtraRoomMeliSelect = ({ nurse, setValue, value }) => {
  const [room, setRoom] = useState([])

  useEffect(() => {
    const postdata = {
      ns_code: nurse,
    }
    const getRoom = async () => {
      if (nurse !== 0) {
        const result1 = await axioslogin.post('/delivery/getRoom/nurse', postdata)
        const { succes, dataa } = result1.data
        if (succes === 1) {
          setRoom(dataa)
        } else {
          warningNotify('Error occured contact EDP')
        }
      }
    }
    getRoom()
  }, [nurse])

  return (
    <Box>
      <FormControl fullWidth size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
        >
          <MenuItem value={0} disabled>
            Select Room
          </MenuItem>
          {room &&
            room.map((val, index) => {
              return (
                <MenuItem key={index} value={val.rm_code}>
                  {val.rmc_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(ExtraRoomMeliSelect)
