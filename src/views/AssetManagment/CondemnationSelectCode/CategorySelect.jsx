import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';

const CategorySelect = ({ value, setValue, setcategoryName }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    const getActiveCategory = async () => {
        const { data } = await axioslogin.get('condemMasters/getActiveCategory');
        if (data.success === 2) {
            return data.data;
        } else {
            return [];
        }
    };


    const { data: tableData = [] } = useQuery({
        queryKey: ['ActiveCategory'],
        queryFn: getActiveCategory,
    });

    useEffect(() => {
        if (tableData.length > 0) {
            setCategoryList(tableData);
        } else {
            setCategoryList([]);
        }
    }, [tableData]);

    useEffect(() => {
        if (value !== 0) {
            const selected = categoryList.find(item => item.category_slno === value);
            setSelectedValue(selected || null);
        } else {
            setSelectedValue(null);
        }
    }, [value, categoryList]);

    const onClick = useCallback((newValue) => {
        if (newValue) {
            setSelectedValue(newValue);
            setValue(newValue.category_slno);
            setcategoryName(newValue.category_name)
        } else {
            setSelectedValue(null);
        }
    }, [setValue]);

    return (
        <Autocomplete
            style={{ minHeight: 35 }}
            value={selectedValue}
            clearOnBlur
            onChange={(_, newValue) => onClick(newValue)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            loading={categoryList.length === 0}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.category_slno === value?.category_slno}
            getOptionLabel={(option) => option.category_name || ''}
            options={categoryList}
        />
    );
};

export default memo(CategorySelect);
