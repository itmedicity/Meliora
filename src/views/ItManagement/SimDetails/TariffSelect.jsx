import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { Fragment } from 'react';
import { CssVarsProvider } from '@mui/joy';
import { useState, useEffect, useMemo, memo } from 'react';

const TariffSelect = ({ tarrif, setTarrif }) => {
    const tariffList = useMemo(() => {
        return [
            { label: 'Select', id: 0 },
            { label: 'Monthly', id: 1 },
            { label: 'Quaterly', id: 2 },
            { label: 'Yearly', id: 3 },
            { label: 'Other Bill', id: 4 }
        ]
    }, [])
    const [value, setValue] = useState(tariffList[0]);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {

        if (tarrif !== 0) {
            const array = tariffList.find((e) => e.id === tarrif)
            setValue(array)
        }
    }, [tarrif, tariffList])
    useEffect(() => {
        if (value !== null) {
            setTarrif(value.id)
        } else {
            setTarrif(0)
        }
        return
    }, [value, setTarrif])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px",
                        // width: 755

                    }}
                    value={tarrif === 0 ? tariffList : value}
                    placeholder="Select Tariff"
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
                    options={tariffList}
                />
            </CssVarsProvider>
        </Fragment>

    )
}


export default memo(TariffSelect)