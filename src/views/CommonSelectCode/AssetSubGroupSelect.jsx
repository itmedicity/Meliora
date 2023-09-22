import React ,{ useEffect, memo,useState ,Fragment}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AssetSubGroupSelect = ({subgroup,setSubGroup,  setName }) => { 

    const dispatch = useDispatch();

  const { FETCH_ASSET_SUBGROUP } = ActionTyps;
  const assetSUbgrp = useSelector((state) => state.getAmSubGroupList.SubGroupList)
  const [subGrps, setsubGrps] = useState([{ subgroup_slno: 0, sub_group_name: '' }])

  const [value, setValue] = useState(subGrps[0]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
      if (value !== null) {
          dispatch({ type: FETCH_ASSET_SUBGROUP, payload: value.subgroup_slno })
          setSubGroup(value.subgroup_slno)
          setName(value.sub_group_name)
      } else {
          dispatch({ type: FETCH_ASSET_SUBGROUP, payload: 0 })
          setSubGroup(0)
          setName('')
      }
      return
  }, [value, FETCH_ASSET_SUBGROUP, dispatch, setSubGroup, setName])


  useEffect(() => {
    assetSUbgrp.length > 0 && setsubGrps(assetSUbgrp)
        }, [assetSUbgrp])

 
  return (

    <Fragment >
    <CssVarsProvider>
        <Autocomplete
            sx={{
                "--Input-minHeight": "29px"
                  }}
                  value={subgroup === 0 ? subGrps : value}
            placeholder="Select Subgroup"
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
            isOptionEqualToValue={(option, value) => option.sub_group_name === value.sub_group_name}
            getOptionLabel={option => option.sub_group_name || ''}
            options={subGrps}
        />
    </CssVarsProvider>
    </Fragment>  
  )

}

  
 
export default memo(AssetSubGroupSelect)
