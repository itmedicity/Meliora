import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const ItBillCategoryList = ({ billCategory, setBillCategory, setName }) => {
  const billCategoryNames = useSelector(state => state?.getBillCategory?.BillCategorylist)
  const [billCategoryX, setBillCategoryX] = useState([
    { it_bill_category_slno: 0, it_bill_category_name: '' },
  ])
  const [value, setValue] = useState(billCategoryX[0])
  const [inputValue, setInputValue] = useState('')
  const [flag, setflag] = useState(0)

  useEffect(() => {
    if (billCategoryNames !== 0 && flag === 0) {
      let newObj = billCategoryNames?.find(e => e.it_bill_category_slno === billCategory)
      setValue(newObj)
    }
  }, [billCategory, billCategoryNames, flag])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setflag(1)
        setBillCategory(value.it_bill_category_slno)
        setName(value.it_bill_category_name)
      } else {
        setBillCategory(0)
        setName('')
      }
      return
    },
    [setBillCategory, setName]
  )

  useEffect(() => {
    billCategoryNames.length > 0 && setBillCategoryX(billCategoryNames)
  }, [billCategoryNames])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={billCategory === 0 ? billCategoryX : value}
          placeholder="Select Bill Category"
          clearOnBlur
          style={{ minHeight: 30 }}
          onChange={(event, newValue) => {
            // setValue(newValue);
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) =>
            option.it_bill_category_name === value.it_bill_category_name
          }
          getOptionLabel={option => option.it_bill_category_name || ''}
          options={billCategoryX}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ItBillCategoryList)
