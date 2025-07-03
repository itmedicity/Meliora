import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const CmComplaintLocation = ({ cmSection, setCmSection, setCmSectionName }) => {
  const deptsectionList = useSelector(state => state.getDeptsection?.deptsectionList)
  const [sectionX, setSectionX] = useState([{ sec_id: 0, sec_name: '' }])
  const [value, setValue] = useState(sectionX[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (cmSection > 0) {
      const selectedSection = deptsectionList?.find(e => e.sec_id === cmSection) || sectionX[0]
      setValue(selectedSection)
    } else {
      setValue(sectionX[0])
    }
  }, [cmSection, deptsectionList, sectionX])

  const Onclick = useCallback(
    newValue => {
      if (newValue) {
        setValue(newValue)
        setCmSection(newValue.sec_id)
        setCmSectionName(newValue.sec_name)
      } else {
        setValue(sectionX[0])
        setCmSection(0)
      }
    },
    [setCmSection, setCmSectionName, sectionX]
  )

  useEffect(() => {
    if (deptsectionList?.length > 0) {
      setSectionX([{ sec_id: 0, sec_name: '' }, ...deptsectionList])
    } else {
      setSectionX([{ sec_id: 0, sec_name: '' }])
    }
  }, [deptsectionList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            width: '100%',
            minHeight: 35,
            borderRadius: 0,
          }}
          value={value}
          placeholder="Select Section"
          clearOnBlur
          onChange={(event, newValue) => {
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={sectionX.length === 1}
          freeSolo
          isOptionEqualToValue={(option, value) => option.sec_id === value?.sec_id}
          getOptionLabel={option => option.sec_name || ''}
          options={sectionX}
          loadingText="No data"
          endDecorator={<ArrowDropDownIcon />}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(CmComplaintLocation)
