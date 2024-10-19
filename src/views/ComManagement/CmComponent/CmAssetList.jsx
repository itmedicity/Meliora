import React, { useEffect, memo, useState, useCallback, Fragment } from 'react'
import { axioslogin } from "src/views/Axios/Axios"
import { Autocomplete, CssVarsProvider, Typography } from '@mui/joy';

const CmAssetList = ({ assetz, setAssetz, complaint_dept_secslno, setItem_slno, setSelectedAsset, setasset_dept }) => {

    const [assetAry, setAssetAry] = useState([])
    const [assetX, setAssetX] = useState([{ am_item_map_slno: 0, item_name: '', item_asset_no: '', item_asset_no_only: '' }])
    const [value, setValue] = useState(assetX[0]);
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        let isMounted = true; // Flag to check if component is mounted
        if (complaint_dept_secslno !== '') {
            const getAssetItembsedonLocation = async (complaint_dept_secslno) => {
                const result = await axioslogin.get(`Rectifycomplit/getlocationbsedAsset/${complaint_dept_secslno}`);
                const { success, data } = result.data;
                if (isMounted) { // Only update state if component is still mounted
                    if (success === 1) {
                        setAssetAry(data);
                    } else {
                        setAssetAry([]);
                    }
                }
            };
            getAssetItembsedonLocation(complaint_dept_secslno);
        } else {
            setAssetAry([]); // Reset asset array if no complaint_dept_secslno
        }
        return () => {
            isMounted = false; // Cleanup function to prevent state updates after unmounting
        };
    }, [complaint_dept_secslno]);



    useEffect(() => {
        if (assetz !== 0) {
            let newObj = assetAry?.find((e) => e.item_asset_no_only === assetz)
            setValue(newObj)
        }
    }, [assetz, assetAry])

    const Onclick = useCallback((value) => {
        if (value !== null) {
            setValue(value)
            setAssetz(value.item_asset_no_only)
            setasset_dept(value.item_asset_no)
        }
        else {
            setAssetz(0)
        }
        return
    }, [setAssetz])

    useEffect(() => {
        assetAry.length > 0 && setAssetX(assetAry)
    }, [assetAry])



    return (
        <Fragment>
            <CssVarsProvider>
                {assetAry.length === 0 ? (
                    <Typography sx={{ border: 1, pl: .5, mt: .2, py: .2, borderColor: '#CDD7E1', color: 'grey' }}>No Asset Added Under Department Section</Typography>
                ) : (
                    <Autocomplete
                        sx={{
                            "--Input-minHeight": "29px",
                            borderRadius: 0
                        }}
                        value={assetz === 0 ? assetX : value}
                        placeholder="select Asset"
                        clearOnBlur
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            Onclick(newValue);
                            if (newValue) {
                                setSelectedAsset(`${newValue.item_name} (${newValue.item_asset_no === null ? '' : newValue.item_asset_no})`);
                                setItem_slno(newValue.item_asset_no_only);
                            } else {
                                setItem_slno(0);
                                setSelectedAsset('');
                            }
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        loading={true}
                        loadingText="Loading..."
                        freeSolo
                        isOptionEqualToValue={(option, value) =>
                            option.item_name === value.item_name && option.item_asset_no === value.item_asset_no
                        }
                        getOptionLabel={option =>
                            option.item_asset_no ? `${option.item_name}(${option.item_asset_no}/${option.item_asset_no_only.toString().padStart(6, '0')})` : option.item_name || ''
                        }
                        options={assetX}
                    />)}
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(CmAssetList)