import React, { memo, useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { useCallback } from 'react';
const BackupScheduleSelect = ({ scheduleType, setScheduleType }) => {
    const backupScheduleType = useSelector((state) => state.getScheduleType.scheduleTypeList)
    const [type, setType] = useState([{ schedule_type_id: 0, schedule_type_name: '' }])
    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)
    useEffect(() => {

        if ((scheduleType !== 0) && (flag === 0)) {
            const array = backupScheduleType.find((e) => e.schedule_type_id === scheduleType)
            setValue(array)
        }
    }, [scheduleType, flag, backupScheduleType])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            setScheduleType(value.schedule_type_id)
        }
        else {
            setScheduleType(0)
        }
        return
    }, [setScheduleType])
    useEffect(() => {
        backupScheduleType.length > 0 && setType(backupScheduleType)
    }, [backupScheduleType])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px",
                        width: 409
                    }}
                    value={scheduleType === 0 ? type : value}
                    placeholder="Select Schedule Type"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        Onclick(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    isOptionEqualToValue={(option, value) => option.schedule_type_name === value.schedule_type_name}
                    getOptionLabel={option => option.schedule_type_name || ''}
                    options={type}
                />
            </CssVarsProvider>
        </Fragment>
    )
}
export default memo(BackupScheduleSelect)