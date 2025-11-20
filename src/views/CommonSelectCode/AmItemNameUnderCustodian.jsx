import React from 'react'

const AmItemNameUnderCustodian = () => {
    return (
        <div>AmItemNameUnderCustodian</div>
    )
}

export default AmItemNameUnderCustodian

// import React, { useEffect, memo, useState } from 'react'
// import Autocomplete from '@mui/joy/Autocomplete'
// import { useQuery } from '@tanstack/react-query';
// import { getAssetItemUnderCustoidian } from 'src/api/AssetApis';

// const AmItemNameUnderCustodian = ({ item, setItem, custoDian }) => {

//     const [value, setValue] = useState(null);
//     const [inputValue, setInputValue] = useState('');

//     const { data: AssetItemData = [], isLoading } = useQuery({
//         queryKey: ['getAssetItemUnderCustodian', custoDian],
//         queryFn: () => getAssetItemUnderCustoidian(custoDian),
//         enabled: !!custoDian,
//     });


//     useEffect(() => {
//         if (item) {
//             setValue(item);
//         }
//     }, [item]);

//     useEffect(() => {
//         setItem(value);
//     }, [value, setItem]);

//     return (
//         <Autocomplete
//             sx={{ '--Input-minHeight': '29px' }}
//             value={value}
//             placeholder="Select Item name"
//             clearOnBlur
//             onChange={(event, newValue) => {
//                 setValue(newValue);
//             }}
//             inputValue={inputValue}
//             onInputChange={(event, newInputValue) => {
//                 setInputValue(newInputValue);
//             }}
//             loading={isLoading}
//             loadingText="Loading..."
//             freeSolo
//             isOptionEqualToValue={(option, value) =>
//                 option.item_name === value?.item_name
//             }
//             getOptionLabel={option =>
//                 typeof option === 'string' ? option : option?.item_name || ''
//             }
//             options={AssetItemData}
//         />
//     );
// }

// export default memo(AmItemNameUnderCustodian);
