import React, { memo, useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionTyps } from 'src/redux/constants/action.type';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'


const AssetUOMSelect = ({ uom,setUOM, setName }) => {


  const dispatch = useDispatch();

  const { FETCH_ASSET_UOM } = ActionTyps;
  const assetUom = useSelector((state) => state.getUOM.uomList)
  const [uoms, setUoms] = useState([{ uom_slno: 0, uom_name: '' }])
  const [value, setValue] = useState(uoms[0]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
      if (value !== null) {
          dispatch({ type: FETCH_ASSET_UOM, payload: value.uom_slno })
          setUOM(value.uom_slno)
          setName(value.uom_name)
      } else {
          dispatch({ type: FETCH_ASSET_UOM, payload: 0 })
          setUOM(0)
          setName('')
      }
      return
  }, [value, FETCH_ASSET_UOM, dispatch, setUOM, setName])


  useEffect(() => {
      assetUom.length > 0 && setUoms(assetUom)
  
  }, [assetUom])

  return (
      <Fragment >
          <CssVarsProvider>
              <Autocomplete
                  sx={{
                      "--Input-minHeight": "29px"
                  }}
                  value={uom === 0 ? uoms : value}
                  placeholder="Select Unit of Measurement"
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
                  isOptionEqualToValue={(option, value) => option.uom_name === value.uom_name}
                  getOptionLabel={option => option.uom_name || ''}
                  options={uoms}
              />
          </CssVarsProvider>
      </Fragment>
  );
}

export default memo(AssetUOMSelect)




  