import { Autocomplete } from '@mui/joy'
import React, { useCallback, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios'

const CRFsubStoreView = ({ setList, editRowData }) => {
  const [crsList, setCrsList] = useState([])
  const [subStoreList, setSubStoreList] = useState([])

  useEffect(() => {
    const getCRSStore = async () => {
      const result = await axioslogin.get('/newCRFStore/getStores')
      const { success, data } = result.data
      if (success === 1) {
        const crsStore = data
          .filter(
            (val, index, self) =>
              index === self.findIndex(value => value.main_store_slno === val.main_store_slno)
          )
          .map(val => ({
            main_store_slno: val.main_store_slno,
            crs_store_code: val.crs_store_code,
            main_store: val.main_store,
          }))
        setCrsList(crsStore)
        const subStore = data?.map(val => ({
          crm_store_master_slno: val.crm_store_master_slno,
          sub_store_name: val.sub_store_name,
          store_code: val.store_code,
          main_store_slno: val.main_store_slno,
        }))
        setSubStoreList(subStore)
      } else {
        setCrsList([])
      }
    }
    getCRSStore()
  }, [])

  const [inputValue, setInputValue] = useState('')
  const [itemType, setItemType] = useState([{ crm_store_master_slno: 0, sub_store_name: '' }])
  const [selectedValues, setSelectedValues] = useState([])
  useEffect(() => {
    if (Object?.entries(editRowData).length > 0 && editRowData?.sub_store?.length > 0) {
      const categoryIds = JSON.parse(editRowData?.sub_store)
      const matchedCategories = subStoreList?.filter(item =>
        categoryIds?.includes(item?.crm_store_master_slno)
      )
      setSelectedValues(matchedCategories)
      setList(prev => (prev.length === 0 ? categoryIds : prev))
    }
  }, [editRowData, subStoreList, setList])

  const handleOnChange = useCallback(
    values => {
      if (values) {
        const selectedIds = values?.map(value => value?.crm_store_master_slno)
        setSelectedValues(values)
        setList(selectedIds)
      } else {
        setSelectedValues([])
        setList([])
      }
    },
    [setList]
  )

  useEffect(() => {
    if (subStoreList.length > 0) {
      setItemType(subStoreList)
    }
  }, [subStoreList])
  return (
    <Autocomplete
      placeholder="Select SubStore"
      variant="plain"
      multiple
      style={{
        height: 'auto',
        p: 0,
        m: 0,
        lineHeight: 1.2,
        width: '100%',
        backgroundColor: 'white',
        fontSize: 14,
      }}
      value={selectedValues}
      clearOnBlur
      onChange={(_, newValue) => {
        handleOnChange(newValue)
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      loading={true}
      loadingText="Loading..."
      freeSolo
      isOptionEqualToValue={(option, value) =>
        option?.crm_store_master_slno === value?.crm_store_master_slno
      }
      getOptionLabel={option => option?.sub_store_name || ''}
      options={itemType}
      getOptionDisabled={option =>
        itemType?.some(
          (opt, index) =>
            opt?.sub_store_name === option?.sub_store_name && itemType?.indexOf(opt) !== index
        )
      }
    />
  )
}

export default CRFsubStoreView
