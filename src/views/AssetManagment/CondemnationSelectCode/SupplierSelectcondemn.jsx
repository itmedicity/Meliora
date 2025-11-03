import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';


const SupplierSelectcondemn = ({ value, setValue, setsupplierName }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [supplierList, setsupplierList] = useState([]);

    const getActiveSupplier = async () => {
        const { data } = await axioslogin.get('/ItemMapDetails/GetSupplierSelect');
        if (data.success === 2) {
            return data.data;
        } else {
            return [];
        }
    };

    const { data: tableData = [] } = useQuery({
        queryKey: ['ActiveSupplier'],
        queryFn: getActiveSupplier,
    });

    useEffect(() => {
        if (tableData.length > 0) {
            setsupplierList(tableData);
        } else {
            setsupplierList([]);
        }
    }, [tableData]);

    useEffect(() => {
        if (value !== 0) {
            const selected = supplierList.find(item => item.it_supplier_slno === value);
            setSelectedValue(selected || null);
        } else {
            setSelectedValue(null);
        }
    }, [value, supplierList]);

    const onClick = useCallback((newValue) => {
        if (newValue) {
            setSelectedValue(newValue);
            setValue(newValue.it_supplier_slno);
            setsupplierName(newValue.it_supplier_name)
        } else {
            setSelectedValue(null);
        }
    }, [setValue, setsupplierName]);

    return (
        <Autocomplete
            placeholder=" "
            style={{ minHeight: 35 }}
            value={selectedValue}
            clearOnBlur
            onChange={(_, newValue) => onClick(newValue)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            loading={supplierList.length === 0}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.it_supplier_slno === value?.it_supplier_slno}
            getOptionLabel={(option) => option.it_supplier_name || ''}
            options={supplierList}
        />
    );
};

export default memo(SupplierSelectcondemn);
