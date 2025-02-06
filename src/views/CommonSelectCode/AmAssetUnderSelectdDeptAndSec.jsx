import { Autocomplete, CssVarsProvider } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { useSelector } from 'react-redux';

const AmAssetUnderSelectdDeptAndSec = ({ custAsset, setcustAsset, selectedDept, selectedDeptSec, setassetData }) => {

    const empdept = useSelector((state) => {
        return state.LoginUserData.empdept
    })
    const [AssetListt, setAssetListt] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const postcustAsset = useMemo(() => {
        return {
            item_dept_slno: selectedDept,
            item_deptsec_slno: selectedDeptSec,
            am_custodian_dept_slno: empdept
        }
    }, [selectedDept, selectedDeptSec, empdept])

    useEffect(() => {
        const getcustodianAsset = async () => {
            const result = await axioslogin.post('assetSpareDetails/getAssetUnderSelectdDeptAndSec', postcustAsset);
            const { success, data } = result.data;
            if (success === 2) {
                setAssetListt(data);
            } else {
                setAssetListt([]);
            }
        };
        getcustodianAsset();
    }, [postcustAsset]);

    useEffect(() => {
        if (custAsset === 0) {
            setValue(null);
        } else {
            const selectedReason = AssetListt.find((e) => e.am_item_map_slno === custAsset);
            setValue(selectedReason || null);
        }
    }, [custAsset, AssetListt]);

    const Onclick = useCallback((newValue) => {
        if (newValue !== null) {
            setValue(newValue);
            setassetData(newValue)
            setcustAsset(newValue.am_item_map_slno);
        } else {
            setValue(null);
            setcustAsset(0);
            setassetData({})
        }
    }, [setcustAsset, setassetData]);


    return (
        <CssVarsProvider>
            <Autocomplete
                sx={{
                    "--Input-minHeight": "29px",
                    width: '100%'
                }}
                value={value}
                placeholder="Select Asset"
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


export default memo(AmAssetUnderSelectdDeptAndSec)