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
                        width: '100%',
                        minHeight: 35,
                        bgcolor: 'transparent',
                        '--Input-radius': '0px',
                        borderTop: 0,
                        borderLeft: 0,
                        borderRight: 0,
                        borderBottom: 0,
                        pl: 0,
                        borderColor: 'neutral.outlinedBorder',
                        '&:hover': {
                            borderColor: 'neutral.outlinedHoverBorder',
                        },
                        '&::before': {
                            border: '1px solid var(--Input-focusedHighlight)',
                            transform: 'scaleX(0)',
                            left: 0,
                            right: 0,
                            // bottom: '-2px',
                            top: 'unset',
                            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                            borderRadius: 0,
                        },
                        '&:focus-within::before': {
                            transform: 'scaleX(1)',
                        },
                    }}
                    value={employee === 0 ? employees : value}
                    placeholder="search employee"
                    clearOnBlur
                    style={{ minHeight: 28, fontWeight: 500, }}
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