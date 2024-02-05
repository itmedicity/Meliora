import React, { useEffect, memo, useState, Fragment, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/';

const TMemployeeSelect = ({ employee, setEmployee }) => {

    const empnameselect = useSelector((state) => { return state.getDepartSecemployee.departsecempList || 0 })
    const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }]);
    const [value, setValue] = useState(employees[0]);
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        if (empnameselect.length > 0) {
            setemployees(empnameselect);
        }
    }, [empnameselect]);
    const Onclick = useCallback((value) => {
        if (value !== null) {

            setValue(value)
            setEmployee(value.em_id)
        }
        else {
            setEmployee(0)
        }
        return
    }, [setEmployee])
    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={employee === 0 ? employees : value}
                    placeholder="Select department section"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        // setDeptSec(newValue.sec_id)
                        Onclick(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    isOptionEqualToValue={(option, value) => option.em_id === value.em_id}
                    getOptionLabel={(option) => option.em_name || ''}
                    options={employees}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(TMemployeeSelect)