import React, { useEffect, memo, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AmDeptSecLocationSelect = ({ location, setLocation }) => {

    const DeptSecArry = useSelector((state) => state.getDeptsection?.deptsectionList)
    const [deptSections, setDeptSections] = useState([{ sec_id: 0, category_name: '' }])
    const [value, setValue] = useState(deptSections[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value !== null) {
            setLocation(value.sec_id)
        } else {
            setLocation(0)
        }
        return
    }, [value, setLocation])

    useEffect(() => {
        DeptSecArry.length > 0 && setDeptSections(DeptSecArry)
    }, [DeptSecArry])


    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    value={location === 0 ? deptSections : value}
                    placeholder="Select Category"
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
                    // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
                    isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
                    getOptionLabel={option => option.sec_name || ''}
                    options={deptSections}
                />
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(AmDeptSecLocationSelect)