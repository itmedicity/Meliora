import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'
import { getDesignation } from 'src/redux/actions/DeptSecDept.action';
import { useDispatch } from 'react-redux'

const AmDepartmentSelWOName = ({ department, setDepartment }) => {
    const dispatch = useDispatch();

    const departmentList = useSelector((state) => state.getDepartment?.departmentList)
    const [models, setModels] = useState([{ dept_id: 0, dept_name: '' }])
    const [value, setValue] = useState(models[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value?.dept_id > 0) {
            setValue(value)
            dispatch(getDesignation(value.dept_id))
            setDepartment(value.dept_id)
        } else {
            setDepartment(0)
        }
        return
    }, [value, setDepartment, dispatch])


    useEffect(() => {
        departmentList.length > 0 && setModels(departmentList)
        departmentList.length === 0 && setModels(departmentList)
        departmentList.length === 0 && setValue([{ dept_id: 0, dept_name: '' }])
        departmentList.length === 0 && setInputValue('')


    }, [departmentList])

    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={department === 0 ? models : value}
                    placeholder="Select Department"
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
                    isOptionEqualToValue={(option, value) => option.dept_name === value.dept_name}
                    getOptionLabel={option => option.dept_name || ''}
                    options={models}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AmDepartmentSelWOName)