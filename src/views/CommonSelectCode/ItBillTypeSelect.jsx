import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const ItBillTypeSelect = ({ billType, setBillType }) => {
  const billTypeNames = useSelector(state => state?.getBillType?.BillTypelist)
  const [billTypeX, setBillTypeX] = useState([{ it_bill_type_slno: 0, it_bill_type_name: '' }])
  const [value, setValue] = useState(billTypeX[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (billTypeNames !== 0) {
      let newObj = billTypeNames?.find(e => e.it_bill_type_slno === billType)
      setValue(newObj)
    }
  }, [billType, billTypeNames])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setBillType(value.it_bill_type_slno)
      } else {
        setBillType(0)
      }
      return
    },
    [setBillType]
  )

  useEffect(() => {
    billTypeNames.length > 0 && setBillTypeX(billTypeNames)
  }, [billTypeNames])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={billType === 0 ? billTypeX : value}
          placeholder="select bill type"
          clearOnBlur
          style={{ minHeight: 30 }}
          onChange={(event, newValue) => {
            setValue(newValue)
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.it_bill_type_name === value.it_bill_type_name}
          getOptionLabel={option => option.it_bill_type_name || ''}
          options={billTypeX}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ItBillTypeSelect)
