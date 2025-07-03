import React, { useEffect, memo, useState, Fragment, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { useDispatch } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'

const TmDeptSectionSelect = ({ deptsec, setDeptSec }) => {
  const dispatch = useDispatch()
  const deptsecList = useSelector(state => state.getDeptsectionDept?.deptsectiondeptList)
  const [models, setModels] = useState([{ sec_id: 0, sec_name: '' }])
  const [value, setValue] = useState(models[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (deptsec !== 0) {
      let newObj = deptsecList?.find(e => e.sec_id === deptsec)
      setValue(newObj)
      dispatch(getDepartSecemployee(deptsec))
    }
  }, [deptsec, deptsecList, dispatch])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setDeptSec(value.sec_id)
      } else {
        setDeptSec(0)
      }
      return
    },
    [setDeptSec]
  )
  useEffect(() => {
    deptsecList.length > 0 && setModels(deptsecList)
  }, [deptsecList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            width: '100%',
            minHeight: 30,
            bgcolor: 'transparent',
            '--Input-radius': '0px',
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottom: '2px solid',
            borderColor: 'neutral.outlinedBorder',
            '&:hover': {
              borderColor: 'neutral.outlinedHoverBorder',
            },
            '&::before': {
              border: '1px solid var(--Input-focusedHighlight)',
              transform: 'scaleX(0)',
              left: 0,
              right: 0,
              bottom: '-2px',
              top: 'unset',
              transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              borderRadius: 0,
            },
            '&:focus-within::before': {
              transform: 'scaleX(1)',
            },
          }}
          value={deptsec === 0 ? models : value}
          placeholder="Select department section"
          clearOnBlur
          onChange={(event, newValue) => {
            setValue(newValue)
            // setDeptSec(newValue.sec_id)
            Onclick(newValue)
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

export default memo(TmDeptSectionSelect)
