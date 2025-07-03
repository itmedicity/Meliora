import React, { useEffect, memo, useState, Fragment } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { useDispatch } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'

const BillMastSelectComp = ({ AmcCmc, setAmcCmc, AddBillFlg }) => {
  const dispatch = useDispatch()
  const [models, setModels] = useState([{ am_bill_mastslno: 0, am_bill_no: '' }])
  const [value, setValue] = useState(models[0])
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    if (value !== null) {
      setValue(value)
      setAmcCmc(value.am_bill_mastslno)
    } else {
      setAmcCmc()
    }
    return
  }, [value, setAmcCmc, dispatch])

  useEffect(() => {
    const getBills = async () => {
      const result = await axioslogin.get('/ItemMapDetails/BillMasterviewSelect')
      const { success, data } = result.data
      if (success === 2) {
        data.length > 0 && setModels(data)
        data.length === 0 && setModels(data)
        data.length === 0 && setValue([{ am_bill_mastslno: 0, am_bill_no: '' }])
        data.length === 0 && setInputValue('')
      } else {
      }
    }
    getBills()
  }, [AddBillFlg])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={AmcCmc === 0 ? models : value}
          placeholder="Select Bill"
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
          isOptionEqualToValue={(option, value) => option.am_bill_no === value.am_bill_no}
          getOptionLabel={option => option.am_bill_no || ''}
          options={models}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(BillMastSelectComp)
