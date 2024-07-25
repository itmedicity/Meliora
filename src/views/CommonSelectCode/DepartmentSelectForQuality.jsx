import { Autocomplete, CssVarsProvider } from '@mui/joy';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const DepartmentSelectForQuality = ({ qidept, setQidept, setQitype, setsearchFlag }) => {
    const department = useSelector((state) => state.getQltyDept.qiDeptList)
    const [type, setType] = useState([{ qi_dept_no: 0, qi_dept_desc: '', qi_list_type: 0 }])
    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)
    const [departmentList, setdepartmentList] = useState([])

    useEffect(() => {
        if (department.length > 0) {
            const newarray = department?.filter((val) => val.qi_list_type !== 6)
            setdepartmentList(newarray)
            setType(newarray)
        }
        //  departmentList.length > 0 && setType(departmentList)
    }, [department])

    useEffect(() => {
        if ((qidept !== 0) && (flag === 0)) {
            const array = departmentList.find((e) => e.qi_dept_no === qidept)
            setValue(array)
        }
    }, [qidept, flag, departmentList])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            setQidept(value.qi_dept_no)
            setQitype(value.qi_list_type)
            setsearchFlag(0)
        }
        else {
            setQidept(0)
            setQitype(0)
            setsearchFlag(0)
        }
        return
    }, [setQidept, setQitype, setsearchFlag])

    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": '36px'
                    }}
                    value={qidept === 0 ? type : value}
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
                    isOptionEqualToValue={(option, value) => option.qi_dept_desc === value.qi_dept_desc}
                    getOptionLabel={option => option.qi_dept_desc || ''}
                    options={type}
                />
            </CssVarsProvider>
        </Fragment>
    )
}
export default memo(DepartmentSelectForQuality)