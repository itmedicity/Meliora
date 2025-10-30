import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';


const QuantityUnitSelect = ({ value, setValue, setquantityName }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [QuantityList, setQuantityList] = useState([]);

    const getActiveQuantity = async () => {
        const { data } = await axioslogin.get('condemMasters/getActiveQuantity');
        if (data.success === 2) {
            return data.data;
        } else {
            return [];
        }
    };

    const { data: tableData = [] } = useQuery({
        queryKey: ['ActiveQuantity'],
        queryFn: getActiveQuantity,
    });

    useEffect(() => {
        if (tableData.length > 0) {
            setQuantityList(tableData);
        } else {
            setQuantityList([]);
        }
    }, [tableData]);

    useEffect(() => {
        if (value !== 0) {
            const selected = QuantityList.find(item => item.condem_quantity_slno === value);
            setSelectedValue(selected || null);
        } else {
            setSelectedValue(null);
        }
    }, [value, QuantityList]);

    const onClick = useCallback((newValue) => {
        if (newValue) {
            setSelectedValue(newValue);
            setValue(newValue.condem_quantity_slno);
            setquantityName(newValue.condem_quantity_name)
        } else {
            setSelectedValue(null);
        }
    }, [setValue, setquantityName]);

    return (
        <Autocomplete
            style={{ minHeight: 35 }}
            value={selectedValue}
            clearOnBlur
            onChange={(_, newValue) => onClick(newValue)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            loading={QuantityList.length === 0}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.condem_quantity_slno === value?.condem_quantity_slno}
            getOptionLabel={(option) => option.condem_quantity_name || ''}
            options={QuantityList}
        />
    );
};

export default memo(QuantityUnitSelect);
