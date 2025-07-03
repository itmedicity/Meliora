import { Autocomplete } from '@mui/joy'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAmItemType } from 'src/redux/actions/AmItemTypeList.actions'

const CRFCategoryTypeSelect = ({ setCategory, editRowData, catFlag }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAmItemType())
  }, [dispatch])
  const assetItemType = useSelector(state => {
    return state.getAmItemType.ItemTypeList || 0
  })
  const [inputValue, setInputValue] = useState('')
  const [itemType, setItemType] = useState([{ item_type_slno: 0, item_type_name: '' }])
  const [selectedValues, setSelectedValues] = useState([])
  useEffect(() => {
    if (Object?.entries(editRowData).length > 0 && editRowData?.category?.length > 0) {
      const categoryIds = JSON.parse(editRowData?.category)
      const matchedCategories = assetItemType?.filter(item =>
        categoryIds?.includes(item?.item_type_slno)
      )
      setSelectedValues(matchedCategories)
      setCategory(prev => (prev.length === 0 ? categoryIds : prev))
    }
  }, [editRowData, assetItemType, setCategory])
  useEffect(() => {
    if (assetItemType.length > 0) {
      setItemType(assetItemType)
    }
  }, [assetItemType])

  const handleOnChange = useCallback(
    values => {
      if (values) {
        const selectedIds = values?.map(value => value?.item_type_slno)
        setSelectedValues(values)
        setCategory(selectedIds)
      } else {
        setSelectedValues([])
        setCategory([])
      }
    },
    [setCategory]
  )
  useEffect(() => {
    if (catFlag === 1) {
      setSelectedValues([])
      setCategory([])
    }
  }, [catFlag, setCategory])
  return (
    <Autocomplete
      placeholder="Select Category"
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
      isOptionEqualToValue={(option, value) => option?.item_type_slno === value?.item_type_slno}
      getOptionLabel={option => option?.item_type_name || ''}
      options={itemType}
      getOptionDisabled={option =>
        itemType?.some(
          (opt, index) =>
            opt?.item_type_name === option?.item_type_name && itemType?.indexOf(opt) !== index
        )
      }
    />
  )
}

export default CRFCategoryTypeSelect
