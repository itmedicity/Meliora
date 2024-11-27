import React, { useEffect, memo, useState, Fragment, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/';
import { useDispatch } from 'react-redux'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';

const DeptSecSelectAutoCompJoy = ({ deptsec, setDeptSec }) => {
    const dispatch = useDispatch();
    const deptsecList = useSelector((state) => state.getDeptsectionDept?.deptsectiondeptList)
    const [models, setModels] = useState([{ sec_id: 0, sec_name: '' }])
    const [value, setValue] = useState(models[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (deptsec !== 0) {
            let newObj = deptsecList?.find((e) => e.sec_id === deptsec)
            setValue(newObj)
            dispatch(getDepartSecemployee(deptsec))
        }
    }, [deptsec, deptsecList, dispatch])

    const Onclick = useCallback((value) => {
        if (value !== null) {

            setValue(value)
            setDeptSec(value.sec_id)
        }
        else {
            setDeptSec(0)
        }
        return
    }, [setDeptSec])
    useEffect(() => {
        deptsecList.length > 0 && setModels(deptsecList)
    }, [deptsecList])
    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={deptsec === 0 ? models : value}
                    placeholder="Select department section"
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
                    isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
                    getOptionLabel={option => option.sec_name || ''}
                    options={models}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(DeptSecSelectAutoCompJoy)