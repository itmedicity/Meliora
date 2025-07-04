import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { axiosellider } from '../Axios/Axios'
import { Autocomplete, CssVarsProvider } from '@mui/joy'
const CrfSupplierSelect = ({ supCode, setSupCode, setSupName }) => {
  const [supplierList, setSupplierList] = useState([])
  const [type, setType] = useState([{ SU_CODE: 0, SUC_NAME: '' }])
  const [value, setValue] = useState(type[0])
  const [inputValue, setInputValue] = useState('')
  const [flag, setFlag] = useState(0)

  useEffect(() => {
    const gettingOrcleData = async () => {
      const result = await axiosellider.get('/supplierList/getsupplier')
      const { success, data } = result.data
      if (success === 1) {
        setSupplierList(data)
        setSupCode(0)
      } else {
        setSupplierList([])
      }
    }
    gettingOrcleData()
  }, [setSupCode])

  useEffect(() => {
    if (supCode !== 0 && flag === 0) {
      const array = supplierList.find(e => e.SU_CODE === supCode)
      setValue(array)
    }
  }, [supCode, flag, supplierList])
  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setFlag(1)
        setValue(value)
        setSupCode(value.SU_CODE)
        setSupName(value.SUC_NAME)
      } else {
        setSupCode(0)
        setSupName('')
      }
      return
    },
    [setSupCode, setSupName]
  )
  useEffect(() => {
    supplierList.length > 0 && setType(supplierList)
  }, [supplierList])

  // SU_CODE,SUC_NAME
  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          // startDecorator={<EngineeringTwoToneIcon sx={{ color: '#0070E0' }} />}
          // fullWidth
          sx={{
            height: 20,
            border: '1px solid #bbdefb',
            alignItems: 'center',
            fontSize: 14,
            borderRadius: 5
          }}
          value={supCode === 0 ? type : value}
          placeholder="Select Supplier"
          clearOnBlur
          onChange={(event, newValue) => {
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.SUC_NAME === value.SUC_NAME}
          getOptionLabel={option => option.SUC_NAME || ''}
          options={type}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(CrfSupplierSelect)
