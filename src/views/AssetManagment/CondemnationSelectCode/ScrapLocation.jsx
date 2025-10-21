import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';

const ScrapLocation = ({ value, setValue }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [scrapLocationList, setScrapLocationList] = useState([]);

    const getActiveScarpLocation = async () => {
        const { data } = await axioslogin.get('condemMasters/getActiveScarpLocation');
        if (data.success === 2) {
            return data.data;
        } else {
            return [];
        }
    };

    const { data: tableData = [] } = useQuery({
        queryKey: ['activeScrapYard'],
        queryFn: getActiveScarpLocation,
    });

    useEffect(() => {
        if (tableData.length > 0) {
            setScrapLocationList(tableData);
        } else {
            setScrapLocationList([]);
        }
    }, [tableData]);

    useEffect(() => {
        if (Array.isArray(value) && value.length > 0) {
            const selected = scrapLocationList.filter(item => value.includes(item.yard_slno));
            setSelectedValues(selected);
        } else {
            setSelectedValues([]);
        }
    }, [value, scrapLocationList]);

    const onChangeHandler = useCallback((newValues) => {
        if (Array.isArray(newValues)) {
            setSelectedValues(newValues);
            setValue(newValues.map(v => v.yard_slno));
        } else {
            setSelectedValues([]);
            setValue([]);
        }
    }, [setValue]);

    return (
        <Autocomplete
            multiple
            style={{ minHeight: 35 }}
            value={selectedValues}
            clearOnBlur
            onChange={(_, newValues) => onChangeHandler(newValues)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            loading={scrapLocationList.length === 0}
            loadingText="Loading..."
            isOptionEqualToValue={(option, value) => option.yard_slno === value?.yard_slno}
            getOptionLabel={(option) => option.yard_name || ''}
            options={scrapLocationList}
        />
    );
};

export default memo(ScrapLocation);

