import React, { Fragment, useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDepartDataCollectionEmployee } from '../CommonComponent/useQuery';

const SelectDataCollectionEmployyee = ({ value, setValue, departmentsection }) => {

    const [inputValue, setInputValue] = useState('');
    const secid = departmentsection?.sec_id;
    // fetch employees based on section id
    const {
        data: employees = [],
        isLoading
    } = useDepartDataCollectionEmployee(secid);

    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        width: '100%',
                        minHeight: 35,
                        borderRadius: 0
                    }}
                    placeholder="Select Employee"
                    options={employees}
                    value={value ?? null} 
                    loading={isLoading}
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setValue(newValue ?? null); 
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option?.em_id === value?.em_id
                    }
                    getOptionLabel={(option) => option?.em_name || ''}
                    loadingText="Loading..."
                    endDecorator={<ArrowDropDownIcon />}
                    disabled={!secid}
                />
            </CssVarsProvider>
        </Fragment>
    );
};

export default SelectDataCollectionEmployyee;
