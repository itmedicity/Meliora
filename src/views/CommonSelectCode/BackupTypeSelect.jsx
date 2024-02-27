import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { memo } from 'react';
import { Fragment } from 'react';
import { CssVarsProvider } from '@mui/joy';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
const BackupTypeSelect = ({ backupType, setBackupType }) => {
    const backupTypeList = useMemo(() => {
        return [
            { label: 'Select', id: 0 },
            { label: 'IIS Backup', id: 1 },
            { label: 'Database Backup', id: 2 },
            { label: 'Share Folder Backup', id: 3 },
            { label: 'Scanned File Backup', id: 4 },
        ]
    }, [])
    const [value, setValue] = useState(backupTypeList[0]);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {

        if (backupType !== 0) {
            const array = backupTypeList.find((e) => e.id === backupType)
            setValue(array)
        }
    }, [backupType, backupTypeList])
    useEffect(() => {
        if (value !== null) {
            setBackupType(value.id)
        } else {
            setBackupType(0)
        }
        return
    }, [value, setBackupType])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px",

                    }}
                    value={backupType === 0 ? backupTypeList : value}
                    placeholder="Select Backup Type"
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
                    options={backupTypeList}
                />
            </CssVarsProvider>
        </Fragment>
    )
}
export default memo(BackupTypeSelect)