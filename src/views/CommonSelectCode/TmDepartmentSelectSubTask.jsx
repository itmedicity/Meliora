import { getDepartmentSecSubTask } from 'src/redux/actions/TmDeptSection.action';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const TmDepartmentSelectSubTask = ({ departmentSub, setDepartmentSub }) => {
    const dispatch = useDispatch();
    const subTaskDepartmentList = useSelector((state) => state.getDepartmentSubTask?.subTaskDepartmentList)
    const [departments, setDepartments] = useState([{ dept_id: 0, dept_name: '' }])
    const [value, setValue] = useState(departments[0]);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        if (departmentSub !== 0) {
            let newObj = subTaskDepartmentList?.find((e) => e.dept_id === departmentSub)
            dispatch(getDepartmentSecSubTask(departmentSub))
            setValue(newObj)
        }
    }, [departmentSub, subTaskDepartmentList, dispatch])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value)
            setDepartmentSub(value.dept_id)
        }
        else {
            setDepartmentSub(0)
        }
        return
    }, [setDepartmentSub])
    useEffect(() => {
        subTaskDepartmentList.length > 0 && setDepartments(subTaskDepartmentList)
    }, [subTaskDepartmentList])

    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={departmentSub === 0 ? departments : value}
                    placeholder="Select Department"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        // setDepartmentSub(newValue.dept_id)
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

export default memo(TmDepartmentSelectSubTask)