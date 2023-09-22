import React ,{ useEffect, memo,useState ,Fragment}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AssetItemSelect = ({itemtype, setItemtype, setName }) => {
  const dispatch = useDispatch();

  const { FETCH_ASSET_ITEM_TYPE } = ActionTyps;
  const assetItem = useSelector((state) => state.getAmItemType.ItemTypeList)
  const [items, setItems] = useState([{ item_type_slno: 0, item_type_name: '' }])

  const [value, setValue] = useState(items[0]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
      if (value !== null) {
          dispatch({ type: FETCH_ASSET_ITEM_TYPE, payload: value.item_type_slno })
                  setItemtype(value.item_type_slno)
          setName(value.item_type_name)
      } else {
          dispatch({ type: FETCH_ASSET_ITEM_TYPE, payload: 0 })
               setItemtype(0)
          setName('')
      }
      return
  }, [value, FETCH_ASSET_ITEM_TYPE, dispatch, setItemtype, setName])


  useEffect(() => {
    assetItem.length > 0 && setItems(assetItem)
        }, [assetItem])

 
  return (

    <Fragment >
    <CssVarsProvider>
        <Autocomplete
            sx={{
                "--Input-minHeight": "29px"
                  }}
                  value={itemtype === 0 ? items : value}
            placeholder="Select Item type"
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
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
