import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { useDispatch } from 'react-redux'

const AmcCmcSelectcomp = ({ AmcCmc, setAmcCmc }) => {
  const dispatch = useDispatch()
  const AmcCmcList = useSelector(state => state.setAmcCmcMaster?.AmcCmcMasterList)
  const [models, setModels] = useState([{ amccmc_slno: 0, contact_address: '' }])
  const [value, setValue] = useState(models[0])
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    if (value !== null) {
      setValue(value)
      setAmcCmc(value.amccmc_slno)
    } else {
      setAmcCmc(0)
    }
    return
  }, [value, setAmcCmc, AmcCmc, dispatch])

  useEffect(() => {
    AmcCmcList.length > 0 && setModels(AmcCmcList)
    AmcCmcList.length === 0 && setModels(AmcCmcList)
    AmcCmcList.length === 0 && setValue([{ amccmc_slno: 0, contact_address: '' }])
    AmcCmcList.length === 0 && setInputValue('')
  }, [AmcCmcList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={AmcCmc === 0 ? models : value}
          placeholder="Select AMC/CMC"
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
          isOptionEqualToValue={(option, value) => option.contact_address === value.contact_address}
          getOptionLabel={option => option.contact_address || ''}
          options={models}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AmcCmcSelectcomp)
