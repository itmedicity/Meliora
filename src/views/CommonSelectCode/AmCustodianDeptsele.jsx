import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AmCustodianDeptsele = ({ custodiandept, setCustodianDept ,setcustdeptname,setFirstName,setSecondName}) => {

    const custdnDeptList = useSelector((state) => state.getCustodianDept?.CustodianDeptList)
    const [cusdept, setCusDept] = useState([{ am_custodian_slno: 0, am_custodian_name: '' }])
    const [value, setValue] = useState(cusdept[0]);
    const [inputValue, setInputValue] = useState('');

  
    useEffect(() => {
        if (value !== null) {
            setValue(value)
                        setCustodianDept(value.am_custodian_slno)
                        setcustdeptname(value.am_custodian_name)
                        setFirstName(value.am_custdn_asset_no_first)
                        setSecondName(value.am_custdn_asset_no_second)
        } else {
            setCustodianDept(0)
            setcustdeptname('')
            setFirstName('')
            setSecondName('')
        }
        return
    }, [value, setCustodianDept, setcustdeptname, setFirstName,setSecondName])


    useEffect(() => {
        custdnDeptList.length > 0 && setCusDept(custdnDeptList)
    }, [custdnDeptList])


    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                value={custodiandept === 0 ? cusdept : value}
                placeholder="Select Custodian Department"
                clearOnBlur
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                loading={true}
                loadingText="Loading..."
                freeSolo
                // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
                isOptionEqualToValue={(option, value) => option.am_custodian_name === value.am_custodian_name}
                getOptionLabel={option => option.am_custodian_name || ''}
                options={cusdept}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AmCustodianDeptsele)