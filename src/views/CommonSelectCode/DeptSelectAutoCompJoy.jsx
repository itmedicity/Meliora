import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDesignation } from 'src/redux/actions/DeptSecDept.action';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const DeptSelectAutoCompJoy = ({ department, setDepartment }) => {

    const dispatch = useDispatch();
    const departmentList = useSelector((state) => state.getDepartment?.departmentList)
    const [departments, setDepartments] = useState([{ dept_id: 0, dept_name: '' }])
    const [value, setValue] = useState(departments[0]);
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        if (department !== 0) {
            let newObj = departmentList?.find((e) => e.dept_id === department)
            dispatch(getDesignation(department))
            setValue(newObj)
        }
    }, [department, departmentList, dispatch])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value)
            setDepartment(value.dept_id)
        }
        else {
            setDepartment(0)
        }
        return
    }, [setDepartment])
    useEffect(() => {
        departmentList.length > 0 && setDepartments(departmentList)
    }, [departmentList])
    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={department === 0 ? departments : value}
                    placeholder="Select Department"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setValue(newValue);
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
                    options={departments}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(DeptSelectAutoCompJoy)