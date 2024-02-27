import { Autocomplete, CssVarsProvider } from '@mui/joy';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const CensusDeptSecSelect = ({ qltyDept, setQltyDept, setDptName }) => {

    const departmentList = useSelector((state) => state?.getQltyDept?.qiDeptList)
    const [type, setType] = useState([{ qi_census_nurs_slno: 0, qi_census_nurs_name: '' }])
    const [value, setValue] = useState(type[0]);
    const [inputValue, setInputValue] = useState('');
    const [flag, setFlag] = useState(0)
    useEffect(() => {

        if ((qltyDept !== 0) && (flag === 0)) {
            const array = departmentList.find((e) => e.qi_census_nurs_slno === qltyDept)
            setValue(array)
        }
    }, [qltyDept, flag, departmentList])
    const Onclick = useCallback((value) => {
        if (value !== null) {
            setFlag(1)
            setValue(value)
            setQltyDept(value.qi_census_nurs_slno)
            setDptName(value.qi_census_nurs_name)
        }
        else {
            setQltyDept(0)
            setDptName()
        }
        return
    }, [setQltyDept, setDptName])
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
                    placeholder="Select Department Section"
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
                    isOptionEqualToValue={(option, value) => option.qi_census_nurs_name === value.qi_census_nurs_name}
                    getOptionLabel={option => option.qi_census_nurs_name || ''}
                    options={type}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(CensusDeptSecSelect)