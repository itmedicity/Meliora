import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const AssetItemSelect = ({ itemtype, setItemtype, setName }) => {
  const assetItemType = useSelector(state => state.getAmItemType.ItemTypeList)
  const [items, setItems] = useState([{ item_type_slno: 0, item_type_name: '' }])

  const [value, setValue] = useState(items[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (itemtype !== 0) {
      let newObj = assetItemType?.find(e => e.item_type_slno === itemtype)
      setValue(newObj)
    }
  }, [itemtype, assetItemType])

  useEffect(() => {
    if (value !== null) {
      setItemtype(value.item_type_slno)
      setName(value.item_type_name)
    } else {
      setItemtype(0)
      setName('')
    }
    return
  }, [value, setItemtype, setName])

  useEffect(() => {
    assetItemType.length > 0 && setItems(assetItemType)
  }, [assetItemType])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={itemtype === 0 ? items : value}
          placeholder="Select Item type"
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
          isOptionEqualToValue={(option, value) => option.item_type_name === value.item_type_name}
          getOptionLabel={option => option.item_type_name || ''}
          options={items}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AssetItemSelect)
