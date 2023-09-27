import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AmDeptSectionSele = ({ deptsec, setDeptSec, setDeptSecName }) => {


    const deptsecList = useSelector((state) => state.getDeptsectionDept?.deptsectiondeptList)
    const [models, setModels] = useState([{ sec_id: 0, sec_name: '' }])
    const [value, setValue] = useState(models[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value !== null) {
            setValue(value)
            setDeptSec(value.sec_id)
            setDeptSecName(value.sec_name)
        } else {
            setDeptSec(0)
            setDeptSecName('')
        }
        return
    }, [value, setDeptSec, setDeptSecName])


    useEffect(() => {
        deptsecList.length > 0 && setModels(deptsecList)
    }, [deptsecList])
    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={deptsec === 0 ? models : value}
                    placeholder="Select Model"
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
                    isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
                    getOptionLabel={option => option.sec_name || ''}
                    options={models}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AmDeptSectionSele)