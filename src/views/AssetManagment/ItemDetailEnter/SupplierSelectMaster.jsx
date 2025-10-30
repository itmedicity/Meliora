import React, { memo, useCallback, useEffect, useState } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { axioslogin } from 'src/views/Axios/Axios'
import { CssVarsProvider } from '@mui/joy'

const SupplierSelectMaster = ({ supplier, setSupplier }) => {
  const [supplierList, setsupplierList] = useState([])
  const [value, setValue] = useState(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const getAllSupplier = async () => {
      const result = await axioslogin.get('ItemMapDetails/GetSupplierSelect')
      const { success, data } = result.data

      if (success === 2) {
        setsupplierList(data)
      } else {
        setsupplierList([])
      }
    }
    getAllSupplier()
  }, [])

  useEffect(() => {
    if (supplier !== 0) {
      const selectedSupplier = supplierList.find(e => e.it_supplier_slno === supplier)
      setValue(selectedSupplier || null)
    }
  }, [supplier, supplierList])

  const Onclick = useCallback(
    newValue => {
      if (newValue !== null) {
        setValue(newValue)
        setSupplier(newValue.it_supplier_slno)
      } else {
        setValue(null)
        setSupplier(0)
      }
    },
    [setSupplier]
  )

  return (
    <CssVarsProvider>
      <Autocomplete
        sx={{
          '--Input-minHeight': '38px',
          width: '100%'
        }}
        value={value}
        placeholder="Select Supplier"
        clearOnBlur
        onChange={(event, newValue) => {
          Onclick(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        loading={supplierList.length === 0}
        loadingText="Loading..."
        isOptionEqualToValue={(option, value) => option.it_supplier_slno === value?.it_supplier_slno}
        getOptionLabel={option => option.it_supplier_name || ''}
        options={supplierList}
        clearOnEscape
      />
    </CssVarsProvider>
  )
}

export default memo(SupplierSelectMaster)
