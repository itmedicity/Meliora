import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios'
import { Autocomplete, CssVarsProvider } from '@mui/joy'

const CrfStoreSelect = ({ storeSlno, setStoreSlno, setStoreCode, setStoreName, setsubStoreSlno }) => {
  const [storeList, setStoreList] = useState([])
  useEffect(() => {
    const getCRSStore = async () => {
      const result = await axioslogin.get('/newCRFPurchase/crsStores')
      const { success, data } = result.data
      if (success === 2) {
        setStoreList(data)
      } else {
        setStoreList([])
      }
    }
    getCRSStore()
  }, [])

  const [type, setType] = useState([{ main_store_slno: 0, main_store: '', crs_store_code: '' }])
  const [value, setValue] = useState(type[0])
  const [inputValue, setInputValue] = useState('')
  const [flag, setFlag] = useState(0)

  useEffect(() => {
    storeList.length > 0 && setType(storeList)
  }, [storeList])

  useEffect(() => {
    if (storeSlno !== 0 && flag === 0) {
      const array = storeList.find(e => e.main_store_slno === storeSlno)
      setValue(array)
    }
  }, [storeSlno, flag, storeList])
  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setFlag(1)
        setValue(value)
        setStoreSlno(value.main_store_slno)
        setStoreCode(value.crs_store_code)
        setStoreName(value.main_store)
        setsubStoreSlno(0)
      } else {
        setStoreCode('')
        setStoreName('')
        setsubStoreSlno(0)
      }
      return
    },
    [setStoreSlno, setStoreCode, setStoreName, setsubStoreSlno]
  )

  return (
    <CssVarsProvider>
      <Autocomplete
        sx={{
          '--Input-minHeight': '32px'
        }}
        value={storeSlno === 0 ? type : value}
        placeholder="Select CRS Store"
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
        isOptionEqualToValue={(option, value) => option.main_store === value.main_store}
        getOptionLabel={option => option.main_store || ''}
        options={type}
      />
    </CssVarsProvider>
  )
}

export default memo(CrfStoreSelect)
