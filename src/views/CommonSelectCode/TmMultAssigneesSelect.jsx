import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Autocomplete } from '@mui/joy';

const TmMultAssigneesSelect = ({ value, setValue }) => {

    const [inputValue, setInputValue] = useState('');
    const empnameselect = useSelector((state) => {
        return state.getDepartSecemployee.departsecempList || 0
    })
    const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }]);
    const [selectedValues, setSelectedValues] = useState([]);

    const Onclick = useCallback((values) => {
        if (values !== null) {
            const empArray = values.map((value) => value.em_id);
            setSelectedValues(values);
            setValue(empArray);
        } else {
            setSelectedValues([]);
        }
    }, [setSelectedValues, setValue]);

    useEffect(() => {
        if (empnameselect.length > 0) {
            setemployees(empnameselect);
        }
    }, [empnameselect]);

    return (
        <Autocomplete
            placeholder="Add Assignee"
            sx={{
                width: '100%',
                minHeight: 35,
                bgcolor: 'transparent',
                '--Input-radius': '0px',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderBottom: '2px solid',
                borderColor: 'neutral.outlinedBorder',
                '&:hover': {
                    borderColor: 'neutral.outlinedHoverBorder',
                },
                '&::before': {
                    border: '1px solid var(--Input-focusedHighlight)',
                    transform: 'scaleX(0)',
                    left: 0,
                    right: 0,
                    bottom: '-2px',
                    top: 'unset',
                    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                    borderRadius: 0,
                },
                '&:focus-within::before': {
                    transform: 'scaleX(1)',
                },
            }}
            multiple

            value={selectedValues}
            clearOnBlur
            onChange={(_, newValue) => {
                Onclick(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.em_id === value.em_id}
            getOptionLabel={(option) => option.em_name || ''}
            options={employees}

        />

    )
}

export default memo(TmMultAssigneesSelect)