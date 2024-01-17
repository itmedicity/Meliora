import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { Fragment } from 'react';
import { CssVarsProvider } from '@mui/joy';
import { useState, useEffect, useMemo, memo } from 'react';
const SimOperator = ({ provider, setProvider }) => {



    const providerList = useMemo(() => {
        return [
            { label: 'Select', id: 0 },
            { label: 'Vodafone Idea', id: 1 },
            { label: 'Airtel', id: 2 },
            { label: 'Jio', id: 3 },
            { label: 'Bsnl', id: 4 },
            { label: 'Reliance Communications', id: 5 },
            { label: 'Aircel', id: 6 },
            { label: 'Tata Docomo', id: 7 },
            { label: 'Tata Teleservices', id: 5 },
            { label: 'Telenor India', id: 6 },
            { label: 'MTS India', id: 7 },



        ]
    }, [])
    const [value, setValue] = useState(providerList[0]);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {

        if (provider !== 0) {
            const array = providerList.find((e) => e.id === provider)
            setValue(array)
        }
    }, [provider, providerList])
    useEffect(() => {
        if (value !== null) {
            setProvider(value.id)
        } else {
            setProvider(0)
        }
        return
    }, [value, setProvider])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px",
                        // width: 755
                    }}
                    value={provider === 0 ? providerList : value}
                    placeholder="Select SiM Operator"
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
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    getOptionLabel={option => option.label || ''}
                    options={providerList}
                />
            </CssVarsProvider>
        </Fragment>
    )
}
export default memo(SimOperator)
