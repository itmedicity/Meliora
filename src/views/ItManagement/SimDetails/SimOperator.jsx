import * as React from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { Fragment } from 'react'
import { CssVarsProvider } from '@mui/joy'
import { useState, useEffect, memo } from 'react'
import { getsimOperatorList } from 'src/api/masterApi'
import { useQuery } from 'react-query'
import { useCallback } from 'react'

const SimOperator = ({ provider, setProvider }) => {
  const { data: simOperatorList } = useQuery({
    queryKey: ['getsimOperatorList'],
    queryFn: () => getsimOperatorList()
  })

  const [providerX, setproviderX] = useState([{ sim_operator_id: 0, sim_operator_name: '' }])
  const [value, setValue] = useState(providerX[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (provider !== 0) {
      let newObj = simOperatorList?.find(e => e.sim_operator_id === provider)
      setValue(newObj)
    }
  }, [provider, simOperatorList])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setProvider(value.sim_operator_id)
      } else {
        setProvider(0)
      }
      return
    },
    [setProvider]
  )

  useEffect(() => {
    if (Array.isArray(simOperatorList) && simOperatorList.length > 0) {
      setproviderX(simOperatorList)
    }
  }, [simOperatorList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={provider === 0 ? providerX : value}
          placeholder="Select SiM Operator"
          clearOnBlur
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
          isOptionEqualToValue={(option, value) => option.sim_operator_name === value.sim_operator_name}
          getOptionLabel={option => option.sim_operator_name || ''}
          options={providerX}
        />
      </CssVarsProvider>
    </Fragment>
  )

  // const providerList = useMemo(() => {
  //     return [
  //         { label: 'Select', id: 0 },
  //         { label: 'Vodafone Idea', id: 1 },
  //         { label: 'Airtel', id: 2 },
  //         { label: 'Jio', id: 3 },
  //         { label: 'Bsnl', id: 4 },
  //         { label: 'Reliance Communications', id: 5 },
  //         { label: 'Aircel', id: 6 }

  //     ]
  // }, [])
  // const [value, setValue] = useState(providerList[0]);
  // const [inputValue, setInputValue] = useState('');
  // useEffect(() => {

  //     if (provider !== 0) {
  //         const array = providerList.find((e) => e.id === provider)
  //         setValue(array)
  //     }
  // }, [provider, providerList])
  // useEffect(() => {
  //     if (value !== null) {
  //         setProvider(value.id)
  //     } else {
  //         setProvider(0)
  //     }
  //     return
  // }, [value, setProvider])
  // return (
  //     <Fragment>
  //         <CssVarsProvider>
  //             <Autocomplete
  //                 sx={{
  //                     "--Input-minHeight": "29px",
  //                     // width: 755
  //                     // color: 'yellow'
  //                 }}
  //                 value={provider === 0 ? providerList : value}
  //                 placeholder="Select SiM Operator"
  //                 clearOnBlur
  //                 onChange={(event, newValue) => {
  //                     setValue(newValue);

  //                 }}
  //                 inputValue={inputValue}
  //                 onInputChange={(event, newInputValue) => {
  //                     setInputValue(newInputValue);
  //                 }}
  //                 loading={true}
  //                 loadingText="Loading..."
  //                 freeSolo
  //                 isOptionEqualToValue={(option, value) => option.label === value.label}
  //                 getOptionLabel={option => option.label || ''}
  //                 options={providerList}
  //             />
  //         </CssVarsProvider>
  //     </Fragment>
  // )
}
export default memo(SimOperator)
