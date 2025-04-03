import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';

const SupplierDetailsAutoComplte = ({ value, setValue }) => {
    const [inputValue, setInputValue] = useState('');
    const [supplier, setSupplier] = useState([{ it_supplier_slno: 0, it_supplier_name: '' }]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [SupplierList, SetSupplierList] = useState([]);

    useEffect(() => {
        const getSupplierDetails = async () => {
            const result = await axioslogin.get('/ItemMapDetails/GetSupplierSelect');
            const { success, data } = result.data;
            if (success === 2) {
                SetSupplierList(data);
            } else {
                SetSupplierList([]);
            }
        };
        getSupplierDetails();
    }, []);

    useEffect(() => {
        if (SupplierList.length > 0) {
            setSupplier(SupplierList);
        }
    }, [SupplierList]);

    useEffect(() => {
        if (value !== 0) {
            const selectedSupplier = SupplierList.find((sup) => sup.it_supplier_slno === value);
            setSelectedValue(selectedSupplier || null);
        } else {
            setSelectedValue(null);
        }
    }, [value, SupplierList]);

    const onClick = useCallback((newValue) => {
        if (newValue !== null) {
            setSelectedValue(newValue);
            setValue(newValue.it_supplier_slno);
        } else {
            setSelectedValue(null);
        }
    }, [setSelectedValue, setValue]);

    return (
        <Autocomplete
            placeholder="Select Supplier"
            style={{ minHeight: 35 }}
            value={selectedValue}
            clearOnBlur
            onChange={(_, newValue) => {
                onClick(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={SupplierList.length === 0}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.it_supplier_slno === value?.it_supplier_slno}
            getOptionLabel={(option) => option.it_supplier_name || ''}
            options={supplier}
        />
    );
};

export default memo(SupplierDetailsAutoComplte);

