import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { getAmSubGroupList } from 'src/redux/actions/AmSubGroupList.action'

const AmGroupSelWOName = ({ group, setGroup }) => {
  const dispatch = useDispatch()
  const assetGrps = useSelector(state => state.getGroup?.AssetGroupList)
  const [grps, setGrps] = useState([{ group_slno: 0, group_name: '' }])
  const [value, setValue] = useState(grps[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (value?.group_slno > 0) {
      setValue(value)
      dispatch(getAmSubGroupList(value.group_slno))
      setGroup(value.group_slno)
    } else {
      setGroup(0)
    }
  }, [value, setGroup, dispatch])

  useEffect(() => {
    assetGrps.length > 0 && setGrps(assetGrps)
  }, [assetGrps])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={group === 0 ? grps : value}
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
          isOptionEqualToValue={(option, value) => option.group_name === value.group_name}
          getOptionLabel={option => option.group_name || ''}
          options={grps}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AmGroupSelWOName)
