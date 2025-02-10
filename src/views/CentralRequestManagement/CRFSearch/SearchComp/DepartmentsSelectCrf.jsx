import React, { useEffect, memo, useState, Fragment, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { useDispatch } from 'react-redux'
import { getDesignation } from 'src/redux/actions/DeptSecDept.action';
import { getDepartment } from 'src/redux/actions/Department.action';

const DepartmentsSelectCrf = ({ department, setDepartment, setdptSec }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])
    const departmentList = useSelector((state) => state.getDepartment?.departmentList)
    const [type, setType] = useState([{ dept_id: 0, dept_name: '' }])
    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)

    useEffect(() => {
        if ((department !== 0) && (flag === 0)) {
            const array = departmentList.find((e) => e.dept_id === department)
            setValue(array)
        }
    }, [department, flag, departmentList])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setdptSec(0)
            setFlag(1)
            setValue(value)
            setDepartment(value.dept_id)
            if (value.dept_id !== 0) {
                dispatch(getDesignation(value.dept_id))
            }
        }
        else {
            setDepartment(0)
        }
        return
    }, [setDepartment, dispatch, setdptSec])
    useEffect(() => {
        departmentList.length > 0 && setType(departmentList)
    }, [departmentList])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{ height: 20, border: '1px solid #bbdefb', color: '#1565c0', fontSize: 14 }}
                    value={department === 0 ? type : value}
                    placeholder="Select Department"
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
                    isOptionEqualToValue={(option, value) => option.dept_name === value.dept_name}
                    getOptionLabel={option => option.dept_name || ''}
                    options={type}
                />
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(DepartmentsSelectCrf)