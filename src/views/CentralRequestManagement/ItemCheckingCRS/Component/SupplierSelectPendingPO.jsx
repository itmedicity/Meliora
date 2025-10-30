import { Autocomplete, CssVarsProvider } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const SupplierSelectPendingPO = ({ supCode, setSupCode }) => {
  const [supList, setsupList] = useState([])
  const [type, setType] = useState([{ supplier_code: 0, supplier_name: '' }])
  const [value, setValue] = useState(type[0])
  const [inputValue, setInputValue] = useState('')
  const [flag, setFlag] = useState(0)

  useEffect(() => {
    const getSupplierList = async () => {
      try {
        const result = await axioslogin.get('/deliveryMarking/viewSupplier')
        const { success, data } = result.data
        if (success === 1) {
          const sup = data?.filter(val => val.po_status === 1)
          setsupList(sup)
        } else {
          setsupList([])
        }
      } catch (error) {
        // warningNotify("Error to fetch Supplier Details:", error);
        setsupList([])
      }
    }
    getSupplierList()
  }, [])
  useEffect(() => {
    if (supCode !== 0 && flag === 0) {
      const array = supList.find(e => e.supplier_code === supCode)
      setValue(array)
    }
  }, [supCode, flag, supList])
  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setFlag(1)
        setValue(value)
        setSupCode(value.supplier_code)
      } else {
        setSupCode(0)
      }
      return
    },
    [setSupCode]
  )
  useEffect(() => {
    supList.length > 0 && setType(supList)
  }, [supList])
  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          // fullWidth
          sx={{
            height: 20,
            border: '1px solid #bbdefb',
            borderRadius: 5,
            fontSize: 14,
            color: '#1D617A'
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
          isOptionEqualToValue={(option, value) => option.supplier_name === value.supplier_name}
          getOptionLabel={option => option.supplier_name || ''}
          options={type}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(SupplierSelectPendingPO)
