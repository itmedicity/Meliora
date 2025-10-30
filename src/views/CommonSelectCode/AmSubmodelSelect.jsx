import React, { useEffect, memo, useState, useCallback, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const AmSubmodelSelect = ({ submodel, setSubmodel, setName }) => {
  const assetSUbmodel = useSelector(state => state.getSubmodel.SubmodelList)
  const [submodels, setSubmodels] = useState([{ submodel_slno: 0, submodel_name: '' }])

  const [value, setValue] = useState(submodels[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (submodel !== 0) {
      let newObj = assetSUbmodel?.find(e => e.submodel_slno === submodel)
      setValue(newObj)
    }
  }, [submodel, assetSUbmodel])

  const ClickFunction = useCallback(
    newValue => {
      if (newValue !== null) {
        setSubmodel(newValue.submodel_slno)
        setName(newValue.submodel_name)
      } else {
        setSubmodel(0)
        setName('')
      }
    },
    [setSubmodel, setName]
  )

  useEffect(() => {
    assetSUbmodel.length > 0 && setSubmodels(assetSUbmodel)
  }, [assetSUbmodel])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={submodel === 0 ? submodels : value}
          placeholder="Select Submodel"
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
          isOptionEqualToValue={(option, value) => option.submodel_name === value.submodel_name}
          getOptionLabel={option => option.submodel_name || ''}
          options={submodels}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AmSubmodelSelect)
