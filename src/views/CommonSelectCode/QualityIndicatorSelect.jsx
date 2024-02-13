import { Autocomplete, CssVarsProvider } from '@mui/joy';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const QualityIndicatorSelect = ({ qltyDept, setQltyDept }) => {

    const departmentList = useSelector((state) => state?.getQltyDept?.qiDeptList)
    const [type, setType] = useState([{ qi_dept_slno: 0, qi_dept_name: '' }])
    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)
    useEffect(() => {

        if ((qltyDept !== 0) && (flag === 0)) {
            const array = departmentList.find((e) => e.qi_dept_slno === qltyDept)
            setValue(array)
        }
    }, [qltyDept, flag, departmentList])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            setQltyDept(value.qi_dept_slno)
        }
        else {
            setQltyDept(0)
        }
        return
    }, [setQltyDept])
    useEffect(() => {
        departmentList.length > 0 && setType(departmentList)
    }, [departmentList])


    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "35px",
                    }}
                    value={qltyDept === 0 ? type : value}
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
                    isOptionEqualToValue={(option, value) => option.qi_dept_name === value.qi_dept_name}
                    getOptionLabel={option => option.qi_dept_name || ''}
                    options={type}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(QualityIndicatorSelect)