import React ,{ useEffect, memo,useState ,Fragment}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'


const AmSubmodelSelect = ({submodel, setSubmodel,  setName }) => {

  const dispatch = useDispatch();

  const { FETCH_ASSET_SUBMODEL } = ActionTyps;
  const assetSUbmodel = useSelector((state) => state.getSubmodel.SubmodelList)
  const [submodels, setSubmodels] = useState([{ submodel_slno: 0, submodel_name: '' }])

  const [value, setValue] = useState(submodels[0]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
      if (value !== null) {
          dispatch({ type: FETCH_ASSET_SUBMODEL, payload: value.submodel_slno })
          setSubmodel(value.submodel_slno)
          setName(value.submodel_name)
      } else {
          dispatch({ type: FETCH_ASSET_SUBMODEL, payload: 0 })
          setSubmodel(0)
          setName('')
      }
      return
  }, [value, FETCH_ASSET_SUBMODEL, dispatch, setSubmodel, setName])


  useEffect(() => {
    assetSUbmodel.length > 0 && setSubmodels(assetSUbmodel)
        }, [assetSUbmodel])

 
  return (

    <Fragment >
    <CssVarsProvider>
        <Autocomplete
            sx={{
                "--Input-minHeight": "29px"
                  }}
                  value={submodel === 0 ? submodels : value}
            placeholder="Select Submodel"
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
            isOptionEqualToValue={(option, value) => option.submodel_name === value.submodel_name}
            getOptionLabel={option => option.submodel_name || ''}
            options={submodels}
        />
    </CssVarsProvider>
    </Fragment>  
  )
 
 
}

export default memo(AmSubmodelSelect)
