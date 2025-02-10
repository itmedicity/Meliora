import { Autocomplete, CssVarsProvider } from '@mui/joy';
// import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useCallback, useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const QIEmployeeSelect = ({ empName, setempName }) => {
    const employeeList = useSelector((state) => state?.getDepartSecemployee?.departsecempList)
    const [type, setType] = useState([{ em_id: 0, em_name: '' }])
    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)
    // const EmployeeChange = useCallback((e) => {
    //     setempName(e.target.value);
    // }, [setempName]);

    useEffect(() => {
        if ((empName !== 0) && (flag === 0)) {
            const array = employeeList.find((e) => e.em_id === empName)
            setValue(array)
        }
    }, [empName, flag, employeeList])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            setempName(value.em_id)
        }
        else {
            setempName('')
        }
        return
    }, [setempName])
    useEffect(() => {
        employeeList.length > 0 && setType(employeeList)
    }, [employeeList])
    const getOptionLabel = (option) => {
        if (option.em_name) {
            return `${option.em_name}  (${option.em_no})`;
        }
        return '';
    };
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    // fullWidth
                    // startDecorator={<PeopleAltTwoToneIcon sx={{ color: '#0070E0' }} />}
                    sx={{
                        height: 20, border: '1px solid #bbdefb', alignItems: 'center',
                        fontSize: 14, borderRadius: 6
                    }}
                    value={empName === 0 ? type : value}
                    placeholder="Select"
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
                    isOptionEqualToValue={(option, value) => option.em_name === value.em_name}
                    getOptionLabel={getOptionLabel}
                    // getOptionLabel={option => (option.em_name) || ''}
                    options={type}
                />
            </CssVarsProvider>
        </Fragment >
    )
}
export default memo(QIEmployeeSelect)