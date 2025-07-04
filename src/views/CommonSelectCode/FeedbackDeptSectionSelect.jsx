import React, { useEffect, useState, Fragment, memo } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { useDispatch } from 'react-redux'

const FeedbackDeptSectionSelect = ({ location, setLocation, setlocaName }) => {
  const dispatch = useDispatch()
  const DeptSecArry = useSelector(state => state.getDeptsection?.deptsectionList)
  const [deptSections, setDeptSections] = useState([{ sec_id: 0, sec_name: '' }])
  const [value, setValue] = useState(deptSections[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (location !== 0) {
      let newObj = DeptSecArry?.find(e => e.sec_id === location)
      setValue(newObj)
    }
  }, [location, DeptSecArry, dispatch])

  useEffect(() => {
    if (value !== null) {
      setLocation(value.sec_id)
      setlocaName(value.sec_name)
      setValue(value)
    } else {
      setLocation(0)
      setlocaName()
    }
    return
  }, [value, setLocation, setlocaName])

  useEffect(() => {
    DeptSecArry.length > 0 && setDeptSections(DeptSecArry)
  }, [DeptSecArry])
  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '33px'
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
          isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
          getOptionLabel={option => option.sec_name || ''}
          options={deptSections}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(FeedbackDeptSectionSelect)
