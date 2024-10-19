import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { CssVarsProvider } from '@mui/joy/';
import Autocomplete from '@mui/joy/Autocomplete';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';

const AssetListUnderCustodian = ({ custAsset, setcustAsset }) => {

    const [AssetListt, setAssetListt] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const empDeptId = useSelector((state) => {
        return state.LoginUserData.empdept
    })

    const postcustAsset = useMemo(() => {
        return {
            item_custodian_dept: empDeptId,
            item_dept_slno: empDeptId
        }
    }, [empDeptId])

    useEffect(() => {
        const getcustodianAsset = async () => {
            const result = await axioslogin.post('assetSpareDetails/getAssetListUnderCustodianDetails', postcustAsset);
            const { success, data } = result.data;
            if (success === 2) {
                setAssetListt(data);
            } else {
                setAssetListt([]);
            }
        };
        getcustodianAsset();
    }, [postcustAsset]);


    // useEffect(() => {
    //     if (custAsset !== 0) {
    //         const selectedReason = AssetListt.find((e) => e.am_item_map_slno === custAsset);
    //         setValue(selectedReason || null);
    //     }
    // }, [custAsset, AssetListt]);

    useEffect(() => {
        if (custAsset === 0) {
            setValue(null); // Clear the selection if custAsset is reset to 0
        } else {
            const selectedReason = AssetListt.find((e) => e.am_item_map_slno === custAsset);
            setValue(selectedReason || null);
        }
    }, [custAsset, AssetListt]);


    // const Onclick = useCallback((newValue) => {
    //     if (newValue !== null) {
    //         setValue(newValue);
    //         setcustAsset(newValue.am_item_map_slno);
    //     } else {
    //         setValue(null);
    //         setcustAsset(0);
    //     }
    // }, [setcustAsset]);


    const Onclick = useCallback((newValue) => {
        if (newValue !== null) {
            setValue(newValue);
            setcustAsset(newValue.am_item_map_slno);
        } else {
            setValue(null);
            setcustAsset(0);
        }
    }, [setcustAsset]);


    return (
        <CssVarsProvider>
            <Autocomplete
                sx={{
                    "--Input-minHeight": "38px",
                    width: '100%'
                }}
                value={value}
                placeholder="Select Service Status"
                clearOnBlur
                onChange={(event, newValue) => {
                    Onclick(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                loading={AssetListt.length === 0}
                loadingText="Loading..."
                isOptionEqualToValue={(option, value) => option.am_item_map_slno === value?.am_item_map_slno}
                // getOptionLabel={(option) => option.item_name || ''}
                getOptionLabel={(option) => option && option.item_name
                    ? `${option.item_asset_no || ''}/${(option.item_asset_no_only || '').toString().padStart(6, '0')} - ${option.item_name || ''}`
                    : ''
                }
                options={AssetListt}
                clearOnEscape
            />
        </CssVarsProvider>
    )
}

export default memo(AssetListUnderCustodian)