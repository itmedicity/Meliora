import React, { Fragment, memo, useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { getDepartmentSection } from
    'src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode';

const SelectDepartmentSection = ({ departmentsec, setDepartmentSec }) => {

    const [inputValue, setInputValue] = useState('');

    const { data: sections = [], isLoading } = useQuery({
        queryKey: ['getallactivedepsec'],
        queryFn: getDepartmentSection,
        select: (res) =>
            Array.isArray(res) ? res : res?.data ?? [],
    });



    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        width: '100%',
                        minHeight: 35,
                        borderRadius: 0
                    }}
                    placeholder="Select Section"
                    options={sections}
                    value={departmentsec ?? null}
                    loading={isLoading}
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setDepartmentSec(newValue ?? null);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option?.sec_id === value?.sec_id
                    }
                    getOptionKey={(option) => option.sec_id}
                    getOptionLabel={(option) => option?.sec_name || ''}
                    loadingText="Loading..."
                />
            </CssVarsProvider>
        </Fragment>
    );
};

export default memo(SelectDepartmentSection);








