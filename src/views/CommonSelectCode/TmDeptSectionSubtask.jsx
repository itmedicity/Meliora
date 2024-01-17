import React, { useEffect, memo, useState, Fragment, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/';
import { useDispatch } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';

const TmDeptSectionSubtask = ({ deptsecSub, setDeptSecSub }) => {
    const dispatch = useDispatch();
    const subTaskDeptsectionList = useSelector((state) => state.getDepartmentSecSubTask?.subTaskDeptsectionList)
    const [deptSections, setdeptSections] = useState([{ sec_id: 0, sec_name: '' }])
    const [value, setValue] = useState(deptSections[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (deptsecSub !== 0) {
            let newObj = subTaskDeptsectionList?.find((e) => e.sec_id === deptsecSub)
            setValue(newObj)
            dispatch(getDepartSecemployee(deptsecSub))
        }
    }, [deptsecSub, subTaskDeptsectionList, dispatch])


    const Onclick = useCallback((value) => {
        if (value !== null) {

            setValue(value)
            setDeptSecSub(value.sec_id)
        }
        else {
            setDeptSecSub(0)
        }
        return
    }, [setDeptSecSub])
    useEffect(() => {
        subTaskDeptsectionList.length > 0 && setdeptSections(subTaskDeptsectionList)
    }, [subTaskDeptsectionList])

    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={deptsecSub === 0 ? deptSections : value}
                    placeholder="Select department section"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        // setDeptSecSub(newValue.sec_id)
                        Onclick(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
                    getOptionLabel={option => option.sec_name || ''}
                    options={deptSections}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(TmDeptSectionSubtask)