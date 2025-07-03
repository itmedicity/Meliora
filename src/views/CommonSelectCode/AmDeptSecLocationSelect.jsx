import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { getRoomBasedOnDeptSec } from 'src/redux/actions/AmRoomDeptSecBased.action'
import { useDispatch } from 'react-redux'

const AmDeptSecLocationSelect = ({ location, setLocation }) => {
  const dispatch = useDispatch()
  const DeptSecArry = useSelector(state => state.getDeptsection?.deptsectionList)
  const [deptSections, setDeptSections] = useState([{ sec_id: 0, sec_name: '' }])
  const [value, setValue] = useState(deptSections[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (location !== 0) {
      let newObj = DeptSecArry?.find(e => e.sec_id === location)
      dispatch(getRoomBasedOnDeptSec(location))
      setValue(newObj)
    }
  }, [location, DeptSecArry, dispatch])

  useEffect(() => {
    if (value !== null) {
      setLocation(value.sec_id)
      if (value.sec_id !== 0) {
        dispatch(getRoomBasedOnDeptSec(value.sec_id))
      }
    } else {
      setLocation(0)
    }
    return
  }, [value, setLocation, dispatch])

  useEffect(() => {
    DeptSecArry.length > 0 && setDeptSections(DeptSecArry)
  }, [DeptSecArry])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={location === 0 ? deptSections : value}
          placeholder="Select location"
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
          isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
          getOptionLabel={option => option.sec_name || ''}
          options={deptSections}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AmDeptSecLocationSelect)
