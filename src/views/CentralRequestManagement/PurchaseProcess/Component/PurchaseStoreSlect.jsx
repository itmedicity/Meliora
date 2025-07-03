import React, { memo, useCallback, useEffect, useState } from 'react'
import { Autocomplete, CssVarsProvider } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios'

const PurchaseStoreSlect = ({ substoreSlno, setsubStoreSlno, storeSlno, setsubStoreName }) => {
  const [subStoreList, setSubStoreList] = useState([])

  useEffect(() => {
    const getSubStore = async () => {
      const result = await axioslogin.get(`/newCRFPurchase/getSubstores/${storeSlno}`)
      const { success, data } = result.data
      if (success === 1) {
        setSubStoreList(data)
      } else {
        setSubStoreList([])
      }
    }
    getSubStore()
  }, [storeSlno])

  const [type, setType] = useState([{ crm_store_master_slno: 0, sub_store_name: '' }])
  const [value, setValue] = useState(type[0])
  const [inputValue, setInputValue] = useState('')
  const [flag, setFlag] = useState(0)

  useEffect(() => {
    subStoreList.length > 0 && setType(subStoreList)
  }, [subStoreList])

  useEffect(() => {
    if (substoreSlno !== 0 && flag === 0) {
      const array = subStoreList.find(e => e.crm_store_master_slno === substoreSlno)
      setValue(array)
    }
  }, [substoreSlno, flag, subStoreList])
  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setFlag(1)
        setValue(value)
        setsubStoreSlno(value.crm_store_master_slno)
        setsubStoreName(value.sub_store_name)
      } else {
        setsubStoreName('')
        setsubStoreSlno(0)
      }
      return
    },
    [setsubStoreSlno, setsubStoreName]
  )

  return (
    <CssVarsProvider>
      <Autocomplete
        sx={{
          '--Input-minHeight': '32px',
        }}
        value={substoreSlno === 0 ? type : value}
        placeholder="Select Store"
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
        isOptionEqualToValue={(option, value) => option.sub_store_name === value.sub_store_name}
        getOptionLabel={option => option.sub_store_name || ''}
        options={type}
      />
    </CssVarsProvider>
  )
}
export default memo(PurchaseStoreSlect)
