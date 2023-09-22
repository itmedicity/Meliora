import React ,{ useEffect, memo,useState ,Fragment}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { getSubmodel } from 'src/redux/actions/AmSubmodelList.action';


const AssetModelSelect = ({model, setModel,setName }) => {
  const dispatch = useDispatch();

  const { FETCH_ASSET_MODEL } = ActionTyps;
  const assetmodel = useSelector((state) => state.getAmModel.modelList)
  const [models, setModels] = useState([{ model_slno: 0, model_name: '' }])

  const [value, setValue] = useState(models[0]);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
      if (value !== null) {
          dispatch({ type: FETCH_ASSET_MODEL, payload: value.model_slno })
           dispatch(getSubmodel(value.model_slno))
          setModel(value.model_slno)
          setName(value.model_name)
      } else {
          dispatch({ type: FETCH_ASSET_MODEL, payload: 0 })
          dispatch(getSubmodel(0))
          setModel(0)
          setName('')
      }
      return
  }, [value, FETCH_ASSET_MODEL, dispatch, setModel, setName])


  useEffect(() => {
    assetmodel.length > 0 && setModels(assetmodel)
        }, [assetmodel])

 
  return (

    <Fragment >
    <CssVarsProvider>
        <Autocomplete
            sx={{
                "--Input-minHeight": "29px"
                  }}
                  value={model === 0 ? models : value}
            placeholder="Select Model"
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
            isOptionEqualToValue={(option, value) => option.model_name === value.model_name}
            getOptionLabel={option => option.model_name || ''}
            options={models}
        />
    </CssVarsProvider>
    </Fragment>  
  )
}

export default memo(AssetModelSelect)
