import React, { memo, useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionTyps } from 'src/redux/constants/action.type';
import { getAmAssetType } from 'src/redux/actions/AmAssetTypeList.actions'
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/'

const AmAssetTypeSelect = ({ setAssetType, setName }) => {

    const dispatch = useDispatch();

    const { FETCH_AM_ASSET_TYPE } = ActionTyps;
    const assetTypes = useSelector((state) => state.getAmAssetType.AssetTypeList)
    const [types, setType] = useState([{ asset_type_slno: 0, asset_type_name: 'Select Asset Type' }])

    const [value, setValue] = useState(types[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (value !== null) {
            dispatch({ type: FETCH_AM_ASSET_TYPE, payload: value.asset_type_slno })
            dispatch(getAmAssetType(value.asset_type_slno))
            setAssetType(value.asset_type_slno)
            setName(value.asset_type_name)
        } else {
            dispatch({ type: FETCH_AM_ASSET_TYPE, payload: 0 })
            dispatch(getAmAssetType(0))
            setAssetType(0)
            setName('')
        }
        return
    }, [value, FETCH_AM_ASSET_TYPE, dispatch, setAssetType, setName])


    useEffect(() => {
        assetTypes.length > 0 && setType(assetTypes)
        // assetTypes.length > 0 && setType(assetTypes)
        // assetTypes.length === 0 && setType(assetTypes)

        // assetTypes.length === 0 && setValue([{ asset_type_slno: 0, asset_type_name: 'Select Asset Type' }])
        // assetTypes.length === 0 && setInputValue('')
    }, [assetTypes])

    return (
        <Fragment >
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px"
                    }}
                    placeholder="Select AssetType"
                    clearOnBlur
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={true}
                    loadingText="Loading..."
                    freeSolo
                    // renderInput={(params) => (<Input size="sm" placeholder="Small"  {...params} />)}
                    isOptionEqualToValue={(option, value) => option.asset_type_name === value.asset_type_name}
                    getOptionLabel={option => option.asset_type_name || ''}
                    options={types}
                />
            </CssVarsProvider>
        </Fragment>
    );
}

export default memo(AmAssetTypeSelect)