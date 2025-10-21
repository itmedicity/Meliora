import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';


const QualitySelect = ({ value, setValue, setqualityName }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [qualityList, setqualityList] = useState([]);

    const getActiveQuality = async () => {
        const { data } = await axioslogin.get('condemMasters/getActiveQuality');
        if (data.success === 2) {
            return data.data;
        } else {
            return [];
        }
    };

    const { data: tableData = [] } = useQuery({
        queryKey: ['ActiveQuality'],
        queryFn: getActiveQuality,
    });

    useEffect(() => {
        if (tableData.length > 0) {
            setqualityList(tableData);
        } else {
            setqualityList([]);
        }
    }, [tableData]);

    useEffect(() => {
        if (value !== 0) {
            const selected = qualityList.find(item => item.quality_slno === value);
            setSelectedValue(selected || null);
        } else {
            setSelectedValue(null);
        }
    }, [value, qualityList]);

    const onClick = useCallback((newValue) => {
        if (newValue) {
            setSelectedValue(newValue);
            setValue(newValue.quality_slno);
            setqualityName(newValue.quality_name)
        } else {
            setSelectedValue(null);
        }
    }, [setValue, setqualityName]);

    return (
        <Autocomplete
            style={{ minHeight: 35 }}
            value={selectedValue}
            clearOnBlur
            onChange={(_, newValue) => onClick(newValue)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            loading={qualityList.length === 0}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.quality_slno === value?.quality_slno}
            getOptionLabel={(option) => option.quality_name || ''}
            options={qualityList}
        />
    );
};

export default memo(QualitySelect);
