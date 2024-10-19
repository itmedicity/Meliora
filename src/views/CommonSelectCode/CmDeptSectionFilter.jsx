import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CmDeptSectionFilter = ({ cmSection, setCmSection, setDataa, setEmptyFlag }) => {
    const deptsectionList = useSelector((state) => state.getDeptsection?.deptsectionList);
    const [sectionX, setSectionX] = useState([{ sec_id: 0, sec_name: '' }]);
    const [value, setValue] = useState(sectionX[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (cmSection !== 0) {
            let newObj = deptsectionList?.find((e) => e.sec_id === cmSection);
            setValue(newObj);
        }
    }, [cmSection, deptsectionList]);

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value);
            setCmSection(value.sec_id);

        } else {
            setCmSection(0);
            setDataa([])
            setEmptyFlag(0)
        }
    }, [setCmSection, setDataa, setEmptyFlag]);

    useEffect(() => {
        if (deptsectionList.length > 0) setSectionX(deptsectionList);
    }, [deptsectionList]);

    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        width: '100%',
                        minHeight: 32,
                        borderRadius: 18
                    }}
                    value={cmSection === 0 ? sectionX : value}
                    placeholder="Select Section"
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
                    freeSolo
                    isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
                    getOptionLabel={(option) => option.sec_name || ''}
                    options={sectionX}
                    loadingText="No data"
                    endDecorator={<ArrowDropDownIcon />}
                />
            </CssVarsProvider>
        </Fragment>
    );
}

export default memo(CmDeptSectionFilter)