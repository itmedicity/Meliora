import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const RoomUnderLocation = ({ roomNo, setRoomNo }) => {
  const RoomListDeptSecBasd = useSelector(
    state => state.getRoomBasedOnDeptSec?.RoomBasedDeptSectionList
  )
  const [roomList, setRoomList] = useState([{ rm_room_slno: 0, rm_room_name: '' }])
  const [value, setValue] = useState(roomList[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (roomNo !== 0) {
      let newObj = RoomListDeptSecBasd?.find(e => e.rm_room_slno === roomNo)
      setValue(newObj)
    }
  }, [roomNo, RoomListDeptSecBasd])
  // useEffect(() => {
  //     if (value !== null) {
  //         setValue(value)
  //         setRoomNo(value.rm_room_slno)
  //     } else {
  //         setRoomNo(0)
  //     }
  //     return
  // }, [value, setRoomNo, setValue])

  useEffect(() => {
    RoomListDeptSecBasd.length > 0 && setRoomList(RoomListDeptSecBasd)
  }, [RoomListDeptSecBasd])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={roomNo === 0 ? roomList : value}
          placeholder="Select Room"
          clearOnBlur
          onChange={(event, newValue) => {
            setValue(newValue)
            setRoomNo(newValue.rm_room_slno)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
          isOptionEqualToValue={(option, value) => option.rm_room_name === value.rm_room_name}
          getOptionLabel={option => option.rm_room_name || ''}
          options={roomList}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(RoomUnderLocation)
