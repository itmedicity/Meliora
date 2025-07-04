import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { useDispatch } from 'react-redux'
import { getItemBasedSection } from 'src/redux/actions/AmItemSelectBasedSec.action'

const AmDeptSecSelectJoy = ({ selectedDeptSec, setselectedDeptSec }) => {
  const dispatch = useDispatch()
  const deptsecList = useSelector(state => state.getDeptsectionDept?.deptsectiondeptList)
  const [models, setModels] = useState([{ sec_id: 0, sec_name: '' }])
  const [value, setValue] = useState(models[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (value?.sec_id > 0) {
      dispatch(getItemBasedSection(value.sec_id))
      setValue(value)
      setselectedDeptSec(value.sec_id)
    } else {
      setselectedDeptSec(0)
    }
    return
  }, [value, setselectedDeptSec, dispatch])

  useEffect(() => {
    deptsecList.length > 0 && setModels(deptsecList)
    deptsecList.length === 0 && setModels(deptsecList)
    deptsecList.length === 0 && setValue([{ sec_id: 0, sec_name: '' }])
    deptsecList.length === 0 && setInputValue('')
  }, [deptsecList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={selectedDeptSec === 0 ? models : value}
          placeholder="SelectDepartment Section"
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
          options={models}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AmDeptSecSelectJoy)
