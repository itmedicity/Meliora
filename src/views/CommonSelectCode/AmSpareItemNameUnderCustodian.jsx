import React, { useEffect, memo, useState } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { useQuery } from '@tanstack/react-query';
import { getSpareItemUnderCustoidian } from 'src/api/AssetApis';

const AmSpareItemNameUnderCustodian = ({ item, setItem, custoDian }) => {

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const { data: spareItemData = [], isLoading } = useQuery({
        queryKey: ['getSpareItemUnderCustoidian', custoDian],
        queryFn: () => getSpareItemUnderCustoidian(custoDian),
        enabled: !!custoDian,
    });

    useEffect(() => {
        if (item && typeof item === 'object') {
            setValue(item);
        }
    }, [item]);

    useEffect(() => {
        setItem(value?.spare_creation_slno ?? null);
    }, [value, setItem]);

    return (
        <Autocomplete
            sx={{ '--Input-minHeight': '29px' }}
            value={value}
            placeholder="Select Item name"
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={isLoading}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) =>
                option.item_name === value?.item_name
            }
            getOptionLabel={option =>
                typeof option === 'string' ? option : option?.item_name || ''
            }
            options={spareItemData}
        />
    );
}

export default memo(AmSpareItemNameUnderCustodian);
