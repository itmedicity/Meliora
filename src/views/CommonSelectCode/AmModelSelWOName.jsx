import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { getSubmodel } from 'src/redux/actions/AmSubmodelList.action'

const AmModelSelWOName = ({ model, setModel }) => {
  const dispatch = useDispatch()
  const assetmodel = useSelector(state => state.getAmModel.modelList)
  const [models, setModels] = useState([{ model_slno: 0, model_name: '' }])
  const [value, setValue] = useState(models[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (value?.model_slno > 0) {
      setValue(value)
      dispatch(getSubmodel(value.model_slno))
      setModel(value.model_slno)
    } else {
      setModel(0)
    }
    return
  }, [value, setModel, dispatch])

  useEffect(() => {
    assetmodel.length > 0 && setModels(assetmodel)
  }, [assetmodel])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={model === 0 ? models : value}
          placeholder="Select Model"
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
          isOptionEqualToValue={(option, value) => option.model_name === value.model_name}
          getOptionLabel={option => option.model_name || ''}
          options={models}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AmModelSelWOName)
