import React, { useEffect, memo, useState, Fragment, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'

const DeptSecSelectAutoCompJoy = ({ deptsec, setDeptSec }) => {
  const dispatch = useDispatch()

  const deptsecList = useSelector(state => state.getDeptsectionDept?.deptsectiondeptList)
  const [value, setValue] = useState({ sec_id: 0, sec_name: '' })
  const [inputValue, setInputValue] = useState('')
  const sections = useMemo(() => deptsecList || [{ sec_id: 0, sec_name: '' }], [deptsecList])

  useEffect(() => {
    if (deptsec !== 0) {
      const newObj = deptsecList?.find(e => e.sec_id === deptsec)
      if (newObj) setValue(newObj)
      dispatch(getDepartSecemployee(deptsec))
    }
  }, [deptsec, deptsecList, dispatch])

  const onClick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setDeptSec(value.sec_id)
      } else {
        setDeptSec(0)
      }
    },
    [setDeptSec]
  )

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={deptsec === 0 ? sections[0] : value}
          placeholder="Select department section"
          clearOnBlur
          onChange={(event, newValue) => {
            setValue(newValue)
            onClick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={!deptsecList}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.sec_name === value?.sec_name}
          getOptionLabel={option => option.sec_name || ''}
          options={sections}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(DeptSecSelectAutoCompJoy)
