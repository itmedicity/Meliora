import React, { memo, useState, useEffect, Fragment, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const AmSubCategryWOName = ({ subcategory, category, setSubcategory }) => {
  const assetSubcat = useSelector(state => state.getAmSubcategory?.SubcategoryList)
  const [subcats, setSubcats] = useState([{ subcategory_slno: 0, subcategory_name: '' }])
  const [value, setValue] = useState(subcats[0])
  const [inputValue, setInputValue] = useState('')

  const ClickFunction = useCallback(
    newValue => {
      if (newValue !== null) {
        setValue(newValue)
        setSubcategory(newValue.subcategory_slno)
      } else {
        setSubcategory(0)
      }
    },
    [setSubcategory]
  )

  useEffect(() => {
    assetSubcat.length > 0 && setSubcats(assetSubcat)
  }, [assetSubcat])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={subcategory === 0 || category === 0 ? subcats : value}
          placeholder="Select Subcategory"
          clearOnBlur
          onChange={(event, newValue) => {
            ClickFunction(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
          isOptionEqualToValue={(option, value) => option.subcategory_name === value.subcategory_name}
          getOptionLabel={option => option.subcategory_name || ''}
          options={subcats}
        />
      </CssVarsProvider>
    </Fragment>
  )
}
export default memo(AmSubCategryWOName)
