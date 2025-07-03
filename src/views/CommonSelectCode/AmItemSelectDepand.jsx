import React, { useEffect, memo, useState, Fragment } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const AmItemSelectDepand = ({ itemList, setItem, item, setItemName }) => {
  const [Items, setItems] = useState([{ item_creation_slno: 0, item_name: '' }])
  const [value, setValue] = useState(Items[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (value !== null) {
      setItem(value.item_creation_slno)
      setItemName(value.item_name)
    } else {
      setItem(0)
      setItemName('')
    }
    return
  }, [value, setItem, setItemName])

  useEffect(() => {
    itemList.length > 0 && setItems(itemList)
  }, [itemList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={item === 0 ? Items : value}
          placeholder="Select Item"
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
          isOptionEqualToValue={(option, value) => option.item_name === value.item_name}
          getOptionLabel={option => option.item_name || ''}
          options={Items}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AmItemSelectDepand)
