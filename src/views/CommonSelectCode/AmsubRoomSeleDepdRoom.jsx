import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { useDispatch } from 'react-redux'

const AmsubRoomSeleDepdRoom = ({ subRoomNo, setSubRoomNo, setSubRoomName }) => {
  const dispatch = useDispatch()
  const SubRoomListRoomBasd = useSelector(
    state => state.getSubRoomBasedOnRoom?.SubRoomBasedRoomList
  )
  const [subroomList, setSubRoomList] = useState([{ subroom_slno: 0, subroom_name: '' }])
  const [value, setValue] = useState(subroomList[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (value !== null) {
      setValue(value)
      setSubRoomNo(value.subroom_slno)
      setSubRoomName(value.subroom_name)
    } else {
      setSubRoomNo(0)
      setSubRoomName('')
    }
    return
  }, [value, setSubRoomNo, setSubRoomName, dispatch])

  useEffect(() => {
    SubRoomListRoomBasd.length > 0 && setSubRoomList(SubRoomListRoomBasd)
  }, [SubRoomListRoomBasd])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={subRoomNo === 0 ? subroomList : value}
          placeholder="Select Group"
          clearOnBlur
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
          isOptionEqualToValue={(option, value) => option.subroom_name === value.subroom_name}
          getOptionLabel={option => option.subroom_name || ''}
          options={subroomList}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AmsubRoomSeleDepdRoom)
