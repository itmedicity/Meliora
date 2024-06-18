import React from 'react'
import Autocomplete from '@mui/joy/Autocomplete';
import { Fragment } from 'react';
import { CssVarsProvider } from '@mui/joy';
import { useState, useEffect, useMemo, memo } from 'react';

const SelectTaskStatus = ({ taskstatus, setTaskStatus }) => {

    const statusList = useMemo(() => {
        return [
            { label: '--select--', id: 1 },
            { label: 'Incompleted', id: 0 },
            { label: 'On Progress', id: 2, },
            { label: 'On Hold', id: 3 },
            { label: 'Pending', id: 4 },
        ]
    }, [])
    const [value, setValue] = useState(statusList[0]);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {

        if (taskstatus !== 1) {
            const array = statusList.find((e) => e.id === taskstatus)
            setValue(array)
        }
    }, [taskstatus, statusList])
    useEffect(() => {
        if (value !== null) {
            setTaskStatus(value.id)
        } else {
            setTaskStatus(1)
        }
        return
    }, [value, setTaskStatus])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "25px",
                        borderRadius: .2,
                        borderRight: 0,

                    }}
                    value={taskstatus === 1 ? statusList : value}
                    placeholder="select task status"
                    clearOnBlur
                    style={{ minHeight: 29, fontWeight: 400, color: '#2F4A60' }}
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
                    options={statusList}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(SelectTaskStatus)